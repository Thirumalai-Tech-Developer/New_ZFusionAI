import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex, index } from "drizzle-orm/sqlite-core";

/** One-time allowance activated after a signed-in account claims a unique phone. */
export const FREE_TRIAL_MESSAGE_LIMIT = 1000;

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

export const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
};

export const usersTable = sqliteTable(
  "users",
  {
    id: id(),
    email: text("email").notNull(),
    name: text("name"),
    avatarUrl: text("avatar_url"),
    plan: text("plan").notNull().default("trial"),
    // Access is gated by trialActivatedAt; retain the historical SQL default.
    messageLimit: integer("message_limit").notNull().default(FREE_TRIAL_MESSAGE_LIMIT),
    trialActivatedAt: integer("trial_activated_at", { mode: "timestamp_ms" }),
    messagesUsed: integer("messages_used").notNull().default(0),
    ...timestamps,
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);

// Deliberately retained after account deletion: deleting an account must not
// make its phone eligible for another free trial. No phone is exposed publicly.
export const trialClaimsTable = sqliteTable("trial_claims", {
  phone: text("phone").primaryKey(),
  userId: text("user_id").notNull().unique(),
  createdAt: timestamps.createdAt,
});

export const passwordAccountsTable = sqliteTable("password_accounts", {
  userId: text("user_id").primaryKey().references(() => usersTable.id, { onDelete: "cascade" }),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamps.createdAt,
});

export const oauthAccountsTable = sqliteTable(
  "oauth_accounts",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(), // "google" | "github"
    providerAccountId: text("provider_account_id").notNull(),
    createdAt: timestamps.createdAt,
  },
  (t) => [uniqueIndex("oauth_provider_account_idx").on(t.provider, t.providerAccountId)],
);

export const sessionsTable = sqliteTable(
  "sessions",
  {
    // SHA-256 of the opaque cookie token; the raw token is never stored.
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: timestamps.createdAt,
  },
  (t) => [index("sessions_user_idx").on(t.userId)],
);

export const apiKeysTable = sqliteTable(
  "api_keys",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    // First characters of the key, shown in the dashboard for identification.
    prefix: text("prefix").notNull(),
    keyHash: text("key_hash").notNull(),
    lastUsedAt: integer("last_used_at", { mode: "timestamp_ms" }),
    revoked: integer("revoked", { mode: "boolean" }).notNull().default(false),
    createdAt: timestamps.createdAt,
  },
  (t) => [uniqueIndex("api_keys_hash_idx").on(t.keyHash), index("api_keys_user_idx").on(t.userId)],
);

export type User = typeof usersTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;
export type ApiKey = typeof apiKeysTable.$inferSelect;
