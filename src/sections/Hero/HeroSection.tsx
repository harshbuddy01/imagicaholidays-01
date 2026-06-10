"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const heroVideos = [
  { id: "video-1", src: "https://media.imagicaholidays.com/imagica-assets/hero-1-hq-compressed.mp4" },
  { id: "video-2", src: "https://media.imagicaholidays.com/imagica-assets/hero-1-hq-compressed.mp4" },
];

import { fetchWebsiteConfig } from "@/lib/api";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [config, setConfig] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackSlide, setFallbackSlide] = useState(0);

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
                src={config?.videoUrl1 || heroVideos[0].src}
                onError={() => setUseFallback(true)}
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 1 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video
                ref={video2Ref}
                src={config?.videoUrl2 || heroVideos[1].src}
                onError={() => setUseFallback(true)}
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                preload="auto"
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
            className="text-[0.6rem] md:text-[0.68rem] uppercase tracking-[0.3em] text-[#d8be8f] font-bold mb-3 md:mb-4"
          >
            Journeys Crafted With Passion
          </motion.p>

          {/* Luxury Large Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl lg:text-[5.2rem] text-white font-serif leading-[1.1] tracking-wide font-light mb-4 md:mb-6"
          >
            Explore Extraordinary<br/>
            <span className="font-serif italic text-[#d8be8f]">Destinations</span>
          </motion.h1>


          {/* Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/70 text-xs md:text-sm tracking-wide leading-relaxed max-w-md mb-6 md:mb-8 font-sans"
          >
            Handcrafted luxury journeys across Ladakh, Kashmir, Sikkim, Meghalaya, Bhutan and beyond.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 pointer-events-auto"
          >
            {/* Explore Destinations Pill */}
            <Link 
              href="/#destinations-carousel" 
              className="group relative overflow-hidden rounded-full px-5 py-3 md:px-6 md:py-3.5 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:shadow-[0_0_20px_rgba(216,190,143,0.3)] transition-all duration-300 active:scale-95"
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">Explore Destinations</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Plan My Journey Outlined Pill */}
            <Link 
              href="/reserve" 
              className="group relative overflow-hidden rounded-full px-5 py-3 md:px-6 md:py-3.5 border border-white/20 hover:border-white/40 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/5 active:scale-95"
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">Plan My Journey</span>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ═══ GLASSMORPHIC FEATURES BAR (BOTTOM OVERLAY) ═══ */}
      <div className="absolute bottom-14 md:bottom-20 inset-x-4 md:inset-x-6 z-20 pointer-events-none max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel-luxury w-full rounded-2xl p-4 md:p-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6 pointer-events-auto"
        >
          {/* Feature 1 */}
          <div className="flex items-center gap-3.5 flex-1 min-w-[150px] border-r border-white/5 last:border-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#d8be8f]/10 flex items-center justify-center text-[#d8be8f] flex-shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white">Expertly Crafted</span>
              <span className="text-[0.55rem] text-white/50 tracking-wide mt-0.5 whitespace-nowrap">Curated by travel experts</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3.5 flex-1 min-w-[150px] border-r border-white/5 last:border-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#d8be8f]/10 flex items-center justify-center text-[#d8be8f] flex-shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.583 1.828l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.777-.576-.378-1.828.583-1.828h4.907a1 1 0 00.95-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white">Luxury Stays</span>
              <span className="text-[0.55rem] text-white/50 tracking-wide mt-0.5 whitespace-nowrap">Premium stays & services</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3.5 flex-1 min-w-[150px] border-r border-white/5 last:border-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#d8be8f]/10 flex items-center justify-center text-[#d8be8f] flex-shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white">24/7 Support</span>
              <span className="text-[0.55rem] text-white/50 tracking-wide mt-0.5 whitespace-nowrap">Always alongside you</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3.5 flex-1 min-w-[150px] border-r border-white/5 last:border-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#d8be8f]/10 flex items-center justify-center text-[#d8be8f] flex-shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white">Safe & Secure</span>
              <span className="text-[0.55rem] text-white/50 tracking-wide mt-0.5 whitespace-nowrap">Your safety is our priority</span>
            </div>
          </div>

          {/* Watch Video Column */}
          <div className="flex items-center gap-3 cursor-pointer select-none min-w-[150px] border-0 pl-2">
            <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors">
              <svg className="w-3.5 h-3.5 ml-0.5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white">Watch Video</span>
              <span className="text-[0.55rem] text-white/50 tracking-wide mt-0.5 whitespace-nowrap">See the magic unfold</span>
            </div>
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
