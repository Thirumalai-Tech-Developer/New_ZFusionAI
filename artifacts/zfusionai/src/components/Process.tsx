import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, TestTube2, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery Call",
    desc: "We understand your business goals, current systems, and where technology can unlock the next level of growth.",
  },
  {
    icon: FileText,
    title: "Strategy & Proposal",
    desc: "A clear scope, timeline, and pricing — no jargon, no surprises. You know exactly what you're getting.",
  },
  {
    icon: Code2,
    title: "Design & Development",
    desc: "Our team designs and builds your solution with weekly demos, so you see progress every step of the way.",
  },
  {
    icon: TestTube2,
    title: "Testing",
    desc: "Rigorous QA across devices, browsers, and edge cases. Performance, security, and accessibility audited.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Smooth deployment to production with monitoring, analytics, and a complete handover.",
  },
  {
    icon: LifeBuoy,
    title: "Support & Scale",
    desc: "Ongoing maintenance, feature upgrades, and scaling as your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
            How we work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            A clear, milestone-driven process
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Six steps from first call to long-term partnership.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step content */}
                  <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                    <div className="text-sm font-mono text-primary mb-2">
                      0{i + 1}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md ${isLeft ? 'md:ml-auto' : ''}">
                      {step.desc}
                    </p>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-card border border-primary/30 shadow-[0_0_30px_rgba(255,122,0,0.3)]">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Spacer for symmetry on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
