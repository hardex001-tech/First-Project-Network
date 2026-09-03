"use client";
import React, { useState } from "react";
import { Play, Maximize, Settings, Volume2, Radio, Users } from "lucide-react";

export default function StreamPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex-1 bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden flex flex-col relative group">
      
      {/* Player Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded animate-pulse">
            <Radio className="w-3 h-3" /> Live Lab
          </span>
          <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-bold flex items-center gap-1.5">
            <Users className="w-3 h-3" /> 14.2k
          </div>
        </div>
      </div>

      {/* Mock Video Area (Terminal output) */}
      <div 
        className="flex-1 bg-[#09090b] relative cursor-pointer font-mono text-sm p-6 overflow-hidden"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <div className="text-zinc-500 italic mb-2"># Terminal stream established...</div>
        <div className="text-orange-500 mb-1">root@adex:~# ./run_exploit.sh --target 10.10.10.100</div>
        <div className="text-zinc-300">Initializing payload injection...</div>
        <div className="text-green-500 mt-2">[+] Target responsive. Bypassing EDR hooks.</div>
        <div className="text-green-500">[+] Shellcode injected into memory space.</div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-orange-500">root@adex:~#</span>
          <span className="w-2 h-4 bg-zinc-400 animate-pulse block" />
        </div>

        {/* Big Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center transition-transform transform hover:scale-105">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Player Controls Footer */}
      <div className="h-12 bg-[#18181b] border-t border-zinc-800 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-zinc-400 hover:text-white transition-colors">
            <Play className="w-5 h-5" />
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-zinc-400 font-mono">02:14:38</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}