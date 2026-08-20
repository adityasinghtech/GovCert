"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, UploadCloud, Loader2, CheckCircle2, ChevronRight, FileCheck, ShieldAlert, FileText } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  id: string;
  name: string;
  description: string;
  requiredDocs: string;
  estimatedTime: string;
  serviceCharge: number;
};

export default function ApplyServiceWizard({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { data: session } = useSession();
  const resolvedParams = use(params);
  
  const [service, setService] = useState<Service | null>(null);
  const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    state: "",
    district: "",
    gender: "Male"
  });
  
  // File state mapping docName -> File
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/services/${resolvedParams.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch service");
        return res.json();
      })
      .then(data => {
        setService(data);
        const docs = JSON.parse(data.requiredDocs) as string[];
        setRequiredDocs(docs);
        
        // Initialize file state
        const initialFiles: any = {};
        docs.forEach((doc: string) => initialFiles[doc] = null);
        setFiles(initialFiles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Could not load service details");
        setLoading(false);
      });
  }, [resolvedParams.id]);

  const handleFileChange = (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [docName]: file }));
  };

  const calculateProgress = () => {
    if (requiredDocs.length === 0) return 0;
    const uploaded = requiredDocs.filter(d => files[d] !== null).length;
    return (uploaded / requiredDocs.length) * 100;
  };

  const canProceedToPayment = calculateProgress() === 100;

  const handleSubmit = async () => {
    if (!session?.user) return;
    setSubmitting(true);
    setError("");

      try {
      const formPayload = new FormData();
      formPayload.append("citizenId", (session.user as any).id);
      formPayload.append("serviceId", service!.id);
      formPayload.append("formDataJSON", JSON.stringify(formData));
      
      Object.entries(files).forEach(([docName, file]) => {
        if (file) {
          formPayload.append(`file_${docName}`, file);
        }
      });

      const res = await fetch("/api/requests", {
        method: "POST",
        body: formPayload,
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/citizen");
        }, 3000);
      } else {
        const body = await res.json();
        setError(body.message || "Failed to submit application");
        setSubmitting(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing Secure Application Wizard...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center p-20 flex flex-col items-center">
        <ShieldAlert size={48} className="text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Service Not Found</h2>
        <p className="text-slate-500 mt-2">The service you are looking for does not exist or was removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 mt-6 relative">
      {/* Glow Effects */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <Link href="/dashboard/citizen/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-medium transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-8 transition-all"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
              {service.name}
            </h2>
            <p className="text-slate-500">{service.description}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium shrink-0">
            <div className="bg-white/60 border border-indigo-100 shadow-sm text-indigo-700 px-4 py-2 rounded-xl">Est: {service.estimatedTime}</div>
            <div className="bg-white/60 border border-emerald-100 shadow-sm text-emerald-700 px-4 py-2 rounded-xl">Fee: ₹{service.serviceCharge}</div>
          </div>
        </div>

        {/* Dynamic Stepper */}
        {!success && (
          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 -translate-y-1/2 z-0 rounded-full transition-all duration-500 ease-out"
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "25%" : step === 2 ? "75%" : "100%" }}
            />
            
            <StepperItem label="Requirements" stepNum={1} currentStep={step} completed={step > 1} />
            <StepperItem label="Application Details" stepNum={2} currentStep={step} completed={step > 2} />
            <StepperItem label="Document Upload" stepNum={3} currentStep={step} completed={step > 3} />
            <StepperItem label="Review & Submit" stepNum={4} currentStep={step} completed={step > 4} />
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-16 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/mesh.png')] opacity-20 object-cover pointer-events-none"></div>
            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-400 rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30 text-white"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h3 className="text-3xl font-black text-slate-800 mb-3">Application Safely Submitted!</h3>
              <p className="text-slate-500 text-lg">Your documents are encrypted and sent to our verified agents. Redirecting to your dashboard trace...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] min-h-[400px] flex flex-col"
          >
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 mb-6 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 font-medium flex items-center gap-2">
                <ShieldAlert size={18} /> {error}
              </motion.div>
            )}

            {step === 1 && (
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FileCheck className="text-indigo-500" /> Mandatory Checklist
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Before we proceed, please ensure you have clear, scanned copies or photographs of the following original documents.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requiredDocs.map((doc, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500 font-bold text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 flex justify-end">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2"
                  >
                    Proceed to Upload <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FileText className="text-indigo-500" /> Application Details
                </h3>
                <div className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Applicant Full Name</label>
                      <input 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                        placeholder="As per Government ID" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth</label>
                      <input 
                        type="date" 
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">State</label>
                      <select 
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                      >
                        <option value="">Select State</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">District</label>
                      <input 
                        type="text" 
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                        placeholder="City/District" 
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    disabled={!formData.fullName || !formData.dateOfBirth || !formData.state || !formData.district}
                    className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <UploadCloud className="text-indigo-500" /> Document Upload
                  </h3>
                  <div className="bg-slate-100 px-3 py-1 rounded-full text-sm font-bold text-slate-600">
                    {Math.round(calculateProgress())}% Complete
                  </div>
                </div>
                
                <div className="flex-1 grid gap-4 content-start">
                  {requiredDocs.map((doc, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      className={`border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                        files[doc] ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div>
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          {doc} {files[doc] && <CheckCircle2 size={16} className="text-emerald-500" />}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">Accepts PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="file" 
                          id={`file-${idx}`}
                          onChange={(e) => handleFileChange(doc, e)}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label 
                          htmlFor={`file-${idx}`}
                          className={`cursor-pointer w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                            files[doc] 
                              ? "bg-white border border-emerald-200 text-emerald-700 shadow-sm"
                              : "bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 shadow-sm"
                          }`}
                        >
                          {files[doc] ? (
                             `${files[doc]?.name.substring(0, 15)}...`
                          ) : (
                             <><UploadCloud size={16} /> Select File</>
                          )}
                        </label>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    disabled={!canProceedToPayment}
                    className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    Review Final Details <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Review & Final Submission</h3>
                
                <div className="flex-1">
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold text-slate-800 mb-4 border-b border-indigo-200/50 pb-2">Uploaded Artifacts</h4>
                    <ul className="space-y-3">
                      {requiredDocs.map((doc, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-slate-600 font-medium">{doc}</span>
                          <span className="font-semibold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14}/> Attached</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-800">Total Due Today</h4>
                      <p className="text-xs text-slate-500 mt-1">Platform and processing fees</p>
                    </div>
                    <div className="text-2xl font-black text-indigo-600">₹{service.serviceCharge}</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                  <button 
                    onClick={() => setStep(3)}
                    disabled={submitting}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={submitting}
                    className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {submitting ? <><Loader2 className="animate-spin" size={18} /> Encrypting...</> : "Submit & Assign Agent"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepperItem({ label, stepNum, currentStep, completed }: any) {
  const active = currentStep === stepNum;
  return (
    <div className="relative z-10 flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-300 border-[3px] 
        ${completed ? 'bg-indigo-500 border-indigo-200 text-white' : 
          active ? 'bg-white border-indigo-500 text-indigo-600' : 'bg-white border-slate-200 text-slate-400'}`}>
        {completed ? <CheckCircle2 size={18} /> : stepNum}
      </div>
      <span className={`absolute -bottom-6 text-xs font-bold whitespace-nowrap transition-colors ${active || completed ? 'text-indigo-600' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}
