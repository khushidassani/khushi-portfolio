"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ mixBlendMode: "multiply" }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 md:px-[60px] py-7"
    >
      <a
        href="#"
        className="font-[family-name:var(--font-cormorant)] text-[13px] tracking-[0.3em] uppercase text-[#2C2520] no-underline"
      >
        Khushi Dassani
      </a>

      {/* Desktop */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-[family-name:var(--font-montserrat)] text-[10px] tracking-[0.25em] uppercase text-[#2C2520] no-underline opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="block w-5 h-px bg-[#2C2520]"
        />
        <motion.span
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="block w-5 h-px bg-[#2C2520]"
        />
        <motion.span
          animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="block w-5 h-px bg-[#2C2520]"
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#2C2520]/10 px-8 py-6"
          >
            <ul className="list-none flex flex-col gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-[family-name:var(--font-montserrat)] text-[10px] tracking-[0.25em] uppercase text-[#2C2520] opacity-70 hover:opacity-100 transition-opacity duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
