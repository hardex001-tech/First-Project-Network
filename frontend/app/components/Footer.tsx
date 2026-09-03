import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0e0e10] border-t border-zinc-800 py-8 lg:py-12 px-6 lg:px-8 mt-auto flex-shrink-0">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">AdeXploit</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-xs">
            The premier decentralized network for offensive security practitioners, exploit developers, and penetration testers.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2 inline-block">Resources</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/api-docs" className="hover:text-orange-500 transition-colors">API Documentation</Link></li>
            <li><Link href="/cve" className="hover:text-orange-500 transition-colors">CVE Database</Link></li>
            <li><Link href="/status" className="hover:text-orange-500 transition-colors">System Status</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2 inline-block">Legal</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-orange-500 transition-colors">Cookie Data</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-[1600px] mx-auto mt-12 pt-6 border-t border-zinc-800/50 flex justify-between items-center text-xs text-zinc-600">
        <p>© 2026 AdeXploit Intelligence Network. All rights reserved.</p>
        <p className="font-mono">SYS_VER: 1.0.4-STABLE</p>
      </div>
    </footer>
  );
}