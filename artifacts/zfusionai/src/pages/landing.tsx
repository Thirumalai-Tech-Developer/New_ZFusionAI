import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import { ArrowDown } from "lucide-react";
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  startTransition,
} from "react";

const BackgroundEffects = lazy(() => import("@/components/BackgroundEffects"));
const TrustedBy = lazy(() => import("@/components/TrustedBy"));
const Services = lazy(() => import("@/components/Services"));
const WhyChoose = lazy(() => import("@/components/WhyChoose"));
const Industries = lazy(() => import("@/components/Industries"));
const Stats = lazy(() => import("@/components/Stats"));
const Process = lazy(() => import("@/components/Process"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Pricing = lazy(() => import("@/components/Pricing"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const ContactPreview = lazy(() => import("@/components/ContactPreview"));

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);

  useEffect(() => {
    let ticking = false;
    let t1: number;
    let t2: number;
    let t3: number;

    const loadStage1 = () => {
      startTransition(() => setStage1(true));
    };

    const loadStage2 = () => {
      startTransition(() => setStage2(true));
    };

    const loadStage3 = () => {
      startTransition(() => setStage3(true));
    };

    const beginProgressiveLoad = () => {
      loadStage1();

      t1 = window.setTimeout(() => {
        loadStage2();
      }, 500);

      t2 = window.setTimeout(() => {
        loadStage3();
      }, 1100);
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        setScrolled((prev) => {
          const next = y > 200;
          return prev !== next ? next : prev;
        });

        if (y > 180 && !stage1) {
          beginProgressiveLoad();
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          beginProgressiveLoad();
        },
        { timeout: 1800 }
      );
    } else {
      t3 = window.setTimeout(() => {
        beginProgressiveLoad();
      }, 1800);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [stage1]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

      <Navbar />
      <SideNav />

      <Suspense fallback={null}>
        <BackgroundEffects />
      </Suspense>

      <main className="relative z-10">
        <Hero />

        <Suspense fallback={null}>
          <TrustedBy />
          <Services />
        </Suspense>

        {stage1 && (
          <Suspense fallback={null}>
            <WhyChoose />
            <Industries />
            <Stats />
          </Suspense>
        )}

        {stage2 && (
          <Suspense fallback={null}>
            <Process />
            <Testimonials />
            <Pricing />
          </Suspense>
        )}

        {stage3 && (
          <Suspense fallback={null}>
            <FAQ />
            <FinalCTA />
            <ContactPreview />
          </Suspense>
        )}
      </main>

      <Footer />

      {!scrolled && (
        <button
          onClick={scrollToServices}
          aria-label="Scroll to services"
          className="hidden md:flex fixed bottom-8 left-8 z-50 items-center gap-2 rounded-full bg-card/80 border border-white/10 px-4 py-2 text-sm font-medium text-white shadow-md hover:border-primary/50 transition-all group"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
            <ArrowDown className="h-4 w-4" />
          </div>
          View cases
        </button>
      )}
    </div>
  );
}