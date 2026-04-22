import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import PageLayout from "@/components/PageLayout";
import { ArrowRight, Activity, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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
    solution: "Secure fintech apps, automated KYC onboarding flows, and internal risk assessment dashboards.",
    useCases: ["Fintech Mobile Apps", "Automated KYC", "Risk Dashboards", "Blockchain Integrations"],
    kpis: "80% faster user onboarding, 0 critical security breaches"
  },
  {
    name: "Education",
    image: "/images/industry-education.png",
    challenge: "Generic LMS platforms offer poor engagement, disconnected analytics, and rigid course structures.",
    solution: "Interactive e-learning platforms with adaptive AI paths, gamification, and rich analytics for educators.",
    useCases: ["Adaptive AI Learning", "Custom LMS", "Student Analytics", "Gamified Apps"],
    kpis: "40% higher course completion rates, 2x student engagement"
  },
  {
    name: "Travel & Tourism",
    image: "/images/industry-travel.png",
    challenge: "Coordinating multi-modal travel, dynamic pricing, and local regulations requires immense manual effort.",
    solution: "Aggregated booking platforms, dynamic pricing engines, and AI itinerary planners for agencies.",
    useCases: ["AI Itinerary Planners", "Dynamic Pricing Engines", "B2B Agent Portals", "Multilingual Frontends"],
    kpis: "30% increase in package sales, 50% less manual booking time"
  },
  {
    name: "Professional Services",
    image: "/images/industry-professional.png",
    challenge: "Consultancies and law firms waste billable hours on document drafting, client updates, and fragmented billing.",
    solution: "Secure client portals, automated document generation, and integrated time-tracking platforms.",
    useCases: ["Secure Client Portals", "AI Document Drafts", "Automated Billing", "Case Management Apps"],
    kpis: "20+ hours saved per week per partner, 100% billing accuracy"
  },
  {
    name: "Manufacturing",
    image: "/images/industry-automotive.png", // fallback
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

export default function IndustriesPage() {
  useSEO("Industries | ZFusionAI", "Tailored software and AI solutions across Real Estate, Healthcare, Retail, Logistics, and more in Dubai.");

  return (
    <PageLayout>
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
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4 font-semibold">Solutions</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Engineering for <span className="text-primary">Every Sector</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Generic software breaks at scale. We build industry-specific platforms, AI tools, and mobile apps designed for the exact operational realities of your market.
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
                className="bg-card/30 border border-white/10 rounded-3xl overflow-hidden group hover:border-primary/30 transition-all"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={ind.image} 
                    alt={ind.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white">{ind.name}</h3>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">The Challenge</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">{ind.challenge}</p>
                    </div>
                    <div>
                      <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">The Solution</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">{ind.solution}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white text-sm font-semibold mb-3">Key Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {ind.useCases.map((uc, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-white">{ind.kpis}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-card/20 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Impact by the Numbers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real results from tailored engineering.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-background border border-white/10 p-8 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Activity className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-6">
                    {study.industry}
                  </div>
                  <div className="space-y-4 mb-8">
                    <p className="text-muted-foreground"><strong className="text-white font-medium">Challenge:</strong> {study.challenge}</p>
                    <p className="text-muted-foreground"><strong className="text-white font-medium">Solution:</strong> {study.solution}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    {study.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg md:text-xl font-bold text-white mb-1">{m.split(" ")[0]}</div>
                        <div className="text-xs text-primary">{m.substring(m.indexOf(" ") + 1)}</div>
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
      <section className="py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">Don't see your industry?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Great software is agnostic. If you have complex logic, scale requirements, or need AI integration, we can build it.
          </p>
          <Link href="/contact" className="inline-flex">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-[0_0_30px_rgba(255,122,0,0.3)] group">
              Discuss Your Sector
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
