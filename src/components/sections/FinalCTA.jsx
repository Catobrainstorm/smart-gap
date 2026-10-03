// src/components/sections/FinalCTA.jsx
// Section 3.10: Final CTA
// Yellow "Ready to level up?" block with two big buttons. Extra small text stripped. Clean peeking mascot.

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineGift } from "react-icons/hi2";
import MagneticButton from "../ui/MagneticButton";

export const FinalCTA = ({ onOpenGiftModal }) => {
  const containerRef = useRef(null);
  const mascotRef = useRef(null);
  const navigate = useNavigate();

  return (
    <section
      ref={containerRef}
      id="final-cta"
      className="relative w-full bg-gradient-to-br from-[#FF9600] to-[#DA5127] text-[#0A0A0A] py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center space-y-10">
        {/* Giant Clean Monolithic Headline */}
        <h2 className="display-title text-[clamp(2.75rem,11vw,3.75rem)] sm:text-8xl lg:text-9xl font-black uppercase text-white tracking-tight leading-[0.9] sm:leading-[0.85] drop-shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
          <span className="block sm:inline whitespace-nowrap">READY TO</span>{" "}
          <span className="block sm:inline whitespace-nowrap">LEVEL UP?</span>
        </h2>

        {/* Dual Primary Buttons (Clean, with no competing small text) */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
          <MagneticButton
            size="lg"
            variant="volt"
            pull={16}
            className="!border-2 !border-white !text-white !shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            onClick={() => navigate("/waitlist")}
            icon={<TiLocationArrow className="text-xl text-white -rotate-45" />}
            iconPosition="right"
          >
            Join the waitlist
          </MagneticButton>

          <button
            type="button"
            onClick={onOpenGiftModal}
            className="px-8 py-4 text-base rounded-full bg-white/10 hover:bg-white/20 border-2 border-white text-white font-body font-bold transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer backdrop-blur-sm shadow-lg"
          >
            <HiOutlineGift className="w-5 h-5 text-white" />
            <span>Get a SmartGap gift card</span>
          </button>
        </div>
      </div>

      {/* PEEKING MASCOT FROM BOTTOM CORNER */}
      <div
        ref={mascotRef}
        className="absolute -bottom-6 right-6 sm:right-16 w-32 sm:w-44 h-auto pointer-events-none z-20 drop-shadow-2xl"
      >
        <img
          src="/assets/hero-guide.webp"
          alt="SmartGap Mascot Peeking"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default FinalCTA;
