import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" } }),
};

export default function Vision() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">Future Craft</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-16">
            Vision
          </h1>
        </motion.div>

        <div className="max-w-3xl mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} custom={0} className="font-serif text-2xl md:text-3xl font-light italic leading-relaxed text-foreground mb-8">
              "Luxury should leave nothing behind — except the object itself."
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="font-sans text-sm leading-relaxed text-muted-foreground mb-6">
              AANI was founded on a single conviction: that the most sophisticated thing a luxury house can do is take full responsibility for its materials. We source only from tanneries that publish full supply-chain transparency. We dye with plant-derived pigments. We produce in strictly limited monthly runs — not as a marketing gesture, but because we believe scarcity should be earned, not manufactured.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-relaxed text-muted-foreground">
              Our long-term vision is the development of bio-based alternatives to traditional leather — cultivated materials that carry the same tactile richness and structural integrity as the finest calfskin, grown rather than taken. We are three years into that research. We will not rush it.
            </motion.p>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { label: "Monthly Production", value: "Limited Run", sub: "Never more than needed" },
            { label: "Supply Chain", value: "Fully Transparent", sub: "Three partner tanneries, Tuscany" },
            { label: "Dyes", value: "Plant-Derived", sub: "Zero synthetic colorants" },
            { label: "Carbon Offset", value: "100%", sub: "Verified annually, third-party audited" },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i} className="bg-background p-10">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">{stat.label}</p>
              <p className="font-serif text-3xl font-light text-foreground mb-1">{stat.value}</p>
              <p className="font-sans text-xs text-muted-foreground/60">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}