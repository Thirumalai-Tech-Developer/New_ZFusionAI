import React from "react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralCanvas from "@/components/fields/agentic/NeuralCanvas";
import WorkflowOrchestrator from "@/components/fields/agentic/WorkflowOrchestrator";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";
import { Cpu, Database, GitMerge, RefreshCw, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

export default function AgenticAiPage() {
  const freeAgentLink = generateWhatsAppLink({
    service: "agentic-ai",
    type: "free_tier_claim",
    tier: "FREE",
    scopeSummary: "Deploying 1 Free Autonomous AI Agent Sandbox Node",
  });

  const enterpriseLink = generateWhatsAppLink({
    service: "agentic-ai",
    type: "agentic_workflow_scoping",
    tier: "ENTERPRISE",
    scopeSummary: "Enterprise Multi-Agent Swarm & Tool Calling Architecture",
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://zfusionai.com/services/agentic-ai/#software",
        "name": "ZFusionAI Autonomous Agent Swarm Engine",
        "applicationCategory": "ArtificialIntelligenceApplication",
        "operatingSystem": "Cloud, Private VPC",
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Autonomous Agent Sandbox",
            "price": "0",
            "priceCurrency": "AED",
            "description": "1 single-node autonomous agent workflow, vector memory pipeline up to 500 documents, and WhatsApp interface.",
            "availability": "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            "name": "Enterprise Multi-Agent Swarm System",
            "price": "Custom",
            "priceCurrency": "AED",
            "description": "Hierarchical multi-agent networks with sandboxed tool execution, self-correction, and private VPC deployment.",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://zfusionai.com/services/agentic-ai/#service",
        "name": "Autonomous AI Agentic Engineering & Workflow Swarms",
        "provider": {
          "@type": "Organization",
          "name": "ZFusionAI",
          "url": "https://zfusionai.com",
        },
        "serviceType": "Artificial Intelligence Engineering",
        "areaServed": "Global",
      },
      {
        "@type": "FAQPage",
        "@id": "https://zfusionai.com/services/agentic-ai/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an AI Agentic Build and how is it different from a ChatGPT wrapper?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike simple chatbots that generate text replies, ZFusionAI Agentic Systems operate autonomously. They can query internal SQL databases, call REST APIs, analyze results, and auto-correct errors without human intervention.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I test an autonomous AI agent for free before committing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. ZFusionAI provides 1 free autonomous agent node with private vector memory and WhatsApp chat integration so enterprise teams can benchmark accuracy before scaling.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#020206] text-[#fdf4ff] selection:bg-[#00f2fe]/30 overflow-x-hidden" data-field="agentic">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
            <span>AUTONOMOUS COGNITIVE ARCHITECTURE // MULTI-NODE SWARMS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6">
            Autonomous AI Agents. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500">
              Zero Human Bottlenecks.
            </span>
          </h1>

          {/* First-Paragraph AEO Citation Anchor */}
          <div className="p-6 rounded-2xl neural-card text-left border border-purple-500/30 mb-8">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
              [AUTHORITATIVE DEFINITION & ARCHITECTURE]
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              <strong>An AI Agentic Build by ZFusionAI</strong> is an autonomous cognitive software architecture capable of multi-step reasoning, real-time tool calling, and self-correcting error recovery. Rather than passive text prediction, these agent networks interact with private vector stores, execute transactional database queries, and trigger external API workflows across enterprise environments. ZFusionAI provisions a <strong>permanent free single-agent sandbox</strong> with instant WhatsApp onboarding.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={freeAgentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-base shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Deploy Free Agent on WhatsApp</span>
            </a>
            <a
              href={enterpriseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-purple-500/30 backdrop-blur-md transition-all"
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
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
              The Four Pillars of Agent Autonomy
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              How ZFusionAI agents achieve 99.4% execution reliability across mission-critical business workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Plan & Reason</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Breaks high-level enterprise goals into deterministic Directed Acyclic Graphs (DAGs) before execution.
              </p>
            </div>

            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Vector Recall</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects to private Pinecone/Qdrant vector indexes with hybrid dense-sparse retrieval to eliminate hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                <GitMerge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Tool Sandbox</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes code, writes SQL statements, and invokes authenticated webhooks within isolated Docker containers.
              </p>
            </div>

            <div className="p-6 rounded-2xl neural-card border border-purple-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Self-Correction</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated supervisor node checks output against deterministic schema validations and auto-retries on failure.
              </p>
            </div>
          </div>
        </section>

        {/* Procedural Pricing Section */}
        <ProceduralCalculator />
      </main>

      <Footer />
    </div>
  );
}
