"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJ3UbvD4Kb-DkRFvv1VdWmFm4";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/nYMH3mYr92GBcfCTA";

interface ReviewExperienceProps {
  initialTourCode?: string;
  initialRating?: number;
  initialStep?: "rate" | "google_prompt" | "private_feedback" | "completed";
}

// Minimal Corner Brass Accents
const CornerAccent = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rot = pos === "tl" ? "rotate-0" : pos === "tr" ? "rotate-90" : pos === "br" ? "rotate-180" : "-rotate-90";
  const posClass = pos === "tl" ? "top-2.5 left-2.5" : pos === "tr" ? "top-2.5 right-2.5" : pos === "bl" ? "bottom-2.5 left-2.5" : "bottom-2.5 right-2.5";
  return (
    <div className={`absolute ${posClass} w-4 h-4 pointer-events-none opacity-60 ${rot}`}>
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
        <path d="M2 10 V2 H10" stroke="#d4af37" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </div>
  );
};

// 4-Color Google G Icon
const GoogleGIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.31 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.19 0 10.04 0 12s.46 3.81 1.26 5.42l4.02-3.13z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
    />
  </svg>
);

// Sculpted 3D Metallic Star
const MetallicStar = ({ active, size = 32 }: { active: boolean; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`transition-all duration-300 ${active ? "scale-105 drop-shadow-[0_0_14px_rgba(255,215,0,0.8)]" : "opacity-40"}`}
  >
    <defs>
      <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff8db" />
        <stop offset="35%" stopColor="#ffd700" />
        <stop offset="75%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8a6b2d" />
      </linearGradient>
      <linearGradient id="darkStar" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a3e2c" />
        <stop offset="100%" stopColor="#1a150e" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={active ? "url(#goldShine)" : "url(#darkStar)"}
      stroke={active ? "#ffe885" : "#5a4b35"}
      strokeWidth={active ? "1" : "0.5"}
      strokeLinejoin="round"
    />
  </svg>
);

