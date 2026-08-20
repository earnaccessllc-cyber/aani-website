import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Collection", href: "/collection" },
  { label: "Craft", href: "/craft" },
  { label: "Vision", href: "/vision" },
  { label: "Atelier", href: "/atelier" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHome ? "bg-transparent" : scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Hidden rather than unmounted on the home page: this row is
              justify-between, so dropping the mark would pull the nav links
              over to the left. `invisible` also takes it out of the tab order
              and the accessibility tree, so it isn't announced or focusable
              where it can't be seen. Every other page keeps it. */}
          <Link
            to="/"
            className={`font-serif text-2xl md:text-3xl font-light tracking-widest text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] ${
              isHome ? "invisible" : ""
            }`}
          >
            AANI
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => window.scrollTo(0, 0)}
                className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}
                  className="font-serif text-3xl font-light tracking-wider text-foreground"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}