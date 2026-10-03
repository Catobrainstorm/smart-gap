// src/components/ui/FadeIn.jsx
import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  scale = 1,
  viewportMargin = "-40px",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale: scale === 1 ? 1 : 0.96 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
