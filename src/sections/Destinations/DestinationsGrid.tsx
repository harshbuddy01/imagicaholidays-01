"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  trending?: boolean;
  trendingLabel?: string;
  accentColor?: string;
  // Unique India SVG Silhouette for each state
  svgIllustration?: React.ReactNode;
}

/* ═══════════════════════════════════════
   INLINE SVG SILHOUETTE ILLUSTRATIONS
   Each state has a unique, culturally
   relevant minimalist line art.
═══════════════════════════════════════ */

// Himalayan monastery peaks (Sikkim / Gangtok)
const SikkimSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <path d="M10 70 L30 30 L45 50 L55 20 L70 45 L85 25 L100 55 L110 70Z" stroke="#a5813b" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <path d="M50 18 L50 10 M45 14 L55 14" stroke="#a5813b" strokeWidth="1" opacity="0.5"/>
    <path d="M25 70 Q30 60 40 65 Q50 60 55 70" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.4"/>
    <rect x="52" y="38" width="6" height="9" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M50 38 L55 34 L60 38" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M10 72 L110 72" stroke="#a5813b" strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

// Toy Train on tea garden hills (West Bengal / Darjeeling)
const WestBengalSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <path d="M5 65 Q20 55 35 60 Q55 48 75 55 Q90 45 115 50" stroke="#a5813b" strokeWidth="1.2" fill="none" opacity="0.5"/>
    <rect x="30" y="50" width="18" height="9" rx="1" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.7"/>
    <rect x="31" y="52" width="4" height="4" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.6"/>
    <rect x="36" y="52" width="4" height="4" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.6"/>
    <circle cx="32" cy="60" r="2" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.7"/>
    <circle cx="45" cy="60" r="2" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.7"/>
    <path d="M28 50 L25 46 L28 46" stroke="#a5813b" strokeWidth="0.8" opacity="0.5"/>
    <path d="M5 72 Q20 68 40 68 Q70 65 115 68" stroke="#a5813b" strokeWidth="0.6" fill="none" opacity="0.3"/>
    <path d="M60 55 L60 40 M55 48 L65 48" stroke="#a5813b" strokeWidth="0.7" opacity="0.35"/>
  </svg>
);

// Backwater houseboat with coconut palms (Kerala)
const KeralaSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <path d="M10 65 L110 65" stroke="#a5813b" strokeWidth="0.8" opacity="0.4"/>
    <path d="M20 65 Q40 60 60 65 Q80 60 100 65" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.35"/>
    <rect x="30" y="52" width="55" height="12" rx="6" stroke="#a5813b" strokeWidth="1.2" fill="none" opacity="0.7"/>
    <path d="M30 55 Q57 48 85 55" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M15 65 L15 40 Q20 30 25 20 Q15 35 10 65" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.5"/>
    <ellipse cx="15" cy="22" rx="8" ry="6" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M100 65 L100 42 Q104 32 110 22 Q100 35 95 65" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.5"/>
    <ellipse cx="105" cy="24" rx="8" ry="6" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
  </svg>
);

// Temple gopuram (Tamil Nadu / Ooty)
const TamilNaduSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <rect x="48" y="20" width="24" height="45" stroke="#a5813b" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <path d="M42 20 L60 8 L78 20Z" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.6"/>
    <path d="M44 30 L76 30 M44 38 L76 38 M44 46 L76 46 M44 54 L76 54" stroke="#a5813b" strokeWidth="0.6" opacity="0.4"/>
    <rect x="54" y="50" width="12" height="15" stroke="#a5813b" strokeWidth="0.9" fill="none" opacity="0.6"/>
    <path d="M48 22 Q55 18 60 14 Q65 18 72 22" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.45"/>
    <path d="M10 65 L48 65 M72 65 L110 65" stroke="#a5813b" strokeWidth="0.6" opacity="0.3"/>
  </svg>
);

// Desert fort with camel (Rajasthan)
const RajasthanSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <path d="M10 65 L110 65" stroke="#a5813b" strokeWidth="0.8" opacity="0.35"/>
    <path d="M20 65 L20 45 L15 45 L15 40 L25 40 L25 45 L30 45 L30 65" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.6"/>
    <path d="M45 65 L45 35 L40 35 L40 28 L50 28 L50 35 L60 35 L60 28 L70 28 L70 35 L75 35 L75 65" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.65"/>
    <path d="M45 35 L60 30 L75 35" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M90 65 L90 52 Q93 42 96 35 Q99 42 103 52" stroke="#a5813b" strokeWidth="0.9" fill="none" opacity="0.55"/>
    <ellipse cx="100" cy="34" rx="5" ry="6" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.55"/>
    <path d="M90 62 L85 65 M103 62 L108 65" stroke="#a5813b" strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

