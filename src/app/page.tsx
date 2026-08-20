"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronRight, FileText, Globe, Sparkles, Building2, Lock, Zap, MousePointerClick, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PremiumLandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Motion Variants
  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030712] text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* 2026 Immersive Animated Aurora Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/40 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
         <div className="absolute top-[20%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/30 blur-[130px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
         <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-blue-900/30 blur-[140px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]"></div>
         
         {/* Subtle Noise Texture */}
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
         
         {/* Premium Glass Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Glassmorphic Cyber Navbar */}
      <motion.nav 
        style={{ y: headerY }}
        className="fixed top-0 inset-x-0 z-50 px-6 pt-2 pb-4 transition-all"
      >
        <div className="max-w-7xl mx-auto h-[70px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center justify-between px-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <Link href="/" className="relative z-10 block group">
            <div className="relative flex items-center justify-center px-4 py-1.5 bg-gradient-to-b from-white to-slate-50 rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] border border-white/60 group-hover:shadow-[0_4px_25px_rgba(255,255,255,0.25)] group-hover:-translate-y-0.5 transition-all overflow-hidden">
               <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-20"></div>
               <img src="/GOVCERT_logo_transparent.png" alt="GovCert" className="relative z-10 h-[22px] md:h-[28px] scale-[1.25] object-contain drop-shadow-sm opacity-95" />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 relative z-10 text-sm font-semibold">
            <Link href="#features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
            <Link href="#about" className="text-slate-300 hover:text-white transition-colors">About Us</Link>
            <div className="w-[1px] h-4 bg-white/10"></div>
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all font-bold"
              >
                Launch Portal
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10 flex flex-col items-center pt-24 pb-32">
        
        {/* HYPER-MODERN HERO SECTION */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-7xl mx-auto px-6 grid xl:grid-cols-2 gap-16 items-center min-h-[70vh]"
        >
          {/* Left Hero Text */}
          <div className="text-center xl:text-left flex flex-col items-center xl:items-start relative z-20">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-5 shadow-[0_0_20px_rgba(99,102,241,0.15)] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-xs font-black tracking-widest text-indigo-300 uppercase">Simple, Secure, Fast</span>
            </motion.div>

            <div className="relative z-20">
              {/* Cinematic Lighting & Graphics Effect */}
              <div className="absolute top-1/2 left-0 xl:-left-12 w-full xl:w-[120%] h-[120%] -translate-y-1/2 bg-gradient-to-tr from-indigo-500/20 via-cyan-500/20 to-purple-500/10 blur-[80px] -z-10 animate-pulse mix-blend-screen pointer-events-none rounded-full"></div>

              <style>{`
                @keyframes shine {
                  from { background-position: 200% center; }
                  to { background-position: -200% center; }
                }
                .text-shine {
                  background-image: linear-gradient(110deg, #ffffff 40%, rgba(94, 234, 212, 0.8) 48%, rgba(99, 102, 241, 0.8) 52%, #ffffff 60%);
                  background-size: 200% auto;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: shine 4s linear infinite;
                }
              `}</style>
              <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-tight text-white mb-6 flex flex-col justify-center xl:items-start items-center leading-[1.05] sm:leading-[1.1]">
                <span className="text-shine drop-shadow-[0px_0px_15px_rgba(255,255,255,0.2)] pb-1">
                  Government
                </span>
                <span className="text-shine drop-shadow-[0px_0px_15px_rgba(255,255,255,0.2)] pb-2">
                  Certificates
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 drop-shadow-[0_0_25px_rgba(45,212,191,0.4)] mt-2">
                  Made Easy
                </span>
              </motion.h1>
            </div>

            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-400 font-medium mb-8 leading-relaxed max-w-2xl">
               Skip the endless queues and complex paperwork. Connect with verified local agents who manage the entire certificate process for you from your doorstep.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto group">
                <button className="relative w-full sm:w-auto h-16 px-10 rounded-2xl bg-white text-slate-900 font-black text-lg transition-all flex items-center justify-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-2">Request Service <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                </button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto group">
                <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-xl transition-all flex items-center justify-center gap-2">
                   Track Application <MousePointerClick size={20} className="text-cyan-400 group-hover:rotate-12 transition-transform"/>
                </button>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center xl:justify-start gap-8 text-sm font-bold text-slate-400">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                   <CheckCircle2 size={16} className="text-emerald-400"/>
                 </div>
                 Trusted Local Agents
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                   <Lock size={16} className="text-cyan-400"/>
                 </div>
                 100% Secure Process
               </div>
            </motion.div>
          </div>

          {/* Right Visual 3D Hologram Effect */}
          <motion.div 
            variants={fadeUp}
            className="relative w-full h-[540px] hidden xl:block perspective-1000"
          >
             <div className="absolute inset-0 rotate-x-12 rotate-y-[-10deg] hover:rotate-x-0 hover:rotate-y-0 transition-all duration-700 ease-out transform-style-3d">
                {/* Main Glass Panel */}
                <div className="absolute inset-4 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-2xl border border-slate-600/40 shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_20px_80px_rgba(34,211,238,0.15)] overflow-hidden">
                   {/* Animated Scanner line */}
                   <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 blur-sm animate-[scan_3s_ease-in-out_infinite]"></div>
                   
                   <div className="p-7 h-full flex flex-col justify-between">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shadow-inner"><Building2 size={22} className="text-indigo-400"/></div>
                         <div>
                           <div className="h-2.5 w-24 bg-slate-600/60 rounded-full mb-2.5"></div>
                           <div className="h-2 w-16 bg-slate-700/60 rounded-full"></div>
                         </div>
                       </div>
                       <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold tracking-widest uppercase rounded-lg border border-emerald-500/30">Verified</span>
                     </div>

                     {/* Middle Holographic Document Scan Area */}
                     <div className="flex-1 w-full my-6 relative flex items-center justify-center overflow-visible">
                        <div className="absolute inset-x-4 inset-y-2 bg-cyan-950/20 border border-cyan-500/10 rounded-3xl backdrop-blur-sm shadow-inner"></div>
                        
                        <motion.div 
                          className="w-[160px] h-[220px] bg-slate-800/80 backdrop-blur-2xl rounded-2xl border border-slate-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.1)] relative p-5 flex flex-col block z-10"
                        >
                           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 shadow-inner"></div>
                           
                           <div className="space-y-3 mt-6 w-full">
                             <div className="h-2 w-full bg-slate-600/50 rounded-full"></div>
                             <div className="h-2 w-4/5 bg-slate-600/50 rounded-full"></div>
                             <div className="h-2 w-full bg-slate-600/50 rounded-full"></div>
                             <div className="h-2 w-3/4 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse mt-1"></div>
                           </div>
                           
                           <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                             <CheckCircle2 size={18} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                           </div>
                           
                           {/* Holographic scanning laser */}
                           <motion.div 
                             initial={{ top: "-10%" }}
                             animate={{ top: "110%" }}
                             transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatType: "loop" }}
                             className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_25px_2px_#22d3ee] z-20"
                           />
                           {/* Scanner gradient tail */}
                           <motion.div 
                             initial={{ top: "-30%" }}
                             animate={{ top: "110%" }}
                             transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatType: "loop" }}
                             className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent to-cyan-400/20 z-10"
                           />
                        </motion.div>
                     </div>

                     <div className="space-y-3">
                        <div className="w-full h-14 bg-slate-800/50 rounded-xl border border-slate-600/30 flex items-center p-3 gap-4">
                           <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30"><CheckCircle2 size={16} className="text-emerald-400"/></div>
                           <div className="flex-1 h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                             <div className="w-[100%] h-full bg-emerald-400 shadow-[0_0_12px_#34d399]"></div>
                           </div>
                        </div>
                        <div className="w-full h-14 bg-slate-800/50 rounded-xl border border-slate-600/30 flex items-center p-3 gap-4">
                           <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"><Zap size={16} className="text-indigo-400"/></div>
                           <div className="flex-1 h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                             <div className="w-[65%] h-full bg-gradient-to-r from-indigo-500 to-cyan-400 relative">
                               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                             </div>
                           </div>
                        </div>
                     </div>
                   </div>
                </div>

                {/* Floating Elements (3D Depth) */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -right-6 top-24 w-52 bg-emerald-950/70 backdrop-blur-2xl p-4 rounded-xl border border-emerald-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.6)] translate-z-50"
                >
                   <div className="flex items-center gap-3 mb-3">
                     <ShieldCheck size={18} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                     <span className="text-xs font-bold text-emerald-100 tracking-wider">AUTHORIZED SCAN</span>
                   </div>
                   <div className="h-1.5 w-full bg-emerald-900/60 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: "0%" }}
                       animate={{ width: "100%" }}
                       transition={{ repeat: Infinity, duration: 2.5, ease: "circInOut" }}
                       className="h-full bg-emerald-400 shadow-[0_0_10px_#34d399]"
                     />
                   </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }} 
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-10 bottom-32 w-64 bg-slate-900/90 backdrop-blur-3xl p-5 rounded-2xl border border-cyan-500/30 shadow-[0_25px_50px_rgba(0,0,0,0.7)] translate-z-40"
                >
                   <div className="flex items-center gap-4">
                     <div className="relative">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)] text-white text-lg font-bold">A</div>
                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-[3px] border-slate-900 shadow-[0_0_12px_#34d399]"></div>
                     </div>
                     <div>
                       <div className="text-sm font-bold text-white mb-0.5">Agent Assigned</div>
                       <div className="text-[11px] text-cyan-300 font-medium">Processing scan securely...</div>
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>
          
        </motion.div>

        {/* BENTO GRID FEATURES */}
        <div className="w-full max-w-7xl mx-auto px-6 mt-32 relative z-20" id="features">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUp}
             className="text-center mb-10"
           >
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Citizens.</span></h2>
             <p className="text-base text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">We have simplified the process of applying for essential certificates, saving your time and eliminating the hassle of paperwork.</p>
           </motion.div>
           
           <div className="grid md:grid-cols-3 gap-5 auto-rows-[220px]">
             {/* Feature 1 */}
             <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 border border-white/10 overflow-hidden relative group"
             >
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2"></div>
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 border border-white/10 shadow-inner backdrop-blur-md relative z-10">
                   <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Verified Local Experts</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-md relative z-10">
                   Every service partner on our platform goes through strict background and identity checks so you get reliable doorstep assistance.
                 </p>
             </motion.div>

             {/* Feature 2 */}
             <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-1 bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 border border-white/10 relative overflow-hidden group"
             >
                 <div className="absolute right-0 top-0 w-48 h-48 bg-cyan-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4 border border-white/10 relative z-10">
                   <Clock size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3 relative z-10">Fast-Track Processing</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium relative z-10">
                   Enjoy a smooth, guided process that minimizes delays and manual errors in your application.
                 </p>
             </motion.div>

             {/* Feature 3 */}
             <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-1 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-[1.5rem] p-6 border border-white/20 relative overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.3)] group"
             >
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                 <h3 className="text-3xl font-black text-white mb-1 relative z-10 mt-3">Live Updates</h3>
                 <p className="text-cyan-100 font-bold uppercase tracking-widest text-[10px] relative z-10 mb-2">Real-Time Tracking</p>
                 <p className="text-indigo-100 text-xs mt-2 relative z-10">Track exactly where your application is at any given moment directly from your phone or computer.</p>
             </motion.div>

             {/* Feature 4 */}
             <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 border border-white/10 overflow-hidden relative group flex flex-col justify-end"
             >
                 <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/20 to-transparent"></div>
                 <div className="absolute top-6 left-6 w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20 relative z-10">
                   <Lock size={24} />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2 relative z-10 mt-14">Strict Privacy & Security</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-lg relative z-10">
                   Your personal documents and data are securely encrypted. Only your assigned agent accesses them solely for application purposes.
                 </p>
             </motion.div>
           </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="w-full max-w-7xl mx-auto px-6 mt-32 relative z-20" id="about">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUp}
             className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12"
           >
             <div className="flex-1">
               <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Mission.</span></h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-6 font-medium">
                 Many government certificates require multiple visits and complex procedures. GovCert was founded to bridge the gap between citizens and essential public services, ensuring everyone gets what they need without the hassle.
               </p>
               <p className="text-slate-400 text-lg leading-relaxed font-medium">
                 We connect busy professionals, elderly citizens, and rural users directly to verified local agents who manage the entire documentation lifecycle from doorstep to delivery.
               </p>
             </div>
             <div className="flex-1 w-full relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-[60px] rounded-full group-hover:blur-[80px] transition-all"></div>
               <div className="relative bg-black/40 border border-white/10 rounded-3xl p-8 aspect-video flex flex-col items-center justify-center text-center backdrop-blur-md">
                  <Globe size={48} className="text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  <h3 className="text-2xl font-bold text-white mb-2">Digitizing Public Service</h3>
                  <p className="text-slate-400 font-medium">Built for 2026 E-Governance Standards</p>
               </div>
             </div>
           </motion.div>
        </div>

        {/* FAQ SECTION */}
        <div className="w-full max-w-4xl mx-auto px-6 mt-32 relative z-20" id="faq">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUp}
             className="text-center mb-12"
           >
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Questions</span></h2>
           </motion.div>

           <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4">
             {[
               { q: "Are the service agents verified?", a: "Yes, every agent on our platform undergoes a strict background check, KYC verification, and performance audit before they can accept requests." },
               { q: "How long does a certificate take?", a: "Most certificates are processed within government-mandated timelines. Our agents fast-track the paperwork to avoid any manual delays." },
               { q: "Are my documents secure?", a: "Absolutely. Your documents are securely encrypted and are only accessible by your assigned agent for filing purposes." },
               { q: "How do I pay for the service?", a: "Currently, you pay the transparent service fee directly to the agent upon successful completion. Online payments are coming soon." }
             ].map((faq, i) => (
               <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition-colors">
                 <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>{faq.q}</h3>
                 <p className="text-slate-400 text-sm font-medium pl-5 border-l border-white/5 ml-1">{faq.a}</p>
               </div>
             ))}
           </motion.div>
        </div>

        {/* CYBER CTA TRENCH */}
        <div className="w-full max-w-7xl mx-auto px-6 mt-40 mb-20 relative z-20">
            <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               className="rounded-[3rem] bg-black/40 backdrop-blur-3xl overflow-hidden flex flex-col items-center justify-center text-center p-14 md:p-24 relative border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 to-cyan-600/30 blur-[130px] rounded-full pointer-events-none mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                
                <h3 className="text-5xl md:text-7xl font-black text-white mb-8 relative z-10 tracking-tighter">Ready to skip the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">lines?</span></h3>
                <p className="text-slate-300 text-xl font-medium mb-12 max-w-2xl relative z-10">Apply for your first government certificate entirely online today.</p>
                
                <Link href="/register" className="relative z-10">
                  <button className="h-16 px-12 rounded-2xl bg-white text-black font-black text-lg hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3">
                    Create Free Account <Zap className="text-indigo-600 fill-indigo-600" size={20} />
                  </button>
                </Link>
            </motion.div>
        </div>

      </main>

      <footer className="w-full bg-black/40 border-t border-white/10 backdrop-blur-3xl pt-20 pb-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block relative z-10 mb-8 group">
                <div className="relative flex items-center justify-center px-5 py-2 bg-gradient-to-b from-white to-slate-50 rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] border border-white/60 group-hover:shadow-[0_4px_30px_rgba(255,255,255,0.25)] transition-all overflow-hidden cursor-pointer">
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-20"></div>
                  <img src="/GOVCERT_logo_transparent.png" alt="GovCert" className="relative z-10 h-[28px] scale-[1.25] object-contain opacity-95" />
                </div>
              </Link>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                Simplifying government document processing with trusted local agents and a military-grade secure architecture.
              </p>
              <div className="flex gap-4">
                <a href="mailto:support@govcert.online" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all border border-white/5">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Platform Column */}
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6 tracking-wide">Platform</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li><Link href="/login" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Track Application</Link></li>
                <li><Link href="/register" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Become an Agent</Link></li>
                <li><Link href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Platform Features</Link></li>
                <li><Link href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Security Protocol</Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6 tracking-wide">Services</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li><Link href="/dashboard/citizen" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Income Certificate</Link></li>
                <li><Link href="/dashboard/citizen" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Caste Certificate</Link></li>
                <li><Link href="/dashboard/citizen" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Domicile Certificate</Link></li>
                <li><Link href="/dashboard/citizen" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Doorstep KYC</Link></li>
              </ul>
            </div>

            {/* Help & Company Column */}
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6 tracking-wide">Company & Help</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li><Link href="#about" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> About Us</Link></li>
                <li><Link href="#faq" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Help Center (FAQ)</Link></li>
                <li><Link href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Security Vault</Link></li>
                <li><a href="mailto:support@govcert.online" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500"/> Contact Support</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm font-semibold">
              © {new Date().getFullYear()} GovCert Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold hover:text-emerald-400 transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
