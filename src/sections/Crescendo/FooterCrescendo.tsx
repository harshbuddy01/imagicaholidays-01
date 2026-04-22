"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FooterCrescendo() {
  return (
    <section className="relative w-full bg-[#f8f5f0] py-16 px-6 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Handcrafted Horizontal Border Top */}
        <div className="w-full flex items-center justify-center gap-4 mb-10 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a5813b]" />
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <path d="M0 10C10 10 15 0 20 0C25 0 30 10 40 10" stroke="#a5813b" strokeWidth="0.5" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a5813b]" />
        </div>

        {/* Central Lotus Stamp */}
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-[#a5813b]/5 rounded-full scale-150 blur-xl" />
           <div className="relative z-10 w-16 h-10">
              <Image src="/logo_icon.png" alt="Logo" fill className="object-contain" />
           </div>
        </div>

        {/* Closing Headline - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="font-roman text-sm md:text-base text-[#1a1714] uppercase tracking-[0.4em] font-bold">
            Curated with soul, for the soulful traveler.
          </p>
          <div className="mt-4 flex flex-col items-center">
             <div className="w-8 h-px bg-[#a5813b]/30 mb-4" />
             <span className="font-roman text-[10px] tracking-[0.5em] text-[#a5813b] uppercase font-bold">
                IMAGICA HOLIDAYS
             </span>
          </div>
        </motion.div>

        {/* Handcrafted Horizontal Border Bottom */}
        <div className="w-full flex items-center justify-center gap-4 mt-10 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a5813b]" />
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="rotate-180">
            <path d="M0 10C10 10 15 0 20 0C25 0 30 10 40 10" stroke="#a5813b" strokeWidth="0.5" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a5813b]" />
        </div>

      </div>
    </section>
  );
}
