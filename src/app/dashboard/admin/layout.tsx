"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Users, FileText, Settings, LogOut, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user && (session.user as any).role !== "ADMIN") {
      router.push(`/dashboard/${(session.user as any).role.toLowerCase()}`);
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <p className="text-indigo-300 font-medium tracking-wide animate-pulse">Authenticating Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans selection:bg-indigo-500/30 text-slate-200">
      {/* Premium Glassmorphic Sidebar */}
      <aside className="w-72 relative hidden md:flex flex-col p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl border-r border-white/5 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-0 rounded-r-3xl"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="px-4 py-8 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                <ShieldCheck className="text-indigo-400" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300 tracking-tight">GovernQ</h2>
                <p className="text-xs text-indigo-200/60 uppercase tracking-widest font-semibold mt-1">Admin Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 mt-4">
            <NavItem href="/dashboard/admin" icon={<LayoutDashboard size={20} />} label="Overview" />
            <NavItem href="/dashboard/admin/agents" icon={<Users size={20} />} label="Agent Verification" />
            <NavItem href="/dashboard/admin/services" icon={<FileText size={20} />} label="Service Catalog" />
            <NavItem href="/dashboard/admin/settings" icon={<Settings size={20} />} label="System Settings" />
          </nav>

          <div className="pt-4 border-t border-white/10 mt-auto">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 font-medium group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Secure Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Mesh Gradient Background */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none"></div>

        <header className="h-20 border-b border-white/5 relative z-10 flex items-center justify-between px-10 bg-slate-900/40 backdrop-blur-md">
          <div>
            <h1 className="text-xl font-medium text-white tracking-wide">
              Welcome back, <span className="text-indigo-300 font-semibold">{session.user?.name || "Administrator"}</span>
            </h1>
            <p className="text-sm text-slate-400">Manage your e-governance platform effectively.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
              <UserAvatar name={session.user?.name || "A"} />
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  // In a real app, use usePathname to highlight the active link. 
  // For simplicity, providing hover states mostly here.
  return (
    <Link href={href} className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-400 font-medium hover:bg-white/5 hover:text-indigo-300 transition-all duration-300">
      <div className="text-slate-500 group-hover:text-indigo-400 transition-colors">
        {icon}
      </div>
      <span className="tracking-wide">{label}</span>
    </Link>
  );
}

function UserAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return <span className="text-indigo-300 font-bold text-lg">{initial}</span>;
}
