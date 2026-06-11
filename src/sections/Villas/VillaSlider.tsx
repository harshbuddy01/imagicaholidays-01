"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface VillaItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface VillaSliderProps {
  villas: VillaItem[];
  sectionTitle: string;
  sectionSubtitle: string;
}

export default function VillaSlider({ villas, sectionTitle, sectionSubtitle }: VillaSliderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const words = sectionTitle.trim().split(/\s+/);
  const titleFirst = words[0] || "Exclusive";
  const titleRest = words.slice(1).join(" ") || "Stays";

  return (
    <section
      ref={containerRef}
      id="villas"
      className="relative bg-[#f5f4ef] pt-12 pb-14 md:py-28 overflow-hidden w-full font-sans"
    >
      {/* Sketch Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.09] mix-blend-multiply bg-[url('/images/stays_sketch_bg.png')] bg-no-repeat bg-cover bg-center" />

      {/* ── Section Header ── */}
      <div className="w-full flex items-start justify-between px-6 md:px-16 mb-8 md:mb-20 relative z-10">
        {/* Left Dot Grid */}
        <div className="hidden md:grid grid-cols-4 gap-[6px] mt-2 opacity-70 flex-shrink-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-[4px] h-[4px] bg-[#1e1c1a] rounded-full" />
          ))}
        </div>

        {/* Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center mx-auto text-center"
        >
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-50 mb-4 block font-sans">
            IMAGICA HOLIDAYS
          </span>
          <div className="flex flex-col md:flex-row items-center justify-center gap-x-5 gap-y-2 mt-1">
            <h2 className="font-glyptic font-bold text-4xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#1a1714]">
              {titleFirst}
            </h2>
            {titleRest && (
              <h2 className="font-roman font-medium text-4xl md:text-7xl lg:text-8xl tracking-widest uppercase text-[#a5813b]">
                {titleRest}
              </h2>
            )}
          </div>
          <p className="mt-5 text-[#1e1c1a] opacity-55 text-sm md:text-base tracking-[0.12em] font-light italic">
            {sectionSubtitle}
          </p>
          <div className="mt-8 w-14 h-[1px] bg-[#a5813b]/40" />
        </motion.div>

        {/* Right Reserve */}
        <button className="hidden md:flex flex-shrink-0 mt-1 bg-[#6a6157] text-[#f5f4ef] px-6 py-2.5 text-[0.65rem] tracking-[0.15em] uppercase hover:bg-[#4a433c] transition-colors shadow-sm items-center justify-center gap-2 cursor-pointer">
          Reserve <span className="text-[14px] leading-none mb-[2px]">·</span>
        </button>
      </div>

      {/* ── Hotel Grid ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {villas.map((item, index) => (
            <motion.div
              key={`${item.id || "villa"}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              className="group relative bg-white/60 border border-[#d6cfc5]/50 hover:border-[#a5813b]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#a5813b]/10 overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e8e6df]">
                <Image
                  src={item.image}
                  alt={item.title || "Exclusive Stay"}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index < 4}
                />
                {/* Gold overlay on hover */}
                <div className="absolute inset-0 bg-[#a5813b]/0 group-hover:bg-[#a5813b]/10 transition-all duration-500" />
                {/* Hotel number badge */}
                <div className="absolute top-3 left-3 bg-[#1a1714]/70 text-[#f5f4ef] text-[0.6rem] tracking-[0.3em] uppercase px-2.5 py-1 font-sans backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-5 md:p-6">
                {/* Hotel Name / ID */}
                {item.id && (
                  <span className="text-[#a5813b] text-[0.6rem] tracking-[0.35em] uppercase font-bold block mb-2 font-sans">
                    {item.id}
                  </span>
                )}
                {/* Title */}
                <h3 className="font-serif text-[#1e1c1a] text-lg md:text-xl tracking-wide uppercase leading-tight mb-3 group-hover:text-[#a5813b] transition-colors duration-300">
                  {item.title}
                </h3>
                {/* Divider */}
                <div className="w-8 h-[1px] bg-[#a5813b]/40 mb-3 group-hover:w-16 transition-all duration-500" />
                {/* Description */}
                <p className="text-[#5c544b] text-sm leading-relaxed opacity-80 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Swipeable Carousel */}
        <div className="md:hidden w-full overflow-x-auto flex gap-6 snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth">
          {villas.map((item, index) => (
            <motion.div
              key={`${item.id || "villa-mob"}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              className="w-[82vw] shrink-0 snap-center bg-white border border-[#d6cfc5]/50 rounded-sm overflow-hidden flex flex-col p-3 shadow-md"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-[#e8e6df]">
                <Image
                  src={item.image}
                  alt={item.title || "Exclusive Stay"}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  priority={index < 2}
                />
                {/* Hotel number badge */}
                <div className="absolute top-2 left-2 bg-[#1a1714]/70 text-[#f5f4ef] text-[0.55rem] tracking-[0.3em] uppercase px-2 py-0.5 font-sans backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Text Content */}
              <div className="pt-4 pb-2 px-1">
                {item.id && (
                  <span className="text-[#a5813b] text-[0.55rem] tracking-[0.3em] uppercase font-bold block mb-1 font-sans">
                    {item.id}
                  </span>
                )}
                <h3 className="font-serif text-[#1e1c1a] text-base tracking-wide uppercase leading-tight mb-2">
                  {item.title}
                </h3>
                <div className="w-8 h-[1px] bg-[#a5813b]/40 mb-2" />
                <p className="text-[#5c544b] text-xs leading-relaxed opacity-85 line-clamp-3 h-[54px] overflow-hidden">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {villas.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <p className="font-serif text-[#1e1c1a] text-xl tracking-widest uppercase">
              Coming Soon
            </p>
            <p className="text-sm mt-2 text-[#5c544b]">Exclusive stays will be added shortly.</p>
          </div>
        )}
      </div>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center justify-center mt-16 md:mt-20 px-6 relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 md:w-24 h-[1px] bg-[#a5813b]/30" />
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-40 text-[#1e1c1a] font-sans whitespace-nowrap">
            {villas.length} {villas.length === 1 ? "Property" : "Properties"}
          </span>
          <div className="w-16 md:w-24 h-[1px] bg-[#a5813b]/30" />
        </div>
      </motion.div>
    </section>
  );
}
