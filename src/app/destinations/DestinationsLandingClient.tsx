"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const allDestinations = [
  {
    slug: "sikkim",
    title: "Sikkim",
    region: "Himalayan Sanctuary",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800", // prayer flags & peaks
    cities: ["Gangtok", "Pelling", "Lachung"],
    desc: "An alpine haven of glacial lakes, ancient monasteries, and the cloud-kissed peaks of Mount Kanchenjunga.",
    accentColor: "#628ba8",
    gradientFrom: "#527e99",
    gradientTo: "#88b3d0",
  },
  {
    slug: "west-bengal",
    title: "West Bengal",
    region: "Colonial & Tea Heritage",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", // Darjeeling tea gardens / misty mountains
    cities: ["Darjeeling", "Kolkata"],
    desc: "Wander through rolling green valleys of Darjeeling tea, or explore the colonial art archives of Kolkata.",
    accentColor: "#a5813b",
    gradientFrom: "#8a6a2f",
    gradientTo: "#bca374",
  },
  {
    slug: "kerala",
    title: "Kerala",
    region: "God's Own Country",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800", // Kerala palm backwaters
    cities: ["Munnar", "Wayanad"],
    desc: "A tropical oasis of emerald backwaters, velvet tea plantations, and wild spice sanctuaries.",
    accentColor: "#4b8258",
    gradientFrom: "#3a6d47",
    gradientTo: "#6bb07d",
  },
  {
    slug: "rajasthan",
    title: "Rajasthan",
    region: "Land of Kings",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800", // lake palace udaipur
    cities: ["Jaipur", "Udaipur"],
    desc: "Sandstone fortresses rising from desert dunes, grand lake palaces, and royal heritage legends.",
    accentColor: "#c9903b",
    gradientFrom: "#b37b2d",
    gradientTo: "#e0ad6e",
  },
  {
    slug: "goa",
    title: "Goa",
    region: "Coastal Tranquility",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800", // palms & beaches
    cities: ["Goa Beaches"],
    desc: "Pristine sun-drenched sands, historic Portuguese chapels, and the easy rhythm of coastal life.",
    accentColor: "#3f888f",
    gradientFrom: "#2e6f75",
    gradientTo: "#5cb3bd",
  },
  {
    slug: "andaman-nicobar",
    title: "Andaman & Nicobar",
    region: "Tropical Island Haven",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800", // tropical beach lagoon
    cities: ["Port Blair"],
    desc: "Crystal-clear turquoise waters, vibrant coral reefs, and untouched palm-fringed private shores.",
    accentColor: "#3f888f",
    gradientFrom: "#237282",
    gradientTo: "#5bc0d6",
  },
  {
    slug: "tamil-nadu",
    title: "Tamil Nadu",
    region: "Dravidian Heritage",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800", // Nilgiri/Ooty tea hills
    cities: ["Ooty"],
    desc: "Stately mountain retreats, stone-carved heritage temples, and the scenic vistas of the Nilgiris.",
    accentColor: "#9a6b3b",
    gradientFrom: "#7a552e",
    gradientTo: "#ab815b",
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.imagicaholidays.com/api/v1';

export default function DestinationsLandingClient() {
  const [destinations, setDestinations] = useState(allDestinations);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("sikkim");

  useEffect(() => {
    fetch(`${API_BASE}/website-configs/public`)
      .then(res => res.json())
      .then(d => {
        if (d.success && d.data?.config?.['landing-states'] && d.data.config['landing-states'].length > 0) {
          setDestinations(d.data.config['landing-states']);
          // Set first state slug as active accordion on load
          if (d.data.config['landing-states'][0]?.slug) {
            setActiveAccordion(d.data.config['landing-states'][0].slug);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Mobile Auto-expand accordion on scroll
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -40% 0px", // Focuses on elements near the middle of the viewport
      threshold: 0.2,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug = entry.target.getAttribute("data-slug");
          if (slug) {
            setActiveAccordion(slug);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const items = document.querySelectorAll(".mobile-state-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#f8f5f0] min-h-screen text-[#1a1714] relative overflow-hidden">
      {/* Global paper texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.04] pointer-events-none z-0" />
      
      <Navbar />
      
      {/* ── HERO SECTION: Arched Editorial Frame ── */}
      <section className="relative pt-32 pb-20 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] uppercase tracking-[0.45em] text-[#a5813b] font-bold block mb-4">
                The Curator&apos;s Collection
              </span>
              <h1 className="font-glyptic text-5xl md:text-7xl lg:text-8xl text-[#1a1714] uppercase tracking-wide leading-tight">
                The Grand <br className="hidden md:block" /> Archive
              </h1>
              <p className="font-serif italic text-[#5c544b] text-base md:text-lg max-w-xl mx-auto lg:mx-0 mt-6 leading-relaxed">
                A handcrafted directory of India&apos;s most extraordinary landscapes and premium retreats, curated exclusively by Imagica Holidays.
              </p>
              <div className="w-16 h-px bg-[#a5813b]/30 my-8 mx-auto lg:mx-0" />
            </motion.div>
          </div>

          {/* Right Column: Arched Window Display (No Taj Mahal) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] h-[380px] md:w-[350px] md:h-[460px] rounded-t-full border border-[#a5813b]/30 p-2.5 shadow-xl bg-white/50 backdrop-blur-sm"
            >
              <div className="relative w-full h-full rounded-t-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" // Misty valley peaks
                  alt="Misty tea gardens of Darjeeling"
                  fill
                  priority
                  className="object-cover transition-transform duration-[4s] hover:scale-105"
                  sizes="(max-width: 768px) 280px, 350px"
                />
                <div className="absolute inset-0 bg-[#3d3831]/10 mix-blend-multiply" />
              </div>
              {/* Gold hanging label badge */}
              <div className="absolute bottom-6 -right-4 bg-[#1a1714] text-[#d8be8f] text-[9px] uppercase tracking-[0.3em] font-bold py-2.5 px-5 shadow-2xl border border-[#d8be8f]/20 rotate-[-3deg]">
                Est. 2026
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── MOBILE VIEW: Interactive Accordion Panels ── */}
      <section className="block md:hidden px-6 pb-24 z-10 relative">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#a5813b] font-bold block mb-6 text-center">
          Scroll down or tap to expand
        </span>
        <div className="space-y-4">
          {destinations.map((dest, idx) => {
            const isActive = activeAccordion === dest.slug;
            return (
              <div
                key={dest.slug}
                data-slug={dest.slug}
                className="mobile-state-item bg-white border border-[#a5813b]/15 rounded-xl overflow-hidden shadow-sm transition-shadow duration-300"
              >
                <button
                  onClick={() => setActiveAccordion(isActive ? null : dest.slug)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5813b] block mb-1">
                      {dest.region}
                    </span>
                    <h3 
                      className="font-glyptic text-lg uppercase tracking-widest font-bold bg-gradient-to-r bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(to right, ${dest.gradientFrom}, ${dest.gradientTo})` }}
                    >
                      {dest.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center shrink-0">
                    <svg
                      className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 border-t border-stone-100 space-y-4">
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
                          <Image
                            src={dest.image}
                            alt={dest.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        <p className="font-serif italic text-sm text-[#5c544b] leading-relaxed">
                          {dest.desc}
                        </p>
                        <div className="space-y-2.5">
                          <span className="text-[8px] uppercase tracking-[0.25em] text-[#a5813b] font-bold block">
                            Chapters Inside
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {dest.cities.map((city) => (
                              <Link
                                key={city}
                                href={`/destinations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                className="bg-[#f8f5f0] border border-[#a5813b]/10 hover:border-[#a5813b]/40 rounded-full py-1.5 px-3.5 text-[10px] font-semibold text-[#1a1714] tracking-wider uppercase block"
                              >
                                {city}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <Link
                          href={`/destinations/${dest.slug}`}
                          className="flex items-center justify-center w-full py-3 bg-[#1a1714] text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-lg shadow-md mt-4"
                        >
                          View State Guide &rarr;
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── DESKTOP VIEW: Asymmetric Editorial Grid Layout ── */}
      <section className="hidden md:block max-w-7xl mx-auto py-20 px-14 lg:px-20 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, delay: (idx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-white shadow-xl p-4 transition-transform duration-700 hover:scale-[1.015]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#3d3831]/5 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                </div>
                {/* Decorative border offset frame */}
                <div className="absolute -inset-4 border-[0.5px] border-[#a5813b]/10 group-hover:border-[#a5813b]/35 transition-colors duration-700 pointer-events-none" />
              </div>

              {/* Card Footer Content */}
              <div className="mt-8 px-2 space-y-3">
                <span className="font-roman text-[#a5813b] text-[10px] uppercase tracking-[0.35em] font-bold block">
                  {dest.region}
                </span>
                
                <h3 
                  className="font-glyptic text-2xl lg:text-3xl uppercase tracking-widest transition-colors duration-300 font-bold bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(to right, ${dest.gradientFrom}, ${dest.gradientTo})` }}
                >
                  {dest.title}
                </h3>

                <p className="font-serif italic text-xs text-[#5c544b]/80 line-clamp-2 max-w-sm">
                  {dest.desc}
                </p>

                {/* Cities Pill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {dest.cities.map((city) => (
                    <Link
                      key={city}
                      href={`/destinations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-stone-100 hover:bg-[#a5813b]/10 border border-stone-200/50 hover:border-[#a5813b]/30 rounded-full py-1 px-3 text-[8.5px] font-bold text-[#5c544b] hover:text-[#a5813b] tracking-wider uppercase transition-colors"
                    >
                      {city}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="font-roman text-[9px] uppercase tracking-[0.35em] text-[#1a1714] hover:text-[#a5813b] font-bold flex items-center gap-1 transition-colors"
                  >
                    View State Guide &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Ornament spacing */}
      <div className="relative py-16 flex flex-col items-center">
         <div className="w-1 h-16 bg-gradient-to-b from-[#a5813b]/25 to-transparent" />
         <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="opacity-15 mt-6">
            <circle cx="50" cy="50" r="40" stroke="#a5813b" strokeWidth="0.5" strokeDasharray="3 5" />
            <path d="M50 25V75M25 50H75" stroke="#a5813b" strokeWidth="0.5" />
         </svg>
      </div>

      <Footer />
    </main>
  );
}
