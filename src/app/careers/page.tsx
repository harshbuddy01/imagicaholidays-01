"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CareersPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 flex items-center justify-center bg-[#2c2822]">
      <Image
        src="https://images.unsplash.com/photo-1499558620242-1262d0e768e9?q=80&w=1600&auto=format&fit=crop"
        alt="Dark vintage desk"
        fill
        className="object-cover fixed opacity-15 mix-blend-luminosity"
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
        className="relative w-full max-w-4xl mx-auto z-10 p-12 lg:p-20 bg-[#f4ebd9] shadow-2xl rounded-sm border-2 border-[#d5cab5] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 text-center mb-12">
            <h1 className="font-roman text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2c2822] tracking-wide mb-3">
              Join The
              <span className="block mt-2 font-script italic text-[#ae9e85] text-5xl md:text-7xl font-normal">
                Artisans
              </span>
            </h1>
            <p className="mt-6 font-roman text-[#5c544b] leading-[32px] text-sm md:text-base max-w-2xl mx-auto">
              We do not hire employees to sell packages. We seek storytellers, wanderers, and locals with the mountains etched into their souls. If you believe travel is a high art form, you may belong with Imagica Holidays.
            </p>
        </div>

        <div className="relative z-10 flex flex-col gap-6 text-center">
             <p className="text-[12px] uppercase tracking-widest text-[#7a705e]">
                Currently, our curations are fully staffed.
             </p>
             <p className="font-roman text-[#5c544b] italic mb-8">
                 However, true talent is an anomaly. Send your story via parchment (or email) to our guild master.
             </p>
             <a href="mailto:careers@imagicaholidays.com" className="inline-block self-center border border-[#ae9e85] px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#ae9e85] hover:bg-[#ae9e85] hover:text-[#1a1914] transition-colors">
               Write to Us
             </a>
        </div>

      </motion.div>
    </main>
  );
}
