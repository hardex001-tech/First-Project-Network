"use client";
import React, { useState } from "react";
import { Shield, User, Lock, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ handle: "", name: "", password: "" });
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Registering node...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus(`Success! Welcome, @${data.handle}. Rerouting to login...`);
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setStatus(`Error: ${data.detail}`);
      }
    } catch (err) {
      setStatus("Network error.");
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-[#0e0e10] flex items-center justify-center p-6">
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 w-full max-w-md shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(234,88,12,0.4)]">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Initialize Node</h1>
          <p className="text-sm text-zinc-500 font-mono mt-2">Join the intelligence network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input type="text" placeholder="Display Name (e.g. ApexRoot)" required
              className="w-full bg-[#0e0e10] border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-orange-500"
              onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="relative">
            <Terminal className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input type="text" placeholder="Handle (no spaces)" required
              className="w-full bg-[#0e0e10] border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-orange-500"
              onChange={e => setFormData({...formData, handle: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input type="password" placeholder="Passphrase" required
              className="w-full bg-[#0e0e10] border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-orange-500"
              onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition-colors mt-2">
            Execute Registration
          </button>
          {status && <p className="text-center text-xs font-mono text-orange-500 mt-4">{status}</p>}
        </form>
      </div>
    </main>
  );
}