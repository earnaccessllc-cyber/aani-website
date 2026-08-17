import { Helmet } from "react-helmet-async";

const SITE_NAME = "AANI";
const SITE_URL = "https://aanimetier.com";

/**
 * Per-page SEO tags: title, meta description, canonical, Open Graph/Twitter,
 * optional robots directive, and optional JSON-LD structured data.
 *
 * `path` must be the route's absolute path (e.g. "/collection") so the
 * canonical and og:url tags self-reference correctly.
 */
export default function SEO({
  title,
  description,
  path = "/",
  image,
  noindex = false,
  jsonLd,
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const jsonLdList = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLdList.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_NAME, SITE_URL };
