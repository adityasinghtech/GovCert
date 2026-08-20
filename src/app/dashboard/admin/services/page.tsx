"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, FileSignature, Clock, IndianRupee } from "lucide-react";

export default function ServicesCMS() {
  const [services, setServices] = useState([
    { id: "1", name: "Birth Certificate", desc: "Official record of a person's birth.", estTime: "7-14 Days", charge: 250 },
    { id: "2", name: "Income Certificate", desc: "Proof of annual income for subsidies.", estTime: "5-10 Days", charge: 150 },
    { id: "3", name: "Caste Certificate", desc: "Proof of belonging to a specific caste.", estTime: "15-20 Days", charge: 300 },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Service Catalog (CMS)</h1>
          <p className="text-slate-400">Manage all government services offered on the platform.</p>
        </div>
        
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Create New Service
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                  <FileSignature size={24} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-white/5 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{service.desc}</p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
                <Clock size={16} className="text-emerald-400" />
                {service.estTime}
              </div>
              <div className="flex items-center gap-1 text-slate-300 font-bold bg-white/5 px-3 py-1 rounded-lg">
                <IndianRupee size={14} className="text-slate-400" />
                {service.charge}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Service Modal (Glassmorphic) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create Service</h2>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Service Name</label>
                  <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Domicile Certificate" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea rows={3} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Provide a detailed description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Estimated Time</label>
                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. 10-15 Days" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Service Charge (₹)</label>
                    <input type="number" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/10 flex justify-end gap-3">
                <button 
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-all shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                >
                  Save Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
