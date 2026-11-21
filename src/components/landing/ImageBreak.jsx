import React from "react";

export default function ImageBreak() {
  return (
    <section className="mt-16 md:mt-24">
      <div className="relative aspect-[4/5] md:aspect-[16/8] overflow-hidden">
        <img
          src="/atelier-clutch-wall.jpg"
          alt="Model carrying a woven Trellara leather clutch"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
