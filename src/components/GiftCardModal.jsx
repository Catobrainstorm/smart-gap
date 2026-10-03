// src/components/GiftCardModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  HiX,
  HiCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineClipboardCopy,
  HiPlus,
  HiMinus,
} from "react-icons/hi";
import GiftCard3D from "./GiftCard3D";
import { initializePaystackPayment } from "../lib/paystack";

const UNIT_PRICE = 50000;

const GiftCardModal = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState("Adanna Okonkwo");
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const validQuantity = Math.max(1, parseInt(quantity, 10) || 1);
  const totalAmount = validQuantity * UNIT_PRICE;
  const tokenCode = `SG4W-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-360P`;

  const handlePaystackCheckout = (e) => {
    e.preventDefault();
    if (!email || !recipientName) {
      alert("Please provide your email and recipient name.");
      return;
    }

    setIsSubmitting(true);

    initializePaystackPayment({
      email,
      amount: totalAmount,
      type: "giftcard",
      metadata: {
        senderName: senderName || "Self",
        recipientName,
        quantity: validQuantity,
        voucherCode: tokenCode,
        unitPrice: UNIT_PRICE,
        ProgramScope: "SmartGap Mini (4-Week 360° Personal Development Programme)",
      },
      onSuccess: (res) => {
        setIsSubmitting(false);
        setPaymentSuccess({
          ...res,
          voucherCode: tokenCode,
          quantity: validQuantity,
          recipient: recipientName,
        });

        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (_) { }
      },
      onClose: () => setIsSubmitting(false),
      onError: (err) => {
        setIsSubmitting(false);
        alert(`Payment error: ${err.message}`);
      },
    });
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-white max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                SmartGap Mini
              </span>
              <h3 className="special-font text-2xl font-black uppercase text-white tracking-tight">
                Get a Gift Card
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
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {!paymentSuccess ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Write-up & 3D Interactive Card */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="w-full text-left mb-4">
                    <p className="text-white/80 text-sm leading-relaxed">
                      Gift yourself, individual, family and friends an experience into the 4 weeks SmartGap Programme. Complete your 360 personal development portfolio and get certified.
                    </p>
                    <p className="text-[11px] text-white/40 font-mono italic mt-2">
                      * The gift card design carries the value of Giftcards, not on the page.
                    </p>
                  </div>

                  {/* 3D Card Display */}
                  <div className="w-full flex justify-center py-2">
                    <GiftCard3D
                      recipientName={recipientName}
                      senderName={senderName}
                      amount={totalAmount}
                      cardCode={tokenCode}
                      showControls={true}
                    />
                  </div>
                </div>

                {/* RIGHT: Direct Quantity Input & Checkout Form */}
                <div className="lg:col-span-6 bg-[#141414] p-6 rounded-2xl border border-white/10">
                  <form onSubmit={handlePaystackCheckout} className="space-y-4">
                    {/* Direct Number Input for Quantity */}
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/60 block mb-1.5">
                        Number of Gift Cards
                      </label>

                      <div className="flex items-center gap-2">
                        {/* Decrement Button */}
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, validQuantity - 1))}
                          className="w-11 h-11 rounded-xl bg-black/60 border border-white/15 hover:border-white/40 flex items-center justify-center text-white text-base transition-colors shrink-0"
                        >
                          <HiMinus className="w-4 h-4" />
                        </button>

                        {/* Direct Number Input */}
                        <div className="relative flex-1">
                          <input
                            type="number"
                            min="1"
                            max="49"
                            value={quantity}
                            onChange={(e) => {
                              const val = e.target.value;
                              setQuantity(val === "" ? "" : Math.max(1, parseInt(val, 10) || 1));
                            }}
                            className="w-full h-11 px-4 text-center bg-black/50 border border-white/15 rounded-xl text-white font-mono font-bold text-base focus:outline-none focus:border-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="1"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/40 pointer-events-none">
                            {validQuantity === 1 ? "card" : "cards"}
                          </span>
                        </div>

                        {/* Increment Button */}
                        <button
                          type="button"
                          onClick={() => setQuantity(validQuantity + 1)}
                          className="w-11 h-11 rounded-xl bg-black/60 border border-white/15 hover:border-white/40 flex items-center justify-center text-white text-base transition-colors shrink-0"
                        >
                          <HiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-white/40 font-mono mt-1.5">
                        <span>Unit Rate: ₦50,000 / learner</span>
                        <span>For 50+ cohorts, choose Gift Box</span>
                      </div>
                    </div>

                    {/* Recipient Name */}
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                        Recipient Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Adanna Okonkwo"
                        className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-white/40"
                      />
                    </div>

                    {/* Sender Name */}
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                        Your Name (Sender)
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Samuel"
                        className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-white/40"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                        Email Address (for Paystack Receipt) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-white/40"
                      />
                    </div>

                    {/* Total & Submit Button */}
                    <div className="pt-3 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-white/60">Total Amount:</span>
                        <span className="text-base font-bold text-white font-mono">
                          ₦{totalAmount.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-extrabold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Connecting to Paystack...</span>
                        ) : (
                          <span>Pay with Paystack • ₦{totalAmount.toLocaleString()}</span>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/40 font-mono">
                        <HiOutlineShieldCheck className="w-3.5 h-3.5 text-white/60" />
                        <span>Secured via Paystack 256-bit encryption</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* Success Screen */
              <div className="p-8 text-center max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 text-white">
                  <HiCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="special-font text-3xl font-black uppercase text-white mb-2">
                  Payment Successful
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mb-6">
                  Your SmartGap Mini order for <strong>{paymentSuccess.quantity} Gift {paymentSuccess.quantity === 1 ? "Card" : "Cards"}</strong> ({paymentSuccess.recipient}) has been confirmed.
                </p>

                <div className="bg-black/50 border border-white/15 rounded-2xl p-4 mb-6 text-center">
                  <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                    Redemption Voucher Token
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base sm:text-lg font-mono font-bold text-white">
                      {paymentSuccess.voucherCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyCode(paymentSuccess.voucherCode)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs"
                    >
                      <HiOutlineClipboardCopy className="w-4 h-4" />
                    </button>
                  </div>
                  {copied && (
                    <span className="text-[10px] text-white/60 block mt-1">
                      Copied to clipboard!
                    </span>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GiftCardModal;
