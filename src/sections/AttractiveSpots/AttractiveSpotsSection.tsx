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

const spots: Spot[] = [
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
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const next = useCallback(() => setCurrent((p) => (p + 1) % spots.length), []);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + spots.length) % spots.length), []);

    /* ── Scroll Transition Animation ── */
    // This scales and fades the entire section as you scroll past it, creating a deep 3D transition into the next section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"],
    });
    
    // Scale down and fade out the container as we scroll away
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section 
            id="attractive-spots"
            ref={sectionRef} 
            className="relative w-full bg-[#151310] overflow-hidden" 
            style={{ zIndex: 10 }}
        >
            <motion.div style={{ scale, opacity, y }} className="w-full relative pt-20 md:pt-32 pb-24 md:pb-32 transform-gpu">
                
                {/* ── Background Elements ── */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a5813b]/[0.05] rounded-full blur-[150px]" />
                    {/* Subtle grid pattern for texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                </div>

                {/* ── Header ── */}
                <div className="text-center max-w-4xl mx-auto px-6 mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[#d8be8f] font-bold mb-4">
                            Exquisite Locations
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif leading-tight">
                            A Himalayan <span className="font-script text-5xl md:text-7xl lg:text-8xl text-[#d8be8f] italic ml-2">Odyssey</span>
                        </h2>
                        <div className="mt-8 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#a5813b] to-transparent" />
                    </motion.div>
                </div>

                {/* ── 3D CAROUSEL ── */}
                <div className="relative h-[480px] md:h-[580px] w-full max-w-[1400px] mx-auto flex items-center justify-center px-4" style={{ perspective: "1000px" }}>
                    <AnimatePresence mode="popLayout">
                        {spots.map((spot, index) => {
                            const offset = (index - current + spots.length) % spots.length;
                            let position = offset;
                            if (position > spots.length / 2) position -= spots.length;
                            
                            const absPos = Math.abs(position);
                            if (absPos > 2) return null;

                            // Original elegant sizes
                            const cardW = isMobile ? 260 : 340;
                            const cardH = isMobile ? 380 : 480;

                            return (
                                <motion.div
                                    key={spot.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1 - absPos * 0.3,
                                        scale: 1 - absPos * 0.15,
                                        x: position * (isMobile ? 160 : 250),
                                        zIndex: 10 - absPos,
                                        rotateY: position * -15,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="absolute cursor-pointer"
                                    style={{ width: cardW, height: cardH }}
                                    onClick={() => setCurrent(index)}
                                >
                                    {/* Card with border and text below */}
                                    <div className="w-full h-full bg-[#f8f5f0] rounded-[2rem] p-3 md:p-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col group overflow-hidden border border-[#d8be8f]/30">
                                        
                                        {/* Image Container (Bordered) */}
                                        <div className="relative w-full h-[65%] rounded-2xl overflow-hidden">
                                            <Image
                                                src={spot.image}
                                                alt={spot.name}
                                                fill
                                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Text Section (Below Image) */}
                                        <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                                            <h3 className="font-serif text-2xl md:text-3xl text-[#181510] font-medium leading-tight">
                                                {spot.name}
                                            </h3>
                                            <div className="w-8 h-px bg-[#a5813b]/40 my-3" />
                                            <p className="text-[#8a6b2d] text-xs uppercase tracking-[0.2em] font-semibold">
                                                {spot.location}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* ── Navigation Controls ── */}
                <div className="flex items-center justify-center gap-6 mt-10 relative z-50">
                    <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex gap-2">
                        {spots.map((_, i) => (
                            <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-[#d8be8f]" : "w-1.5 bg-white/30"}`} />
                        ))}
                    </div>

                    <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
