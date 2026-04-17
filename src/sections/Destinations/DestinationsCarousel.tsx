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
    mainImage: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Scenic view of lake in Sikkim mountain valley",
    overlayImage: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Colorful buddhist monastery in Gangtok",
  },
  {
    id: "pelling",
    title: "Pelling",
    tagline: "Whispers of Kanchenjunga",
    description:
      "Nestled in West Sikkim, Pelling offers unparalleled majestic views of Mount Kanchenjunga. Explore ancient ruins, sacred lakes, and the renowned glass skywalk in this serene Himalayan retreat.",
    link: "/destinations/pelling",
    mainImage: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Reflection of urban architecture in water puddle",
    overlayImage: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Dragon shaped rooftop ornament overlooking pristine scenery",
  },
  {
    id: "lachung",
    title: "Lachung",
    tagline: "Gateway to Yumthang Valley",
    description:
      "Nestled at 8,610 ft in North Sikkim, Lachung enchants with snow-draped peaks, pristine rivers, and the legendary Valley of Flowers. A timeless Himalayan escape where every dawn paints the sky anew.",
    link: "/destinations/lachung",
    mainImage: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Colorful houses on Darjeeling/Sikkim hillside",
    overlayImage: "https://images.pexels.com/photos/33736744/pexels-photo-33736744.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Misty mountains in the Himalayas",
  },
  {
    id: "darjeeling",
    title: "Darjeeling",
    tagline: "The Queen of the Hills",
    description:
      "Perched amid rolling tea gardens and mist-kissed peaks, Darjeeling offers the charm of a colonial hill station with panoramic views of Kanchenjunga. Ride the iconic toy train, sip world-famous brews, and lose yourself in timeless Himalayan grandeur.",
    link: "/destinations/darjeeling",
    mainImage: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Darjeeling ropeway over tea gardens",
    overlayImage: "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Vintage locomotive passing through tea estates",
  },
  {
    id: "munnar",
    title: "Munnar",
    tagline: "The Emerald Heaven of Kerala",
    description:
      "Munnar is a tranquil hill station famous for its expansive tea plantations, winding lanes, and magnificent waterfalls. Experience serene backwaters and pristine wildlife in God's Own Country.",
    link: "/destinations/munnar",
    mainImage: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Lush green tea plantations in Munnar",
    overlayImage: "https://images.pexels.com/photos/29801456/pexels-photo-29801456.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Houseboats on the backwaters in Alleppey",
  },
  {
    id: "wayanad",
    title: "Wayanad",
    tagline: "Nature's Untapped Heaven",
    description:
      "Wayanad is a pristine hill station in northern Kerala known for its lush green mountains, mystic caves, and sprawling spice plantations. A true haven for trekkers and nature lovers.",
    link: "/destinations/wayanad",
    mainImage: "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Lush green landscape in Kerala",
    overlayImage: "https://images.pexels.com/photos/29757657/pexels-photo-29757657.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Aerial view of buildings and sea coast in Kerala",
  },
  {
    id: "jaipur",
    title: "Jaipur",
    tagline: "The Pink City of Royalty",
    description:
      "A breathtaking canvas of majestic forts, opulent palaces, and vibrant heritage. Jaipur immerses visitors into the regal history of Royal Rajasthan through iconic architecture like Hawa Mahal.",
    link: "/destinations/jaipur",
    mainImage: "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Albert Hall Museum in Jaipur at sunrise",
    overlayImage: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Hawa Mahal Jaipur",
  },
  {
    id: "udaipur",
    title: "Udaipur",
    tagline: "The City of Lakes",
    description:
      "Experience the magical 'Venice of the East' with its stunning interconnected lakes and majestic Mewar architecture. Witness golden sunsets over Lake Pichola and stay in floating palaces that redefine desert luxury.",
    link: "/destinations/udaipur",
    mainImage: "https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Scenic view of Lake Pichola and City Palace in Udaipur",
    overlayImage: "https://images.pexels.com/photos/29824639/pexels-photo-29824639.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Majestic view of Udaipur City Palace at sunset",
  },
  {
    id: "goa",
    title: "Goa",
    tagline: "The Pearl of the Orient",
    description:
      "From the sun-drenched beaches of the North to the tranquil, palm-fringed retreats of the South, Goa is a paradise for every traveler. Explore Portuguese heritage, vibrant night markets, and world-class luxury on the Arabian Sea.",
    link: "/destinations/goa",
    mainImage: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mainImageAlt: "Aerial view of picturesque Goa beach and resort",
    overlayImage: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=800",
    overlayImageAlt: "Traditional Goan house in tropical forest",
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
      className="relative w-full bg-[#f4ebd9] pt-24 md:pt-40 pb-16 md:pb-24 px-4 md:px-12 lg:px-24 overflow-hidden text-[#5c544b] section-fade-top scroll-mt-[90px]"
    >
      {/* Decorative dots */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
      </div>

      {/* Trending Destinations Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.45, 0, 0.15, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center w-full max-w-7xl mx-auto mb-10 md:mb-20 flex flex-col items-center select-none"
      >
        {/* Top Flower SVG */}
        <div className="mb-4 text-[#a5813b] opacity-80">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 0C60 0 62.5 10 72 12C62.5 14 60 24 60 24C60 24 57.5 14 48 12C57.5 10 60 0 60 0Z" fill="currentColor" />
            <path d="M44 8C44 8 45.5 11 48 12C45.5 13 44 16 44 16C44 16 42.5 13 40 12C42.5 11 44 8 44 8Z" fill="currentColor" />
            <path d="M76 8C76 8 77.5 11 80 12C77.5 13 76 16 76 16C76 16 74.5 13 72 12C74.5 11 76 8 76 8Z" fill="currentColor" />
            <path d="M0 11.5H38V12.5H0V11.5Z" fill="currentColor" />
            <path d="M82 11.5H120V12.5H82V11.5Z" fill="currentColor" />
          </svg>
        </div>

        <h2 className="font-glyptic font-bold text-3xl md:text-7xl lg:text-[6rem] tracking-[0.08em] md:tracking-[0.1em] uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)] gradient-text-destination">
          Destinations
        </h2>

        {/* Bottom Flower SVG */}
        <div className="mt-8 text-[#a5813b] opacity-80 rotate-180">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 0C60 0 62.5 10 72 12C62.5 14 60 24 60 24C60 24 57.5 14 48 12C57.5 10 60 0 60 0Z" fill="currentColor" />
            <path d="M44 8C44 8 45.5 11 48 12C45.5 13 44 16 44 16C44 16 42.5 13 40 12C42.5 11 44 8 44 8Z" fill="currentColor" />
            <path d="M76 8C76 8 77.5 11 80 12C77.5 13 76 16 76 16C76 16 74.5 13 72 12C74.5 11 76 8 76 8Z" fill="currentColor" />
            <path d="M0 11.5H38V12.5H0V11.5Z" fill="currentColor" />
            <path d="M82 11.5H120V12.5H82V11.5Z" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* ─── Slide & Navigation container ─── */}
      <div className="max-w-[100rem] mx-auto w-full relative flex flex-col xl:flex-row gap-8 items-stretch pt-2">
        <div className="w-full xl:w-[85%] relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={dest.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.75, ease: [0.45, 0, 0.15, 1] }}
              className="relative w-full h-[60vh] md:h-[65vh] xl:h-[75vh] flex items-center justify-center p-2 md:p-8"
            >
              <div className="relative w-full h-full max-w-[1400px] mx-auto border border-[#5c544b]/20 md:border-[#5c544b]/30 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center">

                {/* Upper-Right Dark/Image Block (bounded inside the frame!) */}
                <div className="absolute top-0 right-0 w-[50%] md:w-[40%] h-[45%] md:h-[65%] bg-[#211d18] rounded-bl-[2rem] md:rounded-bl-[4rem] z-0 overflow-hidden pointer-events-none">
                  {dest.overlayImage && (
                    <Image
                      src={dest.overlayImage}
                      alt={dest.overlayImageAlt}
                      fill
                      className="object-cover opacity-30 mix-blend-luminosity grayscale"
                    />
                  )}
                  {/* Subtle fade so the right text remains readable over the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211d18] to-transparent opacity-80" />
                </div>

                {/* Main Content Grid */}
                <div className="w-full h-full relative z-10 flex flex-col md:flex-row items-center justify-between">

                  {/* ── Left Column: Editorial Body Text ── */}
                  <div className="w-full md:w-[30%] h-auto md:h-full flex flex-col justify-end pb-4 md:pb-24 pl-4 md:pl-12 pt-0 md:pt-0 z-30 pointer-events-auto order-2 md:order-1">
                    <motion.p
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0.2}
                      className="text-[11px] md:text-sm leading-relaxed text-[#5c544b] max-w-[260px] font-medium hidden md:block"
                    >
                      {dest.description}
                    </motion.p>
                  </div>

                  {/* ── Center Column: Pill Shaped Image ── */}
                  <div className="w-full md:w-[40%] h-[70%] md:h-full flex items-center justify-center relative z-10 px-8 md:px-4 order-1 md:order-2">
                    <motion.div
                      variants={imageRevealVariants}
                      initial="hidden"
                      animate="visible"
                      className="relative w-full max-w-[200px] md:max-w-[320px] aspect-[3/5] md:aspect-[4/7] max-h-[90%] rounded-[12rem] md:rounded-[20rem] overflow-hidden border-[3px] md:border-[4px] border-[#f4ebd9] shadow-2xl"
                    >
                      <Image
                        src={dest.mainImage}
                        alt={dest.title}
                        fill
                        className="object-cover transition-transform duration-[2s] hover:scale-105"
                        sizes="(max-width: 768px) 80vw, 30vw"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* ── Right Column: Subtitle and CTA inside Dark Block ── */}
                  <div className="w-full md:w-[30%] h-auto md:h-full flex flex-col justify-start pr-4 md:pr-12 pt-2 md:pt-16 z-30 pointer-events-auto order-3">
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0.3}
                    >
                      <p className="text-[11px] md:text-sm leading-relaxed text-[#f4ebd9] md:text-[#f4ebd9] max-w-[260px] ml-auto text-right font-medium drop-shadow-sm hidden md:block">
                        {dest.tagline}
                      </p>
                      <div className="flex justify-center md:justify-end mt-3 md:mt-8">
                        <Link
                          href={dest.link}
                          className="inline-block border-b border-[#a5813b] text-[#a5813b] pb-1 text-[10px] uppercase tracking-[0.25em] font-bold transition-colors hover:text-[#f4ebd9] hover:border-[#f4ebd9]"
                        >
                          Explore More
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                </div> {/* End Main Content Grid */}

                {/* ── Giant Centered Title overlaying everything (like "Florist") ── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <motion.h2
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                    className="font-roman text-[3.5rem] md:text-[8rem] lg:text-[11rem] font-normal leading-none tracking-[0.05em] text-[#d8be8f] uppercase drop-shadow-md"
                  >
                    {dest.title}
                  </motion.h2>
                </div>

              </div> {/* End Thin Border Frame container */}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Indicators ─── */}
        <div className="w-full xl:w-[15%] flex xl:flex-col items-center xl:items-end justify-start xl:justify-center gap-3 xl:gap-3 mt-4 xl:mt-0 relative z-20 pl-0 xl:pl-8 border-t xl:border-t-0 xl:border-l border-[#d5cab5]/40 pt-4 xl:pt-0 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
          {destinations.map((d, i) => (
            <button
              key={d.id}
              aria-label={`Go to ${d.title}`}
              onClick={() => goTo(i)}
              className="relative flex xl:flex-row-reverse flex-col items-center gap-2 xl:gap-3 group flex-shrink-0 xl:w-full xl:justify-start"
            >
              {/* Destination label */}
              <span
                className={`text-[8px] tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${i === activeIndex
                  ? "text-[#3d3831] font-bold"
                  : "text-[#aa9a7e] opacity-60 hover:opacity-100"
                  }`}
              >
                {d.title}
              </span>

              {/* Progress track */}
              <span className={`relative block bg-[#dfd6c5] rounded-full overflow-hidden ${"w-6 h-[1.5px] xl:w-[1.5px] xl:h-6"
                }`}>
                {i === activeIndex && (
                  <motion.span
                    className="absolute top-0 left-0 bg-[#8d6a2f] rounded-full"
                    style={{
                      width: typeof window !== 'undefined' && window.innerWidth >= 1280 ? '100%' : `${progress}%`,
                      height: typeof window !== 'undefined' && window.innerWidth >= 1280 ? `${progress}%` : '100%',
                    }}
                    layoutId="progress"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
