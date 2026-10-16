import { Hono, type Context } from "hono";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { and, eq } from "drizzle-orm";
import { oauthAccountsTable, passwordAccountsTable, usersTable } from "@workspace/db";
import { z } from "zod";
import { parse } from "../lib/validate";
import { hashPassword, verifyPassword } from "../lib/password";
import type { Config } from "../lib/config";
import { randomToken, sha256, sha256Base64Url } from "../lib/crypto";
import { HttpError } from "../lib/errors";
import { logger } from "../lib/logger";
import { createSession, destroySession } from "../middlewares/auth";
import { rateLimit } from "../middlewares/rateLimit";
import type { AppEnv } from "../types";
import { jsonBody, toPublicUser } from "./serializers";

type Provider = "google" | "github";

type Profile = {
  providerAccountId: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  avatarUrl: string | null;
};

const STATE_COOKIE = "zf_oauth";

export function verifiedGoogleProfile(p: {
  sub: string; email?: string; email_verified?: boolean; name?: string; picture?: string;
}): Profile {
  if (!p.sub || !p.email || p.email_verified !== true) {
    throw new HttpError(403, "Use a Google account with a verified email address.", "google_email_unverified");
  }
  return {
    providerAccountId: p.sub,
    email: p.email.toLowerCase(),
    emailVerified: true,
    name: p.name ?? null,
    avatarUrl: p.picture ?? null,
  };
}

const providers: Record<
  Provider,
  {
    credentials: (config: Config) => { clientId?: string; clientSecret?: string };
    authorizeUrl: string;
    tokenUrl: string;
    scope: string;
    fetchProfile: (accessToken: string) => Promise<Profile>;
  }
> = {
  google: {
    credentials: (config) => config.oauth.google,
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scope: "openid email profile",
    async fetchProfile(accessToken) {
      const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error(`Google userinfo failed: ${res.status}`);
      const p = (await res.json()) as {
        sub: string;
        email?: string;
        email_verified?: boolean;
        name?: string;
        picture?: string;
      };
      return verifiedGoogleProfile(p);
    },
  },
  github: {
    credentials: (config) => config.oauth.github,
    authorizeUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    scope: "read:user user:email",
    async fetchProfile(accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "ZFusionAI",
      };
      const [userRes, emailsRes] = await Promise.all([
        fetch("https://api.github.com/user", { headers }),
        fetch("https://api.github.com/user/emails", { headers }),
      ]);
      if (!userRes.ok) throw new Error(`GitHub user failed: ${userRes.status}`);
      const u = (await userRes.json()) as {
        id: number;
        login: string;
        name?: string | null;
        avatar_url?: string;
      };
      const emails = emailsRes.ok
        ? ((await emailsRes.json()) as { email: string; primary: boolean; verified: boolean }[])
        : [];
      const primary = emails.find((e) => e.primary && e.verified) ?? emails.find((e) => e.verified);
      if (!primary) throw new Error("GitHub account has no verified email");
      return {
        providerAccountId: String(u.id),
        email: primary.email.toLowerCase(),
        emailVerified: true,
        name: u.name ?? u.login,
        avatarUrl: u.avatar_url ?? null,
      };
    },
  },
};

const isProvider = (v: string): v is Provider => v === "google" || v === "github";

function isConfigured(config: Config, p: Provider) {
  const { clientId, clientSecret } = providers[p].credentials(config);
  return Boolean(clientId && clientSecret);
}

/** Only allow same-site relative redirects to prevent open redirects. */
function safeNext(value: unknown): string {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\")
    ? value
    : "/dashboard";
}

const callbackUrl = (config: Config, p: Provider) => `${config.appUrl}/api/auth/${p}/callback`;

/**
 * Finds or creates the user for an OAuth profile. D1 has no interactive
 * transactions, so this relies on unique indexes to resolve races.
 */
