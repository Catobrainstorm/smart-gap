// src/components/sections/Pathways.jsx
// Section 3.9: Pathways (Admissions and sponsorship ecosystem)
// Features SmartGap with Gift Card, Optimus trybe post-completion qualification notice, and the waitlist grant disclaimer.

import React from "react";
import { useNavigate } from "react-router-dom";
import TiltCard from "../ui/TiltCard";
import {
  HiOutlineArrowRight,
  HiOutlineGift,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

export const Pathways = ({ onOpenGiftCard, onOpenGiftBox }) => {
  const navigate = useNavigate();

  return (
    <section
      id="pathways"
      className="relative w-full bg-[#080B14] text-white py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 text-left">
        {/* SECTION TITLE */}
        <div className="max-w-4xl space-y-3">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FF9600]/15 border border-[#FF9600]/30 text-[#FF9600] font-mono text-xs sm:text-sm uppercase font-bold tracking-widest shadow-sm">
            Admissions
          </span>
          <h2 className="display-title text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-white tracking-tight leading-[0.88]">
            Choose your SmartGap pathway
          </h2>
        </div>

        {/* SINGLE CENTRAL PATHWAY: SMARTGAP WITH GIFT CARD */}
        <div className="w-full">
          <TiltCard
            maxTilt={2}
            className="w-full rounded-[36px] sm:rounded-[48px] bg-[#0E1322] border border-white/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#FF9600]/50 transition-colors"
          >
            <div className="space-y-10 lg:space-y-12">
              {/* Card Header & Optimus trybe continuum clarification */}
              <div className="space-y-4 max-w-4xl">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FF9600]/15 border border-[#FF9600]/30 text-[#FF9600] font-mono text-xs sm:text-sm uppercase font-bold tracking-widest shadow-sm">
                  SmartGap Pathway
                </span>

                <h3 className="display-title text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase leading-tight">
                  SmartGap with Gift Card
                </h3>

                <p className="font-body text-base sm:text-lg text-white/85 leading-relaxed font-light">
                  This allows you to take the 4 weeks 360 degree personal development Programme, complete with all the projects and certification. The Optimus trybe is a separate continuum that happens after SmartGap is completed—participants who qualify will be placed on the waitlist for induction.
                </p>
              </div>

              {/* TWO ENROLLMENT TIERS: GIFT CARDS & GIFT BOX */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {/* 1. Individual Gift Cards */}
                <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-[#FF9600] uppercase tracking-wider font-bold">
                        Individual & Family
                      </span>
                      <HiOutlineGift className="w-5 h-5 text-[#FF9600]" />
                    </div>
                    <h4 className="display-title text-2xl sm:text-3xl text-white font-black uppercase">
                      Gift Cards
                    </h4>
                    <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      Gift yourself, individual, family and friends an experience into the 4 weeks SmartGap Programme. Complete your 360 personal development portfolio and get a certificate.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenGiftCard}
                    className="w-full py-4 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-body text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <HiOutlineGift className="w-4 h-4" />
                    <span>Get a SmartGap gift card</span>
                  </button>
                </div>

                {/* 2. Bulk Gift Box (50+ passes) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-[#FB923C] uppercase tracking-wider font-bold">
                        Cohort Passes (50+)
                      </span>
                      <HiOutlineUserGroup className="w-5 h-5 text-[#FB923C]" />
                    </div>
                    <h4 className="display-title text-2xl sm:text-3xl text-white font-black uppercase">
                      Gift Box
                    </h4>
                    <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      For 50 people or more. If you want to get gift cards for a group of 50 or more, we can provide backend support for an easy process.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenGiftBox}
                    className="w-full py-4 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-body text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <HiOutlineUserGroup className="w-4 h-4 text-[#FF9600]" />
                    <span>Get a SmartGap gift box</span>
                  </button>
                </div>
              </div>

              {/* DISCLAIMER & WAITLIST GRANT NOTICE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#080B14]/80 border border-[#FB923C]/30 relative overflow-hidden space-y-4">
                <div className="flex items-center gap-2.5">
                  <HiOutlineInformationCircle className="w-5 h-5 text-[#FB923C] shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-[#FB923C] uppercase tracking-wider font-bold">
                    Disclaimer
                  </span>
                </div>

                <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed font-light">
                  Persons on the waitlist are individuals who are from underserved communities who are unable to afford the SmartGap Gift Card, Smartan House will seek sponsors to help provide grants for the Gift Cards on a first-come, first-served basis.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/waitlist")}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-body text-xs sm:text-sm font-semibold tracking-wide text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Join the Waitlist</span>
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://impact.smartanhouse.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 border border-white/15 text-white/70 hover:text-white font-body text-xs sm:text-sm font-semibold tracking-wide text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <HiOutlineHeart className="w-4 h-4 text-[#FB923C]" />
                    <span>Sponsor the Waitlist</span>
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Pathways;
