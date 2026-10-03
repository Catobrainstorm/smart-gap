// src/components/ui/MagneticButton.jsx
// Magnetic interactive button wrapper with elastic pull and tactile spring response

import React, { useRef, useEffect } from "react";
import { makeMagnetic } from "../../lib/motion";

export const MagneticButton = ({
  children,
  className = "",
  pull = 18,
  onClick,
  type = "button",
  disabled = false,
  variant = "volt", // 'volt' | 'white' | 'ghost' | 'glass'
  size = "md", // 'sm' | 'md' | 'lg'
  icon = null,
  iconPosition = "right",
  ...props
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const cleanup = makeMagnetic(buttonRef, { pull, pressScale: 0.94 });
    return cleanup;
  }, [pull]);

  const variants = {
    volt: "bg-gradient-to-r from-[#FF9600] to-[#DA5127] hover:from-[#ff9f1a] hover:to-[#e05b30] text-white font-extrabold shadow-[0_4px_25px_rgba(255,150,0,0.4)] hover:shadow-[0_6px_35px_rgba(218,81,39,0.55)] border border-[#FF9600]",
    white: "bg-white hover:bg-neutral-100 text-black font-extrabold shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.35)] border border-white",
    ghost: "bg-transparent hover:bg-white/10 text-white font-bold border border-white/25 hover:border-white/50 backdrop-blur-sm",
    glass: "glass-surface hover:bg-white/15 text-white font-bold border border-white/20 shadow-lg",
    flame: "bg-gradient-to-r from-[#FB923C] to-[#EA580C] hover:from-[#f97316] hover:to-[#c2410c] text-white font-extrabold shadow-[0_4px_25px_rgba(251,146,60,0.4)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-full gap-1.5",
    md: "px-6 py-3.5 text-xs sm:text-sm rounded-full gap-2",
    lg: "px-8 py-4 text-sm sm:text-base rounded-full gap-2.5",
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-mono uppercase tracking-wider transition-colors duration-200 select-none cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant] || variants.volt} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default MagneticButton;
