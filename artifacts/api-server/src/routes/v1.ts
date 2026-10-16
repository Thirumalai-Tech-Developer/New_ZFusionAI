import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { agentsTable } from "@workspace/db";
import { getAgent, runAgent } from "../lib/agents";
import type { ChatMessage } from "../lib/ai";
import { randomToken } from "../lib/crypto";
import { HttpError } from "../lib/errors";
import {
  generateConnectionReply,
  generateReply,
  logExchange,
  metered,
  requireConnection,
  sendMeteredMessage,
} from "../lib/messaging";
import { parse } from "../lib/validate";
import { normalizePhone, type OutboundPayload } from "../lib/whatsapp";
import { requireApiKey } from "../middlewares/auth";
import { rateLimit } from "../middlewares/rateLimit";
import type { AppEnv } from "../types";
import { jsonBody, toPublicUser } from "./serializers";

/**
 * Public, API-key authenticated REST API.
 *   Authorization: Bearer zf_live_...
 * Every metered call draws one message from the shared allowance.
 */
const v1 = new Hono<AppEnv>();
v1.use("*", requireApiKey, rateLimit("API_LIMITER", "v1"));

v1.get("/usage", (c) => c.json(toPublicUser(c.var.user!).usage));

/* ---------------------------- WhatsApp ----------------------------- */

const sendSchema = z.union([
  z.object({ to: z.string(), text: z.string().trim().min(1).max(4096) }),
  z.object({
    to: z.string(),
    template: z.object({
      name: z.string().min(1).max(512),
      language: z.string().min(2).max(15).default("en_US"),
      components: z.array(z.unknown()).optional(),
    }),
  }),
]);

/** Send a WhatsApp text or template message. */
v1.post("/messages", async (c) => {
  const input = parse(sendSchema, await jsonBody(c));
  const payload: OutboundPayload =
    "text" in input ? { type: "text", text: input.text } : { type: "template", template: input.template };
  const userId = c.var.user!.id;
  const conn = await requireConnection(c.var, userId);
  const result = await sendMeteredMessage(c.var, {
    userId,
    conn,
    to: normalizePhone(input.to),
    payload,
    source: "api",
  });
  return c.json(result, 201);
});

const conversationSchema = z
  .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(8000) }))
  .min(1)
  .max(40);

/**
 * Generate a WhatsApp-style AI reply. With `send_to` the reply is also
 * delivered over WhatsApp; either way it counts as one message.
 */
v1.post("/ai/reply", async (c) => {
  const input = parse(
    z.object({ messages: conversationSchema, send_to: z.string().optional() }),
    await jsonBody(c),
  );
  const userId = c.var.user!.id;
  const conn = await requireConnection(c.var, userId);
  const conversation: ChatMessage[] = [
    { role: "system", content: conn.systemPrompt },
    ...(input.messages as ChatMessage[]),
  ];

  if (!input.send_to) {
    const reply = await metered(c.var, userId, () => generateConnectionReply(c.var, conn, conversation));
    return c.json({ reply });
  }
  const reply = await generateConnectionReply(c.var, conn, conversation);
  const message = await sendMeteredMessage(c.var, {
    userId,
    conn,
    to: normalizePhone(input.send_to),
    payload: { type: "text", text: reply },
    source: "api",
  });
  return c.json({ reply, message });
});

/* ---------------------------- Agentic AI ---------------------------- */

v1.get("/agents", async (c) => {
  const rows = await c.var.db
    .select({ id: agentsTable.id, name: agentsTable.name, tools: agentsTable.tools })
    .from(agentsTable)
    .where(eq(agentsTable.userId, c.var.user!.id))
    .orderBy(desc(agentsTable.createdAt));
  return c.json({ agents: rows.map((a) => ({ id: a.id, name: a.name, tools: a.tools.map((t) => t.name) })) });
});

