"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CopyPlus, Clock, FileText, ArrowRight, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

type Service = {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  serviceCharge: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      {/* Decorative background blobs for glassmorphism effect */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <div className="mb-12">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 tracking-tight leading-tight mb-2">Available Services</h2>
        <p className="text-slate-500 font-medium text-lg">Select a certificate below to view requirements and start your application.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-14 w-14 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-2xl mb-6 shadow-sm"></div>
            <div className="h-4 w-40 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-32 bg-gradient-to-bl from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl -mr-16 -mt-16 z-0"></div>
              
              <div className="relative z-10 flex-col flex h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 transform group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-3 leading-tight">{service.name}</h3>
                <p className="text-slate-500 text-sm mb-8 flex-1 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs font-bold text-slate-600 mb-8 bg-slate-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100/50">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-teal-500" />
                    <span>{service.estimatedTime}</span>
                  </div>
                  <div className="w-px h-6 bg-slate-200"></div>
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-blue-500" />
                    <span>{service.serviceCharge}</span>
                  </div>
                </div>
                
                <Link href={`/dashboard/citizen/services/${service.id}`} className="mt-auto block">
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl group-hover:shadow-blue-900/20">
                    Apply Now <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
