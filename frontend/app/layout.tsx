import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "AdeXploit | Intelligence Network",
  description: "Advanced tactical network for offensive security practitioners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-[#0e0e10] text-zinc-200 min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}