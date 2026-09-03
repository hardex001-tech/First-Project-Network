"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Terminal, Zap, Shield, LayoutDashboard, Code, Clock } from "lucide-react";
import ReputationBadge from "../components/ReputationBadge";
import SkillTree from "../components/SkillTree";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Hardcoding ApexRoot temporarily until we build the Login/Auth system
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        if (res.ok) setProfile(await res.json());
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#0e0e10] flex items-center justify-center font-mono text-zinc-500 text-sm animate-pulse">
        Querying node registry...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#0e0e10] flex items-center justify-center font-mono text-red-500 text-sm">
        Node offline or redacted.
      </div>
    );
  }

  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-[#0e0e10] text-zinc-200 font-sans p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Identity & Clearances */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Main ID Card */}
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[80px] pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img 
                  src={profile.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.handle}&backgroundColor=ea580c`} 
                  className="w-20 h-20 rounded-lg bg-[#0e0e10] border-2 border-zinc-700 p-1" 
                  alt="Avatar" 
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-[#0e0e10] text-[10px] font-black px-2 py-0.5 rounded border-2 border-[#18181b]">
                  LIVE
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">{profile.name}</h1>
                <p className="text-orange-500 font-mono text-sm">@{profile.handle}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Shield className="w-4 h-4 text-zinc-500" /> {profile.role}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-500" /> {profile.location || "Location Obscured"}
              </div>
            </div>

            {/* Reputation Score */}
            <div className="bg-[#0e0e10] border border-zinc-800 rounded-lg p-4 flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Network Rep</span>
              <div className="flex items-center gap-1.5 text-2xl font-black text-emerald-400">
                <Zap className="w-5 h-5" /> {profile.reputation}
              </div>
            </div>

            {/* Clearances */}
            <div>
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Active Clearances</h4>
              <div className="flex flex-wrap gap-2">
                {profile.clearances?.map((clearance: any) => (
                  <ReputationBadge key={clearance} type={clearance} />
                ))}
              </div>
            </div>
          </section>

          {/* Tactical Skill Tree */}
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <Terminal className="w-4 h-4 text-orange-500" /> Progression Matrix
            </h3>
            <SkillTree />
          </section>
        </div>

        {/* RIGHT COLUMN: Activity & Payloads */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <LayoutDashboard className="w-4 h-4 text-orange-500" /> Deployed Payloads
            </h3>
            
            {profile.posts?.length === 0 ? (
              <div className="text-center py-10 font-mono text-zinc-500 text-sm">No payloads deployed yet.</div>
            ) : (
              <div className="space-y-4">
                {profile.posts?.map((post: any) => (
                  <div key={post.id} className="bg-[#0e0e10] border border-zinc-800 rounded-lg p-4 hover:border-orange-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-zinc-200">{post.title}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">{post.content}</p>
                    <div className="flex gap-2">
                      {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold bg-[#18181b] text-zinc-500 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}