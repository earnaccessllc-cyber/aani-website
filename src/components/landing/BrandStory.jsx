import React from "react";
import { motion } from "framer-motion";

const CRAFT_IMAGE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/f6862f69-c4c4-4cb5-aeff-dcd00d6a6efc.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function BrandStory() {
  return (
    <section id="collection" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5"
          >
            <motion.p variants={fadeUp} custom={0} className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
              The Narrative
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl font-light leading-tight text-foreground">
              Between stillness
              <br />
              <span className="italic">and stride</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 md:pt-4"
          >
            <motion.p variants={fadeUp} custom={2} className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground">
              Created for the sophisticated, elegant woman with an appreciation for timeless style, this piece is a testament to the enduring beauty of intentional design. Every bag is meticulously handcrafted by master artisans, marrying the finest, carefully sourced leathers with substantial, premium hardware. In a deliberate stand against the environmental waste of mass production, AANI releases strictly limited quantities each month. This considered approach not only preserves the exclusivity of your piece but ensures that every stitch and fold receives the uncompromising attention it deserves, resulting in an heirloom-quality companion that is as conscious as it is captivating.
            </motion.p>
          </motion.div>
        </div>

        {/* Image break */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-24 md:mt-32"
        >
          <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-sm">
            <img
              src={CRAFT_IMAGE}
              alt="Italian leather artisan at work in the atelier"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-foreground/5" />
          </div>
          <p className="font-sans text-xs text-muted-foreground mt-4 tracking-wide">
            The Atelier — Veneto, Italy. Each weave completed by a single artisan from start to finish.
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-24 md:mt-32 max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="w-8 h-px bg-primary mx-auto mb-8" />
          <motion.blockquote variants={fadeUp} custom={1} className="font-serif text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed text-foreground">
            "Craft is not nostalgia. It is the future, practiced slowly."
          </motion.blockquote>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-6">
            — AANI Creative Direction
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}