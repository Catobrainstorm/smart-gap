// src/components/sections/FaqSection.jsx
// Ultra-clean, flat obsidian FAQ section for SmartGap.
// STRICT CONSTRAINTS:
// - Solid background only (#0C0C0C / #0A0A0A).
// - ZERO gradients, ZERO radial ambient glows, ZERO background blur overlays.
// - Flat obsidian cards (#121212 / #161616) with 1px border rgba(255, 255, 255, 0.08).
// - Headline in font-zentry display uppercase; body text in legible neutral slate (#A1A1AA).
// - Smooth Framer Motion accordion with '+' rotating to '×' (rotate-45).
// - Full ARIA accessibility (role="region", aria-expanded, keyboard tab navigation).

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { useSound } from "../ui/SoundController";

export const FAQ_DATA = [
  {
    id: "q1",
    question: "What is SmartGap?",
    shortAnswer:
      "A 4-week gamified continuum designed to rebuild mental models, unpack wealth creation, and cultivate self-mastery.",
    fullDescription:
      "Rather than passive video lectures, SmartGap treats personal growth as an immersive global expedition. Across 28 intensive days, learners reconstruct their mental models, decode wealth creation mechanics, master modern AI and digital tools, and build a tangible, public proof-of-work portfolio that sets them apart from the crowd.",
    badge: "The Continuum",
  },
  {
    id: "q2",
    question: "Who is this program built for?",
    shortAnswer:
      "High school graduates, gap-year students, and young minds stepping into higher education or tech careers.",
    fullDescription:
      "Designed specifically for ambitious learners aged 16–24 standing at the crossroads of their next life chapter. Whether taking an intentional gap year, awaiting university admission, or building an edge in modern industry, SmartGap bridges academic theory and real-world execution. Forward-thinking parents also choose SmartGap to instill critical thinking, financial literacy, and agency in their teenagers.",
    badge: "Eligibility",
  },
  {
    id: "q3",
    question: "How does the world-map questing work?",
    shortAnswer:
      "Learners navigate a 130-city map, completing 5 daily activities per day to earn XP, maintain streaks, and unlock accredited badges.",
    fullDescription:
      "Your curriculum unfolds as an interactive quest map. Each day teleports you to a new global waypoint where you solve real-world situational challenges, submit tangible artifacts, and earn XP. Maintaining a daily streak unlocks multiplier bonuses, while leveling up through 4 mastery ranks unlocks verifiable badges accredited by Smartan House.",
    badge: "130-City Map",
  },
  {
    id: "q4",
    question: "What is the daily time commitment?",
    shortAnswer:
      "Approximately 45 to 60 minutes per day, balancing interactive exercises and direct sessions with Smartandad.",
    fullDescription:
      "Structured into five 10–12 minute micro-sprints per day: (1) Morning Mental Model Primer, (2) Hands-on Quest Deliverable, (3) Interactive Scenario Simulation, (4) Smartandad Strategy Sync or Shuri AI debrief, and (5) Daily Proof-of-Work Log. Engineered for high-density impact without disrupting your daily routine.",
    badge: "45–60 Mins/Day",
  },
  {
    id: "q5",
    question: "What do I get upon completion?",
    shortAnswer:
      "Verified portfolio proof-of-work, accredited milestone badges from Smartan House, and clear personal roadmaps.",
    fullDescription:
      "Graduates receive an immutable public verification URL on our ledger (accessible via /verify), accredited milestone credentials signed by Smartan House, 5 production-ready project artifacts, a concrete 3-year strategic roadmap, and priority eligibility for induction into the invite-only Optimus Trybe fellowship.",
    badge: "Verified Outcomes",
  },
  {
    id: "q6",
    question: "How do I join the upcoming cohort?",
    shortAnswer:
      "Tap 'Join Waitlist' to lock in your priority spot for the next induction.",
    fullDescription:
      "Admissions operate on a cohort basis with limited seats to preserve mentorship density and peer review quality. Submitting your waitlist application secures your timestamped priority ranking for the upcoming cohort launch and orientation cycle.",
    badge: "Admissions",
    hasCtaButton: true,
  },
];

