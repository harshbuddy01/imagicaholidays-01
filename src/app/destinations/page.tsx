"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const allDestinations = [
  {
    slug: "gangtok",
    title: "Gangtok",
    region: "East Sikkim",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "darjeeling",
    title: "Darjeeling",
    region: "West Bengal",
    image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "pelling",
    title: "Pelling",
    region: "West Sikkim",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "udaipur",
    title: "Udaipur",
    region: "Rajasthan",
    image: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "jaipur",
    title: "Jaipur",
    region: "Rajasthan",
    image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "munnar",
    title: "Munnar",
    region: "Kerala",
    image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "goa",
    title: "Goa",
    region: "West Coast",
    image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "wayanad",
    title: "Wayanad",
    region: "Kerala",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "lachung",
    title: "Lachung",
    region: "North Sikkim",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function DestinationsLandingPage() {
  return (
    <main className="bg-[#f8f5f0] min-h-screen text-[#1a1714]">
      <Navbar />
      
      {/* Artisanal Heritage Hero */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Indian Heritage"
          fill
          className="object-cover brightness-[0.5] contrast-[1.1] grayscale"
          priority
        />
        <div className="absolute inset-0 bg-[#3d3831]/20 mix-blend-multiply" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.8em] text-[#d8be8f] font-bold mb-8">
              The Curator&apos;s Collection
            </p>
            <h1 className="font-glyptic text-6xl md:text-9xl text-white uppercase tracking-[0.05em] leading-tight">
              The Grand <br className="hidden md:block" /> Archive
            </h1>
            <div className="flex justify-center items-center gap-6 mt-12">
              <div className="w-12 h-px bg-[#d8be8f]/40" />
              <p className="font-roman text-white/60 italic text-lg tracking-widest uppercase">Every treasure has a story</p>
              <div className="w-12 h-px bg-[#d8be8f]/40" />
            </div>
          </motion.div>
        </div>
        
        {/* Arching frame decoration */}
        <div className="absolute top-20 left-10 right-10 bottom-10 border border-white/10 pointer-events-none" />
      </section>

      {/* Grid Portfolio Section */}
      <section className="max-w-7xl mx-auto py-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {allDestinations.map((dest, idx) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: (idx % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link href={`/destinations/${dest.slug}`} className="block">
                {/* Handcrafted Portfolio Frame */}
                <div className="relative aspect-[3/4] bg-white shadow-2xl p-4 md:p-6 transition-transform duration-700 hover:scale-[1.02]">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      className="object-cover grayscale contrast-[1.1] group-hover:grayscale-0 transition-all duration-[2s] ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                  </div>
                  
                  {/* Decorative Frame Overlays */}
                  <div className="absolute -inset-4 border-[0.5px] border-[#a5813b]/10 group-hover:border-[#a5813b]/30 transition-colors duration-1000 pointer-events-none" />
                </div>

                {/* Destination Content */}
                <div className="mt-10 flex flex-col items-center md:items-start text-center md:text-left px-2">
                  <p className="font-roman text-[#a5813b] text-sm uppercase tracking-[0.3em] font-bold mb-4">
                    {dest.region}
                  </p>
                  <h3 className="font-glyptic text-3xl text-[#1a1714] uppercase tracking-widest group-hover:text-[#a5813b] transition-colors duration-500">
                    {dest.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-[1px] bg-[#a5813b]/40 mt-6 transition-all duration-1000 origin-left" />
                  <p className="mt-6 font-roman text-[0.65rem] uppercase tracking-[0.4em] text-[#5c544b] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    Open Memoir &rarr;
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Artisanal Finale Ornaments */}
      <div className="relative py-24 flex flex-col items-center">
         <div className="w-1 h-20 bg-gradient-to-b from-[#a5813b]/30 to-transparent" />
         <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="opacity-20 mt-8">
            <circle cx="50" cy="50" r="40" stroke="#a5813b" strokeWidth="0.5" strokeDasharray="2 4" />
            <path d="M50 20V80M20 50H80" stroke="#a5813b" strokeWidth="0.5" />
         </svg>
      </div>

      <Footer />
    </main>
  );
}
