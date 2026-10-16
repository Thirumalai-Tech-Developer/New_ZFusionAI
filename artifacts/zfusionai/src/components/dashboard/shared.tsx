import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";

export function Panel({
  title,
  description,
  icon,
  action,
  children,
  id,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="p-5 sm:p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 scroll-mt-28"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div className="flex items-start gap-3 min-w-0">
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-lg font-display font-bold text-slate-950 dark:text-white">{title}</h2>
            {description && <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{description}</p>}
          </div>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function CopyField({ label, value, secret }: { label: string; value: string; secret?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(!secret);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't access the clipboard.");
    }
  }

  return (
    <div className="space-y-1">
      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">{label}</div>
      <div className="flex items-center gap-2">
        <code
          className="flex-1 min-w-0 truncate px-3 py-2 rounded-lg bg-slate-200/40 dark:bg-black/40 border border-slate-900/10 dark:border-white/10 text-xs font-mono text-emerald-700 dark:text-emerald-300 cursor-pointer"
          onClick={() => setRevealed(true)}
          title={revealed ? value : "Click to reveal"}
        >
          {revealed ? value : "•".repeat(Math.min(32, value.length))}
        </code>
        <button
          type="button"
          onClick={copy}
          className="p-2 rounded-lg border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong.";
}

export const fieldClass =
  "w-full px-3 py-2.5 rounded-lg bg-slate-200/30 dark:bg-black/30 border border-slate-900/10 dark:border-white/10 text-sm text-slate-950 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export const secondaryButton =
  "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-900/15 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/5 text-sm font-medium transition-colors disabled:opacity-50";
