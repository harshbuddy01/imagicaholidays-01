"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
    const [config, setConfig] = useState<any>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const activeThumbnailRef = useRef<HTMLButtonElement>(null);
    const listContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchWebsiteConfig().then((data) => {
          if (data && data.config?.odyssey) {
            setConfig(data.config.odyssey);
          }
        });
    }, []);

    const spots = config?.spots && config.spots.length > 0 ? config.spots : staticSpots;

    const next = useCallback(() => setCurrent((p) => (p + 1) % spots.length), [spots.length]);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + spots.length) % spots.length), [spots.length]);

    // 3-second auto-change interval, resetting on manual selection
    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 3000);
        return () => clearInterval(timer);
    }, [next]);


    // Automatically scroll the sidebar active item into view
    useEffect(() => {
        if (activeThumbnailRef.current && listContainerRef.current) {
            const container = listContainerRef.current;
            const element = activeThumbnailRef.current;
            
            // Check scroll direction based on screen width/layout
            if (window.innerWidth >= 1024) {
                // Vertical scrolling on desktop
                const containerTop = container.scrollTop;
                const containerBottom = containerTop + container.clientHeight;
                const elemTop = element.offsetTop;
                const elemBottom = elemTop + element.clientHeight;

                if (elemTop < containerTop || elemBottom > containerBottom) {
                    container.scrollTo({
                        top: elemTop - container.clientHeight / 2 + element.clientHeight / 2,
                        behavior: "smooth"
                    });
                }
            } else {
                // Horizontal scrolling on mobile
                const containerLeft = container.scrollLeft;
                const containerRight = containerLeft + container.clientWidth;
                const elemLeft = element.offsetLeft;
                const elemRight = elemLeft + element.clientWidth;

                if (elemLeft < containerLeft || elemRight > containerRight) {
                    container.scrollTo({
                        left: elemLeft - container.clientWidth / 2 + element.clientWidth / 2,
                        behavior: "smooth"
                    });
                }
            }
        }
    }, [current]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"],
    });
    
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section 
            id="attractive-spots"
            ref={sectionRef} 
            className="relative w-full bg-[#151310] overflow-hidden py-20 md:py-32" 
            style={{ zIndex: 10 }}
        >
            {/* Dynamic Ambient Blurred Background */}
            <div className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out overflow-hidden select-none z-0">
                <div className="absolute inset-0 bg-[#151310] z-10 opacity-[0.93]" />
                {spots[current]?.image && (
                    <img
                        src={spots[current].image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-[100px] scale-125 transition-all duration-[1.5s] ease-out z-0"
                    />
                )}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] z-20" />
            </div>

            <motion.div style={{ scale, opacity }} className="w-full relative z-10 transform-gpu">
                {/* ── Header ── */}
                <div className="max-w-7xl mx-auto px-6 mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-left"
                    >
                        <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[#d8be8f] font-bold mb-3">
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
                                        <span className="font-script text-5xl md:text-7xl lg:text-8xl text-[#d8be8f] italic block md:inline md:ml-2">
                                            {lastWord}
                                        </span>
                                    </>
                                );
                            })()}
                        </h2>
                        <div className="mt-6 w-20 h-[1.5px] bg-[#a5813b]/60" />
                    </motion.div>
                </div>

                {/* ── Interactive Split-Screen Showcase ── */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* LEFT PANEL: Cinematic Showcase (lg:col-span-7) */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
                        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[1.4] rounded-[2.2rem] overflow-hidden shadow-2xl border border-white/5 bg-[#1a1714]">
                            {/* Glass border wrapper */}
                            <div className="absolute inset-0 border border-[#d8be8f]/20 rounded-[2.2rem] pointer-events-none z-30" />

                            {/* Ken Burns transition image slider */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={spots[current]?.id || current}
                                    initial={{ opacity: 0, scale: 1.08 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img
                                        src={spots[current]?.image || 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=1200&q=80'}
                                        alt={spots[current]?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Luxury Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10 pointer-events-none" />

                            {/* Active Spot Metadata (Overlaid bottom left) */}
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-20 flex flex-col items-start text-left pointer-events-none">
                                <motion.span 
                                    key={`loc-${current}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-[10px] tracking-[0.3em] uppercase text-[#d8be8f] font-bold mb-3"
                                >
                                    {spots[current]?.location}
                                </motion.span>
                                <motion.h3 
                                    key={`name-${current}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide leading-tight mb-4"
                                >
                                    {spots[current]?.name}
                                </motion.h3>
                                <motion.div 
                                    key={`line-${current}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: 48 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="h-[1.5px] bg-[#d8be8f]/60 mb-4"
                                />
                                <motion.p
                                    key={`tag-${current}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="text-[10px] tracking-[0.2em] uppercase text-white font-semibold font-mono"
                                >
                                    Experience Himalayan Memoir
                                </motion.p>
                            </div>
                        </div>

                        {/* Pagination Progress & Quick Arrow Nav */}
                        <div className="flex items-center justify-between mt-6 px-2">
                            {/* Fraction Counter */}
                            <div className="text-xs tracking-[0.2em] uppercase text-white/50 font-semibold font-mono">
                                <span className="text-[#d8be8f]">{String(current + 1).padStart(2, '0')}</span> 
                                <span className="opacity-25 mx-2">/</span> 
                                {String(spots.length).padStart(2, '0')}
                            </div>

                            {/* Minimal chevron buttons */}
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={prev} 
                                    aria-label="Previous destination"
                                    className="w-11 h-11 rounded-full border border-white/10 backdrop-blur-md bg-white/5 flex items-center justify-center text-white hover:bg-[#d8be8f] hover:text-black hover:border-[#d8be8f] transition-all duration-300 transform active:scale-95 z-30"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={next} 
                                    aria-label="Next destination"
                                    className="w-11 h-11 rounded-full border border-white/10 backdrop-blur-md bg-white/5 flex items-center justify-center text-white hover:bg-[#d8be8f] hover:text-black hover:border-[#d8be8f] transition-all duration-300 transform active:scale-95 z-30"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Interactive List/Sidebar (lg:col-span-5) */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
                        <div 
                            ref={listContainerRef}
                            className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto max-h-[320px] lg:max-h-[500px] scrollbar-thin scrollbar-thumb-white/10 py-2 px-1 select-none"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {spots.map((spot: Spot, index: number) => {
                                const isActive = current === index;

                                return (
                                    <button
                                        key={spot.id}
                                        ref={isActive ? activeThumbnailRef : null}
                                        onClick={() => setCurrent(index)}
                                        className={`flex items-center gap-4 p-3 rounded-2xl border text-left transition-all duration-300 flex-shrink-0 w-[240px] lg:w-full group ${
                                            isActive 
                                                ? 'bg-white/[0.04] border-[#d8be8f]/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                                                : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                                        }`}
                                    >
                                        {/* Thumbnail Frame */}
                                        <div className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-500 ${
                                            isActive ? 'border-[#d8be8f]/40' : 'border-white/10'
                                        }`}>
                                            <img
                                                src={spot.image}
                                                alt={spot.name}
                                                className={`w-full h-full object-cover transition-transform duration-700 ${
                                                    isActive ? 'scale-105' : 'scale-100 group-hover:scale-108'
                                                }`}
                                            />
                                            {/* Inactive overlay */}
                                            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                                                isActive ? 'opacity-0' : 'opacity-40 group-hover:opacity-10'
                                            }`} />
                                        </div>

                                        {/* Text Info */}
                                        <div className="flex-1 min-w-0 pr-2">
                                            <span className={`text-[8px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
                                                isActive ? 'text-[#d8be8f]' : 'text-white/40 group-hover:text-white/60'
                                            }`}>
                                                {spot.location}
                                            </span>
                                            <h4 className={`font-serif text-base font-light tracking-wide truncate mt-0.5 transition-colors duration-300 ${
                                                isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                {spot.name}
                                            </h4>
                                        </div>

                                        {/* Active Golden Bar indicator */}
                                        <div className="relative w-1.5 h-8 flex items-center justify-center flex-shrink-0">
                                            <motion.div 
                                                className="w-[2px] h-full bg-[#d8be8f] rounded-full"
                                                initial={false}
                                                animate={{ 
                                                    height: isActive ? "100%" : "0%",
                                                    opacity: isActive ? 1 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
