import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-background to-card p-10 md:p-20"
        >
          {/* Glow effects */}
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[100px]" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary mb-8"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Limited slots open this quarter
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Ready to build something powerful?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Tell us about your project. We'll respond within one business day
              with next steps and a free consultation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto inline-flex">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-[0_0_40px_rgba(255,122,0,0.5)] hover:shadow-[0_0_60px_rgba(255,122,0,0.7)] transition-all duration-300 group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="tel:+971554712353"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                or call <span className="text-white font-medium">+971 55 471 2353</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
