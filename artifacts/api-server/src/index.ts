import { Hono } from "hono";
import { createDb } from "@workspace/db";
import { getConfig } from "./lib/config";
import { HttpError } from "./lib/errors";
import { logger } from "./lib/logger";
import { loadSession, sameOriginOnly } from "./middlewares/auth";
import accountRoutes from "./routes/account";
import agentRoutes from "./routes/agents";
import authRoutes from "./routes/auth";
import publicRoutes from "./routes/public";
import v1Routes from "./routes/v1";
import webhookRoutes from "./routes/webhooks";
import type { AppEnv } from "./types";

/**
 * ZFusionAI API — Cloudflare Worker.
 *
 * `/api/*` is handled here (see `run_worker_first` in wrangler.toml); every
 * other path is served from the React build via the ASSETS binding.
 */
const app = new Hono<AppEnv>().basePath("/api");

app.use("*", async (c, next) => {
  c.set("db", createDb(c.env.DB));
  c.set("config", getConfig(c.env));
  await next();
});

app.get("/healthz", (c) => c.json({ status: "ok" }));

// No cookies on these: API keys, Meta signatures and the public widget.
app.route("/v1", v1Routes);
app.route("/webhooks", webhookRoutes);
app.route("/public", publicRoutes);

// Cookie-session routes (same-origin dashboard).
app.use("/auth/*", loadSession, sameOriginOnly);
app.use("/account/*", loadSession, sameOriginOnly);
app.use("/account", loadSession, sameOriginOnly);
app.route("/auth", authRoutes);
app.route("/account/agents", agentRoutes);
app.route("/account", accountRoutes);

app.notFound((c) => c.json({ error: "not_found", message: "Route not found." }, 404));

app.onError((err, c) => {
  if (err instanceof HttpError) {
    return c.json({ error: err.code ?? "error", message: err.message }, err.status as 400);
  }
  logger.error({ err, path: c.req.path }, "Unhandled error");
  return c.json({ error: "internal_error", message: "Something went wrong." }, 500);
});

export default app;
