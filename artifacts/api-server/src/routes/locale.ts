import { Hono } from "hono";
import type { AppEnv } from "../types";

const currencies: Record<string, string> = {
  AE: "AED", IN: "INR", US: "USD", GB: "GBP", SA: "SAR", QA: "QAR",
  KW: "KWD", BH: "BHD", OM: "OMR", CA: "CAD", AU: "AUD", SG: "SGD",
  JP: "JPY", CN: "CNY", PK: "PKR", BD: "BDT", NZ: "NZD", CH: "CHF",
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", IE: "EUR",
  AT: "EUR", BE: "EUR", PT: "EUR", FI: "EUR", GR: "EUR", CY: "EUR",
  EE: "EUR", LV: "EUR", LT: "EUR", LU: "EUR", MT: "EUR", SK: "EUR",
  SI: "EUR", HR: "EUR", BG: "EUR",
};
export function currencyForCountry(country: string | undefined) {
  return country ? currencies[country.toUpperCase()] ?? "USD" : "AED";
}

let cached: { rates: Record<string, number>; updatedAt: string; expires: number } | undefined;
const locale = new Hono<AppEnv>();
locale.get("/", async (c) => {
  const country = typeof c.req.raw.cf?.country === "string" ? c.req.raw.cf.country : null;
  // Country varies per visitor: never let a shared page cache reuse this response.
  c.header("Cache-Control", "private, no-store");
  if (!cached || cached.expires < Date.now()) {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/AED", {
        signal: AbortSignal.timeout(3000), cf: { cacheTtl: 86400, cacheEverything: true },
      });
      if (!response.ok) throw new Error("rate provider unavailable");
      const data = await response.json() as { result: string; rates: Record<string, number>; time_last_update_utc: string };
      if (data.result !== "success" || data.rates?.AED !== 1) throw new Error("invalid rates");
      const rates = Object.fromEntries(Object.entries(data.rates).filter(([code, rate]) => /^[A-Z]{3}$/.test(code) && Number.isFinite(rate) && rate > 0));
      cached = { rates, updatedAt: data.time_last_update_utc, expires: Date.now() + 3600_000 };
    } catch {
      // Keep a previously fetched rate if available; otherwise display base AED.
    }
  }
  return c.json({ country, currency: currencyForCountry(country ?? undefined),
    rates: cached?.rates ?? { AED: 1 }, updatedAt: cached?.updatedAt ?? null });
});
export default locale;
