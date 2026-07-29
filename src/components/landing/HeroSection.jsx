import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSection() {
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef(null);

  const sendVimeoCommand = (command, value) => {
    if (!iframeRef.current) return;
    const msg = JSON.stringify({ method: command, value });
    iframeRef.current.contentWindow.postMessage(msg, "https://player.vimeo.com");
  };

  // Once iframe loads, set initial muted state
  const handleIframeLoad = () => {
    sendVimeoCommand("setVolume", 0);
  };

  const toggleMute = () => {
    const nowMuted = !muted;
    setMuted(nowMuted);
    sendVimeoCommand("setVolume", nowMuted ? 0 : 1);
  };

  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden">
      {/* Vimeo background video */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "177.78vh",
            minWidth: "100%",
            height: "56.25vw",
            minHeight: "100%",
            pointerEvents: "none",
          }}
        >
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1182830579?h=tl&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&api=1"
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen"
            title="AANI Hero Video"
            onLoad={handleIframeLoad}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" style={{ top: "80px" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-0 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-4"
          >
            Capsule Collection — Spring 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight text-foreground"
          >
            Structured
            <br />
            <span className="italic font-light">Elegance</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 md:mt-12"
          >
            <div className="w-12 h-px bg-primary mb-6" />
            <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-sm">
              Where centuries of Italian artisanship meet the restless pulse of the contemporary city.
              A dialogue between stillness and stride.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10"
          >
            <a
              href="/collection"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
            >
              Discover the Collection
              <span className="text-lg">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-background/50 transition-all duration-300"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}