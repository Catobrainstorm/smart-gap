import { TiLocationArrow } from "react-icons/ti";
import { useState, useRef } from "react";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 6;
    const tiltY = (relativeX - 0.5) * -6;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full overflow-hidden rounded-3xl bg-[#0d0d0d]">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center opacity-85"
      />
      {/* Crisp Dark Gradient for Legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      
      <div className="relative z-10 flex size-full flex-col justify-between p-6 sm:p-8 text-white">
        <div>
          <h1 className="bento-title special-font text-white drop-shadow-md">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-sm font-general text-xs sm:text-sm text-white/75 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="experience" className="bg-[#050505] text-white pb-28 pt-16 border-t border-white/5 scroll-mt-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
        {/* INTRO HEADER */}
        <div className="px-2 sm:px-5 py-16 sm:py-24 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-orange-400 font-bold mb-3 inline-block">
            What We Build
          </span>
          <h2 className="special-font text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            Unleashing the life of young mi<b>n</b>d.
          </h2>
          <div className="space-y-4 text-white/70 text-xs sm:text-sm md:text-base mt-5 leading-relaxed font-general">
            <p>
              When a young person leaves high school, it’s okay if they have
              absolutely no idea what to do next. SmartGap fixes that.
            </p>
            <p>
              SmartGap is built around the idea that you’re designed to solve a
              unique problem in the world, and so we will work with you to shift
              your mental model of the world, challenge your thinking, and design
              a dynamic framework that you can use to build an intelligent life
              on purpose.
            </p>
            <p className="border-l-2 border-orange-500 pl-4 text-white font-medium text-sm sm:text-base pt-1">
              This is a personalized gamified platform that gives you power,
              control, and clarity.{" "}
              <strong className="text-orange-400 font-bold">
                Your higher education must start here.
              </strong>
            </p>
          </div>
        </div>

        {/* HERO BENTO BANNER (MAIN FEATURE) */}
        <BentoTilt className="border-hsla relative mb-6 h-80 sm:h-96 w-full overflow-hidden rounded-3xl md:h-[50vh]">
          <BentoCard
            src="/videos/core1.mp4"
            title={<>str<b>e</b>et to su<b>i</b>te</>}
            description="A 4-week structured immersion turning secondary school leavers and young minds into high-agency builders, critical thinkers, and future leaders."
          />
        </BentoTilt>

        {/* 5-GRID BENTO LAYOUT (PROPORTIONAL SIZING) */}
        <div className="grid min-h-[90vh] grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-5 sm:gap-6">
          {/* CARD 1: DUAL-ROW CARD */}
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 min-h-[300px] md:min-h-0">
            <BentoCard
              src="/videos/core2.mp4"
              title={<>m<b>o</b>dules</>}
              description="4 core curriculum pillars deconstructing mental models, strategic execution, AI leverage, and wealth creation."
            />
          </BentoTilt>

          {/* CARD 2: ADVISORY */}
          <BentoTilt className="bento-tilt_1 row-span-1 min-h-[240px]">
            <BentoCard
              src="/videos/core3.mp4"
              title={<>advis<b>o</b>ry</>}
              description="20 direct advisory sessions with Smartandad breaking down complex decisions and high-stakes choices."
            />
          </BentoTilt>

          {/* CARD 3: STREAKS */}
          <BentoTilt className="bento-tilt_1 row-span-1 min-h-[240px]">
            <BentoCard
              src="/videos/core5.mp4"
              title={<>str<b>e</b>aks</>}
              description="Daily cognitive habits that unlock verified badges, inducting you into the prestigious Optimus Trybe."
            />
          </BentoTilt>

          {/* CARD 4: ACCENT TILE */}
          <BentoTilt className="bento-tilt_2 min-h-[220px]">
            <div className="flex size-full flex-col justify-between bg-[#f5efe6] p-6 sm:p-7 rounded-3xl group cursor-pointer">
              <h1 className="bento-title max-w-64 text-black leading-[0.85]">
                M<b>o</b>re Co<b>m</b>ing Soo<b>n</b>!
              </h1>
              <TiLocationArrow className="m-2 sm:m-3 scale-[3] sm:scale-[4] self-end text-black transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </BentoTilt>

          {/* CARD 5: PURE VIDEO TILE */}
          <BentoTilt className="bento-tilt_2 min-h-[220px]">
            <video
              src="/videos/core4.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="size-full object-cover object-center rounded-3xl"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;

