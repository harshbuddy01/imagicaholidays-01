"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { heroSlides } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

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
        modules={[EffectCreative, Autoplay]}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
            scale: 1,
            opacity: 1
          },
          next: {
            translate: ["100%", 0, 0],
            scale: 1,
            opacity: 1
          }
        }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
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
              <div className="flex absolute inset-x-0 bottom-32 md:bottom-40 items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-4 text-[0.65rem] md:text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-[#d8be8f]"
                  >
                    India
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
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-6 md:pb-10"
      >
        <div className="hidden bg-white px-8 py-5 md:flex items-center gap-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
          <div className="text-left flex flex-col justify-center">
            <label htmlFor="arrival" className="text-[0.55rem] uppercase tracking-[0.2em] text-[#8a6b2d] font-bold cursor-pointer">Arrival</label>
            <input 
              type="date" 
              id="arrival"
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 text-sm font-serif text-[#181510] bg-transparent outline-none cursor-pointer"
            />
          </div>
          <div className="h-8 w-px bg-[#e9deca]" />
          <div className="text-left flex flex-col justify-center">
            <label htmlFor="departure" className="text-[0.55rem] uppercase tracking-[0.2em] text-[#8a6b2d] font-bold cursor-pointer">Departure</label>
            <input 
              type="date" 
              id="departure"
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 text-sm font-serif text-[#181510] bg-transparent outline-none cursor-pointer"
            />
          </div>
          <div className="h-8 w-px bg-[#e9deca]" />
          <div className="text-left flex flex-col justify-center">
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#8a6b2d] font-bold">Guests</p>
            <p className="mt-1 text-sm font-serif text-[#181510]">2 Adults, 1 Room</p>
          </div>
          <Link href="/reserve" className="group relative overflow-hidden bg-[#181510] px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:text-[#181510] ml-4 inline-block">
            <span className="relative z-10 transition-colors duration-500">Book Now</span>
            <div className="absolute inset-0 bg-[#d8be8f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
