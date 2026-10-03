// src/modals/GiftBoxModal.jsx
// Redesigned SmartGap Gift Box Modal for 50+ cohorts with direct Paystack checkout,
// interactive group size slider & stepper, optional WhatsApp inquiry, and enterprise benefits.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  HiX,
  HiOutlineCheckCircle,
  HiOutlineSupport,
  HiOutlineTicket,
  HiOutlineAcademicCap,
  HiOutlineArrowLeft,
  HiOutlineShieldCheck,
  HiPlus,
  HiMinus,
} from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { initializePaystackPayment } from "../lib/paystack";

const UNIT_PRICE = 50000;

export const GiftBoxModal = ({ isOpen, onClose, onBackToGiftCard }) => {
  const [groupSize, setGroupSize] = useState(50);
  const [purchaserName, setPurchaserName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [paymentResult, setPaymentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validGroupSize = Math.max(50, parseInt(groupSize, 10) || 50);
  const estimatedTotal = validGroupSize * UNIT_PRICE;

  const whatsappMessage = encodeURIComponent(
    `Hello Smartan House, I would like to inquire about getting a SmartGap Gift Box for a cohort of ${validGroupSize} participants (Est. ₦${estimatedTotal.toLocaleString()}).`
  );
  const whatsappUrl = `https://wa.me/2348166548777?text=${whatsappMessage}`;

  const handlePaystackCheckout = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter an email address for your order confirmation.");
      return;
    }
    if (!purchaserName) {
      setErrorMessage("Please enter your name or organization lead.");
      return;
    }

    setErrorMessage("");
    setPaymentStatus("loading");

    const orderRef = `box_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    initializePaystackPayment({
      email,
      amount: estimatedTotal,
      type: "giftbox",
      metadata: {
        orderRef,
        senderName: purchaserName,
        organization: organizationName || "Organization / School",
        quantity: validGroupSize,
        groupSize: validGroupSize,
        unitPrice: UNIT_PRICE,
        ProgramScope: "SmartGap Gift Box (50+ Bulk Cohort Passes)",
      },
      onSuccess: (res) => {
        setPaymentStatus("success");
        setPaymentResult({
          orderRef: res.reference || orderRef,
          groupSize: validGroupSize,
          totalAmount: estimatedTotal,
          email,
          purchaserName,
          organizationName,
        });

        try {
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#FF9600", "#DA5127", "#7C5CFF", "#10B981", "#FFFFFF"],
          });
        } catch (_) { }
      },
      onClose: () => {
        if (paymentStatus !== "success") {
          setPaymentStatus("idle");
        }
      },
      onError: (err) => {
        setPaymentStatus("error");
        setErrorMessage(err.message || "Payment could not be completed. Please try again.");
      },
    });
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-box-modal-title"
        data-lenis-prevent
        className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-xl p-3 sm:p-6"
      >
        <div className="min-h-full flex items-center justify-center py-4 sm:py-8">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0D0F17] border border-white/15 rounded-[32px] sm:rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto text-white max-h-[90vh] flex flex-col font-body"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 shrink-0 bg-[#090A10]">
              <div>
                <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#FB923C] animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#FB923C] font-bold">
                    BULK ENROLLMENT PASS
                  </span>
                </div>
                <h3
                  id="gift-box-modal-title"
                  className="display-title text-xl sm:text-3xl font-black uppercase text-white tracking-tight"
                >
                  GIFT BOX (50+ PASSES)
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/12 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div
              data-lenis-prevent
              className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto overscroll-contain"
            >
              {paymentStatus !== "success" ? (
                <>
                  {/* Intro text */}
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                    Sponsoring a school, church, youth community, or company cohort? You can pay directly online for 50 or more passes, or chat with us on WhatsApp for official invoicing.
                  </p>

                  {/* 3 Benefit Cards - compact and responsive on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-black/40 border border-white/10 flex sm:flex-col items-start gap-3 sm:gap-1.5">
                      <HiOutlineSupport className="w-5 h-5 text-[#FF9600] shrink-0 mt-0.5 sm:mt-0" />
                      <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase">
                          Dedicated Support
                        </h4>
                        <p className="text-[11px] text-white/60 leading-relaxed">
                          Direct account manager to onboard and roster your cohort.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-2xl bg-black/40 border border-white/10 flex sm:flex-col items-start gap-3 sm:gap-1.5">
                      <HiOutlineTicket className="w-5 h-5 text-[#FB923C] shrink-0 mt-0.5 sm:mt-0" />
                      <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase">
                          Bulk Digital Passes
                        </h4>
                        <p className="text-[11px] text-white/60 leading-relaxed">
                          Automated distribution with custom-branded passes.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-2xl bg-black/40 border border-white/10 flex sm:flex-col items-start gap-3 sm:gap-1.5">
                      <HiOutlineAcademicCap className="w-5 h-5 text-[#35E0FF] shrink-0 mt-0.5 sm:mt-0" />
                      <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase">
                          Full Certification
                        </h4>
                        <p className="text-[11px] text-white/60 leading-relaxed">
                          20 live sessions, 360° portfolio, and verified graduation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FORM WITH NUMBER PICKER & CHECKOUT */}
                  <form onSubmit={handlePaystackCheckout} className="space-y-4">
                    {/* Interactive Group Size Stepper & Slider */}
                    <div className="p-4 sm:p-5 rounded-[22px] sm:rounded-[24px] bg-[#141824] border border-white/12 space-y-3.5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                            Number of Passes in Box
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setGroupSize(Math.max(50, validGroupSize - 1))}
                              className="w-9 h-9 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center text-white hover:border-white/40 active:scale-95 transition-all shrink-0 cursor-pointer"
                              aria-label="Decrease group size"
                            >
                              <HiMinus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="50"
                              step="1"
                              value={groupSize}
                              onChange={(e) => {
                                setGroupSize(e.target.value);
                              }}
                              onBlur={() => {
                                const num = parseInt(groupSize, 10);
                                if (isNaN(num) || num < 50) {
                                  setGroupSize(50);
                                }
                              }}
                              className="w-20 sm:w-24 h-9 px-2 text-center bg-black/60 border border-white/20 rounded-xl text-white font-mono font-bold text-base focus:outline-none focus:border-[#FB923C]"
                            />
                            <button
                              type="button"
                              onClick={() => setGroupSize(validGroupSize + 1)}
                              className="w-9 h-9 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center text-white hover:border-white/40 active:scale-95 transition-all shrink-0 cursor-pointer"
                              aria-label="Increase group size"
                            >
                              <HiPlus className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-mono text-white/60">learners</span>
                          </div>
                        </div>

                        {/* Total Pricing - Never overflows on mobile */}
                        <div className="flex sm:flex-col items-center justify-between sm:items-end pt-2 sm:pt-0 border-t border-white/10 sm:border-t-0">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                            Total (₦50k / seat)
                          </span>
                          <span className="font-mono text-xl sm:text-2xl font-black text-[#FB923C] tracking-tight">
                            ₦{estimatedTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Slider Input */}
                      <div className="pt-1">
                        <input
                          type="range"
                          min="50"
                          max={Math.max(500, validGroupSize)}
                          step="1"
                          value={validGroupSize}
                          onChange={(e) => setGroupSize(parseInt(e.target.value, 10))}
                          className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#FB923C]"
                        />

                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mt-1.5">
                          <span>50 Min</span>
                          <span className="hidden sm:inline">Drag slider or type exact count (50+)</span>
                          <span>{Math.max(500, validGroupSize)}+ Passes</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/70 font-bold block mb-1">
                          Your Name / Lead *
                        </label>
                        <input
                          type="text"
                          required
                          value={purchaserName}
                          onChange={(e) => setPurchaserName(e.target.value)}
                          placeholder="e.g. Samuel Abbaly"
                          className="w-full px-3.5 sm:px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FB923C] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/70 font-bold block mb-1">
                          Organization / Institution (Optional)
                        </label>
                        <input
                          type="text"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="e.g. Apex High School / Church"
                          className="w-full px-3.5 sm:px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FB923C] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/70 font-bold block mb-1">
                        Email Address (for Receipt & Onboarding) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@school.org"
                        className="w-full px-3.5 sm:px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FB923C] transition-colors"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-red-400 text-xs font-mono font-medium">
                        {errorMessage}
                      </p>
                    )}

                    {/* Primary Paystack Action */}
                    <button
                      type="submit"
                      disabled={paymentStatus === "loading"}
                      className={`w-full py-3.5 sm:py-4 px-4 font-mono font-black uppercase tracking-wider text-xs sm:text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                        paymentStatus === "loading"
                          ? "bg-[#FB923C]/70 text-black cursor-wait"
                          : "bg-[#FB923C] hover:bg-[#ea8430] active:scale-[0.99] text-black shadow-[0_4px_25px_rgba(251,146,60,0.35)]"
                      }`}
                    >
                      {paymentStatus === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          <span>Connecting Paystack...</span>
                        </span>
                      ) : (
                        <span className="text-center">Pay with Paystack • ₦{estimatedTotal.toLocaleString()} ({validGroupSize} passes)</span>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/50 font-mono text-center">
                      <HiOutlineShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Secured 256-bit payment encryption via Paystack</span>
                    </div>

                    {/* Optional WhatsApp Inquiry Section */}
                    <div className="pt-3 border-t border-white/10 space-y-2 text-center">
                      <span className="text-[11px] font-mono text-white/50 block">
                        Prefer an official purchase order, invoice, or bank transfer?
                      </span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-center"
                      >
                        <BsWhatsapp className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Chat on WhatsApp for Invoicing ({validGroupSize} seats)</span>
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs pt-1 text-center sm:text-left">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onBackToGiftCard) onBackToGiftCard();
                        }}
                        className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-mono cursor-pointer transition-colors"
                      >
                        <HiOutlineArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to single gift cards</span>
                      </button>

                      <span className="text-white/40 text-[11px] font-mono">
                        Direct cohort onboarding
                      </span>
                    </div>
                  </form>
                </>
              ) : (
                /* SUCCESS CONFIRMATION RECEIPT SCREEN */
                <div className="p-6 sm:p-10 text-center max-w-lg mx-auto space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
                    <HiCheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#FB923C] uppercase font-bold tracking-widest block mb-1">
                      GIFT BOX ORDER CONFIRMED
                    </span>
                    <h3 className="display-title text-2xl sm:text-3xl font-black uppercase text-white">
                      PAYMENT SUCCESSFUL!
                    </h3>
                  </div>

                  <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl p-4 text-center">
                    <p className="text-white text-sm sm:text-base font-bold font-body leading-snug">
                      Your order for <span className="text-[#FB923C]">{paymentResult?.groupSize} SmartGap passes</span> has been completed!
                    </p>
                  </div>

                  <div className="bg-black/60 border border-white/15 rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Order Reference:</span>
                      <span className="text-white font-bold">{paymentResult?.orderRef}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Cohort Size:</span>
                      <span className="text-white font-bold">{paymentResult?.groupSize} Learners</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Lead / Contact:</span>
                      <span className="text-white font-bold">{paymentResult?.purchaserName}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60 border-t border-white/10 pt-2">
                      <span>Total Paid:</span>
                      <span className="text-[#FB923C] font-bold text-sm">
                        ₦{paymentResult?.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 text-xs font-light leading-relaxed">
                    A formal payment receipt has been sent to <strong>{paymentResult?.email}</strong>. Our dedicated cohort onboarding manager will contact you within 24 hours to coordinate roster setup and customized learner distribution.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      Done & Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default GiftBoxModal;
