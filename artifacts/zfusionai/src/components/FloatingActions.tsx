import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const PHONE = "+971554712353";
const WHATSAPP_URL = `https://wa.me/971554712353?text=${encodeURIComponent(
  "Hi ZFusionAI, I'd like to discuss a project."
)}`;

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:shadow-[0_0_35px_rgba(37,211,102,0.65)] transition-shadow"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="h-6 w-6 relative z-10" fill="currentColor" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Chat on WhatsApp
        </span>
      </motion.a>

      <motion.a
        href={`tel:${PHONE}`}
        aria-label="Call ZFusionAI"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-black shadow-[0_0_25px_rgba(255,122,0,0.5)] hover:shadow-[0_0_35px_rgba(255,122,0,0.7)] transition-shadow"
      >
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        <Phone className="h-5 w-5 relative z-10" fill="currentColor" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          +971 55 471 2353
        </span>
      </motion.a>
    </div>
  );
}
