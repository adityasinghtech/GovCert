"use client";

import { useEffect, useState } from "react";
import { UserCheck, Clock, CheckSquare, Loader2, FileText, ArrowRight, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentTaskMarketplace() {
  const router = useRouter();
  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/agent/requests?type=pending")
      .then(res => res.json())
      .then(data => {
        setPendingTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAcceptTask = async (id: string) => {
    setAssigningId(id);
    try {
      const res = await fetch("/api/agent/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, action: "assign" }),
      });
      if (res.ok) {
        setPendingTasks(prev => prev.filter(t => t.id !== id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAssigningId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      {/* Decorative Blobs */}
      <div className="absolute top-[-50px] left-[-100px] w-96 h-96 bg-teal-400 opacity-10 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute bottom-[20%] right-[-50px] w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 tracking-tight mb-2">
            Task Marketplace
          </h2>
          <p className="text-slate-500 font-medium text-lg">Pick up pending citizen requests and earn your commission.</p>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white/50 px-5 py-3 rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Potential Pool</div>
            <div className="text-sm font-bold text-slate-700">₹{pendingTasks.reduce((acc, t) => acc + (t.service?.serviceCharge || 0), 0)} Available</div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center p-32">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
        </div>
      ) : pendingTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-16 border border-white/50 text-center flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <CheckSquare className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">No pending requests right now</h3>
          <p className="text-slate-500 max-w-sm mx-auto">All citizen requests have been assigned. Keep an eye on this board for new tasks!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {pendingTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-tr from-teal-400 to-emerald-400 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-slate-800 leading-tight">{task.service?.name}</h3>
                      <p className="text-sm text-slate-500 font-medium flex items-center gap-1 mt-1">
                        <UserCheck size={14} className="text-teal-600" /> {task.citizen?.name}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-black rounded-full border border-amber-200 shadow-sm uppercase tracking-wider">
                    Unassigned
                  </div>
                </div>
                
                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Turnaround</p>
                    <p className="font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Clock size={16} className="text-teal-500" /> {task.service?.estimatedTime}
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                    <p className="text-emerald-600/70 text-xs font-bold uppercase tracking-wider mb-1">Commission</p>
                    <p className="font-extrabold text-emerald-700 text-lg">₹{task.service?.serviceCharge}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAcceptTask(task.id)}
                  disabled={assigningId === task.id}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-teal-600 hover:to-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-teal-500/25 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {assigningId === task.id ? (
                    <><Loader2 className="animate-spin" size={20} /> Securing Task...</>
                  ) : (
                    <>Accept Task <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
