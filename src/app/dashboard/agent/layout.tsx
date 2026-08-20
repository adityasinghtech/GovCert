"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, CheckSquare, User, LogOut } from "lucide-react";

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user && (session.user as any).role !== "AGENT") {
      router.push(`/dashboard/${(session.user as any).role.toLowerCase()}`);
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex text-white">
        <div className="p-6 border-b border-white/10">
          <div className="relative flex items-center justify-center px-4 py-1.5 ml-1 bg-gradient-to-b from-white to-slate-50 rounded-full shadow-[0_2px_15px_rgba(255,255,255,0.1)] border border-white/60 overflow-hidden w-fit">
             <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-20"></div>
             <img src="/GOVCERT_logo_transparent.png" alt="GovCert" className="relative z-10 h-[22px] scale-[1.25] object-contain" />
          </div>
          <p className="text-xs text-slate-400 mt-1">Service Agent Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard/agent" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-teal-400 font-medium pb-2">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/agent/tasks" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 font-medium hover:bg-white/5 transition-colors">
            <CheckSquare size={20} />
            <span>My Tasks</span>
          </Link>
          <Link href="/dashboard/agent/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 font-medium hover:bg-white/5 transition-colors">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-medium text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-slate-800">Welcome, Agent {session.user?.name}</h1>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
