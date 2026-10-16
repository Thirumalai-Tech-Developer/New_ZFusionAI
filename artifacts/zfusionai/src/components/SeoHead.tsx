import { Helmet } from "react-helmet-async";
import {
  aliasRoutes,
  DEFAULT_OG_IMAGE,
  landingDescription,
  LOGO_URL,
  PHONE_NUMBER,
  seoServiceLinks,
  SITE_NAME,
  SITE_URL,
  staticRoutes,
  SUPPORT_EMAIL,
} from "@/seo/routes";

export interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown> | Record<string, unknown>[];
  /** Private/app pages: keep out of search indexes. */
  noindex?: boolean;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "ZFusionAI",
  alternateName: "ZFusionAI Dubai",
  description:
    "Next-Gen AI Agents, WhatsApp Web API Cloud Middleware & High-Frequency Web Development in Dubai, UAE.",
  url: SITE_URL,
  telephone: PHONE_NUMBER,
  email: SUPPORT_EMAIL,
  image: DEFAULT_OG_IMAGE,
  logo: LOGO_URL,
  priceRange: "Free Tier Available / AED 0+",
  currenciesAccepted: "AED, USD, EUR",
  paymentAccepted: "Credit Card, Wire Transfer, Crypto",
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Dubai",
    },
    {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Downtown Dubai",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "00000",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  knowsAbout: [
    "WhatsApp Business Cloud API",
    "WhatsApp AI chatbots",
    "AI agents",
    "Large language models",
    "Full-stack web development",
    "Mobile app development",
  ],
  makesOffer: {
    "@type": "Offer",
    name: "WhatsApp AI Automation API free trial (1,000 messages)",
    price: "0",
    priceCurrency: "AED",
    url: `${SITE_URL}/services/whatsapp-api`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_NUMBER,
    contactType: "sales",
    availableLanguage: ["English", "Arabic"],
    areaServed: "AE",
  },
  sameAs: [
    "https://github.com/Thirumalai-Tech-Developer/New_ZFusionAI",
    "https://www.linkedin.com/company/zfusionai",
    "https://www.instagram.com/zfusionai",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-AE",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function SeoHead({
  title,
  description,
  keywords = [],
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  schema,
  noindex = false,
}: SeoHeadProps) {
  const matchedSeoPage = seoServiceLinks.find((item) => item.slug === path);
  // routes.ts is the source of truth so client tags match the prerendered HTML.
  const routeMeta = staticRoutes.find((r) => r.path === path);

  const finalTitle = matchedSeoPage
    ? `${matchedSeoPage.label} | ${SITE_NAME}`
    : routeMeta?.title ?? title;

  const finalDescription = matchedSeoPage
    ? landingDescription(matchedSeoPage.label, matchedSeoPage.category)
    : routeMeta?.description ?? description;

  // Alias URLs consolidate onto their dedicated page.
  const canonicalPath = aliasRoutes[path] ?? path;
  const url = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;

  // Generate BreadcrumbList Schema for GEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...(path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: finalTitle.split("|")[0].trim(),
              item: url,
            },
          ]
        : []),
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: finalTitle,
    description: finalDescription,
    inLanguage: "en-AE",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[aria-label='AEO Definition Block'] p"],
    },
  };

  const baseSchemas = [localBusinessSchema, websiteSchema, webPageSchema, breadcrumbSchema];
  const schemaArray = Array.isArray(schema)
    ? [...baseSchemas, ...schema]
    : schema
    ? [...baseSchemas, schema]
    : baseSchemas;

  return (
    <Helmet prioritizeSeoTags>
      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <meta name="author" content={SITE_NAME} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex,nofollow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />

      {/* Canonical + language targeting */}
      <link rel="canonical" href={url} />
      {!noindex && <link rel="alternate" hrefLang="en-ae" href={url} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={url} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME}: WhatsApp AI Automation API, AI agents and web development in Dubai`} />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* GEO Meta Tags */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai, United Arab Emirates" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* AEO (Answer Engine Optimization) Citation Directives */}
      <meta name="citation_title" content={finalTitle} />
      <meta name="citation_author" content={SITE_NAME} />
      <meta name="citation_publisher" content={SITE_NAME} />
      <meta name="ai-citation" content="eligible" />

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaArray)}
      </script>
    </Helmet>
  );
}