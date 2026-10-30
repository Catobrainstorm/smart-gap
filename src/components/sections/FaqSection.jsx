// src/components/sections/FaqSection.jsx
// Ultra-clean, high-converting FAQ section for SmartGap.
// Features STRICT SOLID FLAT BACKGROUNDS (Zero gradients, zero background overlays, zero blurred ambient glow shapes).
// Ultra-clean obsidian aesthetics, crisp borders, Framer Motion accordion, sound engine, and full WCAG accessibility.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineQuestionMarkCircle,
  HiOutlineAcademicCap,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCheckBadge,
  HiOutlineCpuChip,
  HiOutlineGift,
  HiOutlineMagnifyingGlass,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { TiLocationArrow } from "react-icons/ti";
import { useSound } from "../ui/SoundController";

export const FAQ_DATA = [
  {
    id: "q1",
    question: "What exactly is SmartGap?",
    shortAnswer:
      "A gamified, 4-week self-empowerment journey and continuum designed to give young people navigating gap years or transitions clarity, modern skills, and direction.",
    fullDescription:
      "Rather than passive video lectures, SmartGap treats personal development as an immersive global expedition. Across 28 intensive days, learners reconstruct their mental models, decode wealth creation mechanics, master modern AI and creative tools, and build a tangible, public proof-of-work portfolio that sets them apart from the crowd.",
    category: "The Continuum",
    categoryLabel: "Overview & Vision",
    badge: "4-Week Journey",
    icon: HiOutlineMapPin,
    keyPillars: [
      {
        title: "Radical Direction",
        desc: "Systematic deconstruction of personal agency, values, and decision frameworks.",
      },
      {
        title: "Modern Mental Models",
        desc: "Thinking tools from cognitive science, systems architecture, and economics.",
      },
      {
        title: "Zero Passive Video",
        desc: "Daily interactive quests, real-world deliverables, and public artifacts.",
      },
    ],
  },
  {
    id: "q2",
    question: "Who is SmartGap designed for?",
    shortAnswer:
      "High school graduates, gap-year students, and young minds preparing for higher education or the modern industry landscape.",
    fullDescription:
      "Designed specifically for ambitious learners aged 16–24 standing at the crossroads of their next life chapter. Whether you are taking an intentional gap year, awaiting university admission, or seeking an unfair advantage in tech and creative industries, SmartGap bridges the gap between academic theory and real-world execution. Forward-thinking parents also choose SmartGap to instill critical thinking, financial literacy, and self-discipline in their teenagers before they make major career and degree commitments.",
    category: "The Continuum",
    categoryLabel: "Eligibility & Fit",
    badge: "Ages 16–24 & Parents",
    icon: HiOutlineAcademicCap,
    keyPillars: [
      {
        title: "Secondary School Leavers",
        desc: "Gain unshakeable clarity before committing to university majors.",
      },
      {
        title: "Gap-Year Navigators",
        desc: "Replace aimless downtime with structured, high-status proof of work.",
      },
      {
        title: "Forward-Thinking Parents",
        desc: "Gift a life-altering developmental compass with measurable outcomes.",
      },
    ],
  },
  {
    id: "q3",
    question: "How does the gamified learning system work?",
    shortAnswer:
      "Learners complete daily quests across 130 world-map cities, earn XP points, keep daily streaks, unlock verified proof-of-work badges, and level up through 4 ranks.",
    fullDescription:
      "Your curriculum unfolds as a global interactive quest map. Each day teleports you to a new world city where you solve situational challenges, submit tangible artifacts, and earn XP. Maintaining a daily streak unlocks multiplier bonuses, while missing days freezes your streak flame. As your XP grows, you climb from Explorer (Rank 1) to Strategist, Builder, and Grandmaster, unlocking verified badges accredited by Smartan House.",
    category: "Gamified System",
    categoryLabel: "Game Mechanics",
    badge: "130 Cities & 4 Ranks",
    icon: HiOutlineSparkles,
    keyPillars: [
      {
        title: "130 Global Waypoints",
        desc: "Interactive narrative checkpoints tied to major global cities.",
      },
      {
        title: "4 Mastery Ranks",
        desc: "Climb from Explorer to Strategist, Builder, and Grandmaster.",
      },
      {
        title: "Streak Flame & Badges",
        desc: "Built-in accountability through momentum, streaks, and public badges.",
      },
    ],
  },
  {
    id: "q4",
    question: "What is the time commitment required over the 4 weeks?",
    shortAnswer:
      "Structured into 5 daily activities taking about 45–60 minutes per day, combining direct advisory sessions with Smartandad and hands-on modules.",
    fullDescription:
      "Engineered for high-density impact that fits easily into any schedule. The 4-week sprint is structured into five bite-sized 10–12 minute daily activities that respect your routine while ensuring daily compounding momentum. You can complete your tasks asynchronously at your own pace, while attending live advisory sessions or catching up on recordings.",
    category: "Gamified System",
    categoryLabel: "Schedule & Rhythm",
    badge: "45–60 Mins / Day",
    icon: HiOutlineClock,
    keyPillars: [
      {
        title: "1. Mental Model Primer (10m)",
        desc: "Foundational conceptual framework for the day.",
      },
      {
        title: "2. Hands-on Quest (15m)",
        desc: "Real-world task execution and prompt engineering deliverable.",
      },
      {
        title: "3. Interactive Simulation (10m)",
        desc: "Decision-tree exercise and scenario simulation.",
      },
      {
        title: "4. Strategy Sync (15m)",
        desc: "Live Smartandad masterclass or Shuri AI debrief.",
      },
      {
        title: "5. Proof-of-Work Log (5m)",
        desc: "Reflection capture and XP verification.",
      },
    ],
  },
  {
    id: "q5",
    question: "What do I receive upon completing SmartGap?",
    shortAnswer:
      "A portfolio of verified project proof-of-work, unlocked milestone badges accredited by Smartan House, and clear personal & career roadmaps.",
    fullDescription:
      "You don't just finish a course; you graduate with tangible intellectual and digital assets that prove your agency to universities, employers, and investors worldwide. Every graduate receives a permanent public verification URL on our ledger, verified credentials signed by Smartan House, five production-ready project artifacts, and preferential qualification for induction into the Optimus Trybe ecosystem.",
    category: "Outcomes & Shuri",
    categoryLabel: "Accreditation & Deliverables",
    badge: "Public Ledger & Badges",
    icon: HiOutlineCheckBadge,
    keyPillars: [
      {
        title: "Cryptographically Verified Certificate",
        desc: "Publicly authenticable anytime via our /verify portal.",
      },
      {
        title: "Proof-of-Work Portfolio",
        desc: "5 production-ready project artifacts demonstrating your mastery.",
      },
      {
        title: "3-Year Strategic Roadmap",
        desc: "Concrete personal, financial, and educational trajectory.",
      },
      {
        title: "Optimus Trybe Eligibility",
        desc: "Fast-tracked qualification for our post-completion fellowship.",
      },
    ],
  },
  {
    id: "q6",
    question: "Who is Shuri and how does mentorship work?",
    shortAnswer:
      "Shuri is your AI companion and guide across the quest map, providing real-time feedback alongside 20 direct strategic sessions led by Smartandad.",
    fullDescription:
      "Mentorship in SmartGap is a dual-engine model: cutting-edge intelligence meets battle-tested human wisdom. Shuri is your tireless 24/7 co-pilot, dissecting your thinking and guiding you through quest mechanics in real time. Concurrently, Smartandad leads 20 live, high-touch strategic advisory sessions addressing life strategy, wealth creation, and career trajectory, backed by high-agency peer cohort collaboration.",
    category: "Outcomes & Shuri",
    categoryLabel: "Dual-Engine Mentorship",
    badge: "24/7 AI + 20 Masterclasses",
    icon: HiOutlineCpuChip,
    keyPillars: [
      {
        title: "Shuri (AI Co-Pilot)",
        desc: "Instant 24/7 quest auditing, tailored prompts, and personalized hints.",
      },
      {
        title: "Smartandad (Lead Advisor)",
        desc: "20 live strategic masterclasses, real-time Q&A, and directional guidance.",
      },
      {
        title: "Peer Guild Circle",
        desc: "High-agency global peers collaborating and reviewing work together.",
      },
    ],
  },
];

