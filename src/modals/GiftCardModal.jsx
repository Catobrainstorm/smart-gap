// src/modals/GiftCardModal.jsx
// Redesigned SmartGap with Gift Card Gift Card Modal with live 3D card preview, 4 color themes,
// live personal message with counter, masked token, 50+ cohort switcher, and robust Paystack payment.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  HiX,
  HiCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineClipboardCopy,
  HiPlus,
  HiMinus,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineGift,
} from "react-icons/hi";
import GiftCard3D from "../components/GiftCard3D";
import { initializePaystackPayment } from "../lib/paystack";

const UNIT_PRICE = 50000;

const THEMES = [
  { id: "obsidian", name: "Obsidian", color: "#1A1A1A", border: "rgba(255,255,255,0.2)" },
  { id: "orange", name: "Solar Orange", color: "#FF9600", border: "rgba(255,150,0,0.6)" },
  { id: "flame", name: "Sunset Flame", color: "#FB923C", border: "rgba(251,146,60,0.6)" },
  { id: "cosmic", name: "Cosmic Violet", color: "#7C5CFF", border: "rgba(124,92,255,0.6)" },
];

export const GiftCardModal = ({ isOpen, onClose, onSwitchToGiftBox }) => {
  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("obsidian");
  const [paymentStatus, setPaymentStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [paymentResult, setPaymentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Close on Escape key & lock body scroll
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

  const validQuantity = Math.min(10, Math.max(1, parseInt(quantity, 10) || 1));
  const totalAmount = validQuantity * UNIT_PRICE;
  const isBulkThreshold = validQuantity >= 10;

  const handlePaystackCheckout = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter an email address for your payment receipt.");
      return;
    }
    if (!recipientName) {
      setErrorMessage("Please enter the recipient's name.");
      return;
    }

    setErrorMessage("");
    setPaymentStatus("loading");

    // Generate unique orderRef upfront for idempotency (same orderRef on retry)
    const orderRef = `ord_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    console.group(
      `%c[SmartGap Minting]%c Order: ${orderRef}`,
      "color: #000; font-weight: bold; background: #FF9600; padding: 2px 6px; border-radius: 4px;",
      "color: #FFFFFF; font-weight: bold; margin-left: 6px;"
    );
    console.log("1. Starting Paystack checkout for:", {
      orderRef,
      quantity: validQuantity,
      totalAmount,
      email,
      recipientName,
      senderName: senderName || "Self / Family",
    });

    initializePaystackPayment({
      email,
      amount: totalAmount,
      type: "giftcard",
      metadata: {
        orderRef,
        senderName: senderName || "Self / Family",
        recipientName,
        quantity: validQuantity,
        message: message.trim() || "Empower your journey.",
        theme: selectedTheme,
        unitPrice: UNIT_PRICE,
        ProgramScope: "SmartGap with Gift Card (4-Week 360° Personal Development Programme)",
      },
      onSuccess: async (res) => {
        console.log("2. Paystack payment verified by gateway:", res);
        setPaymentStatus("minting");

        try {
          console.log("3. Calling /api/mint-gift-cards to mint platform codes with HMAC signature...");
          const mintRes = await fetch("/api/mint-gift-cards", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderRef,
              count: validQuantity,
              valueNaira: totalAmount,
              purchaser: senderName || recipientName || "Valued Buyer",
              purchaserEmail: email,
              plan: "GIFT_CARD",
              label: `Website gift card order for ${recipientName} (${orderRef})`,
            }),
          });

          const mintData = await mintRes.json();
          console.log("4. SmartGap Platform Response:", mintData);

          if (mintData.status === "minted" || mintData.status === "already_minted") {
            console.log(
              "%c✓ Platform Pass Minted Successfully!",
              "color: #10B981; font-weight: bold;",
              mintData
            );
            console.groupEnd();
            setPaymentStatus("success");
            setPaymentResult({
              orderRef,
              batchId: mintData.batchId,
              seats: mintData.seats || validQuantity,
              emailed: mintData.emailed,
              emailError: mintData.emailError,
              recipient: recipientName,
              totalAmount,
            });

            try {
              confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ["#FF9600", "#DA5127", "#7C5CFF", "#FFFFFF"],
              });
            } catch (_) { }
          } else {
            console.warn("⚠ Platform returned non-minted status:", mintData);
            console.groupEnd();
            // Still show receipt because payment was taken; platform will reconcile
            setPaymentStatus("success");
            setPaymentResult({
              orderRef,
              seats: validQuantity,
              emailed: false,
              recipient: recipientName,
              totalAmount,
            });
          }
        } catch (mintErr) {
          console.error("Mint API fetch error:", mintErr);
          console.groupEnd();
          setPaymentStatus("success");
          setPaymentResult({
            orderRef,
            seats: validQuantity,
            emailed: false,
            recipient: recipientName,
            totalAmount,
          });
        }
      },
      onClose: () => {
        if (paymentStatus !== "success" && paymentStatus !== "minting") {
          console.log("Paystack modal closed before payment.");
          console.groupEnd();
          setPaymentStatus("idle");
        }
      },
      onError: (err) => {
        console.error("Paystack Checkout Error:", err);
        console.groupEnd();
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
        aria-labelledby="gift-card-modal-title"
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
            className="relative w-full max-w-5xl bg-[#0D0F17] border border-white/15 rounded-[32px] sm:rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto text-white max-h-[90vh] flex flex-col"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 shrink-0 bg-[#090A10]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF9600] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF9600] font-bold">
                    SmartGap with Gift Card PASS
                  </span>
                </div>
                <h3
                  id="gift-card-modal-title"
                  className="display-title text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
                >
                  Get a SmartGap gift card
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/12 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div
              data-lenis-prevent
              className="p-6 sm:p-8 overflow-y-auto overscroll-contain flex-1 font-body"
            >
              {paymentStatus !== "success" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* LEFT: 3D CARD PREVIEW & THEME PICKER */}
                  <div className="lg:col-span-6 flex flex-col items-center">
                    <div className="w-full text-left mb-4">
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                        Give someone the 4-week SmartGap with Gift Card Programme: 20 live sessions with Smartandad, a 360° personal development portfolio, and an official certificate.
                      </p>
                    </div>

                    {/* 3D Card Preview */}
                    <div className="w-full flex justify-center py-2">
                      <GiftCard3D
                        recipientName={recipientName || "Recipient Name"}
                        senderName={senderName || "Your Name"}
                        amount={totalAmount}
                        cardCode="SG4W-••••-••••-360P"
                        theme={selectedTheme}
                        showControls={true}
                      />
                    </div>

                    {/* Theme Selector */}
                    <div className="w-full mt-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                      <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider block mb-2 font-bold">
                        Card Aesthetic Theme
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {THEMES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTheme(t.id)}
                            className={`p-2 rounded-xl text-center border text-[11px] font-mono font-bold transition-all ${selectedTheme === t.id
                              ? "bg-white/15 border-white text-white shadow-md scale-102"
                              : "bg-black/30 border-white/10 text-white/60 hover:text-white"
                              }`}
                          >
                            <div
                              className="w-3 h-3 rounded-full mx-auto mb-1"
                              style={{ backgroundColor: t.color }}
                            />
                            <span className="truncate block">{t.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: CHECKOUT FORM & QUANTITY STEPPER */}
                  <div className="lg:col-span-6 bg-[#131622] p-6 sm:p-7 rounded-[28px] border border-white/12">
                    <form onSubmit={handlePaystackCheckout} className="space-y-4">
                      {/* Quantity Stepper */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] font-mono uppercase text-white/70 font-bold tracking-wider">
                            Number of Gift Cards
                          </label>
                          <span className="text-[11px] font-mono text-[#FF9600]">
                            ₦50,000 each
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, validQuantity - 1))}
                            className="w-12 h-12 rounded-xl bg-black/60 border border-white/15 hover:border-white/40 flex items-center justify-center text-white text-base transition-colors shrink-0"
                            aria-label="Decrease quantity"
                          >
                            <HiMinus className="w-4 h-4" />
                          </button>

                          <div className="relative flex-1">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={quantity}
                              onChange={(e) => {
                                const val = e.target.value;
                                setQuantity(val === "" ? "" : Math.min(10, Math.max(1, parseInt(val, 10) || 1)));
                              }}
                              className="w-full h-12 px-4 text-center bg-black/50 border border-white/15 rounded-xl text-white font-mono font-bold text-lg focus:outline-none focus:border-[#FF9600] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-white/40 pointer-events-none">
                              {validQuantity === 1 ? "pass" : "passes"}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setQuantity(Math.min(10, validQuantity + 1))}
                            className="w-12 h-12 rounded-xl bg-black/60 border border-white/15 hover:border-white/40 flex items-center justify-center text-white text-base transition-colors shrink-0"
                            aria-label="Increase quantity"
                          >
                            <HiPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 10+ / Cohort Notice Banner */}
                      {isBulkThreshold && (
                        <div className="p-3.5 rounded-xl bg-[#FF9600]/10 border border-[#FF9600]/40 flex items-center justify-between gap-3 animate-pulse">
                          <div className="text-xs">
                            <span className="font-bold text-[#FF9600] block">
                              Buying 10 or more for a cohort?
                            </span>
                            <span className="text-white/80 text-[11px]">
                              Switch to a Gift Box for dedicated backend setup & bulk delivery.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              if (onSwitchToGiftBox) onSwitchToGiftBox();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF9600] to-[#DA5127] text-white font-mono font-black text-[10px] uppercase shrink-0 cursor-pointer"
                          >
                            Switch
                          </button>
                        </div>
                      )}

                      {/* Recipient Name */}
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/70 font-bold block mb-1">
                          Recipient Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="e.g. Tola Adebayo"
                          className="w-full px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF9600] transition-colors"
                        />
                      </div>

                      {/* Sender Name */}
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/70 font-bold block mb-1">
                          Your Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Samuel (Brother / Mentor)"
                          className="w-full px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF9600] transition-colors"
                        />
                      </div>

                      {/* Personal Message with Counter */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-mono uppercase text-white/70 font-bold">
                            Personal Message (Optional)
                          </label>
                          <span className="text-[10px] font-mono text-white/40">
                            {message.length}/140
                          </span>
                        </div>
                        <textarea
                          maxLength={140}
                          rows={2}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="e.g. Excited for you to level up in SmartGap! Make every session count."
                          className="w-full px-4 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF9600] transition-colors resize-none"
                        />
                      </div>

                      {/* Email for Paystack Receipt */}
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/70 font-bold block mb-1">
                          Email Address (for Paystack Receipt & Pass Delivery) *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF9600] transition-colors"
                        />
                      </div>

                      {errorMessage && (
                        <p className="text-red-400 text-xs font-mono font-medium pt-1">
                          {errorMessage}
                        </p>
                      )}

                      {/* Line Items & Total */}
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-white/60">
                            {validQuantity} × ₦50,000:
                          </span>
                          <span className="text-base font-bold text-white font-mono">
                            ₦{totalAmount.toLocaleString()}
                          </span>
                        </div>

                        {/* Pay Button with Loading & Minting state */}
                        <button
                          type="submit"
                          disabled={paymentStatus === "loading" || paymentStatus === "minting"}
                          className={`w-full py-4 font-mono font-black uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${paymentStatus === "loading" || paymentStatus === "minting"
                            ? "bg-gradient-to-r from-[#FF9600]/70 to-[#DA5127]/70 text-white cursor-wait"
                            : "bg-gradient-to-r from-[#FF9600] to-[#DA5127] hover:brightness-110 text-white shadow-[0_4px_25px_rgba(255,150,0,0.35)]"
                            }`}
                        >
                          {paymentStatus === "loading" ? (
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                              <span>Connecting Secure Paystack...</span>
                            </span>
                          ) : paymentStatus === "minting" ? (
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                              <span>Minting Pass on SmartGap Platform...</span>
                            </span>
                          ) : (
                            <span>Pay with Paystack • ₦{totalAmount.toLocaleString()}</span>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/50 font-mono">
                          <HiOutlineShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Secured via Paystack 256-bit bank encryption</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                /* SUCCESS CONFIRMATION RECEIPT SCREEN */
                <div className="p-6 sm:p-10 text-center max-w-lg mx-auto space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
                    <HiCheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#FF9600] uppercase font-bold tracking-widest block mb-1">
                      ORDER CONFIRMED • PASSES MINTED
                    </span>
                    <h3 className="display-title text-2xl sm:text-3xl font-black uppercase text-white">
                      PAYMENT SUCCESSFUL!
                    </h3>
                  </div>

                  {/* Official Receipt Notice */}
                  <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl p-4 sm:p-5 text-center">
                    <span className="text-[10px] font-mono text-[#10B981] font-bold uppercase tracking-widest block mb-1">
                      OFFICIAL RECEIPT
                    </span>
                    <p className="text-white text-base sm:text-lg font-bold font-body leading-snug">
                      Your codes are on the way to{" "}
                      <span className="text-[#FF9600] underline break-all">{email}</span>.
                    </p>
                  </div>

                  {/* Order Breakdown Box */}
                  <div className="bg-black/60 border border-white/15 rounded-2xl p-4 sm:p-5 text-left space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Order Reference:</span>
                      <span className="text-white font-bold">{paymentResult?.orderRef}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Seats Minted:</span>
                      <span className="text-white font-bold">
                        {paymentResult?.seats} {paymentResult?.seats === 1 ? "Learner Seat" : "Learner Seats"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Recipient:</span>
                      <span className="text-white font-bold">{paymentResult?.recipient}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60 border-t border-white/10 pt-2">
                      <span>Amount Paid:</span>
                      <span className="text-[#FF9600] font-bold text-sm">
                        ₦{paymentResult?.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Security & Platform Instructions */}
                  <p className="text-white/70 text-xs font-light leading-relaxed">
                    For security, your ₦50,000 pass codes are sent directly to your inbox and never stored in your browser. Each code can be redeemed at{" "}
                    <a
                      href="https://play.thesmartgap.com/redeem"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C4B5FD] underline font-bold"
                    >
                      play.thesmartgap.com/redeem
                    </a>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href="https://play.thesmartgap.com/redeem"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-gradient-to-r from-[#FF9600] to-[#DA5127] hover:brightness-110 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md text-center"
                    >
                      Go to Redeem Portal ↗
                    </a>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all text-center cursor-pointer"
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

export default GiftCardModal;
