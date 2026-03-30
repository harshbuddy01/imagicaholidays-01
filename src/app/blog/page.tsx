"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPage() {
  const posts = [
    {
      title: "Chasing the Monsoon in Darjeeling",
      excerpt: "When the skies break over the tea estates, the world turns into a misty watercolor. A guide to our favorite monsoon trails and the finest cups of First Flush...",
      date: "August 12, 2026",
      tag: "Diaries"
    },
    {
      title: "The Silent Monasteries of Spiti",
      excerpt: "Far beyond the tree line, time halts. We spent two weeks documenting the morning chants at Key Monastery, discovering a rhythm entirely detached from modern life...",
      date: "September 04, 2026",
      tag: "Expeditions"
    },
    {
      title: "A Study in Yak Wool",
      excerpt: "Behind the heavy, hand-spun textiles of the Changpa nomads lies an intricate history of survival, artistry, and trade across the freezing desert...",
      date: "October 21, 2026",
      tag: "Culture"
    }
  ];

  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 bg-[#f4ebd9]">
      <Image
        src="https://images.unsplash.com/photo-1542382156909-923f99d9b62a?q=80&w=1600&auto=format&fit=crop"
        alt="Mountain silhouette"
        fill
        className="object-cover fixed opacity-20 mix-blend-multiply"
        sizes="100vw"
        priority
      />

      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-black/5 backdrop-blur-sm border border-[#3d3831]/20 hover:bg-[#3d3831] text-[#3d3831] hover:text-[#fcfbf8] rounded-full transition-all flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          
        <div className="text-center mb-16 max-w-2xl mx-auto bg-[#FCFBF8] p-12 shadow-lg border border-[#e8dcc4] relative">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />

          <h1 className="font-roman text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2c2822] tracking-wide mb-3">
            Journal
            <span className="block mt-2 font-script italic text-[#ae9e85] text-4xl md:text-5xl font-normal">
              Entries
            </span>
          </h1>
          <p className="mt-4 font-roman text-[#5c544b] text-sm">Chronicles from high altitudes, told by the artisans who wander them.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
               <motion.article 
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: idx * 0.2 }}
                 className="bg-[#FCFBF8] p-8 shadow-md border-t-4 border-[#8b1a1a] relative group overflow-hidden cursor-pointer"
               >
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                  }} />

                  <span className="text-[10px] uppercase tracking-widest text-[#ae9e85] font-bold block mb-4">
                     {post.date} &nbsp; | &nbsp; {post.tag}
                  </span>
                  
                  <h2 className="font-roman text-2xl font-bold text-[#2c2822] mb-4 leading-tight group-hover:text-[#8b1a1a] transition-colors">
                     {post.title}
                  </h2>
                  
                  <p className="font-roman text-[#5c544b] text-sm leading-relaxed mb-6">
                     {post.excerpt}
                  </p>

                  <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#a09383] group-hover:text-[#2c2822] transition-colors">
                     Read Entry ⟶
                  </span>
               </motion.article>
            ))}
        </div>
      </div>
    </main>
  );
}
