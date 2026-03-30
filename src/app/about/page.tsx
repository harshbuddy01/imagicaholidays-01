"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const TornTape = ({ className = "" }: { className?: string }) => (
  <div className={`absolute h-8 bg-white/40 backdrop-blur-md shadow-sm border border-white/50 -rotate-2 z-20 mix-blend-screen ${className}`}
       style={{ clipPath: 'polygon(2% 0%, 98% 3%, 100% 96%, 1% 100%)' }} />
);

export default function AboutPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 flex items-center justify-center bg-[#2c2822]">
      {/* ── Dark Desk Background Imagery ── */}
      <Image
        src="https://images.unsplash.com/photo-1499558620242-1262d0e768e9?q=80&w=1600&auto=format&fit=crop"
        alt="Dark vintage desk"
        fill
        className="object-cover fixed opacity-15 mix-blend-luminosity"
        sizes="100vw"
        priority
      />

      {/* ── Close / Back Button ── */}
      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-white/5 backdrop-blur-sm border border-[#fcfbf8]/20 hover:bg-[#ae9e85] text-[#ae9e85] hover:text-[#1a1914] rounded-full transition-all group flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      {/* ── Open Journal Spread ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl mx-auto z-10 flex flex-col lg:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-sm"
        style={{ perspective: "2000px" }}
      >
        
        {/* The Book Spine (Center Shadow) - visible only on lg+ */}
        <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-[#2c2822]/20 to-transparent z-30 hidden lg:block pointer-events-none" />

        {/* ── Left Page: The Written Story ── */}
        <div className="relative w-full lg:w-1/2 bg-[#f4ebd9] p-8 md:p-16 overflow-hidden rounded-t-sm lg:rounded-tr-none lg:rounded-l-sm min-h-[600px]">
          
          {/* Subtle horizontal ruled lines like a vintage notebook */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ae9e85 32px)', backgroundPositionY: '2rem' }} />

          {/* Paper texture */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />

          {/* Content */}
          <div className="relative z-10 pt-4">
             <p className="font-script text-[#ae9e85] text-3xl mb-2 -rotate-2">Chapter I.</p>
             <h1 className="font-roman text-4xl md:text-5xl font-bold text-[#3d3831] mb-12 tracking-wide uppercase">
               The Imagica <br/> Chronicles
             </h1>

             <div className="font-roman text-[#5c544b] leading-[32px] text-sm md:text-base text-justify">
               <p className="mb-8">
                 <span className="float-left text-6xl font-script text-[#8b1a1a] pr-4 pb-2 leading-none">B</span>
                 orn from a profound reverence for the high Himalayas, Imagica Holidays was established not merely as a travel agency, but as an artisanal curator of unforgettable mountain narratives. We believe that true travel is an art form—one that bridges the soul of the wanderer with the ancient, whispering spirit of the peaks.
               </p>
               <p className="mb-8 pl-6 border-l-2 border-[#ae9e85]/40 italic text-[#7a705e]">
                 "Our journey began years ago, mapping the rugged terrain of Sikkim and Darjeeling. Driven by an intense passion for the mystic realms."
               </p>
               <p>
                 We do not employ agents; we cultivate <strong>Travel Artisans</strong>. Locals whose ancestors have walked these trails for generations. Whether predicting the perfect moment the morning sun shatters the mist over Mt. Kanchenjunga, or arranging a quiet Yak Safari in Yumthang, we handcraft moments.
               </p>
             </div>
          </div>
        </div>

        {/* ── Right Page: The Scrapbook / Polaroids ── */}
        <div className="relative w-full lg:w-1/2 bg-[#efdfc3] p-8 md:p-16 overflow-hidden rounded-b-sm lg:rounded-bl-none lg:rounded-r-sm min-h-[600px] flex flex-col items-center justify-center border-t border-[#d5cab5] lg:border-t-0 lg:border-l">
          
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />

          {/* Polaroid 1 */}
          <motion.div 
            initial={{ rotate: -5, y: 20, opacity: 0 }}
            animate={{ rotate: -6, y: -20, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative bg-white p-3 pb-12 shadow-[5px_5px_15px_rgba(0,0,0,0.15)] w-64 md:w-72 absolute -top-10 md:top-10 left-10 z-10"
          >
             <TornTape className="w-24 top-[-15px] left-1/2 -translate-x-1/2 rotate-3" />
             <div className="relative w-full aspect-square bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1544634076-a90160ddf44a?q=80&w=600&auto=format&fit=crop" alt="Darjeeling tea pluckers" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
             <p className="absolute bottom-3 left-0 w-full text-center font-script text-2xl text-[#3d3831]">High Altitude Trails</p>
          </motion.div>

          {/* Polaroid 2 */}
          <motion.div 
            initial={{ rotate: 10, y: 20, opacity: 0 }}
            animate={{ rotate: 8, y: 20, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative bg-white p-3 pb-12 shadow-[5px_5px_15px_rgba(0,0,0,0.15)] w-56 md:w-64 absolute bottom-10 right-10 z-20"
          >
             <TornTape className="w-20 top-[-10px] left-1/2 -translate-x-1/2 -rotate-6" />
             <div className="relative w-full aspect-square bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop" alt="Himalayan yak" fill className="object-cover sepia-[0.3] hover:sepia-0 transition-all duration-700" />
             </div>
             <p className="absolute bottom-3 left-0 w-full text-center font-script text-2xl text-[#3d3831]">Yumthang Valley</p>
          </motion.div>

          {/* Handwritten note tucked in corner */}
          <div className="absolute bottom-10 left-10 md:left-20 -rotate-[15deg]">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1" className="mb-2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
             </svg>
             <p className="font-script text-[#ae9e85] text-xl">Curated exclusively for you.</p>
          </div>
          
        </div>
      </motion.div>
    </main>
  );
}
