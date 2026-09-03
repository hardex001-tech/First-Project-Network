"use client";
import React from "react";
import Link from "next/link";
import { Terminal, LogOut, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { handle, logout } = useAuth();

  return (
    <nav className="h-16 w-full bg-[#0e0e10] border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md">
      {/* Platform Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center shadow-[0_0_10px_rgba(234,88,12,0.3)]">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-black text-white tracking-tighter">AdeXploit</span>
      </div>

      {/* Center Navigation (Only visible if authenticated) */}
      {handle && (
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-zinc-400 uppercase tracking-wide">
          <Link href="/dashboard" className="hover:text-orange-500 transition-colors">Live Feed</Link>
          <Link href="/network" className="hover:text-orange-500 transition-colors">Network</Link>
          <Link href="/bounties" className="hover:text-orange-500 transition-colors">Bounties</Link>
          <Link href="/stream" className="hover:text-orange-500 transition-colors">Live Labs</Link>
          <Link href="/settings" className="hover:text-orange-500 transition-colors">Settings</Link>
        </div>
      )}

      {/* Right Side: Dynamic Auth State */}
      {handle ? (
        <div className="flex items-center gap-4">
          <Bell className="w-4 h-4 text-zinc-500 hover:text-orange-500 cursor-pointer transition-colors" />
          
          {/* Active User Badge */}
          <div className="flex items-center gap-2 bg-[#18181b] border border-zinc-800 px-3 py-1.5 rounded-full shadow-inner">
            <div className="w-6 h-6 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center font-bold text-xs uppercase">
              {handle.substring(0, 2)}
            </div>
            <span className="text-sm font-bold text-zinc-200">@{handle}</span>
          </div>

          {/* Disconnect Node Button */}
          <button 
            onClick={logout} 
            className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" 
            title="Disconnect Node"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Login</Link>
          <Link href="/register" className="text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors">Initialize Node</Link>
        </div>
      )}
    </nav>
  );
}