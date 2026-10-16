/**
 * Single source of truth for crawlable routes.
 *
 * Pure data (no React imports) so it can be used both by the app (SeoHead,
 * router) and by the Vite build plugin that prerenders per-route <head> tags,
 * crawler fallback content and sitemap.xml.
 */

export const SITE_URL = "https://zfusionai.com";
export const SITE_NAME = "ZFusionAI";
export const PHONE_NUMBER = "+971 54 202 6653";
export const SUPPORT_EMAIL = "support@zfusionai.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/og-image.png`;
export const LOGO_URL = `${SITE_URL}/brand/icon-512.png`;

export type ChangeFreq = "daily" | "weekly" | "monthly" | "yearly";

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  /** Short, quotable answer used in crawler fallback content (AEO/GEO). */
  summary?: string;
  changefreq: ChangeFreq;
  priority: number;
};

type Category = "web" | "ai" | "mobile" | "software";

export const seoServiceLinks: { slug: string; label: string; category: Category }[] = [
  { slug: "/web-development-dubai", label: "Web Development Company in Dubai", category: "web" },
  { slug: "/website-development-dubai", label: "Website Development Dubai for Businesses", category: "web" },
  { slug: "/web-design-dubai", label: "Web Design Dubai", category: "web" },
  { slug: "/website-redesign-dubai", label: "Website Redesign Dubai", category: "web" },
  { slug: "/ecommerce-development-dubai", label: "Ecommerce Website Development Dubai", category: "web" },
  { slug: "/landing-page-design-dubai", label: "Landing Page Design Dubai", category: "web" },
  { slug: "/small-business-website-dubai", label: "Small Business Website Dubai", category: "web" },
  { slug: "/startup-website-dubai", label: "Startup Website Dubai", category: "web" },
  { slug: "/restaurant-website-dubai", label: "Restaurant Website Dubai", category: "web" },
  { slug: "/real-estate-website-dubai", label: "Real Estate Website Development Dubai", category: "web" },
  { slug: "/clinic-website-dubai", label: "Clinic Website Development Dubai", category: "web" },
  { slug: "/responsive-web-design-dubai", label: "Responsive Web Design Dubai", category: "web" },
  { slug: "/premium-website-dubai", label: "Premium Website Dubai", category: "web" },
  { slug: "/fast-website-dubai", label: "Fast Website Development Dubai", category: "web" },

  { slug: "/ai-company-dubai", label: "AI Company in Dubai", category: "ai" },
  { slug: "/ai-development-dubai", label: "AI Development Dubai", category: "ai" },
  { slug: "/ai-automation-dubai", label: "AI Automation Solutions Dubai", category: "ai" },
  { slug: "/chatbot-development-dubai", label: "AI Chatbot Development Dubai", category: "ai" },
  { slug: "/whatsapp-chatbot-dubai", label: "WhatsApp Chatbot Dubai", category: "ai" },
  { slug: "/lead-automation-dubai", label: "Lead Automation Dubai", category: "ai" },
  { slug: "/crm-automation-dubai", label: "CRM Automation Dubai", category: "ai" },
  { slug: "/workflow-automation-dubai", label: "Workflow Automation Dubai", category: "ai" },
  { slug: "/gpt-integration-dubai", label: "GPT Integration Dubai", category: "ai" },
  { slug: "/openai-development-dubai", label: "OpenAI Development Dubai", category: "ai" },
  { slug: "/voicebot-dubai", label: "AI Voice Bot Dubai", category: "ai" },

  { slug: "/mobile-app-development-dubai", label: "Mobile App Development Dubai", category: "mobile" },
  { slug: "/android-app-development-dubai", label: "Android App Development Dubai", category: "mobile" },
  { slug: "/ios-app-development-dubai", label: "iOS App Development Dubai", category: "mobile" },
  { slug: "/flutter-development-dubai", label: "Flutter App Development Dubai", category: "mobile" },
  { slug: "/react-native-dubai", label: "React Native Development Dubai", category: "mobile" },
  { slug: "/food-delivery-app-dubai", label: "Food Delivery App Dubai", category: "mobile" },
  { slug: "/booking-app-dubai", label: "Booking App Dubai", category: "mobile" },
  { slug: "/marketplace-app-dubai", label: "Marketplace App Dubai", category: "mobile" },

  { slug: "/custom-software-dubai", label: "Custom Software Development Dubai", category: "software" },
  { slug: "/react-development-dubai", label: "React Development Company Dubai", category: "software" },
];

/** Alternate URLs that render a dedicated page; they canonicalise to the target. */
export const aliasRoutes: Record<string, string> = {
  "/whatsapp-web-api-integration": "/services/whatsapp-api",
  "/whatsapp-chatbot-dubai": "/services/whatsapp-api",
  "/whatsapp-automation-dubai": "/services/whatsapp-api",
  "/ai-agentic-build": "/services/agentic-ai",
  "/ai-company-dubai": "/services/agentic-ai",
  "/ai-development-dubai": "/services/agentic-ai",
  "/full-stack-web-development": "/services/full-stack-web",
  "/web-development-dubai": "/services/full-stack-web",
};

