// src/components/sections/StreetToSuite.jsx
// Scroll-driven illuminated statement paragraph where words light up to volt yellow,
// and the cinematic Street to Suite journey route banner with animated milestones.

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TiltCard from "../ui/TiltCard";
import { EASINGS, prefersReducedMotion } from "../../lib/motion";
import { FiCheckCircle, FiTrendingUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_TEXT = [
  { word: "When", highlight: false },
  { word: "a", highlight: false },
  { word: "young", highlight: false },
  { word: "person", highlight: false },
  { word: "leaves", highlight: false },
  { word: "school,", highlight: false },
  { word: "it’s", highlight: false },
  { word: "normal", highlight: false },
  { word: "to", highlight: false },
  { word: "wonder", highlight: false },
  { word: "what’s", highlight: false },
  { word: "next.", highlight: false },
  { word: "SmartGap", highlight: false },
  { word: "is", highlight: false },
  { word: "built", highlight: false },
  { word: "to", highlight: false },
  { word: "give", highlight: false },
  { word: "you", highlight: false },
  { word: "absolute", highlight: false },
  { word: "clarity,", highlight: true },
  { word: "practical", highlight: false },
  { word: "skills,", highlight: true },
  { word: "and", highlight: false },
  { word: "uncompromising", highlight: false },
  { word: "direction.", highlight: true },
  { word: "You", highlight: false },
  { word: "are", highlight: false },
  { word: "engineered", highlight: false },
  { word: "to", highlight: false },
  { word: "solve", highlight: false },
  { word: "real-world", highlight: false },
  { word: "problems—your", highlight: false },
  { word: "future", highlight: false },
  { word: "starts", highlight: false },
  { word: "now.", highlight: true },
];

const MILESTONES = [
  {
    step: "01",
    label: "Discover",
    sub: "Deconstruct mental models & find unique leverage",
    pct: "15%",
  },
  {
    step: "02",
    label: "Build",
    sub: "Create real artifacts & a 360° proof portfolio",
    pct: "50%",
  },
  {
    step: "03",
    label: "Lead",
    sub: "Direct industry advisory & Optimus Trybe induction",
    pct: "85%",
  },
];

export const StreetToSuite = () => {
  const containerRef = useRef(null);
  const statementRef = useRef(null);
  const pathRef = useRef(null);
  const bannerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Scroll-driven word lighting
      const wordEls = gsap.utils.toArray(".statement-word");
      gsap.fromTo(
        wordEls,
        { opacity: 0.18, y: 4 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );

      // 2. Animated journey path drawing in Street to Suite banner
      if (!prefersReducedMotion() && pathRef.current) {
        const pathLength = pathRef.current.getTotalLength?.() || 800;
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        });

        // Milestones pop as path reaches them
        gsap.from(".milestone-node", {
          scale: 0.7,
          opacity: 0,
          stagger: 0.2,
          ease: EASINGS.pop,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 65%",
            end: "bottom 55%",
            scrub: false,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full bg-[#0F1220] text-white py-24 sm:py-36 px-4 sm:px-8 lg:px-12 select-none overflow-hidden border-t border-white/10"
    >
      {/* SOFT VIOLET GLOW AMBIENCE */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7C5CFF]/12 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20 sm:space-y-28">
        {/* ================= SECTION EYEBROW & STATEMENT ================= */}
        <div ref={statementRef} className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <FiTrendingUp className="w-4 h-4 text-[#FF9600]" />
            <span className="font-mono text-xs text-[#FF9600] uppercase tracking-[0.25em] font-bold">
              Cognitive Evolution
            </span>
          </div>

          <h2 className="display-title text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight leading-tight">
            Unleashing the life of the mind.
          </h2>

          {/* Words light up one by one on scroll */}
          <p className="text-xl sm:text-3xl md:text-4xl font-body font-light leading-relaxed text-white/90">
            {STATEMENT_TEXT.map((item, idx) => (
              <span
                key={idx}
                className={`statement-word inline-block mr-2 sm:mr-2.5 transition-colors duration-150 ${
                  item.highlight
                    ? "font-semibold text-[#FF9600] drop-shadow-[0_0_15px_rgba(255,150,0,0.5)]"
                    : "text-white"
                }`}
              >
                {item.word}
              </span>
            ))}
          </p>
        </div>

        {/* ================= STREET TO SUITE CINEMATIC BANNER ================= */}
        <div ref={bannerRef} className="w-full">
          <TiltCard
            maxTilt={5}
            className="relative w-full rounded-[36px] sm:rounded-[48px] overflow-hidden border border-white/15 bg-[#0A0A0A] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          >
            {/* Cinematic Background Video */}
            <video
              src="/videos/core1.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="absolute inset-0 size-full object-cover object-center opacity-40 scale-105"
            />

            {/* Darkening Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/70 to-black/40" />

            {/* Banner Inner Content */}
            <div className="relative z-10 p-8 sm:p-14 lg:p-16 flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FB923C] font-bold block mb-1">
                    THE PROVEN TRAJECTORY
                  </span>
                  <h3 className="display-title text-3xl sm:text-5xl text-white font-black uppercase">
                    STR<b className="font-black">E</b>ET TO SU<b className="font-black">I</b>TE
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md self-start sm:self-auto text-xs font-mono text-white/80">
                  <span>3-Stage Journey • 4 Weeks Intensive</span>
                </div>
              </div>

              {/* Animated Route Line & Milestone Nodes */}
              <div className="relative py-12 sm:py-16">
                {/* SVG Route Line */}
                <svg
                  className="w-full h-24 overflow-visible hidden md:block"
                  viewBox="0 0 900 80"
                  fill="none"
                >
                  {/* Subtle Background Guide Track */}
                  <path
                    d="M 50 40 Q 250 10, 450 40 T 850 40"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />
                  {/* Active Illuminated Path */}
                  <path
                    ref={pathRef}
                    d="M 50 40 Q 250 10, 450 40 T 850 40"
                    stroke="#FF9600"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_12px_rgba(255,150,0,0.8)]"
                  />
                </svg>

                {/* 3 Interactive Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-4 md:-mt-10">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.step}
                      className="milestone-node p-5 rounded-2xl glass-dark border border-white/15 hover:border-[#FF9600] transition-colors group shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF9600] to-[#DA5127] text-white">
                          {m.step}
                        </span>
                        <FiCheckCircle className="w-4 h-4 text-white/40 group-hover:text-[#FF9600] transition-colors" />
                      </div>
                      <h4 className="display-title text-xl sm:text-2xl text-white font-black uppercase mb-1">
                        {m.label}
                      </h4>
                      <p className="font-body text-xs text-white/70 leading-relaxed">
                        {m.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quote Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/60">
                <span className="text-white/80">
                  "Designed to intervene before career choices become irreversible mistakes."
                </span>
                <span className="text-[#FF9600] font-bold">4 WEEKS • 20 SESSIONS</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default StreetToSuite;
