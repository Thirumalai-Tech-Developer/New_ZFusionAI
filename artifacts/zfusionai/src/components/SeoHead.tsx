import { Helmet } from "react-helmet-async";

const SITE_URL = "https://zfusionai.info";
const SITE_NAME = "ZFusionAI";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/logo.png`;

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
  telephone: "+971 54 202 66 53",
  email: "support@zfusionai.info",
  image: DEFAULT_OG_IMAGE,
  logo: DEFAULT_OG_IMAGE,
  priceRange: "AED 599+",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
    "United Arab Emirates",
  ],
  sameAs: [],
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
  const url = `${SITE_URL}${path}`;
  const schemaArray = Array.isArray(schema)
    ? [localBusinessSchema, ...schema]
    : schema
    ? [localBusinessSchema, schema]
    : [localBusinessSchema];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaArray)}
      </script>
    </Helmet>
  );
}
