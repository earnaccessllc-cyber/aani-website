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

export default function Craft() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Métier"
        description="Inside the making of an AANI bag: how a single artisan makes each piece by hand, from raw hide to finished object, with no assembly line."
        path="/metier"
      />
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">The Making</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-16">
            Métier
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
              Each piece, one pair<br /><span className="italic">of hands</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-sans text-sm leading-relaxed text-muted-foreground">
              In our atelier, every bag passes through the hands of a single artisan from the first cut to the final stitch. No assembly line. No division of labor. Just one artisan's unbroken attention — from raw hide to finished object.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-6">
            <motion.div variants={fadeUp} custom={0} className="aspect-[3/4] overflow-hidden rounded-sm bg-card">
              <img
                src="/craft-leather-strips-v2.jpg"
                alt="Hand-cut leather strips measured for the Trellara weave"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-16">
          {[
            { step: "01", title: "Selection", text: "Each hide is premium, natural leather from Italian tanneries, chosen by hand for its character." },
            { step: "02", title: "Weaving", text: "For our woven styles, the Trellara weave requires cutting each strip to a precise width, then interlacing by hand. Depending on the style, a single piece takes 48 to 72 hours to weave." },
            { step: "03", title: "Finishing", text: "Every piece is finished and inspected by hand before it leaves the atelier." },
          ].map((item, i) => (
            <motion.div key={item.step} variants={fadeUp} custom={i} className="relative pt-8">
              <span className="font-serif text-5xl font-light opacity-10 absolute top-0 left-0">{item.step}</span>
              <h3 className="font-serif text-xl font-light mb-3 mt-6">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-24 md:mt-32 border-t border-border pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-5">
            <motion.p variants={fadeUp} custom={0} className="font-sans text-xs tracking-widest uppercase text-primary mb-3">Our Vision</motion.p>
            <motion.p variants={fadeUp} custom={1} className="font-serif text-2xl md:text-3xl font-light italic leading-relaxed text-foreground">
              "True luxury is something you never have to replace."
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-7">
            <motion.p variants={fadeUp} custom={1} className="font-sans text-sm leading-relaxed text-muted-foreground mb-6">
              AANI was founded on a single conviction: that the most sophisticated thing a luxury house can do is take full responsibility for its materials. We produce in strictly limited monthly runs — not as a marketing gesture, but because we believe scarcity should be earned, not manufactured.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-relaxed text-muted-foreground">
              Our vision is simple: honor the material. Natural leather, chosen with care and worked by hand, is one of the few materials that grows more beautiful with time. We make pieces meant to be carried for decades — and passed on.
            </motion.p>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { label: "Monthly Production", value: "Limited Run", sub: "Never more than needed" },
            { label: "Material", value: "Natural Leather", sub: "Premium hides only — never synthetic" },
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