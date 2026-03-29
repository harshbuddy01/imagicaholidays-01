"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── Destination data ─────────────────────────────────────── */
interface Destination {
  id: string;
  title: string;
  tagline: string;
  description: string;
  link: string;
  mainImage: string;
  mainImageAlt: string;
  overlayImage: string;
  overlayImageAlt: string;
}

const destinations: Destination[] = [
  {
    id: "gangtok",
    title: "Gangtok",
    tagline: "Where Tradition Meets Tranquility",
    description:
      "Discover a sanctuary in the Himalayas designed to elevate your spirit. From breathtaking mountain vistas to colorful monasteries, experience a perfect blend of spiritual heritage and natural serenity.",
    link: "/destinations/gangtok",
    mainImage:
      "https://images.unsplash.com/photo-1615966192539-f1731963b19a?q=80&w=1200&auto=format&fit=crop",
    mainImageAlt: "Houses on mountain under blue sky",
    overlayImage:
      "https://images.unsplash.com/photo-1641233122088-9562e3ef0105?q=80&w=800&auto=format&fit=crop",
    overlayImageAlt: "Colorful building in Gangtok",
  },
  {
    id: "pelling",
    title: "Pelling",
    tagline: "Whispers of Kanchenjunga",
    description:
      "Nestled in West Sikkim, Pelling offers unparalleled majestic views of Mount Kanchenjunga. Explore ancient ruins, sacred lakes, and the renowned glass skywalk in this serene Himalayan retreat.",
    link: "/destinations/pelling",
    mainImage:
      "https://unsplash.com/photos/QHuJaQQHj-M/download?force=true&w=1200",
    mainImageAlt: "Aerial view of a mountain with a statue on top in Pelling",
    overlayImage:
      "https://unsplash.com/photos/ZF6zxtpr5t8/download?force=true&w=800",
    overlayImageAlt: "Snow covered mountain under blue sky during daytime in Pelling",
  },
  {
    id: "lachung",
    title: "Lachung",
    tagline: "Gateway to Yumthang Valley",
    description:
      "Nestled at 8,610 ft in North Sikkim, Lachung enchants with snow-draped peaks, pristine rivers, and the legendary Valley of Flowers. A timeless Himalayan escape where every dawn paints the sky anew.",
    link: "/destinations/lachung",
    mainImage:
      "https://unsplash.com/photos/lVOZaQv7yj0/download?force=true&w=1200",
    mainImageAlt: "Flags on the side of a road in Lachung",
    overlayImage:
      "https://unsplash.com/photos/2LxJQfP40-o/download?force=true&w=800",
    overlayImageAlt: "Road sign towards Lachung amid mountains",
  },
  {
    id: "darjeeling",
    title: "Darjeeling",
    tagline: "The Queen of the Hills",
    description:
      "Perched amid rolling tea gardens and mist-kissed peaks, Darjeeling offers the charm of a colonial hill station with panoramic views of Kanchenjunga. Ride the iconic toy train, sip world-famous brews, and lose yourself in timeless Himalayan grandeur.",
    link: "/destinations/darjeeling",
    mainImage:
      "https://unsplash.com/photos/FuuEdB1XN4M/download?force=true&w=1200",
    mainImageAlt: "Mountain covered with snow under cloudy sky",
    overlayImage:
      "https://unsplash.com/photos/EEDy8p3rlIg/download?force=true&w=800",
    overlayImageAlt: "A small building sitting on the side of a road",
  },
];

const SLIDE_INTERVAL = 5000; // 5 seconds

/* ── Framer-motion variants ───────────────────────────────── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const imageRevealVariants = {
  hidden: { opacity: 0, clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
  visible: {
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const overlayImageVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.35, ease: "easeOut" as const },
  },
};

/* ── Component ────────────────────────────────────────────── */
export default function DestinationsCarousel() {
  const [[activeIndex, direction], setSlide] = useState([0, 0]);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      const dir = next > activeIndex ? 1 : -1;
      setSlide([next, dir]);
      setProgress(0);
    },
    [activeIndex],
  );

  /* Auto-advance every SLIDE_INTERVAL ms */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(([prev]) => {
        const next = (prev + 1) % destinations.length;
        return [next, 1];
      });
      setProgress(0);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex]); // restart timer when user manually changes

  /* Progress bar tick */
  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (SLIDE_INTERVAL / 50), 100));
    }, 50);
    return () => clearInterval(tick);
  }, [activeIndex]);

  const dest = destinations[activeIndex];

  return (
    <section
      id="destinations-carousel"
      className="relative w-full bg-[#f4ebd9] py-24 px-4 md:px-12 lg:px-24 overflow-hidden text-[#5c544b]"
    >
      {/* Decorative dots */}
      <div className="flex flex-col items-center gap-1 mb-16">
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
      </div>

      {/* ─── Slide container ─── */}
      <div className="max-w-7xl mx-auto relative" style={{ minHeight: 620 }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={dest.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.45, 0, 0.15, 1] }}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10 w-full"
          >
            {/* ── Left: Text ── */}
            <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
              <motion.h2
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="font-roman text-5xl md:text-7xl lg:text-[5rem] font-medium leading-[1.1] mb-4 text-[#3d3831] uppercase tracking-[0.15em]"
              >
                {dest.title}
              </motion.h2>

              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.25}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-px bg-[#b5a993]" />
                <p className="font-roman text-xl md:text-2xl italic text-[#927854] tracking-wide">
                  {dest.tagline}
                </p>
              </motion.div>

              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="text-sm md:text-base font-light leading-relaxed text-[#5c544b] mb-12 max-w-sm"
              >
                {dest.description}
              </motion.p>

              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.55}
              >
                <Link
                  href={dest.link}
                  className="group relative inline-block overflow-hidden rounded-full border border-[#5c544b] px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#5c544b] hover:text-[#f4ebd9]"
                >
                  <span className="relative z-10">Learn More</span>
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Overlapping images ── */}
            <div className="w-full lg:w-[55%] relative min-h-[500px] md:min-h-[560px] flex items-center justify-end">
              {/* Main large image */}
              <motion.div
                variants={imageRevealVariants}
                initial="hidden"
                animate="visible"
                className="absolute right-0 top-0 w-[85%] h-[85%] z-0 overflow-hidden rounded-sm"
              >
                <Image
                  src={dest.mainImage}
                  alt={dest.mainImageAlt}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Overlapping smaller image */}
              <motion.div
                variants={overlayImageVariants}
                initial="hidden"
                animate="visible"
                className="absolute left-0 bottom-0 w-[50%] aspect-[4/5] z-10 overflow-hidden shadow-2xl rounded-sm border-8 border-[#f4ebd9]"
              >
                <Image
                  src={dest.overlayImage}
                  alt={dest.overlayImageAlt}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Indicators ─── */}
      <div className="flex items-center justify-center gap-6 mt-20 relative z-20">
        {destinations.map((d, i) => (
          <button
            key={d.id}
            aria-label={`Go to ${d.title}`}
            onClick={() => goTo(i)}
            className="relative flex flex-col items-center gap-2 group"
          >
            {/* Destination label */}
            <span
              className={`text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                i === activeIndex ? "text-[#3d3831]" : "text-[#b5a993]"
              }`}
            >
              {d.title}
            </span>

            {/* Progress track */}
            <span className="relative block w-16 h-[2px] bg-[#d5cab5] rounded-full overflow-hidden">
              {i === activeIndex && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-[#3d3831] rounded-full"
                  style={{ width: `${progress}%` }}
                  layoutId="progress"
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
