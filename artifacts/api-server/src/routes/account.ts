import { Hono } from "hono";
import { and, count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  agentsTable,
  apiKeysTable,
  messageLogsTable,
  whatsappConnectionsTable,
  type WhatsappConnection,
} from "@workspace/db";
import { isAiConfigured, type ChatMessage } from "../lib/ai";
import { encrypt, randomToken, sha256 } from "../lib/crypto";
import { HttpError } from "../lib/errors";
import { generateReply, requireConnection, sendMeteredMessage } from "../lib/messaging";
import { parse } from "../lib/validate";
import { getConnection, normalizePhone } from "../lib/whatsapp";
import { API_KEY_PREFIX, requireUser } from "../middlewares/auth";
import { rateLimit } from "../middlewares/rateLimit";
import type { AppEnv } from "../types";
import { jsonBody, toPublicUser } from "./serializers";

const account = new Hono<AppEnv>();
account.use("*", requireUser);

account.get("/", (c) =>
  c.json({ user: toPublicUser(c.var.user!), aiConfigured: isAiConfigured(c.var.config) }),
);

/* ---------------------------- API keys ---------------------------- */

account.get("/api-keys", async (c) => {
  const keys = await c.var.db
    .select({
      id: apiKeysTable.id,
      name: apiKeysTable.name,
      prefix: apiKeysTable.prefix,
      lastUsedAt: apiKeysTable.lastUsedAt,
      createdAt: apiKeysTable.createdAt,
    })
    .from(apiKeysTable)
    .where(and(eq(apiKeysTable.userId, c.var.user!.id), eq(apiKeysTable.revoked, false)))
    .orderBy(desc(apiKeysTable.createdAt));
  return c.json({ keys });
});

account.post("/api-keys", async (c) => {
  const { db, user } = c.var;
  const { name } = parse(z.object({ name: z.string().trim().min(1).max(60) }), await jsonBody(c));

  const [{ value: active } = { value: 0 }] = await db
    .select({ value: count() })
    .from(apiKeysTable)
    .where(and(eq(apiKeysTable.userId, user!.id), eq(apiKeysTable.revoked, false)));
  if (active >= 10) throw new HttpError(400, "You can have at most 10 active API keys.", "too_many_keys");

  const key = `${API_KEY_PREFIX}${randomToken(32)}`;
  const [row] = await db
    .insert(apiKeysTable)
    .values({
      userId: user!.id,
      name,
      prefix: key.slice(0, API_KEY_PREFIX.length + 6),
      keyHash: await sha256(key),
    })
    .returning({ id: apiKeysTable.id, createdAt: apiKeysTable.createdAt });

  // The raw key is returned exactly once.
  return c.json({ id: row!.id, name, key, createdAt: row!.createdAt }, 201);
});

account.delete("/api-keys/:id", async (c) => {
  await c.var.db
    .update(apiKeysTable)
    .set({ revoked: true })
    .where(and(eq(apiKeysTable.id, c.req.param("id")), eq(apiKeysTable.userId, c.var.user!.id)));
  return c.json({ ok: true });
});

/* ----------------------- WhatsApp connection ---------------------- */

function serializeConnection(appUrl: string, conn: WhatsappConnection | undefined) {
  if (!conn) return null;
  return {
    id: conn.id,
    phoneNumberId: conn.phoneNumberId,
    businessAccountId: conn.businessAccountId,
    verifyToken: conn.verifyToken,
    hasAppSecret: Boolean(conn.appSecretEnc),
    autoReplyEnabled: conn.autoReplyEnabled,
    agentId: conn.agentId,
    systemPrompt: conn.systemPrompt,
    webhookUrl: `${appUrl}/api/webhooks/whatsapp/${conn.id}`,
    updatedAt: conn.updatedAt,
  };
}

account.get("/whatsapp", async (c) =>
  c.json({ connection: serializeConnection(c.var.config.appUrl, await getConnection(c.var, c.var.user!.id)) }),
);

const numericId = z.string().trim().regex(/^\d{5,25}$/, "must be numeric");

