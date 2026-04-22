import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most websites launch in 4–6 weeks. Custom apps and AI systems usually run 8–16 weeks depending on scope. We share a clear, milestone-based timeline before kickoff so you always know what's coming next.",
  },
  {
    q: "Do you sign NDAs before discussing project details?",
    a: "Yes. We sign mutual NDAs before any deep technical or business discussion. Your information stays private from the first conversation onward.",
  },
  {
    q: "What's your pricing model?",
    a: "We work on fixed-scope project pricing for most engagements, with optional monthly retainers for ongoing work. After the discovery call we send a detailed written proposal — no hidden fees, no surprise invoices.",
  },
  {
    q: "What technologies do you use?",
    a: "Modern, battle-tested stacks: React, Next.js, Node.js, Python, PostgreSQL, AWS, and the leading AI platforms. We pick the right tool for the job, not whatever is trendy.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every project includes a free post-launch support window, and we offer ongoing maintenance plans for security patches, feature upgrades, and performance optimization.",
  },
  {
    q: "Do you work with companies outside Dubai?",
    a: "Absolutely. We serve businesses across the UAE — Abu Dhabi, Sharjah, Ajman, RAK — and remotely with clients globally. Our delivery process is built for distributed collaboration.",
  },
  {
    q: "Will I own the code and IP?",
    a: "Yes. You own 100% of the source code and intellectual property on delivery. We hand over the full repository, documentation, and credentials.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Questions, answered straight.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Still have something on your mind? Reach out — a real human responds
              within one business day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-white/10"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium text-white hover:text-primary py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
