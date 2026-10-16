import { sqliteTable, text, integer, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { timestamps, usersTable } from "./users";

/** A webhook tool the agent can call: ZFusionAI POSTs the JSON arguments to `url`. */
export type AgentTool = {
  name: string;
  description: string;
  url: string;
  /** JSON Schema for the tool arguments (OpenAI function-calling format). */
  parameters: Record<string, unknown>;
};

export const agentsTable = sqliteTable(
  "agents",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    instructions: text("instructions").notNull(),
    tools: text("tools", { mode: "json" }).$type<AgentTool[]>().notNull().default([]),
    // Encrypted; sent as an HMAC signature header on tool calls so users can verify them.
    toolSecret: text("tool_secret").notNull(),

    // Web app chat widget
    publicId: text("public_id").notNull(),
    widgetEnabled: integer("widget_enabled", { mode: "boolean" }).notNull().default(false),
    widgetAllowedOrigins: text("widget_allowed_origins", { mode: "json" })
      .$type<string[]>()
      .notNull()
      .default([]),
    widgetWelcome: text("widget_welcome").notNull().default("Hi! 👋 How can I help you today?"),
    widgetColor: text("widget_color").notNull().default("#25D366"),
    ...timestamps,
  },
  (t) => [uniqueIndex("agents_public_id_idx").on(t.publicId), index("agents_user_idx").on(t.userId)],
);

export type Agent = typeof agentsTable.$inferSelect;
