"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Autoplay, Pagination, Parallax, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { villas } from "@/lib/constants";

export default function VillasSection() {
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<any>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Custom Cursor state
  const [cursorSide, setCursorSide] = useState<"left" | "right" | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);

    // Determine if mouse is on left or right half of the viewport height (for the slider area)
    const midX = rect.width / 2;
    if (x < midX) {
      setCursorSide("left");
    } else {
      setCursorSide("right");
    }
  };

  const handleMouseLeave = () => {
    setCursorSide(null);
  };

  const handleSliderClick = () => {
    if (!sliderRef.current) return;
    if (cursorSide === "left") {
      sliderRef.current.swiper.slidePrev();
    } else if (cursorSide === "right") {
      sliderRef.current.swiper.slideNext();
    }
  };

  return (
    <section 
      ref={containerRef}
      id="villas" 
      className="relative bg-[#f5f4ef] py-16 md:py-24 overflow-hidden w-full font-sans cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleSliderClick}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center w-20 h-20 rounded-full border border-[#1e1c1a]/20 bg-[#f5f4ef]/10 backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorSide ? 1 : 0,
          scale: cursorSide ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <span className="text-[#1e1c1a] text-3xl font-light">
          {cursorSide === "left" ? "‹" : "›"}
        </span>
      </motion.div>

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
            imagicaholidays
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1e1c1a] tracking-[0.2em] font-light uppercase">
            VELA
          </h2>
          <p className="mt-6 text-[#1e1c1a] opacity-60 text-sm md:text-base tracking-[0.1em] font-light italic">
            Your Exclusive Tranquil Haven at imagicaholidays
          </p>
          <div className="mt-8 opacity-40">
            {/* imagicaholidays style ornament */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="12" cy="12" r="1.5" />
              <path d="M12 2V6M12 18V22M2 12H6M18 12H22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" />
            </svg>
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
            IMAGICAHOLIDAYS
          </span>
        </div>

        {/* Slider Container */}
        <div className="w-full lg:w-[84vw] h-[60vh] md:h-[75vh] overflow-hidden relative px-4 md:px-0">
          <Swiper
            ref={sliderRef}
            modules={[Autoplay, Pagination, Parallax, Navigation]}
            parallax={true}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            speed={1400}
            slidesPerView="auto"
            spaceBetween={40}
            className="w-full"
            pagination={{
              clickable: true,
              el: '.custom-villa-pagination',
              bulletClass: 'custom-villa-bullet',
            }}
          >
            {villas.map((item, index) => (
              <SwiperSlide key={item.id} className="w-[85vw] md:w-[70vw] lg:w-[60vw] h-full">
                <div className="flex flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8e6df]">
                    <div 
                      className="absolute top-0 left-[-15%] w-[130%] h-full"
                      data-swiper-parallax="-15%"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div 
                    className="mt-8 text-center max-w-2xl mx-auto px-4"
                    data-swiper-parallax="-10%"
                  >
                    <h3 className="text-xl md:text-2xl font-serif text-[#1e1c1a] tracking-wider mb-4 opacity-90">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#1e1c1a] opacity-60 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Edge Pagination (Vertical dots) */}
        <div className="w-[5vw] md:w-[8vw] h-full hidden lg:flex flex-col items-center justify-center flex-shrink-0 z-10 custom-villa-pagination">
          {/* Swiper dots injected here */}
        </div>
      </motion.div>

      {/* Styled dots for Swiper */}
      <style jsx global>{`
        .custom-villa-bullet {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #1e1c1a;
          margin: 12px 0;
          opacity: 0.15;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .custom-villa-bullet.swiper-pagination-bullet-active {
          opacity: 0.8 !important;
          transform: scale(1.6);
        }
      `}</style>
    </section>
  );
}
