import React, { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import Preferences from "@/components/Preferences";
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, MessageSquare } from "lucide-react";
import { generateWhatsAppLink, IntentPayload } from "@/lib/whatsappEngine";

interface ScopeOption {
  id: string;
  label: string;
  desc: string;
  tier: "Standard" | "Scale" | "Enterprise";
}

const MODULES: Record<
  "whatsapp" | "agentic" | "fullstack",
  { title: string; freeTierPerk: string; options: ScopeOption[] }
> = {
  whatsapp: {
    title: "WhatsApp Web API Architecture",
    freeTierPerk: "1,000 Free Trial Messages + AI Auto-Reply Agent",
    options: [
      {
        id: "webhook_engine",
        label: "Low-Latency Webhook Middleware",
        desc: "Sub-10ms async webhook dispatcher for bidirectional Meta Cloud API calls.",
        tier: "Standard",
      },
      {
        id: "ai_support_agent",
        label: "AI Customer Support & Intent Router",
        desc: "Automated generative resolution directly inside WhatsApp with CRM fallback.",
        tier: "Scale",
      },
      {
        id: "crm_omnichannel",
        label: "Real-Time CRM & ERP Sync",
        desc: "Native bi-directional data pipelines to HubSpot, Zoho, Salesforce, or Postgres.",
        tier: "Scale",
      },
      {
        id: "commerce_checkout",
        label: "In-Chat Interactive Catalog & Payments",
        desc: "WhatsApp native product carousels, shopping cart sessions & Stripe checkout.",
        tier: "Enterprise",
      },
    ],
  },
  agentic: {
    title: "AI Agentic Autonomous Systems",
    freeTierPerk: "1,000 Free Trial Messages for AI Agents (API + OpenAI-compatible)",
    options: [
      {
        id: "vector_rag",
        label: "Private Enterprise Vector Memory (RAG)",
        desc: "Hybrid dense & sparse embedding search across proprietary company documents.",
        tier: "Standard",
      },
      {
        id: "tool_execution",
        label: "Autonomous Multi-Tool Calling",
        desc: "Agent sandboxed execution for executing SQL queries, web search & external APIs.",
        tier: "Scale",
      },
      {
        id: "multi_agent_swarm",
        label: "Multi-Agent Swarm (Supervisor + Workers)",
        desc: "Hierarchical agent network where specialized agents critique & refine outputs.",
        tier: "Enterprise",
      },
      {
        id: "voice_pipeline",
        label: "Sub-400ms Real-Time Voice Agent",
        desc: "Ultra-low-latency bidirectional conversational speech with automated interruptions.",
        tier: "Enterprise",
      },
    ],
  },
  fullstack: {
    title: "Full Stack High-Frequency Web",
    freeTierPerk: "Free System Blueprint + 1,000 Free AI Chat Widget Messages",
    options: [
      {
        id: "edge_distribution",
        label: "Global Edge CDN & Micro-Caching",
        desc: "Sub-30ms TTFB worldwide with automated Brotli & modern asset hashing.",
        tier: "Standard",
      },
      {
        id: "type_safe_api",
        label: "End-to-End Typed Contract API",
        desc: "Zod + Orval + Express 5 with zero client-server schema drift.",
        tier: "Standard",
      },
      {
        id: "auth_rbac",
        label: "Multi-Tenant RBAC & Session Security",
        desc: "Enterprise SSO, JWT refresh rotation, rate limiting & DDoS mitigation.",
        tier: "Scale",
      },
      {
        id: "realtime_analytics",
        label: "High-Frequency Real-Time Telemetry",
        desc: "Websocket data streams, telemetry charts, and sub-10ms Postgres query execution.",
        tier: "Enterprise",
      },
    ],
  },
};

