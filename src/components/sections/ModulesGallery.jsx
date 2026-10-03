// src/components/sections/ModulesGallery.jsx
// Horizontal scroll gallery inside a pinned section showcasing Modules, Advisory, Streaks,
// Community, Portfolio, and a redesigned "More Coming Soon" card in matching dark/volt aesthetic.

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TiltCard from "../ui/TiltCard";
import { EASINGS, prefersReducedMotion } from "../../lib/motion";
import {
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineFire,
  HiOutlineFolder,
  HiOutlineLockClosed,
} from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_CARDS = [
  {
    id: "modules",
    category: "CURRICULUM PILLAR",
    title: "4 Core Modules",
    tagline: "Cognitive Architecture & Mental Models",
    desc: "Deconstruct outdated thinking models. Learn first-principles reasoning, high-stakes decision making, and AI-augmented execution.",
    video: "/videos/core2.mp4",
    poster: "/img/core2.jpg",
    icon: <HiOutlineAcademicCap className="w-5 h-5 text-[#FF9600]" />,
    accent: "#FF9600",
  },
  {
    id: "advisory",
    category: "EXPERT MENTORSHIP",
    title: "20 Direct Sessions",
    tagline: "Live Advisory with Smartandad",
    desc: "20 interactive deep-dive advisory calls deconstructing high-stakes career crossroads, modern wealth dynamics, and venture leverage.",
    video: "/videos/core3.mp4",
    poster: "/img/core3.jpg",
    icon: <HiOutlineSparkles className="w-5 h-5 text-[#DA5127]" />,
    accent: "#DA5127",
  },
  {
    id: "streaks",
    category: "DISCIPLINE ENGINE",
    title: "Daily Habit Streaks",
    tagline: "Verified Cognitive Discipline",
    desc: "Build deliberate daily routines. Consecutive active days unlock verified achievement badges recognized across the network.",
    video: "/videos/core5.mp4",
    poster: "/img/core5.jpg",
    icon: <HiOutlineFire className="w-5 h-5 text-[#C2410C]" />,
    accent: "#C2410C",
  },
  {
    id: "community",
    category: "PEER NETWORK",
    title: "Optimus Trybe",
    tagline: "A High-Agency Circle for Life",
    desc: "An exclusive vetted community of emerging builders, young founders, and creators driving collective leverage across emerging sectors.",
    video: "/videos/core4.mp4",
    poster: "/img/core4.jpg",
    icon: <HiOutlineUserGroup className="w-5 h-5 text-[#7C5CFF]" />,
    accent: "#7C5CFF",
  },
  {
    id: "portfolio",
    category: "PROOF OF ABILITY",
    title: "360° Portfolio",
    tagline: "Verified Artifacts, Not Just a CV",
    desc: "Graduate with 5 tangible portfolio pieces demonstrating critical thinking, market analysis, and AI implementation.",
    video: "/videos/core1.mp4",
    poster: "/img/core1.jpg",
    icon: <HiOutlineFolder className="w-5 h-5 text-[#35E0FF]" />,
    accent: "#35E0FF",
  },
  {
    id: "future",
    category: "CONTINUOUS EXPANSION",
    title: "More In The Pipeline",
    tagline: "Optimus Trybe Incubator",
    desc: "Global circle exchanges, venture pitch arenas, and direct apprenticeship placements for certified graduates.",
    isLocked: true,
    icon: <HiOutlineLockClosed className="w-5 h-5 text-[#FF9600] animate-bounce" />,
    accent: "#FF9600",
  },
];

export const ModulesGallery = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop: Horizontal pin scrub
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth + 200;

        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollPct(Math.round(self.progress * 100));
              if (progressLineRef.current) {
                progressLineRef.current.style.width = `${self.progress * 100}%`;
              }
            },
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
      id="modules-gallery"
      className="relative w-full bg-[#0A0A0A] text-white py-24 sm:py-32 select-none overflow-hidden border-t border-white/10"
    >
      {/* SECTION INTRO BAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF9600] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF9600] font-bold">
              The Learning Arena
            </span>
          </div>

          <h2 className="display-title text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            CORE MODULES & SYSTEMS
          </h2>
        </div>

        <p className="font-body text-xs sm:text-sm text-white/70 max-w-md leading-relaxed font-light">
          Each card represents a core engine of the SmartGap continuum designed to cultivate lasting capability.
        </p>
      </div>

      {/* HORIZONTAL CARDS TRACK */}
      <div className="w-full overflow-x-auto lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-6 sm:px-12 w-max snap-x snap-mandatory lg:snap-none"
        >
          {GALLERY_CARDS.map((card) => {
            return (
              <div
                key={card.id}
                className="shrink-0 w-[300px] sm:w-[360px] lg:w-[400px] snap-center"
              >
                <TiltCard
                  maxTilt={6}
                  className={`relative h-[480px] sm:h-[540px] rounded-[36px] overflow-hidden border transition-all duration-300 shadow-2xl flex flex-col justify-between p-7 sm:p-8 ${
                    card.isLocked
                      ? "border-[#FF9600]/40 bg-gradient-to-b from-[#140e08] to-[#0A0A0A] shadow-[0_15px_45px_rgba(255,150,0,0.12)]"
                      : "border-white/12 hover:border-white/30 bg-[#0F111A]"
                  }`}
                >
                  {/* Background Video/Image if present */}
                  {card.video && (
                    <video
                      src={card.video}
                      poster={card.poster}
                      loop
                      muted
                      autoPlay
                      playsInline
                      className="absolute inset-0 size-full object-cover object-center opacity-30 group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  {/* Gradient Overlay for 100% legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 pointer-events-none" />

                  {/* TOP HEADER ROW */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                      {card.category}
                    </span>

                    <div className="p-2.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                      {card.icon}
                    </div>
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div className="relative z-10 space-y-3">
                    <span className="font-mono text-xs text-[#DA5127] font-semibold uppercase tracking-wider block">
                      {card.tagline}
                    </span>

                    <h3 className="display-title text-2xl sm:text-4xl text-white font-black uppercase leading-tight">
                      {card.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                      {card.desc}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                      <span className="uppercase tracking-widest">
                        {card.isLocked ? "FUTURE EXPANSION" : "VERIFIED MODULE"}
                      </span>
                      <span className="text-[#FF9600] font-bold group-hover:translate-x-1 transition-transform">
                        {card.isLocked ? "COMING SOON" : "EXPLORE →"}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM PROGRESS TRACKER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-10 hidden lg:flex items-center gap-4">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[#FF9600] to-[#DA5127] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(255,150,0,0.8)]"
            style={{ width: "16%" }}
          />
        </div>
        <span className="font-mono text-xs text-white/50 font-bold tabular-nums">
          GALLERY SCROLL • {scrollPct}%
        </span>
      </div>
    </section>
  );
};

export default ModulesGallery;