// Beach sunset with palm and waves (Goa)
const GoaSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <circle cx="90" cy="35" r="14" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.5"/>
    <path d="M5 65 Q30 58 55 63 Q80 57 115 62" stroke="#a5813b" strokeWidth="1.2" fill="none" opacity="0.5"/>
    <path d="M5 70 Q30 63 55 68 Q80 62 115 67" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.35"/>
    <path d="M20 65 L20 45 Q24 32 30 20 Q20 38 15 65" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.55"/>
    <ellipse cx="26" cy="22" rx="9" ry="7" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.55"/>
    <path d="M90 35 L5 65" stroke="#a5813b" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25"/>
  </svg>
);

// Coral reef & boat silhouette (Andaman)
const AndamanSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    <path d="M5 55 Q30 48 55 52 Q80 46 115 50" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.45"/>
    <path d="M25 55 L25 38 Q30 30 40 28 L55 38 L55 55" stroke="#a5813b" strokeWidth="1.2" fill="none" opacity="0.65"/>
    <path d="M25 40 L40 32 L55 40" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M20 55 L25 55 M55 55 L60 55" stroke="#a5813b" strokeWidth="1" opacity="0.4"/>
    <path d="M70 60 Q72 50 74 58 Q76 50 78 58 Q80 50 82 58" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.45"/>
    <path d="M88 62 Q90 52 92 60 Q94 52 96 60" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.4"/>
    <path d="M5 65 L115 65" stroke="#a5813b" strokeWidth="0.5" opacity="0.3"/>
    <circle cx="100" cy="25" r="3" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.4"/>
    <circle cx="107" cy="22" r="2" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.4"/>
    <circle cx="95" cy="20" r="2" stroke="#a5813b" strokeWidth="0.7" fill="none" opacity="0.4"/>
  </svg>
);

const stateChapters: StateDestination[] = [
  {
    id: "sikkim",
    title: "Sikkim",
    tagline: "Himalayan Sanctuary",
    description: "Alpine lakes, Buddhist monasteries, and majestic Kanchenjunga vistas.",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Gangtok · Pelling · Lachung",
    link: "/destinations/sikkim",
    trending: true,
    trendingLabel: "🔥 Trending",
    accentColor: "#628ba8",
  },
  {
    id: "west-bengal",
    title: "West Bengal",
    tagline: "Colonial & Tea Heritage",
    description: "Mist-covered tea gardens, toy trains, and rich cultural archives.",
    image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Darjeeling · Kolkata",
    link: "/destinations/west-bengal",
    accentColor: "#a5813b",
  },
  {
    id: "kerala",
    title: "Kerala",
    tagline: "God's Own Country",
    description: "Tranquil emerald backwaters, velvet tea hills, and spice plantations.",
    image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Munnar · Wayanad",
    link: "/destinations/kerala",
    accentColor: "#4b8258",
  },
  {
    id: "tamil-nadu",
    title: "Tamil Nadu",
    tagline: "Dravidian Heritage",
    description: "Stately mountain stations, lakes, and scenic Nilgiri valleys.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    citiesText: "Ooty",
    link: "/destinations/tamil-nadu",
    accentColor: "#a5813b",
  },
  {
    id: "rajasthan",
    title: "Rajasthan",
    tagline: "Royal Heritage",
    description: "Intricate sandstone palaces, massive fortresses, and heritage lakes.",
    image: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Jaipur · Udaipur",
    link: "/destinations/rajasthan",
    accentColor: "#c9903b",
  },
  {
    id: "goa",
    title: "Goa",
    tagline: "Coastal Tranquility",
    description: "Pristine sun-kissed beaches, coconut groves, and colonial architecture.",
    image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1200",
    citiesText: "Goa",
    link: "/destinations/goa",
    accentColor: "#3f888f",
  },
  {
    id: "andaman-nicobar",
    title: "Andaman & Nicobar",
    tagline: "Tropical Haven",
    description: "Turquoise coral waters, historical memoirs, and exotic palm-fringed islands.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    citiesText: "Port Blair",
    link: "/destinations/andaman-nicobar",
    trending: true,
    trendingLabel: "⭐ Hot Pick",
    accentColor: "#3f888f",
  },
];

// Map state ID to its SVG
const stateSVGs: Record<string, React.ReactNode> = {
  sikkim: <SikkimSVG />,
  "west-bengal": <WestBengalSVG />,
  kerala: <KeralaSVG />,
  "tamil-nadu": <TamilNaduSVG />,
  rajasthan: <RajasthanSVG />,
  goa: <GoaSVG />,
  "andaman-nicobar": <AndamanSVG />,
};

