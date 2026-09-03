"use client";
import React, { useState } from "react";
import { Terminal, Copy, Check, ChevronDown, ChevronUp, FileJson } from "lucide-react";

interface SmartPayloadProps {
  rawData: string;
  type?: "terminal" | "json";
}

export default function SmartPayload({ rawData, type = "terminal" }: SmartPayloadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0e0e10] border border-zinc-800 rounded-lg overflow-hidden my-4 shadow-lg">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-zinc-800">
        <div className="flex items-center gap-2">
          {type === "json" ? <FileJson className="w-4 h-4 text-orange-500" /> : <Terminal className="w-4 h-4 text-orange-500" />}
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {type === "json" ? "Parsed JSON Payload" : "Raw Terminal Output"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCopy} 
            className="text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? <span className="text-emerald-500">Copied</span> : "Copy"}
          </button>
          <div className="w-px h-4 bg-zinc-700"></div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-zinc-500 hover:text-orange-500 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className={`relative font-mono text-xs overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[600px] overflow-y-auto' : 'max-h-40'}`}>
        
        {/* Fake Line Numbers Sidebar */}
        <div className="absolute top-0 left-0 w-10 h-full bg-[#18181b] border-r border-zinc-800 flex flex-col items-center py-4 text-zinc-700 select-none z-10">
            {[...Array(30)].map((_, i) => <div key={i} className="h-5">{i + 1}</div>)}
        </div>
        
        {/* Actual Content */}
        <pre className="p-4 pl-14 text-zinc-300 whitespace-pre-wrap break-all leading-5">
          {rawData}
        </pre>
        
        {/* Gradient Fade for collapsed state */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0e0e10] to-transparent pointer-events-none z-20" />
        )}
      </div>
      
      {/* Expand Footer Button */}
      {!isExpanded && (
         <button 
           onClick={() => setIsExpanded(true)}
           className="w-full text-center py-2 bg-[#18181b] hover:bg-zinc-800 text-[10px] text-zinc-400 hover:text-orange-500 font-bold uppercase tracking-widest transition-colors border-t border-zinc-800"
         >
           Expand Payload
         </button>
      )}
    </div>
  );
}