export default function ReviewExperience({
  initialTourCode = "",
  initialRating = 0,
  initialStep = "rate"
}: ReviewExperienceProps) {
  const [tourCode, setTourCode] = useState(initialTourCode);
  const [guestName, setGuestName] = useState("");
  const [destination, setDestination] = useState("");
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [step, setStep] = useState<"rate" | "google_prompt" | "private_feedback" | "completed">(initialStep);

  // 1-3 Stars state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Quick chips copy state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!tourCode) return;
    const fetchTour = async () => {
      try {
        const res = await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`);
        if (res.ok) {
          const body = await res.json();
          if (body.success && body.data) {
            setGuestName(body.data.guestName || "");
            setDestination(body.data.destination || "");
          }
        }
      } catch {
        // silent
      }
    };
    fetchTour();
  }, [tourCode]);

  const ratingLabels: Record<number, { label: string; tone: string }> = {
    1: { label: "Disappointing", tone: "Let our founders make this right" },
    2: { label: "Needs Improvement", tone: "Tell us where we fell short" },
    3: { label: "Average", tone: "How can we elevate next time?" },
    4: { label: "Very Good", tone: "Delighted you enjoyed the journey" },
    5: { label: "Exceptional", tone: "Transcendental luxury experience" }
  };

  const quickSnippets = [
    "🏔️ Flawless Sikkim luxury stays & breathtaking mountain vistas.",
    "🚗 Outstanding private chauffeur, safe transit & seamless permits.",
    "✨ 24/7 concierge warmth. Everything was effortless & luxurious."
  ];

  const feedbackChips = [
    "Chauffeur & Transit",
    "Hotel Standards",
    "Itinerary Pacing",
    "Meal Arrangements",
    "Concierge Support"
  ];

  const handleSelectRating = (stars: number) => {
    setRating(stars);
    if (stars >= 4) {
      setStep("google_prompt");
    } else {
      setStep("private_feedback");
    }
  };

  const handleCopySnippet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleOpenGoogle = async () => {
    if (tourCode) {
      try {
        await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, action: "opened_google_review" })
        });
      } catch {}
    }
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("completed");
  };

  const handleSubmitPrivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    try {
      if (tourCode) {
        await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating,
            action: "private_feedback_submitted",
            selectedTags,
            feedbackText
          })
        });
      }
    } catch {}
    setSubmittingFeedback(false);
    setStep("completed");
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="relative min-h-screen bg-[#080706] text-[#faf6ee] font-manrope selection:bg-[#d4af37]/30 selection:text-[#ffd700] overflow-x-hidden flex flex-col justify-between">
      {/* ── GRAPHICAL AMBIENCE & SUBTLE LIGHTING ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#d4af37]/12 via-[#b39252]/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/6 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-5xl mx-auto w-full my-auto">
        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* MINIMAL HEADER */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#16130e]/90 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c676]">
              {tourCode ? `Tour #${tourCode}` : "Imagica Private Client"}
            </span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl text-[#faf6ee] font-normal tracking-tight">
            How Was Your Journey?
          </h1>
          <p className="text-xs sm:text-sm text-[#baa990] font-light mt-1.5 max-w-md mx-auto">
            {guestName ? `Welcome back, ${guestName}. ` : ""}Your impression shapes our standard of luxury.
          </p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* GRAPHICAL SPLIT CARD (MINIMAL TEXT · HIGH VISUAL IMPACT) */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* ───────────────────────────────────────────────────────────── */}
          {/* LEFT: PURE PHOTOGRAPHIC TRAVEL PLAQUE (ZERO CLUTTER) */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#120f0b] flex flex-col justify-between min-h-[320px] md:min-h-[440px]">
            {/* Background Himalayan Photo */}
            <Image
              src="/images/pelling-snow.jpg"
              alt="Himalayan Peak Vista"
              fill
              priority
              className="object-cover filter brightness-[0.82] contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-black/30" />

            {/* Corner Brass Accents */}
            <CornerAccent pos="tl" />
            <CornerAccent pos="tr" />
            <CornerAccent pos="bl" />
            <CornerAccent pos="br" />

            {/* Top Badge: 3D Wax Seal */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5d77f] bg-black/60 px-2.5 py-1 rounded-full border border-[#d4af37]/40 backdrop-blur-md">
                {destination || "Himalayan Odyssey"}
              </span>

              {/* Raised Wax Seal */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8a1c1c] via-[#5c1313] to-[#3a0a0a] border-2 border-[#d4af37] shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center justify-center p-0.5">
                <Image
                  src="/imagica_logo_gold_2x.png"
                  alt="Imagica Seal"
                  width={24}
                  height={24}
                  className="object-contain drop-shadow"
                />
              </div>
            </div>

            {/* Bottom Photo Overlay */}
            <div className="relative z-10 p-5 text-left">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Completed Voyage
              </span>
              <p className="font-playfair text-lg sm:text-xl text-white font-medium">
                {guestName || "Distinguished Traveler"}
              </p>
              <div className="flex items-center gap-1 text-[#ffd700] text-xs mt-1">
                <span>★★★★★</span>
                <span className="text-[10px] text-[#baa990] font-mono ml-1">4.9 on Google Maps</span>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* RIGHT: INTERACTIVE RATING & ACTION SALON */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="md:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              {/* ───────────────────────────────────────────────────────── */}
              {/* STEP 1: 5 SCULPTED GOLD MEDALLIONS */}
              {/* ───────────────────────────────────────────────────────── */}
              {step === "rate" && (
                <motion.div
                  key="step-rate"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 rounded-3xl bg-gradient-to-b from-[#18140f]/95 to-[#0e0c08]/95 border-2 border-[#d4af37]/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(212,175,55,0.15)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <CornerAccent pos="tl" />
                  <CornerAccent pos="tr" />

                  <div className="text-center">
                    <span className="text-xs uppercase tracking-widest text-[#e8c676] font-semibold">
                      Select Your Rating
                    </span>
                    <h2 className="font-playfair text-2xl sm:text-3xl text-[#faf6ee] font-normal mt-1">
                      Rate Your Experience
                    </h2>
                  </div>

                  {/* 5 Sculptural Star Buttons */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3.5 my-6">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= displayRating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleSelectRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="group relative flex flex-col items-center focus:outline-none transition-transform duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
                          aria-label={`${star} Stars`}
                        >
                          {/* Radial Glow */}
                          <div
                            className={`absolute inset-0 rounded-2xl bg-[#ffd700]/30 blur-lg transition-opacity duration-300 ${
                              isFilled ? "opacity-100" : "opacity-0"
                            }`}
                          />

                          {/* Dial Container */}
                          <div
                            className={`relative w-12 h-16 sm:w-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300 ${
                              isFilled
                                ? "bg-gradient-to-b from-[#2a2215] to-[#15110a] border-[#ffd700] shadow-[0_8px_20px_rgba(212,175,55,0.4)]"
                                : "bg-[#14110d] border-[#4a3e2c]/50 hover:border-[#8a6b2d]"
                            }`}
                          >
                            <MetallicStar active={isFilled} size={28} />
                            <span
                              className={`text-[11px] sm:text-xs font-bold mt-1.5 transition-colors ${
                                isFilled ? "text-[#ffd700]" : "text-[#7a6a52]"
                              }`}
                            >
                              {star}★
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Minimal Label */}
                  <div className="text-center p-3.5 rounded-2xl bg-[#120f0b] border border-[#8a6b2d]/30 min-h-[64px] flex items-center justify-center">
                    {displayRating > 0 ? (
                      <div>
                        <span className="text-sm font-bold text-[#ffd700] block">
                          {ratingLabels[displayRating].label}
                        </span>
                        <span className="text-xs text-[#baa990]">
                          {ratingLabels[displayRating].tone}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8c7e6c]">
                        Tap any star to cast your rating
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ───────────────────────────────────────────────────────── */}
              {/* STEP 2A: 4-5 STARS -> MINIMAL GRAPHICAL GOOGLE ACTION */}
              {/* ───────────────────────────────────────────────────────── */}
              {step === "google_prompt" && (
                <motion.div
                  key="step-google"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 rounded-3xl bg-gradient-to-b from-[#1a150f]/95 to-[#0e0c08]/95 border-2 border-[#ffd700]/50 backdrop-blur-2xl shadow-[0_20px_60px_rgba(212,175,55,0.25)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <CornerAccent pos="tl" />
                  <CornerAccent pos="tr" />

                  {/* Top Bar: Back & Rating Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => setStep("rate")}
                      className="text-[11px] text-[#a5813b] hover:text-[#ffd700] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                    >
                      ← Change ({rating}★)
                    </button>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      ✓ {rating}★ Selected
                    </span>
                  </div>

                  {/* Center Hero: Google Maps Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#241c13] to-[#120e0a] border border-[#ffd700]/40 p-4 sm:p-5 my-2 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-2 shadow shrink-0">
                          <GoogleGIcon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-bold text-white">Imagica Holidays</h3>
                          <span className="text-[11px] text-[#cfc5b3] block">Google Maps Verified</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold font-playfair text-[#ffd700]">4.9★</span>
                        <span className="text-[9px] text-[#a5813b] block">180+ Reviews</span>
                      </div>
                    </div>

                    {/* Big Shimmering CTA Button */}
                    <button
                      type="button"
                      onClick={handleOpenGoogle}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ffd700] via-[#f7d070] to-[#c9a84c] text-[#120f0a] py-3.5 px-4 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <GoogleGIcon className="w-4 h-4" />
                      <span>Review on Google Maps</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">↗</span>
                    </button>
                  </div>

                  {/* 1-Tap Snippet Chips (Short & Minimal) */}
                  <div className="mt-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#e8c676] font-semibold block mb-2">
                      Tap to Copy Short Reflection:
                    </span>
                    <div className="space-y-1.5">
                      {quickSnippets.map((text, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleCopySnippet(text, idx)}
                          className="w-full text-left p-2.5 rounded-xl bg-[#14100c] border border-[#8a6b2d]/30 hover:border-[#ffd700]/60 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                        >
                          <span className="text-xs text-[#cfc5b3] truncate group-hover:text-white transition-colors">
                            {text}
                          </span>
                          <span
                            className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded shrink-0 transition-all ${
                              copiedIndex === idx
                                ? "bg-emerald-500 text-black"
                                : "bg-[#251e15] text-[#e8c676]"
                            }`}
                          >
                            {copiedIndex === idx ? "✓ Copied" : "Copy"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ───────────────────────────────────────────────────────── */}
              {/* STEP 2B: 1-3 STARS -> MINIMAL FOUNDERS NOTE */}
              {/* ───────────────────────────────────────────────────────── */}
              {step === "private_feedback" && (
                <motion.div
                  key="step-private"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 rounded-3xl bg-gradient-to-b from-[#1a120e]/95 to-[#0e0a08]/95 border-2 border-[#c2614b]/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(194,97,75,0.2)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <CornerAccent pos="tl" />
                  <CornerAccent pos="tr" />

                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => setStep("rate")}
                      className="text-[11px] text-[#a5813b] hover:text-[#ffd700] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                    >
                      ← Back ({rating}★)
                    </button>
                    <span className="text-[10px] uppercase font-bold text-[#fca59d] bg-[#351610] px-2 py-0.5 rounded-full border border-[#c2614b]/40">
                      Private to Founders
                    </span>
                  </div>

                  <form onSubmit={handleSubmitPrivate} className="space-y-3.5">
                    <div>
                      <h3 className="font-playfair text-xl text-white font-medium">
                        How can we improve?
                      </h3>
                      <p className="text-xs text-[#baa990] mt-0.5">
                        Your note lands directly with our Managing Directors.
                      </p>
                    </div>

                    {/* Quick Category Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {feedbackChips.map((chip) => {
                        const sel = selectedTags.includes(chip);
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => {
                              setSelectedTags(
                                sel ? selectedTags.filter((t) => t !== chip) : [...selectedTags, chip]
                              );
                            }}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                              sel
                                ? "bg-[#3d1811] border-[#c2614b] text-[#ffd6d0]"
                                : "bg-[#140e0a] border-[#5a3e2c]/50 text-[#baa990]"
                            }`}
                          >
                            {sel ? "✓ " : "+ "}
                            {chip}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      rows={3}
                      required
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Briefly describe what happened..."
                      className="w-full text-xs p-3 rounded-xl border border-[#8a523b]/50 bg-[#120d09] text-white focus:outline-none focus:ring-1 focus:ring-[#c2614b] placeholder:text-[#6e5848]"
                    />

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={submittingFeedback}
                        className="flex-1 rounded-xl bg-gradient-to-r from-[#d96b52] to-[#b34832] text-white py-3 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        {submittingFeedback ? "Sending..." : "Send to Founders ➔"}
                      </button>
                      <a
                        href="https://wa.me/919876543210?text=Direct%20Founders%20Redress%20Request"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-[#25D366]/40 bg-[#122818] text-[#25D366] px-3.5 py-3 text-xs font-bold flex items-center justify-center"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ───────────────────────────────────────────────────────── */}
              {/* STEP 3: CLEAN THANK YOU */}
              {/* ───────────────────────────────────────────────────────── */}
              {step === "completed" && (
                <motion.div
                  key="step-completed"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 rounded-3xl bg-gradient-to-b from-[#18140f] to-[#0e0c08] border-2 border-[#d4af37]/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(212,175,55,0.2)] p-6 sm:p-10 text-center flex flex-col items-center justify-center relative overflow-hidden"
                >
                  <CornerAccent pos="tl" />
                  <CornerAccent pos="tr" />

                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-2xl text-emerald-400 mb-3 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                    ✓
                  </div>
                  <h3 className="font-playfair text-2xl text-white font-medium mb-1">
                    Thank You
                  </h3>
                  <p className="text-xs text-[#cfc5b3] max-w-sm mb-6">
                    Your impression has been recorded with our Concierge Office. We look forward to hosting you again.
                  </p>
                  <Link
                    href="/"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#c9a84c] text-[#120f0a] text-xs font-bold uppercase tracking-wider"
                  >
                    Return to Homepage
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
