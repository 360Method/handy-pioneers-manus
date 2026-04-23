/**
 * SEO — per-page metadata component.
 *
 * React 19 natively hoists <title>, <meta>, and <link> tags rendered
 * inside any component up to <head>. We rely on that instead of a
 * third-party helmet library — fewer deps, simpler mental model.
 *
 * Pass a unique canonical URL, title, and description on every page
 * that mounts this. og:* and twitter:* mirror the same content.
 *
 * Voice: we're talking to an affluent Clark County homeowner who
 * wants restoration specialists, not handymen-of-the-week.
 */

const SITE_URL = "https://handypioneers.com";
const SITE_NAME = "Handy Pioneers";
const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/og-image_c4d500b1.jpg";

export interface SEOProps {
  path: string;
  title: string;
  description: string;
  image?: string;
  ogType?: "website" | "article" | "product";
  publishedTime?: string;
  author?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function normaliseCanonical(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${"https://handypioneers.com"}${path}`;
}

export default function SEO({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  publishedTime,
  author,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const canonical = normaliseCanonical(path);
  const jsonLdBlocks = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {author ? <meta property="article:author" content={author} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdBlocks.map((block, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
