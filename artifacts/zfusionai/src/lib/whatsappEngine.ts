/**
 * ZFusionAI WhatsApp-First Deep-Linking & Intent Routing Engine
 * Primary conversion mechanism across zfusionai.com
 */

export const WHATSAPP_CONFIG = {
  phone: "+971 54 202 6653",
  cleanPhone: "971542026653",
  businessName: "ZFusionAI Engineering Partner",
  defaultGreeting: "Hi ZFusionAI, I'm interested in discussing a project.",
};

export type ServiceDomain = "whatsapp-api" | "agentic-ai" | "fullstack" | "general";

export type IntentType =
  | "free_tier_claim"
  | "procedural_quote"
  | "whatsapp_api_demo"
  | "agentic_workflow_scoping"
  | "fullstack_architecture_review"
  | "general_inquiry";

export interface IntentPayload {
  service: ServiceDomain;
  type: IntentType;
  tier?: "FREE" | "SCALE" | "ENTERPRISE" | "PROCEDURAL";
  scopeSummary?: string;
  features?: string[];
  refSource?: string;
}

export function formatServiceName(service: ServiceDomain): string {
  switch (service) {
    case "whatsapp-api":
      return "WhatsApp Web API Integration";
    case "agentic-ai":
      return "AI Agentic Autonomous Build";
    case "fullstack":
      return "Full Stack Web Development";
    default:
      return "ZFusionAI Enterprise Suite";
  }
}

/**
 * Generates an authoritative, pre-populated WhatsApp Click-to-Chat URL
 * Supports deep-linking for mobile and WhatsApp Web for desktop
 */
export function generateWhatsAppLink(payload: IntentPayload): string {
  const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);
  const serviceTitle = formatServiceName(payload.service);

  const lines: string[] = [];

  if (payload.tier === "FREE" || payload.type === "free_tier_claim") {
    lines.push(
      `⚡ *[FREE TIER ACTIVATION REQUEST]*`,
      `Hello ZFusionAI Team, I would like to activate the *FREE TIER* for:`,
      `👉 *Service:* ${serviceTitle}`,
      `📌 *Domain:* zfusionai.com`,
      `🕒 *Timestamp:* ${timestamp}`,
      `---------------------------------`,
      `Please provision my free sandbox credentials and developer onboarding guide.`
    );
  } else if (payload.type === "procedural_quote") {
    lines.push(
      `📋 *[PROCEDURAL SCOPING SPECIFICATION]*`,
      `Hello ZFusionAI, I configured a custom architecture on zfusionai.com:`,
      `👉 *Target Service:* ${serviceTitle}`,
      `💼 *Deployment Tier:* ${payload.tier || "Custom Procedural"}`,
      payload.features && payload.features.length > 0
        ? `🔧 *Selected Modules:*\n• ${payload.features.join("\n• ")}`
        : `🔧 *Scope Summary:* ${payload.scopeSummary || "Full Custom Architecture"}`,
      `🕒 *Timestamp:* ${timestamp}`,
      `---------------------------------`,
      `Could we review technical feasibility and delivery timeline on WhatsApp?`
    );
  } else {
    lines.push(
      `👋 *[DIRECT INQUIRY - ZFusionAI]*`,
      `Hello ZFusionAI, I am inquiring about *${serviceTitle}*.`,
      `👉 *Scope Context:* ${payload.scopeSummary || "Custom Enterprise Integration"}`,
      `🕒 *Timestamp:* ${timestamp}`,
      `---------------------------------`,
      `Let's connect on WhatsApp.`
    );
  }

  const encodedText = encodeURIComponent(lines.join("\n"));

  // Check if client is mobile
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.cleanPhone}&text=${encodedText}`;
  }

  return `https://web.whatsapp.com/send?phone=${WHATSAPP_CONFIG.cleanPhone}&text=${encodedText}`;
}

/**
 * Standard quick prompt chips for conversion orb & floating widgets
 */
export const QUICK_PROMPTS = [
  {
    id: "free_whatsapp",
    label: "Claim Free WhatsApp API (1,000 msgs)",
    payload: {
      service: "whatsapp-api" as ServiceDomain,
      type: "free_tier_claim" as IntentType,
      tier: "FREE" as const,
    },
  },
  {
    id: "free_agent",
    label: "Deploy 1 Free AI Agent",
    payload: {
      service: "agentic-ai" as ServiceDomain,
      type: "free_tier_claim" as IntentType,
      tier: "FREE" as const,
    },
  },
  {
    id: "free_fullstack",
    label: "Free Full-Stack Blueprint",
    payload: {
      service: "fullstack" as ServiceDomain,
      type: "free_tier_claim" as IntentType,
      tier: "FREE" as const,
    },
  },
  {
    id: "chat_lead",
    label: "Chat with Lead Architect",
    payload: {
      service: "general" as ServiceDomain,
      type: "general_inquiry" as IntentType,
    },
  },
];
