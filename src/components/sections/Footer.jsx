// src/components/sections/Footer.jsx
// Dark cinematic footer with responsive giant SMARTGAP wordmark, smooth rocket back-to-top,
// social links, and brand ecosystem attribution.

import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowUp, HiOutlineSparkles } from "react-icons/hi2";
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] text-white pt-20 pb-12 px-4 sm:px-8 lg:px-12 select-none border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* TOP ROW: LOGO, NAV LINKS & ROCKET BACK-TO-TOP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Identity */}
          <div className="flex flex-col items-start gap-2 cursor-pointer group" onClick={scrollToTop}>
            <img
              src="/assets/logo.webp"
              alt="SmartGap"
              className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block pl-0.5">
              BY SMARTAN HOUSE
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-bold uppercase tracking-widest text-white/70">
            <a href="#philosophy" className="hover:text-[#FF9600] transition-colors">
              Philosophy
            </a>
            <a href="#experience" className="hover:text-[#FF9600] transition-colors">
              Experience
            </a>
            <a href="#shuri" className="hover:text-[#FF9600] transition-colors">
              Shuri
            </a>
            <a href="#pathways" className="hover:text-[#FF9600] transition-colors">
              Pathways
            </a>
            <Link to="/verify" className="hover:text-[#C4B5FD] transition-colors">
              Verify Certificate
            </Link>
            <a
              href="https://impact.smartanhouse.org/"
              target="_blank"
              rel="noreferrer"
              className="text-[#FB923C] hover:text-[#f97316] transition-colors"
            >
              Sponsorship Grant ↗
            </a>
          </div>

          {/* Back to top rocket button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <HiOutlineArrowUp className="w-4 h-4 text-[#FF9600] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* MIDDLE ROW: MANIFESTO & SOCIAL ICONS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-xs text-white/60">
          <div className="md:col-span-7 space-y-2">
            <p className="font-body text-sm text-white/80 max-w-lg leading-relaxed font-light">
              The 4-week 360° personal development continuum designed to turn secondary school leavers and emerging youth into high-agency thinkers, builders, and leaders.
            </p>
            <p className="font-mono text-[11px] text-white/50">
              Built by Smartan House
            </p>
          </div>

          <div className="md:col-span-5 flex md:justify-end items-center gap-4 text-base text-white/70">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:text-[#FF9600] transition-all"
              aria-label="Twitter / X"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:text-[#FF9600] transition-all"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:text-[#FF9600] transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:text-[#FF9600] transition-all"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* MASSIVE WORDMARK WATERMARK */}
        <div className="pt-8 overflow-hidden">
          <div className="display-title font-black text-[18vw] leading-[0.8] text-white/[0.04] text-center select-none uppercase tracking-tighter hover:text-white/[0.08] transition-colors duration-700">
            SMARTGAP
          </div>
        </div>

        {/* COPYRIGHT BOTTOM BAR */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-3">
          <span>© {new Date().getFullYear()} SMARTGAP. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
