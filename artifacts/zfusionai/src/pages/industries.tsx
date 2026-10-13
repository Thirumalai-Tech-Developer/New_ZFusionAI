import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";
import PageLayout from "@/components/PageLayout";
import { ArrowRight, Activity, TrendingUp, MessageSquare, Phone } from "lucide-react";
import { Link } from "wouter";
import { generateWhatsAppLink, WHATSAPP_CONFIG } from "@/lib/whatsappEngine";

const industriesData = [
  {
    name: "Real Estate",
    image: "/images/industry-real-estate.png",
    challenge: "Property markets move fast. Legacy CRMs and disconnected listing tools cause missed leads and poor client experiences.",
    solution: "We build custom property management platforms with AI-driven lead scoring, virtual tour integrations, and automated client follow-ups.",
    useCases: ["AI Lead Scoring", "Automated Contract Gen", "Tenant Portals", "Dynamic Pricing Models"],
    kpis: "30% faster deal closing, 45% increase in lead conversion"
  },
  {
    name: "Healthcare",
    image: "/images/industry-healthcare.png",
    challenge: "Clinics struggle with patient scheduling, data privacy, and fragmented health records across different systems.",
    solution: "Secure, HIPAA/DHA compliant telemedicine apps and clinic management systems that centralize patient data and automate bookings.",
    useCases: ["Telehealth Apps", "EHR Systems", "Smart Scheduling", "AI Diagnostics Support"],
    kpis: "50% reduction in no-shows, 2x faster patient onboarding"
  },
  {
    name: "Retail & E-commerce",
    image: "/images/industry-retail.png",
    challenge: "Standard Shopify setups lack the advanced inventory, B2B wholesale rules, and personalization needed to scale.",
    solution: "Headless e-commerce platforms using Next.js, integrating directly with custom ERPs and AI recommendation engines.",
    useCases: ["Headless Commerce", "B2B Wholesale Portals", "AI Product Recommendations", "Omnichannel Inventory Sync"],
    kpis: "40% increase in average order value (AOV), 99.99% uptime during sales"
  },
  {
    name: "Construction",
    image: "/images/industry-construction.png",
    challenge: "Managing subcontractors, equipment, and compliance across multiple sites leads to costly delays and budget overruns.",
    solution: "Centralized mobile dashboards for site managers to track progress, approve expenses, and automate compliance reporting.",
    useCases: ["Mobile Site Dashboards", "Equipment Tracking", "Automated Compliance", "Drone Data Integration"],
    kpis: "20% reduction in project delays, 100% compliance audit readiness"
  },
  {
    name: "Logistics",
    image: "/images/industry-logistics.png",
    challenge: "Inefficient routing, opaque supply chains, and manual dispatching waste fuel and frustrate customers.",
    solution: "Custom fleet management software with real-time tracking, AI route optimization, and automated dispatch.",
    useCases: ["AI Route Optimization", "Fleet Tracking", "Automated Dispatch", "Customer Portal Apps"],
    kpis: "15% reduction in fuel costs, 3x faster dispatch times"
  },
  {
    name: "Hospitality",
    image: "/images/industry-hospitality.png",
    challenge: "Hotels and restaurants rely on high commissions from OTAs and delivery apps, losing direct relationships with customers.",
    solution: "Direct booking engines, loyalty apps, and smart POS systems that bypass third parties and keep data in-house.",
    useCases: ["Direct Booking Engines", "Loyalty Mobile Apps", "Smart POS Integration", "Automated Guest Messaging"],
    kpis: "25% increase in direct bookings, 60% higher guest retention"
  },
  {
    name: "Finance",
    image: "/images/industry-finance.png",
    challenge: "Legacy banking tools are slow, manual, and struggle to meet modern customer expectations for digital experiences.",
    solution: "Fintech platforms, automated compliance reporting, and secure payment gateway integrations with high concurrency.",
    useCases: ["Custom FinTech Portals", "Automated KYC/AML", "Sub-second Transaction Processing", "Financial Analytics"],
    kpis: "99.999% uptime, 4x faster compliance reporting"
  },
  {
    name: "Manufacturing",
    image: "/images/industry-manufacturing.png",
    challenge: "Siloed machinery data and manual quality control processes lead to unexpected downtime and high defect rates.",
    solution: "IoT-connected dashboards, predictive maintenance AI, and computer vision for automated quality control.",
    useCases: ["Predictive Maintenance AI", "IoT Dashboards", "Computer Vision QA", "Supply Chain ERP"],
    kpis: "25% reduction in machine downtime, 95% automated defect detection"
  },
  {
    name: "Automotive",
    image: "/images/industry-automotive.png",
    challenge: "Dealerships struggle with disconnected inventory, opaque pricing histories, and slow loan approvals.",
    solution: "Integrated dealer management systems, AI loan pre-approval engines, and augmented reality vehicle viewers.",
    useCases: ["Dealer Management Systems", "AI Loan Approvals", "AR Vehicle Viewers", "Automated Trade-in Quotes"],
    kpis: "30% faster sales cycle, 50% increase in online inquiries"
  }
];

