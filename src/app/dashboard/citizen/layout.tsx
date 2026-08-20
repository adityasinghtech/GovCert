"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, User, LogOut, HelpCircle } from "lucide-react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user && (session.user as any).role !== "CITIZEN") {
      router.push(`/dashboard/${(session.user as any).role.toLowerCase()}`);
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-68 bg-white/90 backdrop-blur-xl border-r border-slate-200/60 flex flex-col hidden md:flex z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 border-b border-slate-100/80 flex flex-col items-center justify-center bg-white/50">
          <div className="w-full flex justify-center mb-4">
            <img src="/logo.png" alt="GovCert Logo" className="w-[150px] h-auto object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-[10px] uppercase font-extrabold tracking-[0.25em] px-4 py-1.5 rounded-full border border-blue-200/50 shadow-sm">
             Citizen Portal
          </div>
        </div>
        <nav className="flex-1 p-5 space-y-2.5">
          <li>
            <Link href="/dashboard/citizen" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold ${pathname === '/dashboard/citizen' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <LayoutDashboard size={20} className={pathname === '/dashboard/citizen' ? 'text-white' : 'text-slate-400'} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/citizen/services" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold ${pathname.startsWith('/dashboard/citizen/services') ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <FileText size={20} className={pathname.startsWith('/dashboard/citizen/services') ? 'text-white' : 'text-slate-400'} />
              New Request
            </Link>
          </li>
          <li>
            <Link href="/dashboard/citizen/profile" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold ${pathname.startsWith('/dashboard/citizen/profile') ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <User size={20} className={pathname.startsWith('/dashboard/citizen/profile') ? 'text-white' : 'text-slate-400'} />
              Profile
            </Link>
          </li>
          <li>
            <Link href="/dashboard/citizen/support" className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold ${pathname.startsWith('/dashboard/citizen/support') ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
              <HelpCircle size={20} className={pathname.startsWith('/dashboard/citizen/support') ? 'text-white' : 'text-slate-400'} />
              Help & Support
            </Link>
          </li>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Left Side: Professional 3D Branding (Above the welcome area) */}
          <div className="flex items-center group">
            <img 
              src="/name.png" 
              alt="GovCert" 
              className="h-[70px] md:h-[90px] w-auto mix-blend-multiply opacity-100 drop-shadow-md group-hover:scale-[1.3] transition-transform duration-300 scale-[1.3] ml-6 lg:ml-10 origin-left" 
            />
          </div>

          {/* Right Side: User Profile Chip */}
          <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-full pl-2.5 pr-5 py-2 cursor-pointer shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-md">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-700 leading-none">{session?.user?.name}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 leading-none tracking-wider">Citizen</span>
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
