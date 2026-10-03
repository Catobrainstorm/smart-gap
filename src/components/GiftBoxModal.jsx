// src/components/GiftBoxModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiOutlineUserGroup, HiOutlineChatAlt2, HiOutlineCheckCircle } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";

const GiftBoxModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    "Hello Smartan House, I would like to inquire about getting a SmartGap Mini Gift Box for a group of 50+ participants."
  );
  const whatsappUrl = `https://wa.me/2348166548777?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-[#0f0f0f] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                SmartGap Mini
              </span>
              <h3 className="special-font text-2xl font-black uppercase text-white tracking-tight">
                Gift Box (50+ Cohort)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-mono font-bold">
                <HiOutlineUserGroup className="w-4 h-4" />
                <span>• 50 People Minimum</span>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                If you want to get gift cards for a small group larger than 50, we can provide backend support for easy process.
              </p>
            </div>

            {/* What is included */}
            <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <span className="text-[11px] font-mono uppercase text-white/50 tracking-wider font-bold block">
                What’s Included with Gift Box
              </span>

              <ul className="space-y-2.5 text-xs text-white/70">
                <li className="flex items-start gap-2.5">
                  <HiOutlineCheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>Dedicated administrative backend support for streamlined cohort setup.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <HiOutlineCheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>Automated digital pass generation and bulk distribution to all participants.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <HiOutlineCheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>Full access to the 4-week 360° personal development curriculum and verified certification.</span>
                </li>
              </ul>
            </div>

            {/* Contact on WhatsApp Button */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2.5 text-center"
              >
                <BsWhatsapp className="w-4 h-4" />
                <span>Get a SmartGap gift box (Connect on WhatsApp)</span>
              </a>

              <p className="text-center text-[11px] text-white/40 font-mono">
                Our team will assist you immediately with custom group onboarding modalities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GiftBoxModal;
