import { Hono } from "hono";
import { count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { agentsTable, type Agent } from "@workspace/db";
import { getAgent, runAgent } from "../lib/agents";
import type { ChatMessage } from "../lib/ai";
import { decrypt, encrypt, randomToken } from "../lib/crypto";
import { HttpError } from "../lib/errors";
import { assertToolUrl } from "../lib/safeFetch";
import { parse } from "../lib/validate";
import { requireUser } from "../middlewares/auth";
import { rateLimit } from "../middlewares/rateLimit";
import type { AppEnv } from "../types";
import { jsonBody } from "./serializers";

const MAX_AGENTS = 10;

const toolSchema = z.object({
  name: z.string().trim().regex(/^[a-zA-Z0-9_-]{1,64}$/, "letters, numbers, _ or - (max 64)"),
  description: z.string().trim().min(3).max(1000),
  url: z.string().trim().url().max(2000),
  parameters: z.record(z.unknown()).default({ type: "object", properties: {} }),
});

const originSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/\/+$/, ""))
  .refine((v) => /^https?:\/\/[^/\s]+$/.test(v), "must be an origin like https://example.com");

const agentSchema = z.object({
  name: z.string().trim().min(1).max(80),
  instructions: z.string().trim().min(10).max(8000),
  tools: z.array(toolSchema).max(10).default([]),
  widgetEnabled: z.boolean().default(false),
  widgetAllowedOrigins: z.array(originSchema).max(20).default([]),
  widgetWelcome: z.string().trim().min(1).max(300).optional(),
  widgetColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "must be a hex colour like #25D366").optional(),
});

async function serializeAgent(secret: string, appUrl: string, agent: Agent) {
  return {
    id: agent.id,
    name: agent.name,
    instructions: agent.instructions,
    tools: agent.tools,
    toolSecret: await decrypt(secret, agent.toolSecret),
    publicId: agent.publicId,
    widgetEnabled: agent.widgetEnabled,
    widgetAllowedOrigins: agent.widgetAllowedOrigins,
    widgetWelcome: agent.widgetWelcome,
    widgetColor: agent.widgetColor,
    embedSnippet: `<script src="${appUrl}/widget.js" data-agent="${agent.publicId}" async></script>`,
    createdAt: agent.createdAt,
    updatedAt: agent.updatedAt,
  };
}

function validateTools(tools: z.infer<typeof toolSchema>[]) {
  const names = new Set<string>();
  for (const t of tools) {
    assertToolUrl(t.url);
    if (names.has(t.name)) throw new HttpError(400, `Duplicate tool name "${t.name}".`, "validation_error");
    names.add(t.name);
  }
}

const agents = new Hono<AppEnv>();
agents.use("*", requireUser);

agents.get("/", async (c) => {
  const { db, user, config } = c.var;
  const rows = await db
    .select()
    .from(agentsTable)
    .where(eq(agentsTable.userId, user!.id))
    .orderBy(desc(agentsTable.createdAt));
  return c.json({
    agents: await Promise.all(rows.map((a) => serializeAgent(config.sessionSecret, config.appUrl, a))),
  });
});

agents.post("/", async (c) => {
  const { db, user, config } = c.var;
  const input = parse(agentSchema, await jsonBody(c));
  validateTools(input.tools);

  const [{ value: existing } = { value: 0 }] = await db
    .select({ value: count() })
    .from(agentsTable)
    .where(eq(agentsTable.userId, user!.id));
  if (existing >= MAX_AGENTS) {
    throw new HttpError(400, `You can create at most ${MAX_AGENTS} agents.`, "too_many_agents");
  }

  const [agent] = await db
    .insert(agentsTable)
    .values({
      ...input,
      userId: user!.id,
      toolSecret: await encrypt(config.sessionSecret, `zts_${randomToken(24)}`),
      publicId: `pub_${randomToken(12)}`,
    })
    .returning();
  return c.json({ agent: await serializeAgent(config.sessionSecret, config.appUrl, agent!) }, 201);
});

agents.put("/:id", async (c) => {
  const { db, user, config } = c.var;
  const current = await getAgent(c.var, user!.id, c.req.param("id"));
  const input = parse(agentSchema, await jsonBody(c));
  validateTools(input.tools);

  const [agent] = await db
    .update(agentsTable)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(agentsTable.id, current.id))
    .returning();
  return c.json({ agent: await serializeAgent(config.sessionSecret, config.appUrl, agent!) });
});

agents.delete("/:id", async (c) => {
  const agent = await getAgent(c.var, c.var.user!.id, c.req.param("id"));
  await c.var.db.delete(agentsTable).where(eq(agentsTable.id, agent.id));
  return c.json({ ok: true });
});

/** Dashboard playground: test an agent (including tool calls). Not metered. */
agents.post("/:id/test", rateLimit("AI_TEST_LIMITER", "agent-test"), async (c) => {
  const agent = await getAgent(c.var, c.var.user!.id, c.req.param("id"));
  const { messages } = parse(
    z.object({
      messages: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(4000) }))
        .min(1)
        .max(20),
    }),
    await jsonBody(c),
  );
  return c.json(await runAgent(c.var, agent, messages as ChatMessage[]));
});

export default agents;
