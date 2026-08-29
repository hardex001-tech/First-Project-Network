"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Authenticating...");
    setIsError(false);

    // FastAPI strictly requires Form Data for the login route, NOT JSON!
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Save the secret JWT token to the browser's local storage
        localStorage.setItem("token", data.access_token);
        
        setMessage("Login successful! Entering the network...");
        // Push the user to the dashboard
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        setIsError(true);
        setMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setMessage("Failed to connect to the backend engine.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-10 text-white font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl">
        
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-2">
            Welcome <span className="text-indigo-500">Back</span>
          </h1>
          <p className="text-zinc-400 text-sm">Log in to your account to continue.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="e.g., Stud"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-bold transition-colors mt-2 shadow-md"
          >
            Log In
          </button>
        </form>

        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium text-center ${isError ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
            {message}
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Join here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}