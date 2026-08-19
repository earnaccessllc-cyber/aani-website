import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Self-hosted from /public. The source upload was HEVC in a QuickTime
// container, which Chrome and Firefox refuse to decode; both files below are
// H.264/AAC MP4 with the moov atom moved to the front (faststart) so playback
// can begin before the whole file has downloaded.
const HERO_VIDEO = "/hero.mp4";           // 1920x1080, ~3.7 MB
const HERO_VIDEO_MOBILE = "/hero-mobile.mp4"; // 1280x720, ~1.8 MB
const HERO_POSTER = "/hero-poster.jpg";

// Phones get the 720p cut — at that viewport it's indistinguishable and saves
// ~2 MB. Resolved once on mount rather than via <source media="...">, whose
// support for picking between video sources is inconsistent across browsers.
const pickSource = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    ? HERO_VIDEO_MOBILE
    : HERO_VIDEO;

export default function HeroSection() {
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc] = useState(pickSource);
  const videoRef = useRef(null);

  // Autoplay only survives if the element is muted at the moment play() is
  // called, so set the property directly instead of trusting the JSX prop.
  // If the browser still blocks it, videoReady stays false and the poster
  // remains as a static hero rather than leaving an empty frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const played = video.play();
    if (played) played.catch(() => {});
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nowMuted = !muted;
    video.muted = nowMuted;
    setMuted(nowMuted);
    // The click is a user gesture, so an unmuted play() is permitted here
    // even if autoplay was previously blocked.
    if (!nowMuted && video.paused) video.play().catch(() => {});
  };

  return (
    <section className="relative min-h-screen flex items-start md:items-center overflow-hidden">
      {/* Background video. A 16:9 film cropped to fill a portrait phone shows
          barely a quarter of its width, so on mobile it gets a band at the top
          at its own scale and the copy sits beneath it; from md up the viewport
          is wide enough for the original full-bleed treatment. */}
      <div className="absolute inset-x-0 top-0 h-[50vh] md:h-full overflow-hidden">
        {/* Poster frame: paints instantly and stays underneath, so the video
            simply fades in on top of it with no transparent gap mid-fade. */}
        <img
          src={HERO_POSTER}
          alt=""
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setVideoReady(true)}
          aria-label="AANI Mêtier campaign film"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0, pointerEvents: "none" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" style={{ top: "80px" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-[50vh] pt-8 pb-16 md:mt-0 md:pt-0 md:pb-0">
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
        className="absolute right-6 top-[calc(50vh-4rem)] md:top-auto md:bottom-8 md:right-8 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-background/50 transition-all duration-300"
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
