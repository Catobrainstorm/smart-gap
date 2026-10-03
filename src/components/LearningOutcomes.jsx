// src/components/LearningOutcomes.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BentoTilt from "./BentoTilt";
import { HiOutlineSparkles, HiOutlineCheckBadge } from "react-icons/hi2";

const LEARNING_OUTCOMES = [
  {
    num: "01",
    tag: "Cognitive Architecture",
    title: "Reconstruct Mental Models",
    desc: "Helps a young person reconstruct their mental model of the world so that they can expand their vision of what is truly possible.",
  },
  {
    num: "02",
    tag: "Self-Awareness",
    title: "Uncover Natural Mastery",
    desc: "Identifies unique strengths, intrinsic capabilities, and natural modes of high-leverage problem solving.",
  },
  {
    num: "03",
    tag: "Career Inflections",
    title: "Discover Future Pathways",
    desc: "Unlocks informed career possibilities across emerging global sectors before making irreversible commitments.",
  },
  {
    num: "04",
    tag: "Global Economy",
    title: "Decode Capital & Wealth",
    desc: "Understands how the global economy works, how wealth is created, capital deployment, and global positioning.",
  },
  {
    num: "05",
    tag: "AI Augmentation",
    title: "Amplify Critical Agency",
    desc: "Navigates AI technology inflections to become an AI-augmented practitioner without sacrificing critical thinking.",
  },
  {
    num: "06",
    tag: "Nation Building",
    title: "Conscious Citizenship",
    desc: "Forges conscious citizenship with deeply rooted inclinations for transformative impact and nation-building.",
  },
];

const LearningOutcomes = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for the background Shuri image
  const shuriY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const shuriScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.06, 1]);

  return (
    <section
      ref={containerRef}
      id="outcomes"
      className="w-full min-h-screen bg-[#050505] text-white py-24 sm:py-32 px-5 sm:px-8 md:px-12 relative overflow-hidden border-t border-white/5 select-none"
    >
      {/* ================= FULL VISIBILITY SHURI LEFT IMAGE ================= */}
      <motion.div
        style={{ y: shuriY, scale: shuriScale }}
        className="absolute left-[-2%] sm:left-[2%] md:left-[5%] top-[8%] sm:top-[12%] w-[280px] sm:w-[420px] md:w-[540px] lg:w-[620px] pointer-events-none z-0 opacity-85 sm:opacity-95 filter drop-shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
      >
        <img
          src="/img/shurileft.png"
          alt="Shuri Character Full Visual"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Atmospheric lighting accents */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs uppercase font-bold tracking-widest mb-4 backdrop-blur-md shadow-md">
            <HiOutlineSparkles className="w-3.5 h-3.5 text-white" />
            <span>Curriculum Architecture</span>
          </div>

          <h2 className="special-font text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.88] mb-6 drop-shadow-md">
            LEARNING OUTCOMES
          </h2>

          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-general bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            SmartGap is designed to intervene before career choices become deeply entrenched. It saves a young person from waiting to graduate from university to discover that traditional schooling has not prepared them for the demands of the 21st-century marketplace.
          </p>
        </motion.div>

        {/* ================= 6-CARD ANIMATED BENTO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_OUTCOMES.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-full"
            >
              <BentoTilt className="h-full">
                <div className="h-full p-7 sm:p-8 rounded-[28px] bg-[#0c0c0c]/85 backdrop-blur-xl border border-white/15 hover:border-white/40 transition-all duration-300 flex flex-col justify-between group shadow-2xl relative overflow-hidden">
                  {/* Subtle corner light highlight */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] group-hover:bg-white/[0.08] rounded-bl-full transition-colors pointer-events-none" />

                  <div className="relative z-10">
                    {/* Number & Category Pill */}
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-white group-hover:text-white transition-colors">
                        {item.num}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 px-3 py-1 rounded-full bg-white/10 border border-white/15 group-hover:border-white/30 transition-all">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="special-font text-lg sm:text-xl font-bold uppercase text-white mb-2.5 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-general">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span className="flex items-center gap-1.5 text-white/75">
                      <HiOutlineCheckBadge className="w-3.5 h-3.5 text-white" />
                      <span>Verified Outcome</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                  </div>
                </div>
              </BentoTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
