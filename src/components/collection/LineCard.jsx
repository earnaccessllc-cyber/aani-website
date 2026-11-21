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
      <div className="relative aspect-square overflow-hidden mb-3 bg-[#f2f2f2]">
        <img
          src={line.heroImage}
          alt={line.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: "scale(1)", transition: "transform 700ms ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
      </div>

      <h3 className="font-sans text-xs tracking-[0.03em] uppercase text-foreground">{line.name}</h3>
      <p className="font-sans text-xs tracking-[0.03em] uppercase text-muted-foreground mt-0.5">{line.colorways.length} colorways</p>
      <p className="font-sans text-xs text-foreground mt-2">${line.price.toLocaleString()}</p>
    </motion.div>
  );
}