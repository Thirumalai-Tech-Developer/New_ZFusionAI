import { createMiddleware } from "hono/factory";
import { HttpError } from "../lib/errors";
import type { AppEnv, Bindings } from "../types";

type LimiterName = "AUTH_LIMITER" | "API_LIMITER" | "PUBLIC_LIMITER" | "AI_TEST_LIMITER";

/**
 * Uses a Workers Rate Limiting binding (configured in wrangler.toml). Keyed by
 * user id when known, otherwise by client IP. A missing binding is a no-op.
 */
export function rateLimit(binding: LimiterName, scope = "") {
  return createMiddleware<AppEnv>(async (c, next) => {
    const limiter = (c.env as Bindings)[binding];
    if (limiter) {
      const who = c.var.user?.id ?? c.req.header("cf-connecting-ip") ?? "anon";
      const { success } = await limiter.limit({ key: `${scope}:${who}` });
      if (!success) {
        c.header("Retry-After", "60");
        throw new HttpError(429, "Too many requests, slow down.", "rate_limited");
      }
    }
    await next();
  });
}
