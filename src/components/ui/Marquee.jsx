// src/components/ui/Marquee.jsx
// Smooth infinite horizontal marquee ticker

import React from "react";

export const Marquee = ({
  items = [],
  speed = 30, // seconds for one full loop
  reverse = false,
  className = "",
  separator = "•",
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}>
      <div
        className={`flex shrink-0 items-center gap-6 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-6">
            <span>{item}</span>
            <span className="text-orange-500/80">{separator}</span>
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center gap-6 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {items.map((item, idx) => (
          <span key={`clone-${idx}`} className="flex items-center gap-6">
            <span>{item}</span>
            <span className="text-orange-500/80">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
