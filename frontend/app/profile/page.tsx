"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface UserProfile {
  id: number;
  email: string;
  username: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  skills_required: string;
  owner_id: number;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", skills_required: "" });
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const userRes = await fetch("http://127.0.0.1:8000/users/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (!userRes.ok) throw new Error("Not authenticated");
        const userData = await userRes.json();
        setUser(userData);

        const projRes = await fetch("http://127.0.0.1:8000/projects/");
        if (projRes.ok) {
          const projData = await projRes.json();
          const filteredProjects = projData.filter((p: Project) => p.owner_id === userData.id);
          setMyProjects(filteredProjects);
        }
      } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleDelete = async (projectId: number) => {
    const token = localStorage.getItem("token");
    if (!token || !window.confirm("Delete this project? This cannot be undone.")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        setMyProjects(myProjects.filter(p => p.id !== projectId));
      } else {
        alert("Failed to delete project.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Trigger the edit mode
  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setEditForm({
      title: project.title,
      description: project.description,
      skills_required: project.skills_required
    });
  };

  // Submit the update to FastAPI
  const handleUpdateSubmit = async (e: React.FormEvent, projectId: number) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setMyProjects(myProjects.map(p => p.id === projectId ? updatedProject : p));
        setEditingId(null); // Close the form
      } else {
        alert("Failed to update project.");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-zinc-900 text-white p-10 pt-24">Loading profile data...</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <Navbar />
      
      <main className="p-10 pt-24 max-w-4xl mx-auto">
        <div className="bg-zinc-800 rounded-2xl p-8 mb-10 border border-zinc-700 shadow-md">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-inner">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">{user?.username}</h1>
              <p className="text-zinc-400">{user?.email}</p>
              <div className="mt-2 inline-block bg-zinc-900 text-zinc-300 text-xs px-3 py-1 rounded-full font-mono">
                Network ID: #{user?.id}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-100 border-b border-zinc-700 pb-2">My Active Projects</h2>
        
        <div className="grid gap-6">
          {myProjects.length === 0 ? (
            <div className="p-8 bg-zinc-800/50 rounded-2xl text-center border border-zinc-700/50">
              <p className="text-zinc-400">You haven't posted any projects yet.</p>
            </div>
          ) : (
            myProjects.map((project) => (
              <div key={project.id} className="p-6 rounded-2xl bg-zinc-800 border border-zinc-700 shadow-sm flex flex-col justify-between items-start gap-4">
                
                {/* Check if this specific project is in Edit Mode */}
                {editingId === project.id ? (
                  <form onSubmit={(e) => handleUpdateSubmit(e, project.id)} className="w-full space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                      required
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white resize-none"
                      rows={3}
                      required
                    />
                    <input
                      type="text"
                      value={editForm.skills_required}
                      onChange={(e) => setEditForm({ ...editForm, skills_required: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-sm"
                      required
                    />
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-lg font-bold">
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="bg-zinc-700 hover:bg-zinc-600 px-6 py-2 rounded-lg font-bold">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-100 mb-2">{project.title}</h3>
                      <p className="text-zinc-300 text-sm mb-4">{project.description}</p>
                      <div className="flex gap-2">
                        {project.skills_required.split(',').map((skill, index) => (
                          <span key={index} className="bg-zinc-900 text-zinc-400 text-xs px-2 py-1 rounded-md border border-zinc-700 font-mono">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                      <button onClick={() => handleEditClick(project)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}