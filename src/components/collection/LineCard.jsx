import React from "react";
import { motion } from "framer-motion";

export default function LineCard({ line, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group cursor-pointer"
      onClick={() => onClick(line)}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-5 border border-black bg-black">
        <img
          src={line.heroImage}
          alt={line.name}
          className="w-full h-full object-contain transition-transform duration-700"
          style={{ transform: "scale(1)", transition: "transform 700ms ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1">
            {line.subtitle}
          </p>
          <h3 className="font-serif text-xl font-light text-foreground">
            {line.name}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            {line.colorways.length} colorways
          </p>
        </div>
        <p className="font-sans text-sm text-foreground mb-0.5">
          ${line.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}