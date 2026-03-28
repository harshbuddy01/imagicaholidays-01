"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

  return (
    <section
      id="activities-section"
      className="relative w-full bg-[#f4ebd9] py-20 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden text-[#5c544b]"
    >
      {/* Decorative vertical dots */}
      <div className="flex flex-col items-center gap-1 mb-16">
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]" />
      </div>

      {/* ── Hover-expand panels ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-7xl mx-auto"
      >
        <div className="flex w-full items-center justify-center gap-1 md:gap-1.5">
          {activities.map((activity, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={activity.title}
                className="relative cursor-pointer overflow-hidden rounded-sm"
                style={{ boxShadow: isActive ? "0 8px 40px rgba(93,84,75,0.18)" : "0 2px 12px rgba(93,84,75,0.08)" }}
                initial={false}
                animate={{
                  width: isActive ? "38rem" : "3.5rem",
                  height: "30rem",
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                onClick={() => setActiveIndex(index)}
                onHoverStart={() => setActiveIndex(index)}
              >
                {/* Image */}
                <Image
                  src={activity.image}
                  alt={activity.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient overlay on active — warm toned */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#3d3831]/70 via-[#3d3831]/15 to-transparent"
                    />
                  )}
                </AnimatePresence>

                {/* Active content overlay */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-px bg-[#d5cab5]" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#d5cab5]">
                          {activity.subtitle}
                        </span>
                      </div>
                      <h3 className="font-roman text-2xl md:text-3xl font-semibold text-[#f4ebd9] tracking-wide">
                        {activity.title}
                      </h3>
                      <div className="w-10 h-[1.5px] bg-[#ae9e85] mt-3 rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed: vertical text with warm overlay */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-[#3d3831]/40 flex items-center justify-center"
                    >
                      <span
                        className="font-roman text-[11px] font-medium tracking-[0.3em] uppercase text-[#f4ebd9]/90"
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

        {/* ── Bottom indicators ── */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {activities.map((activity, i) => (
            <button
              key={activity.title}
              aria-label={`View ${activity.title}`}
              onClick={() => setActiveIndex(i)}
              className="relative flex flex-col items-center gap-2 group"
            >
              <span
                className={cn(
                  "text-[10px] tracking-[0.2em] uppercase transition-colors duration-300",
                  i === activeIndex ? "text-[#3d3831]" : "text-[#b5a993]"
                )}
              >
                {activity.title}
              </span>
              <span className="relative block w-10 h-[2px] bg-[#d5cab5] rounded-full overflow-hidden">
                {i === activeIndex && (
                  <motion.span
                    layoutId="activity-indicator"
                    className="absolute inset-0 bg-[#3d3831] rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tiny diamond decoration at bottom */}
      <div className="flex justify-center mt-14">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#b5a993" />
        </svg>
      </div>

      {/* Side Rotated Text */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block tracking-[0.3em] text-[0.65rem] font-medium text-[#a0947f] uppercase">
        Experiences
      </div>
    </section>
  );
}
