// src/components/SponsorshipModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  HiX,
  HiCheckCircle,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineGift,
} from "react-icons/hi";
import { initializePaystackPayment } from "../lib/paystack";

const SPONSORSHIP_TIERS = [
  {
    id: "single",
    label: "1 Candidate",
    subtext: "Full 3-Year Grant",
    amount: 250000,
    popular: true,
  },
  {
    id: "double",
    label: "2 Candidates",
    subtext: "Dual Impact Cohort",
    amount: 500000,
    popular: false,
  },
  {
    id: "quad",
    label: "4 Candidates",
    subtext: "Circle of 4 Scholars",
    amount: 1000000,
    popular: false,
  },
  {
    id: "custom",
    label: "Custom Grant",
    subtext: "Support at any level",
    amount: null,
    popular: false,
  },
];

const SponsorshipModal = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState("single");
  const [customAmount, setCustomAmount] = useState("250000");
  const [donorData, setDonorData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    dedicationNote: "",
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  if (!isOpen) return null;

  const currentAmount =
    selectedTier === "custom"
      ? Number(customAmount) || 0
      : SPONSORSHIP_TIERS.find((t) => t.id === selectedTier)?.amount || 250000;

  const handlePaySponsorship = (e) => {
    e.preventDefault();
    if (!donorData.email || !donorData.fullName) {
      alert("Please provide your name and email address.");
      return;
    }

    if (currentAmount < 5000) {
      alert("Minimum contribution amount is ₦5,000.");
      return;
    }

    setIsSubmitting(true);

    initializePaystackPayment({
      email: donorData.email,
      amount: currentAmount,
      type: "sponsorship",
      metadata: {
        senderName: donorData.isAnonymous ? "Anonymous Philanthropist" : donorData.fullName,
        organization: donorData.organization || "Individual",
        phone: donorData.phone,
        note: donorData.dedicationNote,
        tier: selectedTier,
        targetProgram: "SmartGap Optimus Trybe 3-Year Grant",
      },
      onSuccess: (result) => {
        setIsSubmitting(false);
        setPaymentSuccess(result);

        // Confetti celebration
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#F59E0B", "#10B981", "#8B5CF6", "#EC4899", "#3B82F6"],
          });
        } catch (_) { }
      },
      onClose: () => {
        setIsSubmitting(false);
      },
      onError: (err) => {
        setIsSubmitting(false);
        alert(`Payment error: ${err.message}`);
      },
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0e1624] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          {/* Top Banner Gradient */}
          <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all z-20"
          >
            <HiX className="w-5 h-5" />
          </button>

          {!paymentSuccess ? (
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <HiOutlineHeart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
                    Sponsor the Waitlist
                  </span>
                  <h3 className="special-font text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                    Fund an Optimus Trybe Scholar
                  </h3>
                </div>
              </div>

              <p className="text-white/70 text-xs sm:text-sm mt-2 mb-6 leading-relaxed">
                Smartan House works to secure sponsorship grants of <strong>₦250,000 ($200)</strong> to support one deserving candidate through the full <strong>3-year Optimus Trybe personal transformational journey</strong>.
              </p>

              {/* What the ₦250k grant covers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex items-start gap-2.5">
                  <HiOutlineAcademicCap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">3-Year Growth</span>
                    <span className="text-[10px] text-white/60 leading-tight block">Industry circles & continuous mentoring.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex items-start gap-2.5">
                  <HiOutlineSparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">360° Portfolio</span>
                    <span className="text-[10px] text-white/60 leading-tight block">Hands-on projects & certified portfolio.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex items-start gap-2.5">
                  <HiOutlineUserGroup className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Optimus Trybe</span>
                    <span className="text-[10px] text-white/60 leading-tight block">Lifelong induction & alumni network.</span>
                  </div>
                </div>
              </div>

              {/* Tier Selection */}
              <label className="text-xs font-mono uppercase text-white/60 tracking-wider font-bold block mb-2">
                Select Sponsorship Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {SPONSORSHIP_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`relative p-3 rounded-2xl border text-left transition-all ${isSelected
                        ? "bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10"
                        : "bg-black/20 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20"
                        }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-amber-400 text-black text-[9px] font-mono font-bold rounded-md uppercase">
                          Standard
                        </span>
                      )}
                      <span className="block text-xs font-extrabold text-white">
                        {tier.label}
                      </span>
                      <span className="text-[10px] text-white/50 block truncate">
                        {tier.subtext}
                      </span>
                      {tier.amount && (
                        <span className="text-xs font-mono font-bold text-amber-400 mt-1 block">
                          ₦{tier.amount.toLocaleString()}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount input if selected */}
              {selectedTier === "custom" && (
                <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-amber-400/30">
                  <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">
                    Enter Custom Sponsorship Amount (₦ NGN)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 font-mono font-bold">
                      ₦
                    </span>
                    <input
                      type="number"
                      min="5000"
                      step="5000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 150000"
                      className="w-full pl-8 pr-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                  <span className="text-[10px] text-white/50 mt-1 block">
                    Any amount helps subsidize materials and mentorship for waitlisted scholars.
                  </span>
                </div>
              )}

              {/* Donor Details Form */}
              <form onSubmit={handlePaySponsorship} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                      Your Full Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorData.fullName}
                      onChange={(e) =>
                        setDonorData({ ...donorData, fullName: e.target.value })
                      }
                      placeholder="e.g. Samuel Adeyemi"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                      Email Address (for Paystack Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      value={donorData.email}
                      onChange={(e) =>
                        setDonorData({ ...donorData, email: e.target.value })
                      }
                      placeholder="samuel@example.com"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                      Phone Number / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={donorData.phone}
                      onChange={(e) =>
                        setDonorData({ ...donorData, phone: e.target.value })
                      }
                      placeholder="+234 800 000 0000"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                      Personal Note or Dedication (Optional)
                    </label>
                    <input
                      type="text"
                      value={donorData.dedicationNote}
                      onChange={(e) =>
                        setDonorData({
                          ...donorData,
                          dedicationNote: e.target.value,
                        })
                      }
                      placeholder="e.g. In support of female leaders"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={donorData.isAnonymous}
                    onChange={(e) =>
                      setDonorData({
                        ...donorData,
                        isAnonymous: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-amber-400 rounded"
                  />
                  <span className="text-xs text-white/70">
                    Make this sponsorship anonymous on public leaderboards
                  </span>
                </label>

                {/* Submit Paystack Button */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <HiOutlineShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Secured by Paystack 256-bit SSL</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || currentAmount <= 0}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Opening Paystack...</span>
                    ) : (
                      <>
                        <HiOutlineHeart className="w-4 h-4" />
                        <span>Sponsor Now • ₦{currentAmount.toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success confirmation screen */
            <div className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <HiCheckCircle className="w-10 h-10" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                Sponsorship Confirmed
              </span>
              <h3 className="special-font text-3xl font-black uppercase text-white mb-2">
                Thank You For Transforming a Life!
              </h3>
              <p className="text-white/70 text-sm max-w-lg mx-auto mb-6">
                Your grant of <strong>₦{Number(paymentSuccess.amount).toLocaleString()}</strong> has been securely received via Paystack. Our team at Smartan House is assigning a waitlisted scholar to this cohort.
              </p>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left font-mono text-xs text-white/80 mb-6 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-white/50">Transaction Ref:</span>
                  <span className="text-amber-400 font-bold">{paymentSuccess.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Donor:</span>
                  <span>{donorData.fullName || "Anonymous"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Programme:</span>
                  <span>Optimus Trybe (3-Year Continuum)</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SponsorshipModal;
