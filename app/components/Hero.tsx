"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative grid md:grid-cols-2 min-h-screen overflow-hidden">

      {/* ── LEFT: Burgundy ── */}
      <div className="relative bg-[#6B1F2A] flex flex-col justify-end px-8 md:px-[60px] pb-[80px] pt-[120px] overflow-hidden">
        {/* Giant 'A' watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute top-[-120px] right-[-60px] leading-none font-[family-name:var(--font-cormorant)] font-light"
          style={{ fontSize: 600, color: "rgba(255,255,255,0.03)" }}
        >
          A
        </span>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.4em] uppercase text-[#D4BC9A] mb-6"
        >
          Brand Strategist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-[family-name:var(--font-cormorant)] font-light text-[#F5F0E8] leading-[1.05]"
          style={{ fontSize: "clamp(52px, 7vw, 88px)" }}
        >
          Khushi
          <br />
          <em className="italic text-[#D4BC9A]">Dassani</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 text-base italic leading-[1.7] max-w-[320px]"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          Bringing creative vision and execution together — building brands that
          spark engagement and endure.
        </motion.p>
      </div>

      {/* ── RIGHT: Cream ── */}
      <div className="relative bg-[#F5F0E8] hidden md:block overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center px-[60px]">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-[family-name:var(--font-cormorant)] text-[13px] tracking-[0.3em] uppercase text-[#7A8C6E] mb-6"
          >
            Fashion · Lifestyle · Consumer Brands
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="font-[family-name:var(--font-cormorant)] font-light leading-[1.7] text-[#2C2520] max-w-[380px]"
            style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}
          >
            International experience. Intentional strategy. Always rooted in
            timeless elegance.
          </motion.p>
        </div>

        {/* ♠ watermark */}
        <span
          aria-hidden
          className="absolute bottom-[-20px] right-[30px] font-[family-name:var(--font-cormorant)] font-light leading-none select-none pointer-events-none"
          style={{ fontSize: 160, color: "rgba(107,31,42,0.06)" }}
        >
          ♠
        </span>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.3em] uppercase text-[#7A8C6E] bg-transparent border-none z-10"
      >
        Scroll
        <span className="scroll-line" />
      </motion.button>
    </section>
  );
}
