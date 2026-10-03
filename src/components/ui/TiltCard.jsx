// src/components/ui/TiltCard.jsx
// Interactive 3D tilt card with dynamic cursor-following specular glare and depth layers

import React, { useRef, useState } from "react";
import { calculateCardTilt, prefersReducedMotion } from "../../lib/motion";

export const TiltCard = ({
  children,
  className = "",
  maxTilt = 7,
  glare = true,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const onMouseMove = (e) => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const { tiltX, tiltY, glareX, glareY } = calculateCardTilt(e, cardRef.current, maxTilt);
    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`,
      glareX,
      glareY,
      glareOpacity: 0.22,
    });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        transform: style.transform,
        transition: "transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic Specular Glare Overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: style.glareOpacity,
            background: `radial-gradient(circle 320px at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default TiltCard;