async function upsertUser(c: Context<AppEnv>, provider: Provider, profile: Profile) {
  const { db } = c.var;
  const [linked] = await db
    .select({ user: usersTable })
    .from(oauthAccountsTable)
    .innerJoin(usersTable, eq(oauthAccountsTable.userId, usersTable.id))
    .where(
      and(
        eq(oauthAccountsTable.provider, provider),
        eq(oauthAccountsTable.providerAccountId, profile.providerAccountId),
      ),
    )
    .limit(1);

  if (linked) {
    const [updated] = await db
      .update(usersTable)
      .set({
        name: linked.user.name ?? profile.name,
        avatarUrl: profile.avatarUrl ?? linked.user.avatarUrl,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, linked.user.id))
      .returning();
    return updated!;
  }

  // Link to an existing account with the same email only when the provider
  // has verified that email (prevents account takeover).
  const [byEmail] = await db.select().from(usersTable).where(eq(usersTable.email, profile.email)).limit(1);
  if (byEmail && !profile.emailVerified) {
    throw new HttpError(
      409,
      "An account with this email already exists. Sign in with the original provider.",
      "email_unverified",
    );
  }

  let user = byEmail;
  if (!user) {
    await db
      .insert(usersTable)
      .values({ email: profile.email, name: profile.name, avatarUrl: profile.avatarUrl })
      .onConflictDoNothing();
    [user] = await db.select().from(usersTable).where(eq(usersTable.email, profile.email)).limit(1);
  }

  // Password registrations have not proved email ownership. Never silently
  // merge a verified Google identity into an unverified password account.
  const [passwordAccount] = await db.select({ id: passwordAccountsTable.userId })
    .from(passwordAccountsTable).where(eq(passwordAccountsTable.userId, user!.id)).limit(1);
  if (passwordAccount) throw new HttpError(409, "Use email and password to sign in to this account.", "password_account_exists");

  await db
    .insert(oauthAccountsTable)
    .values({ userId: user!.id, provider, providerAccountId: profile.providerAccountId })
    .onConflictDoNothing();
  return user!;
}

const auth = new Hono<AppEnv>();

const credentials = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(128),
});

auth.post("/register", rateLimit("AUTH_LIMITER", "register"), async (c) => {
  const input = parse(credentials.extend({
    name: z.string().trim().min(1).max(100),
    password: z.string().min(15, "Use at least 15 characters.").max(128),
  }), await jsonBody(c));
  const id = crypto.randomUUID();
  const passwordHash = await hashPassword(input.password, c.var.config.sessionSecret);
  const [, created] = await c.env.DB.batch([
    c.env.DB.prepare("INSERT INTO users (id, email, name) VALUES (?, ?, ?) ON CONFLICT DO NOTHING").bind(id, input.email, input.name),
    c.env.DB.prepare("INSERT INTO password_accounts (user_id, password_hash) SELECT id, ? FROM users WHERE id = ? RETURNING user_id").bind(passwordHash, id),
  ]);
  if (!created.results.length) throw new HttpError(409, "This email is already registered. Sign in to your existing account.", "account_exists");
  const [user] = await c.var.db.select().from(usersTable).where(eq(usersTable.id, id));
  if (c.var.user) await destroySession(c);
  await createSession(c, id);
  return c.json({ user: toPublicUser(user!) }, 201);
});

auth.post("/login", rateLimit("AUTH_LIMITER", "password-login"), async (c) => {
  const input = parse(credentials, await jsonBody(c));
  // Limit attempts against one email even when requests come from different IPs.
  if (c.env.AUTH_LIMITER) {
    const { success } = await c.env.AUTH_LIMITER.limit({ key: `password-email:${await sha256(input.email)}` });
    if (!success) throw new HttpError(429, "Too many sign-in attempts. Please try again in a minute.", "rate_limited");
  }
  const [row] = await c.var.db.select({ user: usersTable, hash: passwordAccountsTable.passwordHash })
    .from(usersTable).innerJoin(passwordAccountsTable, eq(passwordAccountsTable.userId, usersTable.id))
    .where(eq(usersTable.email, input.email)).limit(1);
  if (!await verifyPassword(input.password, row?.hash, c.var.config.sessionSecret)) {
    throw new HttpError(401, "Incorrect email or password.", "invalid_credentials");
  }
  if (c.var.user) await destroySession(c);
  await createSession(c, row!.user.id);
  return c.json({ user: toPublicUser(row!.user) });
});

