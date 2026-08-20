"use client";

import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboardOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight text-white">Platform Overview</h1>
          <p className="text-slate-400 mt-1">Real-time statistics and platform health.</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
            Export Report
          </div>
          <div className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            Platform Settings
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          variants={itemVariants}
          title="Total Citizens" 
          value="1,204" 
          increment="+12% this month"
          icon={<Users className="text-blue-400" />}
          gradient="from-blue-500/20 to-blue-500/0"
          borderColor="border-blue-500/30"
        />
        <StatCard 
          variants={itemVariants}
          title="Verified Agents" 
          value="84" 
          increment="+3 new this week"
          icon={<CheckCircle className="text-emerald-400" />}
          gradient="from-emerald-500/20 to-emerald-500/0"
          borderColor="border-emerald-500/30"
        />
        <StatCard 
          variants={itemVariants}
          title="Total Services" 
          value="3,210" 
          increment="+450 this month"
          icon={<FileText className="text-indigo-400" />}
          gradient="from-indigo-500/20 to-indigo-500/0"
          borderColor="border-indigo-500/30"
        />
        <StatCard 
          variants={itemVariants}
          title="Avg. Turnaround" 
          value="2.4 Days" 
          increment="-0.5 days improvement"
          icon={<Clock className="text-amber-400" />}
          gradient="from-amber-500/20 to-amber-500/0"
          borderColor="border-amber-500/30"
        />
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-6">Service Request Volume</h2>
          {/* Placeholder for a chart (e.g., Recharts) */}
          <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
            <p className="text-slate-500">Chart rendering here (Future Enhancement)</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pending Agent Approvals</h2>
          
          <div className="space-y-4 overflow-y-auto max-h-[330px] pr-2 custom-scrollbar">
            {/* Dummy pending list */}
            {[1,2,3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-200">Rahul Sharma</h3>
                  <p className="text-xs text-slate-400 mt-1">Submitted 2 hours ago</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FileText size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ title, value, increment, icon, gradient, borderColor, variants }: any) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -5 }}
      className={`rounded-2xl bg-slate-900/60 backdrop-blur-xl border ${borderColor} p-6 relative overflow-hidden group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-50`}></div>
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">{value}</h3>
          <p className="text-xs text-emerald-400 mt-2 font-medium bg-emerald-400/10 inline-block px-2 py-0.5 rounded-full">{increment}</p>
        </div>
        <div className={`p-3 rounded-xl bg-slate-800 border ${borderColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
