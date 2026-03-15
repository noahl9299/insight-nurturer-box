import { Helmet } from "react-helmet-async";

const SITE_NAME = "katzenbett.de";
const SITE_URL = "https://katzenbett.de";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
const TWITTER_HANDLE = "@katzenbettde";

interface SEOProps {
  title: string;
  description: string;
  /** Full canonical URL, e.g. https://katzenbett.de/katzenhoehlen */
  canonical?: string;
  /** og:type – defaults to "website" */
  type?: "website" | "article" | "product";
  /** Absolute URL for og:image / twitter:image */
  image?: string;
  /** Article-specific: ISO date string */
  datePublished?: string;
  dateModified?: string;
  author?: string;
  /** Product-specific */
  priceAmount?: string;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock";
  /** Prevent indexing (e.g. 404, filtered pages) */
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  canonical,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  datePublished,
  dateModified,
  author,
  priceAmount,
  priceCurrency = "EUR",
  availability,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? SITE_URL;

  return (
    <Helmet>
      {/* Core */}
      <html lang="de" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="de_DE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article-specific */}
      {type === "article" && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {type === "article" && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Product-specific */}
      {type === "product" && priceAmount && (
        <meta property="product:price:amount" content={priceAmount} />
      )}
      {type === "product" && priceAmount && (
        <meta property="product:price:currency" content={priceCurrency} />
      )}
      {type === "product" && availability && (
        <meta property="product:availability" content={availability} />
      )}
    </Helmet>
  );
}
