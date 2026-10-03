// src/components/ui/CustomCursor.jsx
// Desktop custom cursor with inner dot, glowing tracking ring, and contextual text badge (PLAY, DRAG, OPEN)

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/motion";

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices and when reduced motion is not requested
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      prefersReducedMotion()
    ) {
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // QuickTo for 60fps tracking without layout shift
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Listen for custom data-cursor-text or interactive hover targets
    const onPointerOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      const interactive = e.target.closest("button, a, [role='button'], input, select, textarea, .cursor-pointer");

      if (target) {
        const text = target.getAttribute("data-cursor");
        setCursorText(text || "");
        setIsHoveringInteractive(true);
      } else if (interactive) {
        setCursorText("");
        setIsHoveringInteractive(true);
      } else {
        setCursorText("");
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("pointerover", onPointerOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("pointerover", onPointerOver);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Inner Volt Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 transition-transform duration-150"
      >
        <div
          className={`rounded-full bg-[#FF9600] transition-all duration-200 shadow-[0_0_10px_rgba(255,150,0,0.8)] ${
            cursorText
              ? "size-0 opacity-0"
              : isHoveringInteractive
              ? "size-3 scale-125"
              : "size-2"
          }`}
        />
      </div>

      {/* Outer Tracking Ring / Label Bubble */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-transform duration-200"
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            cursorText
              ? "px-3.5 py-1.5 bg-gradient-to-r from-[#FF9600] to-[#DA5127] text-white font-mono font-black text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(255,150,0,0.6)] scale-100"
              : isHoveringInteractive
              ? "size-12 border-2 border-[#FF9600] bg-[#FF9600]/10 backdrop-blur-xs scale-110"
              : "size-8 border border-white/40 bg-white/5 backdrop-blur-[2px]"
          }`}
        >
          {cursorText && <span>{cursorText}</span>}
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
