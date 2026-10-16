import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { messageLogsTable, whatsappConnectionsTable, type WhatsappConnection } from "@workspace/db";
import { isAiConfigured } from "../lib/ai";
import { decrypt, hmacSha256Hex, safeEqual } from "../lib/crypto";
import { logger } from "../lib/logger";
import { buildConversation, generateConnectionReply, sendMeteredMessage } from "../lib/messaging";
import type { AppEnv, Deps } from "../types";

type InboundMessage = { from: string; id: string; type: string; text?: { body: string } };

type WebhookBody = {
  entry?: {
    changes?: {
      value?: { metadata?: { phone_number_id?: string }; messages?: InboundMessage[] };
    }[];
  }[];
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function findConnection({ db }: Deps, id: string) {
  if (!UUID_RE.test(id)) return undefined;
  const [conn] = await db
    .select()
    .from(whatsappConnectionsTable)
    .where(eq(whatsappConnectionsTable.id, id))
    .limit(1);
  return conn;
}

async function hasValidSignature(deps: Deps, conn: WhatsappConnection, raw: string, header: string) {
  if (!conn.appSecretEnc) return true; // signature check is opt-in
  if (!header.startsWith("sha256=")) return false;
  const secret = await decrypt(deps.config.sessionSecret, conn.appSecretEnc);
  return safeEqual(header, `sha256=${await hmacSha256Hex(secret, raw)}`);
}

async function handleInbound(deps: Deps, conn: WhatsappConnection, msg: InboundMessage) {
  const text = msg.type === "text" && msg.text?.body ? msg.text.body : `[${msg.type} message]`;
  await deps.db.insert(messageLogsTable).values({
    userId: conn.userId,
    channel: "whatsapp",
    direction: "inbound",
    source: "webhook",
    peer: msg.from,
    body: text.slice(0, 4096),
    status: "received",
    providerMessageId: msg.id,
  });

  if (!conn.autoReplyEnabled || msg.type !== "text" || !isAiConfigured(deps.config)) return;

  const conversation = await buildConversation(deps, conn.userId, msg.from, conn.systemPrompt);
  const reply = await generateConnectionReply(deps, conn, conversation);
  await sendMeteredMessage(deps, {
    userId: conn.userId,
    conn,
    to: msg.from,
    payload: { type: "text", text: reply },
    source: "auto_reply",
  });
}

const webhooks = new Hono<AppEnv>();

/** Meta webhook verification handshake. */
webhooks.get("/whatsapp/:connectionId", async (c) => {
  const conn = await findConnection(c.var, c.req.param("connectionId"));
  const token = c.req.query("hub.verify_token");
  if (conn && c.req.query("hub.mode") === "subscribe" && token && safeEqual(token, conn.verifyToken)) {
    return c.text(c.req.query("hub.challenge") ?? "");
  }
  return c.text("Forbidden", 403);
});

/** Inbound messages from Meta: acknowledge immediately, reply in the background. */
webhooks.post("/whatsapp/:connectionId", async (c) => {
  const deps: Deps = { db: c.var.db, config: c.var.config };
  const conn = await findConnection(deps, c.req.param("connectionId"));
  if (!conn) return c.text("Not found", 404);

  const raw = await c.req.text();
  if (!(await hasValidSignature(deps, conn, raw, c.req.header("x-hub-signature-256") ?? ""))) {
    return c.text("Invalid signature", 401);
  }

  let body: WebhookBody = {};
  try {
    body = JSON.parse(raw) as WebhookBody;
  } catch {
    return c.text("Bad JSON", 400);
  }

  const messages =
    body.entry?.flatMap((e) =>
      (e.changes ?? [])
        .filter((ch) => ch.value?.metadata?.phone_number_id === conn.phoneNumberId)
        .flatMap((ch) => ch.value?.messages ?? []),
    ) ?? [];

  c.executionCtx.waitUntil(
    Promise.all(
      messages.map((msg) =>
        handleInbound(deps, conn, msg).catch((err) =>
          logger.warn({ err, connectionId: conn.id }, "WhatsApp auto-reply failed"),
        ),
      ),
    ),
  );
  return c.text("OK");
});

export default webhooks;
