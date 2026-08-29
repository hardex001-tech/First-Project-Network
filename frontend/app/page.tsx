"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white font-sans overflow-hidden">
      
      {/* Immersive Background: Dynamic animated orbs simulating spatial depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"
        />
      </div>

      {/* Central Content Block: Elevated and Floating */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom fluid physics easing
        className="z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full"
      >
        
        {/* Floating Badge */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-indigo-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          The new standard for builder collaboration 🚀
        </motion.div>
        
        {/* Main Title: 3D Pop and High Contrast */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl"
        >
          Build <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 filter drop-shadow-[0_0_20px_rgba(129,140,248,0.4)]">Projects.</span><br />
          Not Just Resumes.
        </motion.h1>
        
        {/* Information Chunk */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed max-w-2xl drop-shadow-md"
        >
          The Project-First Network bridges the gap between learning and doing. Connect with students, developers, and professionals to build real-world applications together.
        </motion.p>
        
        {/* Tactile Hover States & Glassmorphism Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link 
            href="/register" 
            className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-1 flex items-center justify-center text-lg relative overflow-hidden group"
          >
            {/* Hover Gradient Reveal */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            <span className="relative z-10">Join the Network</span>
          </Link>
          <Link 
            href="/login" 
            className="px-10 py-4 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 text-zinc-200 font-bold rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1 flex items-center justify-center text-lg"
          >
            Log In
          </Link>
        </motion.div>

      </motion.div>
    </main>
  );
}