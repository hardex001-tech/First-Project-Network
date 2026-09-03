"use client";
import React from "react";
import Link from "next/link";
import { Terminal, Shield, Radio, Zap, ChevronRight, GitBranch } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="w-full min-h-[calc(100vh-140px)] bg-[#0e0e10] text-zinc-200 font-sans flex flex-col items-center pt-20 pb-16 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] w-full flex flex-col items-center relative z-10 text-center mb-20">
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#18181b] border border-zinc-800 rounded-full text-xs font-bold text-zinc-400 mb-8 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          AdeXploit Core v2.0 Online
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
          Deploy. Exploit. <br className="hidden md:block" />
          <span className="text-orange-500">Collaborate.</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          The premier broadcast and intelligence platform for offensive security engineering. Connect with active nodes, stream live lab environments, and share zero-day payloads in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard" className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded flex items-center gap-2 transition-colors">
            <Terminal className="w-5 h-5" /> Initialize Session
          </Link>
          <Link href="/network" className="px-8 py-4 bg-[#18181b] border border-zinc-800 text-zinc-300 font-bold rounded hover:border-zinc-600 transition-colors flex items-center gap-2">
            View Active Nodes <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 hover:border-orange-500/50 transition-colors">
          <div className="w-12 h-12 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-3">Live Intelligence</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Monitor the global feed for real-time telemetry, architectural updates, and new CVE disclosures directly from top researchers.
          </p>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 hover:border-orange-500/50 transition-colors">
          <div className="w-12 h-12 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
            <Radio className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-3">Broadcast Labs</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Stream your penetration testing environments via low-latency WebRTC. Collaborate with your network on active exploits.
          </p>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 hover:border-orange-500/50 transition-colors">
          <div className="w-12 h-12 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
            <GitBranch className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-3">Tactical Networking</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Build your roster of offensive security engineers. Filter active nodes by clearances, tactical skills, and geographic location.
          </p>
        </div>

      </div>
    </main>
  );
}