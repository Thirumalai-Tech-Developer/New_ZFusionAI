import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyRound, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, type ApiKeySummary } from "@/lib/api";
import { CopyField, Panel, errorMessage, fieldClass, primaryButton } from "./shared";

export default function ApiKeysPanel() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["account", "api-keys"],
    queryFn: () => api<{ keys: ApiKeySummary[] }>("/account/api-keys"),
  });

  const create = useMutation({
    mutationFn: () =>
      api<{ key: string }>("/account/api-keys", { method: "POST", body: { name } }),
    onSuccess: (res) => {
      setNewKey(res.key);
      setName("");
      queryClient.invalidateQueries({ queryKey: ["account", "api-keys"] });
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  const revoke = useMutation({
    mutationFn: (id: string) => api(`/account/api-keys/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "api-keys"] });
      toast.success("API key revoked.");
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim()) create.mutate();
  }

  const keys = data?.keys ?? [];
  const origin = typeof window !== "undefined" ? window.location.origin : "https://zfusionai.com";

  return (
    <Panel
      id="api-keys"
      title="API keys"
      description="Authenticate server-side calls to the ZFusionAI API: AI agents, OpenAI-compatible chat, and WhatsApp. Keep keys secret."
      icon={<KeyRound className="w-5 h-5" />}
    >
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          className={fieldClass}
          placeholder="Key name, e.g. production-crm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
        />
        <button type="submit" className={`${primaryButton} shrink-0`} disabled={create.isPending || !name.trim()}>
          Create key
        </button>
      </form>

      {newKey && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
          <p className="text-xs text-emerald-200">
            Copy this key now — for your security it won't be shown again.
          </p>
          <CopyField label="New API key" value={newKey} />
          <button type="button" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white" onClick={() => setNewKey(null)}>
            I've saved it
          </button>
        </div>
      )}

      <ul className="mt-5 divide-y divide-white/5">
        {keys.length === 0 && <li className="py-3 text-sm text-slate-600 dark:text-slate-500">No API keys yet.</li>}
        {keys.map((k) => (
          <li key={k.id} className="py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-slate-950 dark:text-white truncate">{k.name}</div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-500">
                {k.prefix}… · {k.lastUsedAt ? `last used ${new Date(k.lastUsedAt).toLocaleString()}` : "never used"}
              </div>
            </div>
            <button
              type="button"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-500/10"
              aria-label={`Revoke ${k.name}`}
              onClick={() => {
                if (confirm(`Revoke "${k.name}"? Apps using it will stop working.`)) revoke.mutate(k.id);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      <details className="mt-4 group">
        <summary className="text-xs font-mono text-emerald-700 dark:text-emerald-400 cursor-pointer">Quick start · cURL</summary>
        <pre className="mt-3 p-4 rounded-xl bg-slate-200/50 dark:bg-black/50 border border-slate-900/10 dark:border-white/10 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 overflow-x-auto">{`# Send a WhatsApp message (1 message from your allowance)
curl -X POST ${origin}/api/v1/messages \\
  -H "Authorization: Bearer zf_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"to":"+971500000000","text":"Hello from ZFusionAI 👋"}'

# Generate an AI reply and send it
curl -X POST ${origin}/api/v1/ai/reply \\
  -H "Authorization: Bearer zf_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"messages":[{"role":"user","content":"What are your opening hours?"}],"send_to":"+971500000000"}'

# Check remaining trial messages
curl ${origin}/api/v1/usage -H "Authorization: Bearer zf_live_YOUR_KEY"`}</pre>
      </details>
    </Panel>
  );
}
