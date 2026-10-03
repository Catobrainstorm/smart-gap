// src/App.jsx
// Main application layout uniting the Awwwards-grade SmartGap landing page,
// Lenis smooth scroll, sound engine, custom cursor, scroll progress, and unified modal system.

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import confetti from "canvas-confetti";

// Smooth Scroll & Audio Systems
import useLenis from "./hooks/useLenis";
import { SoundProvider, useSound } from "./components/ui/SoundController";
import ScrollProgress from "./components/ui/ScrollProgress";

// Section Components (Brief v2 Section 3 Order)
import Preloader from "./components/sections/Preloader";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import PhilosophyZoom from "./components/sections/PhilosophyZoom";
import WhatWeBuild from "./components/sections/WhatWeBuild";
import CoreCards from "./components/sections/CoreCards";
import SeeAndFeel from "./components/sections/SeeAndFeel";
import MeetShuri from "./components/sections/MeetShuri";
import LearningOutcomes from "./components/sections/LearningOutcomes";
import Pathways from "./components/sections/Pathways";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

// Modals & Subpages
import GiftCardModal from "./modals/GiftCardModal";
import GiftBoxModal from "./modals/GiftBoxModal";
import Waitlist from "./components/Waitlist";
import VerifyCertificatePage from "./components/VerifyCertificatePage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsPage from "./components/TermsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const LandingPage = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  const { playUiSound } = useSound();

  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);

  // Easter Egg: Konami Code triggers XP celebration shower
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let keyIndex = 0;

    const onKeyDown = (e) => {
      if (e.key === konamiSequence[keyIndex]) {
        keyIndex++;
        if (keyIndex === konamiSequence.length) {
          keyIndex = 0;
          playUiSound("pop");
          try {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 },
              colors: ["#FF9600", "#DA5127", "#7C5CFF", "#FFFFFF"],
            });
          } catch (_) {}
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [playUiSound]);

  return (
    <div className="relative w-full bg-[#0A0A0A] text-white overflow-x-hidden min-h-screen">
      {/* Filmic Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Solar Orange Scroll Progress Bar */}
      <ScrollProgress />

      {/* XP-Bar Preloader */}
      <Preloader onComplete={() => setIsPreloaded(true)} />

      {/* 3.1 Fixed / Floating Navbar */}
      <Navbar onOpenGiftModal={() => setIsGiftCardOpen(true)} />

      {/* 3.2 Hero */}
      <Hero
        onOpenVideoModal={() => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3.3 Philosophy */}
      <PhilosophyZoom />

      {/* 3.4 Unleashing the life of the mind */}
      <WhatWeBuild />

      {/* 3.5 Learning Outcomes */}
      <LearningOutcomes />

      {/* 3.6 What You Get (Core Cards) */}
      <CoreCards />

      {/* 3.7 The Experience */}
      <SeeAndFeel />

      {/* 3.8 Meet Shuri */}
      <MeetShuri />

      {/* 3.9 Pathways */}
      <Pathways
        onOpenGiftCard={() => setIsGiftCardOpen(true)}
        onOpenGiftBox={() => setIsGiftBoxOpen(true)}
      />

      {/* 3.10 Final CTA */}
      <FinalCTA onOpenGiftModal={() => setIsGiftCardOpen(true)} />

      {/* 3.10 Footer */}
      <Footer />

      {/* Redesigned Modals */}
      <GiftCardModal
        isOpen={isGiftCardOpen}
        onClose={() => setIsGiftCardOpen(false)}
        onSwitchToGiftBox={() => {
          setIsGiftCardOpen(false);
          setIsGiftBoxOpen(true);
        }}
      />

      <GiftBoxModal
        isOpen={isGiftBoxOpen}
        onClose={() => setIsGiftBoxOpen(false)}
        onBackToGiftCard={() => {
          setIsGiftBoxOpen(false);
          setIsGiftCardOpen(true);
        }}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SoundProvider>
        <main className="min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/verify" element={<VerifyCertificatePage />} />
            <Route path="/verify/:serial" element={<VerifyCertificatePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </SoundProvider>
    </BrowserRouter>
  );
}

export default App;
