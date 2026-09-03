"use client";
import React, { useState, useEffect } from "react";
import { User, Key, Save, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [handle, setHandle] = useState("");
  const [role, setRole] = useState("Operator");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedHandle = typeof window !== 'undefined' ? localStorage.getItem("handle") : "";
    if (savedHandle) setHandle(savedHandle);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const currentHandle = typeof window !== 'undefined' ? localStorage.getItem("handle") : "";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${currentHandle}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle, role })
      });

      if (res.ok) {
        localStorage.setItem("handle", handle);
        setMessage("Configuration saved to database successfully.");
      } else {
        setMessage("Failed to update database.");
      }
    } catch (error) {
      setMessage("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-64px)] bg-[#0e0e10] text-zinc-200 p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">System Settings</h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">Configure your operator profile and node preferences</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-orange-500" /> Operator Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Primary Handle</label>
                <input 
                  type="text" 
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full bg-[#0e0e10] border border-zinc-700 text-zinc-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="e.g. ApexRoot"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Network Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#0e0e10] border border-zinc-700 text-zinc-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                >
                  <option value="Operator">Operator</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Red Team">Red Team</option>
                  <option value="Blue Team">Blue Team</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 opacity-75">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-orange-500" /> Authentication
            </h2>
            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>Authentication modules are managed by the FastAPI engine. Password resets must be executed via the cloud CLI.</p>
            </div>
          </section>

          <div className="flex items-center justify-between pt-4">
            <p className={`text-sm font-medium ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {isSaving ? "Committing..." : "Save Configuration"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}