const categoryCopy: Record<Category, string> = {
  web: "Fast, SEO-ready websites and web apps built with React, TypeScript and PostgreSQL",
  ai: "Custom AI agents, chatbots and WhatsApp automation powered by large language models",
  mobile: "Native-quality iOS and Android apps built with Flutter and React Native",
  software: "Custom software, dashboards and integrations engineered for scale",
};

export function landingDescription(label: string, category: Category): string {
  return `${label} by ZFusionAI. ${categoryCopy[category]} for businesses in Dubai and the UAE. Free consultation on WhatsApp ${PHONE_NUMBER}.`;
}

export const staticRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "ZFusionAI | AI Agents, Web App AI Chat & WhatsApp Automation in Dubai",
    description:
      "Build AI agents, add AI chat to your web app, and automate WhatsApp on the official Cloud API. Dubai, UAE. Free trial: 1,000 messages, sign in with Google or GitHub.",
    summary:
      "ZFusionAI is a Dubai, UAE software and AI company with three products: AI agents with an OpenAI-compatible API, an AI chat widget for web apps, and WhatsApp AI automation on Meta's official Cloud API. Every new account gets a free trial of 1,000 messages shared across all three. ZFusionAI also builds custom full-stack web applications.",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/services/whatsapp-api",
    title: "WhatsApp AI Automation API: Free Trial with 1,000 Messages | ZFusionAI",
    description:
      "AI auto-replies and a REST API for the official WhatsApp Business Cloud API. Start free with 1,000 messages: sign in with Google or GitHub, no credit card.",
    summary:
      "The ZFusionAI WhatsApp AI Automation API connects to Meta's official WhatsApp Business Cloud API, answers customers automatically with an AI agent, and lets developers send messages over a REST API. New accounts get a free trial of 1,000 messages.",
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    path: "/services/agentic-ai",
    title: "AI Agents API with Tool Calling, OpenAI-Compatible: Free Trial | ZFusionAI",
    description:
      "Build AI agents that call your APIs as tools, then run them through a REST API or any OpenAI SDK. Free trial with 1,000 messages. Custom agent development in Dubai.",
    summary:
      "ZFusionAI AI Agents let businesses create agents with instructions and HTTPS webhook tools, and run them through a REST API or an OpenAI-compatible /v1/chat/completions endpoint. New accounts get 1,000 free trial messages. ZFusionAI also builds custom autonomous agents for companies in Dubai and the UAE.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/services/full-stack-web",
    title: "Full-Stack Web App Development & AI Chat Widget for Web Apps | ZFusionAI",
    description:
      "Custom web applications built with React, TypeScript and Node.js in Dubai, plus a one-line AI chat widget for any web app. Free trial: 1,000 messages.",
    summary:
      "ZFusionAI builds high-performance custom web applications in Dubai using React, TypeScript, Node.js and PostgreSQL. Its web app AI chat widget adds an AI agent to any website with one script tag, and is free for the first 1,000 messages.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/services",
    title: "Web Development, AI Solutions & Software Services in UAE | ZFusionAI",
    description:
      "Professional website development, AI systems, mobile apps, CRM software and automation services for businesses in Dubai and all UAE.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/industries",
    title: "Industries We Serve | Enterprise AI & Software in UAE | ZFusionAI",
    description:
      "Bespoke AI, WhatsApp API, and full-stack software engineered for Real Estate, Healthcare, Retail, Logistics, Hospitality, and Finance across Dubai & UAE.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/about",
    title: "About ZFusionAI | Elite AI & Full-Stack Engineering Team in Dubai",
    description:
      "ZFusionAI is a Dubai engineering company specializing in WhatsApp AI automation, autonomous AI agents, and fast full-stack web platforms.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    title: "WhatsApp Direct Contact | ZFusionAI Engineering Partner",
    description:
      "Connect directly with ZFusionAI senior engineers on WhatsApp (+971 54 202 6653) for instant scoping and free trial activations.",
    changefreq: "monthly",
    priority: 0.85,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | ZFusionAI Dubai Data Sovereignty & UAE PDPL",
    description:
      "Privacy framework for ZFusionAI: zero data harvesting, Meta WhatsApp Cloud API security, encrypted credentials and UAE PDPL compliance.",
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    title: "Terms & Conditions | ZFusionAI Dubai Enterprise Software",
    description:
      "Commercial terms and intellectual property governance for ZFusionAI software engineering, WhatsApp AI automation API and AI systems.",
    changefreq: "yearly",
    priority: 0.3,
  },
];

/** Keyword landing pages that have no dedicated page (rendered by the services page). */
export const landingRoutes: SeoRoute[] = seoServiceLinks
  .filter((item) => !(item.slug in aliasRoutes))
  .map((item) => ({
    path: item.slug,
    title: `${item.label} | ${SITE_NAME}`,
    description: landingDescription(item.label, item.category),
    changefreq: "monthly" as const,
    priority: 0.7,
  }));

/** Every canonical, indexable URL (what goes into sitemap.xml). */
export const indexableRoutes: SeoRoute[] = [...staticRoutes, ...landingRoutes];

/** Routes that must never be indexed. */
export const privateRoutes = ["/login", "/signup", "/dashboard"];
