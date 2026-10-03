// src/hooks/useLenis.js
// Connects @studio-freight/lenis smooth scrolling with GSAP ScrollTrigger and RAF ticker

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // If reduced motion is requested, keep default native scrolling
    if (prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
      smoothWheel: true,
      smoothTouch: false, // keep native feel on touch devices
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export default useLenis;
