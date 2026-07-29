import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Invisible Identity",
    text: "In an age of over-signification, we chose silence. No logo adorns our surfaces — yet the hand knows. The eye knows. The Trellara weave is our signature, written in texture rather than type.",
  },
  {
    number: "02",
    title: "Living Materials",
    text: "We partner with nature, not against it. Our bio-based leathers are cultivated from mycelium, dyed with plant-derived pigments, and finished with zero synthetic chemicals. Luxury that gives back.",
  },
  {
    number: "03",
    title: "The Artisan's Time",
    text: "Each piece carries the unbroken attention of a single craftsperson. We measure quality not in minutes saved, but in hours given — the quiet accumulation of care made tangible.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Philosophy() {
  return (
    <section id="atelier" className="py-24 md:py-40 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <motion.p variants={fadeUp} custom={0} className="font-sans text-xs tracking-widest uppercase opacity-60 mb-3">
            Philosophy
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl font-light leading-tight">
            Three pillars of
            <br />
            <span className="italic">quiet craft</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative"
            >
              <motion.span
                variants={fadeUp}
                custom={i}
                className="font-serif text-6xl font-light opacity-10 absolute -top-4 -left-1"
              >
                {pillar.number}
              </motion.span>
              <motion.div variants={fadeUp} custom={i + 0.5} className="pt-10">
                <h3 className="font-serif text-xl font-light mb-4">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed opacity-70">
                  {pillar.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}