"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── SVG Chevrons (Fallback) ───────────────────────────── */
const ArrowLeft = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 18l-6-6 6-6" /></svg>
);
const ArrowRight = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18l6-6-6-6" /></svg>
);

/* ── Data ──────────────────────────────────────────────── */
interface Spot {
    id: string;
    name: string;
    location: string;
    image: string;
}

import { fetchWebsiteConfig } from "@/lib/api";

const staticSpots: Spot[] = [
    { id: "tiger-hill", name: "Tiger Hill", location: "Darjeeling", image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "hawa-mahal", name: "Hawa Mahal", location: "Jaipur", image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "rumtek", name: "Rumtek Monastery", location: "Gangtok", image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "city-palace", name: "City Palace", location: "Udaipur", image: "https://images.pexels.com/photos/29824639/pexels-photo-29824639.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "varanasi", name: "Dashashwamedh Ghat", location: "Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80" },
    { id: "shanti-stupa", name: "Shanti Stupa", location: "Leh", image: "https://images.unsplash.com/photo-1543336775-49935ed6e76d?auto=format&fit=crop&w=800&q=80" },
    { id: "tea-gardens", name: "Tea Gardens", location: "Munnar", image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "backwaters", name: "Vembanad Lake", location: "Alleppey", image: "https://images.pexels.com/photos/29801456/pexels-photo-29801456.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export default function AttractiveSpotsSection() {
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [config, setConfig] = useState<any>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        fetchWebsiteConfig().then((data) => {
          if (data && data.config?.odyssey) {
            setConfig(data.config.odyssey);
          }
        });
    }, []);

    const spots = config?.spots && config.spots.length > 0 ? config.spots : staticSpots;

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const next = useCallback(() => setCurrent((p) => (p + 1) % spots.length), [spots.length]);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + spots.length) % spots.length), [spots.length]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"],
    });
    
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const cardW = isMobile ? 265 : 340;
    const cardH = isMobile ? 380 : 480;
    const gap = isMobile ? 16 : 24;

    return (
        <section 
            id="attractive-spots"
            ref={sectionRef} 
            className="relative w-full bg-[#151310] overflow-hidden py-20 md:py-32" 
            style={{ zIndex: 10 }}
        >
            {/* Dynamic Ambient Blurred Background */}
            <div className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out overflow-hidden select-none z-0">
                <div className="absolute inset-0 bg-[#151310] z-10" />
                {spots[current]?.image && (
                    <img
                        src={spots[current].image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] blur-[80px] scale-110 transition-all duration-[1.5s] ease-out z-0"
                    />
                )}
                {/* Subtle organic texture grid overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] z-20" />
            </div>

            <motion.div style={{ scale, opacity }} className="w-full relative z-10 transform-gpu">
                {/* ── Header ── */}
                <div className="text-center max-w-4xl mx-auto px-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[#d8be8f] font-bold mb-4">
                            {config?.subtitle || "Exquisite Locations"}
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif leading-tight">
                            {(() => {
                                const fullTitle = config?.title || "A Himalayan Odyssey";
                                const lastSpaceIdx = fullTitle.lastIndexOf(" ");
                                if (lastSpaceIdx === -1) return fullTitle;
                                const mainPart = fullTitle.substring(0, lastSpaceIdx);
                                const lastWord = fullTitle.substring(lastSpaceIdx + 1);
                                return (
                                    <>
                                        {mainPart}{" "}
                                        <span className="font-script text-5xl md:text-7xl lg:text-8xl text-[#d8be8f] italic ml-2">
                                            {lastWord}
                                        </span>
                                    </>
                                );
                            })()}
                        </h2>
                        <div className="mt-8 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#a5813b] to-transparent" />
                    </motion.div>
                </div>

                {/* ── Center-Aligned Sliding Track ── */}
                <div className="relative w-full overflow-hidden py-4 select-none">
                    <motion.div 
                        className="flex gap-4 md:gap-6 transform-gpu"
                        animate={{ x: `calc(50% - ${cardW / 2}px - ${current * (cardW + gap)}px)` }}
                        transition={{ type: "spring", stiffness: 180, damping: 25 }}
                    >
                        {spots.map((spot: Spot, index: number) => {
                            const isActive = current === index;
                            
                            return (
                                <motion.div
                                    key={spot.id}
                                    style={{ width: cardW, height: cardH }}
                                    className="relative flex-shrink-0 cursor-pointer rounded-[1.8rem] overflow-hidden"
                                    animate={{ 
                                        scale: isActive ? 1.02 : 0.92,
                                        opacity: isActive ? 1 : 0.45
                                    }}
                                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                    onClick={() => setCurrent(index)}
                                >
                                    {/* Glassmorphic border / Gold accent highlight */}
                                    <div className={`absolute inset-0 rounded-[1.8rem] border-[1.5px] transition-all duration-700 pointer-events-none z-30 ${
                                        isActive ? 'border-[#d8be8f] shadow-[0_25px_50px_-12px_rgba(216,190,143,0.2)]' : 'border-white/5'
                                    }`} />

                                    {/* Image with zoom on active/hover */}
                                    <div className="relative w-full h-full overflow-hidden bg-slate-900">
                                        <img
                                            src={spot.image || 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=1200&q=80'}
                                            alt={spot.name}
                                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-out ${
                                                isActive ? 'scale-[1.06]' : 'scale-100 hover:scale-[1.03]'
                                            }`}
                                        />
                                        {/* Luxury vignette overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10" />
                                        
                                        {/* Card content text */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col items-center text-center">
                                            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d8be8f] font-bold mb-2">
                                                {spot.location}
                                            </span>
                                            <h3 className="font-serif text-2xl md:text-3xl text-white font-light tracking-wide leading-tight mb-1">
                                                {spot.name}
                                            </h3>
                                            <div className={`h-[1px] bg-[#d8be8f]/30 transition-all duration-700 ${
                                                isActive ? 'w-10 my-3' : 'w-0 my-0'
                                            }`} />
                                            {isActive && (
                                                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 animate-fade-in duration-500">
                                                    Explore Memoir
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* ── Navigation, Progress Bar & Controls ── */}
                <div className="flex flex-col items-center gap-8 mt-12 relative z-50">
                    
                    {/* Sleek Golden Progress Track */}
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-white/40 font-mono">01</span>
                        <div className="w-40 h-[1.5px] bg-white/10 rounded-full relative overflow-hidden">
                            <motion.div 
                                className="absolute left-0 top-0 h-full bg-[#d8be8f] rounded-full"
                                initial={false}
                                animate={{ width: `${((current + 1) / spots.length) * 100}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                        </div>
                        <span className="text-[10px] text-[#d8be8f] font-mono">
                            {String(spots.length).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Minimal Circular Chevron Buttons */}
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={prev} 
                            aria-label="Previous spot"
                            className="w-12 h-12 rounded-full border border-white/10 backdrop-blur-md bg-white/5 flex items-center justify-center text-white hover:bg-[#d8be8f] hover:text-black hover:border-[#d8be8f] transition-all duration-300 transform active:scale-90"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="text-xs tracking-[0.2em] uppercase text-white/60 font-semibold font-mono">
                            {current + 1} <span className="opacity-30">/</span> {spots.length}
                        </div>

                        <button 
                            onClick={next} 
                            aria-label="Next spot"
                            className="w-12 h-12 rounded-full border border-white/10 backdrop-blur-md bg-white/5 flex items-center justify-center text-white hover:bg-[#d8be8f] hover:text-black hover:border-[#d8be8f] transition-all duration-300 transform active:scale-90"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
