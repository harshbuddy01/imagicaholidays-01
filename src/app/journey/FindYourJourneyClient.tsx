"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import DestinationMapPoster from "@/components/ui/DestinationMapPoster";

interface FindYourJourneyClientProps {
  initialJourneys: Array<{
    id: string;
    title: string;
    regions: string;
    durationNights: number;
    durationDays: number;
    pricePerGuest: number;
    originalPrice: number;
    departurePort: string;
    returnPort: string;
    departureDate: string;
    returnDate: string;
    ports: number;
    countries: number;
    vehicle: string;
    badges: string[];
    images: string[];
    mapImage?: string;
    overview?: string;
  }>;
}

const DESTINATION_FILTERS = [
  { label: "All Destinations", value: "ALL" },
  { label: "Sikkim & Northeast", value: "SIKKIM" },
  { label: "Darjeeling & Bengal", value: "DARJEELING" },
  { label: "Kerala & South", value: "KERALA" },
  { label: "Rajasthan & Royal", value: "RAJASTHAN" },
  { label: "Goa & Coast", value: "GOA" },
];

export default function FindYourJourneyClient({ initialJourneys }: FindYourJourneyClientProps) {
    const [viewMode, setViewMode] = useState<"PHOTO" | "MAP">("PHOTO");
    const [cardViewOverrides, setCardViewOverrides] = useState<Record<string, "PHOTO" | "MAP">>({});
    const [selectedDestination, setSelectedDestination] = useState<string>("ALL");
    const [destDropdownOpen, setDestDropdownOpen] = useState(false);

    const getEffectiveCardView = (journeyId: string) => {
        return cardViewOverrides[journeyId] || viewMode;
    };

    const toggleCardView = (journeyId: string) => {
        setCardViewOverrides((prev) => {
            const current = prev[journeyId] || viewMode;
            return {
                ...prev,
                [journeyId]: current === "PHOTO" ? "MAP" : "PHOTO",
            };
        });
    };

    const filteredJourneys = useMemo(() => {
        if (selectedDestination === "ALL") return initialJourneys;
        return initialJourneys.filter((j) => {
            const haystack = `${j.title} ${j.regions} ${(j.badges || []).join(" ")} ${j.departurePort} ${j.returnPort}`.toLowerCase();
            return haystack.includes(selectedDestination.toLowerCase());
        });
    }, [initialJourneys, selectedDestination]);

    const activeFilterLabel = DESTINATION_FILTERS.find((f) => f.value === selectedDestination)?.label || "All Destinations";

    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-24">
            <Navbar />

            {/* Header Section */}
            <section className="px-6 md:px-12 lg:px-24 pt-12 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#a5813b] font-bold block mb-3 font-manrope">
                            Curated Travel Collections
                        </span>
                        <h1 className="font-roman text-4xl md:text-6xl text-[#1a1914] tracking-[0.08em] uppercase mb-4">
                            Our Packages
                        </h1>
                        <p className="text-sm md:text-base text-[#6a5e50] max-w-2xl mx-auto font-manrope leading-relaxed">
                            Handcrafted luxury holiday itineraries with private chauffeurs, heritage resorts, and bespoke sightseeing across the Himalayas and India.
                        </p>
                    </div>

                    {/* Filter Pills / Selector Area */}
                    <div className="border-b border-[#a09383]/30 pb-8">
                        {/* Quick filter pills for desktop */}
                        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 mb-6">
                            {DESTINATION_FILTERS.map((f) => {
                                const isActive = selectedDestination === f.value;
                                return (
                                    <button
                                        key={f.value}
                                        onClick={() => setSelectedDestination(f.value)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                                            isActive
                                                ? "bg-[#182335] text-white shadow-md"
                                                : "bg-white text-[#5c544b] border border-[#d5cab5]/60 hover:border-[#a5813b] hover:text-[#1a1914]"
                                        }`}
                                    >
                                        {f.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile dropdown selector */}
                        <div className="sm:hidden relative max-w-xs mx-auto mb-6">
                            <label className="block text-xs font-semibold text-[#1a1914] mb-2 uppercase tracking-wider">Destination</label>
                            <button
                                type="button"
                                onClick={() => setDestDropdownOpen((prev) => !prev)}
                                className="w-full flex items-center justify-between bg-white border border-[#d5cab5] rounded-lg px-4 py-2.5 text-sm text-[#1a1914]"
                            >
                                <span className="font-medium">{activeFilterLabel}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${destDropdownOpen ? "rotate-180" : ""}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            {destDropdownOpen && (
                                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#d5cab5] py-1">
                                    {DESTINATION_FILTERS.map((f) => (
                                        <button
                                            key={f.value}
                                            type="button"
                                            onClick={() => {
                                                setSelectedDestination(f.value);
                                                setDestDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                                                selectedDestination === f.value ? "bg-[#f4ebd9] text-[#a5813b]" : "text-[#1a1914] hover:bg-stone-50"
                                            }`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sub Header & Toggles */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                            <span className="text-sm text-[#5c544b] font-medium font-manrope">
                                Showing <strong className="text-[#1a1914]">{filteredJourneys.length}</strong> {filteredJourneys.length === 1 ? "package" : "packages"} available
                            </span>

                            {selectedDestination !== "ALL" && (
                                <button
                                    onClick={() => setSelectedDestination("ALL")}
                                    className="text-xs uppercase tracking-widest text-[#a5813b] font-bold border-b border-[#a5813b] hover:text-[#1a1914] hover:border-[#1a1914] transition-colors"
                                >
                                    Reset Filters
                                </button>
                            )}

                            {/* View Switcher */}
                            <div className="flex items-center gap-6 border-b-2 border-transparent">
                                <button
                                    onClick={() => {
                                        setViewMode("PHOTO");
                                        setCardViewOverrides({});
                                    }}
                                    className={`text-xs font-bold tracking-widest pb-1.5 uppercase transition-colors ${
                                        viewMode === "PHOTO" ? "text-[#1a1914] border-b-2 border-[#1a1914]" : "text-[#a09383]"
                                    }`}
                                >
                                    Photo View
                                </button>
                                <button
                                    onClick={() => {
                                        setViewMode("MAP");
                                        setCardViewOverrides({});
                                    }}
                                    className={`text-xs font-bold tracking-widest pb-1.5 uppercase transition-colors ${
                                        viewMode === "MAP" ? "text-[#1a1914] border-b-2 border-[#1a1914]" : "text-[#a09383]"
                                    }`}
                                >
                                    Map View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Display */}
            <section className="px-6 md:px-12 lg:px-24 pb-24">
                <div className="max-w-7xl mx-auto">
                    {filteredJourneys.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-[#d5cab5]/40 p-8 max-w-lg mx-auto">
                            <p className="text-lg font-serif text-[#1a1914] mb-2">No packages found for this destination</p>
                            <p className="text-xs text-[#5c544b] mb-6">Try selecting another filter or reset to view all packages.</p>
                            <button
                                onClick={() => setSelectedDestination("ALL")}
                                className="bg-[#182335] text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#1a1914] transition-colors"
                            >
                                View All Packages
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredJourneys.map((journey) => {
                                    const currentCardView = getEffectiveCardView(journey.id);

                                    return (
                                        <motion.div
                                            key={journey.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col border border-[#d5cab5]/30 group"
                                        >
                                            {/* Card Header */}
                                            <div className="text-center py-4 bg-[#f8f5f0] border-b border-[#d5cab5]/30">
                                                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#5c544b]">
                                                    {journey.regions}
                                                </span>
                                            </div>

                                            {/* Dynamic Image Area (Photo or Midnight Blue Cartographic Map) */}
                                            <div className="relative w-full h-[255px] overflow-hidden bg-[#0a121e]">
                                                <AnimatePresence mode="wait">
                                                    {currentCardView === "PHOTO" ? (
                                                        <motion.img
                                                            key={`photo-${journey.id}`}
                                                            src={journey.images?.[0] || "/placeholder-travel.jpg"}
                                                            alt={journey.title}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.35 }}
                                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <motion.div
                                                            key={`map-${journey.id}`}
                                                            initial={{ opacity: 0, scale: 0.97 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.97 }}
                                                            transition={{ duration: 0.35 }}
                                                            className="absolute inset-0 w-full h-full"
                                                        >
                                                            <DestinationMapPoster
                                                                departurePort={journey.departurePort}
                                                                returnPort={journey.returnPort}
                                                                regions={journey.regions}
                                                                badges={journey.badges}
                                                                title={journey.title}
                                                                customMapUrl={journey.mapImage}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Card Quick Toggle Pill */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleCardView(journey.id);
                                                    }}
                                                    className="absolute bottom-3 right-3 bg-[#08101d]/85 hover:bg-[#08101d] text-[#d8be8f] backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-[#d8be8f]/30 hover:border-[#d8be8f]/70 transition-all z-30 cursor-pointer"
                                                    title={currentCardView === "PHOTO" ? "Switch to Midnight Blue Map Poster" : "Switch to Photo View"}
                                                >
                                                    {currentCardView === "PHOTO" ? (
                                                        <>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                                                                <line x1="9" y1="3" x2="9" y2="18" />
                                                                <line x1="15" y1="6" x2="15" y2="21" />
                                                            </svg>
                                                            <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Map View</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                                                <circle cx="12" cy="13" r="4" />
                                                            </svg>
                                                            <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Photo View</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                {/* Title */}
                                                <h3 className="font-roman text-xl font-bold text-[#1a1914] mb-3 line-clamp-2 leading-snug">
                                                    {journey.title}
                                                </h3>

                                                {/* Departure -> Return Ports */}
                                                <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-[#f0e7d6]">
                                                    <div>
                                                        <span className="text-[9px] uppercase tracking-wider text-[#a09383] block">Departs</span>
                                                        <h4 className="font-roman text-sm font-bold text-[#1a1914]">{journey.departurePort}</h4>
                                                        <p className="text-[11px] text-[#5c544b]">{journey.departureDate}</p>
                                                    </div>
                                                    <div className="flex-grow flex items-center justify-center pt-3">
                                                        <svg width="24" height="10" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                                                            <path d="M5 12h14M15 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[9px] uppercase tracking-wider text-[#a09383] block">Returns</span>
                                                        <h4 className="font-roman text-sm font-bold text-[#1a1914]">{journey.returnPort}</h4>
                                                        <p className="text-[11px] text-[#5c544b]">{journey.returnDate}</p>
                                                    </div>
                                                </div>

                                                {/* Vehicle & Duration */}
                                                <div className="flex justify-between items-center py-2 mb-5">
                                                    <div className="flex items-center gap-2">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5c544b" strokeWidth="1.5">
                                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#5c544b]">{journey.vehicle}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5c544b" strokeWidth="1.5">
                                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#5c544b]">
                                                            {journey.durationDays}D / {journey.durationNights}N
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Price and Action */}
                                                <div className="mt-auto flex justify-between items-end pt-4 border-t border-[#f0e7d6]">
                                                    <div>
                                                        {(journey.badges || []).slice(0, 1).map((b) => (
                                                            <div key={b} className="flex items-center gap-1 mb-1.5 bg-[#f4ebd9] px-2 py-0.5 rounded-sm w-max">
                                                                <span className="text-[9px] font-bold text-[#a5813b] tracking-widest uppercase">{b}</span>
                                                            </div>
                                                        ))}
                                                        <p className="text-[10px] text-[#5c544b] font-medium tracking-wide">Per guest, from:</p>
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="font-roman text-2xl font-bold text-[#1a1914]">₹{journey.pricePerGuest.toLocaleString()}</span>
                                                            {journey.originalPrice > journey.pricePerGuest && (
                                                                <span className="text-xs text-[#a09383] line-through">₹{journey.originalPrice.toLocaleString()}</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <Link
                                                        href={`/packages/${journey.id}`}
                                                        className="bg-[#182335] text-white px-7 py-3 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#a5813b] transition-colors"
                                                    >
                                                        Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