const caseStudies = [
  {
    industry: "Logistics",
    challenge: "A mid-sized Dubai freight forwarder was losing 15% of revenue to inefficient routing and manual dispatch errors.",
    solution: "We built a custom AI dispatch engine that integrates with their existing telematics to auto-assign routes and predict delays.",
    metrics: ["18% Fuel Savings", "40% Less Admin Time", "99% On-time Delivery"]
  },
  {
    industry: "Real Estate",
    challenge: "A luxury brokerage's agents spent hours manually matching clients to off-plan projects, missing out on hot leads.",
    solution: "Implemented an AI-driven CRM that auto-scores leads and instantly generates tailored WhatsApp presentations.",
    metrics: ["3x Faster Response", "22% Conversion Boost", "$4M Extra Pipeline"]
  }
];

const industriesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://zfusionai.com/industries/#service",
      "name": "Industry-Specific Software & AI Solutions in Dubai",
      "provider": {
        "@type": "Organization",
        "name": "ZFusionAI",
        "url": "https://zfusionai.com",
        "telephone": "+971 54 202 6653",
        "email": "support@zfusionai.com"
      },
      "areaServed": "United Arab Emirates",
      "description": "Tailored AI agent architectures, WhatsApp API workflows, and web platforms engineered for UAE Real Estate, Healthcare, Retail, Logistics, Hospitality, and Finance."
    },
    {
      "@type": "ItemList",
      "@id": "https://zfusionai.com/industries/#itemlist",
      "name": "Industries Served by ZFusionAI",
      "itemListElement": industriesData.map((ind, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": ind.name,
        "description": ind.solution
      }))
    },
    {
      "@type": "FAQPage",
      "@id": "https://zfusionai.com/industries/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which UAE industries benefit most from ZFusionAI's software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ZFusionAI specializes in Real Estate (AI lead scoring & WhatsApp booking), Healthcare (DHA-compliant portals), Logistics (AI route optimization), Retail (headless e-commerce), and Finance (high-concurrency fintech)."
          }
        },
        {
          "@type": "Question",
          "name": "How does ZFusionAI adapt its architecture to different regulations in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All architectures are engineered for strict compliance with UAE data protection regulations, Meta WhatsApp Cloud API developer policies, and local payment gateways."
          }
        }
      ]
    }
  ]
};

