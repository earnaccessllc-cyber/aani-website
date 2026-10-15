import React from "react";
import { Link } from "react-router-dom";
import { Loader2, Minus, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { MAX_QTY } from "@/lib/checkoutCart";

const money = (n) => `$${n.toLocaleString()}`;

export default function CartDrawer() {
  const { open, setOpen, resolved, count, subtotal, setQty, checkout, checkingOut, error } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-serif text-2xl font-light tracking-wider">
            Your Bag{count > 0 ? ` (${count})` : ""}
          </SheetTitle>
          <SheetDescription className="sr-only">Items in your shopping bag</SheetDescription>
        </SheetHeader>

        {resolved.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-sans text-sm text-muted-foreground">Your bag is empty.</p>
            <Link
              to="/collection"
              onClick={() => setOpen(false)}
              className="font-sans text-xs tracking-widest uppercase border border-foreground py-3 px-8 hover:bg-foreground hover:text-background transition-colors"
            >
              View Collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 divide-y divide-border">
              {resolved.map(({ line, colorway, qty }) => (
                <li key={`${line.id}:${colorway.id}`} className="flex gap-4 py-5">
                  <Link
                    to={`/collection/${line.id}/${colorway.id}`}
                    onClick={() => setOpen(false)}
                    className="w-24 aspect-[4/5] shrink-0 bg-black border border-black overflow-hidden"
                  >
                    <img src={colorway.front} alt={`${line.name} in ${colorway.label}`} className="w-full h-full object-contain" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <p className="font-serif text-lg font-light leading-tight">{line.name}</p>
                    <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">{colorway.label}</p>
                    <p className="font-sans text-sm mt-2">{money(line.price)}</p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          aria-label={`Decrease quantity of ${line.name} in ${colorway.label}`}
                          onClick={() => setQty(line.id, colorway.id, qty - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-sans text-sm" aria-live="polite">{qty}</span>
                        <button
                          aria-label={`Increase quantity of ${line.name} in ${colorway.label}`}
                          onClick={() => setQty(line.id, colorway.id, qty + 1)}
                          disabled={qty >= MAX_QTY}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => setQty(line.id, colorway.id, 0)}
                        className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex items-center justify-between font-sans">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">Subtotal</span>
                <span className="text-lg">{money(subtotal)}</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground">Shipping and taxes are shown at checkout.</p>
              {error && <p role="alert" className="font-sans text-xs text-destructive">{error}</p>}
              <button
                onClick={checkout}
                disabled={checkingOut}
                className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-sans text-xs tracking-widest uppercase py-4 hover:opacity-80 transition-opacity disabled:opacity-60"
              >
                {checkingOut && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {checkingOut ? "Redirecting..." : "Checkout"}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
