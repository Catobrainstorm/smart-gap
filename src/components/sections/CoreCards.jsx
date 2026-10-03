// src/components/sections/CoreCards.jsx
// Section 3.5: What You Get (the five cards)
// 5 portrait cards with 3D tilt, Earn XP centre card.
// Card = image + big title only. All tags, chips, and small sentences removed. Evenly spaced.

import React, { useRef, useState } from "react";
import TiltCard from "../ui/TiltCard";

const CARDS = [
  {
    id: 1,
    title: "4 Weeks to Transform",
    img: "/img/core1.jpg",
  },
  {
    id: 2,
    title: "4 Core Modules",
    img: "/img/core2.png",
  },
  {
    id: 3,
    title: "20 Sessions with Experts",
    img: "/img/core3.png",
  },
  {
    id: 4,
    title: "Earn XP Points",
    img: "/img/core4.png",
    isHero: true,
  },
  {
    id: 5,
    title: "Keep Streaks to Earn Badges",
    img: "/img/core5.png",
  },
];

export const CoreCards = () => {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section
      ref={sectionRef}
      id="core-cards"
      className="relative w-full bg-white text-[#0A0A0A] py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* SECTION TITLE: HUGE AND CLEAN (NO EYEBROWS, NO SUBTEXT) */}
        <div className="max-w-3xl">
          <h2 className="display-title text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-[#0A0A0A] tracking-tight leading-[0.85]">
            WHAT YOU GET
          </h2>
        </div>

        {/* 5-CARD EVENLY SPACED GRID (DESKTOP) / HORIZONTAL SNAP (MOBILE) */}
        <div>
          {/* Mobile swipe hint */}
          <div className="flex sm:hidden items-center justify-between text-xs font-mono text-black/50 mb-3 px-1">
            <span>5 Core Pillars</span>
            <span>Swipe to explore →</span>
          </div>

          <div
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 px-1 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const scrollLeft = e.currentTarget.scrollLeft;
              const cardWidth = 300;
              setActiveSlide(Math.round(scrollLeft / cardWidth));
            }}
          >
            {CARDS.map((card) => (
              <div
                key={card.id}
                className={`shrink-0 w-[80vw] max-w-[320px] sm:w-auto snap-center transition-transform duration-300 ${card.isHero ? "lg:-translate-y-4" : ""
                  }`}
              >
                <TiltCard
                  maxTilt={card.isHero ? 8 : 6}
                  className={`group relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-[32px] overflow-hidden border transition-all duration-300 shadow-xl ${card.isHero
                    ? "border-[#FF9600] shadow-[0_20px_50px_rgba(255,150,0,0.25)] ring-2 ring-[#FF9600]/40"
                    : "border-black/10 hover:border-black/30 bg-[#0A0A0A]"
                    }`}
                >
                  {/* Background Image */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 size-full object-cover object-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Gradient Scrim for Big Title Contrast */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* BOTTOM: BIG TITLE ONLY */}
                  <div className="absolute bottom-0 left-0 w-full z-20 p-6 sm:p-8 flex flex-col justify-end">
                    <h3 className="display-title text-2xl sm:text-3xl lg:text-4xl text-white font-black leading-[0.92] tracking-tight group-hover:text-[#FF9600] transition-colors">
                      {card.title}
                    </h3>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Mobile indicator dots */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-5">
            {CARDS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "w-6 bg-black" : "w-1.5 bg-black/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreCards;