auth.get("/providers", (c) =>
  c.json({
    google: isConfigured(c.var.config, "google"),
    github: isConfigured(c.var.config, "github"),
  }),
);

auth.get("/me", (c) => {
  if (!c.var.user) return c.json({ error: "unauthorized" }, 401);
  return c.json({ user: toPublicUser(c.var.user) });
});

auth.post("/logout", async (c) => {
  await destroySession(c);
  return c.json({ ok: true });
});

auth.get("/:provider", rateLimit("AUTH_LIMITER", "auth"), async (c) => {
  const provider = c.req.param("provider");
  const { config } = c.var;

  // The OAuth callback always targets APP_URL, so the state cookie must be set
  // on that host too (e.g. send www.zfusionai.com to zfusionai.com first).
  const here = new URL(c.req.url);
  const appOrigin = new URL(config.appUrl).origin;
  if (here.origin !== appOrigin) {
    return c.redirect(`${appOrigin}${here.pathname}${here.search}`, 302);
  }

  if (!isProvider(provider)) throw new HttpError(404, "Unknown provider.");
  if (!isConfigured(config, provider)) return c.redirect(`/login?error=${provider}_not_configured`);

  const p = providers[provider];
  const state = randomToken(24);
  const verifier = randomToken(48);

  await setSignedCookie(
    c,
    STATE_COOKIE,
    JSON.stringify({ provider, state, verifier, next: safeNext(c.req.query("next")) }),
    config.sessionSecret,
    { httpOnly: true, secure: config.isProduction, sameSite: "Lax", maxAge: 600, path: "/api/auth" },
  );

  const url = new URL(p.authorizeUrl);
  url.searchParams.set("client_id", p.credentials(config).clientId!);
  url.searchParams.set("redirect_uri", callbackUrl(config, provider));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", p.scope);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", await sha256Base64Url(verifier));
  url.searchParams.set("code_challenge_method", "S256");
  if (provider === "google") url.searchParams.set("prompt", "select_account");
  return c.redirect(url.toString());
});

auth.get("/:provider/callback", rateLimit("AUTH_LIMITER", "auth"), async (c) => {
  const provider = c.req.param("provider");
  const { config } = c.var;
  const raw = await getSignedCookie(c, config.sessionSecret, STATE_COOKIE);
  deleteCookie(c, STATE_COOKIE, { path: "/api/auth" });

  const fail = (code: string) => c.redirect(`/login?error=${code}`);
  if (!isProvider(provider) || !raw) return fail("invalid_state");

  let saved: { provider: string; state: string; verifier: string; next: string };
  try {
    saved = JSON.parse(raw);
  } catch {
    return fail("invalid_state");
  }
  if (saved.provider !== provider || saved.state !== c.req.query("state")) return fail("invalid_state");
  const code = c.req.query("code");
  if (c.req.query("error") || !code) return fail("access_denied");

  const p = providers[provider];
  const { clientId, clientSecret } = p.credentials(config);
  try {
    const tokenRes = await fetch(p.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        code,
        redirect_uri: callbackUrl(config, provider),
        grant_type: "authorization_code",
        code_verifier: saved.verifier,
      }),
    });
    const token = (await tokenRes.json()) as { access_token?: string };
    if (!token.access_token) throw new Error("No access token returned");

    const profile = await p.fetchProfile(token.access_token);
    const user = await upsertUser(c, provider, profile);
    await createSession(c, user.id);
    return c.redirect(safeNext(saved.next));
  } catch (err) {
    logger.warn({ err, provider }, "OAuth callback failed");
    return fail(err instanceof HttpError && err.code ? err.code : "oauth_failed");
  }
});

export default auth;
