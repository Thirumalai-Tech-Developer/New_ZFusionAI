import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bot, Plus, Send, Trash2, Wrench } from "lucide-react";
import { toast } from "sonner";
import { api, type Agent, type AgentInput, type AgentTool } from "@/lib/api";
import { CopyField, Panel, errorMessage, fieldClass, primaryButton, secondaryButton } from "./shared";
import { DEFAULT_AGENT, toInput, useAgents, useDeleteAgent, useSaveAgent } from "./useAgents";

const TOOL_EXAMPLE: AgentTool[] = [
  {
    name: "lookup_order",
    description: "Look up an order's delivery status by order number.",
    url: "https://your-backend.example.com/agent-tools/lookup-order",
    parameters: {
      type: "object",
      properties: { order_id: { type: "string", description: "The order number" } },
      required: ["order_id"],
    },
  },
];

type Turn = { role: "user" | "assistant"; content: string; steps?: { tool: string; result: string }[] };

function AgentTester({ agent, aiConfigured }: { agent: Agent; aiConfigured: boolean }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setTurns([]), [agent.id]);

  const run = useMutation({
    mutationFn: (messages: Turn[]) =>
      api<{ reply: string; steps: { tool: string; result: string }[] }>(`/account/agents/${agent.id}/test`, {
        method: "POST",
        body: { messages: messages.map(({ role, content }) => ({ role, content })) },
      }),
    onSuccess: (res, messages) => {
      setTurns([...messages, { role: "assistant", content: res.reply, steps: res.steps }]);
      requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }));
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
    run.mutate(next);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Test this agent</h3>
        {turns.length > 0 && (
          <button type="button" className="text-xs text-slate-400 hover:text-white" onClick={() => setTurns([])}>
            Clear
          </button>
        )}
      </div>
      {!aiConfigured && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          The AI gateway isn't configured on the server yet (AI_GATEWAY_URL / AI_GATEWAY_API_KEY).
        </div>
      )}
      <div ref={listRef} className="h-64 overflow-y-auto space-y-3 p-4 rounded-xl bg-black/30 border border-white/10" aria-live="polite">
        {turns.length === 0 && (
          <p className="text-xs text-slate-500 text-center pt-20">Test runs are free and don't use your message allowance.</p>
        )}
        {turns.map((t, i) => (
          <div key={i} className={`flex flex-col ${t.role === "user" ? "items-end" : "items-start"} gap-1`}>
            {t.steps?.map((s, j) => (
              <div key={j} className="max-w-[85%] text-[11px] font-mono px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 truncate">
                <Wrench className="inline w-3 h-3 mr-1" />
                {s.tool} → {s.result.slice(0, 120)}
              </div>
            ))}
            <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${t.role === "user" ? "bg-emerald-700 text-white" : "bg-slate-800 text-slate-100"}`}>
              {t.content}
            </div>
          </div>
        ))}
        {run.isPending && <div className="text-xs text-slate-500">Agent is thinking…</div>}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input className={fieldClass} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the agent something…" maxLength={4000} disabled={!aiConfigured} />
        <button type="submit" className={`${primaryButton} shrink-0`} disabled={run.isPending || !aiConfigured} aria-label="Send">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function AgentEditor({ agent, onSaved }: { agent?: Agent; onSaved: (a: Agent) => void }) {
  const save = useSaveAgent();
  const remove = useDeleteAgent();
  const [form, setForm] = useState<AgentInput>(agent ? toInput(agent) : DEFAULT_AGENT);
  const [toolsJson, setToolsJson] = useState(JSON.stringify(agent?.tools ?? [], null, 2));
  const [toolsError, setToolsError] = useState<string | null>(null);

  useEffect(() => {
    setForm(agent ? toInput(agent) : DEFAULT_AGENT);
    setToolsJson(JSON.stringify(agent?.tools ?? [], null, 2));
    setToolsError(null);
  }, [agent]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    let tools: AgentTool[];
    try {
      tools = JSON.parse(toolsJson || "[]");
      if (!Array.isArray(tools)) throw new Error("Tools must be a JSON array.");
    } catch (err) {
      setToolsError(err instanceof Error ? err.message : "Invalid JSON");
      return;
    }
    setToolsError(null);
    save.mutate({ id: agent?.id, input: { ...form, tools } }, { onSuccess: (res) => onSaved(res.agent) });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="space-y-1.5 block">
        <span className="text-xs text-slate-300">Agent name</span>
        <input className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} required />
      </label>
      <label className="space-y-1.5 block">
        <span className="text-xs text-slate-300">Instructions (system prompt)</span>
        <textarea
          className={`${fieldClass} min-h-32 font-mono text-xs leading-relaxed`}
          value={form.instructions}
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          maxLength={8000}
          required
        />
      </label>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-slate-300">Tools (webhooks the agent can call, max 10)</span>
          <button type="button" className="text-[11px] font-mono text-emerald-400 hover:underline" onClick={() => setToolsJson(JSON.stringify(TOOL_EXAMPLE, null, 2))}>
            Insert example
          </button>
        </div>
        <textarea
          className={`${fieldClass} min-h-28 font-mono text-[11px] leading-relaxed`}
          value={toolsJson}
          onChange={(e) => setToolsJson(e.target.value)}
          spellCheck={false}
        />
        {toolsError && <p className="text-xs text-red-400">{toolsError}</p>}
        <p className="text-[11px] text-slate-500">
          When the agent calls a tool, ZFusionAI POSTs <code className="text-emerald-300">{`{ tool, arguments, agent_id }`}</code> to its HTTPS URL
          and signs the body with <code className="text-emerald-300">X-ZFusion-Signature: sha256=HMAC(tool secret, body)</code>.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className={primaryButton} disabled={save.isPending}>
          {save.isPending ? "Saving…" : agent ? "Save agent" : "Create agent"}
        </button>
        {agent && (
          <button
            type="button"
            className={secondaryButton}
            disabled={remove.isPending}
            onClick={() => {
              if (confirm(`Delete "${agent.name}"? Its widget and API model will stop working.`)) remove.mutate(agent.id);
            }}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default function AgentsPanel({ aiConfigured }: { aiConfigured: boolean }) {
  const { data, isLoading } = useAgents();
  const agents = data?.agents ?? [];
  const [selectedId, setSelectedId] = useState<string | "new" | null>(null);

  const selected = selectedId === "new" ? undefined : agents.find((a) => a.id === selectedId) ?? agents[0];
  const creating = selectedId === "new" || (!isLoading && agents.length === 0);
  const origin = typeof window !== "undefined" ? window.location.origin : "https://zfusionai.com";

  return (
    <Panel
      id="agents"
      title="AI agents"
      description="Build agents with your instructions and tools. Use them over the API, in your web app widget, or on WhatsApp."
      icon={<Bot className="w-5 h-5" />}
      action={
        <button type="button" className={secondaryButton} onClick={() => setSelectedId("new")}>
          <Plus className="w-4 h-4" /> New agent
        </button>
      }
    >
      {agents.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Agents">
          {agents.map((a) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={!creating && selected?.id === a.id}
              onClick={() => setSelectedId(a.id)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                !creating && selected?.id === a.id
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
                  : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="h-40 animate-pulse rounded-lg bg-white/5" />
      ) : (
        <div className="grid xl:grid-cols-2 gap-6">
          <AgentEditor agent={creating ? undefined : selected} onSaved={(a) => setSelectedId(a.id)} />
          {!creating && selected ? (
            <div className="space-y-5">
              <AgentTester agent={selected} aiConfigured={aiConfigured} />
              <CopyField label="Agent ID" value={selected.id} />
              <CopyField label="Tool signing secret" value={selected.toolSecret} secret />
              <details>
                <summary className="text-xs font-mono text-emerald-400 cursor-pointer">Use via API · cURL & OpenAI SDK</summary>
                <pre className="mt-3 p-4 rounded-xl bg-black/50 border border-white/10 text-[11px] leading-relaxed text-slate-300 overflow-x-auto">{`# Run the agent (1 message)
curl -X POST ${origin}/api/v1/agents/${selected.id}/runs \\
  -H "Authorization: Bearer zf_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"messages":[{"role":"user","content":"Where is order 1042?"}]}'

// OpenAI-compatible: any OpenAI SDK works
import OpenAI from "openai";
const client = new OpenAI({
  baseURL: "${origin}/api/v1",
  apiKey: "zf_live_YOUR_KEY",
});
const res = await client.chat.completions.create({
  model: "agent:${selected.id}",
  messages: [{ role: "user", content: "Hello!" }],
});`}</pre>
              </details>
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-white/10 text-sm text-slate-400">
              Create your first agent, then test it here. Each API or widget reply uses one message from your
              free trial allowance; tests are free.
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
