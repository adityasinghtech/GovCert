"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShieldAlert, ShieldCheck, FileText, ChevronRight, Check } from "lucide-react";

export default function AgentVerificationModule() {
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app we'd fetch this from a Server Action or API
  // Demonstrating premium UI with dummy data for the execution phase.
  useEffect(() => {
    setTimeout(() => {
      setAgents([
        { id: "1", name: "Ramesh Verma", email: "ramesh.v@example.com", isVerified: false, kycDocs: "Aadhar_Front.jpg, Aadhar_Back.jpg", date: "2026-08-20" },
        { id: "2", name: "Sita Kumari", email: "sita@example.com", isVerified: true, kycDocs: "Completed", date: "2026-08-19" },
        { id: "3", name: "Priya Singh", email: "priya.s@example.com", isVerified: false, kycDocs: "Pending_Upload", date: "2026-08-19" },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleVerify = (id: string) => {
    // Optimistic UI update
    setAgents(prev => prev.map(a => a.id === id ? { ...a, isVerified: true } : a));
    // In actual implementation: await fetch(`/api/admin/agents/${id}/verify`, { method: 'POST' })
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Agent Verification</h1>
          <p className="text-slate-400">Review and approve new service agents before they can accept tasks.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search agents..." 
            className="pl-10 pr-4 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-64"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Agent Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Submitted On</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">KYC Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Approval</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-3"></div>
                      Loading agent pool...
                    </div>
                  </td>
                </tr>
              ) : agents.map((agent, idx) => (
                <motion.tr 
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="hover:bg-white/[0.03] transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-indigo-300 transition-colors">{agent.name}</div>
                        <div className="text-sm text-slate-500">{agent.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-400">
                    {agent.date}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-slate-500" />
                        <span className="truncate max-w-[150px]">{agent.kycDocs}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {agent.isVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                        <ShieldCheck size={14} />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                        <ShieldAlert size={14} />
                        Pending Review
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {!agent.isVerified ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-slate-300 hover:bg-white/10 transition-colors">
                          View KYC
                        </button>
                        <button 
                          onClick={() => handleVerify(agent.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-all shadow-[0_0_10px_rgba(99,102,241,0.2)] flex items-center gap-1"
                        >
                          <Check size={14} /> Approve
                        </button>
                      </div>
                    ) : (
                      <button className="text-slate-500 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-white/5">
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
