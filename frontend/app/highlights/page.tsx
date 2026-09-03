"use client";
import React from "react";
import { Heart, MessageSquare, Share2, Code, Shield } from "lucide-react";

const SHORT_CLIPS = [
  { id: 1, author: "AdeXploit", title: "Bypassing Windows Defender in 60s", tag: "Malware Dev" },
  { id: 2, author: "NightByte", title: "React State Injection Vulnerability", tag: "Frontend Sec" },
];

export default function HighlightsFeed() {
  return (
    <main className="w-full h-[calc(100vh-80px)] bg-[#0e0e10] flex justify-center overflow-hidden">
      
      {/* Snap Scrolling Container */}
      <div className="w-full max-w-md h-full snap-y snap-mandatory overflow-y-auto hide-scrollbar">
        
        {SHORT_CLIPS.map((clip) => (
          <div key={clip.id} className="w-full h-full snap-start relative bg-[#18181b] border-x border-zinc-800 flex items-center justify-center group">
            
            {/* Mock Video Area */}
            <div className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center font-mono p-8 text-center text-zinc-500">
               <Shield className="w-16 h-16 text-zinc-800 mb-4" />
               <p>[Video Stream Placeholder]</p>
               <p className="text-xs mt-2 text-orange-500">60-second tactical breakdown</p>
            </div>

            {/* Video Overlay Info */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-white text-lg">@{clip.author}</h3>
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {clip.tag}
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-4">{clip.title}</p>
              <div className="flex items-center gap-4 text-white">
                <Code className="w-5 h-5 text-zinc-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <span className="text-xs font-mono text-zinc-400">View Source Payload</span>
              </div>
            </div>

            {/* Right Action Bar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-10 items-center">
              <button className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors">
                <div className="w-12 h-12 bg-zinc-800/80 backdrop-blur rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <span className="text-xs font-bold">12.4k</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors">
                <div className="w-12 h-12 bg-zinc-800/80 backdrop-blur rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <span className="text-xs font-bold">342</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors">
                <div className="w-12 h-12 bg-zinc-800/80 backdrop-blur rounded-full flex items-center justify-center">
                  <Share2 className="w-6 h-6 fill-current" />
                </div>
                <span className="text-xs font-bold">Share</span>
              </button>
            </div>

          </div>
        ))}

      </div>
    </main>
  );
}