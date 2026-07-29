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

export default function Craft() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">The Making</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-16">
            Craft
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-5">
            <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
              Each piece, one pair<br /><span className="italic">of hands</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-sans text-sm leading-relaxed text-muted-foreground">
              In our Veneto atelier, every bag passes through the hands of a single artisan from the first cut to the final stitch. No assembly line. No division of labour. Just one craftsperson's unbroken attention — from raw hide to finished object.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-7">
            <motion.div variants={fadeUp} custom={0} className="aspect-[16/10] overflow-hidden rounded-sm bg-card">
              <img
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/b657718e-ce99-4757-a032-83b0e179b075.webp"
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-16">
          {[
            { step: "01", title: "Sourcing", text: "We work exclusively with three tanneries in Tuscany, each supplying a distinct character of hide — selected by hand, never by catalogue." },
            { step: "02", title: "Weaving", text: "The Trellara weave requires cutting each strip to a precise width, then interlacing by hand. A single bag takes up to four hours of weaving alone." },
            { step: "03", title: "Finishing", text: "Edges are hand-painted, not sealed. Hardware is set cold. The final piece rests for 48 hours before inspection — time is considered a material." },
          ].map((item, i) => (
            <motion.div key={item.step} variants={fadeUp} custom={i} className="relative pt-8">
              <span className="font-serif text-5xl font-light opacity-10 absolute top-0 left-0">{item.step}</span>
              <h3 className="font-serif text-xl font-light mb-3 mt-6">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}