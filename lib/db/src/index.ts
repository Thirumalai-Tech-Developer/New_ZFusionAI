import { drizzle, type AnyD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

/** Creates a Drizzle client for a Cloudflare D1 binding (e.g. `env.DB`). */
export function createDb(d1: AnyD1Database) {
  return drizzle(d1, { schema });
}

export type Db = ReturnType<typeof createDb>;

export * from "./schema";
