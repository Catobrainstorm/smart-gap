import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    // Hide loader when videos load or fallback after 1.5s
    if (loadedVideos >= totalVideos - 1) {
      setIsLoading(false);
    }
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current?.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-[#dfdff0] select-none">
      {/* 3-BODY INTERACTIVE LOADER */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-black transition-opacity duration-500">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* CLIPPED VIDEO FRAME THAT FOLDS ON SCROLL */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        <div>
          {/* CENTER EXPANDING MINI VIDEO TILE */}
          <div className="mask-clip-path absolute-center absolute z-50 size-44 sm:size-56 md:size-64 cursor-pointer overflow-hidden rounded-2xl">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 rounded-2xl overflow-hidden border border-white/40 shadow-2xl"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-44 sm:size-56 md:size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* NEXT TRANSITION EXPANDING VIDEO */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-44 sm:size-56 md:size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* BACKGROUND ACTIVE VIDEO */}
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* CINEMATIC VIGNETTE SCRIM */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/70 pointer-events-none z-25" />
        </div>

        {/* BOTTOM-RIGHT PINNED FLOURISH (INSIDE VIDEO FRAME) */}
        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 text-right pointer-events-none">
          <p className="font-calligraphy text-3xl sm:text-4xl md:text-5xl text-white italic font-normal tracking-wide leading-none mb-1 drop-shadow-md">
            Redesign your
          </p>
          <h1 className="special-font hero-heading text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-[0.82]">
            D<b>E</b>SIG<b>N</b>
          </h1>
          <p className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-white italic font-normal tracking-wide mt-1 leading-none drop-shadow-md">
            future.
          </p>
        </div>

        {/* TOP-LEFT PINNED INTRO & CTA */}
        <div className="absolute left-0 top-0 z-40 size-full pointer-events-none">
          <div className="mt-26 sm:mt-32 px-6 sm:px-12 max-w-lg pointer-events-auto">
            <p className="font-calligraphy text-3xl sm:text-4xl md:text-5xl text-white font-normal italic mb-1 tracking-wide leading-none drop-shadow-sm">
              Welcome to
            </p>
            <h1 className="special-font hero-heading text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              SM<b>A</b>RTG<b>A</b>P
            </h1>
            <p className="mt-2 sm:mt-3 mb-4 font-general text-[11px] sm:text-xs text-white/70 leading-relaxed max-w-[260px] drop-shadow-md">
              A structured continuum designed to shape how you think, build, and
              lead.
            </p>

            <Button
              id="hero-join-waitlist"
              title="Join Waitlist"
              leftIcon={<TiLocationArrow className="text-xs" />}
              containerClass="!bg-gradient-to-r !from-[#FF9600] !to-[#DA5127] hover:!brightness-110 text-white !px-4 !py-2 text-[10px] shadow-lg"
              onClick={() => navigate("/waitlist")}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM-RIGHT SOLID UNDERLAY HEADLINE (REVEALED ON SCROLL) */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-0 text-right pointer-events-none">
        <p className="font-calligraphy text-3xl sm:text-4xl md:text-5xl text-black/60 italic font-normal tracking-wide leading-none mb-1">
          Redesign your
        </p>
        <h1 className="special-font hero-heading text-black leading-[0.82]">
          D<b>E</b>SIG<b>N</b>
        </h1>
        <p className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-black italic font-normal tracking-wide mt-1 leading-none">
          future.
        </p>
      </div>
    </div>
  );
};

export default Hero;
