import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Bot, CheckCircle2, Circle, Gauge, Globe, LogOut, MessageSquare } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { api, type PublicUser } from "@/lib/api";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";
import { Panel } from "@/components/dashboard/shared";
import WhatsAppConnectionPanel, {
  useWhatsAppConnection,
} from "@/components/dashboard/WhatsAppConnectionPanel";
import ApiKeysPanel from "@/components/dashboard/ApiKeysPanel";
import PlaygroundPanel from "@/components/dashboard/PlaygroundPanel";
import MessagesPanel from "@/components/dashboard/MessagesPanel";
import AgentsPanel from "@/components/dashboard/AgentsPanel";
import WebWidgetPanel from "@/components/dashboard/WebWidgetPanel";
import { useAgents } from "@/components/dashboard/useAgents";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "agents", label: "AI Agents" },
  { id: "web", label: "Web App" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "api", label: "API Keys" },
  { id: "messages", label: "Messages" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function UsageMeter({ user }: { user: PublicUser }) {
  const { used, limit, remaining } = user.usage;
  const pct = Math.min(100, Math.round((used / Math.max(1, limit)) * 100));
  const low = remaining <= limit * 0.1;

  const upgradeLink = generateWhatsAppLink({
    service: "whatsapp-api",
    type: "whatsapp_api_demo",
    tier: "ENTERPRISE",
    scopeSummary: `Upgrade from free trial (${used}/${limit} messages used) — ${user.email}`,
  });

  return (
    <Panel
      title={user.plan === "trial" ? "Free trial allowance" : "Message allowance"}
      description="One shared pool for all products: each WhatsApp message sent, AI agent API run and web widget reply uses one message. Inbound messages and dashboard tests are free."
      icon={<Gauge className="w-5 h-5" />}
    >
      <div className="flex items-end justify-between gap-4 mb-3">
        <div>
          <div className="text-4xl font-display font-extrabold text-white tabular-nums">
            {remaining.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">messages remaining</div>
        </div>
        <div className="text-right text-xs text-slate-400 tabular-nums">
          {used.toLocaleString()} / {limit.toLocaleString()} used
        </div>
      </div>
      <div
        className="h-2.5 rounded-full bg-white/10 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={used}
        aria-label="Messages used"
      >
        <div
          className={`h-full rounded-full transition-all ${low ? "bg-amber-400" : "bg-[#25D366]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {low && (
        <a
          href={upgradeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-xs font-semibold text-amber-300 hover:underline"
        >
          Running low — talk to us about a production plan →
        </a>
      )}
    </Panel>
  );
}

function Checklist({ steps }: { steps: { label: string; done: boolean; href: string }[] }) {
  return (
    <Panel title="Get live in 4 steps" description="Your AI agent starts replying once the webhook is verified.">
      <ol className="space-y-2.5">
        {steps.map((s) => (
          <li key={s.label}>
            <a href={s.href} className="flex items-center gap-3 text-sm group">
              {s.done ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600 shrink-0" />
              )}
              <span className={s.done ? "text-slate-400 line-through" : "text-slate-200 group-hover:text-white"}>
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

export default function DashboardPage() {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const logout = useLogout();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!authLoading && !authUser) navigate("/login?next=/dashboard");
  }, [authLoading, authUser, navigate]);

  const account = useQuery({
    queryKey: ["account", "me"],
    queryFn: () => api<{ user: PublicUser; aiConfigured: boolean }>("/account"),
    enabled: Boolean(authUser),
    refetchInterval: 30_000,
  });
  const connection = useWhatsAppConnection();
  const agents = useAgents();
  const [tab, setTab] = useState<TabId>(() => {
    const fromHash = window.location.hash.replace("#tab-", "");
    return (TABS.find((t) => t.id === fromHash)?.id ?? "overview") as TabId;
  });
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#tab-", "");
      if (TABS.some((t) => t.id === id)) setTab(id as TabId);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const apiKeys = useQuery({
    queryKey: ["account", "api-keys"],
    queryFn: () => api<{ keys: unknown[] }>("/account/api-keys"),
    enabled: Boolean(authUser),
  });

  const user = account.data?.user ?? authUser;
  const conn = connection.data?.connection ?? null;

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#030c07] flex items-center justify-center">
        <SeoHead title="Dashboard | ZFusionAI" description="ZFusionAI dashboard" path="/dashboard" noindex />
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" aria-label="Loading" />
      </div>
    );
  }

  const agentCount = agents.data?.agents.length ?? 0;
  const widgetLive = agents.data?.agents.some((a) => a.widgetEnabled) ?? false;
  const steps = [
    { label: "Create an AI agent", done: agentCount > 0, href: "#tab-agents" },
    { label: "Embed the agent in your web app", done: widgetLive, href: "#tab-web" },
    { label: "Connect your WhatsApp Business number", done: Boolean(conn), href: "#tab-whatsapp" },
    { label: "Create an API key", done: (apiKeys.data?.keys.length ?? 0) > 0, href: "#tab-api" },
  ];

  const products: { tab: TabId; icon: ReactNode; title: string; text: string; status: string }[] = [
    {
      tab: "agents",
      icon: <Bot className="w-5 h-5" />,
      title: "Agentic AI",
      text: "Agents with instructions and webhook tools, available through a REST API and an OpenAI-compatible endpoint.",
      status: agentCount ? `${agentCount} agent${agentCount > 1 ? "s" : ""}` : "Not started",
    },
    {
      tab: "web",
      icon: <Globe className="w-5 h-5" />,
      title: "Web App",
      text: "Drop-in chat widget for any website or web app. One script tag, runs your agent.",
      status: widgetLive ? "Widget live" : "Not embedded",
    },
    {
      tab: "whatsapp",
      icon: <MessageSquare className="w-5 h-5" />,
      title: "WhatsApp Automation",
      text: "AI auto-replies on your WhatsApp Business number via the official Cloud API.",
      status: conn ? "Connected" : "Not connected",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#030c07] text-white overflow-x-clip">
      <SeoHead title="Dashboard | ZFusionAI" description="Manage your ZFusionAI AI agents, web widget and WhatsApp automation." path="/dashboard" noindex />
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/brand/logo_compressed.png" alt="ZFusionAI" className="w-8 h-8 object-contain" />
            <span className="font-display font-extrabold">ZFusionAI</span>
            <span className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {user.plan === "trial" ? "FREE TRIAL" : user.plan.toUpperCase()}
            </span>
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            {user.avatarUrl && (
              <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
            )}
            <div className="hidden sm:block min-w-0 text-right">
              <div className="text-sm font-medium truncate">{user.name ?? user.email}</div>
              <div className="text-xs text-slate-400 truncate">{user.email}</div>
            </div>
            <button
              type="button"
              onClick={() => logout.mutate(undefined, { onSuccess: () => navigate("/") })}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold">
            Welcome{user.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">Your workspace for AI agents, web app chat and WhatsApp automation.</p>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-b border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Dashboard sections">
          {TABS.map((t) => (
            <a
              key={t.id}
              href={`#tab-${t.id}`}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
                tab === t.id ? "border-emerald-400 text-white font-semibold" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <UsageMeter user={user} />
                <Checklist steps={steps} />
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4 content-start">
                {products.map((p) => (
                  <a
                    key={p.tab}
                    href={`#tab-${p.tab}`}
                    onClick={() => setTab(p.tab)}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-colors flex flex-col gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">{p.icon}</div>
                    <div>
                      <h2 className="font-display font-bold text-white">{p.title}</h2>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.text}</p>
                    </div>
                    <span className="mt-auto text-[11px] font-mono text-emerald-300">{p.status} →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "agents" && <AgentsPanel aiConfigured={account.data?.aiConfigured ?? true} />}
        {tab === "web" && <WebWidgetPanel />}
        {tab === "whatsapp" && (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <WhatsAppConnectionPanel />
            <PlaygroundPanel aiConfigured={account.data?.aiConfigured ?? true} />
          </div>
        )}
        {tab === "api" && <ApiKeysPanel />}
        {tab === "messages" && <MessagesPanel connected={Boolean(conn)} />}
      </main>
    </div>
  );
}