const connectionSchema = z.object({
  phoneNumberId: numericId,
  businessAccountId: numericId.optional().or(z.literal("").transform(() => undefined)),
  // Optional on update: omitted means "keep the stored token".
  accessToken: z.string().trim().min(20).max(1000).optional(),
  appSecret: z.string().trim().min(8).max(200).optional(),
  autoReplyEnabled: z.boolean().default(true),
  /** Optional agent that answers instead of the plain system prompt. */
  agentId: z.string().uuid().nullable().optional(),
  systemPrompt: z.string().trim().min(10).max(4000).optional(),
});

account.put("/whatsapp", async (c) => {
  const { db, user, config } = c.var;
  const input = parse(connectionSchema, await jsonBody(c));
  const existing = await getConnection(c.var, user!.id);

  if (!existing && !input.accessToken) {
    throw new HttpError(400, "accessToken is required.", "validation_error");
  }
  if (input.agentId) {
    const [agent] = await db
      .select({ id: agentsTable.id })
      .from(agentsTable)
      .where(and(eq(agentsTable.id, input.agentId), eq(agentsTable.userId, user!.id)))
      .limit(1);
    if (!agent) throw new HttpError(400, "Selected agent not found.", "agent_not_found");
  }

  const secret = config.sessionSecret;
  const values = {
    phoneNumberId: input.phoneNumberId,
    businessAccountId: input.businessAccountId ?? null,
    autoReplyEnabled: input.autoReplyEnabled,
    ...(input.agentId !== undefined ? { agentId: input.agentId } : {}),
    ...(input.systemPrompt ? { systemPrompt: input.systemPrompt } : {}),
    ...(input.accessToken ? { accessTokenEnc: await encrypt(secret, input.accessToken) } : {}),
    ...(input.appSecret ? { appSecretEnc: await encrypt(secret, input.appSecret) } : {}),
    updatedAt: new Date(),
  };

  const [conn] = existing
    ? await db
        .update(whatsappConnectionsTable)
        .set(values)
        .where(eq(whatsappConnectionsTable.id, existing.id))
        .returning()
    : await db
        .insert(whatsappConnectionsTable)
        .values({
          ...values,
          userId: user!.id,
          accessTokenEnc: await encrypt(secret, input.accessToken!),
          verifyToken: randomToken(18),
        })
        .returning();

  return c.json({ connection: serializeConnection(config.appUrl, conn) });
});

account.delete("/whatsapp", async (c) => {
  await c.var.db
    .delete(whatsappConnectionsTable)
    .where(eq(whatsappConnectionsTable.userId, c.var.user!.id));
  return c.json({ ok: true });
});

/* --------------------------- Messages ----------------------------- */

account.get("/messages", async (c) => {
  const channel = c.req.query("channel");
  const userFilter = eq(messageLogsTable.userId, c.var.user!.id);
  const messages = await c.var.db
    .select()
    .from(messageLogsTable)
    .where(
      channel && ["whatsapp", "agent", "web"].includes(channel)
        ? and(userFilter, eq(messageLogsTable.channel, channel))
        : userFilter,
    )
    .orderBy(desc(messageLogsTable.createdAt))
    .limit(50);
  return c.json({ messages });
});

account.post("/send-test", rateLimit("AI_TEST_LIMITER", "send-test"), async (c) => {
  const { to, text } = parse(
    z.object({ to: z.string(), text: z.string().trim().min(1).max(4096) }),
    await jsonBody(c),
  );
  const userId = c.var.user!.id;
  const conn = await requireConnection(c.var, userId);
  return c.json(
    await sendMeteredMessage(c.var, {
      userId,
      conn,
      to: normalizePhone(to),
      payload: { type: "text", text },
      source: "dashboard",
    }),
  );
});

/** Preview the WhatsApp system prompt. Not metered (rate limited instead). */
account.post("/ai/playground", rateLimit("AI_TEST_LIMITER", "playground"), async (c) => {
  const { messages, systemPrompt } = parse(
    z.object({
      systemPrompt: z.string().trim().max(4000).optional(),
      messages: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(2000) }))
        .min(1)
        .max(20),
    }),
    await jsonBody(c),
  );
  const conn = await getConnection(c.var, c.var.user!.id);
  const prompt =
    systemPrompt || conn?.systemPrompt || "You are a helpful WhatsApp customer support assistant.";
  const reply = await generateReply(c.var, [
    { role: "system", content: prompt },
    ...(messages as ChatMessage[]),
  ]);
  return c.json({ reply });
});

export default account;
