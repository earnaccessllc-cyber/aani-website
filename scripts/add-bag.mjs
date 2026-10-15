#!/usr/bin/env node
/**
 * Adds a bag to the AANI collection from the "Add a bag" form summary.
 *
 * Usage:
 *   npm i --no-save sharp          (once, for photo conversion)
 *   node scripts/add-bag.mjs <summary.txt> <photos-folder>
 *
 * What it does:
 *   1. Reads the summary text produced by the form.
 *   2. Converts each front/back photo to an optimized WebP in public/images/products/,
 *      placing transparent (background-removed) photos on the shared BACKGROUND color.
 *   3. Appends the new bag to COLLECTION_LINES in src/lib/collectionData.js.
 *
 * It refuses to run if a photo is missing, a field is missing, or the bag id already exists.
 * Photos with the same file name across colors/back views are converted once and reused.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "src/lib/collectionData.js");
const IMG_DIR = path.join(ROOT, "public/images/products");

// Every new photo is placed on this one background so the whole collection matches.
// Change it here to change it for all future bags.
const BACKGROUND = "#ece7e0";

const [summaryPath, photosDir] = process.argv.slice(2);
if (!summaryPath || !photosDir) {
  console.error("Usage: node scripts/add-bag.mjs <summary.txt> <photos-folder>");
  process.exit(1);
}

function fail(msg) {
  console.error("ERROR: " + msg);
  process.exit(1);
}

// ---------- parse summary ----------
export function parseSummary(text) {
  const lines = text.replace(/\r/g, "").split("\n");
  const fields = {};
  const colors = [];
  let inColors = false;
  let lastKey = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^colors:\s*$/i.test(line)) { inColors = true; continue; }
    if (inColors) {
      const m = line.match(/^-\s*(.+?)\s*\((#[0-9a-fA-F]{6})\)\s*\|\s*front:\s*(.+?)\s*\|\s*back:\s*(.+?)\s*$/);
      if (m) colors.push({ label: m[1], swatch: m[2].toLowerCase(), front: m[3], back: m[4] });
      else if (line.trim()) fail(`Could not read color line: "${line}"`);
      continue;
    }
    const m = line.match(/^(Name|Leather type|Category|Price|Material|Description|Notes):\s*(.*)$/);
    if (m) { lastKey = m[1]; fields[lastKey] = m[2].trim(); }
    else if (lastKey && line.trim()) fields[lastKey] += " " + line.trim(); // wrapped text
  }
  return { fields, colors };
}

const { fields, colors } = parseSummary(fs.readFileSync(summaryPath, "utf8"));

for (const k of ["Name", "Leather type", "Category", "Price", "Material", "Description"]) {
  if (!fields[k]) fail(`Summary is missing "${k}".`);
}
if (!colors.length) fail("Summary has no colors.");
const price = Number(String(fields.Price).replace(/[^0-9.]/g, ""));
if (!price || price <= 0) fail(`Bad price: "${fields.Price}"`);

const slug = fields.Name
  .toLowerCase()
  .replace(/^the\s+/, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .replace(/-(clutch|bag|handbag|portfolio)$/, "") || "bag";
const colorIds = colors.map((c) => c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
if (new Set(colorIds).size !== colorIds.length) fail("Two colors have the same name.");

// ---------- guard against duplicates ----------
let data = fs.readFileSync(DATA_FILE, "utf8");
if (new RegExp(`id:\\s*"${slug}"`).test(data)) {
  fail(`A bag with id "${slug}" already exists. Rename it in the form or edit the existing entry.`);
}

// ---------- convert photos ----------
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  fail("Photo conversion needs sharp. Run: npm i --no-save sharp");
}
fs.mkdirSync(IMG_DIR, { recursive: true });

const warnings = [];
const converted = new Map(); // source file name -> /images/products/xxxx.webp
async function convert(fileName) {
  if (converted.has(fileName)) return converted.get(fileName);
  const src = path.join(photosDir, fileName);
  if (!fs.existsSync(src)) fail(`Photo not found: ${fileName}`);
  const hash = crypto.createHash("sha1").update(fs.readFileSync(src)).digest("hex").slice(0, 9);
  const out = path.join(IMG_DIR, `${hash}.webp`);
  if (!fs.existsSync(out)) {
    const meta = await sharp(src).metadata();
    if (!meta.hasAlpha) {
      warnings.push(`${fileName} has no transparent background, so its original background was kept. Remove the background first to make it match.`);
    }
    await sharp(src)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .flatten({ background: BACKGROUND })
      .webp({ quality: 82 })
      .toFile(out);
  }
  const url = `/images/products/${hash}.webp`;
  converted.set(fileName, url);
  return url;
}

const built = [];
for (const c of colors) {
  built.push({ ...c, id: colorIds[colors.indexOf(c)], frontUrl: await convert(c.front), backUrl: await convert(c.back) });
}

// ---------- write catalog entry ----------
const q = (s) => JSON.stringify(s);
const entry = `  {
    id: ${q(slug)},
    category: ${q(fields.Category)},
    name: ${q(fields.Name)},
    subtitle: ${q(fields["Leather type"])},
    material: ${q(fields.Material)},
    description:
      ${q(fields.Description)},
    price: ${price},
    heroImage:
      ${q(built[0].frontUrl)},
    colorways: [
${built
  .map(
    (c) => `      {
        id: ${q(c.id)},
        label: ${q(c.label)},
        swatch: ${q(c.swatch)},
        front: ${q(c.frontUrl)},
        back:  ${q(c.backUrl)},
      },`
  )
  .join("\n")}
    ],
  },
`;

const close = data.lastIndexOf("\n];");
if (close === -1) fail("Could not find the end of COLLECTION_LINES in collectionData.js.");
data = data.slice(0, close + 1) + entry + data.slice(close + 1);
fs.writeFileSync(DATA_FILE, data);

console.log(`Added "${fields.Name}" (${slug}) at $${price} with ${built.length} color(s).`);
console.log(`Converted ${converted.size} photo(s) into public/images/products/.`);
for (const w of warnings) console.warn("WARNING: " + w);
if (fields.Notes) console.log(`Note from form (not added to the site): ${fields.Notes}`);
