# Implemented changes (staging branch `claude/aani-metier-audit-fixes-ebs8kh`)

Baseline: production deploy `6ad64f03` = commit `583ec75` (verified via Netlify API).
Rollback for any item: revert the commit, or don't merge the PR. Production is untouched until merge.
No prices, policies, product facts or brand claims were changed.

| ID | Files | Change |
|----|-------|--------|
| A01 | `netlify.toml`, `scripts/prerender.mjs` (comment) | `/craft` and `/vision` now 301 to `/metier` (forced) instead of serving the SPA shell. |
| A02 | `src/pages/Home.jsx` | Removed the hidden duplicate H1; the visible hero heading is the page's only H1. |
| A03 | `src/components/collection/LineDetail.jsx` | Installment amount formatted with cents: `4 × $462.50` (was `$462.5`). |
| A04 | `LineDetail.jsx`, `src/pages/Product.jsx` | Under the purchase buttons: "Returns accepted within 14 days of delivery · Details" (links `/returns`; uses the existing `RETURN_DAYS` constant) and a contact link. No shipping wording added. |
| A05 | `src/pages/Product.jsx` | Meta description truncated at a word boundary (≤160 chars) instead of a hard 300-char cut. |
| A06 | `src/components/landing/Navbar.jsx` | Bag/menu icons white only over the home hero; dark on inner pages and in the open menu. |
| A07 | `LineDetail.jsx` | Swatches get `aria-label`/`aria-pressed`; image zoom is a real `<button>`; lightbox is `role="dialog"` and closes on Escape; Front/Back toggles get `aria-pressed`; alt text "… in Emerald, front view". |
| A08 | `Navbar.jsx` | Menu button `aria-label` + `aria-expanded`. |
| A09 | `src/lib/PageNotFound.jsx` | 404 page restyled with site nav, typography and footer; links to Collection and Home. Still `noindex` + real 404 status. |
| A10 | `index.html` | Removed static `og:type`/`og:site_name`/`twitter:card` (duplicated by `SEO.jsx` on every page). |
| A11 | `src/pages/Collection.jsx` | First style row loads eagerly; the second row is lazy-loaded. |
