import { Helmet } from "react-helmet-async";
import { seoServiceLinks } from "@/pages/services";

const SITE_URL = "https://zfusionai.info";
const SITE_NAME = "ZFusionAI";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

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
  description:
    "AI, web, mobile and automation development company in Dubai, UAE.",
  url: SITE_URL,
  telephone: "+971 55 471 2353",
  email: "support@zfusionai.info",
  image: DEFAULT_OG_IMAGE,
  logo: DEFAULT_OG_IMAGE,
  priceRange: "AED 599+",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
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
    ? `${matchedSeoPage.label}. Custom AI, websites, mobile apps and software solutions for Dubai businesses. Contact ZFusionAI today.`
    : description;

  const url = `${SITE_URL}${path}`;

  const schemaArray = Array.isArray(schema)
    ? [localBusinessSchema, ...schema]
    : schema
    ? [localBusinessSchema, schema]
    : [localBusinessSchema];

  return (
    <Helmet prioritizeSeoTags>
      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index,follow,max-image-preview:large" />

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

      {/* Geo */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaArray)}
      </script>
    </Helmet>
  );
}