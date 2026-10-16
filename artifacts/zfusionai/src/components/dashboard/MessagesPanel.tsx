import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight, Inbox, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api, type MessageLog } from "@/lib/api";
import { Panel, errorMessage, fieldClass, primaryButton } from "./shared";

export default function MessagesPanel({ connected }: { connected: boolean }) {
  const queryClient = useQueryClient();
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [channel, setChannel] = useState<"" | "whatsapp" | "agent" | "web">("");

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["account", "messages", channel],
    queryFn: () =>
      api<{ messages: MessageLog[] }>(`/account/messages${channel ? `?channel=${channel}` : ""}`),
    refetchInterval: 15_000,
  });

  const send = useMutation({
    mutationFn: () => api("/account/send-test", { method: "POST", body: { to, text } }),
    onSuccess: () => {
      toast.success("Message sent.");
      setText("");
      queryClient.invalidateQueries({ queryKey: ["account", "messages"] });
      queryClient.invalidateQueries({ queryKey: ["account", "me"] });
    },
    onError: (err) => {
      toast.error(errorMessage(err));
      queryClient.invalidateQueries({ queryKey: ["account", "messages"] });
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send.mutate();
  }

  const messages = data?.messages ?? [];

  return (
    <Panel
      id="messages"
      title="Messages"
      description="Recent traffic across WhatsApp, AI agent API and web widget."
      icon={<Inbox className="w-5 h-5" />}
      action={
        <button
          type="button"
          onClick={() => refetch()}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Refresh messages"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
        </button>
      }
    >
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Channel">
        {([
          ["", "All"],
          ["whatsapp", "WhatsApp"],
          ["agent", "Agent API"],
          ["web", "Web widget"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={channel === value}
            onClick={() => setChannel(value)}
            className={`px-3 py-1 rounded-full text-xs border ${
              channel === value ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200" : "border-white/10 text-slate-400 hover:bg-white/5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid sm:grid-cols-[180px_1fr_auto] gap-3">
        <input
          className={fieldClass}
          placeholder="+971500000000"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          inputMode="tel"
          required
          disabled={!connected}
        />
        <input
          className={fieldClass}
          placeholder={connected ? "Message text" : "Connect WhatsApp first"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={4096}
          required
          disabled={!connected}
        />
        <button type="submit" className={primaryButton} disabled={!connected || send.isPending}>
          {send.isPending ? "Sending…" : "Send"}
        </button>
      </form>
      <p className="mt-2 text-[11px] text-slate-500">
        Meta only allows free-form text within 24 hours of the customer's last message. Use templates (via the API) to start new conversations.
      </p>

      <ul className="mt-5 divide-y divide-white/5 max-h-96 overflow-y-auto">
        {messages.length === 0 && <li className="py-6 text-sm text-slate-500 text-center">No messages yet.</li>}
        {messages.map((m) => (
          <li key={m.id} className="py-3 flex items-start gap-3">
            <div
              className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                m.direction === "inbound" ? "bg-cyan-500/15 text-cyan-300" : "bg-emerald-500/15 text-emerald-300"
              }`}
            >
              {m.direction === "inbound" ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-400">
                <span className="font-mono text-slate-300">
                  {m.channel === "whatsapp" ? `+${m.peer}` : m.channel === "web" ? "web visitor" : "API"}
                </span>
                <span>· {m.source.replace("_", "-")}</span>
                <span>· {new Date(m.createdAt).toLocaleString()}</span>
                {m.status === "failed" && <span className="text-red-400">· failed</span>}
              </div>
              <p className="text-sm text-slate-100 break-words whitespace-pre-wrap">{m.body}</p>
              {m.error && <p className="text-xs text-red-400 mt-1">{m.error}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
