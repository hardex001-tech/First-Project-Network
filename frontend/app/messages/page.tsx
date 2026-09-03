"use client";
import React, { useState, useEffect } from "react";
import { Send, Terminal, Shield, Lock, Search } from "lucide-react";

export default function SecureComms() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeContact, setActiveContact] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users to populate the contact list
  useEffect(() => {
    const fetchContacts = async () => {
      try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        if (res.ok) {
          const users = await res.json();
          // Filter out the current user (assuming we are logged in as ApexRoot)
          const peers = users.filter((u: any) => u.handle !== "ApexRoot");
          setContacts(peers);
          if (peers.length > 0) setActiveContact(peers[0]);
        }
      } catch (error) {
        console.error("Failed to load contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeContact) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_handle: "ApexRoot",
          receiver_handle: activeContact.handle,
          text: messageText
        })
      });

      if (res.ok) {
        setMessageText("");
        // In a fully built app, we would fetch the updated chat history here.
      }
    } catch (error) {
      console.error("Transmission failed:", error);
    }
  };

  return (
    <main className="w-full h-[calc(100vh-80px)] bg-[#0e0e10] flex overflow-hidden">
      
      {/* LEFT SIDEBAR: Contacts */}
      <aside className="w-80 border-r border-zinc-800 bg-[#18181b] flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" /> Secure Comms
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search network..." 
              className="w-full bg-[#0e0e10] border border-zinc-700 rounded px-9 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-xs font-mono text-zinc-500 animate-pulse">Decrypting contact list...</div>
          ) : (
            contacts.map((contact) => (
              <div 
                key={contact.id} 
                onClick={() => setActiveContact(contact)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${activeContact?.id === contact.id ? 'bg-[#0e0e10] border-orange-500' : 'border-transparent hover:bg-zinc-800/50'}`}
              >
                <img 
                  src={contact.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${contact.handle}&backgroundColor=ea580c`} 
                  className="w-10 h-10 rounded bg-zinc-800" 
                  alt={contact.handle} 
                />
                <div>
                  <h3 className={`text-sm font-bold ${activeContact?.id === contact.id ? 'text-orange-500' : 'text-zinc-200'}`}>
                    {contact.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500">@{contact.handle}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* RIGHT SIDE: Chat Window */}
      <section className="flex-1 flex flex-col bg-[#0e0e10]">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-6 bg-[#18181b]">
              <div className="flex items-center gap-3">
                <img src={activeContact.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${activeContact.handle}&backgroundColor=ea580c`} className="w-10 h-10 rounded bg-zinc-800" alt="Avatar" />
                <div>
                  <h2 className="font-bold text-zinc-100">{activeContact.name}</h2>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <Lock className="w-3 h-3 text-emerald-500" /> End-to-End Encrypted
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-[#0e0e10] px-3 py-1.5 rounded border border-zinc-800">
                Connection Secure
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-4">
              <div className="text-center text-zinc-600 text-xs my-4 uppercase tracking-widest">
                Handshake Established with @{activeContact.handle}
              </div>
              
              <div className="flex justify-start">
                <div className="bg-[#18181b] border border-zinc-800 rounded-lg rounded-tl-none p-4 max-w-xl">
                  <p className="text-zinc-300">Have you mapped the attack surface for the new target yet?</p>
                  <span className="text-[10px] text-zinc-600 mt-2 block">10:42 AM</span>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#18181b] border-t border-zinc-800">
              <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-[#0e0e10] border border-zinc-700 rounded-lg p-2 focus-within:border-orange-500 transition-colors">
                <Terminal className="w-5 h-5 text-zinc-500 ml-2" />
                <input 
                  type="text" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Transmit encrypted payload..." 
                  className="flex-1 bg-transparent text-sm text-zinc-200 focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={!messageText.trim()}
                  className="bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white p-2 rounded transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center font-mono text-zinc-500 text-sm">
            Select a node to initiate secure transmission.
          </div>
        )}
      </section>

    </main>
  );
}