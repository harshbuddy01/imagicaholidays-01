"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { hotelTabs } from "@/lib/constants";

export default function HotelsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const allHotels = useMemo(() => {
    return [
      ...hotelTabs.Sikkim
    ];
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hotels" 
      className="relative bg-[#f5f4ef] py-16 md:py-24 overflow-hidden w-full font-sans"
    >
      {/* Top Header Region exactly referencing the screenshot layout */}
      <div className="w-full flex items-start justify-between px-6 md:px-16 mb-10 md:mb-16 relative z-10">
        
        {/* Left Box (Dot Grid Replica) */}
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
          className="flex flex-col items-center mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e1c1a] tracking-[0.15em] font-light uppercase">
            VILLAS
          </h2>
          {/* Very tiny subtle diamond ornament under the title exactly as in imagicaholidays */}
          <div className="mt-6 opacity-40">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor">
              <path d="M5 0L10 5L5 10L0 5Z" />
            </svg>
          </div>
        </motion.div>

        {/* Right Reserve Button */}
        <button className="hidden md:flex mt-1 bg-[#6a6157] text-[#f5f4ef] px-6 py-2.5 text-[0.7rem] md:text-[0.65rem] tracking-[0.15em] uppercase hover:bg-[#4a433c] transition-colors shadow-sm items-center justify-center gap-2">
          Reserve <span className="text-[14px] leading-none mb-[2px]">·</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full h-[60vh] md:h-[75vh] flex flex-row items-center justify-between"
      >
        {/* Left Edge Text (Vertical) - Cream Margin Container */}
        <div className="w-[5vw] md:w-[8vw] h-full hidden lg:flex items-center justify-center flex-shrink-0 z-10 bg-[#f5f4ef]">
          <span className="text-[#1e1c1a] text-[0.65rem] tracking-[0.5em] uppercase opacity-80 whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Vivanta Sikkim
          </span>
        </div>

        {/* CSS block for the vertical pagination and bullet styling overflow handling */}
        <style dangerouslySetInnerHTML={{__html: `
          .custom-hotel-bullet {
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #1e1c1a;
            margin: 8px 0;
            opacity: 0.2;
            transition: all 0.4s ease;
            cursor: pointer;
          }
          .custom-hotel-bullet.swiper-pagination-bullet-active {
            opacity: 0.9 !important;
            transform: scale(1.5);
          }
        `}} />

        {/* Clean, bounded track showing the margin gaps mimicking the screenshot exactly */}
        <div className="w-full lg:w-[84vw] h-full overflow-hidden relative">
          <Swiper
            modules={[Autoplay, Pagination, Parallax]}
            parallax={true}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1200}
            slidesPerView="auto"
            spaceBetween={24}
            className="w-full h-full"
            pagination={{
              clickable: true,
              el: '.custom-hotel-pagination',
              bulletClass: 'custom-hotel-bullet',
            }}
          >
            {allHotels.map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`} className="w-[85vw] md:w-[75vw] lg:w-[65vw] h-[55vh] md:h-[70vh]">
                <div className="relative w-full h-full overflow-hidden bg-[#e8e6df]">
                  <div 
                    className="absolute top-0 left-[-20%] w-[140%] h-full"
                    data-swiper-parallax="-15%"
                  >
                    <Image
                      src={item.image}
                      alt={item.title || "Hotel Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                      priority={index < 3}
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Edge Pagination Controls (Dots) - Cream Margin Container */}
        <div className="w-[5vw] md:w-[8vw] h-full hidden lg:flex flex-col items-center justify-center flex-shrink-0 z-10 bg-[#f5f4ef] custom-hotel-pagination">
          {/* Swiper automatically injects the dots here */}
        </div>
      </motion.div>
    </section>
  );
}
