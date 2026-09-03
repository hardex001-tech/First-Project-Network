"use client";
import React, { useState, useEffect } from "react";
import { Users, Search, MessageSquare, Shield, Activity } from "lucide-react";

export default function NetworkPage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        if (res.ok) {
          const data = await res.json();
          setNodes(data);
        }
      } catch (error) {
        console.error("Failed to fetch network nodes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNodes();
  }, []);

  const filteredNodes = nodes.filter(node => 
    node.handle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full min-h-[calc(100vh-64px)] bg-[#0e0e10] text-zinc-200 p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-orange-500" />
              Developer Network
            </h1>
            <p className="text-sm text-zinc-500 font-mono mt-1">Global directory of registered nodes</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Query network handles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 text-zinc-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>
        </div>

        {/* DIRECTORY GRID */}
        {isLoading ? (
          <div className="text-center text-zinc-500 py-20 font-mono text-sm flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 animate-spin text-orange-500" /> Scanning network...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredNodes.map((node) => (
              <div key={node.id} className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={node.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${node.handle}&backgroundColor=27272a`} 
                        className={`w-12 h-12 rounded-full ${node.isLive ? 'grayscale-0 ring-2 ring-orange-500/50' : 'grayscale opacity-70'}`} 
                        alt={node.handle} 
                      />
                      {node.isLive && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#18181b] rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100 text-lg group-hover:text-orange-500 transition-colors">@{node.handle}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                        <Shield className="w-3 h-3" /> {node.role || "Developer"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                  <button className="flex-1 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Establish Link
                  </button>
                </div>
              </div>
            ))}
            
            {filteredNodes.length === 0 && (
              <div className="col-span-full text-center text-zinc-500 py-10 font-mono text-sm">
                No matching nodes found in the directory.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}