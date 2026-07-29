import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LineDetail({ line, onBack }) {
  const [selectedColorway, setSelectedColorway] = useState(
    line.colorways.find(cw => cw.front === line.heroImage) || line.colorways[0]
  );
  const [side, setSide] = useState("front");
  const [lightbox, setLightbox] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const handleBuyNow = async () => {
    setPurchasing(true);
    try {
      const response = await base44.functions.invoke("createCheckout", {
        name: line.name,
        price: line.price,
        colorway: selectedColorway.label,
      });
      const url = response.data.redirectUrl;
      const win = window.open(url, "_blank");
      if (!win) window.location.href = url;
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setPurchasing(false);
    }
  };

  const handleSwatchClick = (colorway) => {
    setSelectedColorway(colorway);
    setSide("front");
  };

  const currentIndex = line.colorways.findIndex(c => c.id === selectedColorway.id);
  const prevColorway = currentIndex > 0 ? line.colorways[currentIndex - 1] : null;
  const nextColorway = currentIndex < line.colorways.length - 1 ? line.colorways[currentIndex + 1] : null;

  const currentImage =
    side === "front" ? selectedColorway.front : selectedColorway.back;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      {/* Back button */}
      <div className="pt-28 pb-6 max-w-7xl mx-auto px-6 md:px-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Collection
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — image */}
          <div className="flex flex-col gap-4">
            <div
              className="relative aspect-[4/5] overflow-hidden cursor-zoom-in border border-black bg-black"
              onClick={() => setLightbox(true)}
            >
              <AnimatePresence>
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={`${line.name} — ${selectedColorway.label} ${side}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                  onClick={() => setLightbox(false)}
                >
                  {/* Current colorway name */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center" onClick={e => e.stopPropagation()}>
                    <p className="font-sans text-xs tracking-widest uppercase text-white/70">{selectedColorway.label}</p>
                  </div>

                  <img
                    key={currentImage}
                    src={currentImage}
                    alt={`${line.name} — ${selectedColorway.label} ${side}`}
                    className="max-h-[95vh] max-w-[95vw] object-contain cursor-zoom-out"
                  />

                  {/* Front / Back buttons inside lightbox */}
                  <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1"
                    onClick={e => e.stopPropagation()}
                  >
                    {["front", "back"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSide(s)}
                        className={`font-sans text-xs tracking-widest uppercase px-5 py-2 border transition-colors ${
                          side === s
                            ? "border-white text-white"
                            : "border-white/30 text-white/50 hover:text-white hover:border-white/60"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Prev colorway */}
                  {prevColorway && (
                    <button
                      className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                      onClick={e => { e.stopPropagation(); handleSwatchClick(prevColorway); }}
                    >
                      <ChevronLeft className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                      <span className="font-sans text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">{prevColorway.label}</span>
                    </button>
                  )}

                  {/* Next colorway */}
                  {nextColorway && (
                    <button
                      className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                      onClick={e => { e.stopPropagation(); handleSwatchClick(nextColorway); }}
                    >
                      <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                      <span className="font-sans text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">{nextColorway.label}</span>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Front / Back toggle */}
            <div className="flex items-center gap-1 self-center">
              {["front", "back"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`font-sans text-xs tracking-widest uppercase px-5 py-2 border transition-colors ${
                    side === s
                      ? "border-foreground text-foreground bg-transparent"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right — details */}
          <div className="flex flex-col justify-center pt-4 md:pt-0">
            <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
              Spring 2026
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light leading-none mb-2">
              {line.name}
            </h1>
            <p className="font-sans text-xs tracking-wider uppercase text-muted-foreground mb-8">
              {line.subtitle}
            </p>

            <div className="w-8 h-px bg-primary mb-8" />

            {/* Colorway */}
            <div className="mb-8">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Colorway —{" "}
                <span className="text-foreground">{selectedColorway.label}</span>
              </p>
              <div className="flex items-center gap-3">
                {line.colorways.map((cw) => (
                  <button
                    key={cw.id}
                    onClick={() => handleSwatchClick(cw)}
                    title={cw.label}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColorway.id === cw.id
                        ? "border-foreground scale-110"
                        : "border-transparent hover:border-foreground/40"
                    }`}
                    style={{ backgroundColor: cw.swatch }}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-8 max-w-sm">
              {line.description}
            </p>

            {/* Material */}
            <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-8">
              Material — <span className="text-foreground normal-case tracking-normal">{line.material}</span>
            </p>

            {/* Price */}
            <p className="font-sans text-2xl font-light text-foreground mb-8">
              ${line.price.toLocaleString()}
            </p>

            {/* CTA */}
            <button
              onClick={handleBuyNow}
              disabled={purchasing}
              className="flex items-center justify-center gap-2 bg-foreground text-background font-sans text-xs tracking-widest uppercase py-4 px-10 hover:opacity-80 transition-opacity self-start disabled:opacity-60"
            >
              {purchasing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
              {purchasing ? "Redirecting..." : "Buy Now"}
            </button>

            {/* BNPL Options */}
            <div className="mt-4 flex flex-col gap-2 self-start w-full max-w-xs">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1">Or pay in instalments with</p>
              {/* Klarna */}
              <button onClick={handleBuyNow} disabled={purchasing} className="flex items-center justify-between border border-border py-3 px-5 hover:border-foreground/40 transition-colors duration-300 w-full group disabled:opacity-60">
                <span className="font-sans text-sm font-semibold text-foreground tracking-tight">Klarna</span>
                <span className="font-sans text-xs text-muted-foreground group-hover:text-foreground transition-colors">4 × ${(line.price / 4).toLocaleString()} — interest-free</span>
              </button>
              {/* Afterpay */}
              <button onClick={handleBuyNow} disabled={purchasing} className="flex items-center justify-between border border-border py-3 px-5 hover:border-foreground/40 transition-colors duration-300 w-full group disabled:opacity-60">
                <span className="font-sans text-sm font-semibold text-foreground tracking-tight">Afterpay</span>
                <span className="font-sans text-xs text-muted-foreground group-hover:text-foreground transition-colors">4 × ${(line.price / 4).toLocaleString()} — interest-free</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}