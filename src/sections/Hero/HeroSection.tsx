"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { heroSlides } from "@/lib/constants";
import { useSearch } from "@/hooks/useSearch";
import { AnimatePresence } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // -- Date & Booking State --
  const [minDate, setMinDate] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const { results, loading } = useSearch(destQuery);
  const [showResults, setShowResults] = useState(false);


  useEffect(() => {
    // Set min date on client to avoid hydration mismatch
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setArrival(newVal);
    // If arrival is later than current departure, clear departure
    if (departure && newVal > departure) {
      setDeparture("");
    }
  };

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-image", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-white">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        speed={1400}
        onSlideChange={(swiper: SwiperType) => {
          if (!progressRef.current) return;
          const index = swiper.realIndex;
          const percent = ((index + 1) / heroSlides.length) * 100;
          progressRef.current.style.width = `${percent}%`;
        }}
        className="h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="hero-image object-cover hero-ken-burns"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="flex absolute inset-x-0 bottom-24 md:bottom-40 items-center justify-center text-center px-6">
                <div className="max-w-4xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-4 flex items-center justify-center gap-1.5 text-[0.65rem] md:text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-[#d8be8f]"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {slide.location || "India"}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-title text-white"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-4"
                  >
                    <button className="btn-primary">
                      Discover the Estate
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-4 md:pb-10"
      >
        {/* Desktop booking bar */}
        <div className="hidden bg-white px-10 py-6 md:flex items-center gap-12 shadow-[0_40px_80px_rgba(0,0,0,0.2)] rounded-sm border border-[#e9deca]/30">
          {/* --- Destination Search --- */}
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

          {/* --- Arrival --- */}
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
