import { motion } from "framer-motion";
import { useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import PageLayout from "@/components/PageLayout";
import { Brain, Globe, Smartphone, Workflow, Cloud, Headset, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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
          "@type": "Service",
          serviceType: "AI, Web, Mobile and Automation Development",
          provider: {
            "@type": "Organization",
            name: "ZFusionAI",
            url: "https://zfusionai.info",
          },
          areaServed: { "@type": "Country", name: "United Arab Emirates" },
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
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4 font-semibold">Our Expertise</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Services Built for <span className="text-primary">Business Outcomes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We don't just deliver code. We engineer high-performance systems that drive measurable growth, reduce operational friction, and scale with your ambition.
            </p>
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

      {/* CTA */}
      <section className="py-24 bg-card/30 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to upgrade your technology?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            Let's discuss how our engineering team can build the tailored solutions your business needs to scale.
          </p>
          <Link href="/contact" className="inline-flex">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-[0_0_30px_rgba(255,122,0,0.3)]">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}