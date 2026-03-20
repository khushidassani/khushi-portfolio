"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(2)";
        ringRef.current.style.opacity = "0.8";
      }
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        ringRef.current.style.opacity = "0.5";
      }
    };

    const targets = document.querySelectorAll("a,button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: 8,
          height: 8,
          background: "#6B1F2A",
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 32,
          height: 32,
          border: "1px solid #6B1F2A",
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          opacity: 0.5,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
