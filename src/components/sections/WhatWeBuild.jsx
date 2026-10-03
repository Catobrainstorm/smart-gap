// src/components/sections/WhatWeBuild.jsx
// Section 3.4: What We Build
// Title: Unleashing the life of young mind.
// Paragraph with word-by-word scroll illumination (opacity 0.2 to 1), with the last bold sentence landing in volt yellow.
// Night background with one soft glow. Nothing else.

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPH_WORDS = [
  { word: "When", isFinalSentence: false },
  { word: "a", isFinalSentence: false },
  { word: "young", isFinalSentence: false },
  { word: "person", isFinalSentence: false },
  { word: "leaves", isFinalSentence: false },
  { word: "high", isFinalSentence: false },
  { word: "school,", isFinalSentence: false },
  { word: "it's", isFinalSentence: false },
  { word: "okay", isFinalSentence: false },
  { word: "if", isFinalSentence: false },
  { word: "they", isFinalSentence: false },
  { word: "have", isFinalSentence: false },
  { word: "absolutely", isFinalSentence: false },
  { word: "no", isFinalSentence: false },
  { word: "idea", isFinalSentence: false },
  { word: "what", isFinalSentence: false },
  { word: "to", isFinalSentence: false },
  { word: "do", isFinalSentence: false },
  { word: "next,", isFinalSentence: false },
  { word: "SmartGap", isFinalSentence: false },
  { word: "fixes", isFinalSentence: false },
  { word: "that.", isFinalSentence: false },
  { word: "SmartGap", isFinalSentence: false },
  { word: "is", isFinalSentence: false },
  { word: "built", isFinalSentence: false },
  { word: "around", isFinalSentence: false },
  { word: "the", isFinalSentence: false },
  { word: "idea", isFinalSentence: false },
  { word: "that", isFinalSentence: false },
  { word: "you're", isFinalSentence: false },
  { word: "designed", isFinalSentence: false },
  { word: "to", isFinalSentence: false },
  { word: "solve", isFinalSentence: false },
  { word: "a", isFinalSentence: false },
  { word: "unique", isFinalSentence: false },
  { word: "problem", isFinalSentence: false },
  { word: "in", isFinalSentence: false },
  { word: "the", isFinalSentence: false },
  { word: "world", isFinalSentence: false },
  { word: "and", isFinalSentence: false },
  { word: "so", isFinalSentence: false },
  { word: "we", isFinalSentence: false },
  { word: "will", isFinalSentence: false },
  { word: "work", isFinalSentence: false },
  { word: "with", isFinalSentence: false },
  { word: "you", isFinalSentence: false },
  { word: "to", isFinalSentence: false },
  { word: "shift", isFinalSentence: false },
  { word: "your", isFinalSentence: false },
  { word: "mental", isFinalSentence: false },
  { word: "model", isFinalSentence: false },
  { word: "of", isFinalSentence: false },
  { word: "the", isFinalSentence: false },
  { word: "world,", isFinalSentence: false },
  { word: "challenge", isFinalSentence: false },
  { word: "your", isFinalSentence: false },
  { word: "thinking,", isFinalSentence: false },
  { word: "and", isFinalSentence: false },
  { word: "design", isFinalSentence: false },
  { word: "a", isFinalSentence: false },
  { word: "dynamic", isFinalSentence: false },
  { word: "framework", isFinalSentence: false },
  { word: "that", isFinalSentence: false },
  { word: "you", isFinalSentence: false },
  { word: "can", isFinalSentence: false },
  { word: "use", isFinalSentence: false },
  { word: "to", isFinalSentence: false },
  { word: "build", isFinalSentence: false },
  { word: "an", isFinalSentence: false },
  { word: "intelligent", isFinalSentence: false },
  { word: "life", isFinalSentence: false },
  { word: "on", isFinalSentence: false },
  { word: "purpose.", isFinalSentence: false },
  { word: "This", isFinalSentence: false },
  { word: "is", isFinalSentence: false },
  { word: "a", isFinalSentence: false },
  { word: "personalized", isFinalSentence: false },
  { word: "gamified", isFinalSentence: false },
  { word: "platform", isFinalSentence: false },
  { word: "that", isFinalSentence: false },
  { word: "gives", isFinalSentence: false },
  { word: "you", isFinalSentence: false },
  { word: "power,", isFinalSentence: false },
  { word: "control", isFinalSentence: false },
  { word: "and", isFinalSentence: false },
  { word: "clarity.", isFinalSentence: false },
  { word: "Your", isFinalSentence: true },
  { word: "higher", isFinalSentence: true },
  { word: "education", isFinalSentence: true },
  { word: "must", isFinalSentence: true },
  { word: "start", isFinalSentence: true },
  { word: "here.", isFinalSentence: true },
];

export const WhatWeBuild = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray(".lightup-word");
      gsap.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.7,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="what-we-build"
      className="relative w-full min-h-screen bg-[#0F1220] text-white flex flex-col justify-center items-center py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none overflow-hidden"
    >
      {/* ONE SOFT VIOLET GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[#7C5CFF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-12 sm:space-y-16 text-left">
        {/* Title */}
        <h2 className="display-title text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.88]">
          Unleashing the life of the mind.
        </h2>

        {/* Word-by-word illuminating paragraph */}
        <p
          ref={textRef}
          className="text-xl sm:text-2xl lg:text-3xl font-body font-normal leading-[1.6] max-w-[55ch] text-white/90"
        >
          {PARAGRAPH_WORDS.map((item, idx) => (
            <span
              key={idx}
              className={`lightup-word inline-block mr-2 sm:mr-2.5 transition-colors duration-200 ${
                item.isFinalSentence
                  ? "font-extrabold text-[#FF9600] drop-shadow-[0_0_15px_rgba(255,150,0,0.5)]"
                  : "text-white"
              }`}
            >
              {item.word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default WhatWeBuild;