export default function ProceduralCalculator() {
  const money = useCurrency();
  const [selectedService, setSelectedService] = useState<"whatsapp" | "agentic" | "fullstack">("whatsapp");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isFreeTierActive, setIsFreeTierActive] = useState<boolean>(false);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const currentModule = MODULES[selectedService];

  const quotePayload: IntentPayload = {
    service: selectedService === "whatsapp" ? "whatsapp-api" : selectedService === "agentic" ? "agentic-ai" : "fullstack",
    type: isFreeTierActive ? "free_tier_claim" : "procedural_quote",
    tier: isFreeTierActive ? "FREE" : selectedOptions.length > 2 ? "ENTERPRISE" : "SCALE",
    features: selectedOptions.map(
      (optId) => currentModule.options.find((o) => o.id === optId)?.label || optId
    ),
    scopeSummary: isFreeTierActive
      ? `Free Tier Activation: ${currentModule.freeTierPerk}`
      : `${selectedOptions.length} Custom Architectural Modules Selected`,
  };

  const whatsappUrl = generateWhatsAppLink(quotePayload);

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto" id="pricing">
      {/* Avant-Garde Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>CUSTOM PROJECTS & 1,000 FREE TRIAL MESSAGES</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-950 dark:text-white tracking-tight">
          Bespoke Architecture. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Guaranteed Free Entry.
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-4 font-sans text-base md:text-lg">
          Assemble your custom technical modules or sign in to claim the one-time{" "}
          <strong className="text-slate-950 dark:text-white">Free Tier</strong> with 1,000 shared messages. One trial per phone number.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Currency follows your country; choose another if needed. Quotes are billed in AED.
          {money.rateDate && <> Rates: <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="underline">ExchangeRate-API</a> · {new Date(money.rateDate).toLocaleDateString()}</>}
        </p>
        <Preferences currency />
      </div>
      {/* Prominent Free Tier Callout Card */}
      <div className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-100/70 dark:from-emerald-950/70 via-slate-100/90 dark:via-slate-900/90 to-teal-100/70 dark:to-teal-950/70 border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(37,211,102,0.18)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500 text-black">
              100% FREE TIER
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono text-xs">Zero Credit Card • Instant Provisioning</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-950 dark:text-white font-display">
            Start Right Now at {money.format(0)}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl">
            Active perk: <strong className="text-emerald-700 dark:text-emerald-300">{currentModule.freeTierPerk}</strong>. One allowance across all products. No credit card required.
          </p>
        </div>
        <a
          href="/login?next=/dashboard"
          className="shrink-0 inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-sans transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:scale-105"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>Sign in & claim free trial</span>
        </a>
      </div>

      {/* Interactive Module Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Service Switcher Tabs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex p-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800">
            {(["whatsapp", "agentic", "fullstack"] as const).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedService(key);
                  setSelectedOptions([]);
                  setIsFreeTierActive(false);
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-mono text-xs md:text-sm font-semibold transition-all ${
                  selectedService === key
                    ? "bg-emerald-500 text-black shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                }`}
              >
                {key === "whatsapp"
                  ? "WhatsApp API"
                  : key === "agentic"
                  ? "AI Agentic Build"
                  : "Full Stack Web"}
              </button>
            ))}
          </div>

          {/* Module Selector */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Select Architectural Modules:
              </h4>
              <button
                onClick={() => {
                  setIsFreeTierActive(!isFreeTierActive);
                  if (!isFreeTierActive) setSelectedOptions([]);
                }}
                className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
                  isFreeTierActive
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                    : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {isFreeTierActive ? "✓ Free Tier Selected" : "Toggle Free Tier Mode"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentModule.options.map((opt) => {
                const isSelected = selectedOptions.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setIsFreeTierActive(false);
                      toggleOption(opt.id);
                    }}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-100/30 dark:bg-emerald-950/30 text-slate-950 dark:text-white shadow-[0_0_20px_rgba(37,211,102,0.12)]"
                        : "border-slate-300 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-500 text-black"
                          : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-950 dark:text-white leading-snug">
                        {opt.label}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {opt.desc}
                      </div>
                      <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {opt.tier} Tier
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic WhatsApp Handover Box */}
        <div className="lg:col-span-4 p-6 md:p-8 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 shadow-2xl space-y-6 sticky top-28 text-left">
          <div className="border-b border-slate-300 dark:border-slate-800 pb-4">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">Configured Architecture</div>
            <div className="text-2xl font-display font-extrabold text-slate-950 dark:text-white mt-1">
              {isFreeTierActive
                ? "Free Sandbox Tier"
                : selectedOptions.length === 0
                ? "Select Modules / Free"
                : `${selectedOptions.length} Modules Scoped`}
            </div>
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Direct Lead Architect Review
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400">Included With WhatsApp Handover:</div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Real-time milestone estimation & sprint plan
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Client retains 100% intellectual property & code
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live sandbox access provisioned within 24 hours
              </li>
            </ul>
          </div>

          <a
            href={isFreeTierActive ? "/login?next=/dashboard" : whatsappUrl}
            target={isFreeTierActive ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold font-sans shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{isFreeTierActive ? "Sign in & activate trial" : "Send Blueprint to WhatsApp"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-center text-slate-600 dark:text-slate-500 font-mono">
            Directly opens WhatsApp Web / App with your pre-configured specifications.
          </p>
        </div>
      </div>
    </section>
  );
}
