"use client";
import React, { useState } from "react";
import { Terminal } from "lucide-react";
import ReputationBadge from "./ReputationBadge";

export default function LiveChat() {
  const [chatInput, setChatInput] = useState("");

  return (
    <aside className="w-full lg:w-80 bg-[#18181b] border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
      <div className="p-4 border-b border-zinc-800 bg-[#18181b] flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        <Terminal className="w-4 h-4" /> Live Comms
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0e0e10]">
        <div className="text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest my-2">
          Encrypted WebRTC Session Started
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-orange-500 text-xs">NightByte: </span>
            <ReputationBadge type="zero-day" />
          </div>
          <span className="text-zinc-300 text-sm">Are you going to pivot through the SMB share?</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-400 text-xs">AdeXploit: </span>
            <ReputationBadge type="core-node" />
          </div>
          <span className="text-zinc-300 text-sm">Check the LDAP headers first. Might be a honeypot.</span>
        </div>
      </div>

      <div className="p-4 bg-[#18181b] border-t border-zinc-800">
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Inject payload..." 
          className="w-full bg-[#0e0e10] border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>
    </aside>
  );
}