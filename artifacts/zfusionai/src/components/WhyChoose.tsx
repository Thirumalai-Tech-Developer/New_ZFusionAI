import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "B2B Focused",
    description: "We understand the unique challenges of enterprise software, from compliance to complex legacy integrations.",
  },
  {
    title: "Custom-Built",
    description: "No generic templates. Every solution is architected from the ground up for your specific business logic.",
  },
  {
    title: "ROI Focus",
    description: "We measure success not just by lines of code, but by workflow time saved and revenue generated.",
  },
  {
    title: "Modern UI/UX",
    description: "Enterprise software shouldn't look like it was built in 1995. We deliver consumer-grade design for business tools.",
  },
  {
    title: "Scalable Architecture",
    description: "Systems designed to handle your growth, ensuring performance doesn't degrade as your data volume explodes.",
  },
  {
    title: "Transparent Communication",
    description: "Direct access to lead engineers, regular progress demos, and zero technical jargon hiding lack of progress.",
  },
  {
    title: "Secure Code",
    description: "Security is baked in from day one, following industry best practices to protect your proprietary data.",
  },
  {
    title: "Long-term Support",
    description: "We don't disappear after launch. We offer SLAs to ensure your system evolves with your business.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-32 bg-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Why Choose <span className="text-primary">ZFusionAI</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
            >
              We are not just a development shop. We are strategic technology partners invested in the success of your digital transformation.
            </motion.p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{reason.title}</h3>
                </div>
                <p className="text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
