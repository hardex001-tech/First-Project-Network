"use client";
import React, { useEffect, useRef } from "react";
import "xterm/css/xterm.css";

export default function LiveTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any>(null);

  useEffect(() => {
    let ws: WebSocket;
    let resizeObserver: ResizeObserver;
    
    const initTerminal = async () => {
      if (!terminalRef.current) return;
      
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");

      const term = new Terminal({
        theme: { background: '#000000', foreground: '#f4f4f5', cursor: '#ea580c' },
        fontFamily: '"JetBrains Mono", monospace',
        cursorBlink: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      
      // Watch the container and only fit when dimensions exist
      resizeObserver = new ResizeObserver(() => {
        if (terminalRef.current && terminalRef.current.clientWidth > 0) {
          try { fitAddon.fit(); } catch(e) {}
        }
      });
      resizeObserver.observe(terminalRef.current);
      
      term.writeln('\x1b[33m*** ESTABLISHED SECURE WEBSOCKET CONNECTION ***\x1b[0m');
      
      const wsUrl = `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/^http/, "ws")}/api/ws/terminal`;
      ws = new WebSocket(wsUrl);
      
      let currentInput = "";

      ws.onopen = () => {
        term.write('\r\n$ ');
      };

      ws.onmessage = (event) => {
        term.write(event.data);
      };

      term.onData((data) => {
        if (data === '\r') {
          ws.send(currentInput);
          currentInput = "";
        } else if (data === '\x7f') {
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
    };

    // Defer initialization to avoid layout shift crashes
    const timeoutId = setTimeout(initTerminal, 100);

    return () => {
      clearTimeout(timeoutId);
      if (resizeObserver) resizeObserver.disconnect();
      if (xtermRef.current) xtermRef.current.dispose();
      if (ws) ws.close();
    };
  }, []);

  return <div ref={terminalRef} className="w-full h-full min-h-[250px] overflow-hidden p-2" />;
}