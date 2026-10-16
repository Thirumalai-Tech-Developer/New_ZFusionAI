import { and, desc, eq } from "drizzle-orm";
import { agentsTable, messageLogsTable, type WhatsappConnection } from "@workspace/db";
import type { Deps } from "../types";
import { createChatCompletion, type ChatMessage } from "./ai";
import { runAgent } from "./agents";
import { HttpError } from "./errors";
import { refundMessage, reserveMessage } from "./quota";
import { getConnection, sendWhatsAppMessage, type OutboundPayload } from "./whatsapp";

export async function requireConnection(deps: Deps, userId: string): Promise<WhatsappConnection> {
  const conn = await getConnection(deps, userId);
  if (!conn) {
    throw new HttpError(
      409,
      "Connect your WhatsApp Cloud API number in the dashboard first.",
      "whatsapp_not_connected",
    );
  }
  return conn;
}

/**
 * Charges one message from the shared trial/plan allowance for `fn`; the
 * message is refunded if `fn` throws.
 */
export async function metered<T>({ db }: Deps, userId: string, fn: () => Promise<T>): Promise<T> {
  await reserveMessage(db, userId);
  try {
    return await fn();
  } catch (err) {
    await refundMessage(db, userId);
    throw err;
  }
}

/**
 * Sends one metered WhatsApp message: reserves quota, delivers via Meta,
 * logs the result and refunds the quota if delivery fails.
 */
export async function sendMeteredMessage(
  deps: Deps,
  params: {
    userId: string;
    conn: WhatsappConnection;
    to: string;
    payload: OutboundPayload;
    source: "api" | "auto_reply" | "dashboard";
  },
): Promise<{ id: string; providerMessageId: string }> {
  const { db } = deps;
  const { userId, conn, to, payload, source } = params;
  const body = payload.type === "text" ? payload.text : `[template:${payload.template.name}]`;
  const base = { userId, channel: "whatsapp", direction: "outbound", source, peer: to, body } as const;

  await reserveMessage(db, userId);
  try {
    const providerMessageId = await sendWhatsAppMessage(deps, conn, to, payload);
    const [log] = await db
      .insert(messageLogsTable)
      .values({ ...base, status: "sent", providerMessageId })
      .returning({ id: messageLogsTable.id });
    return { id: log!.id, providerMessageId };
  } catch (err) {
    await refundMessage(db, userId);
    await db.insert(messageLogsTable).values({
      ...base,
      status: "failed",
      error: err instanceof Error ? err.message.slice(0, 500) : "unknown",
    });
    throw err;
  }
}

/** Builds the AI conversation for a WhatsApp customer from recent history. */
export async function buildConversation(
  { db }: Deps,
  userId: string,
  peer: string,
  systemPrompt: string,
): Promise<ChatMessage[]> {
  const history = await db
    .select()
    .from(messageLogsTable)
    .where(
      and(
        eq(messageLogsTable.userId, userId),
        eq(messageLogsTable.channel, "whatsapp"),
        eq(messageLogsTable.peer, peer),
      ),
    )
    .orderBy(desc(messageLogsTable.createdAt))
    .limit(12);

  return [
    { role: "system" as const, content: systemPrompt },
    ...history
      .reverse()
      .filter((m) => m.status !== "failed" && !m.body.startsWith("[template:"))
      .map(
        (m): ChatMessage => ({
          role: m.direction === "inbound" ? "user" : "assistant",
          content: m.body,
        }),
      ),
  ];
}

export async function generateReply(deps: Deps, messages: ChatMessage[]): Promise<string> {
  return createChatCompletion(deps.config, messages, { maxTokens: 350 });
}

/** WhatsApp replies use the linked agent (with tools) when one is selected. */
export async function generateConnectionReply(
  deps: Deps,
  conn: WhatsappConnection,
  conversation: ChatMessage[],
): Promise<string> {
  if (conn.agentId) {
    const [agent] = await deps.db
      .select()
      .from(agentsTable)
      .where(eq(agentsTable.id, conn.agentId))
      .limit(1);
    if (agent) {
      const { reply } = await runAgent(deps, agent, conversation, {
        extraInstructions: "You are replying on WhatsApp. Keep answers short and use plain text.",
      });
      return reply;
    }
  }
  return generateReply(deps, conversation);
}

/** Logs an agent/widget exchange (input + reply) for the dashboard. */
export async function logExchange(
  { db }: Deps,
  params: {
    userId: string;
    agentId: string | null;
    channel: "agent" | "web";
    source: "api" | "widget" | "dashboard";
    peer: string;
    input: string;
    reply: string;
  },
) {
  const { input, reply, ...rest } = params;
  const now = Date.now();
  await db.insert(messageLogsTable).values([
    { ...rest, direction: "inbound", body: input.slice(0, 4096), status: "received", createdAt: new Date(now) },
    { ...rest, direction: "outbound", body: reply.slice(0, 4096), status: "sent", createdAt: new Date(now + 1) },
  ]);
}
