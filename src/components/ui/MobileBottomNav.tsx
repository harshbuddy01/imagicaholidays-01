"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home");
    } else if (pathname.startsWith("/destinations")) {
      setActiveTab("destinations");
    } else if (pathname.startsWith("/testimonials")) {
      setActiveTab("experiences");
    } else if (pathname.startsWith("/about")) {
      setActiveTab("about");
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-5 inset-x-4 z-[99] md:hidden max-w-md mx-auto">
      <div className="bg-[#0f0d0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl py-2 px-6 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {/* Home Tab */}
        <Link
          href="/"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 ${
            activeTab === "home" ? "text-[#d8be8f]" : "text-white/60 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={activeTab === "home" ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-wider font-manrope">Home</span>
        </Link>

        {/* Destinations Tab */}
        <Link
          href="/destinations"
          onClick={() => setActiveTab("destinations")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 ${
            activeTab === "destinations" ? "text-[#d8be8f]" : "text-white/60 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={activeTab === "destinations" ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-wider font-manrope">Destinations</span>
        </Link>

        {/* Experiences Tab */}
        <Link
          href="/testimonials"
          onClick={() => setActiveTab("experiences")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 ${
            activeTab === "experiences" ? "text-[#d8be8f]" : "text-white/60 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={activeTab === "experiences" ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-wider font-manrope">Experiences</span>
        </Link>

        {/* About Tab */}
        <Link
          href="/about"
          onClick={() => setActiveTab("about")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-300 ${
            activeTab === "about" ? "text-[#d8be8f]" : "text-white/60 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={activeTab === "about" ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-wider font-manrope">About Us</span>
        </Link>
      </div>
    </div>
  );
}
