import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Industries from "@/components/Industries";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import ContactPreview from "@/components/ContactPreview";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import SideNav from "@/components/SideNav";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <SeoHead
        title="AI & Web Development Company in Dubai, UAE | ZFusionAI"
        description="ZFusionAI is a leading AI and web development company in Dubai, UAE providing custom websites, AI automation, mobile apps, SEO-ready business platforms and software solutions across all UAE."
        keywords={[
          "web development Dubai",
          "AI company Dubai",
          "website development UAE",
          "software company Dubai",
          "AI solutions UAE",
          "mobile app development Dubai",
          "custom website Dubai",
          "SEO company Dubai",
          "business website UAE",
          "automation company Dubai",
          "AI development Dubai",
          "ERP software UAE",
          "CRM development Dubai",
          "ecommerce website Dubai",
        ]}
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ZFusionAI",
          url: "https://zfusionai.info",
          logo: "https://zfusionai.info/brand/logo.png",
          description:
            "AI, web, mobile and automation development company in Dubai, UAE.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+971 55 471 2353",
            contactType: "customer support",
            email: "support@zfusionai.info",
            areaServed: "AE",
            availableLanguage: ["English", "Arabic"],
          },
        }}
      />
      <BackgroundEffects />
      <Navbar />
      <SideNav />
      
      <main className="relative z-10">
        <Hero />
        <TrustedBy />
        <Services />
        <WhyChoose />
        <Industries />
        <Stats />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <ContactPreview />
      </main>

      <Footer />

      <AnimatePresence>
        {!scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToServices}
            className="hidden md:flex fixed bottom-8 left-8 z-50 items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-card hover:border-primary/50 transition-all group"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
              <ArrowDown className="h-4 w-4" />
            </div>
            View cases
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
