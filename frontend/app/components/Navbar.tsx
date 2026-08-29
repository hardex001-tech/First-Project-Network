"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="fixed w-full top-0 z-50 flex flex-col">
      {/* Tier 1: Utility Bar */}
      <div className="bg-zinc-950 text-zinc-400 text-xs py-1.5 px-8 flex justify-between items-center border-b border-white/5">
        <div className="flex gap-4">
          <span>System Status: <span className="text-green-400 font-medium">All Systems Nominal</span></span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline font-mono">v1.0.0-beta</span>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="#" className="hover:text-white transition-colors">Community</Link>
        </div>
      </div>

      {/* Tier 2: Main Floating & Transparent Nav */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-zinc-950/40 backdrop-blur-xl border-b border-white/10 px-8 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight text-white drop-shadow-lg">
            Project<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">-First</span>
          </div>
          <div className="space-x-6 font-medium text-sm flex items-center">
            <Link href="/dashboard" className="text-zinc-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Explore</Link>
            <Link href="/create" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] backdrop-blur-md border border-white/20">
              + Post a Project
            </Link>
            <Link href="/profile" className="text-zinc-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">My Profile</Link>
            <div className="h-4 w-px bg-white/20 mx-2"></div>
            <button onClick={handleLogout} className="text-zinc-400 hover:text-red-400 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}