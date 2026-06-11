"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Autoplay, Pagination, Parallax, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { villas as staticVillas } from "@/lib/constants";
import { fetchWebsiteConfig } from "@/lib/api";

export default function VillasSection() {
  const [config, setConfig] = useState<any | null>(null);
  
  useEffect(() => {
    fetchWebsiteConfig().then((data) => {
      if (data && data.config?.villas) {
        setConfig(data.config.villas);
      }
    });
  }, []);

  const villas = useMemo(() => {
    if (config) {
      if (Array.isArray(config)) return config;
      if (config.items && Array.isArray(config.items)) return config.items;
    }
    return staticVillas;
  }, [config]);

  const sectionTitle = useMemo(() => {
    if (config && !Array.isArray(config) && config.title) return config.title;
    return "Exclusive Stays";
  }, [config]);

  const sectionSubtitle = useMemo(() => {
    if (config && !Array.isArray(config) && config.subtitle) return config.subtitle;
    return "Your Exclusive Tranquil Haven at IMAGICA HOLIDAYS";
  }, [config]);

  const titleWords = useMemo(() => {
    const words = sectionTitle.trim().split(/\s+/);
    return {
      first: words[0] || "Exclusive",
      rest: words.slice(1).join(" ") || "Stays"
    };
  }, [sectionTitle]);

  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<any>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      id="villas" 
      className="relative bg-[#f5f4ef] py-16 md:py-24 overflow-hidden w-full font-sans"
    >
      {/* Sketch Background Painting of Taj Hotel & Skies */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.11] mix-blend-multiply bg-[url('/images/stays_sketch_bg.png')] bg-no-repeat bg-cover bg-center" />

      {/* Top Header Region */}
      <div className="w-full flex items-start justify-between px-6 md:px-16 mb-10 md:mb-16 relative z-10">
        
        {/* Left Box (Dot Grid) */}
        <div className="hidden md:grid grid-cols-4 gap-[6px] mt-2 opacity-80">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-[4px] h-[4px] bg-[#1e1c1a] rounded-full"></div>
          ))}
        </div>

        {/* Center Title & Ornament */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mx-auto text-center"
        >
          <span className="text-[0.65rem] tracking-[0.4em] uppercase opacity-60 mb-4 block">
            IMAGICA HOLIDAYS
          </span>
          <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2 mt-2">
            <h2 className="font-glyptic font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#1a1714]">
              {titleWords.first}
            </h2>
            {titleWords.rest && (
              <h2 className="font-roman font-medium text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase text-[#a5813b]">
                {titleWords.rest}
              </h2>
            )}
          </div>
          <p className="mt-6 text-[#1e1c1a] opacity-60 text-sm md:text-base tracking-[0.1em] font-light italic">
            {sectionSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center">
            <div className="w-16 h-[1px] bg-[#a5813b]/30 mb-6" />
          </div>
        </motion.div>

        {/* Right Reserve Button */}
        <button className="hidden md:flex mt-1 bg-[#6a6157] text-[#f5f4ef] px-6 py-2.5 text-[0.7rem] md:text-[0.65rem] tracking-[0.15em] uppercase hover:bg-[#4a433c] transition-colors shadow-sm items-center justify-center gap-2 relative z-20 cursor-pointer">
          Reserve <span className="text-[14px] leading-none mb-[2px]">·</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full flex flex-row items-center justify-between"
      >
        {/* Left Edge Text (Vertical) */}
        <div className="w-[5vw] md:w-[8vw] h-full hidden lg:flex items-center justify-center flex-shrink-0 z-10">
          <span className="text-[#1e1c1a] text-[0.65rem] tracking-[0.5em] uppercase opacity-40 whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            IMAGICA HOLIDAYS
          </span>
        </div>

        {/* Slider Container */}
        <div className="w-full lg:w-[84vw] h-[60vh] md:h-[75vh] overflow-hidden relative px-4 md:px-0">
          
          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute left-4 top-[30%] md:top-[35%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#1e1c1a]/10 bg-[#f5f4ef]/80 hover:bg-[#1e1c1a] hover:text-[#f5f4ef] hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hidden md:flex">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-[30%] md:top-[35%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#1e1c1a]/10 bg-[#f5f4ef]/80 hover:bg-[#1e1c1a] hover:text-[#f5f4ef] hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hidden md:flex">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <Swiper
            key={villas.length}
            ref={sliderRef}
            modules={[Autoplay, Pagination, Parallax, Navigation]}
            parallax={true}
            centeredSlides={true}
            loop={villas.length > 2}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            speed={1400}
            slidesPerView="auto"
            spaceBetween={40}
            className="w-full h-full"
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              type: 'fraction',
              el: '.custom-villa-pagination',
              renderFraction: (currentClass, totalClass) => {
                return `<span class="${currentClass} text-[#a5813b] font-serif font-medium text-lg md:text-xl"></span>` +
                       `<span class="mx-2 md:mx-3 opacity-30 text-base md:text-lg">/</span>` +
                       `<span class="${totalClass} opacity-60 font-serif text-sm md:text-base"></span>`;
              }
            }}
          >
            {villas.map((item: any, index: number) => (
              <SwiperSlide key={`${item.id || 'villa'}-${index}`} className="w-[85vw] md:w-[70vw] lg:w-[60vw] h-full">
                <div className="flex flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8e6df] shadow-md rounded-sm">
                    <div 
                      className="absolute top-0 left-[-15%] w-[130%] h-full"
                      data-swiper-parallax="-15%"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title || "Exclusive Stay"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div 
                    className="mt-8 text-center max-w-2xl mx-auto px-4"
                    data-swiper-parallax="-10%"
                  >
                    {/* Hotel Name (item.id) */}
                    {item.id && (
                      <span className="text-[#a5813b] text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.3em] font-bold block mb-3 font-sans">
                        {item.id}
                      </span>
                    )}
                    {/* Hotel Title/Tagline (item.title) */}
                    <h3 className="text-xl md:text-3xl font-serif text-[#1e1c1a] tracking-widest uppercase mb-4 opacity-95">
                      {item.title}
                    </h3>
                    {/* Hotel Description (item.description) */}
                    <p className="text-sm md:text-base text-[#5c544b] opacity-80 font-roman leading-relaxed max-w-xl mx-auto">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Edge Pagination (Vertical fraction) */}
        <div className="w-[5vw] md:w-[8vw] h-full hidden lg:flex flex-col items-center justify-center flex-shrink-0 z-10 custom-villa-pagination font-serif">
          {/* Fraction injected here */}
        </div>
      </motion.div>

      {/* Styles for navigation buttons */}
      <style jsx global>{`
        .custom-villa-pagination {
          color: #1e1c1a;
          letter-spacing: 0.05em;
        }
      `}</style>
    </section>
  );
}
