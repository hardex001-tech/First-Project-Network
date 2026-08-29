"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  // Security Check: Kick them out if they aren't logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Publishing your project...");
    setIsError(false);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // The VIP Security Pass
        },
        body: JSON.stringify({
          title: title,
          description: description,
          skills_required: skillsRequired,
        }),
      });

      if (response.ok) {
        setMessage("Project published successfully! Taking you to the feed...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setIsError(true);
        setMessage("Failed to publish project. Please check your details.");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setMessage("Failed to connect to the backend engine.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Navbar />
      
      <main className="p-10 max-w-3xl mx-auto mt-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-3 text-white">Post a New Project</h1>
          <p className="text-zinc-400">
            Share your idea and find the right teammates to build it with.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g., Mobile App for Local Farmers"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Project Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Describe the project, the goal, and what kind of team you need..."
                required
              ></textarea>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Skills Required (Comma separated)</label>
              <input
                type="text"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm"
                placeholder="e.g., React, Node.js, UI/UX Design"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-bold transition-colors shadow-md text-lg"
            >
              Publish to Network
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-medium text-center ${isError ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}