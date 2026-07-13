"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

interface GenericCityProps {
  citySlug: string;
  title: string;
  stateName: string;
  description: string;
  image: string;
  attractions: Array<{ name: string; tag: string; description: string }>;
  bestTime: string;
}

const cityDetailsData: Record<string, Omit<GenericCityProps, "citySlug">> = {
  kolkata: {
    title: "Kolkata",
    stateName: "West Bengal",
    description: "The cultural soul of India. Kolkata is a city of grand colonial architecture, historic trams, rich artistic heritage, and unmatched street food. A journey through Kolkata is a journey through history, literature, and culinary delights.",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    bestTime: "October to March (for pleasant winter weather and festive celebrations)",
    attractions: [
      { name: "Victoria Memorial", tag: "Monument", description: "A magnificent white marble palace built in memory of Queen Victoria, set in lush gardens." },
      { name: "Howrah Bridge", tag: "Landmark", description: "An engineering marvel and the iconic symbol of Kolkata, spanning the Hooghly River." },
      { name: "Dakshineswar Kali Temple", tag: "Heritage", description: "A historic temple complex dedicated to Goddess Kali, situated on the river banks." }
    ]
  },
  ooty: {
    title: "Ooty",
    stateName: "Tamil Nadu",
    description: "Nestled in the heart of the Nilgiri Hills, Ooty (Udhagamandalam) is the quintessential Queen of Hill Stations. Famous for its sprawling tea gardens, tranquil lakes, colonial charm, and the historic Nilgiri Mountain Railway.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    bestTime: "March to June and September to November",
    attractions: [
      { name: "Ooty Lake", tag: "Nature", description: "A scenic lake offering peaceful boat rides surrounded by tall eucalyptus trees." },
      { name: "Nilgiri Mountain Railway", tag: "UNESCO Heritage", description: "The famous toy train ride passing through steep valleys, bridges, and tunnels." },
      { name: "Doddabetta Peak", tag: "Adventure", description: "The highest point in South India, offering panoramic views of the Nilgiri range." }
    ]
  },
  "port-blair": {
    title: "Port Blair",
    stateName: "Andaman & Nicobar",
    description: "The pristine capital of the Andaman and Nicobar Islands. Port Blair is a tropical paradise offering crystal-clear turquoise waters, white sand beaches, rich marine biodiversity, and deep historical resonance.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    bestTime: "October to May (ideal for water sports, beach hopping, and island visits)",
    attractions: [
      { name: "Cellular Jail National Memorial", tag: "History", description: "The historic jail where Indian freedom fighters were exiled, presenting a moving sound & light show." },
      { name: "Corbyn's Cove Beach", tag: "Beach", description: "A coconut palm-fringed beach perfect for swimming and thrilling jet ski rides." },
      { name: "Ross Island (Netaji Subhash Chandra Bose Dweep)", tag: "Exploration", description: "Ruins of a British administrative settlement reclaimed by tropical forests and friendly deer." }
    ]
  }
};

export default function GenericCityPage({ citySlug }: { citySlug: string }) {
  const details = cityDetailsData[citySlug];

  if (!details) {
    return (
      <main className="bg-[#f8f5f0] min-h-screen text-[#1a1714]">
        <Navbar />
        <section className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-glyptic text-4xl uppercase tracking-widest mb-4">Destination Not Found</h1>
          <Link href="/destinations" className="btn-tertiary">Back to Archive</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const stateLower = details.stateName.toLowerCase();
  let themeBg = "bg-[#f8f5f0]";
  let sketchBgPattern = "/images/destinations_sketch_bg.webp"; // Default monuments sketch

  if (stateLower.includes("sikkim") || stateLower.includes("bengal") || stateLower.includes("himalayan")) {
    themeBg = "bg-[#edf1f4]";
    sketchBgPattern = "/images/activities_sketch_bg.webp";
  } else if (stateLower.includes("kerala") || stateLower.includes("tamil")) {
    themeBg = "bg-[#eaf0e9]";
    sketchBgPattern = "/images/activities_sketch_bg.webp";
  } else if (stateLower.includes("goa") || stateLower.includes("coast") || stateLower.includes("andaman")) {
    themeBg = "bg-[#e9f2f2]";
    sketchBgPattern = "/images/stays_sketch_bg.webp";
  }

  return (
    <main className={`${themeBg} min-h-screen text-[#1a1714] relative transition-colors duration-500`}>
      {/* Background Hand-Drawn Sketch & Paper Texture Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-multiply bg-repeat bg-[size:450px] md:bg-[size:800px] bg-center" style={{ backgroundImage: `url('${sketchBgPattern}')` }} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none z-0" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden z-10">
        <Image
          src={details.image}
          alt={details.title}
          fill
          className="object-cover brightness-[0.55] contrast-[1.05]"
          priority
        />
        <div className="absolute inset-0 bg-[#3d3831]/20 mix-blend-multiply" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.8em] text-[#d8be8f] font-bold mb-6">
              {details.stateName}
            </p>
            <h1 className="font-glyptic text-5xl md:text-8xl text-white uppercase tracking-[0.05em] leading-tight">
              {details.title}
            </h1>
            <div className="w-16 h-[1.5px] bg-[#d8be8f] mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Overview & Detail Section */}
      <section className="max-w-5xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
          {/* Left Column: Description & Attractions */}
          <div>
            <h2 className="font-roman italic text-3xl text-[#a5813b] mb-6">The Memoir</h2>
            <p className="font-serif text-stone-600 text-lg leading-relaxed mb-12">
              {details.description}
            </p>

            <h3 className="font-manrope text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8">
              Key Experiences & Landmarks
            </h3>
            
            <div className="space-y-8">
              {details.attractions.map((attr, idx) => (
                <div key={idx} className="border-l-2 border-[#a5813b]/30 pl-6 py-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#a5813b] bg-[#a5813b]/10 px-2.5 py-1 rounded">
                    {attr.tag}
                  </span>
                  <h4 className="font-roman text-xl text-stone-800 mt-3 mb-2">{attr.name}</h4>
                  <p className="text-stone-500 font-serif text-sm leading-relaxed">{attr.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Details & Booking Callout */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#a5813b]/15 p-8 rounded-2xl shadow-xl h-fit">
            <h3 className="font-glyptic text-xl text-stone-800 tracking-wider mb-6 uppercase">Retreat Details</h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">State Region</span>
                <span className="font-manrope text-sm font-semibold text-stone-700">{details.stateName}</span>
              </div>
              
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Best Time to Visit</span>
                <span className="font-manrope text-sm font-semibold text-stone-700">{details.bestTime}</span>
              </div>
            </div>

            <div className="border-t border-[#a5813b]/15 pt-6 text-center">
              <p className="font-serif italic text-sm text-stone-500 mb-6">
                Curate a bespoke luxury itinerary for {details.title} with our destination experts.
              </p>
              <Link
                href={`/reserve?destination=${encodeURIComponent(details.title)}`}
                className="w-full py-3.5 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] text-white text-[10px] font-bold uppercase tracking-[0.22em] rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(165,129,59,0.4)] active:scale-[0.98] transition-all duration-300 font-manrope"
              >
                Plan My Journey
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
