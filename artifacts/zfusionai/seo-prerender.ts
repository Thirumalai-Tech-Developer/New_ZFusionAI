/**
 * Build-time SEO prerender for the SPA.
 *
 * For every indexable route this writes `dist/public/<route>/index.html` with
 * route-specific <title>, meta description, canonical, Open Graph and Twitter
 * tags, plus crawlable fallback HTML inside #root (H1, answer summary, FAQs,
 * NAP and internal links). AI crawlers that don't execute JavaScript (GPTBot,
 * ClaudeBot, PerplexityBot...) therefore see real content. React replaces the
 * fallback on mount. It also generates sitemap.xml from the same route table.
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import {
  aliasRoutes,
  DEFAULT_OG_IMAGE,
  indexableRoutes,
  PHONE_NUMBER,
  privateRoutes,
  SITE_NAME,
  SITE_URL,
  staticRoutes,
  SUPPORT_EMAIL,
  type SeoRoute,
} from "./src/seo/routes";
import {
  agenticFaqs,
  agenticSteps,
  trialSteps,
  webFaqs,
  webSteps,
  whatsappFaqs,
  type Faq,
  type Step,
} from "./src/seo/content";

const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const canonicalUrl = (p: string) => `${SITE_URL}${p === "/" ? "/" : p}`;

const faqsByPath: Record<string, Faq[]> = {
  "/services/whatsapp-api": whatsappFaqs,
  "/services/agentic-ai": agenticFaqs,
  "/services/full-stack-web": webFaqs,
};

const stepsByPath: Record<string, { heading: string; steps: Step[] }> = {
  "/services/whatsapp-api": { heading: "How to start the WhatsApp AI automation free trial", steps: trialSteps },
  "/services/agentic-ai": { heading: "How to build and run an AI agent for free", steps: agenticSteps },
  "/services/full-stack-web": { heading: "How to add an AI chat widget to your web app", steps: webSteps },
};

function headTags(route: SeoRoute, opts: { canonicalPath?: string; noindex?: boolean } = {}) {
  const url = canonicalUrl(opts.canonicalPath ?? route.path);
  const robots = opts.noindex
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...(opts.noindex
      ? []
      : [
          `<link rel="alternate" hreflang="en-ae" href="${url}" />`,
          `<link rel="alternate" hreflang="x-default" href="${url}" />`,
        ]),
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_AE" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}: WhatsApp AI Automation API, AI agents and web development in Dubai" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  ];

  const faqs = faqsByPath[route.path];
  if (faqs && !opts.noindex) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }).replace(/</g, "\\u003c")}</script>`,
    );
  }

  // Marked so main.tsx can remove them once <SeoHead /> (react-helmet) takes over.
  return tags
    .map((t) => t.replace(/^<(\w+)/, "<$1 data-seo-static"))
    .join("\n    ");
}

const navLinks = [
  ["/", "Home"],
  ["/services/agentic-ai", "AI Agents API (free trial)"],
  ["/services/full-stack-web", "Web App AI Chat & Development"],
  ["/services/whatsapp-api", "WhatsApp AI Automation (free trial)"],
  ["/services", "All services"],
  ["/industries", "Industries"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

function bodyFallback(route: SeoRoute) {
  const h1 = route.title.split(" | ")[0]!;
  const faqs = faqsByPath[route.path] ?? [];
  const howTo = stepsByPath[route.path];
  const steps = howTo
    ? `<h2>${esc(howTo.heading)}</h2><ol>${howTo.steps
        .map((s) => `<li><strong>${esc(s.title)}.</strong> ${esc(s.text)}</li>`)
        .join("")}</ol><p><a href="/login">Start the free trial: 1,000 messages</a></p>`
    : "";

  return `<div data-seo-fallback style="max-width:960px;margin:0 auto;padding:96px 16px;color:#e2e8f0;font-family:system-ui,sans-serif;line-height:1.6">
      <nav aria-label="Main">${navLinks.map(([href, label]) => `<a href="${href}" style="color:#34d399;margin-right:16px">${esc(label!)}</a>`).join("")}</nav>
      <main>
        <h1>${esc(h1)}</h1>
        <p>${esc(route.summary ?? route.description)}</p>
        ${steps}
        ${faqs.length ? `<h2>Frequently asked questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : ""}
      </main>
      <footer>
        <p><strong>${SITE_NAME}</strong>, Downtown Dubai, United Arab Emirates. WhatsApp/phone: <a href="tel:${PHONE_NUMBER.replace(/\s/g, "")}">${PHONE_NUMBER}</a>. Email: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
      </footer>
    </div>`;
}

function render(template: string, route: SeoRoute, opts: { canonicalPath?: string; noindex?: boolean } = {}) {
  return template
    .replace("<!--seo-head-->", headTags(route, opts))
    .replace("<!--seo-body-->", opts.noindex ? "" : bodyFallback(route));
}

function writeRoute(outDir: string, routePath: string, html: string) {
  const file =
    routePath === "/"
      ? path.join(outDir, "index.html")
      : path.join(outDir, routePath.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function sitemap(lastmod: string) {
  const urls = indexableRoutes
    .map(
      (r) =>
        `  <url>\n    <loc>${canonicalUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(2)}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function seoPrerender(): Plugin {
  let outDir = "";
  const home = staticRoutes.find((r) => r.path === "/")!;

  return {
    name: "zfusionai-seo-prerender",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    // Dev server: inject homepage tags so the page has sensible defaults.
    transformIndexHtml(html, ctx) {
      return ctx.server ? html.replace("<!--seo-head-->", headTags(home)) : html;
    },
    closeBundle() {
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return;
      const template = fs.readFileSync(indexFile, "utf8");

      for (const route of indexableRoutes) {
        writeRoute(outDir, route.path, render(template, route));
      }

      for (const [alias, target] of Object.entries(aliasRoutes)) {
        const route = indexableRoutes.find((r) => r.path === target);
        if (route) writeRoute(outDir, alias, render(template, route, { canonicalPath: target }));
      }

      for (const p of privateRoutes) {
        writeRoute(
          outDir,
          p,
          render(
            template,
            { path: p, title: `Sign in | ${SITE_NAME}`, description: "Sign in to ZFusionAI.", changefreq: "yearly", priority: 0 },
            { noindex: true },
          ),
        );
      }

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap(new Date().toISOString().slice(0, 10)));
    },
  };
}
