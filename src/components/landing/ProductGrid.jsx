import React from "react";
import { Link } from "react-router-dom";
import { useCollectionLines } from "@/lib/useCollectionLines";

// Image-led grid, no copy beyond name, color and price.
export default function ProductGrid() {
  const lines = useCollectionLines();
  const tiles = lines.flatMap((line) => line.colorways.map((colorway) => ({ line, colorway })));
  return (
    <section id="collection" className="pt-16 md:pt-24">
      <h2 className="px-6 md:px-12 mb-6 font-sans text-sm tracking-widest uppercase text-foreground">New</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-background">
        {tiles.map(({ line, colorway }) => (
          <Link key={`${line.id}-${colorway.id}`} to={`/collection/${line.id}/${colorway.id}`} className="group block bg-[#ebebeb]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={colorway.front}
                alt={`${line.name} in ${colorway.label}`}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="px-4 pb-5 -mt-2 flex items-baseline justify-between gap-3 font-sans text-xs tracking-wide uppercase">
              <span className="text-foreground">{line.name.replace(/^The /, "")}<span className="text-muted-foreground"> — {colorway.label}</span></span>
              <span className="text-foreground shrink-0">${line.price.toLocaleString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
