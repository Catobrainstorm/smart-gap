// src/components/GiftCard3D.jsx
// 3D Gift Card Preview with interactive theme support (Obsidian, Neon Volt, Sunset Flame, Cosmic Violet),
// 3D tilt on desktop, smooth 180-deg flip toggle for front and back, and touch-optimized mobile responsiveness.

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineRefresh, HiOutlineShieldCheck, HiOutlineQrcode } from "react-icons/hi";
import { BsWifi } from "react-icons/bs";

const THEME_CONFIG = {
  obsidian: {
    frontBg: "from-[#1a1a1a] via-[#111111] to-[#0a0a0a]",
    backBg: "from-[#141414] via-[#0d0d0d] to-[#080808]",
    border: "border-white/15",
    glow: "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.03)]",
    badge: "bg-white/10 border-white/20 text-white",
    amountBadge: "bg-white/10 border-white/15 text-white",
    accentText: "text-white",
    stripe: "border-white/10",
  },
  volt: {
    frontBg: "from-[#291605] via-[#1a0e03] to-[#0d0701]",
    backBg: "from-[#201004] via-[#120802] to-[#070401]",
    border: "border-[#FF9600]/40",
    glow: "shadow-[0_20px_40px_-15px_rgba(255,150,0,0.35),0_0_25px_rgba(255,150,0,0.2)]",
    badge: "bg-[#FF9600]/20 border-[#FF9600]/40 text-[#FF9600]",
    amountBadge: "bg-[#FF9600] text-black border-[#FF9600]",
    accentText: "text-[#FF9600]",
    stripe: "border-[#FF9600]/20",
  },
  flame: {
    frontBg: "from-[#291307] via-[#180a03] to-[#0c0501]",
    backBg: "from-[#200e05] via-[#110602] to-[#070301]",
    border: "border-[#FB923C]/40",
    glow: "shadow-[0_20px_40px_-15px_rgba(251,146,60,0.3),0_0_25px_rgba(251,146,60,0.18)]",
    badge: "bg-[#FB923C]/20 border-[#FB923C]/40 text-[#FB923C]",
    amountBadge: "bg-[#FB923C] text-black border-[#FB923C]",
    accentText: "text-[#FB923C]",
    stripe: "border-[#FB923C]/20",
  },
  cosmic: {
    frontBg: "from-[#1e133e] via-[#100924] to-[#070414]",
    backBg: "from-[#160d31] via-[#0b061b] to-[#05030f]",
    border: "border-[#7C5CFF]/40",
    glow: "shadow-[0_20px_40px_-15px_rgba(124,92,255,0.3),0_0_25px_rgba(124,92,255,0.18)]",
    badge: "bg-[#7C5CFF]/20 border-[#7C5CFF]/40 text-[#7C5CFF]",
    amountBadge: "bg-[#7C5CFF] text-white border-[#7C5CFF]",
    accentText: "text-[#7C5CFF]",
    stripe: "border-[#7C5CFF]/20",
  },
};

