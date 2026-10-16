/** Pure-data page copy shared by pages and the build-time prerenderer. */

export type Faq = { q: string; a: string };

export const trialSteps = [
  {
    title: "Sign in with Google or GitHub",
    text: "Create your ZFusionAI account in one click. Your free trial with 1,000 WhatsApp messages is activated instantly, with no credit card.",
  },
  {
    title: "Connect your WhatsApp Business number",
    text: "Paste your Phone Number ID and access token from Meta for Developers. Credentials are encrypted at rest with AES-256-GCM.",
  },
  {
    title: "Describe how your AI agent should answer",
    text: "Write instructions with your business details, tone and FAQs, then test replies in the built-in AI playground.",
  },
  {
    title: "Paste the webhook into Meta and go live",
    text: "Copy your callback URL and verify token into the WhatsApp configuration page. Incoming customer messages now get AI replies 24/7.",
  },
];

export const whatsappFaqs: Faq[] = [
  {
    q: "Does ZFusionAI offer a free trial for its WhatsApp API?",
    a: "Yes. Every new ZFusionAI account receives a free trial of 1,000 messages, shared across WhatsApp automation, AI agents and the web app chat widget. It includes AI auto-replies, the REST API, API keys and webhooks. No credit card is required: sign in with Google or GitHub.",
  },
  {
    q: "What counts as one message in the free trial?",
    a: "Each outbound WhatsApp message counts as one message, whether it is sent through the API, from the dashboard, or as an AI auto-reply. Inbound customer messages are free. Failed deliveries are refunded automatically.",
  },
  {
    q: "How does the WhatsApp AI auto-reply work?",
    a: "When a customer messages your WhatsApp Business number, Meta sends the message to your ZFusionAI webhook. The AI agent reads the recent conversation, follows your instructions, and replies within seconds using an OpenAI-compatible language model.",
  },
  {
    q: "Do I need the official WhatsApp Business Cloud API?",
    a: "Yes. ZFusionAI connects to Meta's official WhatsApp Business Cloud API, so your number stays compliant and is not at risk of being banned like unofficial WhatsApp Web automation tools.",
  },
  {
    q: "Can I send WhatsApp messages from my own app or CRM?",
    a: "Yes. Create an API key in the dashboard and call POST /api/v1/messages with a recipient and text or template. You can also call /api/v1/ai/reply to generate and send an AI answer in one request.",
  },
  {
    q: "Does ZFusionAI add markup to Meta's WhatsApp conversation fees?",
    a: "No. You pay Meta's conversation charges directly through your own WhatsApp Business Account. ZFusionAI only meters the messages sent through its platform against your trial or plan allowance.",
  },
  {
    q: "Is ZFusionAI available outside Dubai and the UAE?",
    a: "Yes. ZFusionAI is based in Dubai, UAE and serves businesses in the GCC, India and worldwide. The AI agent replies in the customer's language, including English and Arabic.",
  },
];

export type Step = { title: string; text: string };

export const agenticSteps: Step[] = [
  {
    title: "Sign in with Google or GitHub",
    text: "Your free trial starts instantly with 1,000 messages shared across AI agents, the web widget and WhatsApp. No credit card.",
  },
  {
    title: "Create an agent",
    text: "Give it instructions and optional HTTPS webhook tools, such as order lookup, booking or CRM search, described with JSON Schema.",
  },
  {
    title: "Test it in the dashboard",
    text: "Chat with the agent and watch each tool call it makes. Test runs are free.",
  },
  {
    title: "Call it from your code",
    text: "Use POST /api/v1/agents/{id}/runs, or point any OpenAI SDK at ZFusionAI and set the model to agent:{id}.",
  },
];

export const agenticFaqs: Faq[] = [
  {
    q: "Can I try ZFusionAI AI agents for free?",
    a: "Yes. Every new account gets a free trial of 1,000 messages that covers AI agent runs, web widget replies and WhatsApp messages. Sign in with Google or GitHub. No credit card is required.",
  },
  {
    q: "What is an AI agent and how is it different from a chatbot?",
    a: "A chatbot only generates text. A ZFusionAI agent can also call tools: it decides when to call your HTTPS webhooks (for example, to look up an order or check availability), reads the results, and uses them in its answer. It can take up to five tool steps per run.",
  },
  {
    q: "Is the ZFusionAI agent API compatible with the OpenAI SDK?",
    a: "Yes. ZFusionAI exposes an OpenAI-compatible /v1/chat/completions endpoint. Set the SDK base URL to https://zfusionai.com/api/v1, use your zf_live_ API key, and set the model to agent:<agent id>, or to default for a plain completion.",
  },
  {
    q: "Which language models power the agents?",
    a: "Agents run on any OpenAI-compatible model through ZFusionAI's AI gateway, so models can be swapped without changing your integration.",
  },
  {
    q: "How are agent tool calls secured?",
    a: "Tool URLs must be public HTTPS endpoints. Every call is signed with an HMAC-SHA256 X-ZFusion-Signature header using a per-agent secret, so your server can verify the request came from ZFusionAI.",
  },
  {
    q: "Can the same agent answer on WhatsApp and on my website?",
    a: "Yes. One agent can power the web app chat widget, answer WhatsApp customers through the official Cloud API, and serve API calls from your backend.",
  },
];

export const webSteps: Step[] = [
  {
    title: "Create a free account",
    text: "Sign in with Google or GitHub to get 1,000 free trial messages.",
  },
  {
    title: "Build an AI agent",
    text: "Write what it should know about your business and, optionally, connect webhook tools.",
  },
  {
    title: "Enable the web widget",
    text: "Choose a welcome message and brand colour, and restrict it to your domains.",
  },
  {
    title: "Paste one script tag",
    text: "Add <script src=\"https://zfusionai.com/widget.js\" data-agent=\"pub_…\"> to any website or web app: React, Next.js, WordPress, Shopify or plain HTML.",
  },
];

export const webFaqs: Faq[] = [
  {
    q: "How do I add an AI chatbot to my website or web app?",
    a: "Create a free ZFusionAI account, build an agent, enable its web widget and paste the one-line script tag into your site. The chat bubble appears immediately and answers visitors with your agent.",
  },
  {
    q: "Is the website AI chat widget free?",
    a: "The free trial includes 1,000 messages shared across the web widget, AI agent API and WhatsApp. Each widget reply uses one message.",
  },
  {
    q: "Does the widget slow down my website?",
    a: "No. widget.js is a small dependency-free script that loads asynchronously and renders inside a Shadow DOM, so it doesn't affect your page's styles or Core Web Vitals.",
  },
  {
    q: "Can ZFusionAI also build my full web application?",
    a: "Yes. ZFusionAI is a Dubai-based full-stack development company that builds custom web applications with React, TypeScript, Node.js and PostgreSQL, and can integrate AI agents directly into them.",
  },
];

/** JSON-LD for a free-trial product page: SoftwareApplication + HowTo + FAQPage. */
export function trialSchema(opts: {
  path: string;
  name: string;
  description: string;
  category: string;
  steps: Step[];
  faqs: Faq[];
}) {
  const url = `https://zfusionai.com${opts.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: opts.name,
      description: opts.description,
      applicationCategory: opts.category,
      operatingSystem: "Web, Cloud",
      url,
      provider: { "@id": "https://zfusionai.com/#organization" },
      offers: {
        "@type": "Offer",
        name: "Free trial: 1,000 messages",
        price: "0",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: "https://zfusionai.com/login",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: `How to start with ${opts.name}`,
      step: opts.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: opts.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}
