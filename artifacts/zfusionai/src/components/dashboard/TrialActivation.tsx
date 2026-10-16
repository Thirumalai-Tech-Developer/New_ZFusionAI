import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function TrialActivation() {
  const [phone, setPhone] = useState("");
  const queryClient = useQueryClient();
  const activation = useMutation({
    mutationFn: () => api("/account/trial", { method: "POST", body: { phone } }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["account"] }),
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] }),
      ]);
    },
  });
  function submit(event: FormEvent) {
    event.preventDefault();
    activation.mutate();
  }
  return (
    <section className="rounded-2xl border border-emerald-500/30 bg-card p-6 sm:p-8 max-w-2xl" aria-labelledby="activate-trial">
      <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-2">ONE NUMBER · ONE FREE TRIAL</p>
      <h2 id="activate-trial" className="text-2xl font-display font-bold">Activate your 1,000 free messages</h2>
      <p className="text-muted-foreground text-sm mt-3 mb-6">You’re signed in. Add your phone number to unlock a one-time allowance shared across AI agents, web chat and WhatsApp. Each number can claim it once, across all accounts. No credit card required.</p>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-medium" htmlFor="trial-phone">Phone number with country code</label>
        <input id="trial-phone" type="tel" autoComplete="tel" placeholder="+971 50 123 4567" required maxLength={60}
          value={phone} onChange={(e) => { setPhone(e.target.value); activation.reset(); }}
          aria-describedby="trial-phone-help trial-phone-error"
          className="block w-full rounded-xl border border-input bg-background p-3 text-foreground focus:outline-emerald-500" />
        <p id="trial-phone-help" className="text-xs text-muted-foreground">Include + and your country code. We retain the number to prevent repeat free trials. SMS verification is not enabled.</p>
        <p id="trial-phone-error" role="alert" className="text-sm text-red-600 dark:text-red-300">{activation.error?.message}</p>
        <button type="submit" disabled={activation.isPending} className="rounded-xl bg-emerald-500 px-5 py-3 text-black font-bold disabled:opacity-50">
          {activation.isPending ? "Activating…" : "Activate free trial"}
        </button>
      </form>
    </section>
  );
}
