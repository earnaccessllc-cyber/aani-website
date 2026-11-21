import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLinks = [
  { label: "Collection", href: "/collection" },
  { label: "Métier", href: "/metier" },
  { label: "Stockist", href: "/stockists" },
];

// Editorial header: a thin announcement line, then a white bar with the
// wordmark on the left, small uppercase links and the bag on the right.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="h-8 flex items-center justify-center border-b border-border">
        <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-foreground">
          Complimentary shipping on all US orders
        </p>
      </div>

      <nav className="max-w-[1600px] mx-auto px-5 md:px-10 flex items-center justify-between h-14 md:h-16">
        <Link to="/" aria-label="AANI home" onClick={() => setMenuOpen(false)}>
          <img src="/aani-logo.png" alt="AANI" className="h-5 md:h-6 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => window.scrollTo(0, 0)}
              className="font-sans text-xs tracking-[0.03em] uppercase text-foreground hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => openCart(true)}
            aria-label={`Open bag${count ? `, ${count} items` : ""}`}
            className="font-sans text-xs tracking-[0.03em] uppercase text-foreground hover:underline underline-offset-4"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-5">
          <button
            onClick={() => openCart(true)}
            aria-label={`Open bag${count ? `, ${count} items` : ""}`}
            className="font-sans text-xs tracking-[0.03em] uppercase"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[5.5rem] bottom-0 bg-background px-5 pt-6 border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => {
                setMenuOpen(false);
                window.scrollTo(0, 0);
              }}
              className="flex items-center justify-between py-3 font-sans text-xs tracking-[0.03em] uppercase font-bold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
