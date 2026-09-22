import React from "react";
import SEO, { SITE_URL } from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import BrandStory from "../components/landing/BrandStory";
import TextureShowcase from "../components/landing/TextureShowcase";
import ConceptAccessory from "../components/landing/ConceptAccessory";
import Philosophy from "../components/landing/Philosophy";
import Footer from "../components/landing/Footer";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AANI",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "AANI is a luxury leather goods house handcrafting the Trellara hand-woven leather clutch and handbag collection in a small atelier in Veneto, Italy.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manhattan",
    addressRegion: "NY",
    addressCountry: "US",
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AANI",
  url: SITE_URL,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AANI | Hand-Woven Italian Leather Handbags & Clutches"
        description="Hand-woven Italian leather clutches and handbags, each crafted by a single artisan from first cut to final stitch in a small atelier in Veneto, Italy."
        path="/"
        jsonLd={[ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]}
      />
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