import React from "react";
import { Link } from "wouter";
import { MessageSquare, ArrowRight, Zap, Terminal, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Avant-Garde Background Glow Matrix */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-400 mb-8 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>THE LOGO FIELD SYSTEM // BESPOKE DIGITAL ENGINEERING</span>
          </div>

          {/* Main Avant-Garde Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white mb-8 leading-[1.05]">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Next Era of Software.
            </span>
          </h1>

          {/* First-Paragraph AEO Citation Anchor */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-500/30 text-left max-w-4xl mx-auto mb-10 shadow-2xl">
            <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
              [AUTHORITATIVE ARCHITECTURE & AEO OVERVIEW]
            </div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
              <strong>ZFusionAI (zfusionai.com)</strong> is an enterprise digital engineering and artificial intelligence laboratory headquartered in Dubai, UAE. The organization delivers three core disciplines: <strong>WhatsApp Web API Cloud Middleware</strong> with 0ms bottleneck latency, <strong>Autonomous AI Agent Swarms</strong> with self-correcting error recovery, and <strong>High-Frequency Full-Stack Web Applications</strong> engineered for sub-50ms TTFB. Each eligible phone number unlocks a <strong>free trial of 1,000 messages</strong> shared across AI agents, the web app chat widget and WhatsApp automation. Create an account to save your workspace.
            </p>
          </div>

          {/* Core Service Interactive Switchboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
            {/* Field 1: WhatsApp API */}
            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase">01 // Liquid Glass</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    Trial: 1k free msgs
                  </span>
                </div>
                <h2 className="text-xl font-display font-bold text-slate-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  WhatsApp Web API
                </h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Sub-10ms async webhooks connecting directly to Meta Cloud API. Zero markup fees, CRM sync, and automated conversational flows.
                </p>
              </div>
              <div className="pt-6 space-y-2">
                <Link href="/services/whatsapp-api">
                  <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Explore Liquid Glass Sandbox →</span>
                  </div>
                </Link>
                <Link
                  href="/login?next=/dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-xs transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Start Free Trial · 1,000 Messages</span>
                </Link>
              </div>
            </div>

            {/* Field 2: AI Agentic Build */}
            <div className="p-6 rounded-2xl neural-card border border-purple-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase">02 // Neural Matrix</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                    Free: 1 Agent
                  </span>
                </div>
                <h2 className="text-xl font-display font-bold text-slate-950 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                  AI Agentic Build
                </h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Autonomous swarms capable of vector reasoning, multi-tool execution, and automated self-correction without human delays.
                </p>
              </div>
              <div className="pt-6 space-y-2">
                <Link href="/services/agentic-ai">
                  <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Explore Neural Swarm Flow →</span>
                  </div>
                </Link>
                <Link
                  href="/login?next=/dashboard%23tab-agents"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Build a Free AI Agent</span>
                </Link>
              </div>
            </div>

            {/* Field 3: Full Stack Web Development */}
            <div className="p-6 rounded-2xl terminal-shell border border-blue-500/30 hover:border-blue-400 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase">03 // Cyber Terminal</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300">
                    Free Blueprint
                  </span>
                </div>
                <h2 className="text-xl font-display font-bold text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  Full Stack Web Dev
                </h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  High-frequency platforms with sub-50ms TTFB. React 19, TypeScript 5.9, Express 5, and PostgreSQL with zero schema drift.
                </p>
              </div>
              <div className="pt-6 space-y-2">
                <Link href="/services/full-stack-web">
                  <div className="text-xs font-mono text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Explore Terminal Shell →</span>
                  </div>
                </Link>
                <Link
                  href="/login?next=/dashboard%23tab-web"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Add AI Chat to Your Web App</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 border-t border-slate-300 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>&lt; 10ms Webhook Latency</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>100% Client Code Ownership</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>1,000 Free Trial Messages</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>WhatsApp Direct Hotline</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
