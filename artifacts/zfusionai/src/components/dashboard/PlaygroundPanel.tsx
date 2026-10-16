import { useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Panel, errorMessage, fieldClass, primaryButton } from "./shared";

type Turn = { role: "user" | "assistant"; content: string };

export default function PlaygroundPanel({ aiConfigured }: { aiConfigured: boolean }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const ask = useMutation({
    mutationFn: (messages: Turn[]) =>
      api<{ reply: string }>("/account/ai/playground", { method: "POST", body: { messages } }),
    onSuccess: (res, messages) => {
      setTurns([...messages, { role: "assistant", content: res.reply }]);
      requestAnimationFrame(() =>
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }),
      );
    },
    onError: (err, messages) => {
      setTurns(messages.slice(0, -1));
      toast.error(errorMessage(err));
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const next = [...turns, { role: "user" as const, content: text }].slice(-20);
    setTurns(next);
    setInput("");
    ask.mutate(next);
  }

  return (
    <Panel
      id="playground"
      title="AI agent playground"
      description="Preview how your auto-reply agent answers. Playground replies don't use your message allowance."
      icon={<Sparkles className="w-5 h-5" />}
      action={
        turns.length > 0 ? (
          <button type="button" className="text-xs text-slate-400 hover:text-white" onClick={() => setTurns([])}>
            Clear
          </button>
        ) : undefined
      }
    >
      {!aiConfigured && (
        <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          The AI gateway isn't configured on the server yet (AI_GATEWAY_URL / AI_GATEWAY_API_KEY).
        </div>
      )}

      <div
        ref={listRef}
        className="h-64 overflow-y-auto space-y-3 p-4 rounded-xl bg-[#0b141a] border border-white/10"
        aria-live="polite"
      >
        {turns.length === 0 && (
          <p className="text-xs text-slate-500 text-center pt-20">
            Ask something a customer might send, e.g. “Do you deliver to Abu Dhabi?”
          </p>
        )}
        {turns.map((t, i) => (
          <div key={i} className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                t.role === "user" ? "bg-[#005c4b] text-white" : "bg-[#202c33] text-slate-100"
              }`}
            >
              {t.content}
            </div>
          </div>
        ))}
        {ask.isPending && <div className="text-xs text-slate-500">Agent is typing…</div>}
      </div>

      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <input
          className={fieldClass}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a customer message…"
          maxLength={2000}
          disabled={!aiConfigured}
        />
        <button type="submit" className={`${primaryButton} shrink-0`} disabled={ask.isPending || !aiConfigured} aria-label="Send">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </Panel>
  );
}
