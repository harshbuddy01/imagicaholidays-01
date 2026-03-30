"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CookiesPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 flex items-center justify-center bg-[#f4ebd9]">
      <Image
        src="https://images.unsplash.com/photo-1542382156909-923f99d9b62a?q=80&w=1600&auto=format&fit=crop"
        alt="Mountain silhouette"
        fill
        className="object-cover fixed opacity-40 mix-blend-multiply"
        sizes="100vw"
        priority
      />

      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-black/5 backdrop-blur-sm border border-[#3d3831]/20 hover:bg-[#3d3831] text-[#3d3831] hover:text-[#fcfbf8] rounded-full transition-all group flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl my-auto z-10 bg-[#FCFBF8] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8 md:p-14 lg:p-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-4 border border-[#e8dcc4] pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a705e] mb-4">
            Digital Footprints
          </p>
          <div className="flex justify-center items-center gap-4 mb-3">
            <div className="w-12 h-[1px] bg-[#ae9e85]" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1">
              <path d="M12 2v20 m4-16l-4-4-4 4 m8 12l-4 4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="#ae9e85" fill="none" />
            </svg>
            <div className="w-12 h-[1px] bg-[#ae9e85]" />
          </div>
          <h1 className="font-roman text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2c2822] tracking-wide mb-3">
            Cookie
            <span className="block mt-2 font-script italic text-[#ae9e85] text-5xl md:text-7xl font-normal">
              Policy
            </span>
          </h1>
        </div>

        <div className="relative z-10 space-y-8 font-roman text-[#3d3831] leading-relaxed text-sm md:text-base text-justify">
          <p>Like the subtle tracks left on a Himalayan snowscape, we use cookies (small text files placed on your device) to re-trace the pathways you prefer on our website. This ensures a meticulously curated digital experience every time you return.</p>
          <p>These tracks are used strictly to enhance functionality and to understand the valleys of our site you frequent the most. We do not sell your tracks, nor do we employ sprawling third-party vendors to analyze your journey.</p>
          <p>If you prefer to walk untraceable, you may adjust your browser settings to decline all cookies. The mountains will welcome you the exact same.</p>
        </div>
        
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
      </motion.article>
    </main>
  );
}
