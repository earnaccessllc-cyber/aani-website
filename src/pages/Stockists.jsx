import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" } }),
};

export default function Stockists() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Stockists"
        description="Boutique stockist inquiries for AANI hand-woven Italian leather clutches and handbags."
        path="/stockists"
      />
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">Where to Find Us</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-16">
            Stockists
          </h1>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl">
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
            Become a<br /><span className="italic">stockist</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="font-sans text-sm leading-relaxed text-muted-foreground mb-6">
            AANI is currently available directly through our atelier. We are selectively partnering with boutiques that share our appreciation for craft, material, and pieces made slowly by hand.
          </motion.p>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-relaxed text-muted-foreground mb-10">
            Boutiques interested in stocking AANI, please get in touch with our stockist team.
          </motion.p>
          <motion.a
            variants={fadeUp}
            custom={3}
            href="mailto:stockists@aanimetier.com?subject=Stockist%20Inquiry"
            className="inline-block font-sans text-xs tracking-widest uppercase border border-foreground/30 px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            stockists@aanimetier.com
          </motion.a>
          <motion.p variants={fadeUp} custom={4} className="font-sans text-sm leading-relaxed text-muted-foreground mt-12">
            Customers with questions about a piece or an order, please contact{" "}
            <a href="mailto:contact@aanimetier.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">contact@aanimetier.com</a>.
          </motion.p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
