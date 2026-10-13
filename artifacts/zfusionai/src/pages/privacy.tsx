import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import SeoHead from "@/components/SeoHead";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Database,
  EyeOff,
  Server,
  Cpu,
  KeyRound,
  Trash2,
  Globe2,
  FileText,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { generateWhatsAppLink, WHATSAPP_CONFIG } from "@/lib/whatsappEngine";

interface PrivacySection {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  icon: typeof ShieldCheck;
  highlight: string;
  content: string[];
}

const privacySections: PrivacySection[] = [
  {
    id: "introduction",
    num: "01",
    title: "Introduction & Scope of Governance",
    shortTitle: "Intro & Scope",
    icon: ShieldCheck,
    highlight: "Governs zfusionai.com, Meta WhatsApp Cloud middleware, AI swarms & web platforms.",
    content: [
      `ZFusionAI ("we", "us", "our") engineers enterprise-grade software with data privacy and operational sovereignty as foundational primitives. This Privacy Policy delineates how we ingest, process, protect, and isolate technical and personal information across our web properties (zfusionai.com), custom client software systems, Meta WhatsApp Cloud API middleware pipelines, and autonomous AI agent environments.`,
      `We operate in strict compliance with the United Arab Emirates Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL), Dubai International Financial Centre (DIFC) Data Protection Regulations, and harmonized international principles including the EU General Data Protection Regulation (GDPR).`,
    ],
  },
  {
    id: "data-collected",
    num: "02",
    title: "Categories of Information Processed",
    shortTitle: "Data Collected",
    icon: Database,
    highlight: "Strict data minimization: only explicit technical credentials & project parameters.",
    content: [
      `ZFusionAI adheres to rigorous data minimization protocols. We only process information essential to technical scoping, service execution, and billing:`,
      `• Direct Consultation Data: Name, corporate email address, enterprise telephone number, and architectural requirements submitted voluntarily via our contact interface, email, or direct WhatsApp hotline (+971 54 202 6653).`,
      `• Technical Runtime Telemetry: Ephemeral HTTP headers, IP addresses, client user-agents, latency metrics, and API status codes collected solely to maintain server uptime, mitigate DDoS attacks, and optimize sub-50ms web delivery.`,
      `• Client API Secrets: Third-party integration tokens (e.g., Meta Cloud API permanent tokens, OpenAI keys, Supabase credentials) provided to configure client tenant environments are encrypted at rest using AES-256 and never retained in plaintext.`,
    ],
  },
  {
    id: "purpose",
    num: "03",
    title: "Lawful Basis & Data Utilization",
    shortTitle: "Usage Purpose",
    icon: CheckCircle2,
    highlight: "Zero commercial data resale. Information used strictly to build & operate client systems.",
    content: [
      `We process information under explicit lawful grounds, principally contractual necessity (performing engineering deliverables agreed in Statements of Work) and legitimate technical interest (system security and platform stability).`,
      `Your data is utilized strictly to:`,
      `• Architect, deploy, and support bespoke software platforms, WhatsApp webhook dispatchers, and AI models.`,
      `• Transmit commercial quotes, Statements of Work, sprint milestones, and invoices.`,
      `• Provide direct senior engineering support via WhatsApp and encrypted channels.`,
      `• Absolute Guarantee: ZFusionAI does not sell, monetize, broker, or rent your personal data, project specifications, or corporate telemetry to any advertising networks, third-party data brokers, or external entities.`,
    ],
  },
  {
    id: "cookies",
    num: "04",
    title: "Cookies & Zero-Tracker Architecture",
    shortTitle: "Cookies & Tracking",
    icon: EyeOff,
    highlight: "Zero invasive cross-site tracking cookies. Only functional session storage.",
    content: [
      `Our web platform at zfusionai.com is architected for clean performance without bloated third-party trackers. We do not embed invasive marketing pixels or cross-site tracking networks (e.g., Meta Pixel, TikTok Pixel, or behavioral ad beacons).`,
      `We utilize only strictly necessary cookies or local session storage tokens essential for theme preferences, procedural pricing state persistence, and anonymized aggregate telemetry to ensure platform security. Visitors can configure browser controls to decline storage tokens at any time without compromising core site availability.`,
    ],
  },
  {
    id: "third-parties",
    num: "05",
    title: "Third-Party Sub-Processors & Meta Cloud API",
    shortTitle: "Sub-Processors",
    icon: Server,
    highlight: "Trusted enterprise infrastructure with SOC2 / ISO-27001 certifications.",
    content: [
      `To deliver high-frequency digital systems, ZFusionAI coordinates with tier-1 enterprise infrastructure providers bound by strict data processing agreements (DPAs):`,
      `• Meta Platforms, Inc. (WhatsApp Cloud API): End-to-end transport webhooks routed through Meta's sovereign cloud infrastructure in compliance with Meta's Business Messaging Terms.`,
      `• Cloud Compute & Database Hosts: AWS, Google Cloud Platform, Supabase, and Vercel for isolated database hosting and edge computing.`,
      `• Transaction Processing: Stripe and regional UAE-regulated payment gateways for PCI-DSS Level 1 compliant financial handling.`,
      `All third-party sub-processors maintain SOC 2 Type II, ISO/IEC 27001, or equivalent global cybersecurity certifications and are legally prohibited from utilizing client data for unauthorized secondary purposes.`,
    ],
  },
  {
    id: "ai-isolation",
    num: "06",
    title: "AI Models & Vector Memory Isolation",
    shortTitle: "AI & Vector Sandbox",
    icon: Cpu,
    highlight: "Tenant-isolated vector stores. Proprietary client data is NEVER used for public LLM training.",
    content: [
      `A critical architectural standard at ZFusionAI is absolute cognitive data sovereignty:`,
      `• Zero Public Model Training: Proprietary documents, operational workflows, and private enterprise data processed through our AI agent systems or WhatsApp RAG bots are never used to train, fine-tune, or calibrate public foundational models (such as OpenAI, Anthropic, or Google DeepMind models).`,
      `• Tenant Isolation: Vector databases (pgvector, Pinecone, Qdrant) and retrieval-augmented memory layers engineered for Clients are provisioned in isolated, tenant-segregated namespaces with granular row-level security (RLS).`,
    ],
  },
  {
    id: "security",
    num: "07",
    title: "Cryptographic Security & System Integrity",
    shortTitle: "Security Standards",
    icon: KeyRound,
    highlight: "TLS 1.3 in transit, AES-256 at rest, strict least-privilege IAM controls.",
    content: [
      `We deploy multi-layered cryptographic safeguards to prevent unauthorized access, interception, or modification of technical assets:`,
      `• Modern TLS 1.3 transport encryption with enforced HTTPS redirects and HSTS headers.`,
      `• AES-256 encryption at rest for database volumes, backups, and secure credential storage.`,
      `• Automated secret rotation, strict Least Privilege Principle access controls (RBAC), and multi-factor authentication (MFA) mandatory across all developer access portals.`,
      `• Regular automated dependency vulnerability scanning and CI/CD secret leakage detection.`,
    ],
  },
  {
    id: "retention",
    num: "08",
    title: "Data Retention & Automated Purge Lifecycles",
    shortTitle: "Retention Lifecycles",
    icon: Trash2,
    highlight: "Unconverted project inquiries purged after 12 months; immediate deletion on demand.",
    content: [
      `We retain personal data and project telemetry only for the minimal duration required to fulfill contractual commitments, satisfy statutory taxation guidelines in Dubai, or enforce legal warranties.`,
      `• Commercial Inquiries: Prospective project scopes and contact records that do not transition into active contracts are automatically purged from our staging systems within twelve (12) months.`,
      `• Active Engagements: Production deployment records and code repositories are preserved throughout the contracted warranty and support lifecycle, after which repository archives are securely transferred to the client and purged from active staging environments upon request.`,
    ],
  },
  {
    id: "rights",
    num: "09",
    title: "UAE PDPL & International Data Subject Rights",
    shortTitle: "Your Legal Rights",
    icon: UserCheck,
    highlight: "Universal rights to access, rectification, portability, and complete data erasure.",
    content: [
      `Regardless of your geographic location, ZFusionAI accords you comprehensive legal rights in alignment with the UAE PDPL and GDPR:`,
      `• Right of Access: You may request formal confirmation of whether we hold personal data relating to you and receive an itemized copy.`,
      `• Right to Rectification: You may require us to correct outdated or inaccurate information immediately.`,
      `• Right to Erasure ("Right to Be Forgotten"): You may request complete, permanent deletion of your personal records from our systems, subject only to mandatory statutory recordkeeping obligations under UAE law.`,
      `• Right to Data Portability: You may request the export of your project records in a structured, machine-readable JSON format.`,
      `To exercise any of these rights, simply transmit your request to support@zfusionai.com or directly to our Data Protection Officer on WhatsApp at +971 54 202 6653. Requests are fulfilled within 14 calendar days at zero fee.`,
    ],
  },
  {
    id: "minors",
    num: "10",
    title: "B2B Enterprise Scope & Minors' Protection",
    shortTitle: "Minors' Protection",
    icon: Lock,
    highlight: "Strict B2B enterprise scope. We do not knowingly collect information from minors under 18.",
    content: [
      `Our digital engineering offerings, software portals, and WhatsApp API sandboxes are designed exclusively for commercial enterprises, founders, and professionals aged 18 and older.`,
      `We do not knowingly solicit, collect, or process personal identifiable data from children or minors under the age of 18. If we identify that a minor has submitted credentials through our web properties, we will immediately delete that information from all active registers.`,
    ],
  },
  {
    id: "cross-border",
    num: "11",
    title: "Cross-Border Data Transfer Safeguards",
    shortTitle: "Cross-Border Transfers",
    icon: Globe2,
    highlight: "Standard Contractual Clauses (SCCs) and adequate UAE statutory protections.",
    content: [
      `While ZFusionAI is based in Dubai, United Arab Emirates, technical workflows may necessitate data transit through globally distributed cloud infrastructures (e.g., AWS global edge nodes or Meta Cloud API endpoints).`,
      `Whenever cross-border transfers occur, we mandate that recipient cloud providers enforce Standard Contractual Clauses (SCCs), maintain ISO-certified encryption standards, and comply with UAE Data Office adequacy benchmarks to guarantee that your information enjoys identical protection internationally.`,
    ],
  },
  {
    id: "updates",
    num: "12",
    title: "Policy Amendments & Revision Audit Trail",
    shortTitle: "Policy Updates",
    icon: FileText,
    highlight: "Continuous compliance updates posted transparently at zfusionai.com/privacy.",
    content: [
      `We review and update this Data Sovereignty and Privacy Policy regularly to maintain total alignment with new UAE ministerial decrees, evolving AI regulatory frameworks, and technological breakthroughs.`,
      `Every revision will be designated with a version number and timestamp at zfusionai.com/privacy. Material modifications that affect your data rights will be highlighted with prominent banners across our digital entry points.`,
    ],
  },
  {
    id: "contact",
    num: "13",
    title: "Data Protection Officer (DPO) & Direct Escalation",
    shortTitle: "DPO Contact",
    icon: PhoneCall,
    highlight: "Direct hotline +971 54 202 6653 and DPO email support@zfusionai.com.",
    content: [
      `If you have questions, compliance audits, or requests regarding this Privacy Policy or our algorithmic data handling practices, please contact our Data Protection Officer directly:`,
      `• Direct WhatsApp Compliance Hotline: +971 54 202 6653`,
      `• Official DPO Email: support@zfusionai.com`,
      `• Corporate Jurisdiction: ZFusionAI, Downtown Dubai, Emirate of Dubai, United Arab Emirates`,
    ],
  },
];

const privacySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://zfusionai.com/privacy/#webpage",
      "url": "https://zfusionai.com/privacy",
      "name": "Privacy Policy & Data Sovereignty | ZFusionAI Dubai",
      "description": "Comprehensive data protection, UAE PDPL compliance, and zero-harvesting privacy framework for ZFusionAI enterprise software and WhatsApp Cloud API middleware.",
      "inLanguage": "en-AE",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ZFusionAI",
        "url": "https://zfusionai.com"
      }
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://zfusionai.com/privacy/#document",
      "name": "ZFusionAI Data Sovereignty and Privacy Policy (Version 2026.4)",
      "version": "2026.4",
      "dateModified": "2026-04-12",
      "publisher": {
        "@type": "Organization",
        "name": "ZFusionAI",
        "url": "https://zfusionai.com",
        "telephone": "+971 54 202 6653",
        "email": "support@zfusionai.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        }
      }
    }
  ]
};

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const whatsAppDpoLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Data Privacy & Security Inquiry to DPO via zfusionai.com/privacy",
  });

  const scrollToClause = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const section of privacySections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PageLayout>
      <SeoHead
        title="Privacy Policy | ZFusionAI Dubai Data Sovereignty & UAE PDPL"
        description="Comprehensive privacy framework for ZFusionAI. Strict zero-harvesting policy, Meta WhatsApp Cloud API security, isolated vector databases, and UAE PDPL compliance."
        keywords={[
          "ZFusionAI privacy policy",
          "UAE PDPL data compliance",
          "Dubai data protection law",
          "WhatsApp Cloud API data security",
          "AI vector database privacy",
          "enterprise data sovereignty UAE",
        ]}
        path="/privacy"
        type="website"
        schema={privacySchema}
      />

      {/* Cybernetic Hero Header */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 border-b border-white/10 overflow-hidden bg-[#030605]">
        {/* Subtle Cyber Grid & Emerald Gradient Glow */}
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Protocol Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DATA SOVEREIGNTY // UAE PDPL & GLOBAL COMPLIANCE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-display mb-6">
              Privacy <span className="text-emerald-400">Policy</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-sans max-w-3xl mb-8">
              Transparency, cryptographic security, and data sovereignty governing our Meta WhatsApp Cloud API middleware, AI agent orchestrators, and enterprise software.
            </p>

            {/* Metadata Ribbon */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-slate-300">
                FRAMEWORK // UAE FEDERAL DECREE NO. 45
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-emerald-400">
                DATA POLICY // STRICT ZERO-SALE
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-cyan-400">
                AI MEMORY // TENANT ISOLATED
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-slate-300">
                DPO HOTLINE // +971 54 202 6653
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO Authoritative Entity Summary Box */}
      <section className="py-8 bg-[#050a07] border-b border-white/5" aria-label="AEO Definition Block">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-5 md:p-6 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-left max-w-5xl mx-auto shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>[AUTHORITATIVE PRIVACY SPECIFICATION // REGULATORY & AI CRAWLER INGESTION]</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              <strong>ZFusionAI (zfusionai.com)</strong> enforces strict data privacy governance under UAE Federal Decree-Law No. 45/2021. Core architectural protections include: <strong>(1) Zero Commercial Data Resale</strong> or ad-tracking cookies; <strong>(2) End-to-End Meta WhatsApp Cloud API webhook transport encryption</strong>; <strong>(3) Absolute AI Vector Isolation</strong> guaranteeing proprietary data is never used to train public LLM models; <strong>(4) Cryptographic TLS 1.3 and AES-256 safeguards</strong>; and <strong>(5) Direct Data Protection Officer access</strong> via WhatsApp at <strong>+971 54 202 6653</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Core Privacy Guarantees 4-Grid */}
      <section className="py-12 bg-[#030605] border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">Zero Data Resale</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                We never monetize, sell, or broker your personal information or client records to any third party.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">AI Sandbox Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Your company knowledge base and vector embeddings are never used to train public AI foundation models.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">Encrypted Transport</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Meta Cloud API webhooks and server pipelines run strictly across TLS 1.3 and AES-256 encrypted protocols.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Trash2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">Right to Erasure</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Immediate permanent deletion of your contact records and telemetry upon simple WhatsApp or email request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Cyber Grid */}
      <section className="py-16 md:py-24 bg-[#030605]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
            {/* Left Column: Sticky Table of Contents Navigation */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      PRIVACY SECTIONS
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">13 CLAUSES</span>
                  </div>

                  <nav className="space-y-1 max-h-[58vh] overflow-y-auto pr-1 hide-scrollbar">
                    {privacySections.map((s) => {
                      const isActive = activeSection === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => scrollToClause(s.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between group ${
                            isActive
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className={isActive ? "text-emerald-400" : "text-slate-500"}>
                              {s.num} //
                            </span>
                            <span className="truncate">{s.shortTitle}</span>
                          </span>
                          <ChevronRight
                            className={`w-3 h-3 transition-transform ${
                              isActive ? "text-emerald-400 translate-x-0.5" : "text-slate-600 opacity-0 group-hover:opacity-100"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Direct DPO Desk Card in Sidebar */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-950/80 border border-emerald-500/30 shadow-lg">
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>DPO DIRECT DESK</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mb-2">
                    Security or Compliance Audit?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Direct access to our Data Protection Officer for enterprise security questionnaires, data processing agreements (DPAs), and SOC2 verifications.
                  </p>
                  <a
                    href={whatsAppDpoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold font-mono hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp DPO Desk</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Numbered Clause Terminal Cards */}
            <div className="lg:col-span-8 space-y-8">
              {privacySections.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.article
                    key={s.id}
                    id={s.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4 }}
                    className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-xl shadow-2xl relative overflow-hidden group"
                  >
                    {/* Top Monospaced Tag Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                          CLAUSE {s.num} // [{s.id.toUpperCase().replace(/-/g, "_")}]
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Clause Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight mb-3">
                      {s.title}
                    </h2>

                    {/* Key Takeaway Highlight Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-sans mb-5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Key Provision:</strong> {s.highlight}</span>
                    </div>

                    {/* Detailed Content */}
                    <div className="space-y-3.5 text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                      {s.content.map((para, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.article>
                );
              })}

              {/* Bottom WhatsApp Compliance Command Banner */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-2xl text-center md:text-left md:flex items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>DATA SOVEREIGNTY DESK // DUBAI, UAE</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-2">
                    Submit a Data Request or Privacy Audit
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl">
                    Reach our dedicated Data Protection Officer immediately for GDPR/PDPL deletion requests, vendor security questionnaires, or DPA executions.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href={whatsAppDpoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold font-mono text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp DPO Desk</span>
                  </a>
                  <a
                    href="mailto:support@zfusionai.com"
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-sm border border-white/10 transition-all"
                  >
                    <span>support@zfusionai.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
