"use client";

import { useSession } from "next-auth/react";
import { User, Mail, Shield, LogOut, Award, Wallet, TrendingUp, Calendar, CreditCard, Clock, FileText } from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function AgentProfileAndEarnings() {
  const { data: session } = useSession();
  
  if (!session?.user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading secure profile...</p>
      </div>
    );
  }

  const user = session.user as any;

  // Mock Earnings Data for UI visualization
  const earnings = {
    total: 45200,
    thisMonth: 12500,
    pendingClearance: 3200,
    completedTasks: 84
  };

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="absolute top-[-100px] left-[50%] w-[800px] h-96 bg-teal-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply -translate-x-1/2 pointer-events-none"></div>

      <div className="mb-10">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 tracking-tight leading-tight mb-2">Partner Profile & Earnings</h2>
        <p className="text-slate-500 font-medium text-lg">Manage your account and track your revenue securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-200/30 to-transparent rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-32 h-32 bg-slate-900 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl mb-6 relative">
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  <Shield size={18} className="text-white" />
                </div>
                <span className="text-4xl text-teal-400 font-black uppercase">
                  {user.name ? user.name.charAt(0) : "A"}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">{user.name || "Service Partner"}</h3>
              <p className="text-slate-500 font-medium text-sm mb-6 flex items-center gap-1.5"><Mail size={14}/> {user.email}</p>
              
              <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Status</span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide border border-emerald-200">Verified</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                </div>
              </div>

              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full mt-auto flex items-center justify-center gap-2 px-6 py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold rounded-2xl transition-colors border border-rose-100"
              >
                <LogOut size={18} /> Secure Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Earnings & Ledger */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-32 bg-gradient-to-bl from-teal-400/20 to-transparent opacity-100 rounded-full blur-3xl -mr-16 -mt-16 z-0 pointer-events-none"></div>
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-8">
                   <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                     <Wallet className="text-teal-300" size={24} />
                   </div>
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-teal-200">Lifetime Earnings</div>
                 </div>
                 <h3 className="text-5xl font-black tracking-tighter mb-2">₹{earnings.total.toLocaleString()}</h3>
                 <p className="text-slate-400 text-sm font-medium flex items-center gap-1"><TrendingUp size={14} className="text-emerald-400" /> Top 10% performer in your region</p>
               </div>
             </div>

             <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100/50">
                   <Calendar className="text-blue-500" size={24} />
                 </div>
                 <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500">This Month</div>
               </div>
               <div className="flex items-end gap-3 mb-4">
                 <h3 className="text-4xl font-black text-slate-800 tracking-tighter">₹{earnings.thisMonth.toLocaleString()}</h3>
                 <span className="text-emerald-500 text-sm font-bold mb-2">+12.5%</span>
               </div>
               
               <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex justify-between items-center text-sm">
                 <span className="font-semibold text-amber-700 flex items-center gap-1.5"><Clock size={14}/> Pending Clearance</span>
                 <span className="font-black text-amber-800">₹{earnings.pendingClearance.toLocaleString()}</span>
               </div>
             </div>
          </div>

          {/* Detailed Ledger */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800">Withdrawal History & Ledger</h3>
               <button className="px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-lg">Link Bank Account</button>
             </div>

             {/* Dummy Ledger Table */}
             <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white/50">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-50/80 border-b border-slate-100">
                     <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                     <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Description</th>
                     <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {[
                     { date: "Aug 15, 2026", desc: "Auto Bank Transfer", status: "Settled", amt: 5200, pos: false },
                     { date: "Aug 14, 2026", desc: "Birth Certificate (#A8F9K)", status: "Cleared", amt: 250, pos: true },
                     { date: "Aug 12, 2026", desc: "Income Certificate (#Y2B1M)", status: "Cleared", amt: 150, pos: true },
                     { date: "Aug 10, 2026", desc: "Auto Bank Transfer", status: "Settled", amt: 3100, pos: false },
                   ].map((row, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                       <td className="px-5 py-4 text-sm text-slate-500 font-medium">{row.date}</td>
                       <td className="px-5 py-4 text-sm font-semibold text-slate-700 flex items-center gap-2">
                         {row.pos ? <FileText size={14} className="text-indigo-400"/> : <CreditCard size={14} className="text-slate-400"/>} {row.desc}
                       </td>
                       <td className="px-5 py-4">
                         <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${row.status === 'Settled' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>{row.status}</span>
                       </td>
                       <td className={`px-5 py-4 text-right text-sm font-black ${row.pos ? 'text-emerald-600' : 'text-slate-700'}`}>
                         {row.pos ? '+' : '-'}₹{row.amt}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
