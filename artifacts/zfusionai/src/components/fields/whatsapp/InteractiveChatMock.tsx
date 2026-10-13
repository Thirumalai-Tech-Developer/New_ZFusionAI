import React, { useState } from "react";
import { Send, CheckCheck, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsappEngine";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  status?: "read" | "sent";
}

export default function InteractiveChatMock() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "⚡ Welcome to ZFusionAI WhatsApp Cloud API Simulator. Type any customer query to observe 0ms middleware response.",
      time: "12:00",
      status: "read",
    },
    {
      id: "2",
      sender: "user",
      text: "Can I test the Free Tier with 1,000 WhatsApp events?",
      time: "12:01",
      status: "read",
    },
    {
      id: "3",
      sender: "bot",
      text: "✅ Yes! The Free Developer Sandbox includes 1,000 monthly events, test webhooks, and zero platform markups. Click below to activate on your actual WhatsApp.",
      time: "12:01",
      status: "read",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText("");
    setIsProcessing(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `🤖 [ZFusionAI Edge API Webhook] Processed: "${currentInput}". Webhook latency: 8.4ms. Status: 200 OK. Ready to deploy to your live Meta account.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "read",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsProcessing(false);
    }, 450);
  };

  const freeTierLink = generateWhatsAppLink({
    service: "whatsapp-api",
    type: "free_tier_claim",
    tier: "FREE",
    scopeSummary: "Activating 1,000 Free WhatsApp API Events Sandbox",
  });

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 rounded-3xl liquid-glass p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row items-stretch gap-8">
        {/* Simulator Column */}
        <div className="flex-1 flex flex-col h-[460px] rounded-2xl bg-[#0b141a]/90 border border-emerald-500/30 overflow-hidden shadow-inner">
          {/* WhatsApp Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1f2c34] border-b border-emerald-500/20 text-white">
            <div className="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1f2c34]" />
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                ZFusionAI Cloud API
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  Verified Meta Partner
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">
                {isProcessing ? "Webhook Dispatching..." : "Online • 8ms Latency"}
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 text-xs md:text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "liquid-glass-bubble-out text-emerald-100"
                      : "liquid-glass-bubble-in text-slate-100"
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-emerald-300/80">
                    <span>{m.time}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 p-3 bg-[#1f2c34] border-t border-emerald-500/20"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Test the interactive WhatsApp bot response..."
              className="flex-1 bg-[#2a3942] text-white placeholder-slate-400 text-xs md:text-sm px-4 py-2.5 rounded-full border border-emerald-500/20 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isProcessing}
              className="p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition-transform active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Live Payload Stream & Free Tier Action */}
        <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE WEBHOOK STREAM</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">
              Liquid Glass Morphism. <br />
              <span className="text-emerald-400">Zero-Middleware Lag.</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every inbound WhatsApp message is instantly resolved via async edge webhooks. No clunky CRM delays, no third-party markups, and full Meta Cloud API compliance.
            </p>
          </div>

          {/* Webhook Stream Mock */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 font-mono text-[11px] text-slate-400 space-y-1.5">
            <div className="text-emerald-400 font-bold">POST /api/v1/whatsapp/webhook HTTP/1.1</div>
            <div>Host: api.zfusionai.com</div>
            <div>X-Hub-Signature-256: sha256=d6a9...8e1b (Verified)</div>
            <div className="text-emerald-300">HTTP 200 OK — Handled in 8.4ms</div>
          </div>

          {/* Free Tier Callout */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">
                DEVELOPER SANDBOX (FREE)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">1,000 msgs/mo</span>
            </div>
            <a
              href={freeTierLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Test on Your Own WhatsApp Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
