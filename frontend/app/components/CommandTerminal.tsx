"use client";
import React, { useState, useEffect } from "react";
import { Terminal, Search, Zap, User, Network, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommandTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Listen for Ctrl+K to toggle the terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const runCommand = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-[#0e0e10]/80 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-2xl bg-[#18181b] border border-orange-500/50 rounded-xl shadow-[0_0_40px_rgba(234,88,12,0.15)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Terminal Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-[#0e0e10]">
          <Terminal className="w-5 h-5 text-orange-500" />
          <input 
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g., > nmap scan)"
            className="flex-1 bg-transparent border-none text-zinc-100 placeholder-zinc-600 focus:outline-none text-sm font-mono"
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">ESC</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-orange-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Command List */}
        <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto font-mono text-sm">
          <div className="px-3 py-2 text-xs font-bold text-zinc-600 uppercase tracking-widest">Global Navigation</div>
          
          <button onClick={() => runCommand('/dashboard')} className="w-full flex items-center gap-3 px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-orange-500/10 rounded-lg group transition-colors text-left">
            <Zap className="w-4 h-4 text-zinc-500 group-hover:text-orange-500" />
            <span>Switch to <span className="font-bold text-white group-hover:text-orange-500">Live Feed</span></span>
          </button>
          
          <button onClick={() => runCommand('/network')} className="w-full flex items-center gap-3 px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-orange-500/10 rounded-lg group transition-colors text-left">
            <Network className="w-4 h-4 text-zinc-500 group-hover:text-orange-500" />
            <span>Scan <span className="font-bold text-white group-hover:text-orange-500">Active Nodes</span></span>
          </button>

          <button onClick={() => runCommand('/profile')} className="w-full flex items-center gap-3 px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-orange-500/10 rounded-lg group transition-colors text-left">
            <User className="w-4 h-4 text-zinc-500 group-hover:text-orange-500" />
            <span>Configure <span className="font-bold text-white group-hover:text-orange-500">Local Profile</span></span>
          </button>

          <div className="px-3 py-2 text-xs font-bold text-zinc-600 uppercase tracking-widest mt-4">System Actions</div>
          
          <button className="w-full flex items-center justify-between px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg group transition-colors text-left">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-zinc-500" />
              <span>Query global payload database...</span>
            </div>
            <span className="text-[10px] text-zinc-600 bg-[#0e0e10] px-2 py-1 rounded">ENTER</span>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-[#0e0e10] border-t border-zinc-800 px-4 py-2 flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <span><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 mr-1">↑</kbd> <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 mr-1">↓</kbd> Navigate</span>
          <span><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 mr-1">Enter</kbd> Execute</span>
        </div>

      </div>
    </div>
  );
}