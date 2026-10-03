// src/components/sections/SeeAndFeel.jsx
// Section 3.6: The Experience (Progress You Can See & Feel)
// White background with 2-column layout:
// Left: Title, Lead Paragraph, and the crucial 5-item checklist.
// Right: The gamified Student HUD card with XP progression, 7-day consistency streak, soulbound badges, and interactive quest claim.

import React, { useState } from "react";
import confetti from "canvas-confetti";
import TiltCard from "../ui/TiltCard";
import { useSound } from "../ui/SoundController";
import {
  HiOutlineSparkles,
  HiOutlineFire,
  HiCheck,
} from "react-icons/hi";

const PROGRESS_ITEMS = [
  "XP, levels & leaderboards",
  "Daily streaks that keep you consistent",
  "Achievement badges to collect",
  "Real projects for your portfolio",
  "Certificates awarded by Smartan House",
];

const WEEK_DAYS = [
  { day: "M", completed: true },
  { day: "T", completed: true },
  { day: "W", completed: true },
  { day: "T", completed: true },
  { day: "F", completed: true },
  { day: "S", completed: true },
  { day: "S", completed: true },
];

export const SeeAndFeel = () => {
  const { playUiSound } = useSound();
  const [xp, setXp] = useState(3850);
  const [hasClaimed, setHasClaimed] = useState(false);

  const handleClaimQuest = (e) => {
    if (hasClaimed) return;
    setHasClaimed(true);
    setXp((prev) => prev + 500);
    playUiSound("pop");

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#FF9600", "#DA5127", "#7C5CFF", "#0A0A0A"],
      });
    } catch (_) { }
  };

  return (
    <section
      id="experience"
      className="relative w-full bg-white text-[#0A0A0A] py-[clamp(100px,16vh,200px)] px-6 sm:px-12 select-none overflow-hidden border-t border-black/5"
    >
      {/* Subtle background ambient warmth */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#FF9600]/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#7C5CFF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* LEFT COLUMN: TITLE + TEXT + CRUCIAL CHECKLIST */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-8 text-left">
          {/* Header */}
          <div className="space-y-5">
            <h2 className="display-title text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#0A0A0A] tracking-tight leading-[0.9]">
              Progress You Can See & Feel
            </h2>
            <p className="font-body text-base sm:text-lg lg:text-xl text-black/75 leading-[1.6] max-w-[48ch] font-normal">
              SmartGap makes growth addictive. Watch your XP climb, your streaks build, and your badges unlock as you become the person you're meant to be.
            </p>
          </div>

          {/* The Crucial List */}
          <div className="space-y-4 pt-3">
            {PROGRESS_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 py-1 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-lg border-2 border-[#1E1E2F] flex items-center justify-center shrink-0">
                  <HiCheck className="w-4 h-4 text-[#1E1E2F] stroke-[3]" />
                </div>
                <span className="font-body text-base sm:text-lg text-[#1E1E2F] font-medium tracking-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE STUDENT HUD CARD BESIDE THE LIST */}
        <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
          <TiltCard
            maxTilt={5}
            className="w-full max-w-[480px] bg-[#0E1017] text-white p-6 sm:p-9 rounded-[36px] border border-black/10 shadow-[0_25px_80px_rgba(0,0,0,0.18)] space-y-6 relative overflow-hidden"
          >
            {/* Header: Student Level */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/progress.webp"
                    alt="XP Mascot"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#FF9600] uppercase tracking-widest block font-bold">
                    ACTIVE LEARNER
                  </span>
                  <h4 className="font-body text-base sm:text-lg font-black text-white">
                    Level 04 • High-Agency Thinker
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FB923C]/20 border border-[#FB923C]/30 text-[#FB923C] font-mono text-xs font-bold">
                <HiOutlineFire className="w-4 h-4" />
                <span>14 Days</span>
              </div>
            </div>

            {/* XP Progression Bar */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">XP Progress</span>
                <span className="text-white font-bold">
                  {xp.toLocaleString()} / 5,000 XP
                </span>
              </div>

              <div className="w-full h-3.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#FF9600] via-[#DA5127] to-[#7C5CFF] rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(255,150,0,0.6)]"
                  style={{ width: `${Math.min(100, (xp / 5000) * 100)}%` }}
                />
              </div>
            </div>

            {/* 7-Day Consistency Matrix */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/8 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                  Weekly Consistency Streak
                </span>
                <span className="text-[10px] font-mono text-[#FF9600] font-bold">
                  100% On Track
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {WEEK_DAYS.map((w, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-1 py-1.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-[10px] font-mono text-white/50">
                      {w.day}
                    </span>
                    <div className="w-4 h-4 rounded-full bg-[#FF9600] text-black flex items-center justify-center">
                      <HiCheck className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soulbound Badges Row */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                Unlocked Soulbound Badges
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                  <span className="text-lg">🧠</span>
                  <span className="font-mono text-[9px] text-white/80 font-bold leading-tight">
                    Mental Models
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                  <span className="text-lg">⚡</span>
                  <span className="font-mono text-[9px] text-white/80 font-bold leading-tight">
                    AI Augmented
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                  <span className="text-lg">🌍</span>
                  <span className="font-mono text-[9px] text-white/80 font-bold leading-tight">
                    Nation Builder
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Quest Claim CTA */}
            <button
              type="button"
              onClick={handleClaimQuest}
              disabled={hasClaimed}
              className={`w-full py-3.5 rounded-2xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${hasClaimed
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                  : "bg-gradient-to-r from-[#FF9600] to-[#DA5127] hover:from-[#ff9f1a] hover:to-[#e05b30] text-white shadow-[0_8px_30px_rgba(255,150,0,0.35)]"
                }`}
            >
              {hasClaimed ? (
                <>
                  <HiCheck className="w-4 h-4 stroke-[3]" />
                  <span>Daily Quest Completed (+500 XP Awarded)</span>
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-4 h-4" />
                  <span>Claim Daily Quest XP (+500 XP)</span>
                </>
              )}
            </button>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default SeeAndFeel;
