"use client";
import React, { useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Activity } from "lucide-react";
import "xterm/css/xterm.css";

export default function StreamPage() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any>(null);

  useEffect(() => {
    const initTerminal = async () => {
      if (!terminalRef.current) return;
      
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");

      const term = new Terminal({
        theme: { background: '#0e0e10', foreground: '#f4f4f5', cursor: '#ea580c' },
        fontFamily: '"JetBrains Mono", monospace',
        cursorBlink: true,
        rows: 24,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();
      
      term.writeln('\x1b[1;38;5;208mAdeXploit Live Engine v1.0.0\x1b[0m');
      term.writeln('Establishing secure WebSocket connection to backend engine...');
      
      // Initialize WebSocket dynamically to Render backend
      const wsUrl = `${(process.env.NEXT_PUBLIC_API_URL || "").replace(/^http/, "ws")}/api/ws/terminal`;
      const ws = new WebSocket(wsUrl);
      let currentInput = "";

      ws.onopen = () => {
        term.write('\r\n\x1b[32m[+] Connection established.\x1b[0m\r\n$ ');
      };

      ws.onmessage = (event) => {
        term.write(event.data);
      };

      // Handle Keystrokes
      term.onData((data) => {
        if (data === '\r') { // Enter key
          ws.send(currentInput);
          currentInput = "";
        } else if (data === '\x7f') { // Backspace key
          if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          currentInput += data;
          term.write(data);
        }
      });

      xtermRef.current = term;
      window.addEventListener('resize', () => fitAddon.fit());
    };

    initTerminal();

    return () => {
      if (xtermRef.current) xtermRef.current.dispose();
    };
  }, []);

  return (
    <main className="w-full min-h-[calc(100vh-64px)] bg-[#09090b] flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <TerminalIcon className="w-6 h-6 text-orange-500" />
            Live Labs
          </h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">Interactive execution environment</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#18181b] px-3 py-1.5 rounded-full border border-zinc-800">
          <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
          WS://LIVE-STREAM
        </div>
      </div>

      {/* Terminal Container */}
      <div className="flex-1 bg-[#0e0e10] border border-zinc-800 rounded-xl overflow-hidden p-4 shadow-2xl">
        <div ref={terminalRef} className="w-full h-full" />
      </div>
    </main>
  );
}