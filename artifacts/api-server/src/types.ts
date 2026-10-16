import type { Db, User } from "@workspace/db";
import type { Config } from "./lib/config";

/** Worker bindings and secrets (see wrangler.toml and .env / `wrangler secret put`). */
export type Bindings = {
  DB: D1Database;
  ASSETS: Fetcher;

  // Workers Rate Limiting bindings (optional so local tooling never breaks).
  AUTH_LIMITER?: RateLimit;
  API_LIMITER?: RateLimit;
  PUBLIC_LIMITER?: RateLimit;
  AI_TEST_LIMITER?: RateLimit;

  // AI gateway (OpenAI-compatible)
  AI_GATEWAY_URL?: string;
  AI_GATEWAY_API_KEY?: string;
  AI_MODEL?: string;

  APP_URL?: string;
  ENVIRONMENT?: string;
  SESSION_SECRET?: string;
  EXTRA_ALLOWED_ORIGINS?: string;

  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;

  WHATSAPP_GRAPH_VERSION?: string;
};

export type Variables = {
  db: Db;
  config: Config;
  user?: User;
};

export type AppEnv = { Bindings: Bindings; Variables: Variables };

/** What library code needs from a request. */
export type Deps = { db: Db; config: Config };
