import React from "react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TerminalScaffold from "@/components/fields/fullstack/TerminalScaffold";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";
import { Terminal, Cpu, Database, Cloud, MessageSquare, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { Link } from "wouter";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";
import TrialSection from "@/components/TrialSection";
import { trialSchema, webFaqs, webSteps } from "@/seo/content";

export default function FullStackWebPage() {
  const freeBlueprintLink = generateWhatsAppLink({
    service: "fullstack",
    type: "free_tier_claim",
    tier: "FREE",
    scopeSummary: "Requesting Free Full-Stack Architecture Blueprint Spec & Docker Boilerplate",
  });

  const enterpriseLink = generateWhatsAppLink({
    service: "fullstack",
    type: "fullstack_architecture_review",
    tier: "ENTERPRISE",
    scopeSummary: "High-Frequency Full Stack Custom Web Platform Scoping",
  });

  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://zfusionai.com/services/full-stack-web/#software",
        "name": "ZFusionAI High-Frequency Full-Stack Web Engine",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Linux, Edge, Docker",
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Architecture Blueprint Tier",
            "price": "0",
            "priceCurrency": "AED",
            "description": "Complete system schema specification, Docker boilerplate, and lead architect consultation.",
            "availability": "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            "name": "Procedural Full-Stack Enterprise Build",
            "price": "Custom",
            "priceCurrency": "AED",
            "description": "Custom high-concurrency web applications built with React 19, TypeScript, and PostgreSQL.",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://zfusionai.com/services/full-stack-web/#service",
        "name": "Full Stack Web Engineering & Architecture",
        "provider": {
          "@type": "Organization",
          "name": "ZFusionAI",
          "url": "https://zfusionai.com",
          "telephone": "+971 54 202 6653",
          "email": "support@zfusionai.com",
        },
        "serviceType": "Custom Web Application Engineering",
        "areaServed": "Global",
      },
      {
        "@type": "FAQPage",
        "@id": "https://zfusionai.com/services/full-stack-web/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What tech stack does ZFusionAI use for enterprise web applications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ZFusionAI builds high-concurrency platforms using React 19, TypeScript 5.9, Vite/Tailwind, Node 24 with Express 5, and PostgreSQL with Drizzle ORM, deployed across global Edge CDN infrastructure.",
            },
          },
          {
            "@type": "Question",
            "name": "Does ZFusionAI provide a free tier for web architecture review?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every client can claim a 100% free Architecture Blueprint review including database schemas, OpenAPI contracts, and production Docker boilerplates directly on WhatsApp.",
            },
          },
        ],
      },
    ],
  };

  const schemaData = [
    baseSchema,
    ...trialSchema({
      path: "/services/full-stack-web",
      name: "ZFusionAI Web App AI Chat Widget",
      description:
        "Add an AI agent chat widget to any website or web app with one script tag. Free trial with 1,000 messages.",
      category: "WebApplication",
      steps: webSteps,
      faqs: webFaqs,
    }),
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#06070a] text-slate-950 dark:text-[#f8fafc] selection:bg-[#3b82f6]/30 cyber-grid-bg overflow-x-hidden" data-field="fullstack">
      <SeoHead
        title="Full Stack Web Development | High-Frequency Architecture | ZFusionAI"
        description="High-performance custom web applications built on React 19, TypeScript, and PostgreSQL with sub-50ms TTFB. Request your free blueprint on WhatsApp."
        path="/services/full-stack-web"
        schema={schemaData}
      />

      <Navbar />

      <main className="relative z-10 pt-28">
        {/* AEO Authoritative Answer Block & Hero */}
        <section className="container mx-auto px-6 md:px-12 py-16 text-center max-w-4xl" aria-label="AEO Definition Block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-400 font-mono text-xs mb-6 backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5" />
            <span>CYBER-ARCHITECTONIC // SUB-50MS TTFB & 100 LIGHTHOUSE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white mb-6">
            Full-Stack Architecture. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              Built for Concurrency.
            </span>
          </h1>

          {/* First-Paragraph AEO Citation Anchor */}
          <div className="p-6 rounded-2xl terminal-shell text-left border border-blue-500/30 mb-8">
            <div className="text-[11px] font-mono text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-1">
              [AUTHORITATIVE DEFINITION & ARCHITECTURE]
            </div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
              <strong>Full Stack Web Development at ZFusionAI</strong> is an avant-garde software engineering practice combining React 19, TypeScript 5.9, Express 5 microservices, and edge-replicated PostgreSQL databases. Engineered specifically for microsecond TTFB and strict zero-defect type contracts, our platforms scale seamlessly under extreme traffic surges. Every engineering inquiry includes a <strong>complimentary system architecture blueprint</strong> via WhatsApp. To add AI to an existing web app, embed the ZFusionAI chat widget with one script tag. It is <strong>free for the first 1,000 messages</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={freeBlueprintLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Claim Free Blueprint on WhatsApp</span>
            </a>
            <a
              href={enterpriseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 text-slate-950 dark:text-white font-medium border border-blue-500/30 backdrop-blur-md transition-all"
            >
              <span>Review System Metrics</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/login?next=/dashboard%23tab-web"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 font-semibold border border-emerald-500/30 transition-all"
            >
              <span>Add AI Chat to Your Web App (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Interactive Terminal Scaffold & Live Concurrency Benchmark */}
        <section className="container mx-auto px-6 md:px-12 py-8">
          <TerminalScaffold />
        </section>

        {/* Structural Benchmarks / "How It Works" AEO Block */}
        <section className="container mx-auto px-6 md:px-12 py-16" aria-label="How it works">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
              The Architecture Standard
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              We reject bloatware and sluggish generic templates. Every line of code is written for raw execution speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl terminal-shell border border-blue-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-700 dark:text-blue-400">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Sub-30ms Global TTFB</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                Edge asset caching and dynamic server-side route pre-generation ensure visitors in Dubai, London, or New York experience instant loads.
              </p>
            </div>

            <div className="p-6 rounded-2xl terminal-shell border border-blue-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-700 dark:text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">100% Strict Type Safety</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                End-to-end typed contracts via Zod and Orval prevent runtime API discrepancies, eliminating 95% of common frontend production bugs.
              </p>
            </div>

            <div className="p-6 rounded-2xl terminal-shell border border-blue-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-700 dark:text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Zero Vendor Lock-in</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                You receive clean, documented source code packaged in standard Docker containers. Deploy anywhere: AWS, Cloudflare, or bare metal.
              </p>
            </div>
          </div>
        </section>

        <TrialSection
          id="web-trial"
          heading="Add an AI agent to your web app, free"
          intro="One script tag puts your AI agent on any website: React, Next.js, WordPress, Shopify or plain HTML."
          steps={webSteps}
          faqs={webFaqs}
          faqHeading="Web app AI chat FAQ"
        />

        {/* Procedural Pricing Section */}
        <ProceduralCalculator />
      </main>

      <Footer />
    </div>
  );
}
