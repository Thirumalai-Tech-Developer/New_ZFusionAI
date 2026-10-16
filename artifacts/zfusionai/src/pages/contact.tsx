import React from "react";
import SeoHead from "@/components/SeoHead";
import PageLayout from "@/components/PageLayout";
import { MessageSquare, Zap, Shield, Sparkles, ArrowRight, CheckCircle2, Phone, Clock } from "lucide-react";
import { generateWhatsAppLink, QUICK_PROMPTS, WHATSAPP_CONFIG } from "@/lib/whatsappEngine";

export default function ContactPage() {
  const directLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Direct consultation from WhatsApp Command Center",
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "ZFusionAI WhatsApp Direct Command Center",
    "url": "https://zfusionai.com/contact",
    "description": "Connect directly with ZFusionAI senior engineering partners via WhatsApp. Zero forms, instant conversational responses, and free tier activations.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ZFusionAI",
      "telephone": "+971 54 202 6653",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971 54 202 6653",
        "contactType": "technical support",
        "contactOption": "WhatsApp",
        "availableLanguage": ["English", "Arabic"],
      },
    },
  };

  return (
    <>
      <SeoHead
        title="WhatsApp Direct Contact | ZFusionAI Engineering Partner"
        description="Zero traditional forms. Connect directly with ZFusionAI senior engineers on WhatsApp (+971 54 202 6653) for instant scoping and free tier activations."
        path="/contact"
        schema={schemaData}
      />

      <PageLayout>
        <section className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto text-center" aria-label="WhatsApp Contact Command Center">
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-xs mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
            <span>ZERO DELAY // DIRECT WHATSAPP PIPELINE</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-slate-950 dark:text-white tracking-tight mb-6">
            Direct WhatsApp Command Center. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              No Traditional Forms. No Waiting.
            </span>
          </h1>

          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-base md:text-lg mb-12">
            We eliminated static contact forms that get lost in inboxes. Speak directly with a Senior Engineering Architect on WhatsApp in real time.
          </p>

          {/* Quick Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
            {/* Channel 1: Free Tier Immediate Activation */}
            <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-emerald-500/30 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase">Channel 01</div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">Instant Free Tier Activation</h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Claim 1,000 free WhatsApp API events, 1 free autonomous AI agent sandbox, or a full-stack production blueprint.
                </p>
              </div>
              <a
                href={generateWhatsAppLink({
                  service: "general",
                  type: "free_tier_claim",
                  tier: "FREE",
                  scopeSummary: "Instant Free Tier Activation from Contact Page",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-md"
              >
                <span>Activate Free Tier on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Channel 2: WhatsApp Web API Middleware */}
            <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-emerald-500/30 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#25d366]/20 text-emerald-700 dark:text-[#25d366] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div className="text-xs font-mono text-emerald-700 dark:text-[#25d366] uppercase">Channel 02</div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">WhatsApp API Consultation</h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Review direct Meta Cloud API integration, CRM pipelines, and automated broadcast scaling with our messaging architect.
                </p>
              </div>
              <a
                href={generateWhatsAppLink({
                  service: "whatsapp-api",
                  type: "whatsapp_api_demo",
                  tier: "SCALE",
                  scopeSummary: "Direct WhatsApp Cloud API Technical Consultation",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-xs transition-all shadow-md"
              >
                <span>Chat with API Specialist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Channel 3: Full Stack & AI Agent Scoping */}
            <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-cyan-500/30 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase">Channel 03</div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">AI & Full-Stack Scoping</h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Discuss autonomous multi-agent workflows, vector knowledge bases, or high-frequency web development sprints.
                </p>
              </div>
              <a
                href={generateWhatsAppLink({
                  service: "agentic-ai",
                  type: "agentic_workflow_scoping",
                  tier: "ENTERPRISE",
                  scopeSummary: "Custom AI Agent / Full-Stack Platform Scoping",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xs transition-all shadow-md"
              >
                <span>Scope with AI Architect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Master WhatsApp Hotline Card */}
          <div className="p-8 rounded-3xl bg-slate-50/90 dark:bg-slate-950/90 border-2 border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs">
                <Phone className="w-4 h-4" />
                <span>OFFICIAL WHATSAPP BUSINESS VERIFIED LINE</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-slate-950 dark:text-white">
                {WHATSAPP_CONFIG.phone}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Average Response: &lt; 2 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Direct Senior Architect Connection
                </span>
              </div>
            </div>

            <a
              href={directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-base shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105 shrink-0"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Launch WhatsApp Chat Now</span>
            </a>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
