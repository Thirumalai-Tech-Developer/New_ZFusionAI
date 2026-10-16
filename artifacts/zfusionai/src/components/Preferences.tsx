import { useTheme } from "next-themes";
import { CURRENCIES, useCurrency } from "@/context/CurrencyContext";

export default function Preferences({ currency = false }: { currency?: boolean }) {
  const { theme, setTheme } = useTheme();
  const money = useCurrency();
  const styles = "min-h-10 rounded-lg border border-border bg-background px-2 text-xs text-foreground max-w-36 focus:outline-emerald-500";
  return <div className="flex flex-wrap items-center gap-2">
    <select aria-label="Color theme" value={theme ?? "system"} onChange={(e) => setTheme(e.target.value)} className={styles}>
      <option value="system">System theme</option><option value="light">Light</option><option value="dark">Dark</option>
    </select>
    {currency && <select aria-label="Display currency" value={money.preference} onChange={(e) => money.setPreference(e.target.value)} className={styles}>
      <option value="auto">Auto · {money.automaticCurrency}</option>
      {CURRENCIES.map((code) => <option key={code} value={code}>{code}</option>)}
    </select>}
  </div>;
}
