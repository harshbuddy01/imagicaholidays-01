"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function GangtokSection() {
  return (
    <section className="relative w-full bg-[#f4ebd9] py-24 px-4 md:px-12 lg:px-24 overflow-hidden text-[#5c544b]">
      {/* Decorative vertical dots at the top to match the flow */}
      <div className="flex flex-col items-center gap-1 mb-16">
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]"></div>
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]"></div>
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5rem] font-light leading-[1.1] mb-4 text-[#3d3831] uppercase tracking-[0.1em]">
              Gangtok
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#b5a993]"></div>
              <p className="font-serif text-xl md:text-2xl italic text-[#927854] tracking-wide">
                Where Tradition Meets Tranquility
              </p>
            </div>
            
            <p className="text-sm md:text-base font-light leading-relaxed text-[#5c544b] mb-12 max-w-sm">
              Discover a sanctuary in the Himalayas designed to elevate your spirit. From breathtaking mountain vistas to colorful monasteries, experience a perfect blend of spiritual heritage and natural serenity.
            </p>
            
            <Link 
              href="/destinations/gangtok"
              className="group relative overflow-hidden rounded-full border border-[#5c544b] px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#5c544b] hover:text-[#f4ebd9] inline-block"
              aria-label="Learn more about Gangtok holiday packages"
            >
              <span className="relative z-10">Explore Gangtok</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Overlapping Images */}
        <div className="w-full lg:w-[55%] relative min-h-[500px] md:min-h-[600px] flex items-center justify-end">
          
          {/* Main Large Image (Background/Right) */}
          <motion.div 
            initial={{ opacity: 0, clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            whileInView={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 w-[85%] h-full z-0 overflow-hidden rounded-sm"
          >
            <Image 
              src="https://images.unsplash.com/photo-1615966192539-f1731963b19a?q=80&w=1200&auto=format&fit=crop" 
              alt="Houses on mountain under blue sky" 
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Overlapping Smaller Image (Foreground/Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[55%] aspect-[4/5] z-10 overflow-hidden shadow-2xl rounded-sm border-8 border-[#f4ebd9]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1641233122088-9562e3ef0105?q=80&w=800&auto=format&fit=crop" 
              alt="Colorful building in Gangtok" 
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
