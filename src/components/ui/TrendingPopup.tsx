"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * WEEKLY UPDATE CONFIG - MULTI-ITEM ARRAY
 * Add or remove trending spots here.
 */
const TRENDING_COLLECTION = [
  {
    id: 1,
    region: "Northern Frontiers",
    title: "Kedarnath",
    tagline: "The Sacred Spiritual Peaks",
    image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=1200",
    lastUpdated: "April 22, 2026",
    link: "/destinations/gangtok",
  },
  {
    id: 2,
    region: "South India Heritage",
    title: "Munnar",
    tagline: "Tropical Tea Sanctuaries",
    image: "https://images.pexels.com/photos/13691355/pexels-photo-13691355.jpeg?auto=compress&cs=tinysrgb&w=1200",
    lastUpdated: "April 22, 2026",
    link: "/destinations/munnar",
  },
  {
    id: 3,
    region: "Royal Rajasthan",
    title: "Udaipur",
    tagline: "The City of Lakes & Palaces",
    image: "https://images.pexels.com/photos/20340331/pexels-photo-20340331.jpeg?auto=compress&cs=tinysrgb&w=1200",
    lastUpdated: "April 22, 2026",
    link: "/destinations/udaipur",
  }
];

export default function TrendingPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("trending_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("trending_dismissed", "true");
  };

  const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TRENDING_COLLECTION.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TRENDING_COLLECTION.length) % TRENDING_COLLECTION.length);
  };

  const currentData = TRENDING_COLLECTION[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotate: direction > 0 ? 5 : -5
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotate: direction < 0 ? 5 : -5
    })
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:right-auto md:bottom-8 md:left-8 z-[150] w-auto md:w-[400px] pointer-events-auto"
        >
          {/* Postcard Stack Effect */}
          <div className="absolute inset-0 bg-[#e5e1d8] translate-x-2 translate-y-2 border border-[#a5813b]/10 -z-10" />
          
          <div className="relative bg-[#f8f5f0] p-4 shadow-2xl overflow-hidden border border-[#a5813b]/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.05] pointer-events-none" />
            
            {/* Header / Controls */}
            <div className="flex justify-between items-center mb-4 px-2">
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#a5813b] font-bold">Trending Focus</span>
                  <span className="text-[10px] text-[#5c544b] opacity-60">Memoir {currentIndex + 1} / {TRENDING_COLLECTION.length}</span>
               </div>
               
               <div className="flex items-center gap-3">
                  <button onClick={prevCard} className="hover:text-[#a5813b] transition-colors">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </button>
                  <button onClick={nextCard} className="hover:text-[#a5813b] transition-colors">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </button>
                  <button onClick={handleDismiss} className="ml-2 hover:rotate-90 transition-transform text-[#8b1a1a]">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                     </svg>
                  </button>
               </div>
            </div>

            {/* Card Content with Flipping Animation */}
            <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden mb-6">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentData.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={currentData.image}
                      alt={currentData.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714]/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#d8be8f] mb-1 font-bold">{currentData.region}</p>
                      <h3 className="font-glyptic text-3xl text-white uppercase tracking-widest">{currentData.title}</h3>
                    </div>

                    {/* Stamp */}
                    <div className="absolute top-4 right-4 bg-white/80 p-2 shadow-inner border border-black/5 rotate-6">
                       <div className="relative w-10 h-7">
                          <Image src="/logo_icon.png" alt="Stamp" fill className="object-contain" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-2 text-center pb-2">
               <p className="font-roman text-sm italic text-[#5c544b] mb-6 min-h-[40px]">
                  &quot;{currentData.tagline}&quot;
               </p>
               
               <Link
                href={currentData.link}
                className="group relative inline-flex items-center justify-center w-full py-3.5 bg-[#1a1714] text-[#d8be8f] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#a5813b] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                  Open Memoir &rarr;
                </span>
              </Link>
              
              <p className="mt-6 text-[0.5rem] uppercase tracking-[0.2em] text-[#1a1714] opacity-30">
                 Updated for you on {currentData.lastUpdated}
              </p>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -bottom-4 -left-4 w-16 h-16 opacity-10 pointer-events-none rotate-180">
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100C30 100 100 30 100 0" stroke="#a5813b" strokeWidth="1.5" />
             </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
