import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MAX_QTY, cartSubtotal, resolveCart } from "./checkoutCart.js";

// The bag lives in the visitor's browser (localStorage). It only stores ids and
// quantities; prices are looked up from the catalog, and the server re-prices
// everything at checkout.

const STORAGE_KEY = "aani_bag_v1";
const CartContext = createContext(null);

function loadItems() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    // Keep only real catalog items, one entry each, with a sane quantity.
    const clean = new Map();
    for (const item of raw) {
      try {
        resolveCart([{ lineId: item?.lineId, colorwayId: item?.colorwayId, qty: 1 }]);
      } catch {
        continue; // no longer in the catalog
      }
      const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(item.qty)) || 1));
      clean.set(`${item.lineId}:${item.colorwayId}`, { lineId: item.lineId, colorwayId: item.colorwayId, qty });
    }
    return [...clean.values()];
  } catch {
    return [];
  }
}

async function startCheckout(items) {
  const response = await fetch("/api/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.redirectUrl) throw new Error(data.error || "Checkout failed");
  window.location.href = data.redirectUrl;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems);
  const [open, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private mode / blocked storage: the bag still works for this visit.
    }
  }, [items]);

  const addItem = useCallback((lineId, colorwayId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId && i.colorwayId === colorwayId);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i));
      }
      return [...prev, { lineId, colorwayId, qty: Math.min(MAX_QTY, qty) }];
    });
    setError("");
    setOpen(true);
  }, []);

  const setQty = useCallback((lineId, colorwayId, qty) => {
    setItems((prev) =>
      qty < 1
        ? prev.filter((i) => !(i.lineId === lineId && i.colorwayId === colorwayId))
        : prev.map((i) =>
            i.lineId === lineId && i.colorwayId === colorwayId ? { ...i, qty: Math.min(MAX_QTY, qty) } : i
          )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const run = useCallback(async (toCheckout) => {
    setCheckingOut(true);
    setError("");
    try {
      await startCheckout(toCheckout);
    } catch (err) {
      setError(err.message || "Checkout failed");
      setCheckingOut(false);
    }
    // On success the browser navigates to Stripe, so we leave the spinner on.
  }, []);

  const value = useMemo(() => {
    let resolved = [];
    try {
      resolved = items.length ? resolveCart(items) : [];
    } catch {
      resolved = [];
    }
    return {
      items,
      resolved,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: cartSubtotal(resolved),
      open,
      setOpen,
      addItem,
      setQty,
      clear,
      checkingOut,
      error,
      checkout: () => run(items),
      buyNow: (lineId, colorwayId) => run([{ lineId, colorwayId, qty: 1 }]),
    };
  }, [items, open, checkingOut, error, addItem, setQty, clear, run]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
