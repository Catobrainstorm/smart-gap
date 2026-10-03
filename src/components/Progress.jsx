import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { APPLE_EASE, TACTILE_EASE } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "XP, levels & leaderboards",
  "Daily streaks that keep you consistent",
  "Achievement badges to collect",
  "Real projects for your portfolio",
  "Certificate awarded by Smartan House",
];

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;

    setTransformStyle(
      `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.99, 0.99, 0.99)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

const Progress = () => {
  const container = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      tl.from(imageRef.current, {
        x: -80,
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        ease: APPLE_EASE,
      });

      tl.from(
        ".progress-reveal",
        {
          y: 35,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: APPLE_EASE,
        },
        "-=0.8"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-white text-black overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: 3D ASSET IN BENTO TILT CONTAINER */}
        <div className="lg:col-span-5 flex justify-center items-center order-2 lg:order-1">
          <BentoTilt className="w-full max-w-[480px] p-6 sm:p-8 rounded-3xl bg-[#f5efe6] border border-black/5 shadow-2xl flex items-center justify-center">
            <img
              ref={imageRef}
              src="/assets/progress.webp"
              alt="Growth Progress"
              className="w-full h-auto drop-shadow-xl object-contain pointer-events-none"
            />
          </BentoTilt>
        </div>

        {/* RIGHT COLUMN: CLEAN BENTO FEATURES CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
          
          {/* Badge */}
          <div className="progress-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 mb-4 self-start">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="font-mono text-xs text-black/80 uppercase tracking-[0.25em] font-bold">
              The Experience
            </span>
          </div>

          {/* Heading */}
          <p className="progress-reveal font-calligraphy text-4xl sm:text-5xl text-orange-500 font-normal italic mb-1 tracking-wide leading-none">
            Progress You Can
          </p>

          <h2 className="progress-reveal special-font text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-black tracking-tight leading-[0.88] mb-6">
            SEE & FE<b>E</b>L
          </h2>

          <p className="progress-reveal text-black/70 text-sm sm:text-base leading-relaxed max-w-xl font-general mb-8">
            SmartGap makes growth addictive. Watch your XP climb, your streaks
            build, and your badges unlock as you become the person you’re meant
            to be.
          </p>

          {/* Clean 5 Checklist Items in Bento Pill Tiles */}
          <div className="space-y-3">
            {items.map((item, i) => (
              <BentoTilt
                key={i}
                className="progress-reveal flex items-center gap-4 p-4 sm:p-4.5 rounded-2xl bg-[#f5efe6] hover:bg-[#ede5d8] border border-black/5 transition-colors duration-300 shadow-sm cursor-default"
              >
                <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4.5L4.5 8L11 1"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-general font-semibold text-xs sm:text-sm text-black/90">
                  {item}
                </span>
              </BentoTilt>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Progress;


