// src/lib/motion.js
// Central motion system for SmartGap
// Defines standard easings, durations, staggers, and tactile micro-interaction helpers.

import gsap from "gsap";

/* --- Standard Easing Curves --- */
export const EASINGS = {
  entrance: "power4.out",
  transition: "power3.inOut",
  reveal: "expo.out",
  pop: "elastic.out(1, 0.6)",
  section: "power2.inOut", // smooth section boundary curve
  apple: "power3.out",
  float: "sine.inOut",
};

/* --- Standard Durations --- */
export const DURATIONS = {
  micro: 0.25,
  standard: 0.8,
  cinematic: 1.4,
  float: 4.5,
};

/* --- Standard Stagger Intervals --- */
export const STAGGERS = {
  words: 0.05,
  cards: 0.12,
  badges: 0.08,
};

/* --- Scrub Smoothing Constants --- */
export const SCRUBS = {
  tight: 0.5,
  smooth: 0.9,
  relaxed: 1.2,
};

// Legacy exports for backwards compatibility with existing components
export const APPLE_EASE = EASINGS.entrance;
export const APPLE_DURATION = DURATIONS.standard;
export const TACTILE_EASE = EASINGS.pop;
export const TACTILE_DURATION = DURATIONS.micro;
export const FLOAT_EASE = EASINGS.float;
export const FLOAT_DURATION = DURATIONS.float;

/**
 * Checks if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Magnetic button helper: attracts element towards cursor on hover and snaps back elastically
 * @param {HTMLElement|React.RefObject} target
 * @param {Object} options
 * @param {number} [options.pull=16] Max pixel displacement towards cursor
 * @param {number} [options.pressScale=0.95] Scale when pressed
 * @returns {() => void} Cleanup function
 */
export function makeMagnetic(target, { pull = 16, pressScale = 0.95 } = {}) {
  const el = target?.current || target;
  if (!el || typeof window === "undefined") return () => {};

  // Disabled on touch devices
  if (window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion()) {
    return () => {};
  }

  const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: EASINGS.entrance });
  const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: EASINGS.entrance });
  const scaleTo = gsap.quickTo(el, "scale", { duration: 0.25, ease: EASINGS.pop });

  const onPointerMove = (e) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    xTo(deltaX * pull);
    yTo(deltaY * pull);
  };

  const onPointerLeave = () => {
    xTo(0);
    yTo(0);
    scaleTo(1);
  };

  const onPointerDown = () => scaleTo(pressScale);
  const onPointerUp = () => scaleTo(1);

  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("pointerleave", onPointerLeave);
  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointerup", onPointerUp);

  return () => {
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerleave", onPointerLeave);
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointerup", onPointerUp);
    gsap.set(el, { x: 0, y: 0, scale: 1 });
  };
}

/**
 * 3D Tilt calculation with glare effect
 * @param {MouseEvent} e
 * @param {HTMLElement} cardEl
 * @param {number} maxTilt
 * @returns {{ tiltX: number, tiltY: number, glareX: number, glareY: number }}
 */
export function calculateCardTilt(e, cardEl, maxTilt = 8) {
  if (!cardEl) return { tiltX: 0, tiltY: 0, glareX: 50, glareY: 50 };
  const rect = cardEl.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width;
  const relY = (e.clientY - rect.top) / rect.height;

  const tiltX = (relY - 0.5) * -maxTilt;
  const tiltY = (relX - 0.5) * maxTilt;
  const glareX = relX * 100;
  const glareY = relY * 100;

  return { tiltX, tiltY, glareX, glareY };
}
