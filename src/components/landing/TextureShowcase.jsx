import React from "react";
import { motion } from "framer-motion";

const WEAVE_IMAGE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/d959ff6b-b1d6-44ee-a57b-4d1fa5410524.webp";

const details = [
{
  label: "Material",
  value: "Premium Calfskin",
  desc: "Sourced from the finest Italian tanneries, naturally dyed"
},
{
  label: "Technique",
  value: "Hand-Woven Trellara",
  desc: "Each strip interlaced by a single artisan over 48 hours"
},
{
  label: "Finish",
  value: "Matte Burnished",
  desc: "Develops a unique patina with time and wear"
}];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: "easeOut" }
  })
};

export default function TextureShowcase() {
  return (
    <section id="craft" className="py-24 md:py-40 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative">

            <div className="aspect-square overflow-hidden rounded-sm">
              <img src="https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/69cb2346-8bbb-4ef5-a90d-78ae17198235.webp"

              alt="Close-up of Trellara hand-woven leather texture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" decoding="async" />


            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/20 rounded-sm hidden md:block" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}>

            <motion.p variants={fadeUp} custom={0} className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
              Certificate of Craft
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl font-light leading-tight text-foreground mb-4">
              The language
              <br />
              <span className="italic">of texture</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-relaxed text-muted-foreground mb-10 max-w-md">
              In a world saturated with logos, AANI speaks through touch alone. The Trellara weave is not
              a decorative choice — it is an identity, recognizable by fingertip before eye.
            </motion.p>

            <div className="space-y-8">
              {details.map((detail, i) =>
              <motion.div
                key={detail.label}
                variants={fadeUp}
                custom={i + 3}
                className="border-t border-border pt-6">

                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                      {detail.label}
                    </span>
                    <span className="font-serif text-lg font-light text-foreground">
                      {detail.value}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground/70">
                    {detail.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}