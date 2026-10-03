// src/components/ui/AnimatedText.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedWord = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="inline-block relative mr-[0.28em] my-[0.08em]">
      <span className="opacity-15">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 text-white">
        {children}
      </motion.span>
    </span>
  );
};

const AnimatedText = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <AnimatedWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </AnimatedWord>
        );
      })}
    </p>
  );
};

export default AnimatedText;
