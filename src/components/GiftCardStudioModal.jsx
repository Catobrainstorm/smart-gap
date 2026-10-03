// src/components/GiftCardStudioModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  HiX,
  HiCheckCircle,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineGift,
  HiOutlineUserGroup,
  HiOutlineClipboardCopy,
  HiOutlineMail,
  HiOutlineArrowRight,
} from "react-icons/hi";
import GiftCard3D, { CARD_THEMES } from "./GiftCard3D";
import { initializePaystackPayment } from "../lib/paystack";

const GIFT_CARD_PACKS = [
  { id: "single", label: "1 Learner", cards: 1, amount: 50000, popular: true },
  { id: "duo", label: "2 Learners (Buddy Pass)", cards: 2, amount: 95000, discount: "5% Off" },
  { id: "quad", label: "4 Learners (Squad Pass)", cards: 4, amount: 180000, discount: "10% Off" },
  { id: "ten", label: "10 Learners (Mini Cohort)", cards: 10, amount: 425000, discount: "15% Off" },
];

const GiftCardStudioModal = ({ isOpen, onClose, initialTab = "giftcard" }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'giftcard' | 'giftbox'
  const [selectedTheme, setSelectedTheme] = useState("gold");
  const [selectedPack, setSelectedPack] = useState("single");
  const [customCardCount, setCustomCardCount] = useState("1");
  const [isFlipped, setIsFlipped] = useState(false);

  // Form states for Gift Card
  const [giftData, setGiftData] = useState({
    recipientName: "Adanna Okonkwo",
    recipientEmail: "",
    senderName: "Samuel Abbaly",
    senderEmail: "",
    phone: "",
    personalMessage: "Here is your 4-week SmartGap with Gift Card pass. Build your 360° portfolio!",
    giftType: "friend", // 'self' | 'friend' | 'family'
  });

  // Form states for Gift Box (50+)
  const [giftBoxData, setGiftBoxData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    cohortSize: 50,
    cohortNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  // Calculate prices
  const currentPack = GIFT_CARD_PACKS.find((p) => p.id === selectedPack);
  const giftCardAmount = currentPack ? currentPack.amount : 50000;

  // Gift Box calculation: 50 seats at bulk rate of ₦40,000 each
  const giftBoxPerSeat = 40000;
  const giftBoxTotal = Math.max(50, Number(giftBoxData.cohortSize) || 50) * giftBoxPerSeat;

  // Generate random display token
  const generatedToken = `SG4W-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-360P`;

  const handlePayGiftCard = (e) => {
    e.preventDefault();
    if (!giftData.senderEmail || !giftData.recipientName) {
      alert("Please provide your email and recipient name.");
      return;
    }

    setIsSubmitting(true);

    initializePaystackPayment({
      email: giftData.senderEmail,
      amount: giftCardAmount,
      type: "giftcard",
      metadata: {
        senderName: giftData.senderName || "Self",
        recipientName: giftData.recipientName,
        recipientEmail: giftData.recipientEmail,
        note: giftData.personalMessage,
        theme: selectedTheme,
        pack: selectedPack,
        cardCount: currentPack?.cards || 1,
        generatedCode: generatedToken,
        ProgramScope: "SmartGap with Gift Card (4 Weeks 360° Personal Development)",
      },
      onSuccess: (res) => {
        setIsSubmitting(false);
        setPaymentResult({
          ...res,
          voucherCode: generatedToken,
          recipient: giftData.recipientName,
          type: "giftcard",
        });

        try {
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#F59E0B", "#10B981", "#8B5CF6", "#3B82F6"],
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

  const handlePayGiftBox = (e) => {
    e.preventDefault();
    if (!giftBoxData.email || !giftBoxData.orgName || !giftBoxData.contactName) {
      alert("Please fill in the organization and contact details.");
      return;
    }

    if (giftBoxData.cohortSize < 50) {
      alert("Gift Box minimum cohort size is 50 participants.");
      return;
    }

    setIsSubmitting(true);

    initializePaystackPayment({
      email: giftBoxData.email,
      amount: giftBoxTotal,
      type: "giftbox",
      metadata: {
        organization: giftBoxData.orgName,
        contactPerson: giftBoxData.contactName,
        phone: giftBoxData.phone,
        cohortSize: giftBoxData.cohortSize,
        notes: giftBoxData.cohortNotes,
        ProgramScope: "SmartGap with Gift Card Enterprise Gift Box (50+ Cohort)",
      },
      onSuccess: (res) => {
        setIsSubmitting(false);
        setPaymentResult({
          ...res,
          voucherCode: `GBOX-50-${Date.now().toString().slice(-6)}`,
          recipient: `${giftBoxData.orgName} (${giftBoxData.cohortSize} Learners)`,
          type: "giftbox",
        });

        try {
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#10B981", "#3B82F6", "#F59E0B"],
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

  const copyVoucherCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        {/* Backdrop */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-[#0c121e] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-white max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Tabs and Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090e17] shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <HiOutlineGift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="special-font text-xl sm:text-2xl font-black uppercase text-white leading-none">
                  SmartGap with Gift Card Portal
                </h3>
                <span className="text-[11px] text-white/50 font-mono">
                  4-Week Personal Development & Certification
                </span>
              </div>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("giftcard");
                  setPaymentResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${activeTab === "giftcard"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-white/60 hover:text-white"
                  }`}
              >
                Gift Cards
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("giftbox");
                  setPaymentResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === "giftbox"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-white/60 hover:text-white"
                  }`}
              >
                <span>Gift Box</span>
                <span className="px-1.5 py-0.2 bg-black/40 text-[9px] rounded font-mono">
                  50+
                </span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all ml-2"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {!paymentResult ? (
              activeTab === "giftcard" ? (
                /* ================= TAB 1: GIFT CARDS ================= */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* LEFT: Realistic 3D Gift Card Showcase & Finishes */}
                  <div className="lg:col-span-6 flex flex-col items-center">
                    <div className="w-full text-left mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Interactive Voucher Card
                      </span>
                      <p className="text-white/70 text-xs mt-0.5">
                        Gift yourself, individuals, family and friends an experience into the 4-week SmartGap Programme. Complete your 360° personal development portfolio and get certified.
                      </p>
                    </div>

                    {/* 3D Physical-styled Card */}
                    <div className="w-full flex justify-center my-2">
                      <GiftCard3D
                        recipientName={giftData.recipientName}
                        senderName={giftData.senderName}
                        amount={giftCardAmount}
                        cardCode={generatedToken}
                        theme={selectedTheme}
                        isFlipped={isFlipped}
                        onFlipToggle={setIsFlipped}
                        showControls={true}
                      />
                    </div>

                    {/* Card Theme Picker */}
                    <div className="w-full max-w-[440px] mt-4 bg-black/30 p-3.5 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-white/50 tracking-wider font-bold block mb-2">
                        Select Card Finish & Foil
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.values(CARD_THEMES).map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTheme(t.id)}
                            className={`px-2 py-2 rounded-xl text-[10px] font-mono font-bold tracking-tight border transition-all text-center flex flex-col items-center gap-1 ${selectedTheme === t.id
                              ? `${t.tagBg} border-white/40 shadow-md`
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                              }`}
                          >
                            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-white/20 to-white/80 border border-white/40" />
                            <span className="truncate w-full">{t.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Program Note Notice */}
                    <div className="w-full max-w-[440px] mt-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-white/70 text-[11px] leading-relaxed">
                      💡 <strong>Note:</strong> This covers the intensive 4-week 360° personal development Programme and credential. It does not include induction into the 3-year Optimus Trybe.
                    </div>
                  </div>

                  {/* RIGHT: Customization & Paystack Form */}
                  <div className="lg:col-span-6 bg-black/30 p-6 rounded-3xl border border-white/10">
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white mb-3">
                      Gift Card Customizer
                    </h4>

                    <form onSubmit={handlePayGiftCard} className="space-y-4">
                      {/* Pack selection */}
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1.5">
                          Choose Pass Tier
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {GIFT_CARD_PACKS.map((pack) => (
                            <button
                              key={pack.id}
                              type="button"
                              onClick={() => setSelectedPack(pack.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all ${selectedPack === pack.id
                                ? "bg-purple-600/20 border-purple-400 text-white"
                                : "bg-black/40 border-white/10 text-white/70 hover:border-white/20"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold">{pack.label}</span>
                                {pack.discount && (
                                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                                    {pack.discount}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-mono font-bold text-purple-300 block mt-0.5">
                                ₦{pack.amount.toLocaleString()}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recipient Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                            Recipient Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={giftData.recipientName}
                            onChange={(e) =>
                              setGiftData({ ...giftData, recipientName: e.target.value })
                            }
                            placeholder="e.g. Chisom Nwosu"
                            className="w-full px-3.5 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                            Recipient Email (Optional)
                          </label>
                          <input
                            type="email"
                            value={giftData.recipientEmail}
                            onChange={(e) =>
                              setGiftData({ ...giftData, recipientEmail: e.target.value })
                            }
                            placeholder="chisom@example.com"
                            className="w-full px-3.5 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>

                      {/* Sender Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                            Your Name (Sender) *
                          </label>
                          <input
                            type="text"
                            required
                            value={giftData.senderName}
                            onChange={(e) =>
                              setGiftData({ ...giftData, senderName: e.target.value })
                            }
                            placeholder="Your Name"
                            className="w-full px-3.5 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                            Your Email (for Paystack Receipt) *
                          </label>
                          <input
                            type="email"
                            required
                            value={giftData.senderEmail}
                            onChange={(e) =>
                              setGiftData({ ...giftData, senderEmail: e.target.value })
                            }
                            placeholder="you@example.com"
                            className="w-full px-3.5 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>

                      {/* Personal Note */}
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                          Personal Dedication Message
                        </label>
                        <input
                          type="text"
                          value={giftData.personalMessage}
                          onChange={(e) =>
                            setGiftData({ ...giftData, personalMessage: e.target.value })
                          }
                          placeholder="Wishing you personal transformation and mastery!"
                          className="w-full px-3.5 py-2 bg-black/50 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      {/* Submit Paystack CTA */}
                      <div className="pt-3 border-t border-white/10">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <span>Opening Paystack...</span>
                          ) : (
                            <>
                              <HiOutlineGift className="w-4 h-4" />
                              <span>Purchase Gift Card • ₦{giftCardAmount.toLocaleString()}</span>
                            </>
                          )}
                        </button>
                        <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-white/40 font-mono">
                          <HiOutlineShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Instant digital token generation & verifiable code</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                /* ================= TAB 2: GIFT BOX (50+ COHORT) ================= */
                <div className="max-w-3xl mx-auto py-2">
                  <div className="text-center max-w-xl mx-auto mb-8">
                    <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase font-bold rounded-full">
                      Enterprise & Community Cohorts
                    </span>
                    <h4 className="special-font text-3xl font-black uppercase text-white mt-2">
                      SmartGap with Gift Card Gift Box
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm mt-2">
                      • <strong>50 people minimum</strong>. If you want to get gift cards for a small group larger than 50, we provide dedicated backend support and bulk administrative setup.
                    </p>
                  </div>

                  {/* Bulk Perks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                      <HiOutlineUserGroup className="w-6 h-6 text-emerald-400 mb-2" />
                      <h5 className="text-xs font-bold text-white uppercase font-mono">
                        Group Bulk Rate
                      </h5>
                      <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                        Enjoy discounted ₦40,000/scholar pricing (savings of ₦500,000+ per 50-cohort).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                      <HiOutlineSparkles className="w-6 h-6 text-cyan-400 mb-2" />
                      <h5 className="text-xs font-bold text-white uppercase font-mono">
                        Dedicated Backend Support
                      </h5>
                      <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                        Smartan House team provides automated CSV bulk voucher distribution & LMS setup.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                      <HiOutlineShieldCheck className="w-6 h-6 text-amber-400 mb-2" />
                      <h5 className="text-xs font-bold text-white uppercase font-mono">
                        Progress Analytics
                      </h5>
                      <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                        Receive executive summary reports on completion rates and 360° portfolio submissions.
                      </p>
                    </div>
                  </div>

                  {/* Gift Box Form */}
                  <form onSubmit={handlePayGiftBox} className="bg-black/30 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                          Organization / Company / Community *
                        </label>
                        <input
                          type="text"
                          required
                          value={giftBoxData.orgName}
                          onChange={(e) =>
                            setGiftBoxData({ ...giftBoxData, orgName: e.target.value })
                          }
                          placeholder="e.g. Apex Tech Foundation"
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                          Contact Lead Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={giftBoxData.contactName}
                          onChange={(e) =>
                            setGiftBoxData({ ...giftBoxData, contactName: e.target.value })
                          }
                          placeholder="e.g. Dr. Ngozi Balogun"
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                          Work Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={giftBoxData.email}
                          onChange={(e) =>
                            setGiftBoxData({ ...giftBoxData, email: e.target.value })
                          }
                          placeholder="ngozi@apextech.org"
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">
                          Phone Number / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={giftBoxData.phone}
                          onChange={(e) =>
                            setGiftBoxData({ ...giftBoxData, phone: e.target.value })
                          }
                          placeholder="+234 800 000 0000"
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Cohort size slider / counter */}
                    <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono uppercase text-emerald-400 font-bold">
                          Cohort Size (Minimum 50 People)
                        </label>
                        <span className="text-base font-mono font-black text-white">
                          {giftBoxData.cohortSize} Learners
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={giftBoxData.cohortSize}
                        onChange={(e) =>
                          setGiftBoxData({
                            ...giftBoxData,
                            cohortSize: Number(e.target.value),
                          })
                        }
                        className="w-full accent-emerald-400 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between items-center text-[10px] text-white/50 font-mono mt-2">
                        <span>50 Seats</span>
                        <span>Total: ₦{giftBoxTotal.toLocaleString()} (₦40k / seat)</span>
                        <span>500+ Seats</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Processing with Paystack...</span>
                      ) : (
                        <>
                          <HiOutlineUserGroup className="w-5 h-5" />
                          <span>Get a SmartGap gift box (50+) • ₦{giftBoxTotal.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )
            ) : (
              /* ================= SUCCESS CONFIRMATION ================= */
              <div className="p-8 text-center max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  <HiCheckCircle className="w-10 h-10" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 block mb-1">
                  Payment Confirmed • SmartGap with Gift Card
                </span>
                <h3 className="special-font text-3xl font-black uppercase text-white mb-2">
                  Gift Pass Activated!
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mb-6">
                  Your purchase for <strong>{paymentResult.recipient}</strong> has been secured via Paystack. Below is the unique activation redemption token.
                </p>

                {/* Token Box */}
                <div className="bg-black/60 border border-purple-500/40 rounded-2xl p-5 mb-6 text-center">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block mb-1">
                    Redemption Voucher Code
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg sm:text-xl font-mono font-black text-purple-300 tracking-wider">
                      {paymentResult.voucherCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyVoucherCode(paymentResult.voucherCode)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs flex items-center gap-1 font-mono"
                    >
                      <HiOutlineClipboardCopy className="w-4 h-4" />
                      <span>{copiedCode ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-white/40 block mt-2">
                    Reference: {paymentResult.reference}
                  </span>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GiftCardStudioModal;
