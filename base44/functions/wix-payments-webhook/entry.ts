import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import jwt from 'npm:jsonwebtoken@9.0.2';

Deno.serve(async (req) => {
  try {
    const WEBHOOK_PUBLIC_KEY = Deno.env.get("WIX_PAYMENTS_WEBHOOK_PUBLIC_KEY");
    if (!WEBHOOK_PUBLIC_KEY) {
      console.error("Missing WIX_PAYMENTS_WEBHOOK_PUBLIC_KEY");
      return new Response("Missing public key", { status: 500 });
    }

    const requestBody = await req.text();

    // Step 1: Verify JWT signature
    let rawPayload;
    try {
      rawPayload = jwt.verify(requestBody, WEBHOOK_PUBLIC_KEY, { algorithms: ["RS256"] });
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return new Response("Invalid signature", { status: 401 });
    }

    // Step 2 & 3: Double-nested JSON parse
    const event = JSON.parse(rawPayload.data);
    const eventData = JSON.parse(event.data);

    if (event.eventType === "wix.ecom.v1.order_approved") {
      const order = eventData.actionEvent.body.order;

      const buyerEmail = order.buyerInfo?.email;
      const contact = order.billingInfo?.contactDetails;
      const firstName = contact?.firstName || "Valued Customer";
      const itemName = order.lineItems?.[0]?.productName?.original || "Your order";
      const total = order.priceSummary?.total?.amount;
      const currency = order.currency || "USD";
      const orderId = order.id;

      console.log(`Order approved: ${orderId} — ${buyerEmail}`);

      if (buyerEmail) {
        const base44 = createClientFromRequest(req);

        const formattedTotal = total
          ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(parseFloat(total))
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