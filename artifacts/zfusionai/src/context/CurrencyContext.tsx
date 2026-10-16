import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const CURRENCIES = ["AED", "INR", "USD", "EUR", "GBP", "SAR", "QAR", "KWD", "BHD", "OMR", "CAD", "AUD", "SGD", "JPY", "CNY", "PKR", "BDT", "NZD", "CHF"];
type Locale = { country: string | null; currency: string; rates: Record<string, number>; updatedAt: string | null };
const CurrencyContext = createContext({ currency: "AED", automaticCurrency: "AED", rateDate: null as string | null, preference: "auto", setPreference: (_value: string) => {}, format: (aed: number) => `AED ${aed}`, estimated: false });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [preference, setValue] = useState(() => {
    try { const saved = localStorage.getItem("zf-currency"); return saved && CURRENCIES.includes(saved) ? saved : "auto"; }
    catch { return "auto"; }
  });
  const { data } = useQuery({ queryKey: ["locale"], queryFn: () => api<Locale>("/locale"), staleTime: 3600_000 });
  const requested = preference === "auto" ? data?.currency ?? "AED" : preference;
  const currency = data?.rates[requested] ? requested : "AED";
  function setPreference(value: string) {
    if (value !== "auto" && !CURRENCIES.includes(value)) return;
    setValue(value);
    try { localStorage.setItem("zf-currency", value); } catch { /* storage unavailable */ }
  }
  const format = (aed: number) => new Intl.NumberFormat(undefined, {
    style: "currency", currency, currencyDisplay: "code", maximumFractionDigits: 0,
  }).format(aed * (data?.rates[currency] ?? 1));
  return <CurrencyContext.Provider value={{ currency, automaticCurrency: data?.currency ?? "AED", rateDate: data?.updatedAt ?? null, preference, setPreference, format, estimated: currency !== "AED" }}>{children}</CurrencyContext.Provider>;
}
export const useCurrency = () => useContext(CurrencyContext);
