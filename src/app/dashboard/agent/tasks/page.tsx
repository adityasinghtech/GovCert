"use client";

import { useEffect, useState } from "react";
import { UserCheck, CheckCircle2, Loader2, FileText, UploadCloud, FileCheck, Check, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentTasksExecution() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/agent/requests?type=my-tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/agent/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, action: "updateStatus", status: newStatus }),
      });
      if (res.ok) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFileUpload = async (id: string, file: File) => {
    setUpdatingId(id);
    try {
      const formData = new FormData();
      formData.append("requestId", id);
      formData.append("file", file);

      const res = await fetch("/api/agent/requests", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const body = await res.json();
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "COMPLETED", completedDocs: body.request.completedDocs } : t));
      }
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors: any = {
    "ACCEPTED": "bg-blue-100 text-blue-700 border-blue-200",
    "IN_PROGRESS": "bg-amber-100 text-amber-700 border-amber-200",
    "COMPLETED": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="mb-10">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight mb-2">My Execution Desk</h2>
        <p className="text-slate-500 font-medium text-lg">Manage your active service requests, process documents, and mark as completed.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-32">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
        </div>
      ) : tasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-16 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
            <CheckCircle2 className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">No active tasks in progress</h3>
          <p className="text-slate-500 text-lg">You have cleared your execution queue. Excellent work!</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {tasks.map((task, idx) => {
              const userDocs = task.userDocs ? JSON.parse(task.userDocs) : [];
              const rawFormData = task.formData ? JSON.parse(task.formData) : null;
              
              // Filter out system fields like file metadata if they leaked into formData 
              // and format keys nicely
              const displayData = rawFormData ? Object.entries(rawFormData).filter(([k,v]) => typeof v === 'string' && v.trim() !== '') : [];

              return (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
                >
                  {/* Header Row */}
                  <div className="p-6 md:p-8 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-2xl text-slate-800 tracking-tight leading-tight mb-1">{task.service?.name}</h3>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                          <UserCheck size={16} className="text-blue-500" /> {task.citizen?.name} <span className="text-slate-300 mx-1">|</span> {task.citizen?.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${statusColors[task.status] || "bg-slate-100 text-slate-600"}`}>
                        {task.status.replace("_", " ")}
                      </span>
                      
                      <div className="relative">
                        <select
                          disabled={updatingId === task.id || task.status === "COMPLETED"}
                          value={task.status}
                          onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                          className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-50 transition-all cursor-pointer hover:bg-slate-100"
                        >
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          {updatingId === task.id ? <Loader2 size={16} className="animate-spin text-teal-600" /> : <ChevronDownIcon size={16} />}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Row */}
                  <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 bg-slate-50/50">
                    <div className="flex-1 block">
                      
                      {displayData.length > 0 && (
                        <div className="mb-8 relative">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:mb-4 mb-5 gap-3">
                            <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                              <FileText size={18} className="text-slate-400" /> Application Form Details
                            </h4>
                            
                            {/* Auto Government Portal Routing */}
                            {displayData.find(([k]) => k.toLowerCase() === 'state')?.[1] && (
                              <a 
                                href={
                                  (displayData.find(([k]) => k.toLowerCase() === 'state')?.[1] as string).toLowerCase().includes('uttar pradesh') ? 'https://edistrict.up.gov.in/' :
                                  (displayData.find(([k]) => k.toLowerCase() === 'state')?.[1] as string).toLowerCase().includes('delhi') ? 'https://edistrict.delhigovt.nic.in/' :
                                  (displayData.find(([k]) => k.toLowerCase() === 'state')?.[1] as string).toLowerCase().includes('maharashtra') ? 'https://aaplesarkar.mahaonline.gov.in/' :
                                  'https://www.india.gov.in/'
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 px-3 py-1.5 rounded-lg shadow-sm transition-all"
                              >
                                Open {(displayData.find(([k]) => k.toLowerCase() === 'state')?.[1] as string)} Portal <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {displayData.map(([key, value], i) => (
                                <div key={i} className="flex flex-col">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span className="text-sm font-bold text-slate-800 break-words">
                                    {value as string}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <FileCheck size={18} className="text-slate-400" /> Citizen Attached Documents
                      </h4>
                      {userDocs.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {userDocs.map((doc: any, i: number) => (
                            <a 
                              key={i} 
                              href={doc.path} 
                              target="_blank" 
                              rel="noreferrer"
                              className="group flex items-center gap-3 bg-white px-5 py-3 border border-slate-200 rounded-xl shadow-sm hover:border-teal-400 transition-all text-sm font-bold text-slate-700 cursor-pointer hover:shadow-md"
                            >
                              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                <FileText size={18} />
                              </div>
                              {doc.name}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 bg-slate-100/50 border border-slate-200 border-dashed rounded-2xl text-center">
                          <p className="text-sm font-medium text-slate-500">No documents attached.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="lg:w-80 shrink-0">
                      <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-5 border-b border-slate-200 pb-2">Certificate Issuer</h4>
                      {task.status === "COMPLETED" ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Check className="w-6 h-6 text-emerald-600" />
                          </div>
                          <h5 className="font-bold text-emerald-800">Final Certificate Delivered</h5>
                          <p className="text-xs font-medium text-emerald-600/70 mt-1 mb-3">Available in citizen's dashboard</p>
                          {task.completedDocs && (
                            <a 
                              href={JSON.parse(task.completedDocs)[0]?.path} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-xs font-bold text-emerald-700 bg-emerald-100/50 block py-2 rounded-lg hover:bg-emerald-200 transition-colors"
                            >
                              View PDF
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="relative bg-white border text-center border-slate-200 border-dashed rounded-2xl p-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                          <input 
                            type="file" 
                            accept=".pdf,.png,.jpg"
                            key={updatingId === task.id ? 'uploading' : 'idle'}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(task.id, e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            disabled={updatingId === task.id || task.status === "PENDING" || task.status === "ACCEPTED"}
                          />
                          <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white transition-colors">
                            {updatingId === task.id ? <Loader2 className="w-5 h-5 text-teal-500 animate-spin" /> : <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />}
                          </div>
                          <h5 className="font-bold text-slate-700 text-sm">Upload Government PDF</h5>
                          <p className="text-xs text-slate-500 mt-1 mb-4">Choose file to complete task.</p>
                          <button className={`font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg w-full transition-colors ${
                            task.status === "IN_PROGRESS" 
                            ? "bg-slate-900 text-white hover:bg-slate-800"
                            : "bg-slate-200 text-slate-400 pointer-events-none"
                          }`}>
                            {task.status === "IN_PROGRESS" ? "Select File" : "Requires 'IN PROGRESS'"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
