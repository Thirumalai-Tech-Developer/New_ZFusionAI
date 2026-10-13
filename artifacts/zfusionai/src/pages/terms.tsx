import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import SeoHead from "@/components/SeoHead";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Scale,
  FileCode,
  CreditCard,
  Clock,
  RefreshCw,
  Lock,
  Server,
  Wrench,
  AlertOctagon,
  XCircle,
  Building2,
  FileEdit,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Search,
  ListFilter,
  ArrowUpRight,
} from "lucide-react";
import { generateWhatsAppLink, WHATSAPP_CONFIG } from "@/lib/whatsappEngine";

interface LegalSection {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  icon: typeof ShieldCheck;
  highlight: string;
  content: string[];
}

const termsSections: LegalSection[] = [
  {
    id: "agreement",
    num: "01",
    title: "Agreement to Terms & Digital Execution",
    shortTitle: "Agreement",
    icon: Scale,
    highlight: "Binding upon site access or signed Statement of Work (SOW).",
    content: [
      `By accessing, browsing, or utilizing the web properties at zfusionai.com, our WhatsApp Cloud API middleware sandboxes, AI agent orchestrators, or any customized digital solution engineered by ZFusionAI ("we", "us", "our"), you ("Client", "User", "Licensee") agree to be irrevocably bound by these Terms and Conditions.`,
      `If you are entering into these terms on behalf of an enterprise, company, or governmental entity in the United Arab Emirates or internationally, you affirm and warrant that you possess full corporate legal authority to bind that entity to these provisions. If you do not agree to every clause within this framework, you must immediately terminate use of our platforms and services.`,
    ],
  },
  {
    id: "services",
    num: "02",
    title: "Engineering Services & Technical Deliverables",
    shortTitle: "Services Scope",
    icon: FileCode,
    highlight: "Bespoke engineering across Meta WhatsApp Cloud API, AI Agents & Web Platforms.",
    content: [
      `ZFusionAI provides custom-engineered digital software solutions, specializing in:`,
      `• Meta WhatsApp Business Cloud API middleware architectures (sub-10ms event processing, multi-agent dispatch).`,
      `• Autonomous multi-agent AI systems, vector-embedded RAG knowledge bases, and algorithmic task automation.`,
      `• Sub-50ms full-stack web platforms, progressive web applications (PWAs), and low-latency API microservices.`,
      `• Custom mobile application development, enterprise CRM/ERP automations, and cloud DevOps infrastructure.`,
      `Each commercial engagement is formally governed by a bespoke Statement of Work (SOW) or written digital proposal specifying exact architecture, technical milestones, deliverable specifications, deployment targets, and mutually agreed timelines.`,
    ],
  },
  {
    id: "pricing",
    num: "03",
    title: "Commercial Pricing, Free Tiers & Payment Schedules",
    shortTitle: "Pricing & Tiers",
    icon: CreditCard,
    highlight: "Transparent starter packages from AED 599, perpetual Free Tiers, zero marked-up third-party costs.",
    content: [
      `ZFusionAI maintains radical pricing transparency across all offerings:`,
      `• Commercial web engineering packages start at AED 599 for fundamental digital platforms, scaling procedurally based on database complexity, authentication layers, concurrency thresholds, and third-party API integrations.`,
      `• Permanent Free Tiers are provided for developer evaluation (including WhatsApp webhook sandboxes, single-agent testbeds, and starter landing scaffolding) with zero credit card obligations.`,
      `• Third-party infrastructure expenses (including domain registration, AWS/Vercel/Supabase cloud compute, and Meta's conversation pricing tariffs) are billed directly to the Client or passed through strictly at cost with zero markup.`,
      `• Standard project engagements follow a 50% upfront engineering commitment deposit and 50% milestone disbursement upon staging approval, unless otherwise stipulated in an Enterprise Master Services Agreement (MSA). All fees are quoted in United Arab Emirates Dirhams (AED) and are exclusive of applicable UAE Value Added Tax (VAT 5%) where enforced.`,
    ],
  },
  {
    id: "timelines",
    num: "04",
    title: "Sprint Milestones & Agile Delivery Timelines",
    shortTitle: "Sprint Timelines",
    icon: Clock,
    highlight: "Milestones executed in good faith; dependent on timely feedback & client credentials.",
    content: [
      `Delivery timelines articulated in project proposals and procedural calculators represent good-faith engineering estimates executed under modern agile methodologies.`,
      `Adherence to targeted delivery windows is contingent upon the prompt provision of essential assets, third-party API credentials (e.g., Meta Developer App IDs, payment gateway secrets), and timely feedback rounds. Delays resulting from external dependency withholdings or unapproved scope shifts will automatically extend deployment deadlines proportionately without penalty to ZFusionAI.`,
    ],
  },
  {
    id: "revisions",
    num: "05",
    title: "Technical Revisions & Scope Modification Protocol",
    shortTitle: "Revisions",
    icon: RefreshCw,
    highlight: "Contracted revision passes included; out-of-scope features quoted transparently.",
    content: [
      `Every fixed-scope package includes predefined revision iterations as designated in the applicable SOW. These iterations are dedicated to refining visual presentation, responsive layout tuning, and logic alignment against agreed specifications.`,
      `Any modification requesting features outside the initial technical scope—including new database schemas, supplementary third-party integrations, or architectural structural refactoring—will be itemized in an agile Change Request (CR) and quoted at our standard architectural hourly rate or fixed milestone addendum prior to execution.`,
    ],
  },
  {
    id: "intellectual-property",
    num: "06",
    title: "100% Intellectual Property & Source Code Ownership",
    shortTitle: "IP & Code Transfer",
    icon: Lock,
    highlight: "Complete source code transferred to client upon final milestone payment. Zero vendor lock-in.",
    content: [
      `Upon receipt of full and final payment for the delivered project, all right, title, and intellectual property interest in the bespoke custom source code, design assets, and database schemas developed specifically for the Client shall transfer entirely to the Client.`,
      `ZFusionAI believes in zero vendor lock-in: our codebases use standard modern stacks (React 19, TypeScript, Node.js, Python, PostgreSQL) designed for unrestricted portability. Pre-existing open-source libraries, frameworks (e.g., TailwindCSS, Vite), and third-party dependencies remain subject to their respective open-source licenses (MIT, Apache 2.0).`,
      `Unless a Bilateral Non-Disclosure Agreement (NDA) explicitly prohibits public disclosure, ZFusionAI reserves the right to showcase delivered systems in its engineering portfolio, technical case studies, and marketing collateral as demonstrations of technical capability.`,
    ],
  },
  {
    id: "confidentiality",
    num: "07",
    title: "Bilateral Confidentiality & Non-Disclosure (NDA)",
    shortTitle: "Confidentiality & NDA",
    icon: ShieldCheck,
    highlight: "Strict mutual non-disclosure defaults. Custom bilateral NDAs executed prior to discovery.",
    content: [
      `Both ZFusionAI and the Client mutually agree to hold in the strictest confidence all non-public proprietary materials, business logic, customer databases, algorithmic designs, and commercial terms exchanged throughout the pre-sales discovery and project lifecycle.`,
      `We routinely execute bilateral NDAs with enterprise partners prior to reviewing proprietary AI prompt graphs, custom training corpora, or trade-secret database architectures. Our engineers and contractors are bound by stringent confidentiality covenants.`,
    ],
  },
  {
    id: "third-party",
    num: "08",
    title: "Third-Party Cloud Gateways & Meta API Dependencies",
    shortTitle: "Third-Party APIs",
    icon: Server,
    highlight: "Clients retain direct accounts; ZFusionAI is not liable for external upstream outages.",
    content: [
      `Clients maintain direct contractual relationships with third-party service providers required for runtime operation, including Meta Platforms, Inc. (WhatsApp Business Cloud API), cloud infrastructure hosts (AWS, Google Cloud, Vercel, Supabase), payment processors (Stripe, Ziina, Network International), and AI model providers (OpenAI, Anthropic, Google DeepMind).`,
      `While ZFusionAI engineers robust error handling, circuit breakers, and sub-10ms failover mechanisms, we bear no liability for upstream outages, policy adjustments, rate-limiting constraints, or account revocations enforced independently by third-party platform operators.`,
    ],
  },
  {
    id: "warranty",
    num: "09",
    title: "30-Day Defect Warranty & Extended SLA Support",
    shortTitle: "Warranty & Support",
    icon: Wrench,
    highlight: "30-day comprehensive zero-cost bugfix coverage post-deployment.",
    content: [
      `ZFusionAI guarantees that all deliverables will conform substantially to the documented technical specifications for a period of thirty (30) calendar days commencing on the date of formal production deployment or staging sign-off ("Warranty Period").`,
      `During this Warranty Period, we will remediate any reproducible bugs, logic faults, or code defects attributable to our engineering at zero additional expense. Maintenance, feature expansions, and technical support beyond the 30-day window are provided via ongoing Engineering Retainer SLAs or ad-hoc support agreements.`,
    ],
  },
  {
    id: "liability",
    num: "10",
    title: "Limitation of Liability & Consequential Damages",
    shortTitle: "Liability Limits",
    icon: AlertOctagon,
    highlight: "Total aggregate liability capped strictly at the fees paid for the relevant engagement.",
    content: [
      `To the maximum extent permissible under the statutory laws of the United Arab Emirates and the Emirate of Dubai, ZFusionAI's aggregate legal liability arising out of or relating to any contract, warranty, tort, or breach shall under no circumstances exceed the total financial consideration actually paid by the Client to ZFusionAI for the specific project or Statement of Work in dispute.`,
      `In no event shall ZFusionAI be held liable for any indirect, special, incidental, consequential, punitive, or loss-of-profit damages, including without limitation data corruption, operational disruption, or loss of goodwill, even if advised of the likelihood of such occurrences.`,
    ],
  },
  {
    id: "termination",
    num: "11",
    title: "Project Termination & Pro-Rata Settlement",
    shortTitle: "Termination",
    icon: XCircle,
    highlight: "Written notice termination with pro-rata disbursement for completed milestones.",
    content: [
      `Either party may terminate an ongoing commercial engagement upon furnishing fourteen (14) days prior written notice via registered email or verified corporate communication.`,
      `In the event of termination, the Client remains legally liable for payment covering all work, engineering hours, and completed milestones rendered up to the effective termination date. Any unconsumed advance funds allocated to uncommenced sprint milestones shall be refunded to the Client on a pro-rata basis within thirty (30) business days.`,
    ],
  },
  {
    id: "governing-law",
    num: "12",
    title: "Governing Law & Dubai Judicial Jurisdiction",
    shortTitle: "Jurisdiction",
    icon: Building2,
    highlight: "Governed exclusively by the laws of the United Arab Emirates and the Courts of Dubai.",
    content: [
      `These Terms and Conditions, all Statements of Work, and any contractual disputes arising therefrom shall be construed, interpreted, and governed in accordance with the substantive laws of the Emirate of Dubai and the Federal Laws of the United Arab Emirates.`,
      `Both parties irrevocably consent and submit to the exclusive territorial jurisdiction of the competent civil and commercial Courts of Dubai, United Arab Emirates, for the adjudication of any claim, controversy, or dispute.`,
    ],
  },
  {
    id: "amendments",
    num: "13",
    title: "Amendments & Terms Versioning",
    shortTitle: "Amendments",
    icon: FileEdit,
    highlight: "Periodic updates posted with revised timestamp. Continued use constitutes acceptance.",
    content: [
      `ZFusionAI reserves the right to periodically review, amend, and update these Terms and Conditions to reflect evolving statutory standards, technical capabilities, or architectural paradigms.`,
      `The definitive version shall always be posted at zfusionai.com/terms with a clear timestamp. Your continued engagement with our platforms, WhatsApp endpoints, or development teams following such publications signifies your unconditional acceptance of the revised Terms.`,
    ],
  },
  {
    id: "contact",
    num: "14",
    title: "Direct Legal Inquiries & Architectural Escalation",
    shortTitle: "Legal Contact",
    icon: PhoneCall,
    highlight: "Direct WhatsApp hotline +971 54 202 6653 and support@zfusionai.com.",
    content: [
      `For inquiries regarding customized Enterprise Master Services Agreements (MSAs), bilateral Non-Disclosure Agreements (NDAs), or clarification regarding any provision within this document, contact our legal and contract engineering team directly:`,
      `• Primary Hotline (WhatsApp & Voice): +971 54 202 6653`,
      `• Contract Escalation Email: support@zfusionai.com`,
      `• Registered Physical Jurisdiction: Downtown Dubai, Emirate of Dubai, United Arab Emirates`,
    ],
  },
];

const termsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://zfusionai.com/terms/#webpage",
      "url": "https://zfusionai.com/terms",
      "name": "Terms & Conditions | ZFusionAI Enterprise Engineering Dubai",
      "description": "Legally binding terms and commercial conditions governing custom software engineering, WhatsApp Web API middleware, and AI agent solutions by ZFusionAI Dubai.",
      "inLanguage": "en-AE",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ZFusionAI",
        "url": "https://zfusionai.com"
      }
    },
    {
      "@type": "DigitalDocument",
      "@id": "https://zfusionai.com/terms/#document",
      "name": "ZFusionAI Enterprise Terms of Service (Version 2026.4)",
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

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("agreement");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isUserClickingRef = useRef<boolean>(false);

  const whatsAppLegalLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Enterprise Terms & Conditions / NDA inquiry via zfusionai.com/terms",
  });

  const filteredSections = termsSections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.num.includes(searchQuery) ||
      s.highlight.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToClause = (id: string) => {
    isUserClickingRef.current = true;
    setActiveSection(id);
    setMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setTimeout(() => {
      isUserClickingRef.current = false;
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.min(100, Math.max(0, Math.round((winScroll / height) * 100))) : 0;
      setScrollProgress(scrolled);

      if (isUserClickingRef.current) return;

      const triggerY = window.scrollY + 200;
      for (const section of termsSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (triggerY >= top && triggerY < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeSectionData = termsSections.find((s) => s.id === activeSection) || termsSections[0];

  return (
    <PageLayout>
      <SeoHead
        title="Terms & Conditions | ZFusionAI Dubai Enterprise Software"
        description="Comprehensive commercial terms and intellectual property governance for ZFusionAI enterprise software engineering, WhatsApp API middleware, and AI systems."
        keywords={[
          "ZFusionAI terms and conditions",
          "Dubai software engineering contract",
          "intellectual property terms UAE",
          "WhatsApp Cloud API terms of service",
          "AI development SLA Dubai",
          "software agreement UAE courts",
        ]}
        path="/terms"
        type="website"
        schema={termsSchema}
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
              <span>LEGAL PROTOCOL // UAE JURISDICTION DUBAI</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-display mb-6">
              Terms & <span className="text-emerald-400">Conditions</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-sans max-w-3xl mb-8">
              Governing commercial software engineering, autonomous AI agent systems, Meta WhatsApp Cloud API integrations, and intellectual property transfer by ZFusionAI.
            </p>

            {/* Metadata Ribbon */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-slate-300">
                VERSION // 2026.4
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-emerald-400">
                JURISDICTION // DUBAI COURTS, UAE
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-slate-300">
                IP POLICY // 100% CLIENT CODE TRANSFER
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-cyan-400">
                PHONE // +971 54 202 6653
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO Authoritative Entity Box */}
      <section className="py-8 bg-[#050a07] border-b border-white/5" aria-label="AEO Definition Block">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-5 md:p-6 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-left max-w-5xl mx-auto shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>[AUTHORITATIVE LEGAL SUMMARY // AI INGESTION & REGULATORY HARMONIZATION]</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              <strong>ZFusionAI (zfusionai.com)</strong> operates under the commercial laws of the United Arab Emirates and the exclusive jurisdiction of the Courts of Dubai. Key pillars of these Terms include: <strong>(1) 100% Client Source Code Ownership</strong> transferred upon final payment with zero vendor lock-in; <strong>(2) Transparent fixed-scope contracts</strong> starting from AED 599 with unrestricted developer free tiers; <strong>(3) Bilateral Non-Disclosure default</strong>; <strong>(4) 30-Day zero-cost defect warranty</strong>; and <strong>(5) Direct WhatsApp engineering escalation</strong> via <strong>+971 54 202 6653</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Core Guarantees 4-Grid */}
      <section className="py-12 bg-[#030605] border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">100% Code Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Full intellectual property transfers to you upon final payment. No recurring code licensing traps.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">Zero Hidden Markups</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Fixed-scope SOWs from AED 599. Hosting, domains, and Meta API bills are pass-through at cost.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">30-Day Defect Warranty</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Guaranteed bug remediation for thirty days post-deployment at zero additional charge.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-display mb-1">Dubai Judicial Venue</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Enforceable under UAE Commercial Law with exclusive settlement through Dubai Courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split-Screen Architecture: Hard-Coded Sticky List on Left + Scrolling Brief on Right */}
      <section className="py-16 md:py-24 bg-[#030605] relative">
        <div className="container mx-auto px-6 md:px-12">

          {/* Mobile Sticky Quick-Jump Pill Bar (Hard-Coded Stay on Mobile Viewports) */}
          <div className="lg:hidden sticky top-20 z-30 mb-8 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs font-mono text-emerald-400 font-semibold truncate">
                  {activeSectionData.num} // {activeSectionData.shortTitle}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5 shrink-0"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Jump ({termsSections.length})</span>
              </button>
            </div>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-white/10 space-y-1 max-h-64 overflow-y-auto"
                >
                  {termsSections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToClause(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between ${
                        activeSection === s.id
                          ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span>
                        <span className="text-emerald-400 mr-2">{s.num} //</span>
                        {s.shortTitle}
                      </span>
                      {activeSection === s.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto items-start relative">
            
            {/* Left Column: HARD-CODED STICKY LIST OF CLAUSES (Premium Locked Rail) */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-24 self-start z-20">
              <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[calc(100vh-7.5rem)] overflow-hidden">
                
                {/* Header with Live Progress */}
                <div className="p-4 border-b border-white/10 bg-slate-950/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-400" />
                      TERMS INDEX
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {scrollProgress}% READ
                    </span>
                  </div>

                  {/* Reading Progress Line */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-150"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>

                  {/* Interactive Search Filter Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter 14 clauses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                {/* Hard-Coded Staying Navigation List (Pins on screen while brief scrolls) */}
                <nav className="p-3 space-y-1 overflow-y-auto flex-grow hide-scrollbar">
                  {filteredSections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollToClause(s.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between group relative ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-300 border border-emerald-500/40 shadow-md font-semibold"
                            : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                              isActive ? "bg-emerald-400 scale-125 shadow-[0_0_8px_#10b981]" : "bg-slate-600 group-hover:bg-slate-400"
                            }`}
                          />
                          <span className={isActive ? "text-emerald-400 font-bold" : "text-slate-500"}>
                            {s.num} //
                          </span>
                          <span className="truncate">{s.shortTitle}</span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                            isActive
                              ? "text-emerald-400 translate-x-0.5"
                              : "text-slate-600 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    );
                  })}

                  {filteredSections.length === 0 && (
                    <div className="py-6 text-center text-xs font-mono text-slate-500">
                      No matching clauses found.
                    </div>
                  )}
                </nav>

                {/* Direct WhatsApp Legal Quick Action Bar in Sticky Rail */}
                <div className="p-3.5 border-t border-white/10 bg-slate-950/80">
                  <a
                    href={whatsAppLegalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold font-mono hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Legal Desk</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
                  </a>
                  <div className="text-[10px] font-mono text-center text-slate-400 mt-2">
                    HOTLINE: +971 54 202 6653
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: THE TERMS BRIEF (Smoothly Scrolls Beside the Locked List) */}
            <div className="lg:col-span-8 space-y-8">
              {termsSections.map((s) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <motion.article
                    key={s.id}
                    id={s.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35 }}
                    className={`p-6 md:p-8 rounded-2xl bg-slate-900/60 border transition-all backdrop-blur-xl shadow-2xl relative overflow-hidden group ${
                      isActive
                        ? "border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-emerald-950/20"
                        : "border-white/10 hover:border-emerald-500/30"
                    }`}
                  >
                    {/* Top Monospaced Tag Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-emerald-400/80"}`} />
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

                    {/* Detailed Content / Terms Brief */}
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

              {/* Bottom WhatsApp Legal Command Banner */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-2xl text-center md:text-left md:flex items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>DIRECT LEGAL ADVISORY // DUBAI, UAE</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-2">
                    Need Clarification on Any Provision?
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl">
                    Our engineering leads and legal counsel provide direct, plain-English answers regarding procurement, SLAs, and data agreements.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href={whatsAppLegalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold font-mono text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Legal Desk</span>
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
