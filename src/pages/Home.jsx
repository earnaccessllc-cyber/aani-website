import React from "react";
import SEO, { SITE_URL } from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import BrandStory from "../components/landing/BrandStory";
import TextureShowcase from "../components/landing/TextureShowcase";
import Philosophy from "../components/landing/Philosophy";
import Footer from "../components/landing/Footer";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AANI Métier",
  alternateName: "AANI",
  url: SITE_URL,
  logo: `${SITE_URL}/aani-logo.png`,
  description:
    "AANI is a luxury leather goods house making clutches and handbags by hand in premium Italian leather — from our signature woven Trellara styles to smooth, minimal silhouettes.",
  email: "contact@aanimetier.com",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@aanimetier.com",
    contactType: "customer service",
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
        title="AANI | Italian Leather Handbags & Clutches"
        description="Minimal in form, bold in feeling. Italian leather clutches and handbags, each made by hand in our atelier from first cut to final stitch."
        path="/"
        jsonLd={[ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]}
      />
      <Navbar />
      <h1 className="sr-only">AANI Italian Leather Clutches and Handbags</h1>
      <HeroSection />
      <BrandStory />
      <TextureShowcase />
      <Philosophy />
      <Footer />
    </div>
  );
}