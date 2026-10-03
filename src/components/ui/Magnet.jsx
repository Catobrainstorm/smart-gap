// src/components/ui/Magnet.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Magnet = ({
  children,
  className = "",
  padding = 100,
  strength = 3.5,
  activeTransition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
  inactiveTransition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < Math.max(width, height) / 2 + padding) {
      setIsHovered(true);
      setPosition({
        x: distanceX / strength,
        y: distanceY / strength,
      });
    } else {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
          transition: isHovered ? activeTransition : inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
