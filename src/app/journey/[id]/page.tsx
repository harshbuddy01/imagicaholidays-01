"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { journeys as fallbackJourneys } from "@/lib/constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.imagicaholidays.com/api/v1';

export default function JourneyDetailsPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [journey, setJourney] = useState<typeof fallbackJourneys[0] | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [expandedDay, setExpandedDay] = useState<string | null>(null);

    useEffect(() => {
        // Try API first, then fallback
        fetch(`${API_BASE}/public/journeys`)
            .then(r => r.json())
            .then(d => {
                const pool = (d.success && d.data?.length) ? d.data : fallbackJourneys;
                const found = pool.find((j: any) => j.id === id);
                if (found) setJourney(found);
                else router.push("/journey");
            })
            .catch(() => {
                const found = fallbackJourneys.find(j => j.id === id);
                if (found) setJourney(found);
                else router.push("/journey");
            });
    }, [id, router]);

    if (!journey) return null; // Let the preloader handle the visual wait

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % journey.images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? journey.images.length - 1 : prev - 1));
    };

    const toggleDay = (day: string) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    // Dynamic date helper: Day 1 = today, Day 2 = tomorrow, etc.
    const getDynamicDate = (dayIndex: number) => {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() + dayIndex);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        return `${day} ${month}`;
    };

    const getDynamicFullDate = (dayIndex: number) => {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() + dayIndex);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-24 font-body">
            <Navbar />

            {/* Top Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white border-b border-[#e5ded5] hidden md:block mt-8">
                <div className="max-w-7xl mx-auto flex justify-center gap-12 font-semibold text-[10px] tracking-widest uppercase">
                    <Link href="#overview" className="border-b-2 border-[#1a1914] text-[#1a1914] py-6">Overview</Link>
                    <Link href="#itinerary" className="border-b-2 border-transparent text-[#a09383] hover:text-[#1a1914] py-6 transition-colors">Itinerary</Link>
                    <Link href="#inclusions" className="border-b-2 border-transparent text-[#a09383] hover:text-[#1a1914] py-6 transition-colors">Inclusions</Link>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-24 relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                {/* Left Column (Scrollable Content) */}
                <div className="w-full lg:w-[60%] xl:w-[65%]">

                    <Link
                        href="/journey"
                        className="flex w-max items-center gap-2 text-sm text-[#5c544b] hover:text-[#1a1914] transition-colors mb-6"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>

                    {/* Image Carousel */}
                    <div className="relative w-full aspect-[4/3] md:aspect-video rounded-sm overflow-hidden bg-gray-200">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={journey.images[currentSlide]}
                                alt={`${journey.title} Slide ${currentSlide + 1}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Carousel Controls */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1914" strokeWidth="1.5">
                                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1914" strokeWidth="1.5">
                                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {journey.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentSlide ? "bg-[#a5813b]" : "bg-black/30"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div id="overview" className="flex flex-col md:flex-row gap-8 mt-12 py-12 border-b border-[#d5cab5]/60">
                        <div className="md:w-1/3">
                            <h2 className="font-roman text-2xl text-[#1a1914]">Journey Overview</h2>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-[#5c544b] leading-relaxed text-[15px]">
                                {journey.overview}
                            </p>
                        </div>
                    </div>

                    {/* Itinerary Section (Screenshot 6 Layout) */}
                    <div id="itinerary" className="mt-12 flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <h2 className="font-roman text-2xl text-[#1a1914]">Itinerary</h2>
                        </div>

                        <div className="md:w-2/3 space-y-12 relative">
                            {/* Vertical Journey Line */}
                            <div className="absolute left-[13px] top-6 bottom-6 w-px bg-gradient-to-b from-[#d5cab5] via-[#a5813b]/30 to-[#d5cab5] hidden md:block" />

                            {journey.itinerary.map((dayData, idx) => {
                                const isExpanded = expandedDay === dayData.day;
                                return (
                                    <div key={idx} className="relative">
                                        <div className="flex gap-10 items-start">
                                            {/* Left Thumb */}
                                            <div className="relative group/day w-[130px] flex-shrink-0">
                                                <div className="aspect-[4/5] rounded-lg overflow-hidden relative shadow-md">
                                                    <img src={dayData.image} alt={dayData.title} className="w-full h-full object-cover grayscale-[0.3] group-hover/day:grayscale-0 transition-all duration-700 group-hover/day:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                </div>
                                                {/* Day Number Stamp */}
                                                <div className="absolute -top-3 -left-3 bg-[#1a1914] text-white w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-[#a5813b] z-10 shadow-lg">
                                                    <span className="text-[8px] uppercase font-bold tracking-tighter leading-none opacity-60">Day</span>
                                                    <span className="font-roman text-lg leading-none mt-0.5">{dayData.day.replace("Day ", "").padStart(2, "0")}</span>
                                                </div>
                                            </div>

                                            {/* Right Content */}
                                            <div className="flex-grow pt-2">
                                                <button
                                                    className="w-full flex items-start justify-between text-left group"
                                                    onClick={() => toggleDay(dayData.day)}
                                                >
                                                    <div>
                                                        <h3 className="font-roman text-2xl text-[#1a1914] group-hover:text-[#a5813b] transition-colors duration-300">{dayData.title}</h3>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className="flex items-center gap-1.5 grayscale opacity-70">
                                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                                </svg>
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5c544b]">{getDynamicDate(idx)}</span>
                                                            </div>
                                                            <div className="w-px h-3 bg-[#d5cab5]" />
                                                            <div className="flex items-center gap-1.5 grayscale opacity-70">
                                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <circle cx="12" cy="12" r="10" />
                                                                    <polyline points="12 6 12 12 16 14" />
                                                                </svg>
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5c544b]">{dayData.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-2 text-[#a09383] group-hover:text-[#1a1914] transition-all duration-300 group-hover:rotate-90">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </button>

                                                {/* Expanded Content */}
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="mt-4 text-[#5c544b] text-[15px] leading-relaxed">
                                                                {dayData.description}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* All Journeys Include Section (Handcrafted Redesign) */}
                    <div id="inclusions" className="mt-20 mb-20 relative px-4 sm:px-0">
                        <div className="bg-[#fcfaf7] border-[0.5px] border-[#a5813b]/30 p-10 md:p-16 relative overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                            {/* Handcrafted Double Border Aesthetic */}
                            <div className="absolute inset-4 border border-[#a5813b]/10 rounded-[1.5rem] pointer-events-none" />

                            {/* Floral Corner Ornaments (SVG) */}
                            <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.08] text-[#a5813b] translate-x-[-10%] translate-y-[-10%]">
                                <svg viewBox="0 0 100 100" fill="currentColor">
                                    <path d="M10,10 Q30,0 50,10 Q70,20 90,10 Q100,30 90,50 Q80,70 90,90 Q70,100 50,90 Q30,80 10,90 Q0,70 10,50 Q20,30 10,10" />
                                    <path d="M50,10 Q50,50 90,50 M50,90 Q50,50 10,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
                                </svg>
                            </div>

                            <div className="relative z-10 text-center mb-16">
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <span className="w-12 h-px bg-[#a5813b]/30" />
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5813b" strokeWidth="1" className="opacity-60">
                                        <path d="M12 2L15 9l7 1-5 5.5L15.5 22 12 18l-3.5 4L10 15.5 5 10l7-1 3-7z" />
                                    </svg>
                                    <span className="w-12 h-px bg-[#a5813b]/30" />
                                </div>
                                <h2 className="font-roman text-4xl text-[#1a1914] mb-4">All Journeys Include</h2>
                                <p className="text-[#a5813b] text-xs font-bold uppercase tracking-[0.3em] opacity-80">The Imagica Standard of Excellence</p>
                            </div>

                            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                                {[
                                    { title: "Private Concierge", desc: "24/7 dedicated support throughout your journey.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                                    { title: "Heritage Stays", desc: "Boutique accommodations in hand-selected luxury properties.", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
                                    { title: "Private Transfers", desc: "Seamless travel in premium, private vehicles.", icon: "M18.36 6.64a9 9 0 1 1-12.73 0" },
                                    { title: "Authentic Immersions", desc: "Private culinary experiences and local cultural encounters.", icon: "M12 2L2 7l10 5 10-5-10-5z" },
                                    { title: "All-Inclusive Access", desc: "Worry-free entry to all planned monuments and activities.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                                    { title: "Gateway Assistance", desc: "Warm welcome and assistance at all arrival/departure points.", icon: "M15 10l-4 4l6 6m-4-4l-4 4l-6-6" }
                                ].map((item, id) => (
                                    <div key={id} className="group/item">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-[#a5813b]/5 border border-[#a5813b]/20 flex items-center justify-center text-[#a5813b] group-hover/item:bg-[#a5813b] group-hover/item:text-white transition-all duration-500">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                                    <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <h4 className="font-roman text-xl text-[#1a1914]">{item.title}</h4>
                                        </div>
                                        <p className="text-[14px] text-[#5c544b] leading-relaxed pl-14">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Center Small Flower Accent */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                                <svg width="400" height="400" viewBox="0 0 100 100" fill="#a5813b">
                                    <circle cx="50" cy="50" r="10" />
                                    <path d="M50,10 Q60,30 50,50 Q40,30 50,10" />
                                    <path d="M50,90 Q60,70 50,50 Q40,70 50,90" />
                                    <path d="M10,50 Q30,40 50,50 Q30,60 10,50" />
                                    <path d="M90,50 Q70,40 50,50 Q70,60 90,50" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column (Handcrafted Sticky Details Panel) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-[42%] xl:w-[38%] lg:sticky lg:top-[140px] bg-[#fcfaf7] rounded-[2.5rem] border-2 border-[#e5ded5] shadow-[0_30px_60px_rgba(0,0,0,0.06)] flex flex-col group/sidebar transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] mb-12"
                >

                    <div className="p-8 lg:p-12 flex-grow">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-px bg-[#a5813b]/40" />
                            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#a5813b]">The Collection</span>
                        </div>

                        <h1 className="font-roman text-3xl md:text-4xl font-medium text-[#1a1914] leading-[1.1] mb-10">
                            {journey.title}
                        </h1>

                        {/* Quick Stats (Stamp-Style Modules) */}
                        <div className="grid grid-cols-2 gap-4 mb-10 pb-2">
                            {[
                                { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", label: "IMAGICA" },
                                { icon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z", label: `${journey.durationNights} NIGHTS` },
                                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", label: `${journey.ports} PORTS` },
                                { icon: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z", label: `${journey.countries} COUNTRIES` }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white border border-[#e5ded5] p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#a5813b] hover:bg-[#fffcf7] transition-all duration-300">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5813b" strokeWidth="1" className="mb-2.5">
                                        <path d={stat.icon} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-[8px] tracking-[0.2em] font-bold uppercase text-[#675f56]">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Handcrafted Luggage Tag Section */}
                        <div className="relative mb-8 pt-6">
                            <div className="absolute top-0 left-6 w-3 h-3 rounded-full bg-white border border-[#e5ded5] z-10" />
                            <div className="bg-[#f5f3ef] border border-[#d5cab5] rounded-2xl p-7 relative overflow-hidden">
                                {/* Punched Hole Effect */}
                                <div className="absolute top-0 left-6 -translate-y-1/2 w-4 h-8 bg-[#fcfaf7] rounded-full border-r border-b border-[#d5cab5]" />

                                <div className="grid grid-cols-2 gap-x-8 gap-y-8 relative z-10">
                                    <div>
                                        <p className="text-[8px] tracking-[0.2em] text-[#a5813b] font-black uppercase mb-2">Departure</p>
                                        <h4 className="font-roman text-lg text-[#1a1914] leading-tight mb-0.5">{journey.departurePort}</h4>
                                        <p className="text-[11px] text-[#5c544b] font-medium serif-italic tracking-wide">{getDynamicFullDate(0)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] tracking-[0.2em] text-[#a5813b] font-black uppercase mb-2 text-right">To</p>
                                        <h4 className="font-roman text-lg text-[#1a1914] leading-tight mb-0.5">{journey.returnPort}</h4>
                                        <p className="text-[11px] text-[#5c544b] font-medium serif-italic tracking-wide">{getDynamicFullDate(journey.itinerary.length - 1)}</p>
                                    </div>
                                    <div className="col-span-2 pt-6 border-t border-dashed border-[#d5cab5] flex justify-between items-end">
                                        <div>
                                            <p className="text-[8px] tracking-[0.2em] text-[#8c8479] font-bold uppercase mb-2">Fare Guarantee</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-[#8c8479] line-through text-xs font-medium">₹{journey.originalPrice.toLocaleString()}</span>
                                                <span className="font-roman text-3xl font-bold text-[#1a1914]">₹{journey.pricePerGuest.toLocaleString()}</span>
                                            </div>
                                            <p className="text-[9px] text-[#5c544b] font-medium tracking-wide mt-1">Per unique guest, inclusive of all taxes</p>
                                        </div>
                                        <div className="opacity-10 rotate-12 -mr-4 -mb-2">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 2v20M2 12h20" />
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Handcrafted Invitation Card */}
                        <div className="bg-white border border-[#a5813b]/30 p-6 rounded-xl shadow-lg relative mb-10 overflow-hidden group/invitation">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[#a5813b]/5 -rotate-45 translate-x-10 -translate-y-10 group-hover/invitation:bg-[#a5813b]/10 transition-all duration-700" />
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-8 h-8 rounded-full bg-[#fcfaf7] border border-[#a5813b]/30 flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a5813b" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-black text-[#1a1914] tracking-[0.25em] uppercase">An Invitation to Imagica</span>
                            </div>
                            <p className="text-xs text-[#5c544b] leading-relaxed italic pr-4">
                                "Every journey is a narrative. We ensure yours is written with the finest ink and preserved in timeless memories."
                            </p>
                            <div className="mt-4 flex justify-between items-center text-[#a5813b]">
                                <span className="text-[9px] font-bold uppercase tracking-widest border-b border-[#a5813b]/30 pb-0.5">Learn why guests choose us</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Actions Links */}
                        <div className="flex justify-center gap-10 border-t border-[#e5ded5] pt-8">
                            <button className="flex items-center gap-2.5 text-[10px] font-black tracking-[0.2em] uppercase text-[#1a1914] hover:text-[#a5813b] transition-all group/link">
                                <span className="border-b-2 border-transparent group-hover/link:border-[#a5813b] pb-0.5 transition-all">Download Details</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="grayscale opacity-60">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="flex items-center gap-2.5 text-[10px] font-black tracking-[0.2em] uppercase text-[#1a1914] hover:text-[#a5813b] transition-all group/link">
                                <span className="border-b-2 border-transparent group-hover/link:border-[#a5813b] pb-0.5 transition-all">Share</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="grayscale opacity-60">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Action Footer (Sticky Bottom within Sidebar) */}
                    <div className="bg-[#1a1914] text-white p-10 pt-12 relative overflow-hidden sticky bottom-0 z-20 rounded-b-[2.5rem] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
                        {/* Decorative Background Accent */}
                        <div className="absolute bottom-0 right-0 opacity-[0.03] translate-x-1/4 translate-y-1/4">
                            <span className="font-roman text-[10rem] font-bold tracking-tighter uppercase leading-none">IMAGICA</span>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row gap-5 mb-8">
                            <Link href="/reserve" className="flex-1 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 flex justify-center items-center gap-3 py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all rounded-full group/btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-y-[-2px] transition-transform">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Request Quote
                            </Link>
                            <Link href="/reserve" className="flex-1 bg-[#d8be8f] hover:bg-[#c7af80] text-[#1a1914] flex justify-center items-center gap-3 py-4 text-[10px] font-black tracking-[0.25em] uppercase transition-all rounded-full shadow-lg shadow-black/20 group/btn">
                                Reserve
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/btn:translate-x-1 transition-transform">
                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>

                        <div className="relative z-10 text-center">
                            <p className="text-[10px] text-white/40 tracking-[0.1em] mb-1">Guaranteed response within 2 hours</p>
                            <span className="text-[10px] font-bold text-[#d8be8f] uppercase tracking-widest border-b border-[#d8be8f]/20 cursor-pointer hover:border-[#d8be8f] transition-all pb-0.5">View Cancellation Policy</span>
                        </div>
                    </div>

                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
