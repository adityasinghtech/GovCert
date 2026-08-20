"use client";

import { useSession } from "next-auth/react";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function CitizenProfilePage() {
  const { data: session } = useSession();
  
  if (!session?.user) {
    return <div className="p-8">Loading profile...</div>;
  }

  const user = session.user as any;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">My Profile</h2>
          <p className="text-slate-500">View and manage your account details.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-tr from-blue-100 to-teal-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-4">
              <span className="text-4xl text-blue-600 font-bold uppercase">
                {user.name ? user.name.charAt(0) : "U"}
              </span>
            </div>
            <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 border border-teal-200">
              <Shield size={14} />
              {user.role}
            </div>
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                  <User size={16} /> Full Name
                </div>
                <div className="font-semibold text-slate-800 text-lg">{user.name || "N/A"}</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                  <Mail size={16} /> Email Address
                </div>
                <div className="font-semibold text-slate-800 text-lg">{user.email}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Account Actions</h3>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
