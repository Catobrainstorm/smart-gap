// src/components/ui/ScrollProgress.jsx
// Volt-yellow scroll progress bar with dynamic XP tier indicator

import React, { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal <= 0) {
        setProgress(0);
        return;
      }
      const currentProgress = (window.scrollY / scrollTotal) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[999] pointer-events-none bg-black/40">
      <div
        className="h-full bg-gradient-to-r from-[#FF9600] to-[#DA5127] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,150,0,0.85)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
