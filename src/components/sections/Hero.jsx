// src/components/sections/Hero.jsx
// Hero (Section 3.2): Clean, spacious, with kinetic letter drop, interactive center video tile swap,
// floating parallax mascot, scroll-folding polygon clip-path, and bottom marquee.

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlinePlay } from "react-icons/hi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "../ui/MagneticButton";
import Marquee from "../ui/Marquee";
import { EASINGS, prefersReducedMotion } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_VIDEOS = 4;
const MARQUEE_ITEMS = [
  "4 WEEKS INTENSIVE",
  "20 SESSIONS WITH EXPERTS",
  "360° PORTFOLIO",
  "INDUSTRY CERTIFIED",
  "EARN XP & BADGES",
  "STREET TO SUITE",
  "COGNITIVE AGILITY",
  "OPTIMUS TRYBE INDUCTION",
];

export const Hero = ({ onOpenVideoModal }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const nextVideoRef = useRef(null);
  const heroContainerRef = useRef(null);
  const videoFrameRef = useRef(null);
  const mascotRef = useRef(null);
  const navigate = useNavigate();

  const upcomingVideoIndex = (currentIndex % TOTAL_VIDEOS) + 1;
  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  const handleMiniTileClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // Parallax response for floating mascot
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e) => {
      if (!mascotRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(mascotRef.current, {
        x: -xNorm * 20,
        y: -yNorm * 20,
        rotate: xNorm * 4,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Video portal transition on swap
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#hero-next-video", { visibility: "visible" });

        gsap.to("#hero-next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: EASINGS.transition,
          onStart: () => nextVideoRef.current?.play(),
        });

        gsap.from("#hero-current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.2,
          ease: EASINGS.transition,
        });
      }
    },
    { dependencies: [currentIndex], scope: heroContainerRef }
  );

  // Kinetic letter drop & scroll-fold polygon
  useGSAP(
    () => {
      gsap.from(".hero-char", {
        y: -90,
        opacity: 0,
        rotateZ: gsap.utils.wrap([-12, 12, -8, 8]),
        duration: 1.1,
        ease: EASINGS.pop,
        stagger: 0.04,
        delay: 0.15,
      });

      gsap.to(mascotRef.current, {
        y: "+=12",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (!prefersReducedMotion()) {
        gsap.set(videoFrameRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
        });

        gsap.to(videoFrameRef.current, {
          clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
          borderRadius: "0 0 40% 10%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: videoFrameRef.current,
            start: "center center",
            end: "bottom top",
            scrub: 0.8,
            onUpdate: (self) => {
              setIsScrolled(self.progress > 0.05);
            },
          },
        });
      }
    },
    { scope: heroContainerRef }
  );

  const heroLetters = "SmartGap".split("");

  return (
    <div
      ref={heroContainerRef}
      className="relative h-screen w-screen overflow-hidden bg-[#DFDFF0] select-none"
    >
      {/* ================= CLIPPED VIDEO FRAME ================= */}
      <div
        ref={videoFrameRef}
        id="video-frame"
        className="relative z-10 h-screen w-screen overflow-hidden bg-[#0A0A0A]"
      >
        {/* BACKGROUND VIDEOS */}
        <div>
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
          />

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="hero-next-video"
            className="absolute-center invisible absolute z-20 size-48 sm:size-60 md:size-68 object-cover object-center rounded-2xl"
          />

          {/* Center Expanding Mini Portal Tile */}
          <div
            className="mask-clip-path absolute-center absolute z-40 size-44 sm:size-56 md:size-64 cursor-pointer overflow-hidden rounded-2xl group"
            onClick={handleMiniTileClick}
          >
            <div className="size-full origin-center scale-75 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 rounded-2xl overflow-hidden border-2 border-[#FF9600]/70 shadow-[0_0_35px_rgba(255,150,0,0.4)] relative">
              <video
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                autoPlay
                playsInline
                id="hero-current-video"
                className="size-full object-cover object-center"
              />
            </div>
          </div>

          {/* Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/70 pointer-events-none z-25" />
        </div>

        {/* FLOATING MASCOT */}
        <div
          ref={mascotRef}
          className="absolute top-28 right-[10%] sm:right-[16%] z-30 pointer-events-none w-28 sm:w-36 md:w-48 h-auto opacity-80 sm:opacity-90 drop-shadow-[0_20px_40px_rgba(255,150,0,0.25)]"
        >
          <img
            src="/assets/hero-guide.webp"
            alt="SmartGap Mascot"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* TOP-LEFT HEADLINE & CTAS */}
        <div className="absolute left-0 top-0 z-40 size-full pointer-events-none flex flex-col justify-between p-6 sm:p-12 pt-28 sm:pt-36">
          <div className="max-w-2xl pointer-events-auto">
            {/* Small text: Welcome to */}
            <p className="font-body text-lg sm:text-2xl font-light text-white/90 mb-1 tracking-wide">
              Welcome to
            </p>

            {/* Big text: SmartGap (the biggest thing on the page) */}
            <h1 className="display-title text-white text-[17vw] sm:text-[13vw] lg:text-[10vw] font-black leading-[0.82] tracking-tight drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex">
              {heroLetters.map((char, idx) => (
                <span
                  key={idx}
                  className="hero-char inline-block text-white"
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                size="md"
                variant="volt"
                pull={16}
                onClick={() => navigate("/waitlist")}
                icon={<TiLocationArrow className="text-lg -rotate-45" />}
                iconPosition="right"
              >
                Join the waitlist
              </MagneticButton>

              <button
                type="button"
                onClick={() => {
                  if (onOpenVideoModal) onOpenVideoModal();
                  else {
                    document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-body text-sm font-medium backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <HiOutlinePlay className="w-4 h-4 text-[#FB923C]" />
                <span>Watch how it works</span>
              </button>
            </div>
          </div>

          {/* BOTTOM MARQUEE */}
          <div className="pointer-events-auto border-t border-white/10 pt-3">
            <Marquee
              items={MARQUEE_ITEMS}
              speed={28}
              className="text-xs font-body font-medium tracking-widest text-white/70 uppercase"
            />
          </div>
        </div>

        {/* BOTTOM-RIGHT PINNED FLOURISH (INSIDE VIDEO FRAME) */}
        <div className="absolute bottom-16 right-6 sm:bottom-18 sm:right-12 z-40 text-right pointer-events-none">
          <p className="font-body text-base sm:text-xl text-white/75 font-light mb-1">
            Prepare to
          </p>
          <div className="display-title text-6xl sm:text-8xl lg:text-9xl text-white font-black leading-[0.8] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            Design
          </div>
          <p className="signature-italic text-4xl sm:text-6xl lg:text-7xl text-[#FB923C] leading-none mt-1">
            your future.
          </p>
        </div>

        {/* SCROLL CUE */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-1 transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-70 animate-bounce"
            }`}
        >
          <div className="w-4 h-7 rounded-full border border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#FF9600] animate-pulse" />
          </div>
        </div>
      </div>

      {/* ================= LIGHT UNDERLAY (REVEALED AS DARK FRAME FOLDS) ================= */}
      <div className="absolute inset-0 z-0 bg-[#DFDFF0] flex flex-col justify-end p-6 sm:p-12 pointer-events-none">
        <div className="text-right">
          <p className="font-body text-base sm:text-xl text-black/60 font-light mb-1">
            Prepare to
          </p>
          <div className="display-title text-6xl sm:text-8xl lg:text-9xl text-black font-black leading-[0.8]">
            Design
          </div>
          <p className="signature-italic text-4xl sm:text-6xl lg:text-7xl text-[#EA580C] leading-none mt-1">
            your future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
