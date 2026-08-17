// Netlify Function — creates a Stripe Checkout Session.
// Replaces the old Base44-hosted `createCheckout` function (base44/functions/createCheckout/entry.ts),
// ported as directly as possible so behavior doesn't change: same request shape,
// same response shape, same success/cancel URLs.
//
// Requires the STRIPE_SECRET_KEY environment variable to be set in
// Netlify (Site configuration -> Environment variables). Get it from
// https://dashboard.stripe.com/apikeys — use the LIVE secret key for
// production, or a test key while verifying the flow end-to-end.

import Stripe from "stripe";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { name, price, colorway } = await req.json();

    if (!name || typeof price !== "number" || price <= 0) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY");
      return new Response(JSON.stringify({ error: "Checkout is not configured" }), { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const origin = req.headers.get("origin") || "https://aanimetier.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: colorway ? `${name} — ${colorway}` : name,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/collection`,
    });

    return new Response(JSON.stringify({ redirectUrl: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("create-checkout error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config = {
  path: "/api/create-checkout",
};
