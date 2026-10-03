// src/components/ui/SoundController.jsx
// Controls ambient soundtrack loop (/audio/loop.mp3) with smooth 600ms fade,
// 4-bar equalizer for navbar, audio hint prompt, and Web Audio UI sound effects.

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const SoundContext = createContext({
  isSoundOn: false,
  toggleSound: () => {},
  playUiSound: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("/audio/loop.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // Show sound prompt hint after 2.5s and hide after 4s
    const hintTimer = setTimeout(() => setShowHint(true), 2500);
    const hideTimer = setTimeout(() => setShowHint(false), 7000);

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(hideTimer);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Web Audio UI synthesis for micro-interactions
  const playUiSound = (type = "click") => {
    if (!isSoundOn) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "pop" || type === "xp") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "blip") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        // default subtle click
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (_) {}
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (!isSoundOn) {
      // Fade in to 0.35 over 600ms
      audio.volume = 0;
      audio.play().catch(() => {});
      setIsSoundOn(true);
      setShowHint(false);

      const targetVolume = 0.35;
      const steps = 15;
      const stepDuration = 600 / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        if (!audioRef.current) return;
        audioRef.current.volume = Math.min(targetVolume, (currentStep / steps) * targetVolume);
        if (currentStep >= steps) {
          clearInterval(fadeIntervalRef.current);
        }
      }, stepDuration);
    } else {
      // Fade out to 0 over 600ms
      const initialVolume = audio.volume;
      const steps = 15;
      const stepDuration = 600 / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        if (!audioRef.current) return;
        audioRef.current.volume = Math.max(0, initialVolume * (1 - currentStep / steps));
        if (currentStep >= steps) {
          clearInterval(fadeIntervalRef.current);
          audioRef.current.pause();
          setIsSoundOn(false);
        }
      }, stepDuration);
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playUiSound }}>
      {children}

      {/* Floating Sound Hint Prompt */}
      {showHint && !isSoundOn && (
        <div
          onClick={toggleSound}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-mono shadow-2xl cursor-pointer hover:border-[#FF9600] transition-all animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF9600] animate-ping" />
          <span>Sound on for the full experience</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHint(false);
            }}
            className="text-white/50 hover:text-white ml-1 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </SoundContext.Provider>
  );
};

export const SoundEqualizerButton = () => {
  const { isSoundOn, toggleSound } = useSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="flex items-center space-x-1 p-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
      title={isSoundOn ? "Mute audio" : "Unmute audio"}
      aria-label={isSoundOn ? "Mute soundtrack" : "Play soundtrack"}
    >
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`indicator-line ${isSoundOn ? "active" : ""}`}
          style={{ animationDelay: `${bar * 0.12}s` }}
        />
      ))}
    </button>
  );
};

export default SoundProvider;
