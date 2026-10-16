import type { Context } from "hono";
import type { User } from "@workspace/db";

export function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    plan: user.plan,
    usage: {
      used: user.messagesUsed,
      limit: user.messageLimit,
      remaining: Math.max(0, user.messageLimit - user.messagesUsed),
    },
    createdAt: user.createdAt,
  };
}

/** Reads a JSON body; invalid JSON becomes `undefined` so zod reports it. */
export async function jsonBody(c: Context): Promise<unknown> {
  return c.req.json().catch(() => undefined);
}
