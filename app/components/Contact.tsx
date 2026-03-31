"use client";

import { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";

interface Visit {
  name: string;
  time: string;
}

function TrackerBox() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [name, setName] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio_visits") || "[]");
    const params = new URLSearchParams(window.location.search);
    const visitName = params.get("name");
    if (visitName) {
      const entry: Visit = { name: visitName, time: new Date().toISOString() };
      const updated = [entry, ...stored].slice(0, 20);
      localStorage.setItem("portfolio_visits", JSON.stringify(updated));
      setVisits(updated);
    } else {
      setVisits(stored);
    }
  }, []);

  const generate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const slug = trimmed.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const base = window.location.href.split("?")[0].split("#")[0];
    const url = `${base}?ref=${encodeURIComponent(slug)}&name=${encodeURIComponent(trimmed)}`;
    setGeneratedUrl(url);
    setName("");
  };

  const copy = () => {
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return (
      d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) +
      " · " +
      d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="relative bg-[#F5F0E8] border border-[#C4A882]/30 p-12 mb-16">
      {/* Offset shadow border */}
      <div
        className="absolute pointer-events-none border border-[#6B1F2A]/10"
        style={{ top: 8, left: 8, right: -8, bottom: -8 }}
      />

      <p className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.35em] uppercase text-[#7A8C6E] mb-5">
        Visitor Tracking
      </p>
      <h3 className="font-[family-name:var(--font-cormorant)] text-[28px] font-light text-[#2C2520] mb-2">
        Generate a tracked link
      </h3>
      <p className="text-[14px] italic leading-[1.7] mb-8" style={{ color: "rgba(44,37,32,0.6)" }}>
        Create a personalised link for each person you share your portfolio with.
        You'll know exactly who viewed it and when — without them ever knowing.
      </p>

      <div className="flex gap-3 mb-6 flex-col sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Recipient's name (e.g. Sarah at Vogue)"
          className="flex-1 border border-[#6B1F2A]/25 bg-white px-5 py-[14px] font-[family-name:var(--font-eb-garamond)] text-[15px] text-[#2C2520] outline-none focus:border-[#6B1F2A] transition-colors duration-300 placeholder:opacity-40 placeholder:italic"
        />
        <button
          onClick={generate}
          className="bg-[#6B1F2A] text-[#F5F0E8] px-8 py-[14px] font-[family-name:var(--font-montserrat)] text-[10px] tracking-[0.25em] uppercase hover:bg-[#4A1219] transition-colors duration-300 whitespace-nowrap"
        >
          Generate
        </button>
      </div>

      {generatedUrl && (
        <div className="flex items-center justify-between gap-4 bg-white border border-[#C4A882]/40 px-6 py-5 mb-6 flex-col sm:flex-row">
          <span className="flex-1 italic text-[15px] opacity-70 break-all font-[family-name:var(--font-eb-garamond)]">
            {generatedUrl}
          </span>
          <button
            onClick={copy}
            className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.2em] uppercase text-[#7A8C6E] bg-transparent border border-[#A8B89A] px-4 py-2 hover:bg-[#7A8C6E] hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      )}

      <div className="max-h-[200px] overflow-y-auto">
        {visits.length === 0 ? (
          <p className="italic opacity-40 text-[14px] py-4">
            No visits recorded yet — share a link to begin tracking.
          </p>
        ) : (
          visits.map((v, i) => (
            <div
              key={i}
              className="flex items-baseline gap-4 py-[10px] border-b border-[#C4A882]/15 text-[14px]"
            >
              <span className="font-[family-name:var(--font-cormorant)] text-[16px] italic text-[#6B1F2A] min-w-[120px]">
                {v.name}
              </span>
              <span className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.15em] uppercase opacity-50">
                {formatTime(v.time)}
              </span>
              <span className="bg-[#7A8C6E] text-white font-[family-name:var(--font-montserrat)] text-[8px] tracking-[0.15em] uppercase px-2 py-0.5">
                Viewed
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try emailing me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {!submitted ? (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.3em] uppercase opacity-60">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={fields.name}
                onChange={handleChange}
                placeholder="Your name"
                className="border-0 border-b border-[#6B1F2A]/20 bg-transparent py-3 font-[family-name:var(--font-eb-garamond)] text-[17px] text-[#2C2520] outline-none focus:border-[#6B1F2A] transition-colors duration-300 placeholder:opacity-30 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.3em] uppercase opacity-60">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={fields.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="border-0 border-b border-[#6B1F2A]/20 bg-transparent py-3 font-[family-name:var(--font-eb-garamond)] text-[17px] text-[#2C2520] outline-none focus:border-[#6B1F2A] transition-colors duration-300 placeholder:opacity-30 placeholder:italic"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.3em] uppercase opacity-60">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="border-0 border-b border-[#6B1F2A]/20 bg-transparent py-3 font-[family-name:var(--font-eb-garamond)] text-[17px] text-[#2C2520] outline-none focus:border-[#6B1F2A] transition-colors duration-300 placeholder:opacity-30 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.3em] uppercase opacity-60">
              Message
            </label>
            <textarea
              rows={5}
              name="message"
              required
              value={fields.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="border-0 border-b border-[#6B1F2A]/20 bg-transparent py-3 font-[family-name:var(--font-eb-garamond)] text-[17px] text-[#2C2520] outline-none focus:border-[#6B1F2A] transition-colors duration-300 placeholder:opacity-30 placeholder:italic resize-none w-full"
            />
          </div>
          {error && (
            <p className="italic text-[13px] text-[#6B1F2A] opacity-80">{error}</p>
          )}
          <div className="flex justify-between items-center mt-5 flex-col sm:flex-row gap-4">
            <p className="italic text-[13px] opacity-40 max-w-[300px] leading-[1.6]">
              Each message is read with care and replied to personally.
            </p>
            <button
              type="submit"
              disabled={sending}
              className="bg-[#6B1F2A] text-[#F5F0E8] px-8 py-[14px] font-[family-name:var(--font-montserrat)] text-[10px] tracking-[0.25em] uppercase hover:bg-[#4A1219] transition-colors duration-300 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-[#7A8C6E]/10 border border-[#A8B89A] px-7 py-5 italic text-[#7A8C6E] text-[15px]">
          Your message has arrived safely — I'll be in touch soon. ✦
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="py-[120px] px-8 md:px-[60px] max-w-[900px] mx-auto"
      >
        <FadeIn direction="up">
          <p className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.4em] uppercase text-[#7A8C6E] mb-6">
            Get In Touch
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light text-[#6B1F2A] leading-[1.1] mb-4"
            style={{ fontSize: "clamp(42px, 5vw, 72px)" }}
          >
            Let's create
            <br />
            <em className="italic">something</em>
            <br />
            together.
          </h2>
          <p
            className="text-[17px] italic leading-[1.6] mb-16"
            style={{ color: "rgba(44,37,32,0.6)" }}
          >
            Every detail looks after itself. Full of intention.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <TrackerBox />
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <ContactForm />
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A1219] px-8 md:px-[60px] py-[60px] flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <span
          className="font-[family-name:var(--font-cormorant)] text-[36px] font-light italic text-[#F5F0E8]"
          style={{ opacity: 0.6 }}
        >
          Khushi Dassani
        </span>
        <span
          className="font-[family-name:var(--font-montserrat)] text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]"
          style={{ opacity: 0.3 }}
        >
          khushidassani5@gmail.com · +91 95356 98942 · © 2026
        </span>
      </footer>
    </>
  );
}
