"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchWebsiteConfig } from "@/lib/api";

/* ── Regional Data ────────────────────────────────────────── */
interface Destination {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  link: string;
}

const chapters = [
  {
    id: "himalayan-east",
    label: "Himalayan East",
    destinations: [
      {
        id: "gangtok",
        title: "Gangtok",
        location: "Sikkim",
        description: "A sanctuary in the Himalayas where tradition meets tranquility.",
        image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/gangtok",
      },
      {
        id: "darjeeling",
        title: "Darjeeling",
        location: "West Bengal",
        description: "Mist-kissed peaks and rolling tea gardens in the Queen of Hills.",
        image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/darjeeling",
      },
      {
        id: "pelling",
        title: "Pelling",
        location: "West Sikkim",
        description: "Sacred lakes and ancient monasteries with a view of the gods.",
        image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/pelling",
      },
    ],
  },
  {
    id: "royal-heritage",
    label: "Royal Heritage",
    destinations: [
      {
        id: "udaipur",
        title: "Udaipur",
        location: "Rajasthan",
        description: "A golden sunset over the legendary City of Lakes.",
        image: "https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/udaipur",
      },
      {
        id: "jaipur",
        title: "Jaipur",
        location: "Rajasthan",
        description: "The Pink City where history is written in sandstone and light.",
        image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/jaipur",
      },
    ],
  },
  {
    id: "tropical-south",
    label: "Tropical South",
    destinations: [
      {
        id: "munnar",
        title: "Munnar",
        location: "Kerala",
        description: "The emerald heaven where clouds rest upon velvet green hills.",
        image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/munnar",
      },
      {
        id: "goa",
        title: "Goa",
        location: "West Coast",
        description: "Pristine sands and colonial whispers on the edge of the Arabian Sea.",
        image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1200",
        link: "/destinations/goa",
      },
      {
        id: "wayanad",
        title: "Wayanad",
        location: "Kerala",
        description: "Ancient caves and misty plantations in the heart of the Western Ghats.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
        link: "/destinations/wayanad",
      },
    ],
  },
];

/* ── Helper Components ───────────────────────────────────── */
const ArtisanOrnament = ({ className, speed = 1 }: { className?: string; speed?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, 300 * speed]);
  return (
    <motion.div style={{ y }} className={`absolute pointer-events-none select-none z-0 ${className}`}>
      <svg width="200" height="200" viewBox="0 0 100 100" fill="none" opacity="0.12">
        <path d="M50 10C55 30 80 40 50 60C20 40 45 30 50 10Z" fill="#a5813b" />
        <path d="M10 50C30 55 40 80 60 50C40 20 30 45 10 50Z" fill="#a5813b" />
      </svg>
    </motion.div>
  );
};

