import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const Waitlist = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', email: '', whatsapp: '', location: '',
    educationalStatus: '', schoolName: '', age: '', referral: ''
  });
  const [status, setStatus] = useState('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [dots, setDots] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newDot = {
        x: e.clientX, y: e.clientY, id: Math.random(),
        color: ['#EC4899', '#A855F7', '#6366F1', '#22C55E'][Math.floor(Math.random() * 4)]
      };
      setDots((prev) => [...prev.slice(-8), newDot]);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setDots([]), 100); 
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await addDoc(collection(db, "waitlist"), { 
        ...formData, 
        timestamp: serverTimestamp() 
      });
      setSubmittedEmail(formData.email);
      setStatus('success');
    } catch (error) {
      console.error("Firebase Error:", error);
      setStatus('error');
    }
  };

  // Logic: Show school input ONLY if NOT in a Gap Year
  const shouldShowSchoolInput = 
    formData.educationalStatus && formData.educationalStatus !== 'Gap Year (Taking a break)';

  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-x-hidden selection:bg-[#22C55E]/30">
      
      {/* BACKGROUND & LINES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[5%] -left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[140px]" />
        <div className="absolute -top-[5%] -right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[140px]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[100%] sm:w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[160px]" />

        {/* COLORED ARCHITECTURAL LINES */}
        <div className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 via-purple-500/30 to-transparent" />
        <div className="absolute left-[25%] sm:left-[30%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
      </div>

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-40 pt-10 sm:pt-16 pb-8 flex flex-col items-center bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent">
        <div className="mb-6 scale-90 sm:scale-100">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0A0A0A] border-[2px] border-white/10 rounded-[28px] flex items-center justify-center rotate-45 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img src="/assets/logo.webp" alt="Logo" className="-rotate-45 w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
        </div>
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-center px-6 leading-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 font-medium italic">SmartGap</span> Waitlist Form
        </h1>
      </div>

      <div className="relative z-10 pt-[280px] sm:pt-[360px] pb-24 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl px-4">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.03] border border-white/10 p-6 sm:p-12 rounded-[40px] backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                {/* Standard Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">Full Name</label>
                    <input required type="text" placeholder="Your name" value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">Email Address</label>
                    <input required type="email" placeholder="email@example.com" value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input required type="tel" placeholder="+234..." value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">Age</label>
                    <input required type="number" placeholder="20" value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">Location</label>
                  <input required type="text" placeholder="Ikorodu, Lagos, Nigeria" value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] transition-all" />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-white/60 text-[11px] font-medium uppercase tracking-[0.15em]">Educational Status</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['High School Student', 'Gap Year (Taking a break)', 'Higher Institution', 'Graduate'].map((status) => (
                      <label key={status} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.educationalStatus === status ? 'bg-[#22C55E]/10 border-[#22C55E]' : 'bg-white/5 border-white/5 hover:border-white/15'}`}>
                        <input type="radio" name="edu" className="hidden" onChange={() => setFormData({...formData, educationalStatus: status})} />
                        <div className={`w-3.5 h-3.5 rounded-full border ${formData.educationalStatus === status ? 'bg-[#22C55E] border-[#22C55E]' : 'border-white/20'}`} />
                        <span className="text-[11px] text-white/80">{status}</span>
                      </label>
                    ))}
                  </div>

                  {/* SMART CONDITIONAL INPUT */}
                  <AnimatePresence>
                    {shouldShowSchoolInput && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-2 overflow-hidden">
                        <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">Which school did you attend / are you attending?</label>
                        <input required type="text" placeholder="Institution name..." value={formData.schoolName}
                          onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] mt-2 transition-all" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1">How did you hear about us?</label>
                  <input type="text" placeholder="Twitter, Instagram, Friend..." value={formData.referral}
                    onChange={(e) => setFormData({...formData, referral: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-1 focus:ring-[#22C55E] transition-all" />
                </div>

                <button disabled={status === 'loading'} type="submit" className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-gray-200 active:scale-[0.98] transition-all mt-4 text-sm tracking-wide">
                  {status === 'loading' ? 'Processing...' : 'Join the Elite List'}
                </button>
              </form>
            </motion.div>
          ) : (
            /* SUCCESS CARD */
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-[48px] p-12 sm:p-20 flex flex-col items-center shadow-3xl mx-4 backdrop-blur-3xl">
              <div className="w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(34,197,94,0.3)]">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 className="text-white text-3xl sm:text-4xl font-medium text-center mb-4 leading-tight">You're in the elite list!</h2>
              <p className="text-white/40 text-center mb-10 text-sm">We'll reach out to your WhatsApp and Email shortly.</p>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="text-white/90 text-sm font-jakarta">{submittedEmail}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 pb-10 text-center z-10">
          <p className="text-white/20 text-[11px] font-jakarta tracking-widest uppercase italic">
            © 2026 All Rights Reserved. Smartan House.
          </p>
        </div>
      </div>

      {/* CURSOR DOTS */}
      {dots.map((dot, index) => (
        <motion.div key={dot.id} className="fixed pointer-events-none z-50 rounded-full blur-[1px]"
          style={{ left: dot.x, top: dot.y, width: `${4 + index}px`, height: `${4 + index}px`, backgroundColor: dot.color, transform: 'translate(-50%, -50%)' }} />
      ))}
    </div>
    // The test of it
  );
};

export default Waitlist;