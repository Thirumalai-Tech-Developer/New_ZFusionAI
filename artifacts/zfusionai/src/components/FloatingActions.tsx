import React, { useState } from "react";
import { MessageSquare, Sparkles, X, ChevronUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateWhatsAppLink, QUICK_PROMPTS } from "@/lib/whatsappEngine";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const directDefaultLink = generateWhatsAppLink({
    service: "general",
    type: "general_inquiry",
    scopeSummary: "Direct inquiry from floating conversation dock",
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Quick Prompt Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-emerald-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-left space-y-3 mb-2"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  WhatsApp Direct Desk
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close dock"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-snug">
              Select an instant activation chip to open directly in WhatsApp with pre-filled context:
            </p>

            <div className="space-y-2">
              {QUICK_PROMPTS.map((prompt) => (
                <a
                  key={prompt.id}
                  href={generateWhatsAppLink(prompt.payload)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-xs font-medium text-slate-200 hover:text-emerald-300 transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>{prompt.label}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              ))}
            </div>

            <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>● Senior Architects Online</span>
              <span>Sub-1m Response</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-3">
        {/* Toggle Intent Drawer Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-xs font-mono text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-lg transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isOpen ? "Hide Options" : "Quick Actions (Free Tiers)"}</span>
          <ChevronUp
            className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Pulsing Liquid WhatsApp Orb */}
        <motion.a
          href={directDefaultLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect directly on WhatsApp"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:shadow-[0_0_45px_rgba(37,211,102,0.75)] transition-shadow"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
          <MessageSquare className="h-6 w-6 relative z-10 fill-current" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-950/95 backdrop-blur px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-emerald-500/30">
            WhatsApp Lead Architect
          </span>
        </motion.a>
      </div>
    </div>
  );
}
