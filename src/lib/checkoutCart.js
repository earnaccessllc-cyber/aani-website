// Pure cart/checkout helpers shared by the browser (cart totals) and the
// Netlify function (what Stripe actually charges). Both read prices from the
// bundled catalog, so a price can never come from the browser.
//
// NOTE: relative import on purpose — the Netlify function bundler does not
// know the "@/" alias used elsewhere in src/.
import { COLLECTION_LINES } from "./collectionData.js";

export const MAX_QTY = 5; // per style + colorway
export const MAX_LINES = 10; // distinct style + colorway combos per order

export class CartError extends Error {}

// Turns [{ lineId, colorwayId, qty }] into [{ line, colorway, qty }].
// Throws CartError for anything that isn't a real, in-range product.
export function resolveCart(items, lines = COLLECTION_LINES) {
  if (!Array.isArray(items) || items.length === 0) throw new CartError("Your bag is empty");
  if (items.length > MAX_LINES) throw new CartError("Too many items in one order");

  const seen = new Set();
  return items.map((item) => {
    const line = lines.find((l) => l.id === item?.lineId);
    const colorway = line?.colorways.find((c) => c.id === item?.colorwayId);
    if (!line || !colorway) throw new CartError("One of the items is no longer available");

    const key = `${line.id}:${colorway.id}`;
    if (seen.has(key)) throw new CartError("Duplicate item in order");
    seen.add(key);

    const qty = item.qty;
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      throw new CartError(`Quantity must be between 1 and ${MAX_QTY}`);
    }
    return { line, colorway, qty };
  });
}

export function cartSubtotal(resolved) {
  return resolved.reduce((sum, { line, qty }) => sum + line.price * qty, 0);
}

// Builds the parameters for stripe.checkout.sessions.create().
export function buildCheckoutParams({ items, origin, shippingCents = 0 }) {
  const resolved = resolveCart(items);
  const shipping = Number.isFinite(shippingCents) && shippingCents > 0 ? Math.round(shippingCents) : 0;

  return {
    mode: "payment",
    line_items: resolved.map(({ line, colorway, qty }) => ({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(line.price * 100),
        product_data: {
          name: `${line.name} — ${colorway.label}`,
          description: line.material,
          images: [colorway.front],
          metadata: { line_id: line.id, colorway_id: colorway.id },
        },
      },
    })),
    // Physical goods: Stripe must collect where to send them.
    shipping_address_collection: { allowed_countries: ["US"] },
    phone_number_collection: { enabled: true },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: shipping ? "Standard shipping" : "Complimentary shipping",
          fixed_amount: { amount: shipping, currency: "usd" },
        },
      },
    ],
    // Readable summary on the Stripe order (500-char limit per value).
    metadata: {
      order_items: resolved
        .map(({ line, colorway, qty }) => `${line.id}/${colorway.id} x${qty}`)
        .join(", ")
        .slice(0, 500),
    },
    success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/collection`,
  };
}
