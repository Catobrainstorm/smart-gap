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

  const shouldShowSchoolInput = 
    formData.educationalStatus && formData.educationalStatus !== 'Gap Year (Taking a break)';

  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-x-hidden selection:bg-[#22C55E]/30 font-jakarta">
      
      {/* 1. BACKGROUND ENGINE (RESTORED & IMPROVED) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[5%] -left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute -top-[5%] -right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        
        {/* ARCHITECTURAL GRID LINES */}
        <div className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-[20%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute right-[20%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* 2. FIXED HEADER (THE ARCHITECTURAL SHIELD) */}
      <header className="fixed top-0 left-0 w-full z-50 pt-8 sm:pt-12 flex flex-col items-center bg-[#050505]">
        <div className="mb-4 scale-75 sm:scale-85 pointer-events-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0A0A0A] border-[1px] border-white/10 rounded-[24px] flex items-center justify-center rotate-45 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img src="/assets/logo.webp" alt="Logo" className="-rotate-45 w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          </div>
        </div>
        <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-light tracking-tight text-center px-6 leading-tight pb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 font-medium italic">SmartGap</span> Waitlist Form
        </h1>
        
        {/* RAZOR-THIN DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* SMOOTH FADE TRANSITION */}
        <div className="absolute bottom-[-30px] left-0 w-full h-10 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </header>

      {/* 3. MAIN CONTENT AREA */}
      <main className="relative z-10 pt-[210px] sm:pt-[270px] pb-24 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl px-4">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/10 p-6 sm:p-10 rounded-[40px] backdrop-blur-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                
                {/* Inputs Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Full Name</label>
                    <input required type="text" placeholder="Your name" value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Email Address</label>
                    <input required type="email" placeholder="email@example.com" value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                </div>

                {/* Inputs Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">WhatsApp Number</label>
                    <input required type="tel" placeholder="+234..." value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Age</label>
                    <input required type="number" placeholder="20" value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Location</label>
                  <input required type="text" placeholder="Lagos, Nigeria" value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                </div>

                {/* Educational Status */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-white/60 text-[11px] font-medium uppercase tracking-[0.15em]">Educational Status</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['High School Student', 'Gap Year (Taking a break)', 'Higher Institution', 'Graduate'].map((status) => (
                      <label key={status} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.educationalStatus === status ? 'bg-purple-500/10 border-purple-500/50' : 'bg-white/5 border-white/0 hover:bg-white/10'}`}>
                        <input type="radio" name="edu" className="hidden" onChange={() => setFormData({...formData, educationalStatus: status})} />
                        <div className={`w-3.5 h-3.5 rounded-full border ${formData.educationalStatus === status ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`} />
                        <span className="text-[11px] text-white/80">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Referral (THE NEW QUESTION) */}
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">How did you hear about us?</label>
                  <input required type="text" placeholder="Twitter, Instagram, a friend..." value={formData.referral}
                    onChange={(e) => setFormData({...formData, referral: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                </div>

                <button disabled={status === 'loading'} type="submit" className="w-full bg-white text-black font-extrabold py-5 rounded-2xl hover:bg-gray-200 active:scale-[0.98] transition-all mt-4 text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                  {status === 'loading' ? 'Verifying...' : 'Secure Your Spot'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-[48px] p-12 text-center shadow-3xl">
              <h2 className="text-white text-3xl font-medium mb-4 italic">Welcome.</h2>
              <p className="text-white/40 text-sm">You've successfully secured your spot.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 pb-10 text-center z-10">
          <p className="text-white/20 text-[11px] font-jakarta tracking-widest uppercase italic">
            © 2026 All Rights Reserved. Smartan House.
          </p>
        </footer>
      </main>

      {/* CURSOR DOTS */}
      {dots.map((dot, index) => (
        <motion.div key={dot.id} className="fixed pointer-events-none z-[100] rounded-full blur-[1px]"
          style={{ left: dot.x, top: dot.y, width: `${4 + index}px`, height: `${4 + index}px`, backgroundColor: dot.color, transform: 'translate(-50%, -50%)' }} />
      ))}
    </div>
  );
};

export default Waitlist;