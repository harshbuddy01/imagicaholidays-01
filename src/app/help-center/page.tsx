"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HelpCenterPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 flex items-center justify-center bg-[#2c2822]">
      <Image
        src="https://images.unsplash.com/photo-1518640467707-6811f4a4ab75?q=80&w=1600&auto=format&fit=crop"
        alt="Dark textured wall"
        fill
        className="object-cover fixed opacity-20 mix-blend-color-burn"
        sizes="100vw"
        priority
      />

      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-white/5 backdrop-blur-sm border border-[#fcfbf8]/20 hover:bg-[#ae9e85] text-[#ae9e85] hover:text-[#1a1914] rounded-full transition-all group flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl mx-auto z-10 bg-[#FCFBF8] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-12 md:p-20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-4 border border-[#e8dcc4] pointer-events-none" />
        
        <div className="text-center mb-12 relative z-10">
          <h1 className="font-roman text-4xl md:text-5xl font-semibold text-[#2c2822] tracking-wide mb-3">
            The Help
            <span className="block mt-2 font-script italic text-[#ae9e85] text-5xl md:text-6xl font-normal">
              Desk
            </span>
          </h1>
          <p className="mt-6 font-roman text-[#5c544b] leading-[32px] text-sm md:text-base">
            For urgent mountain rescue of your itinerary, or general inquiries.
          </p>
        </div>

        <div className="relative z-10 font-roman text-[#3d3831] space-y-8 flex flex-col items-center">
            
            <Link href="/faqs" className="w-full border-b border-[#e8dcc4] pb-4 flex justify-between items-center group transition">
                <span className="text-lg group-hover:text-[#8b1a1a]">Frequently Asked Questions</span>
                <span className="text-[#ae9e85] group-hover:translate-x-2 transition-transform">⟶</span>
            </Link>
            
            <Link href="/terms" className="w-full border-b border-[#e8dcc4] pb-4 flex justify-between items-center group transition">
                <span className="text-lg group-hover:text-[#8b1a1a]">Cancellation Policies</span>
                <span className="text-[#ae9e85] group-hover:translate-x-2 transition-transform">⟶</span>
            </Link>
            
            <Link href="/#reservation" className="w-full border-b border-[#e8dcc4] pb-4 flex justify-between items-center group transition">
                <span className="text-lg group-hover:text-[#8b1a1a]">Direct Assistance</span>
                <span className="text-[#ae9e85] group-hover:translate-x-2 transition-transform">⟶</span>
            </Link>

        </div>
        
      </motion.div>
    </main>
  );
}
