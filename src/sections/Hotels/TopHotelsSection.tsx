"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Indian Luxury Hotel Data ──────────────────────────────── */
interface HotelPreview {
  id: string;
  name: string;
  location: string;
  tagline: string;
  image: string;
  className: string;
}

const hotels: HotelPreview[] = [
  {
    id: "lake-palace",
    name: "Lake Palace",
    location: "Udaipur, Rajasthan",
    tagline: "Floating Heritage on Lake Pichola",
    image: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=1600",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "royal-rambagh",
    name: "Rambagh Residence",
    location: "Jaipur, Rajasthan",
    tagline: "The Jewel of Jaipur",
    image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=1200",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "himalayan-retreat",
    name: "Himalayan Sanctuary",
    location: "North Sikkim",
    tagline: "Breathtaking Mountain Vistas",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1200",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "backwater-pavilion",
    name: "Backwater Pavilion",
    location: "Alleppey, Kerala",
    tagline: "Serenity on the Waterways",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    className: "md:col-span-1 md:row-span-1",
  },
];

/* ── Handcrafted Ornaments ────────────────────────────────── */
const TopOrnament = () => (
  <div className="flex flex-col items-center mb-12 opacity-80">
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M0 20C20 20 40 5 60 5C80 5 100 20 120 20" stroke="#a5813b" strokeWidth="0.5" strokeDasharray="2 2" />
       <path d="M60 0L65 10L60 20L55 10L60 0Z" fill="#a5813b" />
       <circle cx="20" cy="20" r="2" fill="#a5813b" />
       <circle cx="100" cy="20" r="2" fill="#a5813b" />
    </svg>
    <div className="w-[1px] h-12 bg-gradient-to-b from-[#a5813b] to-transparent mt-4" />
  </div>
);

const ArchitecturalDetail = () => (
  <svg 
    className="absolute -bottom-10 -right-10 w-72 h-72 opacity-[0.1] pointer-events-none group-hover:opacity-20 transition-opacity duration-[2s]" 
    viewBox="0 0 200 200" 
    fill="none"
  >
    <path d="M40 180H160M50 180V130C50 110 70 90 100 90C130 90 150 110 150 130V180" stroke="#a5813b" strokeWidth="0.5" />
    <path d="M70 130H130M100 90V60L120 40M100 60L80 40" stroke="#a5813b" strokeWidth="0.5" />
    <circle cx="100" cy="30" r="3" stroke="#a5813b" strokeWidth="0.3" />
  </svg>
);

/* ── Main Component ────────────────────────────────────────── */
export default function TopHotelsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#f8f5f0] py-24 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Top Handcrafted Design */}
        <TopOrnament />

        {/* Header Block */}
        <motion.div 
          style={{ y: headerY }}
          className="text-center mb-24 md:mb-32"
        >
          <div className="flex flex-col items-center gap-2 mb-6">
             <span className="text-[0.65rem] uppercase tracking-[0.6em] text-[#a5813b] font-bold">
               Refined Indian Heritage
             </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2">
            <h2 className="font-glyptic font-bold text-5xl md:text-8xl tracking-tight uppercase text-[#1a1714]">
              Exclusive
            </h2>
            <h2 className="font-roman font-medium text-5xl md:text-8xl tracking-widest uppercase text-[#a5813b]">
              Stays
            </h2>
          </div>

          <div className="mt-12 flex flex-col items-center">
             <div className="w-16 h-px bg-[#a5813b]/30 mb-6" />
             <p className="font-roman text-base md:text-xl text-[#5c544b] opacity-80 tracking-wide max-w-xl mx-auto leading-relaxed">
               Where local roots meet global luxury <br className="hidden md:block" /> 
               in the heart of the Indian subcontinent.
             </p>
          </div>
        </motion.div>

        {/* Masonry Layout in FULL COLOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 auto-rows-[350px] md:auto-rows-[450px] w-full">
          {hotels.map((hotel, idx) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                delay: idx * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`group relative overflow-hidden bg-white shadow-2xl rounded-sm ${hotel.className}`}
            >
              <Link href="/reserve" className="block w-full h-full">
                {/* Image Wrap - NO B&W filter */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out brightness-[0.95] contrast-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                  <span className="text-[#d8be8f] text-[0.65rem] uppercase tracking-widest font-bold mb-3">
                    {hotel.location}
                  </span>
                  <h3 className="font-roman text-2xl md:text-4xl text-white tracking-widest uppercase mb-3">
                    {hotel.name}
                  </h3>
                  <p className="text-[#f8f5f0]/80 text-sm italic font-serif group-hover:text-[#d8be8f] transition-colors duration-500">
                    {hotel.tagline}
                  </p>
                  
                  {/* Decorative underline */}
                  <div className="w-12 group-hover:w-full h-px bg-[#d8be8f]/60 mt-8 transition-all duration-[1.5s] ease-out origin-left" />
                </div>

                <ArchitecturalDetail />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Section Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="mt-32 text-center"
        >
          <Link 
            href="/reserve" 
            className="group flex flex-col items-center gap-6"
          >
            <span className="font-roman text-xl md:text-2xl text-[#1a1714] uppercase tracking-[0.3em] transition-colors group-hover:text-[#a5813b]">
              Reserve Your Indian Odyssey
            </span>
            <div className="w-16 h-px bg-[#a5813b]/40 group-hover:w-32 transition-all duration-700" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
