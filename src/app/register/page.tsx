"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Lock, Mail, Loader2, Globe, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CITIZEN");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        const loginRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        
        if (loginRes?.error) {
          setError(loginRes.error);
        } else {
          router.push(`/dashboard/${role.toLowerCase()}`);
        }
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden font-sans">
      {/* Aurora Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[150px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/30 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 sm:p-10"
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-0" />
        
        <div className="relative z-10">
          <div className="text-center mb-8 flex flex-col items-center">
            
            <Link href="/" className="inline-flex items-center justify-center mb-6 group">
              <div className="w-36 h-36 rounded-[2.8rem] bg-gradient-to-b from-white to-slate-50 border border-white/60 flex items-center justify-center shadow-[0_4px_30px_rgba(255,255,255,0.15)] group-hover:shadow-[0_4px_40px_rgba(255,255,255,0.25)] group-hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-20"></div>
                <img src="/l1.png" alt="GovCert Logo" className="w-full h-full object-contain scale-110 translate-y-0.5 hover:scale-[1.15] transition-transform duration-300 drop-shadow-md z-10"/>
              </div>
            </Link>

            <h1 className="text-3xl font-black tracking-tight text-white mb-2">Create Account</h1>
            <p className="text-slate-400 font-medium">Join GovCert platform today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium text-center shadow-inner">
                {error}
              </motion.div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">I am registering as a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("CITIZEN")}
                  className={`py-3 rounded-xl transition-all border font-bold text-sm ${role === "CITIZEN" ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "bg-black/20 border-white/5 text-slate-400 hover:bg-white/5"}`}
                >
                  Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole("AGENT")}
                  className={`py-3 rounded-xl transition-all border font-bold text-sm ${role === "AGENT" ? "bg-indigo-500/10 border-indigo-400/50 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]" : "bg-black/20 border-white/5 text-slate-400 hover:bg-white/5"}`}
                >
                  Service Agent
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-6 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Sign Up Securely <Sparkles size={18} className="group-hover:rotate-12 transition-transform"/></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 font-medium text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-colors">
              Sign In Instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
