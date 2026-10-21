# QA test results

Environment: local production build (`npm run build`, incl. prerender) served by `vite preview`, headless Chromium, desktop 1440×900 and mobile 390×844.
The live domain could not be reached from the audit container (DNS/egress blocked), so live HTTP checks are **UNVERIFIED** and should be repeated on the Netlify deploy preview.

| Check | Desktop | Mobile |
|---|---|---|
| `npm run lint` | pass | — |
| Build + prerender 16 routes, sitemap 16 URLs, feed 10 items | pass | — |
| Product page: installment text `4 × $462.50` | pass | pass |
| Product page: returns link present near CTA | pass | pass |
| Product page: 1 H1, no horizontal scroll, no JS errors | pass | pass |
| Lightbox opens via button, closes on Escape | pass | pass |
| Swatch click updates URL (`/collection/liscio/stone`) | pass | pass |
| Add to Bag → cart drawer → checkout request payload `{"items":[{"lineId":"liscio","colorwayId":"stone","qty":1}]}` (request intercepted; **no Stripe session created, no live order**) | pass | pass |
| Unknown URL → branded 404, `noindex, follow` | pass | pass |
| Collection: 5 eager / 5 lazy images | pass | pass |
| Mobile menu: opens, `aria-expanded=true`, icons visible on light pages | — | pass |
| Prerendered pages: exactly 1 title, 1 canonical, 1 H1, no `<img>` without alt (home, collection, metier, atelier, stockists, returns, product) | pass | — |
| Product + Breadcrumb JSON-LD present on product pages; Organization + WebSite on home | pass | — |
| `netlify.toml` parses; `/craft`, `/vision` → `/metier` 301 forced | pass (parsed) | — |

To verify on the deploy preview: `curl -I <preview>/craft` → 301 Location `/metier`; `/robots.txt` and `/sitemap.xml` return 200; unknown path returns 404; run PageSpeed Insights on `/` and one product page (lab data only; field data needs traffic).
Not run: Lighthouse/PageSpeed (no outbound access), real Stripe test-mode checkout (needs test keys on the preview).
