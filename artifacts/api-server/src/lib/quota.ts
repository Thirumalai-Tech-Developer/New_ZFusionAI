import { and, eq, lt, sql } from "drizzle-orm";
import { usersTable, type Db } from "@workspace/db";
import { HttpError } from "./errors";

/**
 * Atomically reserves one message from the user's shared allowance
 * (WhatsApp, AI agents and web widget all draw from it).
 * Throws 402 when the free trial (or plan) is exhausted.
 */
export async function reserveMessage(db: Db, userId: string): Promise<void> {
  const [row] = await db
    .update(usersTable)
    .set({ messagesUsed: sql`${usersTable.messagesUsed} + 1` })
    .where(and(eq(usersTable.id, userId), lt(usersTable.messagesUsed, usersTable.messageLimit)))
    .returning({ id: usersTable.id });

  if (!row) {
    throw new HttpError(
      402,
      "Message allowance exhausted. Contact ZFusionAI on WhatsApp to upgrade your plan.",
      "quota_exceeded",
    );
  }
}

/** Gives a reserved message back when the work fails. */
export async function refundMessage(db: Db, userId: string): Promise<void> {
  await db
    .update(usersTable)
    .set({ messagesUsed: sql`MAX(${usersTable.messagesUsed} - 1, 0)` })
    .where(eq(usersTable.id, userId));
}