export default function DestinationsGrid() {
  const [config, setConfig] = useState<any[] | null>(null);
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchWebsiteConfig().then((data) => {
      if (data && Array.isArray(data.config?.destinations)) {
        setConfig(data.config.destinations);
      }
    });
  }, []);

  // Map dynamic destinations to static chapters, and append new ones in a new chapter if any
  const dynamicChapters = [...chapters].map(chapter => {
    const updatedDests = chapter.destinations.map(dest => {
      const match = config?.find((d: any) => d.id === dest.id);
      if (match) {
        return {
          id: dest.id,
          title: match.title || dest.title,
          location: match.tagline || dest.location,
          description: match.description || dest.description,
          image: match.mainImage || match.image || dest.image,
          link: match.link || dest.link
        };
      }
      return dest;
    });
    return { ...chapter, destinations: updatedDests };
  });

  const unmatched = config?.filter((d: any) => 
    !chapters.some(c => c.destinations.some(dest => dest.id === d.id))
  ) || [];

  if (unmatched.length > 0) {
    dynamicChapters.push({
      id: "featured-escapes",
      label: "Featured Escapes",
      destinations: unmatched.map((match: any) => ({
        id: match.id,
        title: match.title || "Custom Destination",
        location: match.tagline || "Exclusive Escape",
        description: match.description || "",
        image: match.mainImage || match.image || "https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=1400&q=80",
        link: match.link || `/destinations/${match.id}`
      }))
    });
  }

  const currentDestinations = dynamicChapters.find((c) => c.id === activeChapter)?.destinations || [];

  return (
    <section ref={containerRef} className="relative w-full bg-[#f8f5f0] py-24 md:py-32 overflow-hidden">
      {/* Sketch Background Painting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.09] mix-blend-multiply bg-[url('/images/destinations_sketch_bg.png')] bg-repeat bg-[size:450px] md:bg-[size:800px] bg-center" />

      {/* Background Embellishments */}
      <ArtisanOrnament className="-left-20 top-40" speed={0.4} />
      <ArtisanOrnament className="-right-20 bottom-40" speed={0.6} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#a5813b] font-bold mb-4">Explore the Memoir</p>
            <div className="relative inline-block">
               <h2 className="font-old-english font-normal text-5xl md:text-7xl lg:text-8xl tracking-[0.02em] text-transparent bg-clip-text bg-gradient-to-r from-[#1a1714] via-[#5c544b] to-[#1a1714] relative z-10 pb-2">Timeless Indian Splendors</h2>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.06] z-0 whitespace-nowrap font-script text-4xl md:text-8xl">
                 Taj Mahal • Himalayas • Kerala • Hawa Mahal
               </div>
            </div>
            <p className="text-sm font-serif italic text-[#5c544b] mt-4 opacity-70 max-w-xl mx-auto">Discover the timeless beauty from the Taj Mahal to the backwaters of Kerala</p>
          </motion.div>
        </div>

        {/* Regional Filter Tabs Selector */}
        <div className="flex flex-col items-center gap-4 mb-16 md:mb-24 relative z-10">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#a5813b] font-bold opacity-60 animate-pulse">
            Select a region to explore
          </p>
          <div className="flex justify-center w-full overflow-x-auto no-scrollbar px-4">
            <div className="bg-[#f0e7d3]/80 backdrop-blur-sm border border-[#a5813b]/15 p-1.5 rounded-full flex gap-1 whitespace-nowrap shadow-md">
              {dynamicChapters.map((chapter) => {
                const isActive = activeChapter === chapter.id;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter.id)}
                    className="relative px-5 py-3 rounded-full transition-colors duration-300 select-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-chapter-pill"
                        className="absolute inset-0 bg-[#a5813b] rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 font-roman text-[10px] md:text-[13px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-[#5c544b] opacity-80 hover:opacity-100 hover:text-[#a5813b]"
                      }`}
                    >
                      {chapter.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Artisan Folio */}
        <div className="relative min-h-[800px] md:min-h-[1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-32 md:gap-40"
            >
              {currentDestinations.map((dest, idx) => (
                <div
                  key={dest.id}
                  className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Card Section */}
                  <div className="group relative w-full md:w-[50%] aspect-[3/4] md:aspect-[4/3] bg-white shadow-2xl p-4 md:p-6 transition-transform duration-700 hover:scale-[1.02]">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={dest.title}
                        fill
                        className="object-cover transition-all duration-[2s] ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="font-script text-2xl md:text-3xl text-[#a5813b] mb-4">{dest.location}</p>
                    <h3 className="font-glyptic text-3xl md:text-5xl text-[#1a1714] uppercase tracking-wider mb-6">{dest.title}</h3>
                    <p className="font-serif text-[#5c544b] leading-relaxed opacity-80 mb-8 max-w-sm">{dest.description}</p>
                    <Link
                      href={dest.link}
                      className="group relative px-10 py-4 border border-[#a5813b]/30 text-[#a5813b] text-[0.65rem] uppercase tracking-[0.3em] font-bold transition-all hover:border-[#a5813b] hover:text-[#a5813b]"
                    >
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Explore Memoir</span>
                      <div className="absolute inset-0 bg-[#a5813b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Footer Link */}
        <div className="mt-32 text-center border-t border-[#a5813b]/10 pt-20">
          <Link href="/destinations" className="group flex flex-col items-center gap-4">
            <span className="font-glyptic text-2xl md:text-3xl text-[#1a1714] uppercase tracking-[0.2em] transition-colors group-hover:text-[#a5813b]">
              Discover All Treasures
            </span>
            <div className="w-12 h-px bg-[#a5813b]/40 group-hover:w-24 transition-all duration-700" />
          </Link>
        </div>
      </div>
    </section>
  );
}
