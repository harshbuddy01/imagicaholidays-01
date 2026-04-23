"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { journeys as fallbackJourneys } from "@/lib/constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.imagicaholidays.com/api/v1';

export default function FindYourJourneyPage() {
    const [viewMode, setViewMode] = useState<"PHOTO" | "MAP">("PHOTO");
    const [journeys, setJourneys] = useState(fallbackJourneys);

    // Fetch from CRM API, fallback to constants
    useEffect(() => {
        fetch(`${API_BASE}/public/journeys`)
            .then(r => r.json())
            .then(d => { if (d.success && d.data?.length) setJourneys(d.data); })
            .catch(() => {}); // silently fallback
    }, []);


    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-24">
            <Navbar />

            {/* Header Section */}
            <section className="px-6 md:px-12 lg:px-24 pt-12 pb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-roman text-4xl md:text-5xl text-center text-[#1a1914] tracking-[0.1em] mb-16 uppercase">
                        Find Your Journey
                    </h1>

                    {/* Search / Filter Area */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-end border-b border-[#a09383]/30 pb-12">

                        {/* Where to? */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-[#1a1914] mb-4">Where to?</label>
                            <div className="flex border-b border-[#1a1914] pb-2 cursor-pointer hover:border-[#a5813b] transition-colors">
                                <span className="text-[#a09383] text-sm flex-grow">All Destinations</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1914" strokeWidth="1.5">
                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* When? & Advanced */}
                        <div className="flex items-end gap-8">
                            <div className="relative flex-grow">
                                <label className="block text-sm font-semibold text-[#1a1914] mb-4">When?</label>
                                <div className="flex border-b border-[#1a1914] pb-2 cursor-pointer hover:border-[#a5813b] transition-colors">
                                    <span className="text-[#a09383] text-sm flex-grow">Any Date</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1914" strokeWidth="1.5">
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 pb-2 text-[#1a1914] hover:text-[#a5813b] transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-semibold">Advanced</span>
                            </button>
                        </div>

                    </div>

                    {/* Sub Header & Toggles */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <span className="text-sm text-[#5c544b] font-medium">{journeys.length} journeys available</span>

                        <button className="text-xs uppercase tracking-widest text-[#a5813b] font-bold border-b border-[#a5813b] mt-4 md:mt-0">
                            Reset Filters
                        </button>
                    </div>

                    <div className="mt-12 flex justify-center w-full">
                        <div className="flex items-center gap-6 border-b-2 border-transparent">
                            <button
                                onClick={() => setViewMode("PHOTO")}
                                className={`text-sm font-bold tracking-widest pb-2 uppercase ${viewMode === "PHOTO" ? "text-[#1a1914] border-b-2 border-[#1a1914]" : "text-[#a09383]"}`}
                            >
                                Photo View
                            </button>
                            <button
                                onClick={() => setViewMode("MAP")}
                                className={`text-sm font-bold tracking-widest pb-2 uppercase ${viewMode === "MAP" ? "text-[#1a1914] border-b-2 border-[#1a1914]" : "text-[#a09383]"}`}
                            >
                                Map View
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Display */}
            <section className="px-6 md:px-12 lg:px-24 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {journeys.map((journey) => (
                                <motion.div
                                    key={journey.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col border border-[#d5cab5]/30"
                                >

                                    {/* Card Header */}
                                    <div className="text-center py-4 bg-[#f8f5f0] border-b border-[#d5cab5]/30">
                                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#5c544b]">
                                            {journey.regions}
                                        </span>
                                    </div>

                                    {/* Dynamic Image Area */}
                                    <div className="relative w-full h-[250px] overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            {viewMode === "PHOTO" ? (
                                                <motion.img
                                                    key={`photo-${journey.id}`}
                                                    src={journey.images[0]}
                                                    alt={journey.title}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : (
                                                <motion.img
                                                    key={`map-${journey.id}`}
                                                    src={journey.mapImage}
                                                    alt="Route Map"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* View overlay icon */}
                                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm flex items-center gap-2 shadow-sm">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1914" strokeWidth="2">
                                                {viewMode === "PHOTO" ? (
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" strokeLinecap="round" strokeLinejoin="round" />
                                                ) : (
                                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7" strokeLinecap="round" strokeLinejoin="round" />
                                                )}
                                            </svg>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1914]">
                                                {viewMode === "PHOTO" ? "Map" : "Photo"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex flex-col flex-grow">

                                        {/* Title & Ports */}
                                        <div className="flex justify-between items-start gap-4 mb-3">
                                            <div>
                                                <h3 className="font-roman text-lg font-bold text-[#1a1914] mb-1">{journey.departurePort}</h3>
                                                <p className="text-xs text-[#5c544b]">{journey.departureDate}</p>
                                            </div>
                                            <div className="flex-grow flex items-center justify-center pt-2">
                                                <svg width="24" height="10" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                                                    <path d="M5 12h14M15 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="text-right">
                                                <h3 className="font-roman text-lg font-bold text-[#1a1914] mb-1">{journey.returnPort}</h3>
                                                <p className="text-xs text-[#5c544b]">{journey.returnDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center py-5 border-b border-[#f0e7d6] mb-5">
                                            <div className="flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c544b" strokeWidth="1.5">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-[11px] font-bold tracking-widest uppercase text-[#5c544b]">{journey.vehicle}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c544b" strokeWidth="1.5">
                                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-[11px] font-bold tracking-widest uppercase text-[#5c544b]">{journey.durationNights} Nights</span>
                                            </div>
                                        </div>

                                        {/* Price and Action */}
                                        <div className="mt-auto flex justify-between items-end">
                                            <div>
                                                {journey.badges.map(b => (
                                                    <div key={b} className="flex items-center gap-1 mb-2 bg-[#f4ebd9] px-2 py-1 rounded-sm w-max">
                                                        <span className="text-[9px] font-bold text-[#a5813b] tracking-widest uppercase">% {b}</span>
                                                    </div>
                                                ))}
                                                <p className="text-[10px] text-[#5c544b] font-medium tracking-wide">Per guest, from:</p>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-roman text-2xl font-bold text-[#1a1914]">₹{journey.pricePerGuest.toLocaleString()}</span>
                                                    <span className="text-xs text-[#a09383] line-through">₹{journey.originalPrice.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/journey/${journey.id}`}
                                                className="bg-[#182335] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#1a1914] transition-colors"
                                            >
                                                Details
                                            </Link>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
