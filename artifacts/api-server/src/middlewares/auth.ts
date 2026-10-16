import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { and, eq, gt } from "drizzle-orm";
import { apiKeysTable, sessionsTable, usersTable } from "@workspace/db";
import { randomToken, sha256 } from "../lib/crypto";
import { HttpError } from "../lib/errors";
import type { AppEnv } from "../types";

export const SESSION_COOKIE = "zf_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const API_KEY_PREFIX = "zf_live_";

const cookieOptions = (c: Context<AppEnv>) => ({
  httpOnly: true,
  secure: c.var.config.isProduction,
  sameSite: "Lax" as const,
  path: "/",
});

export async function createSession(c: Context<AppEnv>, userId: string) {
  const token = randomToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await c.var.db.insert(sessionsTable).values({ id: await sha256(token), userId, expiresAt });
  setCookie(c, SESSION_COOKIE, token, { ...cookieOptions(c), expires: expiresAt });
}

export async function destroySession(c: Context<AppEnv>) {
  const token = getCookie(c, SESSION_COOKIE);
  if (token) {
    await c.var.db.delete(sessionsTable).where(eq(sessionsTable.id, await sha256(token)));
  }
  deleteCookie(c, SESSION_COOKIE, cookieOptions(c));
}

/** Loads the session user (if any) into `c.var.user`. Never rejects. */
export const loadSession = createMiddleware<AppEnv>(async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE);
  if (token) {
    const [row] = await c.var.db
      .select({ user: usersTable })
      .from(sessionsTable)
      .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
      .where(and(eq(sessionsTable.id, await sha256(token)), gt(sessionsTable.expiresAt, new Date())))
      .limit(1);
    if (row) c.set("user", row.user);
  }
  await next();
});

export const requireUser = createMiddleware<AppEnv>(async (c, next) => {
  if (!c.var.user) throw new HttpError(401, "Sign in required.", "unauthorized");
  await next();
});

/**
 * CSRF guard for cookie-authenticated, state-changing requests: browsers always
 * send `Origin` on cross-site POST/PUT/DELETE, so reject foreign origins.
 */
export const sameOriginOnly = createMiddleware<AppEnv>(async (c, next) => {
  if (!["GET", "HEAD", "OPTIONS"].includes(c.req.method)) {
    const origin = c.req.header("origin");
    const self = new URL(c.req.url).origin;
    if (origin && origin !== self && !c.var.config.allowedOrigins.has(origin)) {
      throw new HttpError(403, "Cross-origin request blocked.", "bad_origin");
    }
  }
  await next();
});

/** Authenticates `Authorization: Bearer zf_live_...` API keys for the public API. */
export const requireApiKey = createMiddleware<AppEnv>(async (c, next) => {
  const header = c.req.header("authorization") ?? "";
  const key = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!key.startsWith(API_KEY_PREFIX)) {
    throw new HttpError(401, "Missing or invalid API key.", "invalid_api_key");
  }

  const [row] = await c.var.db
    .select({ user: usersTable, keyId: apiKeysTable.id })
    .from(apiKeysTable)
    .innerJoin(usersTable, eq(apiKeysTable.userId, usersTable.id))
    .where(and(eq(apiKeysTable.keyHash, await sha256(key)), eq(apiKeysTable.revoked, false)))
    .limit(1);
  if (!row) throw new HttpError(401, "Missing or invalid API key.", "invalid_api_key");

  c.set("user", row.user);
  c.executionCtx.waitUntil(
    c.var.db
      .update(apiKeysTable)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeysTable.id, row.keyId))
      .then(() => undefined, () => undefined),
  );
  await next();
});
