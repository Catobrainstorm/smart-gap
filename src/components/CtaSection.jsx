// src/components/CtaSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BentoTilt from "./BentoTilt";
import GiftCardModal from "./GiftCardModal";
import GiftBoxModal from "./GiftBoxModal";
import {
  HiOutlineArrowRight,
  HiOutlineGift,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineSparkles,
} from "react-icons/hi";

const CtaSection = () => {
  const navigate = useNavigate();

  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);

  return (
    <section id="pathways" className="w-full bg-black px-4 sm:px-8 lg:px-12 pt-16 pb-24 select-none">
      {/* Background Container matching site layout */}
      <div className="w-full bg-[#121a28] rounded-[36px] sm:rounded-[54px] pt-16 sm:pt-24 pb-20 px-6 sm:px-12 lg:px-16 border border-white/10 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* ================= STORY HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 font-mono text-[10px] sm:text-xs uppercase font-bold tracking-widest mb-4">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-white" />
              <span>Admissions & Sponsorship Ecosystem</span>
            </div>

            <h2 className="special-font text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight">
              Choose your SmartGap pathways
            </h2>

            <p className="text-white/70 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed font-general">
              Two distinct avenues to enter: the 3-year Optimus Trybe transformational journey or the 4-week SmartGap with Gift Card intensive.
            </p>
          </motion.div>

          {/* ================= TWO PATHWAY BENTO CARDS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* ---------------- PATHWAY 1: SMARTGAP INTO OPTIMUS TRYBE ---------------- */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              <BentoTilt className="h-full">
                <div className="h-full bg-[#0d1420] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-white/25 transition-all shadow-2xl group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/50 font-mono text-xs uppercase tracking-widest font-bold">
                        Pathway 01
                      </span>
                      <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                        3-Year Continuum
                      </span>
                    </div>

                    <h3 className="special-font text-2xl sm:text-3xl lg:text-4xl text-white font-black uppercase tracking-tight mt-1 mb-4">
                      SmartGap into Optimus Trybe
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed mb-6 font-general">
                      This pathway onboards you into the SmartGap Programme to complete your <strong>360 degrees personal development portfolio</strong> and earn an induction to the <strong>Optimus Trybe</strong>. The Optimus Trybe is a growth continuum where you’re assigned into industry circles and your personal transformational journey is supported over a period of <strong>three years</strong>. To get on this Programme you have to join the waitlist.
                    </p>

                    {/* How it is funded box */}
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10 mb-8 space-y-2">
                      <span className="text-white font-mono text-xs uppercase font-bold tracking-wider block">
                        How it is funded
                      </span>
                      <p className="text-white/60 text-xs leading-relaxed font-general">
                        Smartan House works to secure a sponsorship grant of <strong>₦250k</strong> that supports one participant to go through the three-year Optimus Trybe Programme.
                      </p>
                      <p className="text-white/50 text-[11px] leading-relaxed italic pt-2 border-t border-white/5">
                        If you’re happy to sponsor any of our candidates on the waitlist kindly click on the sponsorship button below and we shall be glad to walk you through the modalities for helping a young person begin their personal transformation journey.
                      </p>
                    </div>
                  </div>

                  {/* Two choices for Pathway 1 */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => navigate("/waitlist")}
                      className="px-6 py-3.5 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all text-center flex-1 flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Join Waitlist</span>
                      <HiOutlineArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href="https://impact.smartanhouse.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-white/10 border border-white/15 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center flex-1 flex items-center justify-center gap-2"
                    >
                      <HiOutlineHeart className="w-3.5 h-3.5" />
                      <span>Sponsor the Waitlist</span>
                    </a>
                  </div>
                </div>
              </BentoTilt>
            </motion.div>

            {/* ---------------- PATHWAY 2: SmartGap with Gift Card ---------------- */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              <BentoTilt className="h-full">
                <div className="h-full bg-[#0d1420] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-white/25 transition-all shadow-2xl group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/50 font-mono text-xs uppercase tracking-widest font-bold">
                        Pathway 02
                      </span>
                      <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                        4-Week Sprint
                      </span>
                    </div>

                    <h3 className="special-font text-2xl sm:text-3xl lg:text-4xl text-white font-black uppercase tracking-tight mt-1 mb-4">
                      SmartGap with Gift Card
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed mb-6 font-general">
                      This allows you to take only the <strong>4 weeks 360 degree personal development Programme</strong>, complete with all the projects and certification. This Programme doesn’t include induction into the Optimus Trybe.
                    </p>

                    {/* Two choices preview cards */}
                    <div className="space-y-3.5 mb-8">
                      {/* Option 1: Gift Cards */}
                      <div
                        onClick={() => setIsGiftCardOpen(true)}
                        className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/30 transition-all cursor-pointer group/card"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <HiOutlineGift className="w-4 h-4 text-white" />
                            <span className="text-white font-bold text-xs uppercase tracking-wider font-mono">
                              SmartGap Gift Cards
                            </span>
                          </div>
                          <span className="text-[11px] text-white/50 font-mono group-hover/card:text-white transition-colors">
                            Get Card →
                          </span>
                        </div>
                        <p className="text-white/60 text-xs leading-relaxed font-general">
                          Gift yourself, individual, family and friends an experience into the 4-week SmartGap Programme.
                        </p>
                      </div>

                      {/* Option 2: Gift Box */}
                      <div
                        onClick={() => setIsGiftBoxOpen(true)}
                        className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/30 transition-all cursor-pointer group/box"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <HiOutlineUserGroup className="w-4 h-4 text-white" />
                            <span className="text-white font-bold text-xs uppercase tracking-wider font-mono">
                              Gift Box (• 50 People)
                            </span>
                          </div>
                          <span className="text-[11px] text-white/50 font-mono group-hover/box:text-white transition-colors">
                            Details →
                          </span>
                        </div>
                        <p className="text-white/60 text-xs leading-relaxed font-general">
                          • 50 people: If you want to get gift cards for a small group larger than 50, we provide backend support.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Pathway 2 */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsGiftCardOpen(true)}
                      className="px-6 py-3.5 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all text-center flex-1 flex items-center justify-center gap-2 shadow-md"
                    >
                      <HiOutlineGift className="w-3.5 h-3.5" />
                      <span>Get a Gift Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsGiftBoxOpen(true)}
                      className="px-6 py-3.5 bg-white/10 border border-white/15 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center flex-1 flex items-center justify-center gap-2"
                    >
                      <HiOutlineUserGroup className="w-3.5 h-3.5" />
                      <span>Get a SmartGap gift box</span>
                    </button>
                  </div>
                </div>
              </BentoTilt>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <GiftCardModal
        isOpen={isGiftCardOpen}
        onClose={() => setIsGiftCardOpen(false)}
      />

      <GiftBoxModal
        isOpen={isGiftBoxOpen}
        onClose={() => setIsGiftBoxOpen(false)}
      />
    </section>
  );
};

export default CtaSection;
