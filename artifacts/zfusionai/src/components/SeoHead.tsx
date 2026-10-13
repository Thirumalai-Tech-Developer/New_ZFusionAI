import { Helmet } from "react-helmet-async";
import { seoServiceLinks } from "@/pages/services";

const SITE_URL = "https://zfusionai.com";
const SITE_NAME = "ZFusionAI";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/logo_compressed.png`;
const PHONE_NUMBER = "+971 54 202 6653";

export interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ZFusionAI",
  alternateName: "ZFusionAI Dubai",
  description:
    "Next-Gen AI Agents, WhatsApp Web API Cloud Middleware & High-Frequency Web Development in Dubai, UAE.",
  url: SITE_URL,
  telephone: PHONE_NUMBER,
  email: "support@zfusionai.com",
  image: DEFAULT_OG_IMAGE,
  logo: DEFAULT_OG_IMAGE,
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
  sameAs: [
    "https://github.com/Thirumalai-Tech-Developer/New_ZFusionAI",
    "https://www.linkedin.com/company/zfusionai",
    "https://www.instagram.com/zfusionai",
  ],
};

export default function SeoHead({
  title,
  description,
  keywords = [],
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  schema,
}: SeoHeadProps) {
  const matchedSeoPage = seoServiceLinks.find((item) => item.slug === path);

  const finalTitle = matchedSeoPage
    ? `${matchedSeoPage.label} | ${SITE_NAME}`
    : title;

  const finalDescription = matchedSeoPage
    ? `${matchedSeoPage.label}. Custom AI agents, WhatsApp Cloud API middleware, and high-frequency web development for UAE businesses. Free tier available.`
    : description;

  const url = `${SITE_URL}${path}`;

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

  const schemaArray = Array.isArray(schema)
    ? [localBusinessSchema, breadcrumbSchema, ...schema]
    : schema
    ? [localBusinessSchema, breadcrumbSchema, schema]
    : [localBusinessSchema, breadcrumbSchema];

  return (
    <Helmet prioritizeSeoTags>
      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
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