import React, { useState } from "react";
import { Cpu, Database, GitBranch, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

interface StepNode {
  id: string;
  title: string;
  desc: string;
  status: "idle" | "running" | "success" | "retry";
}

export default function WorkflowOrchestrator() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [injectError, setInjectError] = useState<boolean>(false);
  const [isSelfCorrecting, setIsSelfCorrecting] = useState<boolean>(false);

  const steps: StepNode[] = [
    {
      id: "1",
      title: "01 // Autonomous Intent Intake",
      desc: "Agent parses unstructured enterprise prompt via multi-turn reasoning engine.",
      status: "success",
    },
    {
      id: "2",
      title: "02 // Vector Knowledge Retrieval (RAG)",
      desc: "Cross-checks semantic embeddings across internal private knowledge graph.",
      status: activeStep >= 2 ? "success" : "idle",
    },
    {
      id: "3",
      title: "03 // Sandboxed Tool Execution",
      desc: "Agent writes & runs parameterized SQL queries or calls third-party APIs.",
      status: injectError ? (isSelfCorrecting ? "retry" : "idle") : "success",
    },
    {
      id: "4",
      title: "04 // Self-Correction & Verification",
      desc: "Autonomous supervisor audits output against constraints. Auto-retries on deviation.",
      status: "success",
    },
  ];

  const handleSimulateFailure = () => {
    setInjectError(true);
    setIsSelfCorrecting(true);

    setTimeout(() => {
      setIsSelfCorrecting(false);
      setInjectError(false);
    }, 1800);
  };

  const freeAgentLink = generateWhatsAppLink({
    service: "agentic-ai",
    type: "free_tier_claim",
    tier: "FREE",
    scopeSummary: "Claiming 1 Free Autonomous AI Agent Sandbox Node",
  });

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 rounded-2xl neural-card p-6 md:p-8 border border-purple-500/30 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-purple-500/20 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>AUTONOMOUS SWARM SIMULATOR</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-950 dark:text-white">
            Self-Correcting Agent Swarm Pipeline
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Observe multi-step reasoning, dynamic tool usage, and auto-recovery in action.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateFailure}
            disabled={isSelfCorrecting}
            className="px-4 py-2 rounded-lg bg-purple-100/70 dark:bg-purple-950/70 border border-purple-500/40 text-purple-700 dark:text-purple-300 font-mono text-xs hover:border-purple-400 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSelfCorrecting ? "animate-spin text-cyan-700 dark:text-cyan-400" : ""}`} />
            <span>{isSelfCorrecting ? "Self-Correcting Node..." : "Test Failure Recovery"}</span>
          </button>
        </div>
      </div>

      {/* Nodes Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((s, index) => (
          <div
            key={s.id}
            onClick={() => setActiveStep(index + 1)}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              activeStep === index + 1
                ? "border-cyan-400 bg-cyan-100/20 dark:bg-cyan-950/20 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                : "border-slate-300 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-cyan-700 dark:text-cyan-400">{s.title.split("//")[0]}</span>
              {s.status === "retry" ? (
                <span className="flex items-center gap-1 text-[10px] font-mono text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/30">
                  <AlertTriangle className="w-3 h-3" /> Auto-Retry
                </span>
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              )}
            </div>
            <div className="text-sm font-bold text-slate-950 dark:text-white mb-1.5">{s.title.split("//")[1]}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Self-Correction Inspector Console */}
      <div className="mt-8 p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-cyan-500/20 font-mono text-xs text-slate-700 dark:text-slate-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>
            {isSelfCorrecting
              ? "[AGENT COGNITION] SQL Constraint deviation detected -> Autonomous rewrite initiated -> Success verified in 210ms."
              : "[AGENT COGNITION] Swarm state: NOMINAL. Vector similarity: 0.94. Tools verified."}
          </span>
        </div>
        <a
          href={freeAgentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold font-sans text-xs hover:opacity-90 transition-opacity"
        >
          <span>Deploy 1 Free Agent on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
