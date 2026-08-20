"use client";

import { useEffect, useState } from "react";
import { Clock, FileText, CheckCircle, CopyPlus, User, Star, ChevronRight, FileCheck, LogOut, ArrowRight, Home, Download } from 'lucide-react';
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function CitizenDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name ? session.user.name.split(' ')[0] : '';
  
  const [servicesCount, setServicesCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [requests, setRequests] = useState<any[]>([]);
  const [expandedTrackerId, setExpandedTrackerId] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch available services count
    fetch("/api/services").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setServicesCount(data.length);
    }).catch(console.error);

    // Fetch user requests for dashboard stats
    fetch("/api/citizen/requests").then(res => res.json()).then(data => {
      if (Array.isArray(data)) {
        setRequests(data);
        if (data.length > 0) setExpandedTrackerId(data[0].id);
        const pending = data.filter(req => req.status !== "COMPLETED" && req.status !== "REJECTED").length;
        const completed = data.filter(req => req.status === "COMPLETED").length;
        setPendingCount(pending);
        setCompletedCount(completed);
      }
    }).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      {/* Decorative background blobs for glassmorphism effect */}
      <div className="absolute top-[-50px] left-[-20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[80px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '12s' }}></div>
      
      {/* Welcome Header */}
      <div className="mb-12 relative overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Citizen Portal
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-3 text-slate-900">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 capitalize">{userName}</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-md leading-snug">Manage your digital documents, track active applications, and request new government services directly.</p>
        </div>
        
        {/* Professional Date Widget */}
        <div className="relative z-10 flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/50 p-4 rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.03)] shrink-0 group hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
            <Clock size={22} className="animate-[spin_4s_linear_infinite]" style={{ animationDuration: '10s' }} />
          </div>
          <div className="pr-2">
            <div className="text-sm font-black text-slate-900 tracking-tight">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
              {new Date().getFullYear()} • Secure Session
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
        <Link href="/dashboard/citizen/services" className="block outline-none h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative p-8 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl border border-blue-100/50 rounded-3xl shadow-[0_8px_30px_rgb(59,130,246,0.06)] hover:shadow-[0_20px_40px_rgb(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full cursor-pointer">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <CopyPlus size={26} strokeWidth={2.5} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                     <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
               </div>
              <div>
                <p className="text-blue-600/80 font-black uppercase tracking-[0.2em] text-[10px] mb-1.5">Available Services</p>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{servicesCount}</h3>
              </div>
            </div>
          </motion.div>
        </Link>
        
        <a href="#trackers" className="block outline-none h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative p-8 bg-gradient-to-br from-white to-amber-50/50 backdrop-blur-xl border border-amber-100/50 rounded-3xl shadow-[0_8px_30px_rgb(245,158,11,0.06)] hover:shadow-[0_20px_40px_rgb(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full cursor-pointer">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white text-amber-500 rounded-2xl flex items-center justify-center shadow-sm border border-amber-100 group-hover:scale-110 transition-transform duration-300">
                    <Clock size={26} strokeWidth={2.5} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors">
                     <ArrowRight size={14} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>
               </div>
              <div>
                <p className="text-amber-600/80 font-black uppercase tracking-[0.2em] text-[10px] mb-1.5">Pending Requests</p>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{pendingCount}</h3>
              </div>
            </div>
          </motion.div>
        </a>
        
        <a href="#trackers" className="block outline-none h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative p-8 bg-gradient-to-br from-white to-emerald-50/50 backdrop-blur-xl border border-emerald-100/50 rounded-3xl shadow-[0_8px_30px_rgb(16,185,129,0.06)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full cursor-pointer">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white text-emerald-500 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle size={26} strokeWidth={2.5} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                     <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
               </div>
              <div>
                <p className="text-emerald-600/80 font-black uppercase tracking-[0.2em] text-[10px] mb-1.5">Completed</p>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{completedCount}</h3>
              </div>
            </div>
          </motion.div>
        </a>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} id="trackers" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Trackers</h3>
             <p className="text-slate-500 text-sm mt-1 font-semibold bg-white/50 backdrop-blur px-3 py-1 rounded-lg border border-slate-200 inline-block shadow-sm">Real-time status of your applications</p>
          </div>
          <Link href="/dashboard/citizen/services">
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-7 py-3.5 rounded-2xl font-bold tracking-wide transition-all shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_25px_rgba(59,130,246,0.4)] hover:-translate-y-1">
              <CopyPlus size={18} /> New Request
            </button>
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="text-slate-300 w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">No active applications</h4>
            <p className="text-slate-500 font-medium">You haven't requested any certificates yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((req, index) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
              >
                {/* Header of the request card */}
                <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-start md:items-center justify-between bg-slate-50/50 flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-50 text-slate-600 flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                      <CopyPlus size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg leading-tight tracking-tight">{req.service?.name}</h4>
                      <div className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">Request #{req.id.slice(-8).toUpperCase()} • Applied {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedTrackerId(expandedTrackerId === req.id ? null : req.id)}
                    className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors flex items-center gap-1 shadow-sm shrink-0 w-full md:w-auto justify-center"
                  >
                    {expandedTrackerId === req.id ? 'Hide Details' : 'Track Details'} 
                    <ChevronRight size={16} className={`transition-transform duration-300 ${expandedTrackerId === req.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
                
                <div className={`transition-all duration-500 ease-in-out grid ${expandedTrackerId === req.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-10 border-t border-slate-100/60 bg-white/20">
                      {/* Progress Timeline */}
                      <div className="flex-1 relative">
                    <div className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-slate-200"></div>
                    
                    {/* Step 1: Request Submitted */}
                    <div className="relative flex items-start gap-5 mb-8 group">
                      <div className={`w-6 h-6 rounded-full shadow-[0_0_0_4px_white] flex items-center justify-center z-10 shrink-0 text-white mt-1 border ${req.status !== 'REJECTED' ? 'bg-emerald-500 border-emerald-600' : 'bg-rose-500 border-rose-600'}`}>
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 tracking-tight text-sm">Request Submitted</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Your application has been received into the system.</div>
                      </div>
                    </div>
                    
                    {/* Step 2: Agent Assigned */}
                    <div className="relative flex items-start gap-5 mb-8 group">
                      <div className={`w-6 h-6 rounded-full shadow-[0_0_0_4px_white] flex items-center justify-center z-10 shrink-0 mt-1 border ${['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(req.status) ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-200 border-slate-300'}`}>
                         {['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(req.status) && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div>
                        <div className={`font-black tracking-tight text-sm ${['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(req.status) ? 'text-slate-900' : 'text-slate-400'}`}>Agent Assigned & Verified</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Documents verified by service partner.</div>
                      </div>
                    </div>
                    
                    {/* Step 3: In Progress */}
                    <div className="relative flex items-start gap-5 mb-8 group">
                      <div className={`w-6 h-6 rounded-full shadow-[0_0_0_4px_white] flex items-center justify-center z-10 shrink-0 mt-1 border ${req.status === 'IN_PROGRESS' ? 'bg-blue-500 border-blue-600 ring-4 ring-blue-100 animate-pulse' : ['COMPLETED'].includes(req.status) ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-200 border-slate-300'}`}>
                         {['COMPLETED'].includes(req.status) ? <CheckCircle size={12} className="text-white" /> : req.status === 'IN_PROGRESS' ? <div className="w-2 h-2 rounded-full bg-white"></div> : null}
                      </div>
                      <div>
                        <div className={`font-black tracking-tight text-sm ${req.status === 'IN_PROGRESS' ? 'text-blue-600' : ['COMPLETED'].includes(req.status) ? 'text-slate-900' : 'text-slate-400'}`}>Application in Progress</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Currently processing with local government authority.</div>
                      </div>
                    </div>
                    
                    {/* Step 4: Completed */}
                    <div className="relative flex items-start gap-5 group">
                      <div className={`w-6 h-6 rounded-full shadow-[0_0_0_4px_white] flex items-center justify-center z-10 shrink-0 mt-1 border ${req.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-200 border-slate-300'}`}>
                         {req.status === 'COMPLETED' && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className={`font-black tracking-tight text-sm ${req.status === 'COMPLETED' ? 'text-emerald-600' : 'text-slate-400'}`}>Completed</div>
                        {req.status === 'COMPLETED' ? (
                          <div className="mt-2">
                            <div className="text-[11px] text-slate-500 font-medium mb-3">Your certificate has been issued by the authority.</div>
                            {req.completedDocs ? (
                              <div className="flex flex-col gap-2">
                                {JSON.parse(req.completedDocs).map((doc: any, i: number) => (
                                  <a 
                                    key={i}
                                    href={doc.path} 
                                    download 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold transition-all w-fit shadow-sm"
                                  >
                                    <Download size={14} /> 
                                    Download {doc.name || 'Certificate'}
                                  </a>
                                ))}
                              </div>
                            ) : (
                               <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold w-fit shadow-sm">
                                  <CheckCircle size={14} /> Certificate Approved
                               </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Certificate generation pending.</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Partner & Processing Info */}
                  <div className="lg:w-[320px] shrink-0 space-y-4">
                    <div className="border border-slate-200/60 rounded-2xl p-5 bg-slate-50/50 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                        <CheckCircle size={10} /> Verified
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Your Service Partner</div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200/50 shadow-inner">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="font-black text-slate-900 tracking-tight text-sm">Raj Digital Services</div>
                          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-black mt-0.5">
                             <Star size={12} className="fill-amber-500" /> 4.8 <span className="text-slate-400 font-semibold ml-1 text-[10px]">• 2.4 km away</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-2.5 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm">Contact local partner</button>
                    </div>
                    
                    <div className="border border-amber-200/50 rounded-2xl p-4 bg-amber-50/30">
                      <div className="flex items-start gap-3">
                        <Clock className="text-amber-500 mt-0.5 shrink-0" size={16} />
                        <div>
                          <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Estimated Timeline</div>
                          <div className="text-sm font-black text-amber-600 mt-1 mb-0.5 tracking-tight">Typically {req.service?.estimatedTime}</div>
                          <div className="text-[9px] text-slate-500 leading-snug font-semibold mt-1">Final processing time depends exclusively on the concerned government authority processing queue.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
