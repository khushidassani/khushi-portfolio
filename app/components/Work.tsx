"use client";

import FadeIn from "./FadeIn";

const projects = [
  {
    num: "01 / 03",
    title: "Affairmuse",
    type: "Brand Strategy · Visual Identity · Social Growth",
    label: "I",
    ornament: "♠",
    location: "SAN FRANCISCO",
  },
  {
    num: "02 / 03",
    title: "Hobby&Me",
    type: "Brand Book · Launch Strategy · Email Marketing",
    label: "II",
    ornament: "♦",
    location: "HYDERABAD",
  },
  {
    num: "03 / 03",
    title: "Schbang &\nKunvarani",
    type: "Campaign Management · 5M+ Impressions · AI E-com",
    label: "III",
    ornament: "♣",
    location: "BANGALORE",
  },
];

function Card1() {
  return (
    <svg viewBox="0 0 400 530" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id="g1a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A1219" />
          <stop offset="100%" stopColor="#7A3040" />
        </linearGradient>
      </defs>
      <rect width="400" height="530" fill="url(#g1a)" />
      <circle cx="200" cy="200" r="130" fill="none" stroke="#C4A882" strokeWidth="0.5" opacity="0.3" />
      <circle cx="200" cy="200" r="95" fill="none" stroke="#C4A882" strokeWidth="0.5" opacity="0.25" />
      <circle cx="200" cy="200" r="60" fill="rgba(196,168,130,0.06)" />
      <path d="M200 70 Q230 130 200 200 Q170 270 200 330" fill="none" stroke="#D4BC9A" strokeWidth="1" opacity="0.4" />
      <path d="M200 70 Q160 140 200 200 Q240 260 200 330" fill="none" stroke="#D4BC9A" strokeWidth="1" opacity="0.3" />
      <path d="M120 280 L160 250 L200 265 L250 220 L290 230" fill="none" stroke="#A8B89A" strokeWidth="2" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="290" cy="230" r="4" fill="#A8B89A" opacity="0.6" />
      <circle cx="120" cy="130" r="2" fill="#C4A882" opacity="0.4" />
      <circle cx="300" cy="160" r="2" fill="#C4A882" opacity="0.4" />
      <circle cx="80" cy="220" r="1.5" fill="#C4A882" opacity="0.3" />
      <circle cx="330" cy="300" r="1.5" fill="#C4A882" opacity="0.3" />
      <text x="200" y="210" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="6" fill="#D4BC9A" opacity="0.5">SAN FRANCISCO</text>
      <line x1="0" y1="100" x2="400" y2="100" stroke="#fff" strokeWidth="0.3" opacity="0.04" />
      <line x1="0" y1="200" x2="400" y2="200" stroke="#fff" strokeWidth="0.3" opacity="0.04" />
      <line x1="0" y1="300" x2="400" y2="300" stroke="#fff" strokeWidth="0.3" opacity="0.04" />
      <line x1="100" y1="0" x2="100" y2="530" stroke="#fff" strokeWidth="0.3" opacity="0.04" />
      <line x1="200" y1="0" x2="200" y2="530" stroke="#fff" strokeWidth="0.3" opacity="0.04" />
      <line x1="300" y1="0" x2="300" y2="530" stroke="#fff" strokeWidth="0.3" opacity="0.04" />
    </svg>
  );
}

function Card2() {
  return (
    <svg viewBox="0 0 400 530" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id="g2a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A5C42" />
          <stop offset="100%" stopColor="#8FA080" />
        </linearGradient>
      </defs>
      <rect width="400" height="530" fill="url(#g2a)" />
      <rect x="110" y="120" width="100" height="140" rx="3" fill="rgba(245,240,232,0.07)" stroke="#D4BC9A" strokeWidth="0.8" opacity="0.5" />
      <rect x="125" y="135" width="70" height="2" rx="1" fill="#D4BC9A" opacity="0.4" />
      <rect x="125" y="145" width="55" height="1.5" rx="1" fill="#D4BC9A" opacity="0.3" />
      <rect x="125" y="153" width="60" height="1.5" rx="1" fill="#D4BC9A" opacity="0.3" />
      <rect x="125" y="161" width="45" height="1.5" rx="1" fill="#D4BC9A" opacity="0.25" />
      <rect x="125" y="185" width="70" height="40" rx="2" fill="rgba(196,168,130,0.12)" />
      <circle cx="270" cy="155" r="12" fill="none" stroke="#D4BC9A" strokeWidth="1" opacity="0.4" />
      <circle cx="296" cy="155" r="12" fill="none" stroke="#D4BC9A" strokeWidth="1" opacity="0.4" />
      <line x1="279" y1="155" x2="340" y2="220" stroke="#D4BC9A" strokeWidth="1.2" opacity="0.35" />
      <line x1="287" y1="155" x2="340" y2="200" stroke="#D4BC9A" strokeWidth="1.2" opacity="0.35" />
      <rect x="230" y="280" width="120" height="70" rx="2" fill="none" stroke="#F5F0E8" strokeWidth="0.6" opacity="0.2" />
      <path d="M230 280 L290 325 L350 280" fill="none" stroke="#F5F0E8" strokeWidth="0.6" opacity="0.2" />
      <circle cx="80" cy="350" r="30" fill="none" stroke="#D4BC9A" strokeWidth="0.5" opacity="0.2" />
      <circle cx="80" cy="350" r="18" fill="rgba(196,168,130,0.05)" />
      <line x1="80" y1="320" x2="80" y2="380" stroke="#D4BC9A" strokeWidth="0.6" opacity="0.2" />
      <line x1="50" y1="350" x2="110" y2="350" stroke="#D4BC9A" strokeWidth="0.6" opacity="0.2" />
      <text x="200" y="430" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="5" fill="#D4BC9A" opacity="0.4">HYDERABAD</text>
    </svg>
  );
}

