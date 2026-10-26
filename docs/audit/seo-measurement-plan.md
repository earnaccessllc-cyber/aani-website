# SEO measurement plan

Status: no analytics, tag manager, or Search Console verification exists in the codebase. No baseline metrics are available, and none are reported here.

## Owner setup steps
1. **Google Search Console**: add a *Domain* property for `aanimetier.com` and verify it with the DNS TXT record at your DNS host. Submit `https://aanimetier.com/sitemap.xml`. Then use URL Inspection → "Request indexing" for `/`, `/collection`, and the 10 product URLs.
2. **GA4**: create a property, then send me the Measurement ID (`G-…`). I'll add consent-respecting tags firing `view_item`, `add_to_cart`, `begin_checkout`, and `purchase` (purchase from `/thank-you` with the Stripe session id, deduplicated). Decide first whether you need a cookie-consent banner (EU/UK visitors, CA privacy).
3. **Merchant Center**: the feed is already generated at `/product-feed.xml`. Only enable listings after the shipping policy (B07) and product details (B05) are confirmed.

## KPIs (record baseline on day 0 once connected)
Indexed pages (target: all 16 sitemap URLs), impressions, clicks, CTR, average position for brand and product queries, organic sessions, add-to-cart rate, checkout starts, and purchases.
Keyword ideas such as "woven leather clutch", "designer portfolio clutch", and "luxury leather evening bag" are hypotheses. Validate them with Search Console query data before retargeting copy.

## Check-ins
- **30 days:** coverage report clean; `/craft` and `/vision` dropped in favour of `/metier`; product pages indexed.
- **60 days:** impressions and query mix; pick 2–3 verified queries for copy refinement (with owner approval).
- **90 days:** CTR and conversion review; decide on Merchant Center free listings and editorial/partnership outreach. Never buy links.
