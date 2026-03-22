"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lightbox from "./Lightbox";

/* ── Types ── */
interface HeroSlot { src: string | null; pos: string }
interface GridSlot { src: string | null; href: string; label: string; pos: string }
interface ProjectImages {
  hero: HeroSlot[];
  grid: GridSlot[];
  active: number;
}

/* ── Per-project image hook ── */
function useProjectImages(gridLabels: string[], initialHero: string[] = [], initialGrid: string[] = [], initialHrefs: string[] = []) {
  const [images, setImages] = useState<ProjectImages>({
    hero: [
      { src: initialHero[0] ?? null, pos: "center" },
      { src: initialHero[1] ?? null, pos: "center" },
      { src: initialHero[2] ?? null, pos: "center" },
    ],
    grid: gridLabels.map((l, i) => ({ src: initialGrid[i] ?? null, href: initialHrefs[i] ?? "", label: l, pos: "center" })),
    active: 0,
  });
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadedHero = images.hero.filter(h => h.src).length;

  useEffect(() => {
    if (loadedHero < 2) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setImages(prev => {
        const slots = prev.hero;
        let next = (prev.active + 1) % slots.length;
        for (let i = 0; i < slots.length; i++) {
          if (slots[next].src) break;
          next = (next + 1) % slots.length;
        }
        return { ...prev, active: next };
      });
    }, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [loadedHero]);

  const readFile = (file: File): Promise<string> =>
    new Promise(res => {
      const r = new FileReader();
      r.onload = e => res(e.target!.result as string);
      r.readAsDataURL(file);
    });

  const uploadHero = useCallback((idx: number, file: File) => {
    readFile(file).then(src => {
      setImages(prev => {
        const hero = [...prev.hero];
        hero[idx] = { ...hero[idx], src };
        return { ...prev, hero, active: idx };
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setHeroPos = useCallback((idx: number, pos: string) => {
    setImages(prev => {
      const hero = [...prev.hero];
      hero[idx] = { ...hero[idx], pos };
      return { ...prev, hero };
    });
  }, []);

  const setGridPos = useCallback((idx: number, pos: string) => {
    setImages(prev => {
      const grid = [...prev.grid];
      grid[idx] = { ...grid[idx], pos };
      return { ...prev, grid };
    });
  }, []);

  const clickCircle = useCallback((idx: number) => {
    setImages(prev => {
      if (!prev.hero[idx].src) return prev;
      return { ...prev, active: idx };
    });
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 8000);
  }, []);

  const uploadGrid = useCallback((idx: number, file: File) => {
    readFile(file).then(src => {
      setImages(prev => {
        const grid = [...prev.grid];
        grid[idx] = { ...grid[idx], src };
        return { ...prev, grid };
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setGridHref = useCallback((idx: number, href: string) => {
    setImages(prev => {
      const grid = [...prev.grid];
      grid[idx] = { ...grid[idx], href };
      return { ...prev, grid };
    });
  }, []);

  return { images, uploadHero, clickCircle, uploadGrid, setGridHref, setHeroPos, setGridPos };
}

/* ── Position control (3×3 crop grid) ── */
const POS_GRID = ["top left","top center","top right","center left","center","center right","bottom left","bottom center","bottom right"];
function PosControl({ current, onChange }: { current: string; onChange: (p: string) => void }) {
  return (
    <div className="pos-ctrl" onClick={e => e.stopPropagation()}>
      {POS_GRID.map(p => (
        <button key={p} className={`pos-btn${current === p ? " pos-btn--on" : ""}`} onClick={() => onChange(p)} title={p} />
      ))}
    </div>
  );
}

/* ── Camera icon ── */
const CamSvg = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="2.5" width="16" height="13" rx="1.5" stroke="rgba(245,240,232,0.3)" strokeWidth=".8" />
    <circle cx="9" cy="9" r="3.5" stroke="rgba(245,240,232,0.3)" strokeWidth=".8" />
  </svg>
);

/* ── Grid item with upload + link ── */
function GridItem({ slot, idx, projId, onSetHref, onSetPos, onLightbox }: {
  slot: GridSlot;
  idx: number;
  projId: string;
  onSetHref: (h: string) => void;
  onSetPos: (p: string) => void;
  onLightbox: () => void;
}) {
  const [showLink, setShowLink] = useState(false);
  const [linkVal, setLinkVal] = useState(slot.href);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const commitHref = () => {
    onSetHref(linkVal);
    setShowLink(false);
  };

  const inner = (
    <div
      className={`ppg-item${slot.href ? " has-link" : ""}`}
      onClick={slot.src && !slot.href ? onLightbox : undefined}
    >
      {slot.src && <img src={slot.src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: slot.pos }} />}
      {slot.src && <PosControl current={slot.pos} onChange={onSetPos} />}
      {/* Empty state: camera icon */}
      {!slot.src && (
        <label htmlFor={`pg-${projId}-${idx}`} style={{ display: "contents", cursor: "pointer" }}>
          <CamSvg />
        </label>
      )}
      {/* Label always visible at bottom */}
      <span className={`ppg-lbl${slot.src ? " ppg-lbl--filled" : ""}`}>{slot.label}</span>

      {/* Link indicator — always visible when href is set */}
      {slot.href && (
        <span className="ppg-link-badge" />
      )}

      {/* Image loaded, no hardcoded link: show link edit button */}
      {slot.src && !slot.href && (
        <button
          className="ppg-link-btn"
          onClick={e => { e.stopPropagation(); setShowLink(v => !v); setTimeout(() => linkInputRef.current?.focus(), 50); }}
        >
          Link
        </button>
      )}

      <input
        ref={linkInputRef}
        className={`ppg-link-input${showLink ? " show" : ""}`}
        placeholder="https://..."
        value={linkVal}
        onChange={e => setLinkVal(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") commitHref(); if (e.key === "Escape") setShowLink(false); }}
        onBlur={commitHref}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );

  if (slot.href) {
    return <a href={slot.href} target="_blank" rel="noopener noreferrer" style={{ display: "contents" }}>{inner}</a>;
  }
  return inner;
}

/* ── Project hero gallery ── */
function HeroGallery({ pid, images, onCircle, onPosChange, onLightbox }: {
  pid: string;
  images: ProjectImages;
  onCircle: (idx: number) => void;
  onPosChange: (idx: number, pos: string) => void;
  onLightbox: (src: string) => void;
}) {
  const activeSlot = images.hero[images.active];
  const activeSrc = activeSlot.src;

  return (
    <>
      {/* Loaded images — cross-fade via opacity */}
      {images.hero.map((slot, i) => (
        slot.src && (
          <div key={i} className="proj-hero-img-slot" style={{ opacity: i === images.active ? 1 : 0 }}>
            <img src={slot.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: slot.pos, display: "block" }} />
          </div>
        )
      ))}

      {/* Position control for active slot */}
      {activeSrc && (
        <div style={{ position: "absolute", top: 56, left: 12, zIndex: 4 }}>
          <PosControl current={activeSlot.pos} onChange={p => onPosChange(images.active, p)} />
        </div>
      )}

      {/* Empty state */}
      {!activeSrc && (
        <label htmlFor={`hu-${pid}-0`} className="gallery-upload-hint" style={{ cursor: "pointer" }}>
          <CamSvg />
          <span>Tap to add photo</span>
        </label>
      )}

      {/* Loaded state: tap to open lightbox */}
      {activeSrc && (
        <div
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
          onClick={() => onLightbox(activeSrc)}
        />
      )}
    </>
  );
}

/* ── Visit interface ── */
interface Visit { name: string; time: string }

/* ── Main Portfolio component ── */
export default function Portfolio() {
  /* Photo upload for hero right panel */
  const [heroPhoto, setHeroPhoto] = useState<string | null>("/images/Profile Photo.JPG");

  /* Per-project image galleries */
  const p0 = useProjectImages(
    ["Results", "Instagram", "E-com"],
    ["/images/Kunvarani_1.jpg", "/images/Kunvarani_2.jpeg", "/images/Kunvarani_3.jpeg"],
    ["/images/Kunvarani_4.png", "/images/Kunvarani_5.JPG", "/images/Kunvarani_6.JPG"],
    ["https://drive.google.com/file/d/11SQWiawGe80Dbi4WyBeDU47JNr_9C4B5/view?usp=sharing", "https://www.instagram.com/kunvarani.in?igsh=NTVudWJyeXVnanFi&utm_source=qr", ""],
  );
  const p1 = useProjectImages(
    ["Sample Campaign Brief", "Awards", "Instagram"],
    ["/images/Schbang_1.jpg", "/images/Schbang_2.jpg", "/images/Schbang_3.jpg"],
    ["/images/Schbang_4.PNG", "/images/Schbang Award Photo.jpg", "/images/Schbang_6.jpg"],
    ["https://docs.google.com/document/d/1HhEC66wDsL10MfSc_4TNmOoZbAeGj7bM/edit?usp=drive_link&ouid=114241819344773173667&rtpof=true&sd=true", "https://drive.google.com/file/d/1bE7AD7phwvUfc2eVPcdR8T4g3tvaalWn/view?usp=drive_link", "https://www.instagram.com/woknroll.india/"],
  );
  const p2 = useProjectImages(
    ["Brand Book", "Web Audit", "Testimonial"],
    ["/images/Hobby&Me_1.JPG", "/images/Hobby&Me_2.png", "/images/Hobby&Me_3.PNG"],
    ["/images/Hobby&Me_4.PNG", "/images/Hobby&Me_5.PNG", "/images/Hobby&Me_6.png"],
    ["https://docs.google.com/document/d/1UNqGF2N7d_Ev8CVp9tYgjD4kI2U2P3TizcKd8zjxV9s/edit?usp=sharing", "https://drive.google.com/file/d/1itB5_fnFqTh6foOKUvYS_T3BwR6Y70PD/view?usp=sharing", ""],
  );
  const p3 = useProjectImages(
    ["Pitch Deck", "Social", "Identity"],
    ["/images/Affairmuse_1.jpg", "/images/Affairmuse_2.JPG", "/images/Affairmuse_3.jpg"],
    ["/images/Affairmuse_4.JPG", "/images/Affairmuse_5.jpg", "/images/Affairmuse_6.jpg"],
    ["https://drive.google.com/file/d/1lBD4mcyyYLhCKkJR8YMBONnDYD2ZXl_P/view?usp=sharing", "", "https://docs.google.com/document/d/10SEDlYMRWcC5cv1dYymmPb_4RxIq79ad4yI8kRhAwZs/edit?usp=drive_link"],
  );
  const projects = [p0, p1, p2, p3];

  /* Lightbox */
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const openLightbox = (srcs: string[], idx: number) => setLightbox({ images: srcs, index: idx });
  const closeLightbox = () => setLightbox(null);

  /* Tracker + form */
  const [isAdmin, setIsAdmin] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [trackerUrl, setTrackerUrl] = useState("");
  const [trackerVisible, setTrackerVisible] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const trackerNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    /* Custom cursor */
    const cur = document.getElementById("cur")!;
    const rng = document.getElementById("curR")!;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);
    let rafId: number;
    const tick = () => {
      cur.style.left = mx + "px"; cur.style.top = my + "px";
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      rng.style.left = rx + "px"; rng.style.top = ry + "px";
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onEnter = () => { rng.style.transform = "translate(-50%,-50%) scale(2.2)"; rng.style.opacity = ".7"; };
    const onLeave = () => { rng.style.transform = "translate(-50%,-50%) scale(1)"; rng.style.opacity = ".4"; };
    const bindTargets = () => {
      document.querySelectorAll("a,button,.btn,.cbtn,.proj,.scroll-cue").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bindTargets();

    /* Nav scroll */
    const onScroll = () => document.getElementById("nav")?.classList.toggle("sc", window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    /* Scroll reveal */
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".rv,.rv2").forEach(el => obs.observe(el));

    /* Tracker visit detection */
    const stored: Visit[] = JSON.parse(localStorage.getItem("kd_v") || "[]");
    const params = new URLSearchParams(window.location.search);
    const vn = params.get("vn");
    if (vn) {
      const visitTime = new Date().toISOString();
      stored.unshift({ name: vn, time: visitTime });
      if (stored.length > 20) stored.pop();
      localStorage.setItem("kd_v", JSON.stringify(stored));
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: vn, time: visitTime }),
      }).catch(() => {});
    }
    setVisits(stored);
    const admin = new URLSearchParams(window.location.search).get("admin") === "1";
    setIsAdmin(admin);
    if (admin) document.body.classList.add("admin");

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = ev => setHeroPhoto(ev.target!.result as string);
    r.readAsDataURL(file);
  };

  const genLink = () => {
    const n = trackerNameRef.current?.value.trim();
    if (!n) return;
    const slug = n.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const url = window.location.href.split("?")[0].split("#")[0] + "?ref=" + slug + "&vn=" + encodeURIComponent(n);
    setTrackerUrl(url);
    setTrackerVisible(true);
    if (trackerNameRef.current) trackerNameRef.current.value = "";
  };

  const copyLnk = () => {
    navigator.clipboard.writeText(trackerUrl).then(() => {
      setCopyText("Copied ✓");
      setTimeout(() => setCopyText("Copy"), 2000);
    });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  const subForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  /* ── Project data ── */
  const projectDefs = [
    {
      id: "kunvarani",
      accent: "burgundy",
      gradient: "linear-gradient(135deg,#1E1A28,#3D3050,#5A4870)",
      avatar: "K",
      badge: "Current",
      badgeLoc: "Bangalore, India",
      nameEl: <><span>Kunvarani</span> <em>, Ongoing</em></>,
      statVal: "Ongoing", statLbl: "Full-stack brand build", showStat: false,
      client: "Kunvarani · Bangalore",
      titleEl: <>The Boutique<br /><em>Experience</em></>,
      desc: "I'm currently leading the identity for this fashion boutique in Bangalore. It's a lean operation where I wear every hat available: personally organising and creatively directing the photoshoots, AI editing visuals and videos, and managing the brand growth strategy. After years of avoiding code, I realised it was the only thing standing between us and a finished e-commerce website. So I built a Claude Code AI agent to help me code the platform myself. I'm now managing our digital presence and teaching myself the nuances of paid media so our digital growth keeps pace with our in-store activations.",
      tags: ["Brand Strategy", "Creative Direction", "AI E-com", "Paid Media", "Photography"],
      roleEl: <em>Brand &amp; Growth Strategist</em>,
      sideLabel2: "Scope",
      sideVal2: "Brand identity · Digital · In-store activations · E-commerce",
      stats: [{ n: "9.2%", l: "Organic follower growth" }, { n: "653%", l: "Organic growth in reach" }, { n: "293.8%", l: "Organic growth in profile activity" }],
    },
    {
      id: "schbang",
      accent: "sage",
      gradient: "linear-gradient(135deg,#2A2018,#4A3C30,#6B5A48)",
      avatar: "S",
      badge: "Nov 2024–2025",
      badgeLoc: "Bangalore, India",
      nameEl: <><span>Schbang</span> <em>· Bangalore</em></>,
      statVal: "5M+ Reach", statLbl: "FMCG", showStat: true,
      client: "Schbang · Bangalore",
      titleEl: <>The<br /><em>Agency Pace</em></>,
      desc: "I managed the workflows for two concurrent clients externally and 3 teams internally to coordinate deliverables. I turned client requirements into actionable briefs and saw them through strategy-backed pitch decks, campaign concepts and visual designs. My first campaign for a client became the 2nd highest-performing post on their page of all time, with 5M+ reach. I then turned those raw performance metrics into a media plan that won gold at the Asia-Pacific Stevie Awards for Most Innovative Instagram Page, through our women's day campaign.",
      tags: ["Campaign Management", "Cross-functional", "Performance Media", "Analytics"],
      roleEl: <em>Brand Strategist &amp; Project Coordinator</em>,
      sideLabel2: "Achievement",
      sideVal2: "Asia-Pacific Stevie Award: Most Innovative Instagram Page",
      stats: [{ n: "2", l: "Clients" }, { n: "5M+", l: "Reach" }, { n: "3", l: "Awards" }],
    },
    {
      id: "hobbyme",
      accent: "sage",
      gradient: "linear-gradient(135deg,#3A4A32,#7A8C6E,#96A88A)",
      avatar: "H",
      badge: "Pre-Launch",
      badgeLoc: "Remote, Hyderabad",
      nameEl: <><span>Hobby</span><em>&amp;Me</em></>,
      statVal: "Full kit", statLbl: "End-to-end brand launch", showStat: false,
      client: "Hobby&Me · Pre-Launch",
      titleEl: <>Building a personality before<br />the <em>product launched</em></>,
      desc: "I built the entire DNA for this DIY hobby start-up while they're still building towards launch. I wrote the brand story, designed an AI persona and mapped out every email funnel in the stack. I also audited the web content on Figma and created a product naming system. This was a complete brand launch kit, handed over and ready to go the moment they are. The 4-week project turned into a 3-month collaboration as my role was extended to develop launch content for their socials.",
      tags: ["Brand Book", "Launch Strategy", "Email Marketing", "AI Persona"],
      roleEl: <em>Brand Identity &amp; Strategy</em>,
      sideLabel2: "Deliverables",
      sideVal2: "Brand story · AI persona · Email funnels · Naming system · Web audit",
      stats: [{ n: "9+", l: "Deliverables" }, { n: "2", l: "Project extensions" }, { n: "1", l: "Brand built" }],
    },
    {
      id: "affairmuse",
      accent: "burgundy",
      gradient: "linear-gradient(135deg,#3D1018,#6B1F2A,#8A3040)",
      avatar: "A",
      badge: "2025",
      badgeLoc: "Remote, San Francisco",
      nameEl: <><span>Affairmuse</span> <em>, SF</em></>,
      statVal: "1.56×", statLbl: "Organic growth · 8 weeks", showStat: false,
      client: "Affairmuse · Remote, US",
      titleEl: <>The Pitch That<br /><em>Brought It to Life</em></>,
      desc: "Affairmuse was a San Francisco-based startup with a clear vision and an identity that didn't reflect it yet. Working remotely from India, I partnered with the founder and developed a pitch deck that captured her brand vision end-to-end, repositioning the aesthetic toward something contemporary, authentic, and genuinely human. The founder ultimately decided to pivot her business due to supply chain constraints, but the strategy we built together was the foundation she needed to see where the brand could go. I grew her followers organically by 1.56x in eight weeks along the way.",
      tags: ["Brand Strategy", "Visual Identity", "Organic Social", "Pitch Deck"],
      roleEl: <em>Brand Strategist</em>,
      sideLabel2: "Scope",
      sideVal2: "Visual identity · Positioning · Pitch deck · Social content strategy",
      stats: [{ n: "1.56×", l: "Growth" }, { n: "8w", l: "Timeline" }, { n: "$0", l: "Paid spend" }],
    },
  ];

  return (
    <>
      {/* ── All file inputs hoisted here — position:fixed escapes overflow:hidden on iOS ── */}
      {/* File inputs — each individually position:fixed so no overflow:hidden can clip them */}
      <input id="hero-photo" type="file" accept="image/*" style={{ position: "fixed", left: "-9999px", top: "-9999px", width: "1px", height: "1px", opacity: 0 }} onChange={handleHeroPhotoUpload} />
      {projectDefs.map((def, pi) => (
        <span key={def.id}>
          {[0, 1, 2].map(i => (
            <input key={`h${i}`} id={`hu-${def.id}-${i}`} type="file" accept="image/*"
              style={{ position: "fixed", left: "-9999px", top: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              onChange={e => { const f = e.target.files?.[0]; if (f) projects[pi].uploadHero(i, f); }}
            />
          ))}
          {[0, 1, 2].map(i => (
            <input key={`g${i}`} id={`pg-${def.id}-${i}`} type="file" accept="image/*"
              style={{ position: "fixed", left: "-9999px", top: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              onChange={e => { const f = e.target.files?.[0]; if (f) projects[pi].uploadGrid(i, f); }}
            />
          ))}
        </span>
      ))}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onNav={i => setLightbox(prev => prev ? { ...prev, index: i } : null)}
        />
      )}

      <div id="cur" />
      <div id="curR" />

      {/* ── Nav ── */}
      <nav id="nav">
        <a href="#" className="nav-logo">Khushi Dassani</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#decks">Decks</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-photo">
          <div className="hero-photo-bg" style={{ background: "linear-gradient(160deg,#3a2830 0%,#6B1F2A 55%,#8a3a48 100%)" }} />
          <div className="hero-photo-overlay" />
          <div className="hero-float">
            <div className="hf-strip">
              <div className="hf-item" style={{ backgroundImage: "url('/images/Cover page polaroid_1.JPG')" }} />
              <div className="hf-item" style={{ backgroundImage: "url('/images/Cover page polaroid_2.JPG')" }} />
              <div className="hf-item" style={{ backgroundImage: "url('/images/Cover page polaroid_3.JPG')" }} />
            </div>
            <div className="hf-title">Fashion and Lifestyle Marketer</div>
          </div>
          <div className="hero-photo-text">
            <div className="hpt-eyebrow">Brand Strategist</div>
            <div className="hpt-quote">I love biting off more than I can chew…<br /><em>and then figuring it out</em></div>
            <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(245,240,232,.35)", marginTop: "14px" }}>Words to live by</div>
          </div>
        </div>
        <div className="hero-copy">
          <div className="hc-eyebrow">Brand Strategist</div>
          <h1 className="hc-name">Khushi<br /><em>Dassani.</em></h1>
          <div className="hc-rule" />
          {!heroPhoto ? (
            <label
              htmlFor="hero-photo"
              style={{ width: "100%", aspectRatio: "4/3", background: "rgba(107,31,42,.08)", border: "1px dashed rgba(107,31,42,.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "36px", cursor: "pointer" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="4" width="24" height="20" rx="2" stroke="#6B1F2A" strokeWidth="1" opacity=".4" />
                <circle cx="14" cy="14" r="5" stroke="#6B1F2A" strokeWidth="1" opacity=".4" />
                <circle cx="21" cy="7" r="1.5" fill="#6B1F2A" opacity=".4" />
              </svg>
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "8px", letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(107,31,42,.4)" }}>Tap to add photo</span>
            </label>
          ) : (
            <div
              style={{ width: "100%", aspectRatio: "4/3", marginBottom: "36px", cursor: "pointer", overflow: "hidden", position: "relative" }}
              onClick={() => openLightbox([heroPhoto!], 0)}
            >
              <img src={heroPhoto!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
          <div className="hc-stats">
            <div className="hc-stat"><div className="hc-stat-val">5</div><div className="hc-stat-lbl">Brands built</div></div>
            <div className="hc-stat"><div className="hc-stat-val">9.2%</div><div className="hc-stat-lbl">Organic follower growth</div></div>
            <div className="hc-stat"><div className="hc-stat-val">5M+</div><div className="hc-stat-lbl">Campaign reach</div></div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {["Brand Strategy","Visual Identity","Campaign Management","Creative Direction","Paid Media","AI Tooling","Photography","Brand Strategy","Visual Identity","Campaign Management","Creative Direction","Paid Media","AI Tooling","Photography"].map((item, i) => (
            i % 2 === 0
              ? <span key={i}>{item}</span>
              : <span key={i} className="dot">✦</span>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="about" id="about">
        <div className="rv">
          <span className="sec-lbl">About</span>
          <h2>The<br /><em>Backstage Pass</em></h2>
        </div>
        <div className="about-r rv2">
          <p>I moved to the UK at eighteen with enough money to cover only half a year&apos;s rent. To cover the rest, I worked two jobs, and when that wasn&apos;t quite enough, I picked up a camera and started shooting alongside other gigs to find exactly where my interests and skills collided. I graduated from the University of Nottingham. I also figured out very early that I can learn pretty much anything if I have to.</p>
          <p>That turned out to be the most useful thing a degree could have taught me.</p>
          <p>Since then I&apos;ve built brand identities in the UK, India, and for a startup in San Francisco. My approach to strategy tends to involve actually building expertise in other roles first: directing shoots, writing copy, auditing websites on Figma, and most recently (I&apos;ve been showing this off to everyone!), building an AI agent to help code an e-commerce site. It wasn&apos;t really my job, but the brand needed it, and I was a one-person team.</p>
          <p>I&apos;m not the strategist who hands you a deck and wishes you luck.</p>
          <div className="about-sig">Khushi</div>
        </div>
      </section>

      {/* ── Work ── */}
      <section className="work" id="work">
        <div className="work-hd rv">
          <div>
            <span className="wlbl">Selected Work</span>
            <h2>Strategy<br /><em>in action</em></h2>
          </div>
        </div>
        <div className="proj-list">
          {projectDefs.map((def, pi) => {
            const pg = projects[pi];
            const loadedHeroSrcs = pg.images.hero.filter(h => h.src).map(h => h.src as string);
            return (
              <div className={`proj rv proj--${def.accent}`} key={def.id}>
                <div className="proj-topbar">
                  <div className="proj-topbar-avatar">{def.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div className="proj-topbar-name">{def.nameEl}</div>
                    <div className="proj-topbar-loc">{def.badgeLoc}</div>
                  </div>
                  <div className="proj-topbar-badge">{def.badge}</div>
                </div>
                <div className="proj-hero">
                  {/* Gradient fallback */}
                  <div className="proj-hero-img" style={{ background: def.gradient }} />
                  <div className="proj-hero-overlay" />

                  {/* Gallery images on top of gradient */}
                  <HeroGallery
                    pid={def.id}
                    images={pg.images}
                    onCircle={pg.clickCircle}
                    onPosChange={pg.setHeroPos}
                    onLightbox={src => {
                      const idx = loadedHeroSrcs.indexOf(src);
                      openLightbox(loadedHeroSrcs, idx >= 0 ? idx : 0);
                    }}
                  />

                  {/* Circle thumbnails — desktop overlay */}
                  <div className="proj-thumb-row proj-thumb-row--desktop" style={{ zIndex: 4 }}>
                    {pg.images.hero.map((slot, i) => (
                      slot.src ? (
                        <div
                          key={i}
                          className={`proj-thumb${i === pg.images.active ? " active" : ""}`}
                          style={{ backgroundImage: `url('${slot.src}')` }}
                          onClick={e => { e.stopPropagation(); pg.clickCircle(i); }}
                        />
                      ) : (
                        <label
                          key={i}
                          htmlFor={`hu-${def.id}-${i}`}
                          className={`proj-thumb empty${i === pg.images.active ? " active" : ""}`}
                          style={{ cursor: "pointer" }}
                          onClick={e => e.stopPropagation()}
                        >
                          +
                        </label>
                      )
                    ))}
                  </div>

                  {def.showStat && (
                    <div className="proj-hero-stat proj-hero-stat--desktop">
                      <div className="phs-val">{def.statVal}</div>
                      <div className="phs-lbl">{def.statLbl}</div>
                    </div>
                  )}
                </div>

                {/* Circles + stat — mobile strip below hero */}
                <div className="proj-controls-mobile">
                  <div className="proj-thumb-row--mobile">
                    {pg.images.hero.map((slot, i) => (
                      slot.src ? (
                        <div
                          key={i}
                          className={`proj-thumb${i === pg.images.active ? " active" : ""}`}
                          style={{ backgroundImage: `url('${slot.src}')` }}
                          onClick={() => pg.clickCircle(i)}
                        />
                      ) : (
                        <label key={i} htmlFor={`hu-${def.id}-${i}`} className="proj-thumb empty">+</label>
                      )
                    ))}
                  </div>
                  {def.showStat && (
                    <div className="proj-hero-stat proj-hero-stat--mobile">
                      <div className="phs-val">{def.statVal}</div>
                      <div className="phs-lbl">{def.statLbl}</div>
                    </div>
                  )}
                </div>

                <div className="proj-body">
                  <div className="proj-main">
                    <span className="proj-client">{def.client}</span>
                    <div className="proj-title">{def.titleEl}</div>
                    <p className="proj-desc">{def.desc}</p>
                    <div className="proj-tags">
                      {def.tags.map(t => <span key={t} className="ptag">{t}</span>)}
                    </div>
                  </div>
                  <div className="proj-side">
                    <div className="ps-block">
                      <div className="ps-label">Role</div>
                      <div className="ps-val">{def.roleEl}</div>
                    </div>
                    <div className="ps-rule" />
                    <div className="ps-block">
                      <div className="ps-label">{def.sideLabel2}</div>
                      <div className="ps-val">{def.sideVal2}</div>
                    </div>
                    <div className="ps-rule" />
                    <div className="ps-stats">
                      {def.stats.map(s => (
                        <div key={s.l} className="ps-stat">
                          <div className="ps-stat-n">{s.n}</div>
                          <div className="ps-stat-l">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Photo grid */}
                <div className="proj-photo-grid">
                  {pg.images.grid.map((slot, gi) => (
                    <GridItem
                      key={gi}
                      slot={slot}
                      idx={gi}
                      projId={def.id}
                      onSetHref={h => pg.setGridHref(gi, h)}
                      onSetPos={p => pg.setGridPos(gi, p)}
                      onLightbox={() => slot.src && openLightbox([slot.src], 0)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Pitch Decks ── */}
      <section className="decks" id="decks">
        <div className="decks-hd rv">
          <span className="wlbl">Selected Work</span>
          <h2>Pitch Decks<br /><em>I&apos;ve built</em></h2>
        </div>
        <div className="decks-grid rv2">
          {[
            { title: "Brand Strategy", brand: "Affairmuse", href: "/images/Affairmuse x KD  Brand Strategy.pdf.pdf", cover: "/images/Affairmuse Deck_Cover.png" },
            { title: "Final Presentation", brand: "Henkel", href: "/images/Henkel_Presentation_Final.pptx", cover: "/images/Henkel Deck Cover .png" },
            { title: "Pitch Deck", brand: "Lafolie", href: "/images/Lafolie.pdf", cover: "/images/Lafolie Deck Cover.png" },
          ].map((deck, i) => (
            <a key={i} href={deck.href || undefined} target="_blank" rel="noopener noreferrer" className={`deck-card${deck.href ? "" : " deck-card--no-link"}`}>
              <div className="deck-cover">
                {deck.cover
                  ? <img src={deck.cover} alt={deck.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span className="deck-placeholder">Cover</span>}
              </div>
              <div className="deck-info">
                <div className="deck-brand">{deck.brand}</div>
                <div className="deck-title">{deck.title}</div>
                {deck.href && <div className="deck-cta">View deck →</div>}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact" id="contact">
        <div className="contact-grid">
          <div className="rv">
            <span className="sec-lbl">Get In Touch</span>
            <h2>Let&apos;s make<br /><em>magic</em><br />together.</h2>
            <p>If you&apos;re working on something in fashion, lifestyle, or consumer brands and need someone who can run strategy and execution in the same breath, my inbox is open.</p>
            <a href="mailto:khushidassani5@gmail.com" className="contact-email">khushidassani5@gmail.com</a>
          </div>
          <div className="rv2">
            {isAdmin && <div className="tracker">
              <span className="sec-lbl">Visitor Tracking</span>
              <h3>Generate a tracked link</h3>
              <p>Know exactly who viewed your portfolio and when.</p>
              <div className="trow">
                <input ref={trackerNameRef} id="tName" type="text" placeholder="e.g. Sarah at Vogue" onKeyDown={e => e.key === "Enter" && genLink()} />
                <button className="btn" onClick={genLink}>Generate</button>
              </div>
              <div className={`tresult${trackerVisible ? " on" : ""}`}>
                <span className="turl">{trackerUrl}</span>
                <button className="cbtn" onClick={copyLnk}>{copyText}</button>
              </div>
              <div className="vlog">
                {visits.length === 0
                  ? <p className="novists">No visits yet.</p>
                  : visits.map((v, i) => (
                    <div className="ventry" key={i}>
                      <span className="vname">{v.name}</span>
                      <span className="vtime">{formatTime(v.time)}</span>
                      <span className="vbadge">Viewed</span>
                    </div>
                  ))}
              </div>
            </div>}
            {!formSubmitted ? (
              <form className="cform" onSubmit={subForm}>
                <div className="frow">
                  <div className="fg"><label>Name</label><input type="text" placeholder="Your name" required /></div>
                  <div className="fg"><label>Email</label><input type="email" placeholder="your@email.com" required /></div>
                </div>
                <div className="fg"><label>Message</label><textarea rows={4} placeholder="Tell me about your project..." /></div>
                <div className="fsub">
                  <p className="fnote">Each message is read personally.</p>
                  <button type="submit" className="btn">Send</button>
                </div>
              </form>
            ) : null}
            <div className={`fsuccess${formSubmitted ? " on" : ""}`}>Your message arrived safely. I&apos;ll be in touch. ✦</div>
          </div>
        </div>
      </section>

      <footer>
        <div className="flogo">Khushi Dassani</div>
        <div className="fnote-f">khushidassani5@gmail.com · © 2026</div>
      </footer>
    </>
  );
}
