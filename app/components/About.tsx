"use client";

import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section
      id="about"
      className="py-[120px] px-8 md:px-[60px] max-w-[1200px] mx-auto"
    >
      <div className="grid md:grid-cols-[1fr_1.6fr] gap-[80px] items-start">

        {/* Left */}
        <FadeIn direction="up">
          <p
            className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.4em] uppercase text-[#7A8C6E] mb-6"
          >
            About
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light leading-[1.2] text-[#6B1F2A]"
            style={{ fontSize: "clamp(36px, 4vw, 54px)" }}
          >
            Brand
            <br />
            <em className="italic">Strategist</em>
          </h2>
        </FadeIn>

        {/* Right */}
        <FadeIn direction="up" delay={0.15}>
          <p
            className="about-dropcap text-[17px] leading-[1.9] text-[#2C2520] mb-6"
            style={{ opacity: 0.8 }}
          >
            I'm a brand strategist with international experience in fashion,
            lifestyle, and consumer brands. I bring creative vision and execution
            together — building brand identities through campaigns and activations
            that spark real engagement and deliver measurable results.
          </p>
          <p
            className="text-[17px] leading-[1.9] text-[#2C2520] mb-6"
            style={{ opacity: 0.8 }}
          >
            With a BA (Hons) in International Media and Communications from the
            University of Nottingham and hands-on experience across Bangalore,
            London, and San Francisco, I thrive in ambitious environments where
            bold ideas meet individual impact.
          </p>
          <p
            className="font-[family-name:var(--font-cormorant)] text-[36px] font-light italic text-[#6B1F2A] mt-10"
            style={{ opacity: 0.8 }}
          >
            — Khushi Dassani
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
