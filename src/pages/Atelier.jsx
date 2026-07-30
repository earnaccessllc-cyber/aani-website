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

export default function Atelier() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">Veneto, Italy</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-16">
            Atelier
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-6">
            <motion.div variants={fadeUp} custom={0} className="aspect-[4/5] overflow-hidden rounded-sm bg-card">
              <img
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/b657718e-ce99-4757-a032-83b0e179b075.webp"
                alt="The AANI Atelier"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-6">
            <motion.p variants={fadeUp} custom={0} className="font-sans text-xs tracking-widest uppercase text-primary mb-3">Est. 2021</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
              A single room.<br /><span className="italic">Twelve artisans.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-relaxed text-muted-foreground mb-6">
              Our atelier is located in a converted farmhouse outside Vicenza, in the heart of the Veneto — the same region that gave birth to the Trellara tradition. The space was chosen not for its address, but for its light: north-facing windows that provide an even, unwavering illumination for the detail work that defines our craft.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="font-sans text-sm leading-relaxed text-muted-foreground">
              Twelve artisans work here, each with more than a decade of experience in woven leather. They are not employees in the conventional sense — they are co-authors of every piece that leaves this building.
            </motion.p>
          </motion.div>
        </div>

      </div>
      <Footer />
    </div>
  );
}