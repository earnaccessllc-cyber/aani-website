import React from "react";
import { motion } from "framer-motion";

// Self-hosted from /public. /public filenames aren't content-hashed the way
// Vite's bundled assets are, and they carry a week-long Cache-Control (see
// netlify.toml), so the name is numbered: bump it when the photo is replaced
// (and in index.html's preload) rather than reusing a name.
const HERO_IMAGE = "/hero-3.jpg"; // 2576x1419, ~230 KB

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col md:flex-row md:items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Landscape photo. Desktop: full-bleed behind the copy, with a dark
          scrim on the left so the white text stays legible. Mobile: a band
          across the top with the copy beneath it, as before. */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden md:absolute md:inset-0 md:flex-none">
        <img
          src={HERO_IMAGE}
          alt="AANI woven leather clutch"
          // React 18 only passes the lowercase attribute through to the DOM.
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[62%_center] md:object-[60%_center]"
        />
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="hidden md:block absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full shrink-0 pt-6 pb-10 md:pt-0 md:pb-0">
        <div className="max-w-xl md:w-1/2 md:pr-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-xs tracking-widest uppercase text-muted-foreground md:text-white/80 mb-4"
          >
            Capsule Collection — Autumn/Winter 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight text-foreground md:text-white"
          >
            Where minimalism
            <br />
            <span className="italic font-light">meets maximalism</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 md:mt-12"
          >
            <div className="w-12 h-px bg-primary md:bg-white/70 mb-6" />
            <p className="font-sans text-sm leading-relaxed text-muted-foreground md:text-white/85 max-w-sm">
              Quiet in form, bold in feeling. Every AANI piece pairs clean, restrained lines
              with an unmistakable presence — refined enough to whisper, rich enough to be remembered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10"
          >
            <a
              href="/collection"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-foreground md:text-white border-b border-foreground/30 md:border-white/50 pb-1 hover:border-foreground md:hover:border-white transition-colors duration-300"
            >
              Discover the Collection
              <span className="text-lg">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-foreground/30 md:bg-white/50"
        />
      </motion.div>
    </section>
  );
}
