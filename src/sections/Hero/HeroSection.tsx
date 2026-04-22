"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/lib/constants";
import { useSearch } from "@/hooks/useSearch";

gsap.registerPlugin(ScrollTrigger);

/* ── Video configuration ────────────────────────────────────
   Place your Pexels videos in /public/videos/ as:
     hero-1.mp4  (Majestic Icelandic Mountain)
     hero-2.mp4  (Hot Air Balloons over Cappadocia)
   ──────────────────────────────────────────────────────────── */
const heroVideos = [
  { id: "video-1", src: "/videos/hero-1.mp4", title: "Arctic Majesty", location: "Iceland" },
  { id: "video-2", src: "/videos/hero-2.mp4", title: "Morning Flight", location: "Cappadocia" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [activeVideo, setActiveVideo] = useState(0);
  const [videosReady, setVideosReady] = useState(false);

  // Date & Booking State
  const [minDate, setMinDate] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const { results, loading } = useSearch(destQuery);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setArrival(newVal);
    if (departure && newVal > departure) setDeparture("");
  };

  /* ── Video playback logic ── */
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Check if videos can play
    const checkReady = () => {
      // If the first video is ready, we can hide the blurred overlay
      setVideosReady(true);
    };

    v1.addEventListener("canplaythrough", checkReady);

    // Dynamic switching or looping
    const onV1End = () => {
      // Check if hero-2.mp4 actually exists/has duration
      if (v2.readyState >= 1 && v2.duration > 0) {
        setActiveVideo(1);
        v2.currentTime = 0;
        v2.play().catch(() => {});
      } else {
        // Just loop v1
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

    // Initial play attempt
    v1.play().catch(() => {});

    return () => {
      v1.removeEventListener("canplaythrough", checkReady);
      v1.removeEventListener("ended", onV1End);
      v2.removeEventListener("ended", onV2End);
    };
  }, []);

  /* ── GSAP parallax on scroll ── */
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-video-wrapper", {
        yPercent: 12,
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

  /* ── Fallback: use image slides if videos not available ── */
  const [useFallback, setUseFallback] = useState(false);
  // Use Swiper fallback state
  const [fallbackSlide, setFallbackSlide] = useState(0);

  useEffect(() => {
    // Check if video files exist by trying to fetch them
    fetch("/videos/hero-1.mp4", { method: "HEAD" })
      .then((res) => {
        if (!res.ok || res.headers.get("content-type")?.includes("text/html")) {
          setUseFallback(true);
        }
      })
      .catch(() => setUseFallback(true));
  }, []);

  // Fallback image rotation
  useEffect(() => {
    if (!useFallback) return;
    const timer = setInterval(() => {
      setFallbackSlide((p) => (p + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [useFallback]);

  return (
    <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-black">

      {/* ═══ VIDEO BACKGROUND ═══ */}
      <div className="hero-video-wrapper absolute inset-0 w-full h-full">
        {/* Video Container 1 */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${activeVideo === 0 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
          <video
            ref={video1Ref}
            src={heroVideos[0].src}
            onFocus={() => {}} // Placeholder or other events if needed
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Video Container 2 */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${activeVideo === 1 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
          <video
            ref={video2Ref}
            src={heroVideos[1].src}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-[3]" />

        {/* --- INSTRUCTION OVERLAY (Only shows if files are missing) --- */}
        {!videosReady && (
          <div className="absolute inset-0 z-[4] flex items-center justify-center p-10 bg-black/60 backdrop-blur-sm pointer-events-none">
            <div className="max-w-md text-center border border-[#d8be8f]/30 p-8 rounded-sm bg-black/40">
              <p className="text-[#d8be8f] text-[0.65rem] uppercase tracking-widest mb-4">Awaiting Media</p>
              <p className="text-white/60 text-[0.8rem] font-serif leading-relaxed">
                To play your Pexels video, please save it as <span className="text-[#d8be8f]">/public/videos/hero-1.mp4</span> and refresh.
              </p>
              <div className="mt-6 flex justify-center gap-4 opacity-40">
                <div className="animate-pulse w-1.5 h-1.5 bg-[#d8be8f] rounded-full" />
                <div className="animate-pulse w-1.5 h-1.5 bg-[#d8be8f] rounded-full delay-75" />
                <div className="animate-pulse w-1.5 h-1.5 bg-[#d8be8f] rounded-full delay-150" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ HERO TEXT OVERLAY (CIRCULAR MINIMALISM) ═══ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6 pointer-events-none">
        
        {/* The Central Circle Frame - Fully Transparent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[340px] h-[340px] md:w-[540px] md:h-[540px] flex items-center justify-center border border-white/20 rounded-full"
        >
          <div className="relative z-10 flex flex-col items-center max-w-[85%] pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <div className="relative w-16 h-10 mb-2 mx-auto">
                    <Image src="/logo_icon.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <h1 className="font-glyptic text-2xl md:text-4xl text-white tracking-[0.4em] uppercase leading-relaxed text-center">
                    IMAGICA<br/>HOLIDAYS
                  </h1>
                </div>
                
                <div className="w-16 h-px bg-[#d8be8f]/60 mb-6" />

                <p className="font-serif text-[0.85rem] md:text-[1rem] text-[#d8be8f] uppercase tracking-[0.4em] font-bold leading-relaxed max-w-sm mb-4">
                  Handcrafted Luxury Journeys
                </p>

                <p className="font-roman text-[0.7rem] md:text-[0.8rem] text-white/70 italic tracking-[0.15em] leading-relaxed max-w-xs">
                  &quot;Crafting life&apos;s most profound memories where local roots meet global luxury.&quot;
                </p>

                {/* View More Trigger */}
                <button 
                  onClick={() => {
                    const el = document.getElementById("attractive-spots");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-12 group flex flex-col items-center gap-3"
                >
                  <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/80 group-hover:text-[#d8be8f] transition-colors">
                    View more
                  </span>
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#d8be8f] transition-colors"
                  >
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40 group-hover:text-[#d8be8f]">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </motion.div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ═══ BOOKING BAR ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-4 md:pb-10"
      >
        {/* Desktop booking bar */}
        <div className="hidden bg-white px-10 py-6 md:flex items-center gap-12 shadow-[0_40px_80px_rgba(0,0,0,0.2)] rounded-sm border border-[#e9deca]/30">
          {/* Destination Search */}
          <div className="relative text-left flex flex-col justify-center min-w-[200px]">
            <label htmlFor="dest-search" className="text-[0.55rem] uppercase tracking-[0.25em] text-[#8a6b2d] font-bold cursor-pointer">Where to?</label>
            <input
              type="text"
              id="dest-search"
              placeholder="e.g. Sikkim, Bali..."
              value={destQuery}
              onChange={(e) => setDestQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
              className="mt-1.5 text-[0.85rem] font-serif text-[#181510] bg-transparent outline-none placeholder:text-gray-300 placeholder:italic placeholder:font-normal"
            />

            <AnimatePresence>
              {showResults && (destQuery || loading) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-full left-0 mb-4 w-72 bg-white shadow-2xl p-2 border border-[#e9deca]/40 overflow-hidden"
                >
                  {loading && <div className="p-3 text-[10px] uppercase tracking-widest text-gray-400">Searching...</div>}
                  {results.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {results.map((res) => (
                        <button
                          key={res.id}
                          onClick={() => {
                            setDestQuery(res.name || res.title || "");
                            setShowResults(false);
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-[#f9f7f2] transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 relative overflow-hidden flex-shrink-0">
                            {res.image ? <Image src={res.image} alt="" fill className="object-cover" /> : <div className="bg-[#d8be8f]/20 w-full h-full flex items-center justify-center text-[10px] text-[#8a6b2d]">★</div>}
                          </div>
                          <div>
                            <p className="text-[0.7rem] font-bold text-[#181510] uppercase tracking-wider line-clamp-1">{res.name || res.title}</p>
                            <p className="text-[0.55rem] text-[#8a6b2d] uppercase tracking-widest">{res.type}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : !loading && destQuery && (
                    <div className="p-3 text-[10px] uppercase tracking-widest text-[#8a6b2d]">No destinations found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-10 w-px bg-[#e9deca]" />

          {/* Arrival */}
          <div className="text-left flex flex-col justify-center">
            <label htmlFor="arrival" className="text-[0.55rem] uppercase tracking-[0.25em] text-[#8a6b2d] font-bold cursor-pointer">Arrival</label>
            <input
              type="date"
              id="arrival"
              value={arrival}
              min={minDate}
              onChange={handleArrivalChange}
              className="mt-1 text-sm font-serif text-[#181510] bg-transparent outline-none cursor-pointer"
            />
          </div>
          <div className="h-8 w-px bg-[#e9deca]" />
          <div className="text-left flex flex-col justify-center">
            <label htmlFor="departure" className="text-[0.55rem] uppercase tracking-[0.2em] text-[#8a6b2d] font-bold cursor-pointer">Departure</label>
            <input
              type="date"
              id="departure"
              value={departure}
              min={arrival || minDate}
              onChange={(e) => setDeparture(e.target.value)}
              className="mt-1 text-sm font-serif text-[#181510] bg-transparent outline-none cursor-pointer"
            />
          </div>
          <div className="h-10 w-px bg-[#e9deca]" />
          <div className="text-left flex flex-col justify-center min-w-[80px]">
            <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#8a6b2d] font-bold">Guests</p>
            <p className="mt-1.5 text-[0.85rem] font-serif text-[#181510]">2 Adults</p>
          </div>

          <Link
            href={`/reserve?arrival=${arrival}&departure=${departure}`}
            className="group relative overflow-hidden bg-[#181510] px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:text-[#181510] ml-4 inline-block"
          >
            <span className="relative z-10 transition-colors duration-500">Book Now</span>
            <div className="absolute inset-0 bg-[#d8be8f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </Link>
        </div>

        {/* Mobile booking CTA */}
        <Link
          href="/reserve"
          className="flex md:hidden items-center justify-center gap-3 mx-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] border border-[#e9deca]/40"
        >
          <svg className="w-4 h-4 text-[#8a6b2d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#181510]">
            Book Your Journey
          </span>
          <svg className="w-3.5 h-3.5 text-[#8a6b2d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
