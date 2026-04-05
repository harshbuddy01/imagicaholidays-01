"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const journeyCards = [
  {
    id: "gangtok",
    title: "The Mist of Gangtok",
    script: "The Vertical City",
    description: "From the cobblestones of MG Marg to the ancient chants of Enchey Monastery, Gangtok is where Himalayan spirituality meets modern luxury.",
    image: "https://images.unsplash.com/photo-1589136140230-27062402ceec?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "lachung",
    title: "Alpine Secrets of Lachung",
    script: "The Valley of Flowers",
    description: "Discover the Yumthang Valley, where alpine meadows bloom under the protective gaze of the snow-clad 'Seven Sisters' peaks.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "pelling",
    title: "Royal Echoes of Pelling",
    script: "Kanchenjunga's Gaze",
    description: "Walk the Rabdentse Ruins at dusk, where the ancient capital of Sikkim faces the towering majesty of the world's third-highest peak.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function ResortJourneySection() {
  const containerRef = useRef<HTMLElement>(null);
  const ornamentRef = useRef<SVGPathElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yParallax = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (!ornamentRef.current) return;

    // GSAP Hand-drawn path animation
    gsap.fromTo(ornamentRef.current, 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { 
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );

    // Fade-in text staggered
    gsap.utils.toArray(".journal-text-trigger").forEach((text: any) => {
      gsap.fromTo(text, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#f8f5f0] py-40 md:py-60 overflow-hidden">
      
      {/* Artisanal Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none" />
      
      {/* Growing Botanical Ornament */}
      <div className="absolute top-20 right-[-10%] w-[50%] h-[80%] text-[#a5813b]/10 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path 
            ref={ornamentRef}
            d="M0 100 C 20 80, 40 100, 50 60 C 60 20, 80 40, 100 0" 
            stroke="currentColor" 
            strokeWidth="0.1" 
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* The Journal Header */}
        <div className="max-w-3xl mb-32">
          <p className="font-handwriting text-[#a5813b] text-4xl mb-4 italic journal-text-trigger">The unfolding story of</p>
          <h2 className="text-6xl md:text-9xl text-[#181510] leading-[0.8] mb-12 journal-text-trigger font-black tracking-tighter">
            Himalayan <br/>
            <span className="font-script text-[#a5813b] text-7xl md:text-[10rem] ml-10">Journeys</span>
          </h2>
          <div className="w-24 h-1 bg-[#a5813b]/20 mb-8 journal-text-trigger rounded-full" />
          <p className="text-lg md:text-xl text-[#6a5022]/80 leading-relaxed italic journal-text-trigger max-w-xl">
            "We do not just visit the mountains; we listen to their ancient whispers. From the sacred peaks of Kanchenjunga to the silent valleys of the North."
          </p>
        </div>

        {/* Asymmetrical Journal Layout */}
        <div className="space-y-40 md:space-y-64">
           
           {/* Card 1: Gangtok */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
             <motion.div style={{ y: yParallax }} className="md:col-span-12 lg:col-span-7 relative">
                <div className="aspect-[16/10] overflow-hidden rounded-[80px] border-[12px] border-white shadow-2xl relative group">
                  <Image src={journeyCards[0].image} alt="" fill className="object-cover saturate-[0.8] group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[30px] rotate-6 group-hover:rotate-0 transition-transform">
                     <p className="font-script text-white text-3xl">Entry 01</p>
                  </div>
                </div>
                <div className="absolute -top-6 left-1/3 w-32 h-10 bg-[#a5813b]/20 rotate-[-15deg] backdrop-blur-sm pointer-events-none" />
             </motion.div>
             <div className="md:col-span-12 lg:col-span-5 lg:pl-12">
                <h3 className="text-4xl md:text-6xl font-black text-[#181510] mb-6 leading-tight journal-text-trigger">{journeyCards[0].title}</h3>
                <p className="font-script text-[#a5813b] text-4xl mb-8 journal-text-trigger">{journeyCards[0].script}</p>
                <p className="text-lg text-[#6a5022] leading-relaxed journal-text-trigger italic pl-6 border-l-2 border-[#a5813b]/20">
                  {journeyCards[0].description}
                </p>
             </div>
           </div>

           {/* Card 2: Lachung */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
             <div className="md:col-span-12 lg:col-span-5 order-2 lg:order-1 lg:pr-12 text-right">
                <h3 className="text-4xl md:text-6xl font-black text-[#181510] mb-6 leading-tight journal-text-trigger">{journeyCards[1].title}</h3>
                <p className="font-script text-[#a5813b] text-4xl mb-8 journal-text-trigger">{journeyCards[1].script}</p>
                <p className="text-lg text-[#6a5022] leading-relaxed journal-text-trigger italic pr-6 border-r-2 border-[#a5813b]/20">
                  {journeyCards[1].description}
                </p>
             </div>
             <motion.div style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-10%"]) }} className="md:col-span-12 lg:col-span-7 order-1 lg:order-2">
                <div className="aspect-[16/10] overflow-hidden rounded-[80px] border-[12px] border-white shadow-2xl relative group">
                  <Image src={journeyCards[1].image} alt="" fill className="object-cover saturate-[0.8] group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#a5813b]/20 to-transparent" />
                </div>
             </motion.div>
           </div>

           {/* Card 3: Pelling */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
             <div className="md:col-span-12 lg:col-span-8 relative">
                <div className="aspect-[21/9] overflow-hidden rounded-[100px] border-[12px] border-white shadow-2xl relative group">
                  <Image src={journeyCards[2].image} alt="" fill className="object-cover saturate-[0.8] group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="absolute -bottom-10 right-20 bg-[#a5813b] text-white p-10 rounded-[40px] shadow-2xl max-w-sm hidden md:block">
                   <p className="text-sm font-bold uppercase tracking-widest mb-2">The Peak Gaze</p>
                   <p className="font-script text-3xl">Pelling's ancient shadows meet the rising sun on the white peak.</p>
                </div>
             </div>
             <div className="md:col-span-12 lg:col-span-4 lg:pl-12">
                <h3 className="text-4xl md:text-6xl font-black text-[#181510] mb-6 leading-tight journal-text-trigger">{journeyCards[2].title}</h3>
                <p className="font-script text-[#a5813b] text-4xl mb-8 journal-text-trigger">{journeyCards[2].script}</p>
                <p className="text-lg text-[#6a5022] leading-relaxed journal-text-trigger italic pl-6 border-l-2 border-[#a5813b]/20">
                  {journeyCards[2].description}
                </p>
             </div>
           </div>

        </div>

      </div>
    </section>
  );
}
