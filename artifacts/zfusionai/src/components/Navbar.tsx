import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageSquare, Zap } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Full-Stack Web", href: "/services/full-stack-web" },
    { name: "WhatsApp API", href: "/services/whatsapp-api", isGreen: true },
    { name: "AI Agentic", href: "/services/agentic-ai" },
    { name: "Pricing & Scope", href: "/#pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const whatsAppLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Direct inquiry from main navigation bar",
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
                <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/brand/logo_compressed.png"
                  alt="ZFusionAI"
                  className="relative h-full w-full object-contain drop-shadow-[0_0_12px_rgba(37,211,102,0.4)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg md:text-xl text-white tracking-tight flex items-center gap-1.5">
                  ZFusionAI
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Free Tier
                  </span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 -mt-1 hidden sm:inline">
                  zfusionai.com
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`text-xs xl:text-sm font-medium cursor-pointer transition-colors ${
                    location === link.href
                      ? "text-emerald-400 font-bold"
                      : link.isGreen
                      ? "text-[#25D366] hover:text-[#25D366]/80 font-medium"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* WhatsApp Direct CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1faa4e] text-white font-bold text-xs shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all group"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden text-left"
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 ${
                    location === link.href ? "text-emerald-400 font-bold" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            ))}

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm mt-2 shadow-lg shadow-[#25D366]/30"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