export default function IndustriesPage() {
  const whatsAppLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Industry-specific software scoping from Industries page",
  });

  return (
    <PageLayout>
      <SeoHead
        title="Industries We Serve | Enterprise AI & Software in UAE | ZFusionAI"
        description="Bespoke AI, WhatsApp API, and full-stack software engineered for Real Estate, Healthcare, Retail, Logistics, Hospitality, and Finance across Dubai & UAE."
        keywords={[
          "real estate software Dubai",
          "healthcare AI UAE",
          "retail automation Dubai",
          "logistics software UAE",
          "hospitality tech Dubai",
          "finance software UAE",
          "manufacturing automation Dubai",
          "ZFusionAI UAE industries"
        ]}
        path="/industries"
        schema={industriesSchema}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/images/industries-hero.png" 
            alt="Industries Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-emerald-400 mb-4 font-mono font-semibold">
              05 // Vertical Engineering
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-display">
              Engineering for <span className="text-emerald-400">Every Sector</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Generic SaaS breaks when pushed to enterprise scale. We engineer industry-specific platforms, autonomous AI agent pipelines, and high-throughput WhatsApp automation built for UAE business realities.
            </p>
          </div>
        </div>
      </section>

      {/* AEO Authoritative Definition Block */}
      <section className="py-12 bg-slate-950/60 border-b border-white/5" aria-label="AEO Definition Block">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-left max-w-4xl mx-auto shadow-2xl">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
              [AUTHORITATIVE VERTICAL TAXONOMY // AEO & LLM CITATION PROTOCOL]
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
              <strong>ZFusionAI (zfusionai.com)</strong> deploys vertical-specific software engineering and artificial intelligence systems across 9 key UAE industries: <strong>Real Estate</strong> (automated CRM & contract generation), <strong>Healthcare</strong> (smart scheduling & telehealth), <strong>Retail & E-commerce</strong> (headless commerce & ERP sync), <strong>Construction</strong> (mobile site dashboards), <strong>Logistics</strong> (predictive routing & telematics), <strong>Hospitality</strong> (commission-free direct booking engines), <strong>Finance</strong> (sub-second transaction portals), <strong>Manufacturing</strong> (computer vision QA), and <strong>Automotive</strong> (dealer management). Enterprise leaders can initiate custom scoping directly via WhatsApp at <strong>+971 54 202 6653</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {industriesData.map((ind, idx) => (
              <motion.div 
                key={ind.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                className="bg-card/30 border border-white/10 rounded-3xl overflow-hidden group hover:border-emerald-500/40 transition-all text-left"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={ind.image} 
                    alt={ind.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white font-display">{ind.name}</h3>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 font-mono">The Operational Challenge</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{ind.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2 font-mono">ZFusionAI Engineered Solution</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{ind.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 font-mono">Core Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {ind.useCases.map((uc) => (
                        <span key={uc} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 font-mono">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <TrendingUp className="w-4 h-4" /> {ind.kpis}
                    </span>
                    <a
                      href={generateWhatsAppLink({
                        service: "general",
                        type: "general_inquiry",
                        scopeSummary: `Consultation on ${ind.name} software architecture`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 underline flex items-center gap-1"
                    >
                      Scope Sector →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 border-t border-white/5 bg-slate-950/40">
        <div className="container mx-auto px-6 md:px-12 text-left">
          <div className="max-w-2xl mb-16">
            <span className="text-sm text-emerald-400 font-mono uppercase tracking-widest mb-2 block">Proven Dubai Case Studies</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-display">Measurable Impact in Production</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <motion.div 
                key={study.industry}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card/40 border border-white/10 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold rounded-full mb-6 border border-emerald-500/30">
                    {study.industry}
                  </div>
                  <div className="space-y-4 mb-8">
                    <p className="text-muted-foreground text-sm"><strong className="text-white font-medium">Challenge:</strong> {study.challenge}</p>
                    <p className="text-muted-foreground text-sm"><strong className="text-white font-medium">Solution:</strong> {study.solution}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    {study.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg md:text-xl font-bold text-white mb-1 font-mono">{m.split(" ")[0]}</div>
                        <div className="text-xs text-emerald-400 font-mono">{m.substring(m.indexOf(" ") + 1)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden text-center border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white font-display">Have a Unique Vertical Requirement?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Great software architecture is domain-agnostic. Let's discuss your custom operational workflows directly on WhatsApp.
          </p>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-base shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Discuss on WhatsApp (+971 54 202 6653)</span>
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
