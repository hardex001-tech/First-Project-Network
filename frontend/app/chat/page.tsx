"use client";
import React, { useState } from "react";
import { Search, Send, Phone, Video, Info, Paperclip } from "lucide-react";

const CONVERSATIONS = [
  { id: 1, name: "NightByte", handle: "night_byte", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NB&backgroundColor=ea580c", lastMessage: "Let me know when the API is ready.", time: "10:42 AM", unread: 2 },
  { id: 2, name: "Elena Rostova", handle: "erostova_sec", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ER&backgroundColor=ea580c", lastMessage: "The payload worked perfectly.", time: "Yesterday", unread: 0 },
];

const CHAT_HISTORY = [
  { id: 1, senderId: 1, text: "Hey, did you finish the database schema for the CASM engine?", time: "10:30 AM" },
  { id: 2, senderId: 'me', text: "Yes, I just pushed the Prisma models to the main branch. Check the relation mappings.", time: "10:35 AM" },
  { id: 3, senderId: 1, text: "Looks solid. I'll start building the FastAPI routes for it.", time: "10:40 AM" },
  { id: 4, senderId: 1, text: "Let me know when the API is ready.", time: "10:42 AM" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [input, setInput] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), senderId: 'me', text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <main className="w-full h-[calc(100vh-140px)] bg-[#0e0e10] text-zinc-200 font-sans p-4 lg:p-6 flex justify-center">
      <div className="max-w-[1400px] w-full flex gap-6 h-full">
        
        {/* LEFT: Conversation List */}
        <aside className="w-full md:w-80 bg-[#18181b] border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="font-black text-white uppercase tracking-wider text-sm mb-4">Comms Link</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search nodes..." 
                className="w-full bg-[#0e0e10] border border-zinc-700 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-orange-500 text-zinc-200"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((conv, i) => (
              <div key={conv.id} className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-l-2 ${i === 0 ? 'bg-[#0e0e10] border-orange-500' : 'hover:bg-[#0e0e10]/50 border-transparent'}`}>
                <img src={conv.avatar} className="w-10 h-10 rounded bg-zinc-800" alt={conv.handle} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-zinc-200 truncate">{conv.name}</h3>
                    <span className="text-[10px] font-bold text-zinc-500">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate pr-2 ${conv.unread > 0 ? 'text-zinc-300 font-semibold' : 'text-zinc-500'}`}>{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT: Active Chat Window */}
        <section className="hidden md:flex flex-1 bg-[#18181b] border border-zinc-800 rounded-xl flex-col overflow-hidden">
          
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#18181b]">
            <div className="flex items-center gap-3">
              <img src={CONVERSATIONS[0].avatar} className="w-10 h-10 rounded bg-zinc-800" alt="Active" />
              <div>
                <h3 className="font-bold text-zinc-100 text-sm">{CONVERSATIONS[0].name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-zinc-400 hover:text-orange-500 transition-colors rounded hover:bg-[#0e0e10]"><Phone className="w-4 h-4" /></button>
              <button className="p-2 text-zinc-400 hover:text-orange-500 transition-colors rounded hover:bg-[#0e0e10]"><Video className="w-4 h-4" /></button>
              <button className="p-2 text-zinc-400 hover:text-orange-500 transition-colors rounded hover:bg-[#0e0e10]"><Info className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0e0e10]">
            <div className="text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest my-4">
              Secure Link Established (AES-256)
            </div>
            {messages.map((msg) => {
              const isMe = msg.senderId === 'me';
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-lg text-sm ${isMe ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-[#18181b] border border-zinc-800 text-zinc-200 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#18181b] border-t border-zinc-800">
            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <button type="button" className="p-2.5 bg-[#0e0e10] border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors rounded"><Paperclip className="w-4 h-4" /></button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Transmit message..." 
                className="flex-1 bg-[#0e0e10] border border-zinc-700 rounded px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button 
                type="submit"
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold transition-colors rounded flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </section>
      </div>
    </main>
  );
}