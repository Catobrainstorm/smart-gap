// src/components/sections/LearningOutcomes.jsx
// Section 3.8: Learning Outcomes
// Layout: Zentry-style pinned expanding numbered list (01 to 06).
// Only the active row is fully expanded and illuminated; others are dimmed and collapsed.
// Active row transitions on scroll with a thin vertical progress line. Mobile tap-to-expand. Zero icons, zero tags.

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const OUTCOMES = [
  {
    num: "01",
    short: "Reconstruct your mental model of the world",
    text: "The Programme helps a young person reconstruct their mental model of the world so that they can expand their vision of what is truly possible.",
  },
  {
    num: "02",
    short: "Self-awareness immersion & natural problem solving",
    text: "Through a self awareness immersion it helps a learner to identify strength, capabilities and natural modes of problem solving.",
  },
  {
    num: "03",
    short: "Potential career & industry pathways",
    text: "Learners discover potential career and industry pathways through multiple informed career possibilities.",
  },
  {
    num: "04",
    short: "Global economy, wealth creation & capital deployment",
    text: "Learners develop an understanding of the global economy, how wealth is created, how capital is deployed around the world and how they can fit into the global matrix.",
  },
  {
    num: "05",
    short: "Technology inflections & AI-augmented learning",
    text: "Learners understand technology inflections and learn how to become AI augmented learners without surrendering their own critical thinking.",
  },
  {
    num: "06",
    short: "Conscious citizenship & nation building",
    text: "Learners become more conscious citizens and develop strong inclination for nation building.",
  },
];

export const LearningOutcomes = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop: Pin section and scrub through items 01 to 06
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const rawIndex = Math.floor(self.progress * OUTCOMES.length);
            const clampedIndex = Math.min(OUTCOMES.length - 1, Math.max(0, rawIndex));
            setActiveIndex(clampedIndex);
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="outcomes"
      className="relative w-full min-h-screen bg-[#0A0A0A] text-white py-[clamp(80px,10vh,140px)] px-6 sm:px-12 select-none overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* LEFT COLUMN: TITLE & INTRO PARAGRAPH */}
        <div className="lg:col-span-5 space-y-6 text-left lg:sticky lg:top-24">
          <h2 className="display-title text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.88]">
            Learning Outcomes
          </h2>

          <p className="font-body text-base sm:text-lg text-white/75 font-normal leading-[1.6] max-w-[42ch]">
            SmartGap is designed to intervene before career choices become deeply entrenched. It saves a young person from waiting to graduate from university to discover that traditional schooling has not prepared them for the demands of the 21st century marketplace.
          </p>
        </div>

        {/* RIGHT COLUMN: NUMBERED LIST (01 to 06) */}
        <div className="lg:col-span-7 relative flex gap-6 sm:gap-8">
          {/* Vertical Progress Line (Desktop) */}
          <div className="hidden lg:block w-[2px] bg-white/10 rounded-full relative self-stretch">
            <div
              className="w-full bg-gradient-to-b from-[#FF9600] to-[#DA5127] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(255,150,0,0.8)]"
              style={{
                height: `${((activeIndex + 1) / OUTCOMES.length) * 100}%`,
              }}
            />
          </div>

          {/* Numbered Rows: All text visible, illuminates on scroll */}
          <div className="flex-1 space-y-3.5 sm:space-y-4">
            {OUTCOMES.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.num}
                  onClick={() => setActiveIndex(idx)}
                  className={`group p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-white/[0.08] border-white/25 shadow-xl scale-[1.01] opacity-100"
                      : "bg-white/[0.06] lg:bg-white/[0.02] border-white/15 lg:border-white/8 opacity-100 lg:opacity-45 lg:hover:opacity-75 lg:hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Mono Number */}
                    <span
                      className={`font-mono text-xl sm:text-2xl lg:text-3xl font-black transition-colors duration-300 shrink-0 ${
                        isActive
                          ? "text-[#FF9600]"
                          : "text-[#FF9600] lg:text-white/30 lg:group-hover:text-white/50"
                      }`}
                    >
                      {item.num}
                    </span>

                    {/* Content: Always shows complete text, illuminates when active */}
                    <div className="flex-1 text-left">
                      <p
                        className={`font-body text-sm sm:text-base lg:text-lg font-normal leading-[1.6] transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white lg:text-white/40 lg:group-hover:text-white/70"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
