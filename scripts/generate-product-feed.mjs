// Writes dist/products.xml after `vite build`: a Google Merchant Center feed
// with one item per style + colorway in src/lib/collectionData.js. Point
// Merchant Center at https://aanimetier.com/products.xml as a scheduled fetch
// and new bags, price changes and sold-out colors flow through on each deploy.
import { writeFileSync } from "node:fs";
import { COLLECTION_LINES } from "../src/lib/collectionData.js";

const SITE_URL = "https://aanimetier.com";
// Google's taxonomy id for Apparel & Accessories > Handbags, Wallets & Cases > Handbags.
const GOOGLE_CATEGORY = "3032";

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
const absoluteUrl = (src) => (/^https?:\/\//.test(src) ? src : `${SITE_URL}${src}`);

const items = COLLECTION_LINES.flatMap((line) =>
  line.colorways.map((cw) => {
    const fields = {
      "g:id": `${line.id}-${cw.id}`,
      "g:item_group_id": line.id,
      "g:title": `${line.name} in ${cw.label}`,
      "g:description": `${line.description} ${line.material}.`,
      "g:link": `${SITE_URL}/collection/${line.id}/${cw.id}`,
      "g:image_link": absoluteUrl(cw.front),
      "g:additional_image_link": cw.back ? absoluteUrl(cw.back) : null,
      "g:availability": cw.soldOut ? "out_of_stock" : "in_stock",
      "g:price": `${Number(line.price).toFixed(2)} USD`,
      "g:brand": "AANI",
      "g:condition": "new",
      "g:identifier_exists": "no",
      "g:google_product_category": GOOGLE_CATEGORY,
      "g:product_type": `Handbags > ${line.subtitle}`,
      "g:color": cw.label,
      "g:material": line.material,
      "g:gender": "female",
      "g:age_group": "adult",
    };
    const body = Object.entries(fields)
      .filter(([, v]) => v != null && v !== "")
      .map(([k, v]) => `      <${k}>${escapeXml(v)}</${k}>`)
      .join("\n");
    return `    <item>\n${body}\n    </item>`;
  }),
);

writeFileSync(
  "dist/products.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>AANI</title>
    <link>${SITE_URL}</link>
    <description>AANI Italian leather handbags and clutches</description>
${items.join("\n")}
  </channel>
</rss>
`,
);
console.log(`product feed: wrote ${items.length} items`);
