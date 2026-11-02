# Owner decisions needed

Nothing below has been changed on the site. Each item needs your answer or written approval.

## 1. Origin and production claims (claim ledger)
The previous audit found project information indicating factory production in Kolkata, India. That is a verification question, not a finding. Please confirm the facts and I'll align the copy to them.

| Claim (exact) | Where | Confidence from code | Question |
|---|---|---|---|
| "Italian Leather Handbags & Clutches" (title) / "Italian leather clutches and handbags" | Home `<title>` + meta, Collection + Stockists meta, Organization schema, product feed, llms.txt | Unverified | Where is the leather sourced (tannery and country)? |
| "premium, natural leather from Italian tanneries" / "Sourced from the finest Italian tanneries, naturally dyed" | Métier step 01, Home texture section | Unverified | Same. Also: is it actually naturally (vegetable) dyed? |
| "Made by hand by master artisans from the finest Italian leather" | Home brand story | Unverified, and conflicts with "single artisan" | Where is each bag cut, sewn and finished? By one artisan or several? |
| "every bag passes through the hands of a single artisan from the first cut to the final stitch" | Métier, Atelier, Home philosophy, llms.txt | Unverified | Same |
| "48 to 72 hours" of weaving | Product (Trellara), Métier, Atelier, Home | Unverified | Is this documented? |
| "made by hand in our atelier" / "inspected… at our atelier" | Atelier, Returns | Unverified | Where is the atelier? |
| "strictly limited monthly runs" | Home, Collection meta, Métier | Unverified | Is there a fixed run size? |
| "Full-grain calfskin", "hand-finished to a subtle burnished luster" | Liscio product | Unverified | Confirm the material spec |

Note: "Italian leather" on a bag made elsewhere can be accurate if documented, but don't let the copy imply "Made in Italy" unless that's true.

## 2. Footer location "Manhattan, NY"
The 19 Oct commit removed a New York address from the schema because it "does not match the business's actual location", but the footer still says Manhattan, NY. Keep it, change it, or remove it?

## 3. Liscio description vs photos: RESOLVED
Owner decision (2026-10-20): keep the existing wording "oversized leather-covered dome button". No change.

## 4. Product details: NEEDS MERCHANT INPUT (both styles)
Dimensions (in/cm), lining, closure, hardware, interior/pocket layout, carry options (handle, strap?), what fits, care instructions, and order processing time.

## 5. Payment methods
The product page offers "Klarna / Afterpay — 4 × $462.50 interest-free". The footer shows Visa, Mastercard, Klarna, Afterpay, PayPal, Google Pay and Apple Pay. The checkout code doesn't restrict methods, so it depends on your Stripe dashboard. Please confirm each one is enabled for USD; I'll remove any that aren't.

## 6. Shipping policy
There's no shipping page. The cost comes from the `SHIPPING_CENTS` env var (unset means free). Please give me the cost, regions (checkout is US-only), processing time and carrier, so I can publish a page and link it beside "Add to Bag" (also needed for Merchant Center).

## 7. Optional, your call
- A default social-share image for non-product pages (currently none). Pick a campaign image.
- Product photo filenames are hashes (`c3d34a9e1.webp`). Descriptive names help image SEO a little; renaming means updating the feed. Approve?
- Missing pages to consider: Privacy Policy and Terms (needed for checkout data collection and analytics), Contact/FAQ.
