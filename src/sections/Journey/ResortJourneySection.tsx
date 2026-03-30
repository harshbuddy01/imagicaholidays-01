"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const journeyCards = [
  {
    id: "j1",
    title: "Mountain Horizons",
    script: "Where the sky meets the peaks",
    description: "Snow-capped summits and rocky shores frame your first glimpse of the mighty Eastern Himalayas.",
    image: "https://unsplash.com/photos/usVYPlEuPK4/download?force=true&w=1600"
  },
  {
    id: "j2",
    title: "River & Valley Trails",
    script: "Into the valley",
    description: "Winding rivers, wooden boats, and emerald hills — discover hidden valleys where time slows down.",
    image: "https://unsplash.com/photos/Xqw7XgnvU3w/download?force=true&w=1600"
  },
  {
    id: "j3",
    title: "Living Culture",
    script: "Ancient traditions alive",
    description: "Vibrant festivals, masked dances, and centuries-old Buddhist rituals that define the soul of Sikkim.",
    image: "https://unsplash.com/photos/h3SyJYsqYSo/download?force=true&w=1600"
  }
];

export default function ResortJourneySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const scaleTitle = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const opacityTitle = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-[#f8f5f0] py-32 md:py-48 pb-64 md:pb-80">
      {/* Background elegant pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-multiply pointer-events-none" />

      <div className="content-shell px-5 md:px-8 lg:px-12 relative z-10 box-border">
        
        {/* Modern Elegant Header */}
        <motion.div 
          style={{ scale: scaleTitle, opacity: opacityTitle }}
          className="text-center max-w-3xl mx-auto mb-20 md:mb-32"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[0.6rem] uppercase tracking-[0.4em] text-[#8a6b2d] font-bold mb-4"
          >
            The Journey Begins
          </motion.p>
          <h2 className="text-5xl md:text-7xl text-[#181510] font-serif leading-tight">
            A Himalayan <span className="font-script text-6xl md:text-8xl text-[#a5813b] italic -ml-2">Odyssey</span>
          </h2>
          <p className="mt-8 text-sm md:text-base text-[#6a5022] leading-relaxed max-w-xl mx-auto opacity-90">
            Every trail through the mountains reveals a new story. From the crisp Himalayan air at dawn to the warm glow of monastery lamps at dusk — Sikkim and Darjeeling await.
          </p>
        </motion.div>

        {/* Asymmetrical Parallax Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
          
          {/* Card 1 - Slides Down */}
          <motion.div style={{ y: y1 }} className="md:col-span-5 md:mt-24">
            <article className="group relative overflow-hidden bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
              <div className="relative h-[45vh] w-full overflow-hidden mb-6">
                <Image 
                  src={journeyCards[0].image} 
                  alt={journeyCards[0].title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
              <p className="font-script text-3xl text-[#a5813b] mb-1">{journeyCards[0].script}</p>
              <h3 className="text-2xl font-serif text-[#181510] mb-3">{journeyCards[0].title}</h3>
              <p className="text-xs text-[#6a5022] uppercase tracking-[0.1em] leading-relaxed">{journeyCards[0].description}</p>
            </article>
          </motion.div>

          {/* Card 2 - Centers Static */}
          <div className="md:col-span-7 relative z-10 md:-mt-10">
            <article className="group relative overflow-hidden bg-white p-6 shadow-[0_30px_50px_rgba(0,0,0,0.08)]">
              <div className="relative h-[55vh] w-full overflow-hidden mb-6">
                <Image 
                  src={journeyCards[1].image} 
                  alt={journeyCards[1].title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <p className="font-script text-4xl text-[#a5813b] mb-2">{journeyCards[1].script}</p>
              <h3 className="text-3xl font-serif text-[#181510] mb-4">{journeyCards[1].title}</h3>
              <p className="text-sm text-[#6a5022] tracking-wide leading-relaxed max-w-sm">{journeyCards[1].description}</p>
              
              <button className="mt-8 border border-[#a5813b] text-[#8a6b2d] px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#a5813b] hover:text-white transition-colors duration-500" aria-label="Explore Destinations">
                Explore Destinations
              </button>
            </article>
          </div>

          {/* Card 3 - Slides Up slightly */}
          <motion.div style={{ y: y2 }} className="md:col-span-6 md:col-start-7 md:-mt-24 relative z-20 pb-12">
             <article className="group relative overflow-hidden bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
              <div className="relative h-[40vh] w-full overflow-hidden mb-6">
                <Image 
                  src={journeyCards[2].image} 
                  alt={journeyCards[2].title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-sm">
                <p className="font-script text-2xl text-[#a5813b]">{journeyCards[2].script}</p>
              </div>
              <h3 className="text-2xl font-serif text-[#181510] mb-3">{journeyCards[2].title}</h3>
              <p className="text-xs text-[#6a5022] uppercase tracking-[0.1em] leading-relaxed max-w-xs">{journeyCards[2].description}</p>
            </article>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
