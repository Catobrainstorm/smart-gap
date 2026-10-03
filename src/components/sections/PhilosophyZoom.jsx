// src/components/sections/PhilosophyZoom.jsx
// Section 3.3: Philosophy
// Heading: Intentional, Fun, & Effective
// Base text: A gamified platform built for young people, that gives you clarity, skills and the direction to build bold futures that will give you a voice in the world.
// Zero pillar cards, zero labels, zero HUD icons. Pure spacious layout with smooth zoom entrance.

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASINGS, prefersReducedMotion } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

export const PhilosophyZoom = () => {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop: Smooth zoom scrub
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.8,
          },
        });

        tl.fromTo(
          bgImageRef.current,
          {
            scale: 0.85,
            borderRadius: "32px",
            filter: "blur(0px) brightness(0.8)",
          },
          {
            scale: 1.05,
            borderRadius: "0px",
            filter: "blur(16px) brightness(0.25)",
            ease: "none",
          }
        );

        tl.from(
          ".philo-heading-line",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );

        tl.from(
          ".philo-paragraph",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.2"
        );
      });

      // Mobile: Simple stacked entrance
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".philo-heading-line, .philo-paragraph", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: EASINGS.entrance,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
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
      id="philosophy"
      className="relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center items-center overflow-hidden py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none"
    >
      {/* EXPANDING CANVAS BACKGROUND */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 size-full pointer-events-none z-0"
        style={{
          backgroundImage: "url('/img/core4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.25) blur(12px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black/80 to-[#0A0A0A]" />
      </div>

      {/* FOREGROUND CONTENT: ONE HUGE HEADLINE + ONE SHORT PARAGRAPH */}
      <div
        ref={headlineRef}
        className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10"
      >
        <h2 className="philo-heading-line display-title text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-white tracking-tight leading-[0.88] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          Intentional, Fun, & Effective
        </h2>

        <p className="philo-paragraph text-white/80 text-lg sm:text-xl font-body font-normal leading-[1.6] max-w-[38ch] drop-shadow-sm">
          A gamified platform built for young people, that gives you clarity, skills and the direction to build bold futures that will give you a voice in the world.
        </p>
      </div>
    </section>
  );
};

export default PhilosophyZoom;
