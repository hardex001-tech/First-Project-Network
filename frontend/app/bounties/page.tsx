"use client";
import React, { useState, useEffect } from "react";
import { Target, Search, Filter, Clock, ShieldAlert, Cpu } from "lucide-react";
import ReputationBadge from "../components/ReputationBadge";

export default function BountyBoard() {
  const [bounties, setBounties] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Open Bounties");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        if (res.ok) setBounties(await res.json());
      } catch (error) {
        console.error("Failed to fetch bounties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBounties();
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#0e0e10] text-zinc-200 font-sans p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <header className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-6 h-6 text-orange-500" />
              <h1 className="text-3xl font-black text-white tracking-tight uppercase">Tactical Bounties</h1>
            </div>
            <p className="text-sm text-zinc-400 font-medium max-w-xl">
              Stake your reputation points to crowd-source solutions, or claim open bounties to boost your ranking on the AdeXploit network.
            </p>
          </div>
          <button className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded flex items-center gap-2 transition-colors">
            <ShieldAlert className="w-4 h-4" /> Issue New Bounty
          </button>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-6 border-b border-zinc-800 w-full md:w-auto">
            {["Open Bounties", "Claimed", "My Contracts"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-orange-500 text-orange-500' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search contracts..." 
                className="w-full bg-[#18181b] border border-zinc-800 rounded px-9 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <button className="bg-[#18181b] border border-zinc-800 p-2.5 rounded hover:border-orange-500 transition-colors text-zinc-400">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bounty Grid */}
        {loading ? (
           <div className="text-center py-20 font-mono text-zinc-500 text-sm animate-pulse">
             Querying contract ledger...
           </div>
        ) : bounties.length === 0 ? (
           <div className="text-center py-20 font-mono text-zinc-500 text-sm">
             No active bounties detected on the network.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bounties.map((bounty) => (
              <div key={bounty.id} className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors group flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    <Cpu className="w-3.5 h-3.5" /> Contract {bounty.id.substring(0, 8)}
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 ${bounty.status === 'open' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                    {(bounty.status || "OPEN").toUpperCase()}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-orange-500 transition-colors mb-2 leading-tight">
                  {bounty.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs text-zinc-500">Issued by</span>
                  <img src={bounty.issuer?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${bounty.issuer?.handle}&backgroundColor=ea580c`} className="w-5 h-5 rounded" alt={bounty.issuer?.handle} />
                  <span className="text-xs font-bold text-zinc-300">@{bounty.issuer?.handle}</span>
                  {bounty.issuer?.handle === "ApexRoot" && <ReputationBadge type="core-node" />}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                  <div className="flex gap-2">
                    {bounty.tags?.map((tag: string) => (
                      <span key={tag} className="bg-[#0e0e10] border border-zinc-800 px-2 py-1 rounded text-[10px] font-bold text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-lg font-black text-emerald-400">
                      {bounty.reward} <span className="text-[10px] uppercase tracking-widest text-emerald-500/70">REP</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}