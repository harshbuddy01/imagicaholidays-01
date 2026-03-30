"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PressPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 bg-[#ede8df] flex items-center justify-center">
      
      {/* Newspaper texture background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-black/5 backdrop-blur-sm border border-[#3d3831]/20 hover:bg-[#3d3831] text-[#3d3831] hover:text-[#fcfbf8] rounded-full transition-all flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <motion.article
        initial={{ opacity: 0, rotate: -2 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl z-10 bg-[#f4ebd9] shadow-2xl p-12 md:p-20 overflow-hidden border border-[#d5cab5]"
      >
        <div className="border-b-4 border-double border-[#3d3831] pb-6 mb-8 text-center">
            <h1 className="font-roman text-5xl md:text-7xl font-bold text-[#2c2822] uppercase tracking-tighter">
                The Daily Artisan
            </h1>
            <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-[#5c544b]">
                Press & Mentions • Vol. IV • {new Date().getFullYear()}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-roman text-justify text-[#3d3831]">
            <section className="border-r md:border-[#d5cab5] md:pr-12">
                <h2 className="text-3xl font-bold leading-tight mb-4">Imagica Holidays Redefines Slow Tourism By Employing Locals</h2>
                <p className="text-sm leading-relaxed mb-4">
                    In an industry flooded with rushed, commercialized itineraries, Imagica Holidays has emerged as a staunch defender of the pristine Himalayan experience. By refusing to employ corporate agents and instead relying solely on native "Travel Artisans"—locals whose ancestors have traversed these trails for centuries... 
                </p>
                <p className="text-xs uppercase tracking-widest text-[#8b1a1a] font-bold">Read Full Feature ⟶</p>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold leading-tight mb-4 text-[#5c544b] italic">"A Masterclass in High Altitude Luxury"</h2>
                <p className="text-sm leading-relaxed mb-4">
                   "We expected a generic tour of Sikkim, but Imagica curated an expedition that felt like it was plucked from a 19th-century explorer's diary, updated only with five-star organic cuisine and flawless logistics."
                </p>
                <p className="text-xs uppercase tracking-widest text-[#7a705e] font-bold">— The Condé Nast Mountain Review</p>

                <hr className="my-8 border-[#d5cab5]" />

                <div className="text-center p-6 bg-[#ede8df] border border-[#d5cab5]">
                   <h3 className="font-bold text-lg mb-2">Media & Press Inquiries</h3>
                   <p className="text-sm text-[#5c544b] mb-4">For press access, imagery, or interviews with our founders.</p>
                   <a href="mailto:press@imagicaholidays.com" className="font-bold uppercase tracking-widest text-[10px] text-[#8b1a1a] underline">press@imagicaholidays.com</a>
                </div>
            </section>
        </div>
      </motion.article>
    </main>
  );
}
