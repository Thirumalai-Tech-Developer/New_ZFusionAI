import { Hono, type Context } from "hono";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { agentsTable, type Agent } from "@workspace/db";
import { runAgent } from "../lib/agents";
import type { ChatMessage } from "../lib/ai";
import { HttpError } from "../lib/errors";
import { logExchange, metered } from "../lib/messaging";
import { parse } from "../lib/validate";
import { rateLimit } from "../middlewares/rateLimit";
import type { AppEnv } from "../types";
import { jsonBody } from "./serializers";

/**
 * Unauthenticated endpoints used by the embeddable web-app chat widget
 * (`/widget.js`). Replies are billed to the agent owner's allowance, so they
 * are rate limited per visitor IP and restricted to the agent's allowed origins.
 */
const pub = new Hono<AppEnv>();

async function widgetAgent(c: Context<AppEnv>): Promise<Agent> {
  const publicId = c.req.param("publicId") ?? "";
  if (!/^pub_[A-Za-z0-9_-]{8,32}$/.test(publicId)) throw new HttpError(404, "Widget not found.", "not_found");
  const [agent] = await c.var.db
    .select()
    .from(agentsTable)
    .where(eq(agentsTable.publicId, publicId))
    .limit(1);
  if (!agent || !agent.widgetEnabled) throw new HttpError(404, "Widget not found.", "not_found");
  return agent;
}

/** Applies CORS for the widget: any origin unless the agent restricts them. */
function applyCors(c: Context<AppEnv>, agent: Agent) {
  const origin = c.req.header("origin");
  const allowed = agent.widgetAllowedOrigins;
  if (origin && allowed.length > 0 && !allowed.includes(origin)) {
    throw new HttpError(403, "This website is not allowed to use this widget.", "origin_not_allowed");
  }
  c.header("Access-Control-Allow-Origin", origin ?? "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  c.header("Access-Control-Max-Age", "600");
  c.header("Vary", "Origin");
}

pub.options("/agents/:publicId/*", async (c) => {
  applyCors(c, await widgetAgent(c));
  return c.body(null, 204);
});
pub.options("/agents/:publicId", async (c) => {
  applyCors(c, await widgetAgent(c));
  return c.body(null, 204);
});

pub.get("/agents/:publicId", async (c) => {
  const agent = await widgetAgent(c);
  applyCors(c, agent);
  c.header("Cache-Control", "public, max-age=60");
  return c.json({ name: agent.name, welcome: agent.widgetWelcome, color: agent.widgetColor });
});

pub.post("/agents/:publicId/chat", rateLimit("PUBLIC_LIMITER", "widget"), async (c) => {
  const agent = await widgetAgent(c);
  applyCors(c, agent);

  const { sessionId, messages } = parse(
    z.object({
      sessionId: z.string().regex(/^[A-Za-z0-9_-]{8,64}$/),
      messages: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1000) }))
        .min(1)
        .max(20),
    }),
    await jsonBody(c),
  );

  const { reply } = await metered(c.var, agent.userId, () =>
    runAgent(c.var, agent, messages as ChatMessage[], {
      extraInstructions:
        "You are a chat assistant embedded on the business's website. Be concise and friendly.",
    }),
  );

  c.executionCtx.waitUntil(
    logExchange(c.var, {
      userId: agent.userId,
      agentId: agent.id,
      channel: "web",
      source: "widget",
      peer: sessionId,
      input: messages[messages.length - 1]!.content,
      reply,
    }).catch(() => undefined),
  );
  return c.json({ reply });
});

export default pub;
