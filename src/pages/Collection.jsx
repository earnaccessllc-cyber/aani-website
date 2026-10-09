import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
      <div className="relative aspect-[3/4] overflow-hidden mb-4 border border-black bg-black">
        <img
          src={colorway.front}
          alt={`${line.name} in ${colorway.label}`}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-light text-foreground">{line.name}</h3>
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">{colorway.label}</p>
        </div>
        <p className="font-sans text-sm text-foreground mb-0.5">${line.price.toLocaleString()}</p>
      </div>
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
        className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
            Autumn/Winter 2026
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none">
            Collection
          </h1>
        </motion.div>

        {/* One section per style, every colorway shown */}
        <div className="space-y-24">
          {lines.map((line) => (
            <section key={line.id}>
              <div className="flex items-end justify-between border-b border-border pb-4 mb-10">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1">{line.subtitle}</p>
                  <h2 className="font-serif text-3xl font-light text-foreground">{line.name}</h2>
                </div>
                <p className="font-sans text-xs text-muted-foreground">{line.colorways.length} colors</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
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
