// src/components/Footer.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Magnet from "./ui/Magnet";
import FadeIn from "./ui/FadeIn";
import { HiOutlineArrowUpRight, HiOutlineSparkles } from "react-icons/hi2";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] px-4 sm:px-8 lg:px-12 pb-10 pt-16 relative overflow-hidden select-none border-t border-white/5">
      <div className="w-full bg-[#0d121c] rounded-[36px] sm:rounded-[50px] pt-14 pb-28 sm:pb-36 px-6 sm:px-12 lg:px-16 border border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-20">
          {/* TOP ROW: Brand & Action Pills */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
            {/* Brand Identity */}
            <div
              className="flex flex-col items-start gap-2 cursor-pointer group"
              onClick={scrollToTop}
            >
              <img
                src="/assets/logo.webp"
                alt="SmartGap"
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block pl-0.5">
                By Smartan House
              </span>
            </div>

            {/* Navigation Pills */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs uppercase tracking-widest font-mono text-white/70">
              <a
                href="#pathways"
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all"
              >
                Pathways
              </a>
              <a
                href="https://impact.smartanhouse.org/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all flex items-center gap-1"
              >
                <span>Sponsor Grant</span>
                <HiOutlineArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <Link
                to="/waitlist"
                className="px-5 py-2 rounded-full bg-white text-black font-extrabold hover:bg-neutral-200 transition-all shadow-md"
              >
                Join Waitlist
              </Link>
            </div>
          </div>

          {/* MIDDLE ROW: Manifesto & Attribution */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-white/60">
            <p className="max-w-md leading-relaxed font-general">
              The 4-week 360° personal development and cognitive empowerment journey designed for secondary school leavers, gap-year youth, and emerging pioneers.
            </p>
            <div className="text-left md:text-right font-mono text-[11px] text-white/40 space-y-1">
              <p>© {new Date().getFullYear()} SMARTGAP • ALL RIGHTS RESERVED</p>
              <p>POWERED BY SMARTAN HOUSE IMPACT ECOSYSTEM</p>
            </div>
          </div>
        </div>

        {/* BOTTOM MASSIVE WATERMARK WORDMARK */}
        <div className="absolute -bottom-6 sm:-bottom-10 md:-bottom-16 left-0 w-full flex justify-center pointer-events-none z-10 overflow-hidden leading-none">
          <span
            className="font-black tracking-tighter text-white/[0.04] text-[22vw] leading-none whitespace-nowrap block select-none uppercase font-mono"
          >
            SMARTGAP
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
