import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2, Zap, Shield, Eye, Lightbulb, Link as LinkIcon, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const values = [
  { title: "Execution Over Ideas", icon: Zap, text: "Ideas are cheap. We pride ourselves on shipping robust, working software fast." },
  { title: "Total Transparency", icon: Eye, text: "No black boxes. You have access to source code, progress tracking, and direct lines to engineers." },
  { title: "Engineering Quality", icon: CheckCircle2, text: "We don't cut corners. Scalable architecture, clean code, and automated testing are defaults." },
  { title: "Applied Innovation", icon: Lightbulb, text: "We implement AI and modern tech where it drives value, not just for the buzzword." },
  { title: "Security First", icon: Shield, text: "Data privacy and system security are integrated from the first line of code." },
  { title: "Long-term Partnerships", icon: LinkIcon, text: "We build systems we want to maintain. We succeed when your product scales." }
];

export default function AboutPage() {
  useSEO("About Us | ZFusionAI", "Discover the engineering team behind Dubai's most scalable software and AI solutions.");

  return (
    <PageLayout>
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
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4 font-semibold">About Us</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              We Engineer <span className="text-primary">Outcomes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              ZFusionAI is a premier software engineering firm based in Dubai. We exist to solve complex operational and growth challenges through custom AI, web, and mobile solutions.
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Story</h2>
              <p>
                The software agency model is broken. Too many businesses in the UAE end up with bloated, legacy platforms built by outsourced teams who don't understand the local market or the actual business objectives.
              </p>
              <p>
                ZFusionAI was founded to bridge the gap between high-level business strategy and deep technical execution. We realized that companies didn't just need code—they needed architecture that scales, AI that actually automates work, and partners who treat the product as their own.
              </p>
              <p>
                Today, we serve as the dedicated engineering arm for ambitious startups and established enterprises across the Middle East. We build fast, we build secure, and we build for the future.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-card/40 border border-white/10 p-8 rounded-3xl aspect-square flex flex-col justify-center items-center text-center">
                  <div className="text-5xl font-bold text-white mb-2">50+</div>
                  <div className="text-sm text-primary uppercase tracking-wider">Projects Delivered</div>
                </div>
                <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl aspect-square flex flex-col justify-center items-center text-center">
                  <div className="text-5xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-primary uppercase tracking-wider">In-House Talent</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card/40 border border-white/10 p-8 rounded-3xl aspect-square flex flex-col justify-center items-center text-center">
                  <div className="text-5xl font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-primary uppercase tracking-wider">Support SLA</div>
                </div>
                <div className="bg-card/40 border border-white/10 p-8 rounded-3xl aspect-square flex flex-col justify-center items-center text-center">
                  <div className="text-5xl font-bold text-white mb-2">0</div>
                  <div className="text-sm text-primary uppercase tracking-wider">Outsourced Code</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card/20 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that dictate how we write code, manage projects, and communicate with partners.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-white/10 p-8 rounded-2xl hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How We're Different</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card/20 border border-white/5 opacity-60">
              <h3 className="text-xl font-bold text-white/50 mb-6 text-center">Freelancers</h3>
              <ul className="space-y-4 text-sm text-white/50">
                <li className="flex items-center gap-3">❌ Single point of failure</li>
                <li className="flex items-center gap-3">❌ Limited tech stack</li>
                <li className="flex items-center gap-3">❌ Unreliable availability</li>
                <li className="flex items-center gap-3">❌ No QA or testing processes</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-primary/10 border border-primary/30 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(255,122,0,0.1)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ZFusionAI
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Dedicated Engineering</h3>
              <ul className="space-y-4 text-sm text-white">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Full-stack engineering team</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Enterprise-grade architecture</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Dedicated project management</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Automated QA & CI/CD</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> SLA-backed ongoing support</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-card/20 border border-white/5 opacity-60">
              <h3 className="text-xl font-bold text-white/50 mb-6 text-center">Typical Agencies</h3>
              <ul className="space-y-4 text-sm text-white/50">
                <li className="flex items-center gap-3">❌ Outsource to third parties</li>
                <li className="flex items-center gap-3">❌ Bloated pricing</li>
                <li className="flex items-center gap-3">❌ Slow communication loops</li>
                <li className="flex items-center gap-3">❌ Focus on design, not deep tech</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 border-t border-white/5 bg-card/10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <span className="text-sm text-muted-foreground uppercase tracking-widest mb-8 block font-semibold">Technologies We Master</span>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 items-center opacity-70">
            <span className="text-xl font-bold tracking-tight">React</span>
            <span className="text-xl font-bold tracking-tight">Next.js</span>
            <span className="text-xl font-bold tracking-tight">Node.js</span>
            <span className="text-xl font-bold tracking-tight">Python</span>
            <span className="text-xl font-bold tracking-tight">AWS</span>
            <span className="text-xl font-bold tracking-tight">GCP</span>
            <span className="text-xl font-bold tracking-tight">OpenAI</span>
            <span className="text-xl font-bold tracking-tight">PostgreSQL</span>
            <span className="text-xl font-bold tracking-tight">Docker</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden text-center border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">Let's build the future together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop dealing with unreliable code. Partner with a team that treats your product with the respect it deserves.
          </p>
          <Link href="/contact" className="inline-flex">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-[0_0_30px_rgba(255,122,0,0.3)] group">
              Meet The Team
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
