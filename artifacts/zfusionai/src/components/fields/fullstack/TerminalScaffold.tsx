import React, { useState, useEffect } from "react";
import { Terminal, Cpu, Database, Cloud, CheckCircle2, Play, Copy, Check } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

export default function TerminalScaffold() {
  const [activeTab, setActiveTab] = useState<"terminal" | "architecture">("terminal");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "✓ Initializing Edge CDN cluster (Cloudflare Workers)... 14ms",
    "✓ Connecting to PostgreSQL 17 via Drizzle Connection Pool... 8ms",
    "✓ Typecheck @workspace/zfusionai (TS 5.9.3) zero errors... OK",
    "✓ Benchmarking Core Web Vitals: LCP: 0.8s | TTFB: 24ms | CLS: 0.00",
    "⚡ System Status: PRODUCTION-READY [99.999% SLA]",
  ]);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [copied, setCopied] = useState(false);

  const runBenchmark = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setTerminalLogs((prev) => [...prev, "> Running live concurrency load test (10,000 req/sec)..."]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        "✓ 10,000 / 10,000 requests resolved with HTTP 200",
        "✓ Peak latency: 38ms | Error rate: 0.00%",
        "✓ Auto-scaling zero cold-start delay verified.",
      ]);
      setIsRunningSim(false);
    }, 1200);
  };

  const copyBoilerplateCommand = () => {
    navigator.clipboard.writeText("git clone https://github.com/zfusionai/fullstack-starter.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 rounded-xl terminal-shell overflow-hidden border border-blue-500/30 shadow-2xl font-mono text-xs md:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 dark:bg-slate-950/90 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
            arch@zfusionai-core:~/edge-cluster
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              activeTab === "terminal"
                ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-500/40"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            Live Shell
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              activeTab === "architecture"
                ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-500/40"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            System Topology
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      {activeTab === "terminal" ? (
        <div className="p-6 bg-slate-50/80 dark:bg-slate-950/80 space-y-3 min-h-[260px]">
          <div className="text-slate-600 dark:text-slate-400">
            <span className="text-blue-700 dark:text-blue-400">zfusionai-cli</span> v4.2.0 (x86_64-edge-linux)
          </div>
          <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
            {terminalLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-500 select-none">$</span>
                <span className={log.includes("PRODUCTION-READY") ? "text-emerald-700 dark:text-emerald-400 font-bold" : ""}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={runBenchmark}
              disabled={isRunningSim}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition-all disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunningSim ? "Benchmarking..." : "Run Concurrency Test"}</span>
            </button>
            <button
              onClick={copyBoilerplateCommand}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Git Command" : "Clone Free Boilerplate"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-50/80 dark:bg-slate-950/80 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[260px]">
          <div className="p-4 rounded-lg bg-slate-100/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold">
              <Cloud className="w-4 h-4" />
              <span>Edge CDN Layer</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Global routing with edge SSL termination, automated Brotli compression, and distributed static caching.
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">TTFB &lt; 25ms globally</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>React 19 + Express 5</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              End-to-end typed contract via Zod and Orval codegen. Zero discrepancy between client and API schema.
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">100% Strict Type Safety</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold">
              <Database className="w-4 h-4" />
              <span>PostgreSQL + Drizzle</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Connection pooling, automated atomic migrations, indexing on high-frequency queries, and zero ORM overhead.
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">Sub-10ms query execution</div>
          </div>
        </div>
      )}

      {/* Terminal Footer with WhatsApp Lead Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-blue-100/30 dark:bg-blue-950/30 border-t border-blue-500/20 gap-3">
        <span className="text-xs text-blue-700 dark:text-blue-300">
          Want this architecture implemented for your custom platform?
        </span>
        <a
          href={generateWhatsAppLink({
            service: "fullstack",
            type: "fullstack_architecture_review",
            tier: "FREE",
            scopeSummary: "Requesting free system architecture review & Docker boilerplate",
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline font-mono flex items-center gap-1.5"
        >
          <span>Claim Free Architecture Review on WhatsApp →</span>
        </a>
      </div>
    </div>
  );
}
