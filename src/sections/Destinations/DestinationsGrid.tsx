"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

/* ── Components ───────────────────────────────────────────── */

const FloralFrame = () => (
  <svg className="absolute -inset-8 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10C30 5 70 5 90 10M10 90C30 95 70 95 90 90" stroke="#a5813b" strokeWidth="0.5" strokeDasharray="2 2" />
    <path d="M10 10C5 30 5 70 10 90M90 10C95 30 95 70 90 90" stroke="#a5813b" strokeWidth="0.5" strokeDasharray="2 2" />
    <circle cx="10" cy="10" r="2" fill="#a5813b" fillOpacity="0.2" />
    <circle cx="90" cy="10" r="2" fill="#a5813b" fillOpacity="0.2" />
    <circle cx="90" cy="90" r="2" fill="#a5813b" fillOpacity="0.2" />
    <circle cx="10" cy="90" r="2" fill="#a5813b" fillOpacity="0.2" />
  </svg>
);

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
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const containerRef = useRef(null);

  const currentDestinations = chapters.find((c) => c.id === activeChapter)?.destinations || [];

  return (
    <section ref={containerRef} className="relative w-full bg-[#f8f5f0] py-24 md:py-32 overflow-hidden">
      {/* Background Embellishments */}
      <ArtisanOrnament className="-left-20 top-40" speed={0.4} />
      <ArtisanOrnament className="-right-20 bottom-40" speed={0.6} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#a5813b] font-bold mb-6">Explore the Memoir</p>
            <h2 className="font-glyptic font-bold text-4xl md:text-7xl lg:text-8xl tracking-[0.05em] uppercase text-[#1a1714]">Destinations</h2>
          </motion.div>
        </div>

        {/* Regional Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 mb-20 md:mb-28">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setActiveChapter(chapter.id)}
              className={`relative group px-4 py-2 transition-all duration-500`}
            >
              <span className={`font-roman text-sm md:text-base uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${activeChapter === chapter.id ? "text-[#a5813b]" : "text-[#5c544b] opacity-60 group-hover:opacity-100"}`}>
                {chapter.label}
              </span>
              {activeChapter === chapter.id && (
                <motion.div
                  layoutId="chapter-underline"
                  className="absolute -bottom-1 left-4 right-4 h-[1.5px] bg-[#a5813b]"
                  transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                />
              )}
            </button>
          ))}
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
                        className="object-cover grayscale contrast-[1.1] brightness-[0.95] group-hover:grayscale-0 transition-all duration-[2s] ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                    </div>
                    <FloralFrame />
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
