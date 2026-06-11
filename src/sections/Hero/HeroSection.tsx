"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const heroVideos = [
  { id: "video-1", src: "https://media.imagicaholidays.com/imagica-assets/hero-1-hq-compressed.mp4?v=2" },
  { id: "video-2", src: "https://media.imagicaholidays.com/imagica-assets/hero-1-hq-compressed.mp4?v=2" },
];

const getBustedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("hero-1-hq-compressed.mp4") && !url.includes("v=")) {
    return url.includes("?") ? `${url}&v=2` : `${url}?v=2`;
  }
  return url;
};

import { fetchWebsiteConfig } from "@/lib/api";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [config, setConfig] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackSlide, setFallbackSlide] = useState(0);

  // Date Booking search states
  const [selectedDest, setSelectedDest] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchWebsiteConfig().then((data) => {
      if (data && data.config?.hero) {
        setConfig(data.config.hero);
        if (data.config.hero.useVideo !== undefined) {
          setUseFallback(!data.config.hero.useVideo);
        }
      }
    });
  }, []);

  const slides = config?.fallbackSlides && config.fallbackSlides.length > 0 
    ? config.fallbackSlides 
    : heroSlides;

  useEffect(() => {
    if (video1Ref.current) video1Ref.current.load();
    if (video2Ref.current) video2Ref.current.load();
  }, [config?.videoUrl1, config?.videoUrl2]);

  // Video loop handling
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const onV1End = () => {
      if (v2.readyState >= 1 && v2.duration > 0) {
        setActiveVideo(1);
        v2.currentTime = 0;
        v2.play().catch(() => {});
      } else {
        v1.currentTime = 0;
        v1.play().catch(() => {});
      }
    };

    const onV2End = () => {
      setActiveVideo(0);
      v1.currentTime = 0;
      v1.play().catch(() => {});
    };

    v1.addEventListener("ended", onV1End);
    v2.addEventListener("ended", onV2End);

    const tryPlay = () => {
      v1.play().catch(() => {
        const resumePlay = () => {
          v1.play().catch(() => {});
          document.removeEventListener("touchstart", resumePlay);
          document.removeEventListener("click", resumePlay);
        };
        document.addEventListener("touchstart", resumePlay, { once: true });
        document.addEventListener("click", resumePlay, { once: true });
      });
    };
    tryPlay();

    return () => {
      v1.removeEventListener("ended", onV1End);
      v2.removeEventListener("ended", onV2End);
    };
  }, [useFallback]);

  // GSAP Scroll Parallax
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-video-wrapper", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Fallback image rotations
  useEffect(() => {
    if (!useFallback) return;
    const timer = setInterval(() => {
      setFallbackSlide((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [useFallback, slides.length]);

  return (
    <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-[#0c0a08]" id="journey">
      
      {/* ═══ VIDEO BACKGROUND ═══ */}
      <div className="hero-video-wrapper absolute inset-0 w-full h-full">
        {useFallback ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={fallbackSlide}
              src={slides[fallbackSlide]?.image || ""}
              alt={slides[fallbackSlide]?.title || ""}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover z-[1]"
            />
          </AnimatePresence>
        ) : (
          <>
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 0 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video
                ref={video1Ref}
                src={getBustedUrl(config?.videoUrl1 || heroVideos[0].src)}
                onError={() => setUseFallback(true)}
                onCanPlayThrough={() => {
                  // Once first video is ready, start preloading second video
                  if (video2Ref.current && video2Ref.current.preload === "none") {
                    video2Ref.current.preload = "auto";
                    video2Ref.current.load();
                  }
                }}
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                preload="auto"
                // @ts-ignore - fetchPriority for faster video download
                fetchpriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 1 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video
                ref={video2Ref}
                src={getBustedUrl(config?.videoUrl2 || heroVideos[1].src)}
                onError={() => setUseFallback(true)}
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </>
        )}
        {/* Luxury vignette shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-[3]" />
      </div>

      {/* ═══ HERO MAIN CONTENT (LEFT-ALIGNED) ═══ */}
      <div className="absolute inset-0 z-10 flex items-center justify-start max-w-7xl mx-auto px-6 md:px-12 pointer-events-none mt-[-40px] md:mt-0">
        <div className="max-w-xl md:max-w-2xl text-left">
          
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[0.62rem] md:text-[0.72rem] uppercase tracking-[0.4em] text-[#d8be8f] font-semibold mb-3 md:mb-4 font-manrope"
          >
            Journeys Crafted With Passion
          </motion.p>

          {/* Luxury Large Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl lg:text-[5.5rem] text-white font-garamond leading-[1.1] tracking-wide font-light mb-4 md:mb-6"
          >
            Explore <span className="italic text-[#d8be8f]">Extraordinary</span><br/>
            <span className="font-script gradient-text-trending text-5xl md:text-8xl lg:text-[6.8rem] tracking-normal block mt-2 drop-shadow-[0_4px_15px_rgba(216,190,143,0.35)]">
              Destinations
            </span>
          </motion.h1>


          {/* Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/75 text-xs md:text-[0.92rem] tracking-[0.08em] leading-relaxed max-w-lg mb-6 md:mb-8 font-manrope font-light"
          >
            Handcrafted luxury journeys across Ladakh, Kashmir, Sikkim, Meghalaya, Bhutan and beyond.
          </motion.p>


          {/* Date & Destination Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-full max-w-2xl bg-[#110e0b]/60 backdrop-blur-md border border-white/12 p-4 md:p-3 rounded-2xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-2 pointer-events-auto shadow-2xl mt-4 md:mt-6"
          >
            {/* Field 1: Destination Selector */}
            <div className="flex-1 flex flex-col px-4 border-b border-white/5 md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
              <label className="text-[0.55rem] font-bold tracking-[0.25em] uppercase text-[#d8be8f] mb-1 font-manrope">
                Where To?
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="bg-transparent text-white text-xs md:text-sm font-manrope focus:outline-none appearance-none cursor-pointer pr-6 w-full font-medium"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d8be8f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right center',
                  backgroundSize: '12px',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <option value="" className="bg-[#0f0d0a] text-white/55">Select Dream Escape</option>
                <option value="Gangtok" className="bg-[#0f0d0a] text-white">Gangtok</option>
                <option value="Darjeeling" className="bg-[#0f0d0a] text-white">Darjeeling</option>
                <option value="Munnar" className="bg-[#0f0d0a] text-white">Munnar</option>
                <option value="Wayanad" className="bg-[#0f0d0a] text-white">Wayanad</option>
                <option value="Jaipur" className="bg-[#0f0d0a] text-white">Jaipur</option>
                <option value="Udaipur" className="bg-[#0f0d0a] text-white">Udaipur</option>
                <option value="Goa" className="bg-[#0f0d0a] text-white">Goa</option>
                <option value="Pelling" className="bg-[#0f0d0a] text-white">Pelling</option>
                <option value="Lachung" className="bg-[#0f0d0a] text-white">Lachung</option>
              </select>
            </div>

            {/* Field 2: Date Picker */}
            <div className="flex-1 flex flex-col px-4 pb-3 md:pb-0">
              <label className="text-[0.55rem] font-bold tracking-[0.25em] uppercase text-[#d8be8f] mb-1 font-manrope">
                Travel Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={todayStr}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white text-xs md:text-sm font-manrope focus:outline-none cursor-pointer pr-1 w-full [color-scheme:dark] font-medium"
              />
            </div>

            {/* Book Now Button */}
            <Link
              href={`/reserve?destination=${encodeURIComponent(selectedDest)}&arrival=${selectedDate}`}
              className="px-6 py-3.5 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] hover:shadow-[0_0_20px_rgba(216,190,143,0.45)] text-white text-[0.65rem] font-bold uppercase tracking-[0.2em] rounded-xl md:rounded-full text-center flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 flex-shrink-0"
            >
              <span>Book Now</span>
              <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ═══ MINIMALIST VALUES FOOTER (REPLACES OLD CLUTTERED BAR) ═══ */}
      <div className="absolute bottom-16 md:bottom-20 inset-x-6 z-20 pointer-events-none max-w-7xl mx-auto border-t border-white/10 pt-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6 pointer-events-auto"
        >
          {/* Values Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8 lg:gap-x-12">
            {/* Value 1 */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d8be8f] block shadow-[0_0_6px_rgba(216,190,143,0.8)]" />
              <span className="text-[0.62rem] md:text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-white/90 font-manrope">
                Expertly Crafted
              </span>
            </div>

            {/* Value 2 */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d8be8f] block shadow-[0_0_6px_rgba(216,190,143,0.8)]" />
              <span className="text-[0.62rem] md:text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-white/90 font-manrope">
                Luxury Stays
              </span>
            </div>

            {/* Value 3 */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d8be8f] block shadow-[0_0_6px_rgba(216,190,143,0.8)]" />
              <span className="text-[0.62rem] md:text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-white/90 font-manrope">
                24/7 Support
              </span>
            </div>

            {/* Value 4 */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d8be8f] block shadow-[0_0_6px_rgba(216,190,143,0.8)]" />
              <span className="text-[0.62rem] md:text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-white/90 font-manrope">
                Safe & Secure
              </span>
            </div>
          </div>

          {/* Watch Preview Button */}
          <div className="flex items-center gap-3.5 cursor-pointer select-none group/video flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#d8be8f] border border-white/12 group-hover:border-[#d8be8f] flex items-center justify-center text-white group-hover:text-[#0f0d0a] transition-all duration-300 shadow-lg">
              <svg className="w-3.5 h-3.5 ml-0.5 fill-current transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[0.65rem] md:text-[0.68rem] font-bold tracking-[0.22em] uppercase text-white/90 group-hover:text-[#d8be8f] transition-colors duration-300 font-manrope">
              Watch Preview
            </span>
          </div>
        </motion.div>
      </div>

      {/* ═══ FOOTER INFO BAR ═══ */}
      <div className="absolute bottom-4 md:bottom-6 inset-x-6 z-20 pointer-events-none flex items-center justify-between max-w-7xl mx-auto px-1">
        {/* Left location weather */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 text-[0.55rem] md:text-[0.62rem] uppercase tracking-[0.25em] text-white font-semibold font-mono"
        >
          <svg className="w-3.5 h-3.5 text-[#d8be8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Ladakh, India <span className="opacity-40">|</span> -2°C Clear Sky
        </motion.div>

        {/* Right Scroll to discover indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-3 text-[0.55rem] md:text-[0.62rem] uppercase tracking-[0.25em] text-white font-semibold font-mono"
        >
          Scroll to discover
          <div className="w-4 h-6 border-2 border-white/30 rounded-full flex items-start justify-center p-0.5">
            <div className="scroll-wheel w-1 h-1.5 bg-[#d8be8f] rounded-full" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
