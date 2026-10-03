// src/components/sections/Preloader.jsx
// XP-bar counter preloader (0 -> 100) with split curtain reveal under 1.8 seconds.
// Guarantees zero freezes with synchronous session check and failsafe unmount.

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EASINGS } from "../../lib/motion";

export const Preloader = ({ onComplete }) => {
  // If already seen in this session, don't even mount into the DOM
  const [isDone, setIsDone] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return Boolean(sessionStorage.getItem("sg_preloader_seen"));
    } catch (_) {
      return false;
    }
  });

  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const contentRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isDone) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    let progress = 0;
    const durationMs = 1200;
    const intervalMs = 20;
    const step = 100 / (durationMs / intervalMs);

    const timer = setInterval(() => {
      progress += step;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        setCount(100);

        // Run split-curtain exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem("sg_preloader_seen", "true");
            } catch (_) {}
            setIsDone(true);
            if (onCompleteRef.current) onCompleteRef.current();
          },
        });

        tl.to(contentRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
          ease: "power2.in",
        });

        tl.to(
          topHalfRef.current,
          {
            yPercent: -100,
            duration: 0.55,
            ease: EASINGS.entrance,
          },
          "-=0.05"
        );

        tl.to(
          bottomHalfRef.current,
          {
            yPercent: 100,
            duration: 0.55,
            ease: EASINGS.entrance,
          },
          "<"
        );
      } else {
        setCount(Math.round(progress));
      }
    }, intervalMs);

    // Hard failsafe: Never allow preloader to block the screen longer than 2.0s
    const failsafe = setTimeout(() => {
      clearInterval(timer);
      try {
        sessionStorage.setItem("sg_preloader_seen", "true");
      } catch (_) {}
      setIsDone(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(failsafe);
    };
  }, [isDone]);

  if (isDone) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] pointer-events-auto flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top Curtain Half */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A] border-b border-white/10"
      />

      {/* Bottom Curtain Half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A] border-t border-white/10"
      />

      {/* Center XP Loading Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-sm w-full"
      >
        {/* Brand Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 p-2.5 mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(255,150,0,0.15)] animate-pulse">
          <img
            src="/assets/logo.webp"
            alt="SmartGap"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Level / XP Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#FF9600] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#FF9600] font-bold">
            INITIALIZING LEVEL 01
          </span>
        </div>

        {/* Giant Monospace XP Counter */}
        <div className="font-mono font-black text-6xl sm:text-7xl text-white tracking-tighter my-2 tabular-nums">
          {count}
          <span className="text-xl sm:text-2xl text-white/40 ml-1 font-normal font-sans">
            %
          </span>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-4 border border-white/10 p-[1px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF9600] via-[#DA5127] to-[#FF9600] transition-all duration-75 shadow-[0_0_15px_rgba(255,150,0,0.8)]"
            style={{ width: `${count}%` }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-3">
          Loading Next-Gen Learning Engine...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
