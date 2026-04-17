"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { journeys } from "@/lib/constants";

export default function JourneyDetailsPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [journey, setJourney] = useState<typeof journeys[0] | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [expandedDay, setExpandedDay] = useState<string | null>(null);

    useEffect(() => {
        const found = journeys.find(j => j.id === id);
        if (found) {
            setJourney(found);
        } else {
            router.push("/journey");
        }
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

    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-24 font-body">
            <Navbar />

            {/* Top Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white border-b border-[#e5ded5] hidden md:block mt-8">
                <div className="max-w-7xl mx-auto flex justify-center gap-12 font-semibold text-[10px] tracking-widest uppercase">
                    <Link href="#overview" className="border-b-2 border-[#1a1914] text-[#1a1914] py-6">Overview</Link>
                    <Link href="#itinerary" className="border-b-2 border-transparent text-[#a09383] hover:text-[#1a1914] py-6 transition-colors">Itinerary</Link>
                    <Link href="#inclusions" className="border-b-2 border-transparent text-[#a09383] hover:text-[#1a1914] py-6 transition-colors">Inclusions</Link>
                    <Link href="#vehicle" className="border-b-2 border-transparent text-[#a09383] hover:text-[#1a1914] py-6 transition-colors">Vehicle</Link>
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

                        <div className="md:w-2/3 space-y-6">
                            {journey.itinerary.map((dayData, idx) => {
                                const isExpanded = expandedDay === dayData.day;
                                return (
                                    <div key={idx} className="border-b border-[#d5cab5]/60 pb-6">
                                        <div className="flex gap-6 items-start">
                                            {/* Left Thumb */}
                                            <div className="w-[120px] aspect-[4/3] flex-shrink-0 rounded-sm overflow-hidden bg-gray-200">
                                                <img src={dayData.image} alt={dayData.title} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Right Content */}
                                            <div className="flex-grow">
                                                <button
                                                    className="w-full flex items-start justify-between text-left group"
                                                    onClick={() => toggleDay(dayData.day)}
                                                >
                                                    <div>
                                                        <p className="text-[#1a1914] text-sm mb-2">{dayData.day}</p>
                                                        <h3 className="font-roman text-xl text-[#1a1914]">{dayData.title}</h3>
                                                        <p className="text-xs text-[#a09383] mt-2">
                                                            {dayData.date} · {dayData.time}
                                                        </p>
                                                    </div>

                                                    <div className="pt-2 text-[#a09383] group-hover:text-[#1a1914] transition-colors">
                                                        {isExpanded ? (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        ) : (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                                <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
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

                    {/* Inclusions Section (Screenshot 7) */}
                    <div id="inclusions" className="mt-16 border border-[#a5813b]/30 p-8 md:p-12 relative bg-[#fdfdfc] mb-12">
                        {/* Decorative Top Accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f8f5f0] px-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5813b" strokeWidth="1">
                                <path d="M12 2L15 9l7 1-5 5.5L15.5 22 12 18l-3.5 4L10 15.5 5 10l7-1 3-7z" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h2 className="font-roman text-3xl text-[#1a1914] mb-8">All Journeys Include</h2>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">Nine culinary experiences</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">Unlimited fine beverages</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">Thermal spa access</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">Complimentary high-speed Wi-Fi</span>
                                </li>
                            </ul>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">Wellbeing and fitness programmes</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">All on-board gratuities</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1 h-1 rounded-full bg-[#1a1914] mt-2 flex-shrink-0" />
                                    <span className="text-[#5c544b] text-[15px]">Dedicated concierge service</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12 text-center text-xs text-[#a09383]">
                            Plus <span className="text-[#a5813b] underline cursor-pointer hover:text-[#1a1914] transition-colors">additional benefits</span> for guests of Ocean Grand Terrace Suites.
                        </div>
                    </div>

                </div>

                {/* Right Column (Sticky Details Panel - Screenshot 5) */}
                <div className="w-full lg:w-[40%] xl:w-[35%] lg:sticky lg:top-[120px] bg-[#fdfdfc] rounded-xl border border-[#e5ded5] shadow-sm flex flex-col">

                    <div className="p-8 lg:p-10 flex-grow">
                        <h1 className="font-roman text-3xl font-medium text-[#1a1914] leading-tight mb-8">
                            {journey.title}
                        </h1>

                        {/* Quick Stats (4 Icons - Explora Style) */}
                        <div className="flex justify-between items-center mb-8 pb-8">
                            <div className="text-center flex flex-col items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#675f56" strokeWidth="1" className="mb-3">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[9px] tracking-widest font-semibold uppercase text-[#675f56]">IMAGICA</span>
                            </div>
                            <div className="text-center flex flex-col items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#675f56" strokeWidth="1" className="mb-3">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[9px] tracking-widest font-semibold uppercase text-[#675f56]">{journey.durationNights} NIGHTS</span>
                            </div>
                            <div className="text-center flex flex-col items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#675f56" strokeWidth="1" className="mb-3">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[9px] tracking-widest font-semibold uppercase text-[#675f56]">{journey.ports} PORTS</span>
                            </div>
                            <div className="text-center flex flex-col items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#675f56" strokeWidth="1" className="mb-3">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                <span className="text-[9px] tracking-widest font-semibold uppercase text-[#675f56]">{journey.countries} COUNTRIES</span>
                            </div>
                        </div>

                        {/* Unified Information Block */}
                        <div className="bg-[#f5f3ef] rounded-md p-6 mb-6">

                            {/* Departure / Return Dates & Ports */}
                            <div className="border-b border-[#e6e2db] pb-6 mb-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-1/2">
                                        <p className="text-[9px] tracking-widest text-[#8c8479] font-bold uppercase mb-1">Departure Port</p>
                                        <p className="text-[#1a1914] text-[15px]">{journey.departurePort}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <p className="text-[9px] tracking-[0.1em] text-[#8c8479] font-bold uppercase mb-1">Return Port</p>
                                        <p className="text-[#1a1914] text-[15px] leading-tight">{journey.returnPort}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="w-1/2">
                                        <p className="text-[9px] tracking-widest text-[#8c8479] font-bold uppercase mb-1">Departure Date</p>
                                        <p className="text-[#1a1914] text-[15px]">{journey.departureDate}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <p className="text-[9px] tracking-[0.1em] text-[#8c8479] font-bold uppercase mb-1">Return Date</p>
                                        <p className="text-[#1a1914] text-[15px]">{journey.returnDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col relative group cursor-pointer">
                                <p className="text-[9px] tracking-widest text-[#8c8479] font-bold uppercase mb-2">From</p>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-[#8c8479] line-through text-[15px]">₹{journey.originalPrice.toLocaleString()}</span>
                                    <span className="font-roman text-2xl font-bold text-[#1a1914]">₹{journey.pricePerGuest.toLocaleString()}</span>
                                    <span className="text-[#1a1914] text-sm ml-1">per adult</span>
                                </div>

                                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 w-max border border-[#e5ded5] hover:border-[#a09383] transition-colors">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1914" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-[9px] font-bold text-[#1a1914] tracking-widest uppercase">An Invitation to Imagica</span>
                                </div>

                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#a09383] group-hover:text-[#1a1914] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Actions Links */}
                        <div className="flex justify-end gap-6 pb-2">
                            <button className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#5c544b] hover:text-[#1a1914] transition-colors border-b border-[#5c544b] pb-0.5">
                                Download Details
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#5c544b] hover:text-[#1a1914] transition-colors border-b border-[#5c544b] pb-0.5">
                                Share
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Action Footer (Dark Blue) */}
                    <div className="bg-[#0b1f3b] text-white p-8 rounded-b-xl">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <Link href="#quote" className="flex-1 border border-[#304870] flex justify-center items-center gap-2 py-3.5 text-xs font-bold tracking-wider hover:bg-[#304870]/30 transition-colors rounded-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                                    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
                                    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
                                    <polyline points="10 9 9 9 8 9" strokeLinecap="round" />
                                </svg>
                                Request a Quote
                            </Link>
                            <Link href="/reserve" className="flex-1 bg-white text-[#1a1914] flex justify-center items-center gap-2 py-3.5 text-xs font-bold tracking-wider hover:bg-gray-100 transition-colors rounded-sm">
                                Reserve
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>

                        <p className="text-center flex items-center justify-center gap-2 text-xs text-[#a3b1c6]">
                            <span className="border-b border-[#a3b1c6] pb-0.5 cursor-pointer hover:text-white transition-colors">Flexible Cancellation Policy</span>
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}
