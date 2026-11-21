import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCollectionLines } from "@/lib/useCollectionLines";
import SEO from "@/components/SEO";

function ColorwayCard({ line, colorway, index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
      className="group"
    >
      <Link to={`/collection/${line.id}/${colorway.id}`} className="block">
        <div className="relative aspect-square overflow-hidden mb-3 bg-[#f2f2f2]">
          <img
            src={colorway.front}
            alt={`${line.name} in ${colorway.label}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            loading="eager"
            decoding="async"
          />
        </div>
        <h3 className="font-sans text-xs tracking-[0.03em] uppercase text-foreground">{line.name}</h3>
        <p className="font-sans text-xs tracking-[0.03em] uppercase text-muted-foreground mt-0.5">{colorway.label}</p>
        <p className="font-sans text-xs text-foreground mt-2">${line.price.toLocaleString()}</p>
      </Link>
    </motion.div>
  );
}

export default function Collection() {
  const lines = useCollectionLines();

  // Fetch the product page code while the visitor browses, so opening a
  // product never flashes the loading spinner.
  useEffect(() => {
    import("./Product");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Collection"
        description="Explore the AANI capsule collection — Italian leather clutches and handbags, woven and smooth, released in strictly limited monthly runs."
        path="/collection"
      />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-36 md:pt-40 pb-20 max-w-[1600px] mx-auto px-5 md:px-10"
      >
        {/* Header */}
        <div className="mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-2">
              Autumn/Winter 2026
            </p>
            <h1 className="font-sans text-sm md:text-base tracking-[0.04em] font-bold">Collection</h1>
          </div>
          <Link
            to="/"
            className="font-sans text-xs tracking-[0.03em] uppercase text-foreground hover:underline underline-offset-4"
          >
            Back
          </Link>
        </div>

        {/* One section per style, every colorway shown */}
        <div className="space-y-20">
          {lines.map((line) => (
            <section key={line.id}>
              <div className="flex items-baseline justify-between pb-3 mb-6 border-b border-border">
                <h2 className="font-sans text-xs tracking-[0.03em] font-bold">{line.name}</h2>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-[0.03em]">{line.colorways.length} colors</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4">
                {line.colorways.map((colorway, i) => (
                  <ColorwayCard
                    key={colorway.id}
                    line={line}
                    colorway={colorway}
                    index={i}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
