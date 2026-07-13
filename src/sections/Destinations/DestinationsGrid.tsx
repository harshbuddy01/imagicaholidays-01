"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchWebsiteConfig } from "@/lib/api";

interface StateDestination {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  citiesText: string;
  link: string;
}

const stateChapters: StateDestination[] = [
  {
    id: "sikkim",
    title: "Sikkim",
    tagline: "Himalayan Sanctuary",
    description: "Alpine lakes, Buddhist monasteries, and majestic Kanchenjunga vistas.",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Gangtok · Pelling · Lachung",
    link: "/destinations/sikkim"
  },
  {
    id: "west-bengal",
    title: "West Bengal",
    tagline: "Colonial & Tea Heritage",
    description: "Mist-covered tea gardens, toy trains, and rich cultural archives.",
    image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Darjeeling · Kolkata",
    link: "/destinations/west-bengal"
  },
  {
    id: "kerala",
    title: "Kerala",
    tagline: "God's Own Country",
    description: "Tranquil emerald backwaters, velvet tea hills, and spice plantations.",
    image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Munnar · Wayanad",
    link: "/destinations/kerala"
  },
  {
    id: "tamil-nadu",
    title: "Tamil Nadu",
    tagline: "Dravidian Heritage",
    description: "Stately mountain stations, lakes, and scenic Nilgiri valleys.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    citiesText: "Ooty",
    link: "/destinations/tamil-nadu"
  },
  {
    id: "rajasthan",
    title: "Rajasthan",
    tagline: "Royal Heritage",
    description: "Intricate sandstone palaces, massive fortresses, and heritage lakes.",
    image: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Jaipur · Udaipur",
    link: "/destinations/rajasthan"
  },
  {
    id: "goa",
    title: "Goa",
    tagline: "Coastal Tranquility",
    description: "Pristine sun-kissed beaches, coconut groves, and colonial architecture.",
    image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Goa",
    link: "/destinations/goa"
  },
  {
    id: "andaman-nicobar",
    title: "Andaman & Nicobar",
    tagline: "Tropical Haven",
    description: "Turquoise coral waters, historical memoirs, and exotic palm-fringed islands.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    citiesText: "Port Blair",
    link: "/destinations/andaman-nicobar"
  }
];

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
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchWebsiteConfig().then((data) => {
      if (data && Array.isArray(data.config?.destinations)) {
        setConfig(data.config.destinations);
      }
    });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Merge CMS configurations if any matching State override is set
  const finalStates = stateChapters.map(state => {
    const cmsMatch = config?.find((c: any) => c.id === state.id || c.title?.toLowerCase() === state.title.toLowerCase());
    if (cmsMatch) {
      return {
        ...state,
        title: cmsMatch.title || state.title,
        tagline: cmsMatch.tagline || state.tagline,
        description: cmsMatch.description || state.description,
        image: cmsMatch.mainImage || cmsMatch.image || state.image,
      };
    }
    return state;
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#f8f5f0] pt-16 pb-20 md:py-32 overflow-hidden">
      {/* Sketch Background Painting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.09] mix-blend-multiply bg-[url('/images/destinations_sketch_bg.webp')] bg-repeat bg-[size:450px] md:bg-[size:800px] bg-center" />

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
               {/* Fixed cut-off text-5xl on mobile to responsive text-3xl */}
               <h2 className="font-glyptic font-bold text-3xl sm:text-4xl md:text-7xl lg:text-8xl tracking-[0.05em] uppercase text-[#1a1714] relative z-10 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#1a1714] via-[#5c544b] to-[#1a1714]">
                 Destinations
               </h2>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.06] z-0 whitespace-nowrap font-script text-4xl md:text-8xl">
                 Taj Mahal • Himalayas • Kerala • Hawa Mahal
               </div>
            </div>
            <p className="text-sm font-serif italic text-[#5c544b] mt-4 opacity-70 max-w-xl mx-auto">
              Click a state below to explore its handcrafted boutique cities and packages.
            </p>
          </motion.div>
        </div>

        {/* ═══ DESKTOP GRID VIEW (md+) ═══ */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
          {finalStates.map((state, idx) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
              className="group bg-white border border-[#a5813b]/10 shadow-lg rounded-sm overflow-hidden p-4 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div>
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-[#e8e6df] mb-5">
                  <Image
                    src={state.image}
                    alt={state.title}
                    fill
                    className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                  <div className="absolute top-3 left-3 bg-[#1a1714]/85 text-[#f5f4ef] text-[0.55rem] tracking-[0.3em] uppercase px-3 py-1 font-sans backdrop-blur-sm border border-white/10">
                    {state.tagline}
                  </div>
                </div>

                {/* Info Content */}
                <h3 className="font-glyptic text-2xl text-[#1a1714] uppercase tracking-wider mb-2 group-hover:text-[#a5813b] transition-colors">
                  {state.title}
                </h3>
                <p className="text-[#a5813b] text-[9px] font-bold tracking-[0.2em] uppercase font-manrope mb-3">
                  Includes: {state.citiesText}
                </p>
                <p className="font-serif text-xs text-[#5c544b] leading-relaxed opacity-85 mb-6 line-clamp-3">
                  {state.description}
                </p>
              </div>

              <Link
                href={state.link}
                className="w-full text-center py-3 border border-[#a5813b]/30 text-[#a5813b] text-[0.65rem] uppercase tracking-[0.25em] font-bold transition-all bg-[#fcfbf9] hover:bg-[#a5813b] hover:text-white"
              >
                Explore {state.title}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ═══ MOBILE SLIDER VIEW (< md) ═══ */}
        <div className="md:hidden relative w-full">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto flex gap-5 snap-x snap-mandatory no-scrollbar px-1 pb-4 scroll-smooth"
          >
            {finalStates.map((state) => (
              <div
                key={state.id}
                className="w-[82vw] shrink-0 snap-center flex flex-col bg-white border border-[#a5813b]/10 shadow-lg rounded-sm overflow-hidden p-4"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-[#e8e6df] mb-4">
                  <Image
                    src={state.image}
                    alt={state.title}
                    fill
                    className="object-cover"
                    sizes="82vw"
                  />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                  <div className="absolute top-2.5 left-2.5 bg-[#1a1714]/85 text-[#f5f4ef] text-[0.5rem] tracking-[0.25em] uppercase px-2.5 py-1 font-sans backdrop-blur-sm">
                    {state.tagline}
                  </div>
                </div>

                {/* Content Info */}
                <h3 className="font-glyptic text-xl text-[#1a1714] uppercase tracking-wider mb-1.5">{state.title}</h3>
                <p className="text-[#a5813b] text-[8px] font-bold tracking-[0.2em] uppercase font-manrope mb-2">
                  Includes: {state.citiesText}
                </p>
                <p className="font-serif text-[11px] text-[#5c544b] leading-relaxed opacity-85 mb-5 h-[48px] line-clamp-3 overflow-hidden">
                  {state.description}
                </p>
                
                <Link
                  href={state.link}
                  className="w-full text-center py-3.5 border border-[#a5813b]/30 text-[#a5813b] text-[0.6rem] uppercase tracking-[0.25em] font-bold transition-all bg-[#fcfbf9] active:bg-[#a5813b] active:text-white"
                >
                  Explore {state.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Floating Navigation Arrows & Touch Guide */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <span className="text-[9px] uppercase tracking-widest text-[#a5813b]/70 animate-pulse font-manrope font-bold">
              Swipe Left/Right or Use Arrows
            </span>
            <div className="flex gap-4">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-[#a5813b]/30 flex items-center justify-center text-[#a5813b] bg-white active:bg-[#a5813b] active:text-white transition-all shadow-md"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-[#a5813b]/30 flex items-center justify-center text-[#a5813b] bg-white active:bg-[#a5813b] active:text-white transition-all shadow-md"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Global Footer Link */}
        <div className="mt-16 md:mt-32 text-center border-t border-[#a5813b]/10 pt-8 md:pt-20">
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
