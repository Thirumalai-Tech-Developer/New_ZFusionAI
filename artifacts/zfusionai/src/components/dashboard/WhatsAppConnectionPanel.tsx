import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { api, type WhatsAppConnection } from "@/lib/api";
import {
  CopyField,
  Panel,
  errorMessage,
  fieldClass,
  primaryButton,
  secondaryButton,
} from "./shared";
import { useAgents } from "./useAgents";

const DEFAULT_PROMPT =
  "You are a friendly, concise customer support assistant for this business. Reply in the customer's language. Keep answers under 80 words.";

export function useWhatsAppConnection() {
  return useQuery({
    queryKey: ["account", "whatsapp"],
    queryFn: () => api<{ connection: WhatsAppConnection | null }>("/account/whatsapp"),
  });
}

export default function WhatsAppConnectionPanel() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useWhatsAppConnection();
  const conn = data?.connection ?? null;
  const agents = useAgents().data?.agents ?? [];

  const [form, setForm] = useState({
    phoneNumberId: "",
    businessAccountId: "",
    accessToken: "",
    appSecret: "",
    autoReplyEnabled: true,
    agentId: "",
    systemPrompt: DEFAULT_PROMPT,
  });

  useEffect(() => {
    if (conn) {
      setForm((f) => ({
        ...f,
        phoneNumberId: conn.phoneNumberId,
        businessAccountId: conn.businessAccountId ?? "",
        autoReplyEnabled: conn.autoReplyEnabled,
        agentId: conn.agentId ?? "",
        systemPrompt: conn.systemPrompt,
        accessToken: "",
        appSecret: "",
      }));
    }
  }, [conn]);

  const save = useMutation({
    mutationFn: () =>
      api<{ connection: WhatsAppConnection }>("/account/whatsapp", {
        method: "PUT",
        body: {
          phoneNumberId: form.phoneNumberId,
          businessAccountId: form.businessAccountId,
          autoReplyEnabled: form.autoReplyEnabled,
          agentId: form.agentId || null,
          systemPrompt: form.systemPrompt,
          ...(form.accessToken ? { accessToken: form.accessToken } : {}),
          ...(form.appSecret ? { appSecret: form.appSecret } : {}),
        },
      }),
    onSuccess: (res) => {
      queryClient.setQueryData(["account", "whatsapp"], res);
      toast.success("WhatsApp connection saved.");
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  const disconnect = useMutation({
    mutationFn: () => api("/account/whatsapp", { method: "DELETE" }),
    onSuccess: () => {
      queryClient.setQueryData(["account", "whatsapp"], { connection: null });
      toast.success("WhatsApp number disconnected.");
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    save.mutate();
  }

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <Panel
      id="whatsapp"
      title="WhatsApp Cloud API connection"
      description="Use the credentials from Meta for Developers → WhatsApp → API Setup."
      icon={<MessageSquare className="w-5 h-5" />}
      action={
        conn ? (
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            CONNECTED
          </span>
        ) : (
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            NOT CONNECTED
          </span>
        )
      }
    >
      {isLoading ? (
        <div className="h-40 animate-pulse rounded-lg bg-white/5" />
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="space-y-1.5 block">
              <span className="text-xs text-slate-300">Phone number ID *</span>
              <input
                className={fieldClass}
                value={form.phoneNumberId}
                onChange={(e) => set("phoneNumberId", e.target.value)}
                placeholder="e.g. 106540352242922"
                inputMode="numeric"
                required
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs text-slate-300">WhatsApp Business Account ID</span>
              <input
                className={fieldClass}
                value={form.businessAccountId}
                onChange={(e) => set("businessAccountId", e.target.value)}
                placeholder="optional"
                inputMode="numeric"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs text-slate-300">
                Access token {conn ? "(leave blank to keep current)" : "*"}
              </span>
              <input
                className={fieldClass}
                type="password"
                autoComplete="off"
                value={form.accessToken}
                onChange={(e) => set("accessToken", e.target.value)}
                placeholder="Permanent system-user token"
                required={!conn}
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs text-slate-300">
                App secret {conn?.hasAppSecret ? "(saved)" : "(recommended)"}
              </span>
              <input
                className={fieldClass}
                type="password"
                autoComplete="off"
                value={form.appSecret}
                onChange={(e) => set("appSecret", e.target.value)}
                placeholder="Verifies webhook signatures"
              />
            </label>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">AI auto-reply agent</span>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-emerald-500"
                  checked={form.autoReplyEnabled}
                  onChange={(e) => set("autoReplyEnabled", e.target.checked)}
                />
                Enabled
              </label>
            </div>
            <label className="space-y-1.5 block">
              <span className="text-xs text-slate-400">Who answers?</span>
              <select
                className={fieldClass}
                value={form.agentId}
                onChange={(e) => set("agentId", e.target.value)}
              >
                <option value="">Built-in prompt (below)</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    AI agent: {a.name} {a.tools.length ? `(${a.tools.length} tools)` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className={`space-y-1.5 block ${form.agentId ? "opacity-50" : ""}`}>
              <span className="text-xs text-slate-400">
                Instructions for your agent — business details, tone, FAQs, opening hours, what to escalate.
              </span>
              <textarea
                className={`${fieldClass} min-h-28 font-mono text-xs leading-relaxed`}
                value={form.systemPrompt}
                onChange={(e) => set("systemPrompt", e.target.value)}
                maxLength={4000}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className={primaryButton} disabled={save.isPending}>
              {save.isPending ? "Saving…" : conn ? "Save changes" : "Connect number"}
            </button>
            {conn && (
              <button
                type="button"
                className={secondaryButton}
                disabled={disconnect.isPending}
                onClick={() => {
                  if (confirm("Disconnect this WhatsApp number? Auto-replies will stop.")) {
                    disconnect.mutate();
                  }
                }}
              >
                Disconnect
              </button>
            )}
          </div>
        </form>
      )}

      {conn && (
        <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
          <p className="text-xs text-slate-400">
            In Meta for Developers → WhatsApp → Configuration, set the callback URL and verify
            token below, then subscribe to the <code className="text-emerald-300">messages</code> field.
          </p>
          <CopyField label="Callback URL" value={conn.webhookUrl} />
          <CopyField label="Verify token" value={conn.verifyToken} secret />
        </div>
      )}
    </Panel>
  );
}
