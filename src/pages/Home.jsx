import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import BrandStory from "../components/landing/BrandStory";
import TextureShowcase from "../components/landing/TextureShowcase";
import ConceptAccessory from "../components/landing/ConceptAccessory";
import Philosophy from "../components/landing/Philosophy";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BrandStory />
      <TextureShowcase />
      <ConceptAccessory />
      <Philosophy />
      <Footer />
    </div>
  );
}