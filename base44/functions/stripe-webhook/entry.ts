import Stripe from "npm:stripe@17";
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
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
      const firstName = session.customer_details?.name?.split(" ")[0] || "Valued Customer";
      const total = session.amount_total; // in cents
      const currency = session.currency || "usd";
      const orderId = session.id;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      const itemName = lineItems.data[0]?.description || "Your order";

      console.log(`Order completed: ${orderId} — ${buyerEmail}`);

      if (buyerEmail) {
        const base44 = createClientFromRequest(req);

        const formattedTotal = total
          ? new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(total / 100)
          : "";

        await base44.asServiceRole.integrations.Core.SendEmail({
          to: buyerEmail,
          from_name: "AANI",
          subject: `Your AANI Order Confirmation — ${itemName}`,
          body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: 'Georgia', serif; background: #f9f7f4; margin: 0; padding: 0; color: #1a1a1a; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border: 1px solid #e8e2da; }
    .header { padding: 40px 48px 32px; border-bottom: 1px solid #e8e2da; }
    .logo { font-size: 22px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 300; }
    .body { padding: 40px 48px; }
    h2 { font-size: 26px; font-weight: 300; letter-spacing: 0.05em; margin: 0 0 8px; }
    .subtitle { font-family: 'Helvetica Neue', sans-serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin-bottom: 32px; }
    .divider { height: 1px; background: #e8e2da; margin: 28px 0; }
    .order-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .label { font-family: 'Helvetica Neue', sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; }
    .value { font-family: 'Helvetica Neue', sans-serif; font-size: 13px; color: #1a1a1a; }
    .item-name { font-size: 16px; font-weight: 300; letter-spacing: 0.03em; margin-bottom: 4px; }
    .item-price { font-family: 'Helvetica Neue', sans-serif; font-size: 13px; color: #444; }
    .footer { padding: 24px 48px; border-top: 1px solid #e8e2da; }
    .footer p { font-family: 'Helvetica Neue', sans-serif; font-size: 10px; letter-spacing: 0.1em; color: #aaa; text-transform: uppercase; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">AANI</div>
    </div>
    <div class="body">
      <h2>Thank You, ${firstName}</h2>
      <p class="subtitle">Order Confirmation</p>

      <p style="font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#555;line-height:1.7;margin-bottom:28px;">
        We have received your order and are preparing it with care. You will receive a separate shipping confirmation once your piece has been dispatched from our atelier.
      </p>

      <div class="divider"></div>

      <p class="label" style="margin-bottom:16px;">Order Summary</p>

      <p class="item-name">${itemName}</p>
      ${formattedTotal ? `<p class="item-price">${formattedTotal}</p>` : ""}

      <div class="divider"></div>

      <div class="order-row">
        <span class="label">Order Reference</span>
        <span class="value" style="font-size:11px;color:#888;">${orderId}</span>
      </div>

      <p style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#888;line-height:1.7;margin-top:28px;">
        For any enquiries, please contact us at <a href="mailto:atelier@aani.com" style="color:#3d6b52;text-decoration:none;">atelier@aani.com</a>
      </p>
    </div>
    <div class="footer">
      <p>AANI &mdash; Handcrafted in Italy &mdash; Spring 2026</p>
    </div>
  </div>
</body>
</html>
          `.trim(),
        });

        console.log(`Confirmation email sent to ${buyerEmail}`);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return new Response("Internal error", { status: 500 });
  }
});
