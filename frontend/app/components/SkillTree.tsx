"use client";
import React from "react";
import { Network, Terminal, Shield, Lock, CheckCircle2, Zap } from "lucide-react";

const SKILL_DOMAINS = [
  {
    id: "net-exp",
    title: "Network Exploitation",
    icon: Network,
    level: 4,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    skills: [
      { name: "Nmap Scripting Engine", status: "mastered" },
      { name: "BGP Protocol Hijacking", status: "active" },
      { name: "Zero-Click Vectors", status: "locked" },
    ]
  },
  {
    id: "app-sec",
    title: "Application Security",
    icon: Terminal,
    level: 6,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    skills: [
      { name: "Advanced SQLi Pipeline", status: "mastered" },
      { name: "WebRTC Channel Pwn", status: "mastered" },
      { name: "WASM Reverse Engineering", status: "active" },
    ]
  },
  {
    id: "op-sec",
    title: "Covert Operations",
    icon: Shield,
    level: 2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    skills: [
      { name: "EDR Syscall Evasion", status: "active" },
      { name: "Kernel Mode Rootkits", status: "locked" },
      { name: "Hardware Fuzzing", status: "locked" },
    ]
  }
];

export default function SkillTree() {
  return (
    <div className="w-full flex flex-col gap-6">
      {SKILL_DOMAINS.map((domain) => (
        <div key={domain.id} className="relative">
          
          {/* Domain Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${domain.bgColor} ${domain.borderColor} border`}>
                <domain.icon className={`w-4 h-4 ${domain.color}`} />
              </div>
              <h4 className="font-bold text-zinc-200 text-sm">{domain.title}</h4>
            </div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-[#0e0e10] border border-zinc-800 px-2 py-1 rounded">
              Level {domain.level}
            </div>
          </div>

          {/* Branching Nodes */}
          <div className="relative pl-6 space-y-4">
            {/* Main connecting line */}
            <div className="absolute left-[11px] top-2 bottom-4 w-px bg-zinc-800"></div>

            {domain.skills.map((skill, index) => (
              <div key={skill.name} className="relative flex items-center gap-4 group">
                
                {/* Node Status Indicator */}
                <div className="relative z-10 flex items-center justify-center bg-[#18181b]">
                  {skill.status === "mastered" && (
                    <CheckCircle2 className={`w-5 h-5 ${domain.color} bg-[#18181b] rounded-full`} />
                  )}
                  {skill.status === "active" && (
                    <div className={`w-5 h-5 rounded-full border-2 ${domain.borderColor} flex items-center justify-center bg-[#18181b]`}>
                      <div className={`w-2 h-2 rounded-full ${domain.color} animate-pulse`} />
                    </div>
                  )}
                  {skill.status === "locked" && (
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-800 flex items-center justify-center bg-[#18181b]">
                      <Lock className="w-2.5 h-2.5 text-zinc-600" />
                    </div>
                  )}
                </div>

                {/* Skill Detail Card */}
                <div className={`flex-1 p-3 border rounded-lg transition-all ${
                  skill.status === 'mastered' ? 'bg-[#0e0e10] border-zinc-800 text-zinc-300' :
                  skill.status === 'active' ? `bg-[#0e0e10] ${domain.borderColor} text-zinc-100 shadow-[0_0_15px_rgba(234,88,12,0.05)]` :
                  'bg-[#0e0e10]/50 border-zinc-800/50 text-zinc-600'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">{skill.name}</span>
                    {skill.status === "active" && (
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${domain.color} flex items-center gap-1`}>
                        <Zap className="w-3 h-3" /> Training
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
          
        </div>
      ))}
    </div>
  );
}