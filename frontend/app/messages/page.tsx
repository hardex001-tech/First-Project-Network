"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  project_id: number;
  content: string;
}

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/messages/", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <Navbar />
      <main className="p-10 pt-24 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-100">My Inbox</h1>

        {loading ? (
          <p className="text-zinc-400">Decrypting messages...</p>
        ) : messages.length === 0 ? (
          <div className="p-10 bg-zinc-800/50 rounded-2xl text-center border border-zinc-700/50">
            <p className="text-zinc-400">Your inbox is empty. No connection requests yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-bold">
                    From Network ID #{msg.sender_id}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">
                    Target Project ID: #{msg.project_id}
                  </span>
                </div>
                <p className="text-zinc-200 text-lg leading-relaxed">{msg.content}</p>
                <div className="mt-4 pt-4 border-t border-zinc-700/50 flex gap-3">
                    <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Reply</button>
                    <button className="text-sm font-bold text-zinc-500 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}