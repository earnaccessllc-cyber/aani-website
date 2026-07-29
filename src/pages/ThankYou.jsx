import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-sm"
        >
          {/* Decorative mark */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-10 h-px bg-primary mx-auto mb-10"
          />

          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-5">
            Order Confirmed
          </p>

          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wider text-foreground mb-6 leading-tight">
            Thank You
          </h1>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
            Your order has been received and is being prepared with care at our atelier.
          </p>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-12">
            A confirmation has been sent to your email address. You will receive a separate shipping update once your piece has been dispatched.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/collection"
              className="font-sans text-xs tracking-widest uppercase border border-foreground text-foreground py-3 px-8 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Return to Collection
            </Link>
            <Link
              to="/"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="w-10 h-px bg-primary mx-auto mt-12"
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}