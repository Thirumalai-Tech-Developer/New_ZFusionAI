import React from "react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralCanvas from "@/components/fields/agentic/NeuralCanvas";
import WorkflowOrchestrator from "@/components/fields/agentic/WorkflowOrchestrator";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";
import { Cpu, Database, GitMerge, RefreshCw, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";
import TrialSection from "@/components/TrialSection";
import { agenticFaqs, agenticSteps, trialSchema } from "@/seo/content";

export default function AgenticAiPage() {
  const enterpriseLink = generateWhatsAppLink({
    service: "agentic-ai",
    type: "agentic_workflow_scoping",
    tier: "ENTERPRISE",
    scopeSummary: "Enterprise Multi-Agent Swarm & Tool Calling Architecture",
  });

  const schemaData = [
    ...trialSchema({
      path: "/services/agentic-ai",
      name: "ZFusionAI AI Agents API",
      description:
        "Build AI agents with instructions and webhook tools, then run them through a REST API or an OpenAI-compatible endpoint. Free trial with 1,000 messages.",
      category: "DeveloperApplication",
      steps: agenticSteps,
      faqs: agenticFaqs,
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://zfusionai.com/services/agentic-ai/#service",
      name: "Autonomous AI Agent Development",
      provider: { "@id": "https://zfusionai.com/#organization" },
      serviceType: "Artificial Intelligence Engineering",
      areaServed: ["AE", "Worldwide"],
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#020206] text-[#fdf4ff] selection:bg-[#00f2fe]/30 overflow-x-hidden" data-field="agentic">
      <SeoHead
        title="Autonomous AI Agentic Build | Multi-Agent Swarms | ZFusionAI"
        description="Architect custom autonomous AI agents that reason, call APIs, query databases, and self-correct errors. Claim your free agent sandbox on WhatsApp."
        path="/services/agentic-ai"
        schema={schemaData}
      />

      <NeuralCanvas />
      <Navbar />

      <main className="relative z-10 pt-28">
        {/* AEO Authoritative Answer Block & Hero */}
        <section className="container mx-auto px-6 md:px-12 py-16 text-center max-w-4xl" aria-label="AEO Definition Block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-slate-50 dark:bg-[#00f2fe] animate-pulse" />
            <span>AUTONOMOUS COGNITIVE ARCHITECTURE // MULTI-NODE SWARMS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white mb-6">
            Autonomous AI Agents. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500">
              Zero Human Bottlenecks.
            </span>
          </h1>

          {/* First-Paragraph AEO Citation Anchor */}
          <div className="p-6 rounded-2xl neural-card text-left border border-purple-500/30 mb-8">
            <div className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-1">
              [AUTHORITATIVE DEFINITION & ARCHITECTURE]
            </div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              <strong>An AI Agentic Build by ZFusionAI</strong> is an autonomous cognitive software architecture capable of multi-step reasoning, real-time tool calling, and self-correcting error recovery. Rather than passive text prediction, these agent networks interact with private vector stores, execute transactional database queries, and trigger external API workflows across enterprise environments. You can build and run your own agents on the ZFusionAI platform through a REST API or an <strong>OpenAI-compatible endpoint</strong>. New accounts get a <strong>free trial of 1,000 messages</strong>, shared with the web widget and WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login?next=/dashboard%23tab-agents"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-base shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Build a Free AI Agent · 1,000 Messages</span>
            </Link>
            <a
              href={enterpriseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 text-slate-950 dark:text-white font-medium border border-purple-500/30 backdrop-blur-md transition-all"
            >
              <span>Scope Swarm Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Interactive Autonomous Workflow Orchestrator */}
        <section className="container mx-auto px-6 md:px-12 py-12">
          <WorkflowOrchestrator />
        </section>

        {/* Cognitive Capabilities / "How It Works" AEO Block */}
        <section className="container mx-auto px-6 md:px-12 py-16" aria-label="How it works">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
              The Four Pillars of Agent Autonomy
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              How ZFusionAI agents achieve 99.4% execution reliability across mission-critical business workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">Plan & Reason</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Breaks high-level enterprise goals into deterministic Directed Acyclic Graphs (DAGs) before execution.
              </p>
            </div>

            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-700 dark:text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">Vector Recall</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Connects to private Pinecone/Qdrant vector indexes with hybrid dense-sparse retrieval to eliminate hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                <GitMerge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">Tool Sandbox</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Executes code, writes SQL statements, and invokes authenticated webhooks within isolated Docker containers.
              </p>
            </div>

            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">Self-Correction</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Automated supervisor node checks output against deterministic schema validations and auto-retries on failure.
              </p>
            </div>
          </div>
        </section>

        <TrialSection
          id="agent-trial"
          heading="Start free: build and run your own AI agent"
          intro="Create an agent, give it tools, and call it from your code in minutes. Works with any OpenAI SDK."
          steps={agenticSteps}
          faqs={agenticFaqs}
          faqHeading="AI agents FAQ"
          accent="cyan"
        />

        {/* Procedural Pricing Section */}
        <ProceduralCalculator />
      </main>

      <Footer />
    </div>
  );
}
