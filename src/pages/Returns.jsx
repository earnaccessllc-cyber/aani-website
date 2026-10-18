import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEO from "@/components/SEO";

// Keep RETURN_DAYS in sync with the return policy entered in Google Merchant Center.
const RETURN_DAYS = 14;
const CONTACT = "contact@aanimetier.com";

const SECTIONS = [
  {
    title: "Eligibility",
    body: [
      `You may return any full-price piece within ${RETURN_DAYS} days of the date it is delivered to you.`,
      "To be accepted, the piece must be unused and in its original condition, with all tags attached and returned in its original dust bag and packaging. Pieces that show signs of wear, damage, alteration, or scent cannot be accepted.",
    ],
  },
  {
    title: "How to Return",
    body: [
      `Email ${CONTACT} within ${RETURN_DAYS} days of delivery with your order number and the piece you would like to return. We will reply with return instructions and the address to send it to.`,
      "Please use a tracked, insured shipping service. We are not responsible for returns lost or damaged in transit, and return shipping costs are the customer's responsibility.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "Once your return arrives and passes inspection at our atelier, we will refund the price of the piece to your original payment method. Refunds are issued within 5–10 business days of inspection; your bank may take a few additional days to post it.",
      "Original shipping charges are non-refundable. Orders paid with Klarna or Afterpay are refunded through that provider.",
    ],
  },
  {
    title: "Exchanges",
    body: [
      `To exchange a piece for a different colorway, return the original as described above and place a new order. If you would like us to hold a colorway for you while your return is in transit, mention it in your email to ${CONTACT}.`,
    ],
  },
  {
    title: "Damaged or Incorrect Orders",
    body: [
      `If your piece arrives damaged or is not what you ordered, email ${CONTACT} within 48 hours of delivery with your order number and photos. We will arrange a replacement or full refund, including shipping, at no cost to you.`,
    ],
  },
];

export default function Returns() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Returns & Refunds"
        description={`AANI return policy: unused pieces in original condition may be returned within ${RETURN_DAYS} days of delivery for a refund to the original payment method.`}
        path="/returns"
      />
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">Customer Care</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-6">
            Returns &amp; Refunds
          </h1>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-2xl mb-16">
            Each AANI piece is made by hand and inspected before it leaves our atelier. If it is not right for you, you may return it within {RETURN_DAYS} days of delivery.
          </p>
        </motion.div>

        <div className="max-w-2xl space-y-12">
          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">{title}</h2>
              <div className="space-y-4">
                {body.map((p, i) => (
                  <p key={i} className="font-sans text-sm leading-relaxed text-muted-foreground">{p}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="font-sans text-sm leading-relaxed text-muted-foreground pt-4 border-t border-border">
            Questions about a return? Contact{" "}
            <a href={`mailto:${CONTACT}?subject=Return%20Request`} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">{CONTACT}</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
