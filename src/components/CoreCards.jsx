import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoTilt from "./BentoTilt";
import { APPLE_EASE } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "4 Weeks to Transform",
    desc: "A structured journey to shape how you think and execute with clarity.",
    img: "/img/core1.jpg",
    grid: "md:col-span-3 h-[320px] sm:h-[360px] md:h-[400px]",
    badge: "01 • Immersion",
  },
  {
    id: 2,
    title: "4 Core Modules",
    desc: "Reconstruct your mental models, decision-making, and personal agency.",
    img: "/img/core2.jpg",
    grid: "md:col-span-3 h-[320px] sm:h-[360px] md:h-[400px]",
    badge: "02 • Curriculum",
  },
  {
    id: 3,
    title: "20 Direct Sessions",
    desc: "Direct advisory with Smartandad breaking down real-world high-stakes decisions.",
    img: "/img/core3.jpg",
    grid: "md:col-span-2 h-[300px] sm:h-[340px] md:h-[360px]",
    badge: "03 • Mentorship",
  },
  {
    id: 4,
    title: "Keep Streaks & Badges",
    desc: "Daily habit discipline unlocks verified cognitive achievement badges.",
    img: "/img/core5.jpg",
    grid: "md:col-span-2 h-[300px] sm:h-[340px] md:h-[360px]",
    badge: "04 • Habit Engine",
  },
  {
    id: 5,
    title: "Ascend the Ranks",
    desc: "Earn XP points through challenges and build a verified proof-of-work portfolio.",
    img: "/img/core4.jpg",
    grid: "md:col-span-2 h-[300px] sm:h-[340px] md:h-[360px]",
    badge: "05 • Metagame",
  },
];

const CoreCards = () => {
  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(".core-bento-card", { opacity: 0, y: 50, rotateX: -6, scale: 0.96 });
      gsap.to(".core-bento-card", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        ease: APPLE_EASE,
        stagger: 0.08,
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#dfdff0] text-black pt-24 pb-28 select-none">
      {/* SECTION HEADER */}
      <div className="mx-auto max-w-6xl px-6 text-center mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-orange-600 font-bold mb-3 inline-block">
          The Platform Experience
        </span>
        <h2 className="special-font text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-black tracking-tight leading-tight">
          What You See In SmartG<b>a</b>p
        </h2>
        <p className="font-general text-black/60 text-xs sm:text-sm max-w-lg mx-auto mt-3">
          Every dimension of the platform engineered to give you clarity, cognitive mastery, and real-world leverage.
        </p>
      </div>

      {/* 5-CARD BENTO GRID */}
      <div ref={cardsGridRef} className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 sm:gap-6">
          {cards.map((card) => (
            <BentoTilt
              key={card.id}
              className={`core-bento-card relative overflow-hidden rounded-3xl border border-black/10 bg-black shadow-2xl group ${card.grid}`}
            >
              {/* IMAGE BACKGROUND */}
              <img
                src={card.img}
                alt={card.title}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
              />

              {/* CINEMATIC GRADIENT OVERLAY */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* CARD BADGE */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase font-bold tracking-widest">
                  {card.badge}
                </span>
              </div>

              {/* CARD BOTTOM CONTENT */}
              <div className="pointer-events-none absolute bottom-0 left-0 z-20 p-6 sm:p-8">
                <h3 className="mb-2 text-xl font-black uppercase leading-tight text-white sm:text-2xl lg:text-3xl drop-shadow-md">
                  {card.title}
                </h3>
                <p className="max-w-md font-general text-xs sm:text-sm text-white/80 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCards;
