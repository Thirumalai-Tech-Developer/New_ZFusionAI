import type { Context } from "hono";
import type { User } from "@workspace/db";

export function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    plan: user.plan,
    trialActivated: user.plan !== "trial" || Boolean(user.trialActivatedAt),
    usage: {
      used: user.messagesUsed,
      limit: user.plan === "trial" && !user.trialActivatedAt ? 0 : user.messageLimit,
      remaining: user.plan === "trial" && !user.trialActivatedAt ? 0 : Math.max(0, user.messageLimit - user.messagesUsed),
    },
    createdAt: user.createdAt,
  };
}

/** Reads a JSON body; invalid JSON becomes `undefined` so zod reports it. */
export async function jsonBody(c: Context): Promise<unknown> {
  return c.req.json().catch(() => undefined);
}
