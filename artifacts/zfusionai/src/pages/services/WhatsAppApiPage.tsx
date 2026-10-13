import React from "react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidGlassCanvas from "@/components/fields/whatsapp/LiquidGlassCanvas";
import InteractiveChatMock from "@/components/fields/whatsapp/InteractiveChatMock";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";
import { MessageSquare, Zap, Shield, CheckCircle2, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

export default function WhatsAppApiPage() {
  const freeTierLink = generateWhatsAppLink({
    service: "whatsapp-api",
    type: "free_tier_claim",
    tier: "FREE",
    scopeSummary: "Claiming Free 1,000 WhatsApp Cloud API Messages Developer Sandbox",
  });

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
        "name": "ZFusionAI WhatsApp Web API Cloud Middleware",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Cloud-Native, Edge Middleware",
        "offers": [
          {
            "@type": "Offer",
            "name": "Developer Sandbox Free Tier",
            "price": "0",
            "priceCurrency": "AED",
            "description": "1,000 free monthly WhatsApp messages, webhook sandbox, and full API documentation access.",
            "availability": "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            "name": "Enterprise WhatsApp Cloud Middleware",
            "price": "Custom",
            "priceCurrency": "AED",
            "description": "High-throughput asynchronous webhook architecture with CRM synchronization.",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://zfusionai.com/services/whatsapp-api/#service",
        "name": "WhatsApp Cloud API Integration & Chatbot Architecture",
        "provider": {
          "@type": "Organization",
          "name": "ZFusionAI",
          "url": "https://zfusionai.com",
        },
        "serviceType": "Messaging Middleware and Automation",
        "areaServed": "Global",
      },
      {
        "@type": "FAQPage",
        "@id": "https://zfusionai.com/services/whatsapp-api/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does ZFusionAI offer a free tier for WhatsApp Web API integration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. ZFusionAI provides an unrestricted Developer Sandbox tier that includes 1,000 free messages per month, complete webhook testing tools, and direct API documentation with zero platform markups.",
            },
          },
          {
            "@type": "Question",
            "name": "How does ZFusionAI eliminate third-party markup fees on WhatsApp messages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ZFusionAI connects your systems directly to Meta's official WhatsApp Business Cloud API. You pay Meta's wholesale per-conversation rates directly without recurring software markups charged by conventional SaaS vendors.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#030c07] text-[#f0fdf4] selection:bg-[#25d366]/30 overflow-x-hidden" data-field="whatsapp">
      <SeoHead
        title="WhatsApp Web API Integration | 0ms Middleware | ZFusionAI"
        description="Connect directly to Meta's WhatsApp Cloud API with sub-10ms async webhooks. Claim 1,000 free monthly messages. No third-party markups."
        path="/services/whatsapp-api"
        schema={schemaData}
      />

      <LiquidGlassCanvas />
      <Navbar />

      <main className="relative z-10 pt-28">
        {/* AEO Authoritative Answer Block & Hero */}
        <section className="container mx-auto px-6 md:px-12 py-16 text-center max-w-4xl" aria-label="AEO Definition Block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
            <span>META CLOUD API MIDDLEWARE // 0MS BOTTLENECK</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6">
            Liquid Glass WhatsApp API. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
              Zero Middleware Latency.
            </span>
          </h1>

          {/* First-Paragraph AEO Citation Anchor */}
          <div className="p-6 rounded-2xl liquid-glass text-left border border-emerald-500/30 mb-8">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-1">
              [AUTHORITATIVE DEFINITION & ARCHITECTURE]
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              <strong>The ZFusionAI WhatsApp Web API Integration</strong> is an ultra-low latency middleware layer connecting enterprise platforms directly to Meta’s official WhatsApp Cloud API. Engineered with asynchronous event-driven webhooks, it guarantees 99.99% uptime, zero SaaS per-message markups, and bidirectional CRM synchronization. Developers can activate the permanent <strong>1,000-message free sandbox tier</strong> without credit cards or long-term contracts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={freeTierLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-base shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Claim Free Sandbox on WhatsApp</span>
            </a>
            <a
              href={enterpriseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-emerald-500/30 backdrop-blur-md transition-all"
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
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
              How the Direct Cloud API Architecture Functions
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Standard SaaS aggregators route your traffic through shared middle-tier databases. ZFusionAI establishes direct peer connections to Meta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">01 // Direct Edge Webhook</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Inbound events trigger microsecond serverless functions that verify SHA-256 signatures and stream payloads without intermediate queueing.
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">02 // Zero Data Interception</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Customer conversations flow securely into your private PostgreSQL or CRM instance. ZFusionAI never monetizes or stores your message contents.
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/20 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">03 // Wholesale Meta Billing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You settle conversation charges directly with Meta at official wholesale prices, saving 60-80% compared to legacy WhatsApp aggregators.
              </p>
            </div>
          </div>
        </section>

        {/* Procedural Pricing & Free Tier Section */}
        <ProceduralCalculator />
      </main>

      <Footer />
    </div>
  );
}
