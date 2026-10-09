import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function LineDetail({ line, initialColorwayId, onBack, onColorwayChange }) {
  const [selectedColorway, setSelectedColorway] = useState(
    line.colorways.find(cw => cw.id === initialColorwayId) ||
    line.colorways.find(cw => cw.front === line.heroImage) ||
    line.colorways[0]
  );
  const [side, setSide] = useState("front");
  const [lightbox, setLightbox] = useState(false);
  const { addItem, buyNow, checkingOut, error: checkoutError } = useCart();

  const handleAddToBag = () => addItem(line.id, selectedColorway.id, 1);
  const handleBuyNow = () => buyNow(line.id, selectedColorway.id);

  const handleSwatchClick = (colorway) => {
    setSelectedColorway(colorway);
    setSide("front");
    onColorwayChange?.(colorway);
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
              {/* Every photo for this style is mounted once and just faded in/out,
                  so switching colors never waits on a download or flashes blank. */}
              {line.colorways.flatMap((cw) =>
                ["front", "back"].map((s) => {
                  const src = cw[s];
                  const active = src === currentImage;
                  return (
                    <img
                      key={`${cw.id}-${s}`}
                      src={src}
                      alt={`${line.name} — ${cw.label} ${s}`}
                      width={1024}
                      height={1024}
                      decoding="async"
                      loading="eager"
                      aria-hidden={!active}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    />
                  );
                })
              )}
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
              Autumn/Winter 2026
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
              onClick={handleAddToBag}
              className="flex items-center justify-center gap-2 bg-foreground text-background font-sans text-xs tracking-widest uppercase py-4 px-10 hover:opacity-80 transition-opacity self-start"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </button>

            {/* BNPL Options */}
            <div className="mt-4 flex flex-col gap-2 self-start w-full max-w-xs">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1">Or pay in installments with</p>
              {/* Klarna */}
              <button onClick={handleBuyNow} disabled={checkingOut} className="flex items-center justify-between border border-border py-3 px-5 hover:border-foreground/40 transition-colors duration-300 w-full group disabled:opacity-60">
                <span className="font-sans text-sm font-semibold text-foreground tracking-tight">Klarna</span>
                <span className="font-sans text-xs text-muted-foreground group-hover:text-foreground transition-colors">4 × ${(line.price / 4).toLocaleString()} — interest-free</span>
              </button>
              {/* Afterpay */}
              <button onClick={handleBuyNow} disabled={checkingOut} className="flex items-center justify-between border border-border py-3 px-5 hover:border-foreground/40 transition-colors duration-300 w-full group disabled:opacity-60">
                <span className="font-sans text-sm font-semibold text-foreground tracking-tight">Afterpay</span>
                <span className="font-sans text-xs text-muted-foreground group-hover:text-foreground transition-colors">4 × ${(line.price / 4).toLocaleString()} — interest-free</span>
              </button>
              {checkoutError && <p role="alert" className="font-sans text-xs text-destructive mt-1">{checkoutError}</p>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
