import Stripe from "npm:stripe@17";

Deno.serve(async (req) => {
  try {
    const { name, price, colorway } = await req.json();

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY");
      return Response.json({ error: "Checkout is not configured" }, { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const origin = req.headers.get("Origin") || "https://aanimetier.com";

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

    return Response.json({ redirectUrl: session.url });
  } catch (error) {
    console.error("createCheckout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
