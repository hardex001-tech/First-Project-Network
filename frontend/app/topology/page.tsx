"use client";
import React from "react";
import { Network, Zap, User } from "lucide-react";

export default function TopologyMap() {
  return (
    <main className="w-full min-h-screen bg-[#0e0e10] text-zinc-200 font-sans relative overflow-hidden">
      
      {/* HUD Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-[#18181b]/80 backdrop-blur-md border border-zinc-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-orange-500" />
            <h1 className="text-lg font-black text-white tracking-tight uppercase">Network Topology</h1>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Interactive visual mapping of known nodes.</p>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 flex gap-2">
        <button className="bg-[#18181b] border border-zinc-800 px-4 py-2 rounded text-xs font-bold hover:border-orange-500 transition-colors">Center Node</button>
        <button className="bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white px-4 py-2 rounded text-xs font-bold transition-colors">Run Trace</button>
      </div>

      {/* Mock Physics Graph Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#18181b_0%,#0e0e10_100%)]">
        
        {/* Connecting Lines (Simulated SVGs) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="50%" y1="50%" x2="30%" y2="20%" stroke="#ea580c" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#ea580c" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="40%" y2="80%" stroke="#ea580c" strokeWidth="2" />
        </svg>

        {/* Center Node (You) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-transform group-hover:scale-110">
            <User className="w-8 h-8 text-orange-500" />
          </div>
          <span className="mt-2 bg-[#18181b] border border-zinc-800 px-3 py-1 rounded text-xs font-bold text-white shadow-lg">AdeXploit (LAG-01)</span>
        </div>

        {/* Satellite Node 1 */}
        <div className="absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20">
          <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:border-orange-500">
            <Zap className="w-5 h-5 text-zinc-400 group-hover:text-orange-500" />
          </div>
          <span className="mt-2 bg-[#18181b] border border-zinc-800 px-2 py-1 rounded text-[10px] font-bold text-zinc-400">NightByte</span>
        </div>

        {/* Satellite Node 2 */}
        <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20">
          <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:border-orange-500">
            <Zap className="w-5 h-5 text-zinc-400 group-hover:text-orange-500" />
          </div>
          <span className="mt-2 bg-[#18181b] border border-zinc-800 px-2 py-1 rounded text-[10px] font-bold text-zinc-400">ApexRoot</span>
        </div>

      </div>
    </main>
  );
}