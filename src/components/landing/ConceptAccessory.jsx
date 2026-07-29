import React from "react";
import { motion } from "framer-motion";

const CONCEPT_IMAGE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/e4c03a6d-da04-48f9-bbdc-bdadfd3b4d23.webp";

const specs = [
{ label: "Silhouette", value: "Sculptural tote — organic, flowing form" },
{ label: "Material", value: "Bio-based mycelium leather alternative" },
{ label: "Weave", value: "Reimagined macro Trellara, 3D relief" },
{ label: "Branding", value: "Zero visible logos — identity through texture" },
{ label: "Sustainability", value: "100% biodegradable, carbon-negative process" }];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: "easeOut" }
  })
};

export default function ConceptAccessory() {
  return (
    <section id="vision" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mb-16 md:mb-24">

          <motion.p variants={fadeUp} custom={0} className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
            Concept — Future Craft
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
            Tomorrow's
            <br />
            <span className="italic">heirloom</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-base leading-relaxed text-muted-foreground">
            What if the most advanced technology in fashion was also the most ancient? This concept piece
            bridges the Trellara heritage with bio-engineered materials — proving that luxury and
            sustainability are not opposing forces, but natural allies.
          </motion.p>
        </motion.div>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7">

            <div className="relative bg-card rounded-sm overflow-hidden">
              <div className="aspect-[4/3] md:aspect-[16/10]">
                <img src="https://d2ol7oe51mr4n9.cloudfront.net/user_3C62qrQi47uC0x8MHK3Z72TkiY5/7d67af26-93cb-4ee9-a870-c5b45c4df5ae.webp"
                alt="AANI concept accessory - bio-based Trellara bag" className="w-full h-full object-cover" />


              </div>
              <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                <span className="font-sans text-xs tracking-widest uppercase text-primary">
                  Concept Piece
                </span>
              </div>
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5">

            <motion.h3 variants={fadeUp} custom={0} className="font-serif text-2xl font-light text-foreground mb-2">
              The Tessuto Bag
            </motion.h3>
            <motion.p variants={fadeUp} custom={1} className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-8">
              Bio-Trellara Collection
            </motion.p>

            <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-relaxed text-muted-foreground mb-10">
              Grown, not manufactured. The Tessuto bag is constructed from mycelium-based leather — a living material
              cultivated in controlled bioreactors, then hand-woven using the same Trellara technique mastered
              over half a century. No logos. No hardware. Only the unmistakable silhouette and the tactile signature
              that speaks louder than any emblem.
            </motion.p>

            <div className="space-y-0">
              {specs.map((spec, i) =>
              <motion.div
                key={spec.label}
                variants={fadeUp}
                custom={i + 3}
                className="flex items-baseline justify-between py-4 border-b border-border">

                  <span className="font-sans text-xs tracking-wider uppercase text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="font-sans text-sm text-foreground text-right max-w-[55%]">
                    {spec.value}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}