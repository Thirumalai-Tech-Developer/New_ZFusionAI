import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";

export default function Hero() {

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Cinematic Radial Glow */}
      <motion.div 
        className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[70px] mix-blend-screen pointer-events-none"
        animate={{
          x: `calc(-50% + 30px)`,
          y: `calc(-50% + 30px)`,
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ 
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 }
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            B2B & B2C Technology Partner
          </div>

          <h1
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, delay: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8"
          >
            AI & Software Solutions Built for Business Growth
          </h1>

          <p
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, delay: 0 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We build custom AI, web, mobile, and automation systems for Dubai businesses. 
            Scalable architecture. Fast delivery. Serious engineering.
          </p>

          <div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.2, delay: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="w-full sm:w-auto inline-flex">
              <Button
                size="lg"
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(255,122,0,0.6)] transition-all duration-300 group"
              >
                Book Free Call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto inline-flex">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full px-8 py-6 text-lg border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md group"
              >
                View Services
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1, delay: 0 }}
            className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Fast Delivery
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Scalable Systems
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Dubai Ready
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Premium Quality
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
