import { motion } from "framer-motion";
import { useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import PageLayout from "@/components/PageLayout";
import { Brain, Globe, Smartphone, Workflow, Cloud, Headset, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

const seoServiceLinks = [
  { slug: "/web-development-dubai", label: "Web Development Company in Dubai" },
  { slug: "/website-development-dubai", label: "Website Development Dubai for Businesses" },
  { slug: "/web-design-dubai", label: "Web Design Dubai" },
  { slug: "/website-redesign-dubai", label: "Website Redesign Dubai" },
  { slug: "/ecommerce-development-dubai", label: "Ecommerce Website Development Dubai" },
  { slug: "/landing-page-design-dubai", label: "Landing Page Design Dubai" },
  { slug: "/small-business-website-dubai", label: "Small Business Website Dubai" },
  { slug: "/startup-website-dubai", label: "Startup Website Dubai" },
  { slug: "/restaurant-website-dubai", label: "Restaurant Website Dubai" },
  { slug: "/real-estate-website-dubai", label: "Real Estate Website Development Dubai" },
  { slug: "/clinic-website-dubai", label: "Clinic Website Development Dubai" },
  { slug: "/responsive-web-design-dubai", label: "Responsive Web Design Dubai" },
  { slug: "/premium-website-dubai", label: "Premium Website Dubai" },
  { slug: "/fast-website-dubai", label: "Fast Website Development Dubai" },

  { slug: "/ai-company-dubai", label: "AI Company in Dubai" },
  { slug: "/ai-development-dubai", label: "AI Development Dubai" },
  { slug: "/ai-automation-dubai", label: "AI Automation Solutions Dubai" },
  { slug: "/chatbot-development-dubai", label: "AI Chatbot Development Dubai" },
  { slug: "/whatsapp-chatbot-dubai", label: "WhatsApp Chatbot Dubai" },
  { slug: "/lead-automation-dubai", label: "Lead Automation Dubai" },
  { slug: "/crm-automation-dubai", label: "CRM Automation Dubai" },
  { slug: "/workflow-automation-dubai", label: "Workflow Automation Dubai" },
  { slug: "/gpt-integration-dubai", label: "GPT Integration Dubai" },
  { slug: "/openai-development-dubai", label: "OpenAI Development Dubai" },
  { slug: "/voicebot-dubai", label: "AI Voice Bot Dubai" },

  { slug: "/mobile-app-development-dubai", label: "Mobile App Development Dubai" },
  { slug: "/android-app-development-dubai", label: "Android App Development Dubai" },
  { slug: "/ios-app-development-dubai", label: "iOS App Development Dubai" },
  { slug: "/flutter-development-dubai", label: "Flutter App Development Dubai" },
  { slug: "/react-native-dubai", label: "React Native Development Dubai" },
  { slug: "/food-delivery-app-dubai", label: "Food Delivery App Dubai" },
  { slug: "/booking-app-dubai", label: "Booking App Dubai" },
  { slug: "/marketplace-app-dubai", label: "Marketplace App Dubai" },

  { slug: "/custom-software-dubai", label: "Custom Software Development Dubai" },
  { slug: "/react-development-dubai", label: "React Development Company Dubai" }
];



const servicesDetails = [
  {
    id: "ai-development",
    title: "AI Development",
    icon: <Brain className="h-6 w-6" />,
    image: "/images/service-ai.png",
    description: "We build custom artificial intelligence solutions that transform raw data into actionable insights and automate complex cognitive processes. Our AI development goes beyond basic API integration, focusing on scalable models that provide genuine competitive advantages.",
    features: [
      "Custom Machine Learning Models",
      "Natural Language Processing (NLP)",
      "Computer Vision Systems",
      "Predictive Analytics Engine",
      "LLM Integration & Fine-tuning",
      "Automated Decision Systems",
    ],
    deliverables: ["Trained Model Assets", "API Documentation", "Deployment Infrastructure", "Performance Metrics Dashboard"],
    timeline: "8-16 Weeks"
  },
  {
    id: "web-development",
    title: "Website Development",
    icon: <Globe className="h-6 w-6" />,
    image: "/images/service-web.png",
    description: "High-performance, scalable web applications built with modern frameworks. We engineer robust digital platforms that load instantly, scale flawlessly under load, and provide exceptional user experiences across all devices.",
    features: [
      "React / Next.js Frontends",
      "Microservices Architecture",
      "Enterprise E-commerce",
      "Custom SaaS Platforms",
      "B2B Web Portals",
      "Progressive Web Apps (PWA)",
    ],
    deliverables: ["Full Source Code", "System Architecture", "Automated Test Suite", "CI/CD Pipeline Setup"],
    timeline: "6-12 Weeks"
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    icon: <Smartphone className="h-6 w-6" />,
    image: "/images/service-mobile.png",
    description: "Native and cross-platform mobile applications designed for engagement and retention. We build apps that feel smooth, look stunning, and integrate deeply with device capabilities to provide a seamless user experience.",
    features: [
      "Native iOS & Android Apps",
      "React Native & Flutter Apps",
      "IoT Device Integration",
      "Real-time Data Sync",
      "Offline-first Architecture",
      "App Store Optimization",
    ],
    deliverables: ["Compiled App Binaries", "Store Submission Assets", "Analytics Integration", "Push Notification Setup"],
    timeline: "10-20 Weeks"
  },
  {
    id: "business-automation",
    title: "Business Automation",
    icon: <Workflow className="h-6 w-6" />,
    image: "/images/service-automation.png",
    description: "Streamline operations with custom software that connects your existing tools and eliminates manual work. We identify bottlenecks and deploy automated workflows that run silently in the background.",
    features: [
      "End-to-End Workflow Optimization",
      "Custom ERP/CRM Systems",
      "Third-party API Integrations",
      "Data Warehouse Synchronization",
      "Robotic Process Automation (RPA)",
      "Automated Reporting",
    ],
    deliverables: ["Integration Architecture", "Process Flow Documentation", "Monitoring Dashboard", "Error Handling Protocols"],
    timeline: "4-10 Weeks"
  },
  {
    id: "cloud-deployment",
    title: "Cloud & Deployment",
    icon: <Cloud className="h-6 w-6" />,
    image: "/images/service-cloud.png",
    description: "Secure, scalable cloud infrastructure tailored to your application's specific performance needs. We architect deployment environments that handle traffic spikes gracefully while optimizing for cost.",
    features: [
      "AWS / Azure / GCP Architecture",
      "Serverless Deployments",
      "Docker & Kubernetes Orchestration",
      "Zero-downtime Deployments",
      "Database Optimization & Sharding",
      "Disaster Recovery Planning",
    ],
    deliverables: ["Infrastructure as Code (IaC)", "Security Audit Report", "Scaling Guidelines", "Backup Automation"],
    timeline: "2-6 Weeks"
  },
  {
    id: "support-maintenance",
    title: "Support & Maintenance",
    icon: <Headset className="h-6 w-6" />,
    image: "/images/service-support.png",
    description: "Long-term partnership ensuring your software remains secure, updated, and performing optimally. We act as your dedicated engineering team, providing proactive monitoring and rapid issue resolution.",
    features: [
      "24/7 System Monitoring",
      "Proactive Security Updates",
      "Performance Tuning",
      "SLA-backed Bug Fixes",
      "Continuous Feature Enhancements",
      "Codebase Refactoring",
    ],
    deliverables: ["Monthly Performance Reports", "Uptime Guarantee", "Dedicated Support Channel", "Quarterly Strategy Reviews"],
    timeline: "Ongoing Contract"
  }
];

export default function ServicesPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (attempt < 10) {
        setTimeout(() => tryScroll(attempt + 1), 100);
      }
    };
    tryScroll();
  }, []);

  return (
    
    <PageLayout>
      <SeoHead
        title="Web Development, AI Solutions & Software Services in UAE | ZFusionAI"
        description="Professional website development, AI systems, mobile apps, CRM software and automation services for businesses in Dubai and all UAE."
        keywords={[
          "web design Dubai",
          "AI development company UAE",
          "React developer Dubai",
          "Node.js development Dubai",
          "Laravel development UAE",
          "ecommerce website Dubai",
          "ERP software UAE",
          "CRM development Dubai",
          "mobile app development Dubai",
          "business automation UAE",
          "cloud deployment Dubai",
        ]}
        path="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: seoServiceLinks.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://zfusionai.com${item.slug}`,
            name: item.label
          }))
        }}
      />
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/services-hero.png" 
            alt="Services Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-emerald-400 mb-4 font-mono font-semibold">
              01 // Architectural Capabilities
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-display">
              High-Frequency <span className="text-emerald-400">Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We engineer custom software systems built for raw execution speed: Meta WhatsApp Cloud API middleware, autonomous AI agent swarms, and sub-50ms full-stack web platforms.
            </p>
          </div>
        </div>
      </section>

      {/* AEO Authoritative Definition Block */}
      <section className="py-10 bg-slate-950/60 border-b border-white/5" aria-label="AEO Definition Block">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-left max-w-4xl mx-auto shadow-2xl">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
              [AUTHORITATIVE SERVICE TAXONOMY // AEO CITATION PROTOCOL]
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
              <strong>ZFusionAI Services (zfusionai.com)</strong> encompass three core technical domains built without generic SaaS wrappers: (1) <strong>WhatsApp Web API Middleware</strong> with 0ms bottleneck latency and direct Meta wholesale billing; (2) <strong>Autonomous AI Agentic Builds</strong> with private vector memory and sandboxed tool calling; and (3) <strong>Full Stack High-Frequency Web Development</strong> using React 19, TypeScript 5.9, and PostgreSQL. Every engagement features a guaranteed <strong>Free Tier</strong> and direct WhatsApp scoping via <strong>+971 54 202 6653</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Logo Field Featured Cards */}
      <section className="py-12 bg-slate-950/40 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Link href="/services/whatsapp-api">
              <div className="p-6 rounded-2xl liquid-glass border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group">
                <span className="text-xs font-mono text-emerald-400 uppercase">01 // Liquid Glass</span>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors font-display mt-2 mb-2">
                  WhatsApp Web API
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct Meta Cloud API webhooks. Sub-10ms latency, zero markup, 1,000 free monthly events.
                </p>
                <div className="text-xs text-emerald-400 font-mono mt-4 flex items-center gap-1">
                  <span>Explore Liquid Glass Sandbox →</span>
                </div>
              </div>
            </Link>

            <Link href="/services/agentic-ai">
              <div className="p-6 rounded-2xl neural-card border border-purple-500/30 hover:border-cyan-400 transition-all cursor-pointer group">
                <span className="text-xs font-mono text-cyan-400 uppercase">02 // Neural Matrix</span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-display mt-2 mb-2">
                  AI Agentic Build
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Autonomous swarms with multi-tool calling and auto-correction. Free agent sandbox node.
                </p>
                <div className="text-xs text-cyan-400 font-mono mt-4 flex items-center gap-1">
                  <span>Explore Neural Swarm Flow →</span>
                </div>
              </div>
            </Link>

            <Link href="/services/full-stack-web">
              <div className="p-6 rounded-2xl terminal-shell border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer group">
                <span className="text-xs font-mono text-blue-400 uppercase">03 // Cyber Terminal</span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-display mt-2 mb-2">
                  Full Stack Web Dev
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-frequency platforms with sub-50ms TTFB. React 19, TypeScript, free architecture blueprint.
                </p>
                <div className="text-xs text-blue-400 font-mono mt-4 flex items-center gap-1">
                  <span>Explore Terminal Shell →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Anchor Nav — auto-marquee */}
      <div className="sticky top-[64px] md:top-[72px] z-40 bg-background/90 backdrop-blur-md border-b border-white/10 overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        <div className="flex w-max animate-services-marquee group-hover:[animation-play-state:paused] py-3 md:py-4">
          {[...servicesDetails, ...servicesDetails].map((s, i) => (
            <button
              key={`${s.id}-${i}`}
              onClick={() => {
                const el = document.getElementById(s.id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 130;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="text-xs md:text-sm font-medium text-muted-foreground hover:text-white whitespace-nowrap transition-colors flex items-center gap-2 shrink-0 mx-4 md:mx-6"
            >
              <span className="text-primary/70 shrink-0">{s.icon}</span>
              {s.title}
            </button>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes services-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-services-marquee {
            animation: services-marquee 30s linear infinite;
          }
        `}} />
      </div>

      {/* Service Sections */}
      <div className="container mx-auto px-6 md:px-12 py-20 space-y-32">
        {servicesDetails.map((service, idx) => (
          <section key={service.id} id={service.id} className="scroll-mt-32">
            <div className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,122,0,0.1)] group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 space-y-8"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-white/10">
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-2">Deliverables</span>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {service.deliverables.map((d, i) => <li key={i}>• {d}</li>)}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-2">Typical Timeline</span>
                    <div className="text-lg font-medium text-white">{service.timeline}</div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/contact" className="inline-flex">
                    <Button className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black border border-primary/20 transition-all group">
                      Discuss this service
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* SEO Internal Links */}
      <section className="py-6 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <details className="group">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-white transition-colors">
              Explore More Services
            </summary>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
              {seoServiceLinks.map((item) => (
                <Link key={item.slug} href={item.slug}>
                  <a className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* Procedural Pricing & Free Tier Section */}
      <ProceduralCalculator />

      {/* CTA */}
      <section className="py-24 bg-slate-950/40 border-t border-white/5 relative overflow-hidden text-center">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white font-display">Speak Directly with a Senior Architect</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            Skip bureaucratic email threads. Connect directly on WhatsApp to scope your project, claim free tiers, or review technical specifications.
          </p>
          <a
            href={generateWhatsAppLink({
              service: "general",
              type: "general_inquiry",
              scopeSummary: "Consultation from Services page",
            })}
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
export { seoServiceLinks };