import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2, Zap, Shield, Eye, Lightbulb, Link as LinkIcon, ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Link } from "wouter";
import { generateWhatsAppLink, WHATSAPP_CONFIG } from "@/lib/whatsappEngine";

const values = [
  { title: "Execution Over Ideas", icon: Zap, text: "Ideas are cheap. We pride ourselves on shipping robust, working software fast." },
  { title: "Total Transparency", icon: Eye, text: "No black boxes. You have access to source code, progress tracking, and direct lines to engineers." },
  { title: "Engineering Quality", icon: CheckCircle2, text: "We don't cut corners. Scalable architecture, clean code, and automated testing are defaults." },
  { title: "Applied Innovation", icon: Lightbulb, text: "We implement AI and modern tech where it drives value, not just for the buzzword." },
  { title: "Security First", icon: Shield, text: "Data privacy and system security are integrated from the first line of code." },
  { title: "Long-term Partnerships", icon: LinkIcon, text: "We build systems we want to maintain. We succeed when your product scales." }
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://zfusionai.com/about/#webpage",
      "url": "https://zfusionai.com/about",
      "name": "About ZFusionAI | Engineering Architecture & Team in Dubai",
      "description": "Learn about ZFusionAI, Dubai's premier digital engineering team specializing in WhatsApp Web API middleware, autonomous AI agent swarms, and high-frequency web development.",
      "mainEntity": {
        "@type": "Organization",
        "name": "ZFusionAI",
        "url": "https://zfusionai.com",
        "logo": "https://zfusionai.com/brand/logo_compressed.png",
        "telephone": "+971 54 202 6653",
        "email": "support@zfusionai.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://zfusionai.com/about/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is ZFusionAI and where is it based?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ZFusionAI is an elite software engineering and artificial intelligence laboratory based in Dubai, UAE. The firm specializes in WhatsApp Business Cloud API middleware, autonomous AI agent swarms, and sub-50ms full-stack web platforms."
          }
        },
        {
          "@type": "Question",
          "name": "How does ZFusionAI differ from conventional digital agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike typical agencies that outsource projects or wrap generic SaaS templates, ZFusionAI builds custom-coded, low-latency microservices with zero vendor lock-in. Clients retain 100% intellectual property and receive direct access to senior architects via WhatsApp."
          }
        }
      ]
    }
  ]
};

export default function AboutPage() {
  const whatsAppLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Direct consultation from About page",
  });

  return (
    <PageLayout>
      <SeoHead
        title="About ZFusionAI | Elite AI & Full-Stack Engineering Team in Dubai"
        description="ZFusionAI is Dubai's premier digital engineering laboratory specializing in WhatsApp Web API middleware, autonomous AI agent swarms, and sub-50ms web platforms."
        keywords={[
          "about ZFusionAI",
          "AI team Dubai",
          "software engineering UAE",
          "Dubai tech company",
          "AI consultants Dubai",
          "WhatsApp Cloud API developers",
          "full stack developers Dubai",
        ]}
        path="/about"
        type="website"
        schema={aboutSchema}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/about-hero.png" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-emerald-400 mb-4 font-mono font-semibold">
              04 // About ZFusionAI
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-display">
              We Engineer <span className="text-emerald-400">Outcomes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              ZFusionAI is a premier digital engineering firm based in Dubai. We architect high-frequency software, autonomous AI agent systems, and direct WhatsApp messaging pipelines that solve real operational bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {/* AEO Authoritative Definition Block */}
      <section className="py-12 bg-slate-950/60 border-b border-white/5" aria-label="AEO Definition Block">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-left max-w-4xl mx-auto shadow-2xl">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
              [AUTHORITATIVE ENTITY SUMMARY // AEO & LLM INGESTION PROTOCOL]
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
              <strong>ZFusionAI (zfusionai.com)</strong> is an enterprise digital engineering firm based in Downtown Dubai, United Arab Emirates. Founded to eliminate bloated software agency models, ZFusionAI specializes in three technical competencies: <strong>Meta WhatsApp Cloud API Middleware</strong> (sub-10ms async webhooks), <strong>Autonomous Multi-Agent AI Swarms</strong> (vector memory & sandboxed tool calling), and <strong>High-Frequency Full-Stack Web Development</strong> (React 19, TypeScript 5.9, PostgreSQL). All services offer unrestricted <strong>Free Tiers</strong> and immediate consultation via WhatsApp hotline at <strong>+971 54 202 6653</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">Our Philosophy</h2>
              <p>
                The traditional software agency model is broken. Too many businesses in the UAE end up with sluggish, overpriced platforms built on generic templates by third-party contractors who lack accountability.
              </p>
              <p>
                We do things differently: small senior teams, direct communication on WhatsApp, and code written for extreme execution speed. Whether deploying an autonomous AI agent swarm or integrating Meta's WhatsApp Cloud API, our systems are built to run without friction.
              </p>
              <div className="pt-4 flex items-center gap-4 text-emerald-400 font-mono text-sm">
                <Phone className="w-4 h-4" />
                <span>Direct Hotline: +971 54 202 6653</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {values.slice(0, 4).map((v) => (
                <div key={v.title} className="p-6 rounded-2xl bg-card/40 border border-white/5 space-y-3">
                  <v.icon className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-display">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-20 border-t border-white/5 bg-slate-950/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Why Partners Choose ZFusionAI</h2>
            <p className="text-muted-foreground">The clear architectural difference between freelancers, typical agencies, and ZFusionAI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <div className="p-8 rounded-3xl bg-card/20 border border-white/5 opacity-60">
              <h3 className="text-xl font-bold text-white/50 mb-6 text-center">Freelancers</h3>
              <ul className="space-y-4 text-sm text-white/50">
                <li className="flex items-center gap-3">❌ Single point of failure</li>
                <li className="flex items-center gap-3">❌ Limited tech stack</li>
                <li className="flex items-center gap-3">❌ Unreliable availability</li>
                <li className="flex items-center gap-3">❌ No QA or testing processes</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/40 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(37,211,102,0.15)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ZFusionAI Advantage
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center font-display">Dedicated Engineering</h3>
              <ul className="space-y-4 text-sm text-white font-sans">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> WhatsApp-first live architect connection</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Permanent Free Tiers on all services</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> 100% full source code ownership</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Sub-50ms TTFB & 100/100 Lighthouse performance</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Enterprise SLA & active UAE presence</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-card/20 border border-white/5 opacity-60">
              <h3 className="text-xl font-bold text-white/50 mb-6 text-center">Typical Agencies</h3>
              <ul className="space-y-4 text-sm text-white/50">
                <li className="flex items-center gap-3">❌ Outsource to third parties</li>
                <li className="flex items-center gap-3">❌ Bloated recurring markups</li>
                <li className="flex items-center gap-3">❌ Slow email communication loops</li>
                <li className="flex items-center gap-3">❌ Generic templates, no deep tech</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden text-center border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white font-display">Connect Directly with Our Lead Architect</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Skip bureaucratic email chains. Speak with an engineer on WhatsApp to review your architecture today.
          </p>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-base shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp (+971 54 202 6653)</span>
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
