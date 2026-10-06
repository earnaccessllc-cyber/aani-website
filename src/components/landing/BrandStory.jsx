import React from "react";
import { motion } from "framer-motion";


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
              Quiet form,
              <br />
              <span className="italic">loud presence</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 md:pt-4"
          >
            <motion.p variants={fadeUp} custom={2} className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground">
              AANI lives in the space between restraint and boldness. Every piece begins with a simple silhouette, then turns the volume up: exaggerated shapes, generous sculpted piping, and bold proportions that command attention. The outline stays clean; the details refuse to be quiet. Made by hand by master artisans from the finest Italian leather and released in strictly limited quantities each month, it is for the woman who refuses to choose between quiet and unforgettable.
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
          <div className="relative aspect-[8/5] overflow-hidden rounded-sm">
            <img
              src="/atelier-clutch-wall.jpg"
              alt="Model carrying a woven Trellara leather clutch"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-foreground/5" />
          </div>
          <p className="font-sans text-xs text-muted-foreground mt-4 tracking-wide text-center">
            One artisan, one weave — from the first strand to the last.
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
            "Luxury is not excess. It is time, given slowly."
          </motion.blockquote>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-6">
            — AANI Creative Direction
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}