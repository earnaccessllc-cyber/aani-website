import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LineDetail from "@/components/collection/LineDetail";
import { useCollectionLines } from "@/lib/useCollectionLines";
import PageNotFound from "@/lib/PageNotFound";
import SEO, { SITE_URL } from "@/components/SEO";

// One indexable URL per style + colorway: /collection/:lineId/:colorwayId.
export default function Product() {
  const { lineId, colorwayId } = useParams();
  const navigate = useNavigate();
  const lines = useCollectionLines();
  const line = lines.find((l) => l.id === lineId);
  const colorway = line?.colorways.find((c) => c.id === colorwayId);

  if (!line || !colorway) return <PageNotFound />;

  const path = `/collection/${line.id}/${colorway.id}`;
  const title = `${line.name} in ${colorway.label}`;
  const description = `${line.name} in ${colorway.label} — ${line.material}. ${line.description}`.slice(0, 300);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: title,
      description: line.description,
      image: [colorway.front, colorway.back].filter(Boolean),
      sku: `${line.id}-${colorway.id}`,
      color: colorway.label,
      material: line.material,
      category: line.subtitle,
      brand: { "@type": "Brand", name: "AANI" },
      url: `${SITE_URL}${path}`,
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}${path}`,
        priceCurrency: "USD",
        price: line.price,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Collection", item: `${SITE_URL}/collection` },
        { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}${path}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} path={path} image={colorway.front} jsonLd={jsonLd} />
      <Navbar />
      <LineDetail
        key={line.id}
        line={line}
        initialColorwayId={colorway.id}
        onBack={() => navigate("/collection")}
        onColorwayChange={(cw) => navigate(`/collection/${line.id}/${cw.id}`, { replace: true })}
      />
      <Footer />
    </div>
  );
}