export const FaqSection = ({ onOpenGiftModal }) => {
  const navigate = useNavigate();
  const { playUiSound } = useSound();
  const [expandedId, setExpandedId] = useState("q1");

  const handleToggle = (id) => {
    playUiSound("blip");
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-section-heading"
      className="w-full bg-[#0C0C0C] text-white py-24 sm:py-32 px-6 sm:px-12 select-none border-t border-b border-white/[0.08]"
    >
      <div className="max-w-4xl mx-auto space-y-12 text-left">
        {/* --- HEADER --- */}
        <div className="space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#161616] border border-white/[0.08] text-[#FB923C] font-mono text-xs uppercase tracking-widest font-semibold">
            FAQ
          </span>
          <h2
            id="faq-section-heading"
            className="display-title text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.92]"
          >
            Frequently Asked Questions
          </h2>
          <p className="font-body text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
            Everything you need to know about the SmartGap 4-week gamified continuum, admissions, and verified outcomes.
          </p>
        </div>

        {/* --- ACCORDION LIST --- */}
        <div
          className="space-y-3"
          role="region"
          aria-label="Frequently Asked Questions"
        >
          {FAQ_DATA.map((faq, index) => {
            const isOpen = expandedId === faq.id;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#161616] border border-[#FB923C]/50"
                    : "bg-[#121212] border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Trigger */}
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FB923C]"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isOpen ? "text-[#FB923C]" : "text-zinc-500"
                      }`}
                    >
                      {itemNumber}
                    </span>
                    <h3
                      className={`font-body text-base sm:text-lg font-bold tracking-tight transition-colors ${
                        isOpen ? "text-white" : "text-zinc-200"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* '+' rotates to '×' (rotate-45) */}
                  <div
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-full bg-[#181818] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-[#FB923C] border-[#FB923C]/60" : "rotate-0 text-zinc-400"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 stroke-[2]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-white/[0.06] space-y-4">
                        {/* Direct Short Answer */}
                        <div className="mt-4 p-4 rounded-xl bg-[#0F0F0F] border border-white/[0.06]">
                          <p className="font-body text-sm sm:text-base text-zinc-100 font-medium leading-relaxed">
                            {faq.shortAnswer}
                          </p>
                        </div>

                        {/* Full Narrative */}
                        <p className="font-body text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-light">
                          {faq.fullDescription}
                        </p>

                        {/* Optional contextual CTA */}
                        {faq.hasCtaButton && (
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => navigate("/waitlist")}
                              className="px-5 py-2.5 rounded-full bg-[#FF9600] hover:bg-[#FB923C] text-black font-body text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 cursor-pointer transition-colors active:scale-95"
                            >
                              <span>Join Waitlist</span>
                              <TiLocationArrow className="w-3.5 h-3.5 -rotate-45" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* --- BOTTOM CALLOUT (Flat Obsidian) --- */}
        <div className="p-8 rounded-2xl bg-[#121212] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="display-title text-xl text-white font-black uppercase">
              Ready to begin your continuum?
            </h4>
            <p className="font-body text-xs text-[#A1A1AA]">
              Secure your spot on the waitlist or gift a pass to an emerging young leader.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("/waitlist")}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#FF9600] hover:bg-[#FB923C] text-black font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95"
            >
              <span>Join Waitlist</span>
              <TiLocationArrow className="w-3.5 h-3.5 -rotate-45" />
            </button>

            {onOpenGiftModal && (
              <button
                type="button"
                onClick={onOpenGiftModal}
                className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#181818] hover:bg-[#202020] border border-white/[0.12] text-white font-body text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer active:scale-95"
              >
                <span>Gift Pass</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
