"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/lib/constants";
import { fetchWebsiteConfig } from "@/lib/api";

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

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [config, setConfig] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackSlide, setFallbackSlide] = useState(0);

  const [selectedDest, setSelectedDest] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchWebsiteConfig().then((data) => {
      if (data?.config?.hero) {
        setConfig(data.config.hero);
        if (data.config.hero.useVideo !== undefined) {
          setUseFallback(!data.config.hero.useVideo);
        }
      }
    });
  }, []);

  const slides = config?.fallbackSlides?.length > 0 ? config.fallbackSlides : heroSlides;

  useEffect(() => {
    if (video1Ref.current) video1Ref.current.load();
    if (video2Ref.current) video2Ref.current.load();
  }, [config?.videoUrl1, config?.videoUrl2]);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;
    const onV1End = () => {
      if (v2.readyState >= 1 && v2.duration > 0) { setActiveVideo(1); v2.currentTime = 0; v2.play().catch(() => {}); }
      else { v1.currentTime = 0; v1.play().catch(() => {}); }
    };
    const onV2End = () => { setActiveVideo(0); v1.currentTime = 0; v1.play().catch(() => {}); };
    v1.addEventListener("ended", onV1End);
    v2.addEventListener("ended", onV2End);
    const tryPlay = () => {
      v1.play().catch(() => {
        const resume = () => { v1.play().catch(() => {}); document.removeEventListener("touchstart", resume); document.removeEventListener("click", resume); };
        document.addEventListener("touchstart", resume, { once: true });
        document.addEventListener("click", resume, { once: true });
      });
    };
    tryPlay();
    return () => { v1.removeEventListener("ended", onV1End); v2.removeEventListener("ended", onV2End); };
  }, [useFallback]);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-video-wrapper", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!useFallback) return;
    const timer = setInterval(() => setFallbackSlide((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, [useFallback, slides.length]);

  return (
    <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-[#0c0a08]" id="journey">

      {/* ── VIDEO BACKGROUND ── */}
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
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ${activeVideo === 0 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video ref={video1Ref} src={getBustedUrl(config?.videoUrl1 || heroVideos[0].src)}
                onError={() => setUseFallback(true)} autoPlay loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ${activeVideo === 1 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video ref={video2Ref} src={getBustedUrl(config?.videoUrl2 || heroVideos[1].src)}
                onError={() => setUseFallback(true)} autoPlay loop muted playsInline preload="none"
                className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/55 z-[3]" />
      </div>

      {/* ── MAIN HEADLINE — upper-centre on mobile, left on desktop ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center max-w-7xl mx-auto px-6 md:px-14 pointer-events-none pb-40 md:pb-36">
        <div className="max-w-2xl text-left">

          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[0.62rem] md:text-[0.72rem] uppercase tracking-[0.45em] text-[#d8be8f] font-semibold mb-4 font-manrope"
          >
            Journeys Crafted With Passion
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="leading-[1.05] mb-5 md:mb-6"
          >
            {/* Line 1: Explore Extraordinary — white serif */}
            <span className="block text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl text-white font-garamond font-light tracking-wide">
              Explore{" "}
              <span className="italic text-[#d8be8f]">Extraordinary</span>
            </span>

            {/* Line 2: Destinations — gold script, slightly larger */}
            <span className="block font-script text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#c9a84c] tracking-normal mt-1 drop-shadow-[0_3px_18px_rgba(201,168,76,0.45)]">
              Destinations
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/75 text-[0.8rem] sm:text-sm md:text-[0.92rem] tracking-[0.06em] leading-relaxed max-w-lg mb-0 font-manrope font-light"
          >
            Handcrafted luxury journeys across Ladakh, Kashmir, Sikkim, Meghalaya, Bhutan and beyond.
          </motion.p>
        </div>
      </div>

      {/* ── SEARCH WIDGET — pinned near bottom ── */}
      <div className="absolute bottom-[7.5rem] md:bottom-[7rem] inset-x-0 z-20 px-5 md:px-14 max-w-7xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="w-full max-w-2xl bg-[#0f0d0a]/65 backdrop-blur-md border border-white/12 p-4 md:p-3 rounded-2xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 pointer-events-auto shadow-2xl"
        >
          {/* Where To */}
          <div className="flex-1 flex flex-col px-4 border-b border-white/8 md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
            <label className="text-[0.55rem] font-bold tracking-[0.25em] uppercase text-[#d8be8f] mb-1 font-manrope">
              Where To?
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="bg-transparent text-white text-xs md:text-sm font-manrope focus:outline-none appearance-none cursor-pointer pr-6 w-full font-medium"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d8be8f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundPosition: "right center", backgroundSize: "12px", backgroundRepeat: "no-repeat",
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
              <option value="Leh Ladakh" className="bg-[#0f0d0a] text-white">Leh Ladakh</option>
              <option value="Kashmir" className="bg-[#0f0d0a] text-white">Kashmir</option>
              <option value="Sikkim" className="bg-[#0f0d0a] text-white">Sikkim</option>
            </select>
          </div>

          {/* Travel Date */}
          <div className="flex-1 flex flex-col px-4 pb-3 md:pb-0">
            <label className="text-[0.55rem] font-bold tracking-[0.25em] uppercase text-[#d8be8f] mb-1 font-manrope">
              Travel Date
            </label>
            <input
              type="date"
              value={selectedDate}
              min={todayStr}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white text-xs md:text-sm font-manrope focus:outline-none cursor-pointer w-full [color-scheme:dark] font-medium"
            />
          </div>

          {/* Book Now */}
          <Link
            href={`/reserve?destination=${encodeURIComponent(selectedDest)}&arrival=${selectedDate}`}
            className="px-6 py-3.5 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] hover:shadow-[0_0_24px_rgba(216,190,143,0.4)] text-white text-[0.65rem] font-bold uppercase tracking-[0.2em] rounded-xl md:rounded-full text-center flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 flex-shrink-0"
          >
            Book Now
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ── VALUES BAR ── */}
      <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 md:px-14 py-3 md:py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pointer-events-auto"
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8">
            {["Expertly Crafted", "Luxury Stays", "24/7 Support", "Safe & Secure"].map((val) => (
              <div key={val} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#d8be8f] block shadow-[0_0_5px_rgba(216,190,143,0.7)]" />
                <span className="text-[0.58rem] md:text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-white/85 font-manrope">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Location + Scroll */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.22em] text-white/50 font-mono">
              <svg className="w-3 h-3 text-[#d8be8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ladakh, India
            </div>
            <div className="hidden md:flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.2em] text-white/40 font-mono">
              Scroll to discover
              <div className="w-3.5 h-5 border border-white/25 rounded-full flex items-start justify-center p-[3px]">
                <div className="scroll-wheel w-0.5 h-1.5 bg-[#d8be8f] rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