const CATEGORIES = ["All Questions", "The Continuum", "Gamified System", "Outcomes & Shuri"];

export const FaqSection = ({ onOpenGiftModal }) => {
  const navigate = useNavigate();
  const { playUiSound } = useSound();
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [expandedId, setExpandedId] = useState("q1"); // default first FAQ open
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (id) => {
    playUiSound("blip");
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCategoryChange = (cat) => {
    playUiSound("click");
    setActiveCategory(cat);
  };

  // Filter items by category & search query
  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory =
      activeCategory === "All Questions" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="faq"
      aria-labelledby="faq-section-heading"
      className="relative w-full bg-[#0A0A0A] text-white py-[clamp(100px,16vh,200px)] px-6 sm:px-12 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 text-left">
        {/* --- SECTION HEADER --- */}
        <div className="space-y-6 max-w-4xl">
          {/* Eyebrow Pill (Solid Flat) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-neutral-800 text-[#FB923C] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest">
            <HiOutlineSparkles className="w-4 h-4 text-[#FF9600]" />
            <span>Frequently Asked Questions</span>
          </div>

          {/* Main Display Headline */}
          <h2
            id="faq-section-heading"
            className="display-title text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]"
          >
            Everything you need to know about{" "}
            <span className="text-[#FB923C]">SmartGap</span>.
          </h2>

          <p className="font-body text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-light">
            Clear, transparent answers for prospective learners, ambitious youth, and forward-thinking parents navigating transitions.
          </p>

          {/* Category Filter Pills & Search Input (Solid Flat) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-neutral-800">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="FAQ Categories">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#FF9600] text-[#0A0A0A]"
                        : "bg-[#141414] text-neutral-400 hover:text-white hover:bg-[#1C1C1C] border border-neutral-800"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Quick Keyword Filter */}
            <div className="relative min-w-[220px]">
              <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                aria-label="Filter FAQ questions"
                className="w-full pl-9 pr-4 py-2 rounded-full bg-[#141414] border border-neutral-800 text-white placeholder-neutral-500 text-xs font-body focus:outline-none focus:border-[#FB923C] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- ACCORDION LIST (Strict Solid Flat Cards) --- */}
        <div className="space-y-4" role="region" aria-label="Frequently Asked Questions Accordion">
          {filteredFaqs.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-[#0E0E0E] border border-neutral-800 space-y-3">
              <HiOutlineQuestionMarkCircle className="w-10 h-10 text-neutral-500 mx-auto" />
              <p className="font-body text-sm text-neutral-400">
                No matching questions found for "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All Questions");
                }}
                className="px-4 py-1.5 rounded-full bg-[#181818] text-white font-mono text-xs uppercase hover:bg-[#222222] border border-neutral-700 transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedId === faq.id;
              const IconComponent = faq.icon;
              const questionNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl sm:rounded-3xl border transition-colors duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#141414] border-[#FB923C]"
                      : "bg-[#0E0E0E] border-neutral-800 hover:border-neutral-700 hover:bg-[#121212]"
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    id={`faq-btn-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => handleToggle(faq.id)}
                    className="w-full text-left p-6 sm:p-8 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FB923C]"
                  >
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      {/* Numeric Index + Solid Flat Icon Pill */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors ${
                            isOpen ? "text-[#FB923C]" : "text-neutral-500"
                          }`}
                        >
                          {questionNumber}
                        </span>
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-colors ${
                            isOpen
                              ? "bg-[#1F1710] border-[#FB923C]/60 text-[#FB923C]"
                              : "bg-[#161616] border-neutral-800 text-neutral-400"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Question Text & Category Tag */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#FB923C] font-semibold">
                            {faq.categoryLabel}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-neutral-600 hidden sm:inline-block" />
                          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest hidden sm:inline-block">
                            {faq.badge}
                          </span>
                        </div>
                        <h3
                          className={`font-body text-base sm:text-xl font-bold tracking-tight transition-colors pr-2 ${
                            isOpen ? "text-white" : "text-neutral-200 hover:text-white"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Custom Expanding +/- Icon Toggle (Solid Flat) */}
                    <div
                      aria-hidden="true"
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "border-[#FB923C] bg-[#1F1710] text-[#FB923C] rotate-180"
                          : "border-neutral-800 bg-[#161616] text-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      {/* Horizontal bar */}
                      <span className="w-3.5 sm:w-4 h-0.5 bg-current rounded-full" />
                      {/* Vertical bar */}
                      <span
                        className={`absolute w-0.5 h-3.5 sm:h-4 bg-current rounded-full transition-transform duration-300 ${
                          isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Expandable Content (Framer Motion) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${faq.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-neutral-800 space-y-6">
                          {/* Short Answer Callout Box (Solid Flat) */}
                          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#121212] border border-neutral-800 flex items-start gap-3">
                            <span className="inline-block mt-1 w-2 h-2 rounded-full bg-[#FB923C] shrink-0" />
                            <p className="font-body text-sm sm:text-base text-white leading-relaxed font-medium">
                              {faq.shortAnswer}
                            </p>
                          </div>

                          {/* Full Elaborated Narrative */}
                          <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                            {faq.fullDescription}
                          </p>

                          {/* 3 Key Takeaway Columns (Solid Flat) */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                            {faq.keyPillars.map((pillar, pIdx) => (
                              <div
                                key={pIdx}
                                className="p-4 rounded-xl bg-[#0E0E0E] border border-neutral-800 space-y-1.5"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9600]" />
                                  <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                                    {pillar.title}
                                  </h4>
                                </div>
                                <p className="font-body text-xs text-neutral-400 leading-relaxed font-light">
                                  {pillar.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* --- BOTTOM ADMISSIONS & SUPPORT CARD (Solid Flat) --- */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-[#0E0E0E] border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-[#FB923C] font-mono text-xs uppercase tracking-wider font-bold">
              <HiOutlineChatBubbleBottomCenterText className="w-4 h-4" />
              <span>Still have questions?</span>
            </div>
            <h4 className="display-title text-2xl sm:text-3xl text-white font-black uppercase">
              Ready to map your gap year continuum?
            </h4>
            <p className="font-body text-sm text-neutral-400 leading-relaxed font-light">
              Join the waitlist to secure cohort admission, or gift an experience pass to a young mind preparing for the future.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => navigate("/waitlist")}
              className="flex-1 md:flex-none px-6 py-3.5 rounded-full bg-[#FF9600] hover:bg-[#FB923C] text-black font-body text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
            >
              <span>Join waitlist</span>
              <TiLocationArrow className="w-4 h-4 text-black -rotate-45" />
            </button>

            {onOpenGiftModal && (
              <button
                type="button"
                onClick={onOpenGiftModal}
                className="flex-1 md:flex-none px-6 py-3.5 rounded-full bg-[#181818] hover:bg-[#202020] border border-neutral-700 text-white font-body text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
              >
                <HiOutlineGift className="w-4 h-4 text-white" />
                <span>Get a gift card</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
