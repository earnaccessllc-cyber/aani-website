// Netlify Function — creates a Stripe Checkout Session for a bag of items.
//
// Request:  POST { items: [{ lineId, colorwayId, qty }] }
// Response: { redirectUrl }
//
// Prices are NEVER taken from the request. Each item is looked up in the
// bundled catalog (src/lib/collectionData.js) and priced server-side, so a
// visitor can't change what they pay from the browser.
//
// Environment variables (Netlify -> Site configuration -> Environment variables):
//   STRIPE_SECRET_KEY  required. Use a test key (sk_test_...) until you've
//                      verified the flow, then the live key.
//   SHIPPING_CENTS     optional flat shipping per order in cents (1500 = $15).
//                      Leave unset for complimentary shipping.

import Stripe from "stripe";
import { buildCheckoutParams, CartError } from "../../src/lib/checkoutCart.js";

const FALLBACK_ORIGIN = "https://aanimetier.com";

// Where Stripe sends the customer afterwards. Only our own sites (and Netlify
// deploy previews, so you can test a branch) are honored; anything else falls
// back to the live domain.
function safeOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return FALLBACK_ORIGIN;
  try {
    const { hostname } = new URL(origin);
    const ok =
      hostname === "aanimetier.com" ||
      hostname === "www.aanimetier.com" ||
      hostname.endsWith(".netlify.app") ||
      hostname === "localhost";
    return ok ? origin : FALLBACK_ORIGIN;
  } catch {
    return FALLBACK_ORIGIN;
  }
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    return json({ error: "Checkout is not configured" }, 500);
  }

  let params;
  try {
    const { items } = await req.json();
    params = buildCheckoutParams({
      items,
      origin: safeOrigin(req),
      shippingCents: Number(process.env.SHIPPING_CENTS || 0),
    });
  } catch (error) {
    if (error instanceof CartError) return json({ error: error.message }, 400);
    return json({ error: "Invalid request" }, 400);
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create(params);
    return json({ redirectUrl: session.url });
  } catch (error) {
    console.error("create-checkout error:", error.message);
    return json({ error: "Could not start checkout. Please try again." }, 500);
  }
};

export const config = {
  path: "/api/create-checkout",
};