/** Run an agent (it may call its webhook tools). */
v1.post("/agents/:id/runs", async (c) => {
  const userId = c.var.user!.id;
  const agent = await getAgent(c.var, userId, c.req.param("id"));
  const { messages } = parse(z.object({ messages: conversationSchema }), await jsonBody(c));

  const result = await metered(c.var, userId, () => runAgent(c.var, agent, messages as ChatMessage[]));
  await logExchange(c.var, {
    userId,
    agentId: agent.id,
    channel: "agent",
    source: "api",
    peer: "api",
    input: messages[messages.length - 1]!.content,
    reply: result.reply,
  });
  return c.json(result);
});

/* ------------------- OpenAI-compatible endpoints -------------------- */

const openAiMessageSchema = z.object({
  role: z.enum(["system", "developer", "user", "assistant"]),
  content: z.union([z.string(), z.array(z.object({ type: z.string(), text: z.string().optional() }))]),
});

function textOf(content: z.infer<typeof openAiMessageSchema>["content"]): string {
  return typeof content === "string"
    ? content
    : content.map((p) => (p.type === "text" ? (p.text ?? "") : "")).join("\n");
}

/** `GET /v1/models`: "default" plus one `agent:<id>` model per agent. */
v1.get("/models", async (c) => {
  const rows = await c.var.db
    .select({ id: agentsTable.id, createdAt: agentsTable.createdAt })
    .from(agentsTable)
    .where(eq(agentsTable.userId, c.var.user!.id));
  return c.json({
    object: "list",
    data: [
      { id: "default", object: "model", created: 0, owned_by: "zfusionai" },
      ...rows.map((a) => ({
        id: `agent:${a.id}`,
        object: "model",
        created: Math.floor(a.createdAt.getTime() / 1000),
        owned_by: "zfusionai",
      })),
    ],
  });
});

/**
 * Drop-in replacement for OpenAI's Chat Completions API: point any OpenAI SDK
 * at `${APP_URL}/api/v1` with a zf_live_ key. Model "agent:<id>" runs one of
 * your agents; "default" is a plain completion.
 */
v1.post("/chat/completions", async (c) => {
  try {
    const input = parse(
      z.object({
        model: z.string().default("default"),
        messages: z.array(openAiMessageSchema).min(1).max(60),
        stream: z.boolean().optional(),
      }),
      await jsonBody(c),
    );
    if (input.stream) {
      throw new HttpError(400, "Streaming is not supported yet; set stream: false.", "unsupported");
    }

    const messages: ChatMessage[] = input.messages.map((m) => {
      const content = textOf(m.content).slice(0, 16000);
      return m.role === "assistant"
        ? { role: "assistant", content }
        : { role: m.role === "user" ? "user" : "system", content };
    });

    const userId = c.var.user!.id;
    const agent = input.model.startsWith("agent:")
      ? await getAgent(c.var, userId, input.model.slice(6))
      : null;

    const reply = await metered(c.var, userId, async () =>
      agent ? (await runAgent(c.var, agent, messages)).reply : generateReply(c.var, messages),
    );

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    await logExchange(c.var, {
      userId,
      agentId: agent?.id ?? null,
      channel: "agent",
      source: "api",
      peer: "api",
      input: lastUser && typeof lastUser.content === "string" ? lastUser.content : "",
      reply,
    });

    return c.json({
      id: `chatcmpl-${randomToken(12)}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: agent ? input.model : c.var.config.ai.model,
      choices: [{ index: 0, message: { role: "assistant", content: reply }, finish_reason: "stop" }],
    });
  } catch (err) {
    // OpenAI SDKs expect `{ error: { message, type, code } }`.
    const status = err instanceof HttpError ? err.status : 500;
    return c.json(
      {
        error: {
          message: err instanceof HttpError ? err.message : "Internal error",
          type: status >= 500 ? "server_error" : "invalid_request_error",
          code: err instanceof HttpError ? (err.code ?? null) : null,
        },
      },
      status as 400,
    );
  }
});

export default v1;
