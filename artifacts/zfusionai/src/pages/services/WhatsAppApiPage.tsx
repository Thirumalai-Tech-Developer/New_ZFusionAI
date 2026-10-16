import React from "react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidGlassCanvas from "@/components/fields/whatsapp/LiquidGlassCanvas";
import InteractiveChatMock from "@/components/fields/whatsapp/InteractiveChatMock";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";
import { MessageSquare, Zap, Shield, CheckCircle2, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { Link } from "wouter";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";
import { trialSteps, whatsappFaqs } from "@/seo/content";

export default function WhatsAppApiPage() {
  const enterpriseLink = generateWhatsAppLink({
    service: "whatsapp-api",
    type: "whatsapp_api_demo",
    tier: "ENTERPRISE",
    scopeSummary: "High-Volume Enterprise WhatsApp Cloud API Infrastructure Scoping",
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://zfusionai.com/services/whatsapp-api/#software",
        "name": "ZFusionAI WhatsApp AI Automation API",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "WhatsApp Business API, AI Chatbot",
        "operatingSystem": "Web, Cloud",
        "url": "https://zfusionai.com/services/whatsapp-api",
        "description":
          "AI auto-replies, REST API and webhooks for the official WhatsApp Business Cloud API. Free trial includes 1,000 messages.",
        "featureList": [
          "AI auto-replies via any OpenAI-compatible model",
          "REST API with API keys for text and template messages",
          "Meta webhook verification with SHA-256 signature checks",
          "Message logs and usage dashboard",
          "Account registration and sign-in",
        ],
        "provider": { "@id": "https://zfusionai.com/#organization" },
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Trial: 1,000 WhatsApp messages",
            "price": "0",
            "priceCurrency": "AED",
            "description":
              "1,000 free outbound WhatsApp messages including AI auto-replies, API access and webhooks. No credit card required.",
            "availability": "https://schema.org/InStock",
            "url": "https://zfusionai.com/login",
          },
          {
            "@type": "Offer",
            "name": "Production WhatsApp AI Automation",
            "priceCurrency": "AED",
            "description": "Custom message volumes, CRM synchronization and dedicated support.",
            "url": "https://zfusionai.com/contact",
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": "https://zfusionai.com/services/whatsapp-api/#howto",
        "name": "How to start the ZFusionAI WhatsApp AI automation free trial",
        "totalTime": "PT10M",
        "step": trialSteps.map((step, i) => ({
          "@type": "HowToStep",
          "position": i + 1,
          "name": step.title,
          "text": step.text,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": "https://zfusionai.com/services/whatsapp-api/#faq",
        "mainEntity": whatsappFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030c07] text-[#f0fdf4] selection:bg-[#25d366]/30 overflow-x-hidden" data-field="whatsapp">
      <SeoHead
        title="WhatsApp AI Automation API: Free Trial with 1,000 Messages | ZFusionAI"
        description="AI auto-replies and a REST API for the official WhatsApp Business Cloud API. Start free with 1,000 messages: sign in to your account, no credit card."
        keywords={[
          "WhatsApp API free trial",
          "WhatsApp AI chatbot",
          "WhatsApp Business API Dubai",
          "WhatsApp Cloud API integration",
          "WhatsApp automation UAE",
          "AI auto reply WhatsApp",
        ]}
        path="/services/whatsapp-api"
        schema={schemaData}
      />

      <LiquidGlassCanvas />
      <Navbar />

      <main className="relative z-10 pt-28">
        {/* AEO Authoritative Answer Block & Hero */}
        <section className="container mx-auto px-6 md:px-12 py-16 text-center max-w-4xl" aria-label="AEO Definition Block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-xs mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
            <span>META CLOUD API MIDDLEWARE // 0MS BOTTLENECK</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white mb-6">
            Liquid Glass WhatsApp API. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
              Zero Middleware Latency.
            </span>
          </h1>

          {/* First-Paragraph AEO Citation Anchor */}
          <div className="p-6 rounded-2xl liquid-glass text-left border border-emerald-500/30 mb-8">
            <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1">
              [AUTHORITATIVE DEFINITION & ARCHITECTURE]
            </div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              <strong>The ZFusionAI WhatsApp Web API Integration</strong> is an ultra-low latency middleware layer connecting enterprise platforms directly to Meta’s official WhatsApp Cloud API. Engineered with asynchronous event-driven webhooks, it guarantees 99.99% uptime, zero SaaS per-message markups, and bidirectional CRM synchronization. It adds <strong>AI auto-replies</strong> powered by any OpenAI-compatible model and a simple REST API. Each eligible phone number unlocks a <strong>free trial of 1,000 WhatsApp messages</strong>: sign in to your account, no credit card or contract.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login?next=/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-base shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Start Free Trial · 1,000 Messages</span>
            </Link>
            <a
              href={enterpriseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 text-slate-950 dark:text-white font-medium border border-emerald-500/30 backdrop-blur-md transition-all"
            >
              <span>Consult Lead Engineer</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Interactive Liquid Glass Simulator */}
        <section className="container mx-auto px-6 md:px-12 py-12">
          <InteractiveChatMock />
        </section>

        {/* Architectural Highlights / "How It Works" AEO Block */}
        <section className="container mx-auto px-6 md:px-12 py-16" aria-label="How it works">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
              How the Direct Cloud API Architecture Functions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              Standard SaaS aggregators route your traffic through shared middle-tier databases. ZFusionAI establishes direct peer connections to Meta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">01 // Direct Edge Webhook</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Inbound events trigger microsecond serverless functions that verify SHA-256 signatures and stream payloads without intermediate queueing.
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">02 // Zero Data Interception</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Meta access tokens are encrypted at rest (AES-256-GCM) and webhooks are signature-verified. Message logs are visible only to your account, and ZFusionAI never sells or monetizes your conversations.
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">03 // Wholesale Meta Billing</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                You settle conversation charges directly with Meta at official wholesale prices, saving 60-80% compared to legacy WhatsApp aggregators.
              </p>
            </div>
          </div>
        </section>

        {/* Free trial: HowTo + FAQ (AEO answer blocks mirrored in JSON-LD) */}
        <section className="container mx-auto px-6 md:px-12 py-16" aria-labelledby="trial-heading">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="trial-heading" className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
              Start the free trial: 1,000 WhatsApp messages
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              Go from sign-in to AI-powered WhatsApp replies in about ten minutes.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trialSteps.map((step, i) => (
              <li key={step.title} className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 text-left space-y-2">
                <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400">STEP {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/login?next=/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create free account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-12 py-16 max-w-4xl" aria-labelledby="wa-faq-heading">
          <h2 id="wa-faq-heading" className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white text-center mb-10">
            WhatsApp AI automation FAQ
          </h2>
          <div className="space-y-4">
            {whatsappFaqs.map((faq) => (
              <details key={faq.q} className="group p-5 rounded-2xl liquid-glass border border-emerald-500/20 text-left">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-slate-950 dark:text-white">
                  <h3 className="text-base">{faq.q}</h3>
                  <span className="text-emerald-700 dark:text-emerald-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Procedural Pricing & Free Tier Section */}
        <ProceduralCalculator />
      </main>

      <Footer />
    </div>
  );
}
