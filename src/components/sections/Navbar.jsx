// src/components/sections/Navbar.jsx
// Fixed header that morphs into floating glass pill on scroll, with active section tracker,
// audio equalizer, gift shortcut, magnetic waitlist button, and full-screen mobile drawer.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineMenuAlt3, HiX, HiOutlineGift } from "react-icons/hi";
import gsap from "gsap";
import { SoundEqualizerButton } from "../ui/SoundController";
import MagneticButton from "../ui/MagneticButton";

const NAV_LINKS = [
  { name: "Philosophy", href: "#philosophy" },
  { name: "Experience", href: "#experience" },
  { name: "Shuri", href: "#shuri" },
  { name: "Pathways", href: "#pathways" },
  { name: "Verify", href: "/verify" },
];

export const Navbar = ({ onOpenGiftModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll visibility & floating glass transition
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 60) {
        setIsScrolled(false);
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // Scrolling down -> hide
        setIsVisible(false);
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> reveal floating pill
        setIsVisible(true);
        setIsScrolled(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation on visibility toggle
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -90,
      opacity: isVisible ? 1 : 0,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [isVisible]);

  // Active section observer
  useEffect(() => {
    const sectionIds = ["philosophy", "experience", "shuri", "pathways"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none flex justify-center ${isScrolled ? "pt-3 sm:pt-4 px-3 sm:px-6" : "pt-4 sm:pt-6 px-4 sm:px-10"
          }`}
      >
        <header
          className={`pointer-events-auto transition-all duration-500 w-full max-w-7xl flex items-center justify-between ${isScrolled
              ? "glass-pill px-4 sm:px-6 py-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 max-w-5xl"
              : "bg-transparent py-2"
            }`}
        >
          {/* LEFT: LOGO */}
          <div
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="flex items-center gap-2 cursor-pointer group"
            title="SmartGap Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FF9600]">
              <img
                src="/assets/logo.webp"
                alt="SmartGap Logo"
                className="w-full h-full object-contain"
              />
            </div>
            {!isScrolled && (
              <span className="font-mono font-bold text-xs uppercase tracking-[0.25em] text-white/80 hidden sm:inline-block">
                SMARTGAP
              </span>
            )}
          </div>

          {/* CENTER: DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-200 rounded-full group ${isActive ? "text-[#FF9600]" : "text-white/70 hover:text-white"
                    }`}
                >
                  <span>{link.name}</span>

                  {/* Sweep underline */}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-[#FF9600] to-[#DA5127] transition-all duration-300 origin-left ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75"
                      }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* RIGHT: AUDIO, GIFT ICON & WAITLIST BUTTON */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Equalizer Audio Toggle */}
            <SoundEqualizerButton />

            {/* Gift Modal Trigger */}
            <button
              type="button"
              onClick={onOpenGiftModal}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white hover:text-[#FF9600] transition-all flex items-center gap-1.5 cursor-pointer text-xs font-mono font-bold"
              title="Get a SmartGap gift card"
            >
              <HiOutlineGift className="w-4 h-4 text-[#DA5127]" />
              <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Gift Cards</span>
            </button>

            {/* Join Waitlist Magnetic CTA */}
            <div className="hidden sm:block">
              <MagneticButton
                size="sm"
                variant="volt"
                pull={12}
                onClick={() => navigate("/waitlist")}
                icon={<TiLocationArrow className="text-base text-white -rotate-45" />}
                iconPosition="right"
              >
                Join Waitlist
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white text-2xl rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </header>
      </div>

      {/* FULLSCREEN MOBILE MENU */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-[#0A0A0A] flex flex-col justify-between p-8 pt-24 animate-in fade-in zoom-in-95 duration-200"
          style={{ clipPath: "circle(150% at 90% 5%)" }}
        >
          <div className="flex flex-col space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#DA5127] font-bold">
              Navigation
            </span>
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="special-font text-4xl sm:text-5xl font-black uppercase tracking-tight text-white hover:text-[#FF9600] transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenGiftModal) onOpenGiftModal();
              }}
              className="flex items-center gap-2 special-font text-2xl font-bold uppercase text-white/80 hover:text-[#DA5127] pt-2"
            >
              <HiOutlineGift className="w-6 h-6 text-[#DA5127]" />
              <span>Get a SmartGap gift card</span>
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/waitlist");
              }}
              className="w-full py-4 bg-gradient-to-r from-[#FF9600] to-[#DA5127] text-white font-mono font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,150,0,0.4)]"
            >
              <span>Join Waitlist</span>
              <TiLocationArrow className="text-base" />
            </button>

            <p className="text-white/40 text-[10px] text-center uppercase tracking-widest font-mono">
              © {new Date().getFullYear()} SmartGap • Powered by Smartan House
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
