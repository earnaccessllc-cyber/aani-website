// Netlify Function — verifies and logs Stripe webhook events.
// Replaces the old Base44-hosted `stripe-webhook` function
// (base44/functions/stripe-webhook/entry.ts).
//
// NOTE on the order-confirmation email: the original Base44 version sent a
// custom branded HTML email via Base44's own SendEmail integration, which
// no longer exists once Base44 is gone. Rather than guess at a replacement
// email provider/API key, this version verifies the webhook and logs the
// completed order — the simplest, zero-new-dependency way to keep customers
// informed is to turn on Stripe's own automatic receipt email:
// Stripe Dashboard -> Settings -> Emails -> "Successful payments" toggle.
// That requires no code and no new API key. If/when you want the original
// custom branded template back, this function is the place to add a real
// email API call (Resend, Postmark, SendGrid, etc.) using its own env var.
//
// Requires two environment variables in Netlify:
//   STRIPE_SECRET_KEY      — same key used by create-checkout.js
//   STRIPE_WEBHOOK_SECRET  — from the NEW webhook endpoint you register in
//                            Stripe pointing at this function's URL (the old
//                            Base44 webhook secret won't work here, since
//                            webhook secrets are tied to a specific endpoint URL)

import Stripe from "stripe";

export default async (req) => {
  try {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
    if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
      console.error("Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
      return new Response("Not configured", { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const signature = req.headers.get("stripe-signature");
    const body = await req.text();

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Stripe signature verification failed:", err.message);
      return new Response("Invalid signature", { status: 401 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const buyerEmail = session.customer_details?.email;
      const orderId = session.id;
      console.log(`Order completed: ${orderId} — ${buyerEmail || "no email on file"}`);
      // Stripe's own automatic receipt email (see note above) covers the
      // customer-facing confirmation. Add order fulfillment / inventory /
      // notification logic here if and when you need it.
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("stripe-webhook error:", error.message);
    return new Response("Internal error", { status: 500 });
  }
};

export const config = {
  path: "/api/stripe-webhook",
};
