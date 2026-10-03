// src/components/sections/Pathways.jsx
// Section 3.9: Pathways (Admissions and sponsorship ecosystem)
// Title: Choose your SmartGap pathways
// Two spacious contrasting cards: SmartGap into Optimus trybe & SmartGap with Gift Card with exact copy.
// All diagrams, FAQs, and trust rows removed per Brief v2.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TiltCard from "../ui/TiltCard";
import MagneticButton from "../ui/MagneticButton";
import { HiOutlineArrowRight, HiOutlineGift, HiOutlineUserGroup, HiOutlineHeart } from "react-icons/hi2";

export const Pathways = ({ onOpenGiftCard, onOpenGiftBox }) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      id="pathways"
      className="relative w-full bg-[#080B14] text-white py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10 text-left">
        {/* SECTION TITLE: HUGE AND CLEAN */}
        <div className="max-w-4xl">
          <h2 className="display-title text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-white tracking-tight leading-[0.88]">
            Choose your SmartGap pathways
          </h2>
        </div>

        {/* DUAL PATHWAYS COMPARISON (TWO BIG CONTRASTING CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* ================= CARD 1: SMARTGAP INTO OPTIMUS TRYBE ================= */}
          <div
            onMouseEnter={() => setHoveredCard("trybe")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`transition-all duration-500 ${hoveredCard === "trybe"
              ? "lg:scale-[1.02]"
              : hoveredCard === "mini"
                ? "lg:scale-[0.98] lg:opacity-85"
                : ""
              }`}
          >
            <TiltCard
              maxTilt={4}
              className="h-full rounded-[40px] bg-[#0E1322] border border-white/12 p-8 sm:p-12 lg:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#FB923C]/50 transition-colors"
            >
              <div className="space-y-6">
                <h3 className="display-title text-3xl sm:text-4xl lg:text-5xl text-white font-black uppercase leading-tight">
                  SmartGap into Optimus trybe
                </h3>

                {/* Lead line */}
                <p className="font-body text-base sm:text-lg font-semibold text-[#FB923C] leading-snug">
                  Please join the waitlist. This is a fully funded grant that we secure for candidates on the waitlist.
                </p>

                {/* Body */}
                <p className="font-body text-sm sm:text-base text-white/80 leading-[1.6] font-light">
                  This pathway onboards you into the SmartGap Programme to complete your 360 degrees personal development portfolio and earn an induction to the Optimus trybe. The Optimus trybe is a growth continuum where you're assigned into industry circles and your personal transformational journey is supported over a period of three years. To get on this Programme you have to join the waitlist.
                </p>

                {/* How it is funded */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="font-body text-xs text-white/50 uppercase tracking-wider font-bold block">
                    How it is funded
                  </span>
                  <p className="font-body text-sm text-white/90 leading-relaxed font-normal">
                    Smartan House works to secure a sponsorship grant of 250k that supports one participant to go through the three year Optimus trybe Experience.
                  </p>
                </div>

                {/* Sponsor note */}
                <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed font-light italic">
                  If you're happy to sponsor any of our candidates on the waitlist kindly click on the sponsorship button below and we shall be glad to walk you through the modalities for helping a young person begin their personal transformation journey.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10 mt-8">
                <MagneticButton
                  size="md"
                  variant="volt"
                  pull={12}
                  className="flex-1"
                  onClick={() => navigate("/waitlist")}
                  icon={<HiOutlineArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Join waitlist
                </MagneticButton>

                <a
                  href="https://impact.smartanhouse.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-body text-sm font-semibold tracking-wide text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <HiOutlineHeart className="w-4 h-4 text-[#FB923C]" />
                  <span>Sponsor the Waitlist</span>
                </a>
              </div>
            </TiltCard>
          </div>

          {/* ================= CARD 2: SmartGap with Gift Card ================= */}
          <div
            onMouseEnter={() => setHoveredCard("mini")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`transition-all duration-500 ${hoveredCard === "mini"
              ? "lg:scale-[1.02]"
              : hoveredCard === "trybe"
                ? "lg:scale-[0.98] lg:opacity-85"
                : ""
              }`}
          >
            <TiltCard
              maxTilt={4}
              className="h-full rounded-[40px] bg-[#0E1322] border border-white/12 p-8 sm:p-12 lg:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#FF9600]/50 transition-colors"
            >
              <div className="space-y-6">
                <h3 className="display-title text-3xl sm:text-4xl lg:text-5xl text-white font-black uppercase leading-tight">
                  SmartGap with Gift Card
                </h3>

                {/* Body */}
                <p className="font-body text-sm sm:text-base text-white/80 leading-[1.6] font-light">
                  This allows you to take only the 4 weeks 360 degree personal development Programme, complete with all the projects and certification. This Programme doesn't include induction into the Optimus trybe.
                </p>

                {/* Gift cards sub-block */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div>
                    <span className="font-body text-xs text-[#FF9600] uppercase tracking-wider font-bold block mb-1">
                      Gift cards
                    </span>
                    {/* TODO: confirm (user will confirm final sentence ending: "and get a certificate.") */}
                    <p className="font-body text-sm text-white/90 leading-relaxed font-normal">
                      Gift yourself, individual, family and friends an experience into the 4 weeks SmartGap Programme. Complete your 360 personal development portfolio and get a certificate.
                    </p>
                    {/* TODO: confirm (user will confirm line on card value) */}

                  </div>

                  <button
                    type="button"
                    onClick={onOpenGiftCard}
                    className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-body text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md mt-2"
                  >
                    <HiOutlineGift className="w-4 h-4" />
                    <span>Get a SmartGap gift card</span>
                  </button>
                </div>

                {/* Gift Box sub-block */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div>
                    <span className="font-body text-xs text-[#FB923C] uppercase tracking-wider font-bold block mb-1">
                      Gift Box
                    </span>
                    <p className="font-body text-sm text-white/90 leading-relaxed font-normal">
                      For 50 people or more. If you want to get gift cards for a group of 50 or more, we can provide backend support for an easy process.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenGiftBox}
                    className="w-full py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-body text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <HiOutlineUserGroup className="w-4 h-4 text-[#FF9600]" />
                    <span>Get a SmartGap gift box</span>
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pathways;
