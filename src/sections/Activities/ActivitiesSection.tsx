"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ── Activity data ────────────────────────────────────────── */
interface Activity {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const activities: Activity[] = [
  {
    title: "Trekking",
    subtitle: "Himalayan Trails",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
    alt: "Trekking through the Himalayan mountains",
  },
  {
    title: "Yak Safari",
    subtitle: "Highland Rides",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop",
    alt: "Yak safari across high-altitude pastures",
  },
  {
    title: "Bike Ride",
    subtitle: "Mountain Roads",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200&auto=format&fit=crop",
    alt: "Bike riding on scenic mountain roads",
  },
  {
    title: "Camping",
    subtitle: "Under the Stars",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=1200&auto=format&fit=crop",
    alt: "Camping under a starry sky in the mountains",
  },
  {
    title: "Rope Course",
    subtitle: "Adventure Heights",
    image:
      "https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1200&auto=format&fit=crop",
    alt: "Rope course adventure in the forest",
  },
  {
    title: "Food",
    subtitle: "Local Flavours",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1200&auto=format&fit=crop",
    alt: "Traditional Indian food spread",
  },
  {
    title: "Paragliding",
    subtitle: "Soar the Skies",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1200&auto=format&fit=crop",
    alt: "Paragliding over mountain valleys",
  },
  {
    title: "Khangchendzonga Trek",
    subtitle: "Summit Dreams",
    image:
      "https://images.unsplash.com/photo-1585409677599-f5476da95f71?q=80&w=1200&auto=format&fit=crop",
    alt: "Khangchendzonga mountain peak trail",
  },
  {
    title: "Coronation Trek",
    subtitle: "Royal Pathways",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    alt: "Mountain trail through alpine meadows",
  },
  {
    title: "River Rafting",
    subtitle: "White Water Rush",
    image:
      "https://images.unsplash.com/photo-1530866495561-507c83d09e79?q=80&w=1200&auto=format&fit=crop",
    alt: "River rafting through rapids",
  },
  {
    title: "Parks & Sanctuaries",
    subtitle: "Wildlife Haven",
    image:
      "https://images.unsplash.com/photo-1535338454528-1b5304d1ac73?q=80&w=1200&auto=format&fit=crop",
    alt: "Lush green forest sanctuary",
  },
];

/* ── Component ────────────────────────────────────────────── */
export default function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-advance on mobile
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isMobile, activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % activities.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + activities.length) % activities.length);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const { scrollY } = useScroll();
  const ornamentY = useTransform(scrollY, [0, 5000], [0, 400]);

  return (
    <section
      id="activities-section"
      className="relative w-full bg-[#f8f5f0] py-14 md:py-32 px-4 md:px-12 lg:px-24 overflow-hidden text-[#5c544b]"
    >
      {/* Handcrafted Background Ornaments */}
      <motion.div style={{ y: ornamentY }} className="absolute -left-20 top-20 opacity-[0.08] pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none">
          <path d="M50 0C50 0 55 15 75 25C55 35 50 100 50 100C50 100 45 35 25 25C45 15 50 0 50 0Z" fill="#a5813b" />
        </svg>
      </motion.div>

      {/* Decorative vertical dots */}
      <div className="flex flex-col items-center gap-1 mb-12 md:mb-20">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ae9e85]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#ae9e85]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#ae9e85]" />
      </div>

      {/* ── Mobile: Card-based swiper ── */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* Main card */}
          <div
            className="relative w-full aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-[#a5813b]/20"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activities[activeIndex].image}
                  alt={activities[activeIndex].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/90 via-[#1a1914]/30 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-px bg-[#d5cab5]" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#d5cab5] font-bold">
                      {activities[activeIndex].subtitle}
                    </span>
                  </div>
                  <h3 className="font-roman text-4xl text-white tracking-widest leading-none">
                    {activities[activeIndex].title}
                  </h3>
                  <div className="w-12 h-px bg-[#ae9e85] mt-6" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* ... mobile indicators logic remains ... */}
          {/* Mobile dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {activities.map((_, i) => (
              <button
                key={i}
                aria-label={`View ${activities[i].title}`}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  i === activeIndex
                    ? "w-8 h-1 bg-[#8d6a2f]"
                    : "w-1 h-1 bg-[#d5cab5]"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Desktop: Hover-expand panels ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-7xl mx-auto hidden md:block"
      >
        <div className="flex w-full items-center justify-center gap-2">
          {activities.map((activity, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={activity.title}
                className="relative cursor-pointer overflow-hidden rounded-sm border border-[#a5813b]/10 bg-white"
                style={{ 
                  boxShadow: isActive ? "0 30px 60px rgba(0,0,0,0.2)" : "0 8px 16px rgba(0,0,0,0.05)" 
                }}
                initial={false}
                animate={{
                  width: isActive ? "45rem" : "4.5rem",
                  height: "35rem",
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => setActiveIndex(index)}
                onHoverStart={() => setActiveIndex(index)}
              >
                {/* Image - B&W on inactive, Color on active */}
                <Image
                  src={activity.image}
                  alt={activity.alt}
                  fill
                  className={cn(
                    "object-cover transition-all duration-[2s] ease-out",
                    isActive ? "grayscale-0 scale-105" : "grayscale contrast-[1.1] brightness-[0.9]"
                  )}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />

                {/* Content overlay */}
                <AnimatePresence>
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="absolute inset-0 flex flex-col items-start justify-end p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-px bg-[#d8be8f]" />
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#d8be8f] font-bold">
                          {activity.subtitle}
                        </span>
                      </div>
                      <h3 className="font-glyptic text-4xl lg:text-5xl font-bold text-white tracking-[0.05em] uppercase mb-4">
                        {activity.title}
                      </h3>
                      <div className="w-16 h-px bg-[#a5813b]/60" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20"
                    >
                      <span
                        className="font-roman text-[10px] font-bold tracking-[0.4em] uppercase text-white/90"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {activity.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Side Rotated Text */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block tracking-[0.5em] text-[0.6rem] font-bold text-[#a5813b] uppercase">
        Memorable Experiences
      </div>
    </section>
  );
}
