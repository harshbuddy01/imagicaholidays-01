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

  // Feedback form state (for 1-3 stars)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Quick review suggestion copy state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Fetch tour info if tourCode exists
  useEffect(() => {
    if (!tourCode) return;
    const fetchTourInfo = async () => {
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
        // Fallback gracefully without throwing
      }
    };
    fetchTourInfo();
  }, [tourCode]);

  const ratingTiers: Record<number, { title: string; subtitle: string; starsDisplay: string }> = {
    1: { title: "Fell Short of Expectations", subtitle: "Your disappointment matters deeply to us. We will personally make this right.", starsDisplay: "★ ☆ ☆ ☆ ☆" },
    2: { title: "Needed Greater Polish", subtitle: "Please share where our standards wavered so we can address it immediately.", starsDisplay: "★ ★ ☆ ☆ ☆" },
    3: { title: "Pleasant Moments", subtitle: "Tell our founders how we can elevate your journey into pure perfection.", starsDisplay: "★ ★ ★ ☆ ☆" },
    4: { title: "Memorable Expedition", subtitle: "We are thrilled that your holiday with Imagica was filled with delightful memories.", starsDisplay: "★ ★ ★ ★ ☆" },
    5: { title: "Transcendental & Unforgettable", subtitle: "An extraordinary journey. We are profoundly honored to have hosted you.", starsDisplay: "★ ★ ★ ★ ★" }
  };

  const reviewSuggestions = [
    {
      badge: "Full Hospitality & Stays",
      text: "Our private expedition arranged by Imagica Holidays was sheer perfection. Flawless hospitality, spectacular luxury stays, and exceptional personal attention. Truly 10/10!"
    },
    {
      badge: "Pacing & Scenic Transit",
      text: "From the warm mountain welcome to every scenic transit, Imagica Holidays took care of every single nuance. The highest recommendation for discerning travelers."
    },
    {
      badge: "Concierge & Peace of Mind",
      text: "Exquisite itinerary planning and 24/7 concierge warmth. Everything was effortless, peaceful, and truly unforgettable. Thank you Imagica team!"
    }
  ];

  const feedbackCategories = [
    "Private Chauffeur & Vehicle",
    "Luxury Stays & Room Standards",
    "Itinerary Pacing & Sightseeing",
    "Culinary & Dining Arrangements",
    "24/7 Concierge Support",
    "Permits & Fast-Track Access"
  ];

  const handleSelectRating = (stars: number) => {
    setRating(stars);
    if (stars >= 4) {
      setStep("google_prompt");
    } else {
      setStep("private_feedback");
    }
  };

  const handleCopySuggestion = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  const handleOpenGoogle = async () => {
    // 1. Notify CRM backend that the customer opened the Google review link
    if (tourCode) {
      try {
        await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating: rating || 5,
            action: "google_review_opened",
            completedAt: new Date().toISOString()
          })
        });
      } catch {
        // Continue even if network error
      }
    }

    // 2. Open Google review link in new tab
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    setStep("completed");
  };

  const handleSubmitPrivateFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setSubmittingFeedback(true);
    try {
      if (tourCode) {
        await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating,
            tags: selectedTags,
            feedback: feedbackText,
            action: "private_feedback_submitted",
            submittedAt: new Date().toISOString()
          })
        });
      }
      setFeedbackSubmitted(true);
      setStep("completed");
    } catch {
      setFeedbackSubmitted(true);
      setStep("completed");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const activeStarCount = hoverRating || rating;

  return (
    <div className="min-h-screen bg-[#080706] text-[#faf6ee] flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-white relative overflow-x-hidden">
      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* CINEMATIC BACKGROUND VIDEO / MOUNTAIN ATMOSPHERE */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient Video Loop with Rich Dark Veil */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-25 filter blur-[1px]"
          poster="/images/destinations_sketch_bg.webp"
        >
          <source src="/videos/hero-1-compressed.mp4" type="video/mp4" />
        </video>

        {/* Multi-layered Dark Obsidian & Warm Gold Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/95 via-[#110e0b]/80 to-[#080706]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c9a84c]/15 via-transparent to-transparent opacity-60" />
        
        {/* Subtle Luxury Gold Dust Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#d4af37]/10 via-[#8d6a2f]/10 to-transparent rounded-full blur-[140px]" />
      </div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-28 sm:py-36 relative z-10">
        <div className="w-full max-w-2xl relative">
          
          <AnimatePresence mode="wait">
            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 1: INITIAL STAR RATING SCREEN — BESPOKE LUXURY DOSSIER */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "rate" && (
              <motion.div
                key="step-rate"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl bg-[#12100d]/90 border border-[#8d6a2f]/40 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-8 sm:p-14 text-center overflow-hidden"
              >
                {/* Gold Foil Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                {/* Artisanal Corner Ornaments (Custom SVGs) */}
                <svg className="absolute top-4 left-4 w-6 h-6 text-[#a5813b]/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 10V2H10M2 2L8 8" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <svg className="absolute top-4 right-4 w-6 h-6 text-[#a5813b]/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 10V2H14M22 2L16 8" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <svg className="absolute bottom-4 left-4 w-6 h-6 text-[#a5813b]/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 14V22H10M2 22L8 16" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <svg className="absolute bottom-4 right-4 w-6 h-6 text-[#a5813b]/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 14V22H14M22 22L16 16" strokeWidth="1.2" strokeLinecap="round" />
                </svg>

                {/* Brand Emblem */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-36 h-9 sm:w-44 sm:h-10 mb-2 opacity-95">
                    <Image
                      src="/imagica_logo_gold_2x.png"
                      alt="Imagica Holidays Gold Emblem"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-roman text-[#e8c676]">
                      Bespoke Expedition Review
                    </span>
                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
                  </div>
                </div>

                {/* Personalized Greeting */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-roman text-[#faf6ee] leading-tight mb-4 tracking-tight">
                  How Was Your Journey?
                </h1>

                <div className="max-w-md mx-auto mb-8">
                  {guestName ? (
                    <p className="text-base sm:text-lg text-[#d8cfbe] font-manrope leading-relaxed">
                      Esteemed traveler{" "}
                      <span className="font-script text-2xl sm:text-3xl text-[#e8c676] px-1 font-normal inline-block">
                        {guestName}
                      </span>
                      {destination && (
                        <span>
                          , we trust your odyssey through <strong className="text-white font-roman font-semibold">{destination}</strong> brought peace, inspiration, and timeless memories.
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-[#bfb5a3] font-manrope leading-relaxed">
                      Your reflections guide our craft. Please honor us with your rating of your recent journey with Imagica Holidays.
                    </p>
                  )}
                </div>

                {/* 5 Handcrafted Golden Metallic Stars */}
                <div className="my-8 py-4 flex flex-col items-center">
                  <div className="flex justify-center items-center gap-3 sm:gap-5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = activeStarCount >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleSelectRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="group relative p-2 sm:p-3 transition-transform duration-200 hover:scale-125 focus:outline-none focus:scale-125 cursor-pointer"
                          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        >
                          {/* Radial Glow Halo on Active Hover */}
                          <div
                            className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 pointer-events-none ${
                              isFilled
                                ? "bg-[#d4af37]/35 opacity-100"
                                : "bg-transparent opacity-0 group-hover:opacity-40 group-hover:bg-[#d4af37]/20"
                            }`}
                          />

                          {/* Metallic 3D SVG Star */}
                          <svg
                            className={`w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 relative z-10 ${
                              isFilled
                                ? "scale-110 drop-shadow-[0_4px_16px_rgba(212,175,55,0.7)]"
                                : "opacity-75 hover:opacity-100 hover:scale-110"
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <defs>
                              <linearGradient id={`goldGrad-${star}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fff3bf" />
                                <stop offset="35%" stopColor="#f4cb48" />
                                <stop offset="70%" stopColor="#d4af37" />
                                <stop offset="100%" stopColor="#8d6a2f" />
                              </linearGradient>
                              <linearGradient id={`emptyGold-${star}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2c2419" />
                                <stop offset="100%" stopColor="#1a150e" />
                              </linearGradient>
                            </defs>
                            <path
                              fill={isFilled ? `url(#goldGrad-${star})` : `url(#emptyGold-${star})`}
                              stroke={isFilled ? "#ffd700" : "#a5813b"}
                              strokeWidth={isFilled ? "0.6" : "1"}
                              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                          </svg>

                          {/* Sparkle ping on current hover */}
                          {hoverRating === star && (
                            <span className="absolute -top-0 right-1 w-2.5 h-2.5 bg-[#fff3bf] rounded-full animate-ping z-20" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Dynamic Tier Descriptor */}
                  <div className="h-16 mt-4 flex flex-col justify-center items-center">
                    {activeStarCount > 0 ? (
                      <motion.div
                        key={activeStarCount}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-1 text-center"
                      >
                        <p className="text-base sm:text-lg font-roman font-bold text-[#e8c676] tracking-wide">
                          {ratingTiers[activeStarCount]?.title}
                        </p>
                        <p className="text-xs text-[#a99d8b] font-manrope max-w-sm mx-auto">
                          {ratingTiers[activeStarCount]?.subtitle}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="text-xs uppercase tracking-[0.25em] text-[#8c7f6e] font-roman">
                        Select your rating above to begin
                      </p>
                    )}
                  </div>
                </div>

                {/* Tour Reference Footnote */}
                {tourCode && (
                  <div className="pt-6 border-t border-[#8d6a2f]/20 flex items-center justify-between text-[11px] text-[#8c7f6e] font-manrope">
                    <span>Authentic Guest Validation</span>
                    <span className="font-mono text-[#d4af37]/80 tracking-wider">EXPEDITION {tourCode}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 2A: 4-5 STARS -> PRESTIGIOUS GOOGLE MAPS COMMENDATION */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "google_prompt" && (
              <motion.div
                key="step-google"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl bg-[#12100d]/95 border-2 border-[#d4af37]/50 backdrop-blur-2xl shadow-[0_24px_90px_rgba(212,175,55,0.2)] p-8 sm:p-14 text-center overflow-hidden"
              >
                {/* Gold Crest Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#8d6a2f]" />

                {/* Back to change rating */}
                <button
                  type="button"
                  onClick={() => setStep("rate")}
                  className="inline-flex items-center gap-1.5 text-xs text-[#a99d8b] hover:text-[#faf6ee] font-semibold mb-6 transition-colors bg-[#1f1b15] hover:bg-[#2b251d] px-3.5 py-1.5 rounded-full border border-[#8d6a2f]/30"
                >
                  <span>←</span> Revisit Rating ({rating}★)
                </button>

                {/* Golden Seal of Commendation */}
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-b from-[#2b2419] to-[#17130d] border border-[#d4af37]/60 flex items-center justify-center shadow-[inset_0_2px_12px_rgba(212,175,55,0.25)] relative">
                  <span className="text-4xl drop-shadow-[0_4px_12px_rgba(212,175,55,0.8)]">🌟</span>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d4af37] rounded-full animate-ping" />
                </div>

                <div className="text-sm font-roman text-[#d4af37] tracking-[0.3em] uppercase mb-2">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-xl mx-0.5">★</span>
                  ))}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-roman text-[#faf6ee] mb-3">
                  An Honor to Have Hosted You
                </h2>

                <p className="text-sm sm:text-base text-[#cfc5b3] font-manrope max-w-lg mx-auto mb-8 leading-relaxed">
                  As an artisanal, family-led travel house, your praise is our highest accolade.
                  Could you spare <strong className="text-[#ffd700] font-semibold">30 seconds</strong> to share your review on our verified Google Maps page? It celebrates our local chauffeurs and guides while guiding fellow travelers.
                </p>

                {/* The Master Google Maps Action Button */}
                <div className="space-y-4 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={handleOpenGoogle}
                    className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ffd700] via-[#f0ca44] to-[#c9a84c] text-[#120f0a] p-4 sm:p-5 shadow-[0_12px_36px_rgba(212,175,55,0.35)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-bold"
                  >
                    {/* Shimmer Sheen Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/35 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <div className="relative flex items-center justify-center gap-3">
                      {/* Google G Logo SVG */}
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                        </svg>
                      </div>

                      <span className="text-base sm:text-lg tracking-tight font-extrabold text-[#17120a]">
                        Share Review on Google Maps
                      </span>

                      <span className="text-xl font-bold group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-[#17120a]">
                        ↗
                      </span>
                    </div>
                  </button>

                  {/* Google Verified Partner Subtext */}
                  <div className="flex items-center justify-center gap-2 text-xs text-[#a99d8b]">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Official Google Maps Business Profile &bull; Imagica Holidays</span>
                  </div>
                </div>

                {/* Curated Guest Reflection Plaques (Tap to Copy) */}
                <div className="mt-10 pt-8 border-t border-[#8d6a2f]/25 text-left">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs uppercase tracking-[0.2em] font-roman text-[#e8c676] flex items-center gap-1.5">
                      <span>✦</span>
                      <span>Tap to copy a reflection for Google Maps:</span>
                    </p>
                    <span className="text-[10px] text-[#8c7f6e] font-manrope">Optional inspiration</span>
                  </div>

                  <div className="space-y-3">
                    {reviewSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCopySuggestion(item.text, idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed ${
                          copiedIndex === idx
                            ? "bg-[#1f2d1e] border-emerald-500/70 text-emerald-200"
                            : "bg-[#181410]/70 hover:bg-[#201b15] border-[#8d6a2f]/30 text-[#ded5c6]"
                        }`}
                      >
                        <div className="flex-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/15 text-[#e8c676] mb-1">
                            {item.badge}
                          </span>
                          <p className="italic font-manrope text-[12px] text-[#e8dfcf]">&ldquo;{item.text}&rdquo;</p>
                        </div>
                        <span className="self-end sm:self-center shrink-0 px-3 py-1.5 rounded-xl bg-[#262018] border border-[#8d6a2f]/40 text-[11px] font-bold text-[#ffd700] hover:bg-[#332b20] transition-colors">
                          {copiedIndex === idx ? "✓ Copied to Clipboard" : "Copy ✦"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 2B: 1-3 STARS -> PRIVATE FOUNDERS RESOLUTION CONCIERGE */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "private_feedback" && (
              <motion.div
                key="step-private"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl bg-[#12100d]/95 border-2 border-[#b54538]/40 backdrop-blur-2xl shadow-[0_24px_90px_rgba(181,69,56,0.15)] p-8 sm:p-14 text-left overflow-hidden"
              >
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setStep("rate")}
                  className="inline-flex items-center gap-1.5 text-xs text-[#a99d8b] hover:text-[#faf6ee] font-semibold mb-6 transition-colors bg-[#1f1b15] hover:bg-[#2b251d] px-3.5 py-1.5 rounded-full border border-[#8d6a2f]/30"
                >
                  <span>←</span> Revisit Rating ({rating}★)
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3d1815] border border-[#b54538]/50 text-[#fca59d] text-xs font-semibold mb-4">
                  <span>✦ Direct Executive Concierge</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-roman text-[#faf6ee] mb-2">
                  We Are Deeply Sorry We Fell Short
                </h2>

                <p className="text-xs sm:text-sm text-[#c7bcab] font-manrope mb-6 leading-relaxed">
                  Every Imagica journey must be a triumph. Your candid insight goes directly to our Founders & Head of Operations so we can make amends.
                </p>

                <form onSubmit={handleSubmitPrivateFeedback} className="space-y-6">
                  {/* Category Tags */}
                  <div>
                    <label className="block text-xs font-bold text-[#e8c676] uppercase tracking-wider mb-2">
                      Which dimension could be refined? (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {feedbackCategories.map((cat) => {
                        const isSelected = selectedTags.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedTags((prev) =>
                                isSelected ? prev.filter((t) => t !== cat) : [...prev, cat]
                              );
                            }}
                            className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                              isSelected
                                ? "bg-[#e8c676] text-[#120f0a] border-[#e8c676] font-bold shadow-md"
                                : "bg-[#181410] text-[#cfc5b3] border-[#8d6a2f]/30 hover:border-[#e8c676]/60"
                            }`}
                          >
                            {isSelected ? `✓ ${cat}` : cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Details */}
                  <div className="field">
                    <label htmlFor="feedback-details" className="block text-xs font-bold text-[#e8c676] uppercase tracking-wider mb-2">
                      Please tell our Founders what took place: <span className="text-[#fca59d]">*</span>
                    </label>
                    <textarea
                      id="feedback-details"
                      name="feedback-details"
                      required
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="e.g. The hotel room did not meet 5-star expectations, or driver punctuality on day 3 was lacking..."
                      className="w-full text-sm p-4 rounded-xl border border-[#8d6a2f]/40 bg-[#181410] text-white focus:outline-none focus:ring-2 focus:ring-[#e8c676] focus:border-transparent transition-all placeholder:text-[#6e6354]"
                    />
                    <div className="error-msg text-xs text-[#fca59d] mt-1.5 hidden">
                      <span aria-hidden="true">❌</span> Please share a brief note so our leadership can assist you.
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingFeedback}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#ffd700] via-[#f0ca44] to-[#c9a84c] text-[#120f0a] py-4 font-bold text-sm shadow-xl hover:shadow-[0_12px_36px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submittingFeedback ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#120f0a]/30 border-t-[#120f0a] rounded-full animate-spin" />
                        Delivering Directly to Founders...
                      </>
                    ) : (
                      "Deliver Confidential Feedback to Founders ➔"
                    )}
                  </button>

                  <p className="text-[11px] text-[#8c7f6e] text-center font-manrope">
                    🔒 Kept strictly confidential between yourself and the executive team. Never shared publicly.
                  </p>
                </form>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 3: COMPLETED / THANK YOU SCREEN */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "completed" && (
              <motion.div
                key="step-completed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl bg-[#12100d]/95 border-2 border-[#d4af37]/50 backdrop-blur-2xl shadow-[0_24px_80px_rgba(212,175,55,0.25)] p-8 sm:p-14 text-center overflow-hidden"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1b2b19] border border-emerald-500/50 flex items-center justify-center text-3xl text-emerald-400">
                  ✓
                </div>

                <h2 className="text-3xl sm:text-4xl font-roman text-[#faf6ee] mb-3">
                  Thank You, Esteemed Guest
                </h2>

                <p className="text-sm sm:text-base text-[#cfc5b3] font-manrope max-w-md mx-auto mb-8 leading-relaxed">
                  {feedbackSubmitted
                    ? "Your confidential report has been dispatched to our Managing Directors. We take your words to heart and will reach out personally."
                    : "Your Google Maps tribute guides other discerning travelers to authentic luxury. We look forward to crafting your next bespoke escape."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#c9a84c] text-[#120f0a] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                  >
                    Return to Homepage
                  </Link>
                  <Link
                    href="/destinations"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#8d6a2f]/50 bg-[#1b1712] text-[#e8c676] text-xs font-bold uppercase tracking-wider hover:bg-[#251f18] transition-colors"
                  >
                    Explore Future Odysseys
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
