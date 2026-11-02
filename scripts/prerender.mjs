// Renders each public route in headless Chromium after `vite build` and writes
// dist/<route>/index.html, so crawlers and AI assistants that do not run
// JavaScript receive the real page content. The client bundle then hydrates
// these files (see src/main.jsx).
//
// Requires a Chromium build: `npx playwright-core install chromium`, or set
// CHROME_PATH to an existing Chrome/Chromium binary.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { preview } from "vite";
import { chromium } from "playwright-core";
import { COLLECTION_LINES } from "../src/lib/collectionData.js";

// Only canonical, indexable routes. /craft and /vision 301 to /metier
// (netlify.toml), so they are not rendered separately.
// /thank-you is noindex and is left out.
const STATIC_ROUTES = [
  "/",
  "/collection",
  "/metier",
  "/atelier",
  "/stockists",
  "/press",
  "/returns",
];
const PRODUCT_ROUTES = COLLECTION_LINES.flatMap((line) =>
  line.colorways.map((cw) => `/collection/${line.id}/${cw.id}`),
);
const ROUTES = [...STATIC_ROUTES, ...PRODUCT_ROUTES];

const server = await preview({
  build: { outDir: "dist" },
  preview: { port: 4173, strictPort: false, host: "127.0.0.1" },
  logLevel: "warn",
});
const base = server.resolvedUrls.local[0].replace(/\/$/, "");

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let failures = 0;
try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    try {
      await page.goto(base + route, { waitUntil: "networkidle", timeout: 60000 });
      // Wait for the lazy route to mount: every real page has an H1.
      await page.waitForSelector("h1", { timeout: 30000 });
      // Let entrance animations settle so the captured DOM is their final state.
      await page.waitForTimeout(800);
      const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const out = join("dist", route === "/" ? "index.html" : join(route, "index.html"));
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, html);
      if (errors.length) {
        console.warn(`prerender: ${route} wrote with page errors: ${errors.join("; ")}`);
      } else {
        console.log(`prerender: ${route} -> ${out}`);
      }
    } catch (err) {
      failures++;
      console.error(`prerender: FAILED ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  await server.close();
}

if (failures) {
  console.error(`prerender: ${failures} route(s) failed`);
  process.exit(1);
}
console.log(`prerender: ${ROUTES.length} routes rendered`);
