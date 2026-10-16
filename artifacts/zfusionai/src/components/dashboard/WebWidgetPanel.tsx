import { useEffect, useState, type FormEvent } from "react";
import { Globe } from "lucide-react";
import type { Agent } from "@/lib/api";
import { CopyField, Panel, fieldClass, primaryButton } from "./shared";
import { toInput, useAgents, useSaveAgent } from "./useAgents";

function WidgetSettings({ agent }: { agent: Agent }) {
  const save = useSaveAgent();
  const [enabled, setEnabled] = useState(agent.widgetEnabled);
  const [origins, setOrigins] = useState(agent.widgetAllowedOrigins.join("\n"));
  const [welcome, setWelcome] = useState(agent.widgetWelcome);
  const [color, setColor] = useState(agent.widgetColor);

  useEffect(() => {
    setEnabled(agent.widgetEnabled);
    setOrigins(agent.widgetAllowedOrigins.join("\n"));
    setWelcome(agent.widgetWelcome);
    setColor(agent.widgetColor);
  }, [agent]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    save.mutate({
      id: agent.id,
      input: {
        ...toInput(agent),
        widgetEnabled: enabled,
        widgetAllowedOrigins: origins.split(/[\s,]+/).map((o) => o.trim()).filter(Boolean),
        widgetWelcome: welcome,
        widgetColor: color,
      },
    });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-200">
          <input type="checkbox" className="w-4 h-4 accent-emerald-500" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Enable the chat widget for this agent
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs text-slate-300">Allowed websites (one origin per line, e.g. https://shop.example.com)</span>
          <textarea className={`${fieldClass} min-h-20 font-mono text-xs`} value={origins} onChange={(e) => setOrigins(e.target.value)} placeholder="Leave empty to allow any site (not recommended)" />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs text-slate-300">Welcome message</span>
          <input className={fieldClass} value={welcome} onChange={(e) => setWelcome(e.target.value)} maxLength={300} />
        </label>
        <label className="flex items-center gap-3 text-xs text-slate-300">
          <span>Brand colour</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-8 rounded border border-white/10 bg-transparent" aria-label="Brand colour" />
          <code className="font-mono text-slate-400">{color}</code>
        </label>
        <button type="submit" className={primaryButton} disabled={save.isPending}>
          {save.isPending ? "Saving…" : "Save widget"}
        </button>
      </form>

      <div className="space-y-4">
        <CopyField label="Embed snippet: paste before </body>" value={agent.embedSnippet} />
        <p className="text-xs text-slate-400 leading-relaxed">
          Works on any web app: React, Next.js, WordPress, Shopify or plain HTML. Each reply uses one message from your
          allowance, and visitors are rate-limited to protect it. Conversations appear under <strong>Messages → Web</strong>.
        </p>
        {!agent.widgetEnabled && (
          <p className="text-xs text-amber-300">The widget is disabled. Enable and save it before embedding.</p>
        )}
        {agent.widgetEnabled && agent.widgetAllowedOrigins.length === 0 && (
          <p className="text-xs text-amber-300">Any website can embed this widget. Add your domains to restrict it.</p>
        )}
      </div>
    </div>
  );
}

export default function WebWidgetPanel() {
  const { data } = useAgents();
  const agents = data?.agents ?? [];
  const [agentId, setAgentId] = useState<string>("");
  const agent = agents.find((a) => a.id === agentId) ?? agents[0];

  return (
    <Panel
      id="web-widget"
      title="Web app chat widget"
      description="Add your AI agent to any website or web app with one script tag."
      icon={<Globe className="w-5 h-5" />}
      action={
        agents.length > 1 ? (
          <select className={`${fieldClass} w-auto`} value={agent?.id} onChange={(e) => setAgentId(e.target.value)} aria-label="Agent">
            {agents.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        ) : undefined
      }
    >
      {agent ? (
        <WidgetSettings agent={agent} />
      ) : (
        <p className="text-sm text-slate-400">Create an AI agent first; the widget runs that agent.</p>
      )}
    </Panel>
  );
}