function Card3() {
  return (
    <svg viewBox="0 0 400 530" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id="g3a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2C2520" />
          <stop offset="100%" stopColor="#5C5048" />
        </linearGradient>
      </defs>
      <rect width="400" height="530" fill="url(#g3a)" />
      <circle cx="200" cy="195" r="100" fill="none" stroke="#C4A882" strokeWidth="0.4" opacity="0.2" />
      <circle cx="200" cy="195" r="75" fill="none" stroke="#C4A882" strokeWidth="0.4" opacity="0.2" />
      <circle cx="200" cy="195" r="50" fill="none" stroke="#C4A882" strokeWidth="0.4" opacity="0.2" />
      <line x1="200" y1="95" x2="200" y2="75" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="270" y1="125" x2="283" y2="111" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="300" y1="195" x2="320" y2="195" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="270" y1="265" x2="283" y2="279" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="200" y1="295" x2="200" y2="315" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="130" y1="265" x2="117" y2="279" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="100" y1="195" x2="80" y2="195" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <line x1="130" y1="125" x2="117" y2="111" stroke="#C4A882" strokeWidth="0.6" opacity="0.25" />
      <text x="200" y="185" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fill="#D4BC9A" opacity="0.18" fontStyle="italic">5M+</text>
      <text x="200" y="208" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" letterSpacing="4" fill="#C4A882" opacity="0.3">IMPRESSIONS</text>
      <path d="M160 340 L200 310 L240 340 L230 385 L200 375 L170 385 Z" fill="none" stroke="#C4A882" strokeWidth="0.7" opacity="0.25" />
      <circle cx="200" cy="345" r="16" fill="none" stroke="#C4A882" strokeWidth="0.6" opacity="0.2" />
      <text x="200" y="350" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="#D4BC9A" opacity="0.35">★</text>
      <text x="200" y="450" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="5" fill="#D4BC9A" opacity="0.4">BANGALORE</text>
    </svg>
  );
}

const cardSVGs = [Card1, Card2, Card3];

export default function Work() {
  return (
    <section id="work" className="bg-[#2C2520] py-[120px] px-8 md:px-[60px]">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <FadeIn direction="up">
          <div className="flex justify-between items-baseline mb-[70px]">
            <div>
              <p className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.4em] uppercase text-[#A8B89A] mb-4">
                Selected Projects
              </p>
              <h2
                className="font-[family-name:var(--font-cormorant)] font-light text-[#F5F0E8] leading-[1.1]"
                style={{ fontSize: "clamp(42px, 5vw, 68px)" }}
              >
                Strategy
                <br />
                <em className="italic text-[#D4BC9A]">in action</em>
              </h2>
            </div>
          </div>
        </FadeIn>

        {/* Cards grid */}
        <FadeIn direction="up" delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {projects.map((project, i) => {
              const SVG = cardSVGs[i];
              return (
                <div
                  key={project.num}
                  className="group relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* SVG background with scale on hover */}
                  <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                    <SVG />
                  </div>

                  {/* Default label */}
                  <span
                    className="absolute top-9 left-9 font-[family-name:var(--font-cormorant)] text-[13px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(212,188,154,0.25)" }}
                  >
                    {project.label}
                  </span>

                  {/* Ornament */}
                  <span
                    className="absolute top-[30px] right-[30px] text-[28px]"
                    style={{ opacity: 0.15 }}
                  >
                    {project.ornament}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end px-9 pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(to top, rgba(20,15,12,0.85) 0%, transparent 60%)" }}
                  >
                    <p className="font-[family-name:var(--font-cormorant)] text-[11px] tracking-[0.3em] text-[#D4BC9A] mb-3">
                      {project.num}
                    </p>
                    <p className="font-[family-name:var(--font-cormorant)] text-[28px] font-light text-[#F5F0E8] leading-[1.2] mb-2 whitespace-pre-line">
                      {project.title}
                    </p>
                    <p className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.25em] uppercase text-[#A8B89A]">
                      {project.type}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
