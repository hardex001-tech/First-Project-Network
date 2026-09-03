"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
handle: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ handle: null, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [handle, setHandle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Define endpoints that require a valid session token
  const protectedRoutes = ["/dashboard", "/network", "/bounties", "/stream", "/messages", "/profile", "/settings"];
  const publicRoutes = ["/login", "/register", "/"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedHandle = localStorage.getItem("handle");

    if (token && storedHandle) {
      setHandle(storedHandle);
      // Prevent authenticated users from seeing the login page
      if (publicRoutes.includes(pathname)) {
        router.push("/dashboard");
      }
    } else {
      setHandle(null);
      // Kick unauthenticated users attempting to force-browse protected routes
      if (protectedRoutes.some(route => pathname.startsWith(route))) {
        router.push("/login");
      }
    }
    setIsLoading(false);
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("handle");
    setHandle(null);
    router.push("/login");
  };

  if (isLoading) return <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center text-orange-500 font-mono text-sm">Verifying Session...</div>;

  return (
    <AuthContext.Provider value={{ handle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);