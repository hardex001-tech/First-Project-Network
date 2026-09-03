"use client";
import React from "react";
import { Shield, Flame, Hexagon, Zap, Target } from "lucide-react";

interface BadgeProps {
  type: "first-blood" | "core-node" | "zero-day" | "verified" | "bounty-hunter";
}

export default function ReputationBadge({ type }: BadgeProps) {
  const badges = {
    "first-blood": { icon: Flame, text: "First Blood", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", glow: "shadow-[0_0_10px_rgba(239,68,68,0.2)]" },
    "core-node": { icon: Hexagon, text: "Core Node", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", glow: "shadow-[0_0_10px_rgba(234,88,12,0.2)]" },
    "zero-day": { icon: Zap, text: "0-Day Hunter", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "shadow-[0_0_10px_rgba(168,85,247,0.2)]" },
    "verified": { icon: Shield, text: "Cleared", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "shadow-[0_0_10px_rgba(16,185,129,0.2)]" },
    "bounty-hunter": { icon: Target, text: "Headhunter", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "shadow-[0_0_10px_rgba(59,130,246,0.2)]" }
  };
  
  const b = badges[type];
  const Icon = b.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border ${b.bg} ${b.border} ${b.glow} cursor-help transition-all hover:brightness-125`} title={`${b.text} Clearance`}>
      <Icon className={`w-3.5 h-3.5 ${b.color}`} />
      <span className={`text-[10px] font-bold uppercase tracking-widest ${b.color}`}>{b.text}</span>
    </div>
  );
}