/* ═══════════════════════
   DESTINATION CARD
═══════════════════════ */
function DestinationCard({ state, isMobile = false }: { state: StateDestination; isMobile?: boolean }) {
  const accent = state.accentColor || "#a5813b";

  return (
    <Link
      href={state.link}
      className={`group relative flex flex-col bg-white overflow-hidden rounded-2xl shadow-md border border-stone-200/60 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isMobile ? "w-[72vw] shrink-0 snap-center" : ""}`}
      style={{ borderTop: `3px solid ${accent}` }}
    >
      {/* Trending Badge */}
      {state.trending && (
        <span
          className="absolute top-3 right-3 z-20 text-white text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full shadow-lg"
          style={{ background: `linear-gradient(120deg, ${accent}, ${accent}dd)` }}
        >
          {state.trendingLabel}
        </span>
      )}

      {/* Photo */}
      <div className="relative w-full aspect-[5/4] overflow-hidden">
        <Image
          src={state.image}
          alt={state.title}
          fill
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          sizes={isMobile ? "72vw" : "(max-width: 1024px) 50vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Unique SVG Illustration watermark */}
        <div className="absolute bottom-3 right-3 w-16 h-12 opacity-60 mix-blend-soft-light pointer-events-none">
          {stateSVGs[state.id]}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-[8px] uppercase tracking-[0.25em] font-bold" style={{ color: accent }}>
            {state.tagline}
          </span>
        </div>

        <h3 className="font-glyptic text-xl md:text-2xl text-[#1a1714] uppercase tracking-wider mb-1 group-hover:text-[#a5813b] transition-colors duration-300">
          {state.title}
        </h3>

        <p className="font-serif text-[11px] text-stone-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {state.description}
        </p>

        {/* City pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {state.citiesText.split(" · ").map((city) => (
            <span
              key={city}
              className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200"
            >
              {city}
            </span>
          ))}
        </div>

        {/* Explore CTA */}
        <div
          className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.2em] font-bold py-2.5 px-3 rounded-lg transition-all duration-300 group-hover:shadow-md"
          style={{ background: `${accent}15`, color: accent }}
        >
          <span>Explore</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function DestinationsGrid() {
  const [config, setConfig] = useState<any[] | null>(null);
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
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.82;
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const finalStates = stateChapters.map((state) => {
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
    <section className="relative w-full bg-[#f8f5f0] pt-16 pb-20 md:py-32 overflow-hidden">
      {/* Natural paper texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#a5813b] font-bold mb-4">
            Explore India
          </p>
          <h2 className="font-glyptic text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.05em] uppercase text-[#1a1714] pb-2">
            Destinations
          </h2>
          <p className="text-sm font-serif italic text-[#5c544b] mt-4 opacity-70 max-w-xl mx-auto">
            Click a state below to discover its handcrafted boutique cities and packages.
          </p>
          <div className="mt-6 w-12 h-px bg-[#a5813b]/40 mx-auto" />
        </motion.div>

        {/* ═══ DESKTOP GRID (md+) ═══ */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {finalStates.map((state, idx) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (idx % 3) * 0.12 }}
            >
              <DestinationCard state={state} />
            </motion.div>
          ))}
        </div>

        {/* ═══ MOBILE SWIPE SLIDER (< md) ═══ */}
        <div className="md:hidden relative">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto flex gap-4 snap-x snap-mandatory no-scrollbar pb-4 scroll-smooth"
          >
            {finalStates.map((state) => (
              <DestinationCard key={state.id} state={state} isMobile />
            ))}
          </div>

          {/* Scroll controls + dot indicators */}
          <div className="flex flex-col items-center gap-3 mt-5">
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-[#a5813b]/30 flex items-center justify-center text-[#a5813b] bg-white active:bg-[#a5813b] active:text-white transition-all shadow-md"
                aria-label="Scroll left"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-[#a5813b]/30 flex items-center justify-center text-[#a5813b] bg-white active:bg-[#a5813b] active:text-white transition-all shadow-md"
                aria-label="Scroll right"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#a5813b]/60 font-bold">Swipe to explore</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 md:mt-24 text-center border-t border-[#a5813b]/10 pt-8">
          <Link href="/destinations" className="group inline-flex flex-col items-center gap-3">
            <span className="font-glyptic text-xl md:text-2xl text-[#1a1714] uppercase tracking-[0.2em] transition-colors group-hover:text-[#a5813b]">
              Discover All Treasures
            </span>
            <div className="w-10 h-px bg-[#a5813b]/40 group-hover:w-20 transition-all duration-700" />
          </Link>
        </div>
      </div>
    </section>
  );
}
