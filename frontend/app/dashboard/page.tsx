"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface Project {
  id: number;
  title: string;
  description: string;
  skills_required: string;
  owner_id: number;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects/")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  // The new Connection Engine
  const handleConnect = async (receiverId: number, projectId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to connect.");
      return;
    }

    const messageContent = window.prompt("Send a message to the project owner:");
    if (!messageContent) return; // Stop if they hit cancel

    try {
      const response = await fetch("http://127.0.0.1:8000/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          receiver_id: receiverId,
          project_id: projectId,
          content: messageContent
        })
      });

      if (response.ok) {
        alert("Message sent successfully! They will see it in their inbox.");
      } else {
        alert("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <Navbar />
      
      <main className="p-10 pt-24 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-100">Find Your Next Collaboration</h1>
          <p className="text-lg text-zinc-400">
            Connect with students and professionals building real-world projects.
          </p>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <div className="text-center p-10 bg-zinc-800/50 rounded-2xl">
              <p className="text-zinc-400">Loading community projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center p-10 bg-zinc-800/50 rounded-2xl">
              <p className="text-zinc-400 mb-4">No projects found in the network yet.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="p-6 rounded-2xl bg-zinc-800 shadow-md flex flex-col md:flex-row gap-6 justify-between items-start">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-zinc-900 text-zinc-300 text-xs px-3 py-1 rounded-full font-semibold">
                      User #{project.owner_id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100 mb-3">{project.title}</h2>
                  <p className="text-zinc-300 leading-relaxed mb-5">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills_required.split(',').map((skill, index) => (
                      <span key={index} className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-3 min-w-[160px]">
                  <button 
                    onClick={() => handleConnect(project.owner_id, project.id)}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    Connect
                  </button>
                  <button className="w-full bg-zinc-700 text-zinc-200 hover:bg-zinc-600 font-bold py-2.5 px-4 rounded-xl transition-colors">
                    Save Project
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}