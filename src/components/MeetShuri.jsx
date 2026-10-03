// src/components/MeetShuri.jsx
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnet from "./ui/Magnet";
import {
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

const SHURI_CAPABILITIES = [
  {
    id: "audit",
    title: "360° Real-Time Audit",
    desc: "Audits your projects, models, and written portfolio to ensure high-stakes market readiness.",
    xp: "+120 XP",
  },
  {
    id: "habit",
    title: "Daily Habit Engine",
    desc: "Maintains cognitive discipline streaks and tracks deliberate personal growth daily.",
    xp: "18-Day Streak",
  },
  {
    id: "matrix",
    title: "Global Market Leverage",
    desc: "Maps capital flows and technology inflections directly to your 3-year growth roadmap.",
    xp: "AI-Augmented",
  },
];

const MeetShuri = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for the background Shuri right image
  const shuriY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const shuriScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.05, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      ref={containerRef}
      id="shuri"
      className="w-full min-h-[95vh] bg-[#070707] text-white py-24 sm:py-32 px-5 sm:px-8 md:px-12 relative overflow-hidden border-t border-white/5 select-none flex items-center"
    >
      {/* ================= FULL VISIBILITY SHURI RIGHT IMAGE ================= */}
      <motion.div
        style={{ y: shuriY, scale: shuriScale }}
        className="absolute right-[-2%] sm:right-[2%] md:right-[4%] lg:right-[6%] top-[5%] sm:top-[8%] w-[320px] sm:w-[460px] md:w-[560px] lg:w-[640px] pointer-events-none z-0 opacity-90 sm:opacity-95 filter drop-shadow-[0_25px_70px_rgba(255,255,255,0.09)]"
      >
        <img
          src="/img/shruiright.png"
          alt="Shuri Right Full Visual"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Atmospheric ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* ================= CONTENT CONTAINER (LEFT-ALIGNED) ================= */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Concise Story & Interactive Capability Cards */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 xl:col-span-6 space-y-6 bg-[#070707]/75 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-3xl border border-white/10 lg:border-none shadow-2xl lg:shadow-none"
          >
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs uppercase font-bold tracking-widest backdrop-blur-md shadow-md">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-white" />
              <span>Cognitive Copilot • AI-Augmented Learning</span>
            </div>

            {/* Headline */}
            <h2 className="special-font text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.88] drop-shadow-md">
              MEET SHURI
            </h2>

            {/* Concise Story Body */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-general max-w-xl">
              Your 24/7 personal intelligence companion. Shuri augments your natural critical thinking, audits your 360° portfolio projects in real-time, and guides your continuous personal transformation.
            </p>

            {/* Interactive Capability Cards */}
            <div className="space-y-3 pt-2 max-w-xl">
              {SHURI_CAPABILITIES.map((cap, idx) => {
                const isActive = activeTab === idx;
                return (
                  <motion.div
                    key={cap.id}
                    whileHover={{ x: 6 }}
                    onClick={() => setActiveTab(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#141414]/95 border-white/40 shadow-xl"
                        : "bg-[#0d0d0d]/80 border-white/10 hover:border-white/25 hover:bg-[#111111]/90"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isActive ? "bg-white animate-pulse" : "bg-white/40"
                          }`}
                        />
                        <h4 className="text-xs sm:text-sm font-mono font-bold uppercase text-white tracking-wider">
                          {cap.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                        {cap.xp}
                      </span>
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed pl-4 font-general">
                      {cap.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Live Status indicator */}
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/90">Neural Core Active</span>
              </div>
              <span>•</span>
              <span>24/7 Continuous Guidance</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Floating Magnet Telemetry Badge */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
            <Magnet padding={120} strength={3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-6 rounded-3xl bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/20 shadow-2xl max-w-sm w-full space-y-4 hover:border-white/40 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <HiOutlineCpuChip className="w-4 h-4 text-white" />
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      Shuri Real-Time Copilot
                    </span>
                  </div>
                  <HiOutlineShieldCheck className="w-4 h-4 text-white/70" />
                </div>

                <div className="p-3.5 rounded-xl bg-black/70 border border-white/10">
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-1">
                    Simulated Telemetry
                  </span>
                  <p className="text-xs text-white/90 font-mono leading-relaxed">
                    "360° Portfolio Matrix synced. Cognitive discipline streak active. Optimus Trybe induction trajectory: Verified."
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pt-1">
                  <span>Latency: 12ms</span>
                  <span className="text-white font-bold">Augmented Mode</span>
                </div>
              </motion.div>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetShuri;
