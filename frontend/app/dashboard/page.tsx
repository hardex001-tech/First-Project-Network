"use client";
import React, { useState, useEffect } from "react";
import { 
  Radio, Users, Zap, Terminal, MessageSquare, 
  Heart, Code
} from "lucide-react";
import LiveTerminal from "../components/LiveTerminal";

export default function TwitchStyleDashboard() {
  const [feed, setFeed] = useState<any[]>([]);
  const [activeNodes, setActiveNodes] = useState<any[]>([]);
  const [composerText, setComposerText] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const fetchNetworkData = async () => {
    try {
      const feedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bounties`);
      if (feedRes.ok) setFeed(await feedRes.json());

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
      if (userRes.ok) setActiveNodes(await userRes.json());
    } catch (error) {
      console.error("Failed to connect to backend engine:", error);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  const handlePublish = async () => {
    if (!composerText.trim()) return;
    setIsPublishing(true);

    // Retrieve the active user handle from local storage, fallback to ApexRoot
    const activeHandle = typeof window !== 'undefined' ? localStorage.getItem("handle") || "ApexRoot" : "ApexRoot";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bounties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issuer_handle: activeHandle, 
          title: composerText,
          reward: 1000,
          tags: ["0-day", "Active"]
        })
      });

      if (res.ok) {
        setComposerText("");
        fetchNetworkData();
      }
    } catch (error) {
      console.error("Publish failed:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#0e0e10] text-zinc-200 font-sans flex relative">
      
      {/* LEFT SIDEBAR: Active Nodes */}
      <aside className="w-64 flex-shrink-0 bg-[#18181b] border-r border-zinc-800/50 hidden lg:flex flex-col h-[calc(100vh-80px)] sticky top-20">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">Active Nodes</h2>
          <Users className="w-4 h-4 text-zinc-400" />
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {activeNodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-md cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={node.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${node.handle}&backgroundColor=27272a`} className={`w-8 h-8 rounded-full ${node.isLive ? 'grayscale-0' : 'grayscale opacity-50'}`} alt={node.handle} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-200 group-hover:text-orange-500 transition-colors">{node.handle}</div>
                  <div className="text-xs text-zinc-500 truncate w-24">{node.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {node.isLive ? (
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                ) : (
                  <span className="text-xs text-zinc-600 font-medium">Offline</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* HERO SECTION: Featured Broadcast */}
        <div className="w-full bg-[#18181b] rounded-xl border border-zinc-800 flex flex-col md:flex-row overflow-hidden mb-10 shadow-lg">
          <div className="md:w-2/3 bg-black relative aspect-video md:aspect-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden min-h-[350px]">
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1 z-20">
              <Radio className="w-3 h-3" /> Live Lab
            </div>
            <LiveTerminal />
          </div>
          <div className="md:w-1/3 p-6 flex flex-col justify-between bg-gradient-to-b from-[#18181b] to-[#0e0e10]">
            <div>
              <h3 className="font-bold text-orange-500 text-lg mb-2">Interactive Terminal Engine</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Direct WebSocket connection established. Execute commands straight into the isolated lab environment.
              </p>
            </div>
          </div>
        </div>

        {/* FEED COMPOSER */}
        <div className="mb-8">
          <div className="bg-[#18181b] border border-zinc-800 rounded-lg p-4 focus-within:border-orange-500/50 transition-colors shadow-sm">
            <textarea 
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder="Broadcast a payload, log, or update to the network..."
              className="w-full bg-transparent text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none text-sm h-12"
            />
            <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80 mt-2">
              <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                <button className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"><Code className="w-4 h-4" /> Code</button>
                <button className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"><Terminal className="w-4 h-4" /> Log File</button>
              </div>
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" /> {isPublishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b border-zinc-800 mb-6">
          <button className="text-orange-500 border-b-2 border-orange-500 pb-2 font-bold text-sm">Live Feed</button>
        </div>

        {/* GRID OF POSTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {feed.length === 0 ? (
            <div className="col-span-full text-center text-zinc-500 py-10 font-mono text-sm">No payloads detected in the database.</div>
          ) : (
            feed.map((post) => (
              <article key={post.id} className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col h-full">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src={post.issuer?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${post.issuer?.handle}&backgroundColor=27272a`} className="w-10 h-10 rounded-full bg-zinc-800" alt="Avatar" />
                      <div>
                        <h3 className="font-bold text-zinc-100 text-sm">@{post.issuer?.handle || 'Unknown'}</h3>
                        <p className="text-xs text-orange-500 font-medium">Reward: {post.reward}</p>
                      </div>
                    </div>
                  </div>

                  {post.title && <h4 className="font-bold text-zinc-100 mb-2">{post.title}</h4>}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-orange-500 transition-colors">
                        <Heart className="w-4 h-4" /> {post.likes || 0}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-orange-500 transition-colors">
                        <MessageSquare className="w-4 h-4" /> {post.commentCount || 0}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}