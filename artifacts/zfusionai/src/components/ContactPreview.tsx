import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPreview() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-card/30 scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's talk business</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Ready to scale your business with custom engineering? Our team is standing by to discuss your next big move.
        </p>
        <Link href="/contact" className="inline-flex">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-[0_0_30px_rgba(255,122,0,0.3)] group">
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}