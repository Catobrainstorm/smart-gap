import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const Waitlist = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', email: '', whatsapp: '', location: '',
    educationalStatus: '', schoolName: '', dateOfBirth: '', referral: '',
    gender: '', disabilityStatus: '', country: '', state: '', localGovernment: ''
  });
  const [status, setStatus] = useState('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [dots, setDots] = useState([]);
  const [expandedDisability, setExpandedDisability] = useState(null);
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

  const disabilityOptions = [
    { label: 'Visually Impaired', examples: null },
    {
      label: 'All Forms of Body Disabilities',
      examples: ['Cerebral Palsy', 'Muscular Dystrophy', 'Spinal Cord Injury', 'Limb Difference', 'Chronic Pain Conditions', 'etc.']
    },
    {
      label: 'Persons Living With Albinism',
      examples: ['Oculocutaneous Albinism (OCA)', 'Ocular Albinism (OA)', 'Hermansky-Pudlak Syndrome', 'etc.']
    },
    {
      label: 'Divergent Learners',
      examples: ['ADHD', 'Dyslexia', 'Dyscalculia', 'Dyspraxia', 'Autism Spectrum', 'etc.']
    },
    { label: 'Hearing/Speech Impairment', examples: null },
    { label: 'None', examples: null },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-x-hidden selection:bg-[#22C55E]/30 font-jakarta">
      
      {/* 1. BACKGROUND ENGINE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[5%] -left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute -top-[5%] -right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-[20%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute right-[20%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* 2. FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 pt-10 sm:pt-14 flex flex-col items-center bg-[#050505]">
        <div className="mb-8 scale-[1.2] sm:scale-[1.4] pointer-events-auto transition-transform duration-500 hover:scale-[1.3] sm:hover:scale-[1.5]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#0A0A0A] border-[1px] border-white/10 rounded-[30px] flex items-center justify-center rotate-45 shadow-[0_0_80px_rgba(255,255,255,0.08)]">
            <img src="/assets/logo.webp" alt="Logo" className="-rotate-45 w-14 h-14 sm:w-16 sm:h-16 object-contain" />
          </div>
        </div>
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-center px-6 leading-tight pb-8">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 font-medium italic">SmartGap</span> Waitlist Form
        </h1>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-[-40px] left-0 w-full h-12 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </header>

      {/* 3. MAIN CONTENT AREA */}
      <main className="relative z-10 pt-[280px] sm:pt-[340px] pb-24 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div key="form-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl px-4">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/10 p-6 sm:p-10 rounded-[40px] backdrop-blur-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">WhatsApp Number</label>
                    <input required type="tel" placeholder="+234..." value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Date of Birth</label>
                    <input required type="date" value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all [color-scheme:dark]" />
                  </div>
                </div>

                {/* GENDER */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-white/60 text-[11px] font-medium uppercase tracking-[0.15em]">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Male', 'Female'].map((option) => (
                      <label key={option} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.gender === option ? 'bg-purple-500/10 border-purple-500/50' : 'bg-white/5 border-white/0 hover:bg-white/10'}`}>
                        <input type="radio" name="gender" className="hidden" onChange={() => setFormData({...formData, gender: option})} />
                        <div className={`w-3.5 h-3.5 rounded-full border ${formData.gender === option ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`} />
                        <span className="text-[11px] text-white/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* DISABILITY STATUS */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-white/60 text-[11px] font-medium uppercase tracking-[0.15em]">Disability Status</label>
                  <div className="flex flex-col gap-3">
                    {disabilityOptions.map((option) => (
                      <div key={option.label}>
                        {/* Selectable row */}
                        <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.disabilityStatus === option.label ? 'bg-purple-500/10 border-purple-500/50' : 'bg-white/5 border-white/0 hover:bg-white/10'}`}>
                          <input type="radio" name="disability" className="hidden" onChange={() => setFormData({...formData, disabilityStatus: option.label})} />
                          <div className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ${formData.disabilityStatus === option.label ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`} />
                          <span className="text-[11px] text-white/80 flex-1">{option.label}</span>
                          {/* Expand toggle — only for options with examples */}
                          {option.examples && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setExpandedDisability(expandedDisability === option.label ? null : option.label);
                              }}
                              className="ml-auto text-white/20 hover:text-white/60 transition-colors text-[10px] uppercase tracking-widest flex items-center gap-1"
                            >
                              {expandedDisability === option.label ? 'less' : 'see examples'}
                              <span className={`transition-transform duration-200 inline-block ${expandedDisability === option.label ? 'rotate-180' : ''}`}>▾</span>
                            </button>
                          )}
                        </label>

                        {/* Examples dropdown — purely informational */}
                        <AnimatePresence>
                          {option.examples && expandedDisability === option.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-1 mb-1 mx-2 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap gap-2">
                                {option.examples.map((ex) => (
                                  <span key={ex} className="text-[10px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">{ex}</span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COUNTRY, STATE, LGA */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Country of Residence</label>
                  <input required type="text" placeholder="e.g. Nigeria" value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">State of Residence</label>
                    <input required type="text" placeholder="e.g. Lagos" value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Local Government</label>
                    <input required type="text" placeholder="e.g. Ikeja" value={formData.localGovernment}
                      onChange={(e) => setFormData({...formData, localGovernment: e.target.value})}
                      className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Location</label>
                  <input required type="text" placeholder="Lagos, Nigeria" value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                </div>

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

                <AnimatePresence>
                  {shouldShowSchoolInput && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2 pt-2 overflow-hidden">
                      <label className="text-white/40 text-[10px] uppercase tracking-widest ml-1 font-bold">Which school do you attend?</label>
                      <input required type="text" placeholder="Name of institution..." value={formData.schoolName}
                        onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                        className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-white/10" />
                    </motion.div>
                  )}
                </AnimatePresence>

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
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-[48px] p-12 text-center shadow-3xl mx-4">
              <h2 className="text-white text-3xl font-medium mb-4 italic">Welcome.</h2>
              <p className="text-white/40 text-sm">You've successfully secured your spot.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 pb-10 text-center z-10 w-full">
          <p className="text-white/20 text-[11px] font-jakarta tracking-widest uppercase italic text-center">
            © 2026 All Rights Reserved. Smartan House.
          </p>
        </footer>
      </main>

      {dots.map((dot, index) => (
        <motion.div key={dot.id} className="fixed pointer-events-none z-[100] rounded-full blur-[1px]"
          style={{ left: dot.x, top: dot.y, width: `${4 + index}px`, height: `${4 + index}px`, backgroundColor: dot.color, transform: 'translate(-50%, -50%)' }} />
      ))}
    </div>
  );
};

export default Waitlist;