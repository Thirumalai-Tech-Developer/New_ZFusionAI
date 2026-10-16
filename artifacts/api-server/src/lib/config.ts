import type { Bindings } from "../types";

function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export type Config = ReturnType<typeof buildConfig>;

function buildConfig(env: Bindings) {
  const isProduction = env.ENVIRONMENT === "production";
  const sessionSecret = clean(env.SESSION_SECRET);
  if (isProduction && (!sessionSecret || sessionSecret.length < 32)) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters in production.");
  }
  const appUrl = stripTrailingSlash(clean(env.APP_URL) ?? "http://localhost:5173");
  const gatewayUrl = clean(env.AI_GATEWAY_URL);

  return {
    isProduction,
    /** Public origin of the website, used for OAuth callbacks and redirects. */
    appUrl,
    sessionSecret: sessionSecret ?? "dev-only-insecure-session-secret-change-me",
    allowedOrigins: new Set(
      [appUrl, ...(clean(env.EXTRA_ALLOWED_ORIGINS)?.split(",") ?? [])]
        .map((o) => stripTrailingSlash(o.trim()))
        .filter(Boolean),
    ),
    ai: {
      /** Any OpenAI-compatible base URL, e.g. https://gateway.example.com/v1 */
      gatewayUrl: gatewayUrl ? stripTrailingSlash(gatewayUrl) : undefined,
      apiKey: clean(env.AI_GATEWAY_API_KEY),
      model: clean(env.AI_MODEL) ?? "gpt-4o-mini",
    },
    oauth: {
      google: {
        clientId: clean(env.GOOGLE_CLIENT_ID),
        clientSecret: clean(env.GOOGLE_CLIENT_SECRET),
      },
      github: {
        clientId: clean(env.GITHUB_CLIENT_ID),
        clientSecret: clean(env.GITHUB_CLIENT_SECRET),
      },
    },
    whatsapp: {
      graphVersion: clean(env.WHATSAPP_GRAPH_VERSION) ?? "v22.0",
    },
  };
}

const cache = new WeakMap<Bindings, Config>();

/** Config is derived from bindings once per isolate. */
export function getConfig(env: Bindings): Config {
  let config = cache.get(env);
  if (!config) {
    config = buildConfig(env);
    cache.set(env, config);
  }
  return config;
}
