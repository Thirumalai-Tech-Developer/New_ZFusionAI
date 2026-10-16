import { sqliteTable, text, integer, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { timestamps, usersTable } from "./users";
import { agentsTable } from "./agents";

export const whatsappConnectionsTable = sqliteTable(
  "whatsapp_connections",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    phoneNumberId: text("phone_number_id").notNull(),
    businessAccountId: text("business_account_id"),
    // AES-256-GCM encrypted Meta credentials.
    accessTokenEnc: text("access_token_enc").notNull(),
    appSecretEnc: text("app_secret_enc"),
    verifyToken: text("verify_token").notNull(),
    autoReplyEnabled: integer("auto_reply_enabled", { mode: "boolean" }).notNull().default(true),
    // When set, auto-replies run this agent (with its tools) instead of systemPrompt.
    agentId: text("agent_id").references(() => agentsTable.id, { onDelete: "set null" }),
    systemPrompt: text("system_prompt")
      .notNull()
      .default(
        "You are a friendly, concise customer support assistant for this business. Reply in the customer's language. Keep answers under 80 words.",
      ),
    ...timestamps,
  },
  (t) => [uniqueIndex("wa_conn_user_idx").on(t.userId)],
);

export const messageLogsTable = sqliteTable(
  "message_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    channel: text("channel").notNull().default("whatsapp"), // "whatsapp" | "agent" | "web"
    agentId: text("agent_id"),
    direction: text("direction").notNull(), // "inbound" | "outbound"
    source: text("source").notNull(), // "api" | "auto_reply" | "webhook" | "dashboard" | "widget"
    // WhatsApp number (E.164 digits), widget session id, or "api".
    peer: text("peer").notNull(),
    body: text("body").notNull(),
    status: text("status").notNull(), // "received" | "sent" | "failed"
    providerMessageId: text("provider_message_id"),
    error: text("error"),
    createdAt: timestamps.createdAt,
  },
  (t) => [
    index("message_logs_user_created_idx").on(t.userId, t.createdAt),
    index("message_logs_peer_idx").on(t.userId, t.channel, t.peer),
  ],
);

export type WhatsappConnection = typeof whatsappConnectionsTable.$inferSelect;
export type MessageLog = typeof messageLogsTable.$inferSelect;
