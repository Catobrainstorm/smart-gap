// src/components/sections/MeetShuri.jsx
// Section 3.7 & Section 4: Meet Shuri
// Full-height section with interactive mouse-scrubbed background video,
// Shuri transparent character cutout (/img/shuri.png), and an auto-scrolling chat loop
// with typewriter reveals, typing indicators, and zero visible scrollbars.

import React, { useState, useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/* --- Sibling-like 3 Q&A Script Pairs --- */
// TODO: confirm (user will edit these Q&A pairs)
const CHAT_PAIRS = [
  {
    q: "I just finished school. What do I do now?",
    a: "That's completely normal. We start by unpacking how you actually think, finding what you're naturally great at, and building your first real portfolio.",
  },
  {
    q: "How do I earn XP?",
    a: "By showing up daily, completing practical challenges, and keeping your cognitive streak alive. XP proves real consistency, not just test scores.",
  },
  {
    q: "What will I have at the end?",
    a: "Five tangible portfolio projects, an official Smartan House certificate, and direct induction opportunities into the Optimus trybe.",
  },
];

export const MeetShuri = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Background video mouse scrub states
  const prevXRef = useRef(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const isInViewRef = useRef(false);

  // Chat typewriter loop states
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [phase, setPhase] = useState("learner-typing"); // 'learner-typing' | 'shuri-thinking' | 'shuri-typing' | 'paused' | 'fade-out'
  const [typedLearner, setTypedLearner] = useState("");
  const [typedShuri, setTypedShuri] = useState("");

  /* ================= 1. INTERSECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= 2. BACKGROUND VIDEO MOUSE SCRUB (DESKTOP) ================= */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || prefersReducedMotion()) return;

    // TODO: confirm video path (e.g. /videos/meetshuri.mp4)
    const SENSITIVITY = 0.8;

    const handleSeek = () => {
      if (isSeekingRef.current) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener("seeked", () => {
      isSeekingRef.current = false;
      handleSeek();
    });

    const handleMouseMove = (e) => {
      if (!isInViewRef.current || !video.duration) return;
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const duration = video.duration || 5;
      let newTime = targetTimeRef.current + (delta / window.innerWidth) * SENSITIVITY * duration;
      newTime = Math.max(0, Math.min(duration, newTime));
      targetTimeRef.current = newTime;

      handleSeek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  /* ================= 3. SCRIPTED CHAT TYPEWRITER LOOP ================= */
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Static display for reduced motion
      setConversationHistory(CHAT_PAIRS);
      return;
    }

    let isMounted = true;
    const currentPair = CHAT_PAIRS[activePairIndex];

    if (phase === "learner-typing") {
      let charIndex = 0;
      setTypedLearner("");
      setTypedShuri("");

      const typingInterval = setInterval(() => {
        if (!isMounted) return;
        charIndex++;
        setTypedLearner(currentPair.q.slice(0, charIndex));

        if (charIndex >= currentPair.q.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            if (isMounted) setPhase("shuri-thinking");
          }, 400);
        }
      }, 38);

      return () => clearInterval(typingInterval);
    }

    if (phase === "shuri-thinking") {
      const thinkingTimeout = setTimeout(() => {
        if (isMounted) setPhase("shuri-typing");
      }, 1000);

      return () => clearTimeout(thinkingTimeout);
    }

    if (phase === "shuri-typing") {
      let charIndex = 0;
      setTypedShuri("");

      const typingInterval = setInterval(() => {
        if (!isMounted) return;
        charIndex++;
        setTypedShuri(currentPair.a.slice(0, charIndex));

        if (charIndex >= currentPair.a.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            if (isMounted) {
              // Commit current completed pair into history
              setConversationHistory((prev) => [...prev, currentPair]);
              setPhase("paused");
            }
          }, 300);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }

    if (phase === "paused") {
      const pauseTimeout = setTimeout(() => {
        if (!isMounted) return;

        if (activePairIndex >= CHAT_PAIRS.length - 1) {
          // Finished last pair: fade out and loop back
          setPhase("fade-out");
        } else {
          setActivePairIndex((prev) => prev + 1);
          setPhase("learner-typing");
        }
      }, 2200);

      return () => clearTimeout(pauseTimeout);
    }

    if (phase === "fade-out") {
      const fadeTimeout = setTimeout(() => {
        if (!isMounted) return;
        setConversationHistory([]);
        setTypedLearner("");
        setTypedShuri("");
        setActivePairIndex(0);
        setPhase("learner-typing");
      }, 800);

      return () => clearTimeout(fadeTimeout);
    }

    return () => {
      isMounted = false;
    };
  }, [phase, activePairIndex]);

  // Auto-scroll chat window to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [typedLearner, typedShuri, conversationHistory, phase]);

  return (
    <section
      ref={sectionRef}
      id="shuri"
      className="relative w-full min-h-screen bg-[#070709] text-white flex items-center justify-center py-[clamp(120px,18vh,220px)] px-6 sm:px-12 select-none overflow-hidden"
    >
      {/* BACKGROUND VIDEO (MOUSE-SCRUBBED BEHIND SECTION ONLY) */}
      <video
        ref={videoRef}
        src="/videos/meetshuri.mp4"
        poster="/img/core4.jpg"
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover pointer-events-none opacity-25 z-0"
        style={{ objectPosition: "70% center" }}
      />

      {/* SOFT CINEMATIC VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/75 to-[#070709] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* MOBILE SECTION TITLE & SUBTITLE */}
        <div className="lg:hidden space-y-3 text-left">
          <h2 className="display-title text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.88]">
            Meet Shuri
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 font-light max-w-[42ch]">
            Your AI companion on the SmartGap journey.
          </p>
        </div>

        {/* SHURI CUTOUT IMAGE (FLOATING GENTLY) - First before chat on mobile, left column on desktop */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[420px] filter drop-shadow-[0_25px_60px_rgba(255,255,255,0.08)]">
            <img
              src="/img/shuri.png"
              alt="Shuri"
              className="w-full h-auto object-contain pointer-events-none animate-float"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: DESKTOP TITLE & SUBTITLE + CHAT PLACE */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Desktop Header */}
          <div className="space-y-3 hidden lg:block">
            <h2 className="display-title text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.88]">
              Meet Shuri
            </h2>
            {/* TODO: confirm (user will confirm subtitle copy) */}
            <p className="font-body text-lg sm:text-xl text-white/70 font-light max-w-[42ch]">
              Your AI companion on the SmartGap journey.
            </p>
          </div>

          {/* SCRIPTED CHAT CONTAINER (AUTO-SCROLLING, ZERO VISIBLE SCROLLBAR) */}
          <div
            ref={chatContainerRef}
            className={`w-full max-w-xl h-[380px] p-6 sm:p-8 rounded-[32px] bg-[#0E1018]/90 border border-white/12 shadow-2xl overflow-y-auto space-y-5 transition-opacity duration-500 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              phase === "fade-out" ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Past Completed Pairs */}
            {conversationHistory.map((pair, idx) => (
              <div key={idx} className="space-y-4">
                {/* Learner Bubble */}
                <div className="flex justify-end">
                  <div className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF9600] to-[#DA5127] text-white font-body font-semibold text-sm sm:text-base max-w-[85%] rounded-br-none shadow-md">
                    {pair.q}
                  </div>
                </div>

                {/* Shuri Bubble */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-black">
                    <img src="/img/shuri.png" alt="Shuri avatar" className="w-full h-full object-cover object-top scale-150" />
                  </div>
                  <div className="px-5 py-3.5 rounded-2xl bg-white/10 text-white font-body text-sm sm:text-base max-w-[85%] rounded-bl-none border border-white/10 backdrop-blur-md leading-relaxed">
                    {pair.a}
                  </div>
                </div>
              </div>
            ))}

            {/* Currently Active Animated Pair */}
            {phase !== "fade-out" && (
              <div className="space-y-4">
                {/* Active Learner Typing */}
                {typedLearner && (
                  <div className="flex justify-end">
                    <div className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF9600] to-[#DA5127] text-white font-body font-semibold text-sm sm:text-base max-w-[85%] rounded-br-none shadow-md">
                      <span>{typedLearner}</span>
                      {phase === "learner-typing" && (
                        <span className="inline-block w-1.5 h-4 bg-white ml-1 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                )}

                {/* Active Shuri Thinking Indicator */}
                {phase === "shuri-thinking" && (
                  <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-black">
                      <img src="/img/shuri.png" alt="Shuri avatar" className="w-full h-full object-cover object-top scale-150" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-1.5 w-16">
                      <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                {/* Active Shuri Typing */}
                {typedShuri && (
                  <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-black">
                      <img src="/img/shuri.png" alt="Shuri avatar" className="w-full h-full object-cover object-top scale-150" />
                    </div>
                    <div className="px-5 py-3.5 rounded-2xl bg-white/10 text-white font-body text-sm sm:text-base max-w-[85%] rounded-bl-none border border-white/10 backdrop-blur-md leading-relaxed">
                      <span>{typedShuri}</span>
                      {phase === "shuri-typing" && (
                        <span className="inline-block w-1.5 h-4 bg-white ml-1 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetShuri;
