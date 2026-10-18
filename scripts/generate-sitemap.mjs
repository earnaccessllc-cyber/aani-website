// Writes dist/sitemap.xml after `vite build`, listing every style + colorway in
// src/lib/collectionData.js, so bags added there (e.g. via add-bag.mjs) show up
// in the sitemap without editing it by hand.
import { writeFileSync } from "node:fs";
import { COLLECTION_LINES } from "../src/lib/collectionData.js";

const SITE_URL = "https://aanimetier.com";

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/collection", changefreq: "weekly", priority: "0.9" },
  { path: "/metier", changefreq: "monthly", priority: "0.6" },
  { path: "/atelier", changefreq: "monthly", priority: "0.6" },
  { path: "/stockists", changefreq: "monthly", priority: "0.5" },
];

const productPages = COLLECTION_LINES.flatMap((line) =>
  line.colorways.map((cw) => ({
    path: `/collection/${line.id}/${cw.id}`,
    changefreq: "weekly",
    priority: "0.8",
  })),
);

const urls = [...STATIC_PAGES, ...productPages]
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n");

writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);
console.log(`sitemap: wrote ${STATIC_PAGES.length + productPages.length} URLs`);
