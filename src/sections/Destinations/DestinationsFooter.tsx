"use client";

import { motion } from "framer-motion";

export default function DestinationsFooter() {
  return (
    <section className="relative w-full flex flex-col items-center bg-[#f8f5f0] pt-4 pb-6 px-4 md:px-8 text-[#5c544b] overflow-hidden">

      {/* Detailed Horizontal Line with Sunburst Center */}
      <div className="relative w-full max-w-4xl flex items-center justify-center mb-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#b5a993] to-[#b5a993] mr-4" />

        {/* Sunburst Icon */}
        <div className="flex-shrink-0 text-[#ae9e85]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          </svg>
        </div>

        <div className="w-full h-px bg-gradient-to-l from-transparent via-[#b5a993] to-[#b5a993] ml-4" />

        {/* Dotted guides at ends */}
        <div className="absolute left-0 -top-8 w-px h-8 border-l-[1.5px] border-dotted border-[#b5a993] hidden md:block" />
        <div className="absolute right-0 -top-8 w-px h-8 border-r-[1.5px] border-dotted border-[#b5a993] hidden md:block" />
        <div className="absolute left-0 top-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-[#b5a993] hidden md:block bg-[#f8f5f0]" />
        <div className="absolute right-0 top-1/2 translate-x-1/2 w-2 h-2 rounded-full border border-[#b5a993] hidden md:block bg-[#f8f5f0]" />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#a5813b] font-bold mb-4">
          Your Exclusive Tranquil Haven
        </p>

        <div className="flex items-center justify-center gap-x-2 md:gap-x-4 select-none mt-1">
          <h2 className="font-glyptic font-bold text-3xl md:text-6xl lg:text-7xl tracking-wide uppercase text-[#1a1714]">
            Activities
          </h2>
          <span className="font-script text-4xl md:text-7xl lg:text-8xl text-[#a5813b] leading-none select-none lowercase translate-y-1">
            &
          </span>
          <h2 className="font-glyptic font-bold text-3xl md:text-6xl lg:text-7xl tracking-wide uppercase text-[#a5813b]">
            Foods
          </h2>
        </div>

        {/* Tiny diamond decoration */}
        <div className="flex justify-center mt-4">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#b5a993" />
          </svg>
        </div>
      </motion.div>

      {/* Side Rotated Text */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block tracking-[0.3em] text-[0.65rem] font-medium text-[#a0947f] uppercase">
        Explore India
      </div>
    </section>
  );
}
