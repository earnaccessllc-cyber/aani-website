import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LineCard from "@/components/collection/LineCard";
import LineDetail from "@/components/collection/LineDetail";
import { COLLECTION_LINES } from "@/lib/collectionData";

export default function Collection() {
  const [selectedLine, setSelectedLine] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <AnimatePresence mode="wait">
        {!selectedLine ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                Spring 2026
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-light leading-none">
                The Collection
              </h1>
            </motion.div>

            {/* 3-card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
              {COLLECTION_LINES.map((line, i) => (
                <LineCard
                  key={line.id}
                  line={line}
                  index={i}
                  onClick={setSelectedLine}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LineDetail
              line={selectedLine}
              onBack={() => setSelectedLine(null)}
            />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedLine && <Footer />}
    </div>
  );
}