export const GiftCard3D = ({
  recipientName = "Recipient Name",
  senderName = "Smartan House",
  amount = 50000,
  cardCode = "SG4W-8824-9102-360P",
  theme = "obsidian",
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5, isHovering: false });
  const cardRef = useRef(null);

  const currentTheme = THEME_CONFIG[theme] || THEME_CONFIG.obsidian;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y, isHovering: true });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5, isHovering: false });
  };

  // 3D Tilt calculation (subtle for premium card feel)
  const rotateX = mousePos.isHovering ? (mousePos.y - 0.5) * -10 : 0;
  const rotateY = mousePos.isHovering ? (mousePos.x - 0.5) * 12 : 0;
  const glareX = mousePos.x * 100;
  const glareY = mousePos.y * 100;

  const formattedAmount = Number(amount).toLocaleString();

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[340px] sm:max-w-[420px]">
      {/* 3D PERSPECTIVE CONTAINER */}
      <div
        className="w-full h-[215px] sm:h-[245px] group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{
            rotateY: rotateY,
            rotateX: rotateX,
          }}
          transition={{
            rotateY: { duration: 0.08, ease: "easeOut" },
            rotateX: { duration: 0.08, ease: "easeOut" },
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className={`relative w-full h-full rounded-2xl p-0 transition-all duration-300 ${currentTheme.glow}`}
        >
          {/* ================= FRONT OF CARD ================= */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${currentTheme.frontBg} overflow-hidden p-5 sm:p-6 flex flex-col justify-between border ${currentTheme.border} transition-colors duration-300`}
          >
            {/* Subtle light reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-200"
              style={{
                background: mousePos.isHovering
                  ? `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`
                  : "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 60%)",
              }}
            />

            {/* Subtle micro dot grid */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                backgroundSize: "14px 14px",
              }}
            />

            {/* Top Row: Brand & Value */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center ${currentTheme.badge}`}
                >
                  <span className="font-mono font-black text-[11px] tracking-tight">
                    SG
                  </span>
                </div>
                <div>
                  <h4
                    className={`font-bold text-xs tracking-wider uppercase font-mono leading-none ${currentTheme.accentText}`}
                  >
                    SmartGap with Gift Card
                  </h4>
                  <span className="text-[9px] text-white/50 tracking-widest font-mono uppercase">
                    Gift Card
                  </span>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider border ${currentTheme.amountBadge}`}
              >
                ₦{formattedAmount}
              </div>
            </div>

            {/* Middle Row: EMV Chip & Details */}
            <div className="relative z-10 flex items-center justify-between my-auto">
              <div className="flex items-center gap-3">
                {/* Gold EMV Chip */}
                <div className="w-9 sm:w-10 h-6 sm:h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[1px] shadow-sm relative overflow-hidden">
                  <div className="w-full h-full bg-[#c99738] rounded-[3px] flex items-center justify-center relative">
                    <div className="w-full h-[1px] bg-black/40 absolute top-1/2 -translate-y-1/2" />
                    <div className="h-full w-[1px] bg-black/40 absolute left-1/3" />
                    <div className="h-full w-[1px] bg-black/40 absolute right-1/3" />
                    <div className="w-3.5 h-2.5 rounded-[2px] border border-black/30" />
                  </div>
                </div>

                <BsWifi className="w-4 h-4 text-white/40 rotate-90" />
              </div>

              <span className="text-[9px] sm:text-[10px] text-white/60 font-mono uppercase tracking-wider">
                4-Week Personal Dev
              </span>
            </div>

            {/* Bottom Row: Recipient & Token */}
            <div className="relative z-10 pt-2 border-t border-white/10 flex items-end justify-between">
              <div>
                <span className="text-[8px] text-white/40 font-mono uppercase tracking-widest block">
                  Cardholder
                </span>
                <p className="text-white font-semibold text-xs tracking-wide capitalize truncate max-w-[170px] sm:max-w-[210px]">
                  {recipientName || "Valued Learner"}
                </p>
                <span className="text-[9px] text-white/40 font-mono">
                  From: {senderName || "Smartan House"}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[8px] text-white/40 font-mono uppercase tracking-widest block">
                  Token
                </span>
                <span className={`text-[10px] sm:text-[11px] font-mono font-semibold ${currentTheme.accentText}`}>
                  {cardCode}
                </span>
              </div>
            </div>
          </div>

          {/* ================= BACK OF CARD ================= */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${currentTheme.backBg} overflow-hidden p-4 sm:p-5 flex flex-col justify-between border ${currentTheme.border} transition-colors duration-300`}
          >
            {/* Magnetic Stripe */}
            <div className={`absolute top-4 left-0 right-0 h-8 sm:h-9 bg-black border-y ${currentTheme.stripe}`} />

            <div className="pt-8 sm:pt-9" />

            {/* Signature Strip */}
            <div className="flex items-center gap-2.5 sm:gap-3 bg-black/60 p-1.5 sm:p-2 rounded-lg border border-white/10">
              <div className="flex-1 bg-neutral-200 rounded px-2.5 py-1 flex items-center justify-between">
                <span className="text-neutral-800 text-[11px] sm:text-xs font-serif italic truncate max-w-[140px]">
                  {recipientName || "Authorized Pass"}
                </span>
                <span className="text-[8px] text-neutral-500 font-mono uppercase">
                  Verified
                </span>
              </div>
              <div className="bg-neutral-900 border border-white/15 px-2 py-0.5 rounded text-right">
                <span className="text-[7px] text-white/40 font-mono block">CVC</span>
                <span className="text-xs text-white font-mono font-bold">549</span>
              </div>
            </div>

            {/* Redemption Footer */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white rounded flex items-center justify-center">
                  <HiOutlineQrcode className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
                </div>
                <div className="text-left">
                  <span className="text-[8px] text-white/40 font-mono uppercase block">
                    Redemption
                  </span>
                  <p className="text-[9px] sm:text-[10px] text-white/70 leading-tight">
                    Scan or enter token at play.thesmartgap.com/redeem
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-white/80 text-[10px] sm:text-[11px] font-mono">
                  <HiOutlineShieldCheck className="w-3.5 h-3.5 text-white/60" />
                  <span>Smartan House</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GiftCard3D;
