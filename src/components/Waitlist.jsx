import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const Waitlist = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', email: '', whatsapp: '',
    educationalStatus: '', schoolName: '', dateOfBirth: '', referral: '',
    gender: '', disabilityStatus: '', country: '', state: '', localGovernment: ''
  });
  const [status, setStatus] = useState('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [dots, setDots] = useState([]);
  const [expandedDisability, setExpandedDisability] = useState(null);
  
  const formSectionRef = useRef(null);
  const timerRef = useRef(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      await addDoc(collection(db, "waitlist"), { ...formData, timestamp: serverTimestamp() });
      setSubmittedEmail(formData.email);
      setStatus('success');
    } catch (error) {
      console.error("Firebase Error:", error);
      setStatus('error');
    }
  };

  const shouldShowSchoolInput = formData.educationalStatus && formData.educationalStatus !== 'Gap Year (Taking a break)';

  const disabilityOptions = [
    { label: 'Visually Impaired', examples: null },
    { label: 'All Forms of Body Disabilities', examples: ['Cerebral Palsy', 'Limb Difference', 'etc.'] },
    { label: 'Persons Living With Albinism', examples: ['OCA', 'OA', 'etc.'] },
    { label: 'Divergent Learners', examples: ['ADHD', 'Autism Spectrum', 'Dyslexia', 'etc.'] },
    { label: 'Hearing/Speech Impairment', examples: null },
    { label: 'None', examples: null },
  ];

  return (
    <div className="w-full bg-[#050505] selection:bg-purple-500/30">
      
      {/* 1. HERO CARD SECTION */}
      <section className="px-4 md:px-8 lg:px-12 pt-10 md:pt-20 pb-20 relative overflow-x-clip">
        <div className="max-w-[1400px] mx-auto bg-[#0D0D0D] border border-white/[0.05] rounded-[40px] md:rounded-[60px] relative overflow-hidden md:overflow-visible p-8 md:p-16 lg:p-24 min-h-[700px] md:min-h-[850px] flex flex-col justify-center md:justify-start z-20 shadow-2xl">
          
          {/* INCREASED LOGO SIZE */}
          <div className="mb-10 md:mb-14">
            <img src="/assets/logo.webp" alt="Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
          </div>

          <div className="relative z-30 max-w-4xl space-y-8">
            {/* RESTORED FORMER TEXT */}
            <h1 className="text-white text-[38px] md:text-[60px] lg:text-[82px] font-medium leading-[1.1] tracking-tight">
              A Structured Philosophy <br />
              and Growth System.
            </h1>
            
            <div className="space-y-8 max-w-2xl">
              <p className="font-jakarta text-white/40 text-[16px] lg:text-[18px] leading-relaxed">
                Most people are overwhelmed, distracted, and guessing their way through life. SmartGap fixes that. 
                You move through structured modules that build how you think, how you work, and how you make decisions. 
                SmartGap is not a course, it's a personalized, gamified platform that gives you clarity, direction, and the tools to build a life on purpose.
              </p>

              {/* ADDED THE LINE YOU LIKED */}
              <div className="border-l-2 border-orange-500/30 pl-5 space-y-2">
                <p className="font-jakarta text-white/30 text-[14px] leading-relaxed">
                  Sponsor the next generation or early-bird self-fund using the Impact button. <br />
                  Standard applicants: Join the waitlist below.
                </p>
              </div>
            </div>

            {/* BUTTONS - Z-Index boosted to stay above illustration */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 relative z-50">
              <a href="https://impact.smartanhouse.org/" target="_blank" rel="noreferrer" 
                 className="px-10 py-5 bg-white text-black font-extrabold rounded-2xl hover:bg-gray-100 transition-all text-center uppercase tracking-widest text-[10px]">
                Pay to Impact
              </a>
              <button onClick={scrollToForm} 
                      className="px-10 py-5 bg-white/5 border border-white/10 text-white font-extrabold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]">
                Join Waitlist
              </button>
            </div>
          </div>

          {/* ILLUSTRATION - MOBILE FIX (Background, Low Opacity) */}
          <div className="absolute 
              bottom-[-50px] right-[-30px] opacity-10 
              md:bottom-[-150px] md:right-[5%] md:opacity-100 
              lg:bottom-[-200px] lg:right-[-100px] 
              pointer-events-none z-10 transition-all duration-700">
            <motion.img 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "power4.out" }}
              src="/assets/illustrate-1.webp" 
              alt="Illustration" 
              className="w-[320px] sm:w-[500px] lg:w-[850px] h-auto drop-shadow-[0_0_120px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section ref={formSectionRef} className="py-24 px-6 relative flex flex-col items-center bg-[#050505] z-10">
        <div className="max-w-xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-12">
                <div className="text-center">
                  <h2 className="text-white text-2xl font-light tracking-[0.2em] uppercase">Join the Waitlist</h2>
                  <div className="w-10 h-[1px] bg-purple-500/50 mx-auto mt-4" />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/10 p-7 md:p-12 rounded-[45px] backdrop-blur-[40px] shadow-3xl">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-white/40 text-[9px] uppercase font-bold ml-1">Full Name</label>
                      <input required type="text" placeholder="Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white focus:border-purple-500/50 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/40 text-[9px] uppercase font-bold ml-1">Email Address</label>
                      <input required type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white focus:border-purple-500/50 outline-none transition-all" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-white/40 text-[9px] uppercase font-bold ml-1">WhatsApp</label>
                      <input required type="tel" placeholder="+234" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white focus:border-purple-500/50 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/40 text-[9px] uppercase font-bold ml-1">Date of Birth</label>
                      <input required type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white focus:border-purple-500/50 [color-scheme:dark] outline-none transition-all" />
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-white/60 text-[11px] uppercase tracking-widest font-bold">Gender</label>
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

                  {/* Disability Section */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-white/60 text-[11px] uppercase tracking-widest font-bold">Disability Status</label>
                    <div className="flex flex-col gap-3">
                      {disabilityOptions.map((option) => (
                        <div key={option.label}>
                          <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.disabilityStatus === option.label ? 'bg-purple-500/10 border-purple-500/50' : 'bg-white/5 border-white/0 hover:bg-white/10'}`}>
                            <input type="radio" name="disability" className="hidden" onChange={() => setFormData({...formData, disabilityStatus: option.label})} />
                            <div className={`w-3.5 h-3.5 rounded-full border ${formData.disabilityStatus === option.label ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`} />
                            <span className="text-[11px] text-white/80 flex-1">{option.label}</span>
                            {option.examples && (
                              <button type="button" onClick={(e) => { e.preventDefault(); setExpandedDisability(expandedDisability === option.label ? null : option.label); }} className="text-white/20 text-[9px] uppercase font-bold tracking-widest">
                                {expandedDisability === option.label ? 'less' : 'info'} ▾
                              </button>
                            )}
                          </label>
                          <AnimatePresence>
                            {option.examples && expandedDisability === option.label && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                <div className="mt-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap gap-2 mx-2">
                                  {option.examples.map((ex) => <span key={ex} className="text-[9px] text-white/30 bg-white/5 px-3 py-1.5 rounded-full">{ex}</span>)}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Residence */}
                  <div className="space-y-4 border-t border-white/5 pt-4">
                    <input required type="text" placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                    <div className="grid grid-cols-2 gap-5">
                      <input required type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                      <input required type="text" placeholder="LGA" value={formData.localGovernment} onChange={(e) => setFormData({...formData, localGovernment: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-white/60 text-[11px] uppercase font-bold">Educational Status</label>
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
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                        <input required type="text" placeholder="Institution Name" value={formData.schoolName} onChange={(e) => setFormData({...formData, schoolName: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <input required type="text" placeholder="How did you hear about us?" value={formData.referral} onChange={(e) => setFormData({...formData, referral: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                  </div>

                  <button disabled={status === 'loading'} type="submit" className="w-full bg-white text-black font-extrabold py-5 rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-[0.2em] text-[10px]">
                    {status === 'loading' ? 'Processing...' : 'Secure Your Spot'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-[48px] p-12 text-center shadow-3xl mx-auto">
                <h2 className="text-white text-3xl font-medium mb-4 italic">Welcome.</h2>
                <p className="text-white/40 text-sm">You've successfully secured your spot.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-24 pb-10 text-center w-full relative z-20">
          <p className="text-white/20 text-[10px] font-jakarta tracking-[0.3em] uppercase italic">
            © 2026 All Rights Reserved. Smartan House.
          </p>
        </footer>
      </section>

      {/* CURSOR TRAIL */}
      {dots.map((dot, index) => (
        <motion.div key={dot.id} className="fixed pointer-events-none z-[100] rounded-full blur-[1px]"
          style={{ left: dot.x, top: dot.y, width: `${4 + index}px`, height: `${4 + index}px`, backgroundColor: dot.color, transform: 'translate(-50%, -50%)', opacity: (index + 1) / 10 }} />
      ))}
    </div>
  );
};

export default Waitlist;