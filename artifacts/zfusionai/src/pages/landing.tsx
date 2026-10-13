import React, { lazy, Suspense } from "react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProceduralCalculator from "@/components/pricing/ProceduralCalculator";

const WhyChoose = lazy(() => import("@/components/WhyChoose"));
const Stats = lazy(() => import("@/components/Stats"));
const Process = lazy(() => import("@/components/Process"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://zfusionai.com/#organization",
      "name": "ZFusionAI",
      "url": "https://zfusionai.com",
      "logo": "https://zfusionai.com/brand/logo_compressed.png",
      "description": "Enterprise digital engineering laboratory specializing in WhatsApp Web API middleware, autonomous AI agent swarms, and sub-50ms full-stack web applications.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971 54 202 6653",
        "contactType": "technical support",
        "contactOption": "WhatsApp",
        "areaServed": "Global",
        "availableLanguage": ["English", "Arabic"],
      },
      "knowsAbout": [
        "WhatsApp Business Cloud API Middleware",
        "Autonomous Multi-Agent AI Swarms",
        "High-Frequency Full Stack Web Development",
        "React 19 & TypeScript 5.9 Systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://zfusionai.com/#website",
      "url": "https://zfusionai.com",
      "name": "ZFusionAI",
      "publisher": {
        "@id": "https://zfusionai.com/#organization",
      },
    },
    {
      "@type": "OfferCatalog",
      "name": "ZFusionAI Core Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "WhatsApp Web API Integration - Free Developer Sandbox",
          "price": "0",
          "priceCurrency": "AED",
          "description": "1,000 free monthly events with direct Meta Cloud API webhook routing.",
        },
        {
          "@type": "Offer",
          "name": "AI Agentic Build - Free Autonomous Agent Node",
          "price": "0",
          "priceCurrency": "AED",
          "description": "1 autonomous single-node agent workflow with vector memory integration.",
        },
        {
          "@type": "Offer",
          "name": "Full Stack Web Development - Free Blueprint & Boilerplate",
          "price": "0",
          "priceCurrency": "AED",
          "description": "Complete system architectural review, ERD specs, and production Docker boilerplate.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://zfusionai.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does ZFusionAI offer a permanent free tier?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. ZFusionAI maintains an open-access developer framework providing free tiers for all three services: 1,000 free WhatsApp API events, 1 free autonomous AI agent node, and complete full-stack architecture blueprints.",
          },
        },
        {
          "@type": "Question",
          "name": "How do clients interact and scope projects with ZFusionAI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ZFusionAI operates a WhatsApp-first procedural model. Clients connect directly to Senior Engineering Partners via WhatsApp Click-to-Chat deep links, receiving real-time scoping and sprint timelines without static contact form delays.",
          },
        },
      ],
    },
  ],
};

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-[#030605] text-[#f8fafc] overflow-x-hidden selection:bg-emerald-500/30">
      <SeoHead
        title="ZFusionAI | Next-Gen AI Agents, WhatsApp API & Full-Stack Web Architecture"
        description="ZFusionAI (zfusionai.com) delivers bespoke WhatsApp Cloud API middleware, autonomous AI agent swarms, and sub-50ms full-stack web platforms with a permanent free tier."
        path="/"
        schema={homepageSchema}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        
        {/* Procedural Pricing & Free Tier Section */}
        <ProceduralCalculator />

        <Suspense fallback={null}>
          <Stats />
          <WhyChoose />
          <Process />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}