import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { APPLE_EASE, TACTILE_EASE } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    num: "01",
    tag: "CLARITY",
    title: "Intentional",
    desc: "Deconstruct outdated schooling models to build an intelligent, purpose-driven life framework.",
  },
  {
    num: "02",
    tag: "ENGAGEMENT",
    title: "Fun",
    desc: "Gamified levels, cognitive streaks, and achievement badges that make personal growth addictive.",
  },
  {
    num: "03",
    tag: "LEVERAGE",
    title: "Effective",
    desc: "AI-augmented mastery, real-world portfolio artifacts, and high-stakes market readiness.",
  },
];

const Philosophy = () => {
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const guideRef = useRef(null);
  const [activePillar, setActivePillar] = useState(0);

  useGSAP(
    () => {
      // 1. FLOATING 3D PARALLAX TOKENS
      gsap.to(starRef.current, {
        y: -140,
        rotate: 45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(guideRef.current, {
        y: 120,
        rotate: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // 2. STAGGERED REVEAL
      gsap.from(".philo-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: APPLE_EASE,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 sm:py-36 px-6 sm:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5 scroll-mt-10 select-none"
    >
      {/* 3D FLOATING PARALLAX ASSETS */}
      <img
        ref={starRef}
        src="/assets/hero-star.webp"
        alt="Star"
        className="absolute top-16 left-[6%] w-20 sm:w-28 h-auto opacity-70 pointer-events-none drop-shadow-[0_0_30px_rgba(251,146,60,0.3)]"
      />
      <img
        ref={guideRef}
        src="/assets/hero-guide.webp"
        alt="Guide"
        className="absolute bottom-16 right-[6%] w-24 sm:w-36 h-auto opacity-60 pointer-events-none drop-shadow-[0_0_40px_rgba(251,146,60,0.2)]"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* MONOSPACE BADGE */}
        <div className="philo-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_10px_rgba(251,146,60,0.9)]" />
          <span className="font-mono text-xs text-orange-400 uppercase tracking-[0.3em] font-bold">
            The Mindset Continuum
          </span>
        </div>

        {/* CALLIGRAPHY + MONUMENTAL HEADLINE */}
        <div className="philo-reveal text-center mb-6">
          <p className="font-calligraphy text-4xl sm:text-6xl text-orange-400 font-normal italic mb-1 tracking-wide leading-none drop-shadow-md">
            Core Philosophy
          </p>
          <h2 className="special-font text-4xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.88] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            INTENTIONAL. <br className="hidden sm:inline" />
            F<b>U</b>N. EFFECTI<b>V</b>E.
          </h2>
        </div>

        {/* REFINED PHILOSOPHY STATEMENT */}
        <p className="philo-reveal text-white/75 text-center text-sm sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-14 font-general drop-shadow-sm">
          A gamified platform built for young people, giving you the{" "}
          <span className="text-white font-semibold">clarity</span>,{" "}
          <span className="text-orange-400 font-semibold">skills</span>, and{" "}
          <span className="text-[#f5efe6] font-semibold">uncompromising direction</span>{" "}
          to build bold futures that command a voice in the modern world.
        </p>

        {/* 3 INTERACTIVE PILLARS GRID */}
        <div className="philo-reveal grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActivePillar(idx)}
              className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 cursor-pointer border ${
                activePillar === idx
                  ? "bg-white/[0.07] border-orange-500/50 shadow-[0_20px_50px_rgba(251,146,60,0.15)] scale-[1.02]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
              } backdrop-blur-xl flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-orange-400 font-bold px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30">
                    {pillar.num}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="special-font text-2xl sm:text-3xl text-white font-bold uppercase mb-2">
                  {pillar.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-general">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>SMARTGAP STANDARD</span>
                <span className={`transition-colors ${activePillar === idx ? "text-orange-400 font-bold" : ""}`}>
                  ACTIVE
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Philosophy;

