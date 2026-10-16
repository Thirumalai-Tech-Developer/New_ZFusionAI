import { defineConfig } from "drizzle-kit";

// Generates SQL migrations for Cloudflare D1. Apply them with Wrangler:
//   pnpm --filter @workspace/api-server run db:migrate:local   (or :remote)
export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dialect: "sqlite",
});
