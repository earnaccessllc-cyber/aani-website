import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <p className="font-serif text-3xl font-light tracking-widest text-foreground mb-4">
              AANI
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
              A study in texture, silence, and the enduring beauty of things made slowly, by hand.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Explore
            </p>
            <div className="space-y-3">
              {[
                { label: "Collection", path: "/collection" },
                { label: "Craft", path: "/craft" },
                { label: "Vision", path: "/vision" },
                { label: "Atelier", path: "/atelier" },
              ].map(({ label, path }) =>
              <Link
                key={label}
                to={path}
                onClick={() => window.scrollTo(0, 0)}
                className="block font-sans text-sm text-foreground/70 hover:text-foreground transition-colors">
                  {label}
                </Link>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-3 md:col-start-10">
            <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Contact Us
            </p>
            <div className="font-sans text-sm text-foreground/70 mb-6">
              <p>AANI</p>
              <p>Manhattan, NY</p>
              <a href="mailto:contact@aani.com" className="hover:text-foreground transition-colors">contact@aani.com</a>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Press Inquiries
            </p>
            <div className="font-sans text-sm text-foreground/70">
              <p>AANI</p>
              <p>Manhattan, NY</p>
              <a href="mailto:press@aani.com" className="hover:text-foreground transition-colors">press@aani.com</a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 flex items-center gap-3 flex-wrap">
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mr-2">We accept</p>
          {/* Visa */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded bg-card/50 h-8 min-w-[48px]">
            <span className="font-sans font-bold text-sm tracking-tight" style={{ color: "#1A1F71" }}>VISA</span>
          </div>
          {/* Mastercard */}
          <div className="flex items-center justify-center px-2 py-1.5 border border-border/60 rounded bg-card/50 h-8 gap-1">
            <div className="w-5 h-5 rounded-full opacity-90" style={{ backgroundColor: "#EB001B" }} />
            <div className="w-5 h-5 rounded-full opacity-90 -ml-2.5" style={{ backgroundColor: "#F79E1B" }} />
          </div>
          {/* Klarna */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded h-8 min-w-[60px]" style={{ backgroundColor: "#FFB3C7" }}>
            <span className="font-sans font-semibold text-sm tracking-tight text-black">Klarna</span>
          </div>
          {/* Afterpay */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded h-8 min-w-[72px]" style={{ backgroundColor: "#B2FCE4" }}>
            <span className="font-sans font-semibold text-sm tracking-tight text-black">Afterpay</span>
          </div>
          {/* PayPal */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded bg-card/50 h-8 min-w-[64px]">
            <span className="font-sans font-bold text-sm tracking-tight" style={{ color: "#003087" }}>Pay</span>
            <span className="font-sans font-bold text-sm tracking-tight" style={{ color: "#009cde" }}>Pal</span>
          </div>
          {/* Google Pay */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded bg-card/50 h-8 min-w-[72px]">
            <span className="font-sans font-bold text-sm tracking-tight text-foreground">G</span>
            <span className="font-sans font-medium text-sm tracking-tight text-muted-foreground">Pay</span>
          </div>
          {/* Apple Pay */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded h-8 min-w-[72px] bg-black">
            <span className="font-sans font-semibold text-sm tracking-tight text-white">Apple Pay</span>
          </div>
          {/* Venmo */}
          <div className="flex items-center justify-center px-3 py-1.5 border border-border/60 rounded h-8 min-w-[64px]" style={{ backgroundColor: "#3D95CE" }}>
            <span className="font-sans font-bold text-sm tracking-tight text-white">venmo</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/60">
            © 2026 AANI. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground/40 tracking-wider">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>);}