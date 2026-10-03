import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import Button from "./Button";

const navItems = [
  { name: "Philosophy", href: "#philosophy" },
  { name: "Experience", href: "#experience" },
  { name: "Shuri", href: "#shuri" },
  { name: "Pathways", href: "#pathways" },
];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN -> Hide navbar
        setIsNavVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> Reveal floating navbar
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // GSAP Smooth Reveal / Hide Animation
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  // Audio Toggle
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) {
      audioElementRef.current.play().catch(() => {});
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Handle smooth scroll to hash or navigation
  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-3 sm:inset-x-6 top-3 sm:top-5 z-50 h-14 sm:h-16 transition-all duration-500 rounded-full"
      >
        <header className="relative w-full h-full">
          <nav className="flex h-full w-full items-center justify-between p-1.5 sm:p-2">
            {/* LEFT: CREAM / BEIGE LOGO PILL (NO TEXT, MERGED TO LEFT) */}
            <div
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
              className="flex items-center justify-center bg-[#f5efe6] hover:bg-[#eae1d0] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-[#e2d6c5]/80 transition-all duration-300 group active:scale-95 cursor-pointer shrink-0"
              title="SmartGap Home"
            >
              <img
                src="/assets/logo.webp"
                alt="SmartGap Logo"
                className="h-4.5 sm:h-5 md:h-5.5 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* CENTER: DESKTOP NAV ITEMS */}
            <div className="hidden md:flex h-full items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-hover-btn"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* RIGHT: AUDIO EQUALIZER & CTA BUTTON */}
            <div className="flex h-full items-center gap-2 sm:gap-3">
              {/* AUDIO EQUALIZER */}
              <button
                className="flex items-center space-x-1 p-2 sm:p-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                onClick={toggleAudioIndicator}
                title="Toggle Soundtrack"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                    style={{ animationDelay: `${bar * 0.12}s` }}
                  />
                ))}
              </button>

              {/* JOIN WAITLIST BUTTON (MATCHING CREAM / BEIGE THEME) */}
              <Button
                id="navbar-waitlist-btn"
                title="Join Waitlist"
                rightIcon={<TiLocationArrow className="text-orange-500 text-sm ml-0.5" />}
                containerClass="hidden sm:inline-flex bg-[#f5efe6] hover:bg-[#eae1d0] text-black shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-[#e2d6c5]/80"
                onClick={() => navigate("/waitlist")}
              />

              {/* MOBILE HAMBURGER BUTTON */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 text-white text-2xl rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* MOBILE MENU MODAL / DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-orange-400 font-bold">
              Navigation
            </span>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white text-2xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/waitlist");
              }}
              className="w-full py-4 bg-[#f5efe6] hover:bg-[#eae1d0] text-black font-extrabold rounded-2xl uppercase tracking-widest text-xs inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <span>Join Waitlist</span>
              <TiLocationArrow className="text-orange-500 text-base" />
            </button>
            <p className="text-white/40 text-[11px] text-center uppercase tracking-widest font-mono">
              © 2026 SmartGap • Powered by Smartan House
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
