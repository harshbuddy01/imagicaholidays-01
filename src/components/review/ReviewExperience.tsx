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

// Official Google G SVG
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

// Sculpted 3D Metallic Gold Star SVG
const MetallicStar = ({ filled, size = 44 }: { filled: boolean; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`transition-all duration-300 ${
      filled
        ? "scale-105 drop-shadow-[0_0_16px_rgba(255,215,0,0.85)] filter brightness-110"
        : "opacity-30 hover:opacity-60 filter brightness-90"
    }`}
  >
    <defs>
      <linearGradient id="goldMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff9e0" />
        <stop offset="30%" stopColor="#ffd700" />
        <stop offset="70%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8a6b2d" />
      </linearGradient>
      <linearGradient id="darkStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a3e2c" />
        <stop offset="100%" stopColor="#1a150e" />
      </linearGradient>
    </defs>
    <path
      d="M12 1.8l3.12 6.32 6.98 1.01-5.05 4.92 1.19 6.95L12 17.71l-6.24 3.29 1.19-6.95-5.05-4.92 6.98-1.01L12 1.8z"
      fill={filled ? "url(#goldMetallicGrad)" : "url(#darkStarGrad)"}
      stroke={filled ? "#ffe885" : "#5a4b35"}
      strokeWidth={filled ? "1" : "0.75"}
      strokeLinejoin="round"
    />
    {filled && (
      <path
        d="M12 3.8l2.1 4.25 4.7.68-3.4 3.3.8 4.67-4.2-2.2-4.2 2.2.8-4.67-3.4-3.3 4.7-.68L12 3.8z"
        fill="#ffffff"
        opacity="0.25"
      />
    )}
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

  // 1-3 Stars feedback state
  const [selectedDisappointments, setSelectedDisappointments] = useState<string[]>([]);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

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
      } catch {}
    };
    fetchTour();
  }, [tourCode]);

  const ratingTiers: Record<number, { title: string; subtitle: string; starsDisplay: string }> = {
    1: { title: "Fell Short of Expectations", subtitle: "We are deeply committed to making this right with you.", starsDisplay: "★ ☆ ☆ ☆ ☆" },
    2: { title: "Needed Greater Polish", subtitle: "Please share what fell short so our leadership can intervene.", starsDisplay: "★ ★ ☆ ☆ ☆" },
    3: { title: "Pleasant Moments", subtitle: "Tell our founders how we can elevate your journey next time.", starsDisplay: "★ ★ ★ ☆ ☆" },
    4: { title: "Memorable Expedition", subtitle: "We are thrilled that your holiday with Imagica was delightful.", starsDisplay: "★ ★ ★ ★ ☆" },
    5: { title: "Transcendental & Unforgettable", subtitle: "An extraordinary journey. We are profoundly honored to have hosted you.", starsDisplay: "★ ★ ★ ★ ★" }
  };

  const disappointmentOptions = [
    "Chauffeur & Driving",
    "Hotel & Room Standards",
    "Itinerary Pacing & Timing",
    "Meals & Dining Quality",
    "Sightseeing & Permits",
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

  const toggleDisappointment = (opt: string) => {
    if (selectedDisappointments.includes(opt)) {
      setSelectedDisappointments(selectedDisappointments.filter((i) => i !== opt));
    } else {
      setSelectedDisappointments([...selectedDisappointments, opt]);
    }
  };

  const handleOpenGoogle = async () => {
    if (tourCode) {
      try {
        await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating: rating || 5,
            action: "opened_google_review",
            completedAt: new Date().toISOString()
          })
        });
      } catch {}
    }
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("completed");
  };

  const handleSubmitDisappointment = async (e: React.FormEvent) => {
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
            disappointments: selectedDisappointments,
            notes: feedbackNotes,
            submittedAt: new Date().toISOString()
          })
        });
      }
    } catch {}
    setSubmittingFeedback(false);
    setStep("completed");
  };

  const activeStarCount = hoverRating || rating;

  return (
    <div className="min-h-screen bg-[#080706] text-[#faf6ee] flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-white relative overflow-x-hidden font-manrope">
      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* CINEMATIC BACKGROUND VIDEO / MOUNTAIN ATMOSPHERE */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#d4af37]/10 via-[#8d6a2f]/10 to-transparent rounded-full blur-[140px]" />
      </div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32 relative z-10">
        <div className="w-full max-w-xl relative">
          <AnimatePresence mode="wait">
            {/* ═════════════════════════════════════════════════════════════ */}
            {/* STEP 1: INITIAL STAR RATING (CENTERED LUXURY CARD) */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {step === "rate" && (
              <motion.div
                key="step-rate"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl bg-[#12100d]/92 border border-[#8d6a2f]/40 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-8 sm:p-12 text-center overflow-hidden"
              >
                {/* Gold Foil Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                {/* Artisanal Corner Ornaments */}
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

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair text-[#faf6ee] leading-tight mb-3 tracking-tight font-normal">
                  How Was Your Journey?
                </h1>

                <p className="text-xs sm:text-sm text-[#cfc5b3] font-light max-w-md mx-auto mb-8 leading-relaxed">
                  {guestName ? `Esteemed ${guestName}, ` : ""}Your reflections guide our craft. Please honor us with
                  your rating of your recent journey with Imagica Holidays.
                </p>

                {/* 5 Sculptural Golden Stars */}
                <div className="flex justify-center items-center gap-2.5 sm:gap-4 my-8">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = activeStarCount >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleSelectRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="group relative p-1.5 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer"
                        aria-label={`Rate ${star} Stars`}
                      >
                        <MetallicStar filled={isFilled} size={42} />

                        {/* Sparkle ping on hover */}
                        {hoverRating === star && (
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ffd700] rounded-full animate-ping pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Rating Caption */}
                <div className="h-12 flex flex-col justify-center items-center">
                  <AnimatePresence mode="wait">
                    {activeStarCount > 0 ? (
                      <motion.div
                        key={activeStarCount}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-center"
                      >
                        <p className="text-sm sm:text-base font-playfair font-semibold text-[#ffd700] tracking-wide">
                          {ratingTiers[activeStarCount].title}
                        </p>
                        <p className="text-xs text-[#a5813b] font-light">
                          {ratingTiers[activeStarCount].subtitle}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[11px] uppercase tracking-[0.25em] text-[#8c7e6c]"
                      >
                        Select your rating above to begin
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* STEP 2A: 4 & 5 STARS -> BESPOKE GOOGLE MEDALLION PORTAL */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {step === "google_prompt" && (
              <motion.div
                key="step-google"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl bg-[#12100d]/95 border border-[#d4af37]/40 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-8 sm:p-12 text-center overflow-hidden"
              >
                {/* Gold Foil Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setStep("rate")}
                  className="inline-flex items-center gap-1.5 text-xs text-[#a5813b] hover:text-[#ffd700] mb-5 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  ← Change Rating ({rating}★)
                </button>

                {/* 5 Glowing Golden Medallion Stars Row */}
                <div className="flex justify-center items-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <MetallicStar key={s} filled={s <= rating} size={30} />
                  ))}
                </div>

                <span className="font-script text-2xl sm:text-3xl text-[#e5be59] block mb-1">
                  We Are Deeply Honored
                </span>

                <h2 className="text-2xl sm:text-3xl font-playfair text-[#faf6ee] font-normal tracking-tight mb-2">
                  Share Your Story on Google
                </h2>

                <p className="text-xs sm:text-sm text-[#baa990] font-light max-w-sm mx-auto mb-7 leading-relaxed">
                  Your genuine reflections guide discerning travelers seeking bespoke Himalayan luxury.
                </p>

                {/* ──────────────────────────────────────────────────────── */}
                {/* THE BESPOKE GOOGLE MEDALLION PORTAL PLAQUE */}
                {/* ──────────────────────────────────────────────────────── */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#1c1610] via-[#14100c] to-[#0d0a07] border border-[#d4af37]/50 p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden group">
                  {/* Subtle Background Radial Gold Glow */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 bg-[#ffd700]/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Circular Brushed Brass Google Medallion */}
                  <div className="relative mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-b from-[#2a2115] to-[#120e0a] border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center p-3">
                    <GoogleGIcon className="w-8 h-8 drop-shadow" />
                    {/* Outer animated halo ring */}
                    <span className="absolute inset-0 rounded-full border border-[#ffd700]/40 animate-ping pointer-events-none opacity-40" />
                  </div>

                  {/* Listing Credentials */}
                  <div className="mb-6">
                    <h3 className="font-playfair text-base sm:text-lg text-white font-medium tracking-wide">
                      Imagica Holidays
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#ffd700] tracking-wider">
                        ★★★★★ 4.9
                      </span>
                      <span className="text-[#8a6b2d]">·</span>
                      <span className="text-[11px] font-mono text-[#baa990] uppercase tracking-wider">
                        180+ Google Reviews
                      </span>
                    </div>
                  </div>

                  {/* Shimmering Metallic Gold Primary Button */}
                  <button
                    type="button"
                    onClick={handleOpenGoogle}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#e5be59] via-[#ffd700] to-[#c59c3f] text-[#14100a] py-4 px-6 font-bold text-xs sm:text-sm uppercase tracking-[0.14em] shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    {/* Diagonal Light Sweep Beam */}
                    <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out pointer-events-none" />

                    <span>Write Review on Google Maps</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
                  </button>

                  <p className="text-[10px] text-[#8c7e6c] text-center mt-3 font-light">
                    Direct link to Imagica Holidays on Google Maps. No registration required.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* STEP 2B: 1-3 STARS -> "WHAT DISAPPOINTED YOU?" MINIMAL */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {step === "private_feedback" && (
              <motion.div
                key="step-private"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl bg-[#12100d]/95 border border-[#c2614b]/50 backdrop-blur-2xl shadow-[0_24px_80px_rgba(194,97,75,0.25)] p-8 sm:p-12 text-center overflow-hidden"
              >
                {/* Red Foil Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c2614b] to-transparent" />

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setStep("rate")}
                  className="inline-flex items-center gap-1.5 text-xs text-[#a5813b] hover:text-[#ffd700] mb-4 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  ← Change Rating ({rating}★)
                </button>

                <h2 className="text-2xl sm:text-3xl font-playfair text-[#faf6ee] font-normal tracking-tight mb-2">
                  What Disappointed You?
                </h2>

                <p className="text-xs sm:text-sm text-[#cfc5b3] font-light max-w-md mx-auto mb-6 leading-relaxed">
                  Your feedback bypasses all support teams and lands directly with our Managing Directors so we can
                  personally address it.
                </p>

                <form onSubmit={handleSubmitDisappointment} className="space-y-4 text-left">
                  {/* Graphical Disappointment Chips */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#e8c676] font-semibold block mb-2 text-center">
                      Select what fell short of our standard:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {disappointmentOptions.map((opt) => {
                        const isSelected = selectedDisappointments.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleDisappointment(opt)}
                            className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#351610] border-[#c2614b] text-[#ffd6d0] shadow-[0_0_12px_rgba(194,97,75,0.3)]"
                                : "bg-[#18130e] border-[#5a3e2c]/50 text-[#baa990] hover:border-[#8a523b]"
                            }`}
                          >
                            <span>{isSelected ? "✓ " : ""}{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <textarea
                      rows={3}
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      placeholder="Briefly tell us what happened (optional)..."
                      className="w-full text-xs p-3.5 rounded-xl border border-[#8a523b]/50 bg-[#140e0a] text-white focus:outline-none focus:ring-1 focus:ring-[#c2614b] placeholder:text-[#6e5848] transition-all"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <button
                      type="submit"
                      disabled={submittingFeedback}
                      className="flex-1 rounded-xl bg-gradient-to-r from-[#d96b52] to-[#b34832] text-white py-3.5 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_8px_25px_rgba(217,107,82,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {submittingFeedback ? "Sending to Founders..." : "Send Directly to Founders ➔"}
                    </button>
                    <a
                      href="https://wa.me/919876543210?text=Urgent%20Founders%20Redress%20Request%20regarding%20my%20tour"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-[#25D366]/40 bg-[#122818] text-[#25D366] hover:bg-[#183921] px-4 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>WhatsApp Founders</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-[#8c7465] text-center pt-1">
                    🔒 Kept strictly confidential with executive leadership.
                  </p>
                </form>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* STEP 3: THANK YOU */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {step === "completed" && (
              <motion.div
                key="step-completed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-3xl bg-[#12100d]/95 border border-[#8d6a2f]/50 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-10 sm:p-14 text-center overflow-hidden"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1f3a22] to-[#0f1d11] border border-emerald-500/50 flex items-center justify-center text-2xl text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                  ✓
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl text-white font-normal mb-2">
                  Thank You for Your Reflections
                </h3>

                <p className="text-xs sm:text-sm text-[#cfc5b3] max-w-sm mx-auto mb-7 font-light leading-relaxed">
                  Your impressions have been recorded with our Concierge Office. We look forward to curating your next
                  journey.
                </p>

                <Link
                  href="/"
                  className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#c9a84c] text-[#120f0a] text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition-opacity"
                >
                  Return to Imagica Holidays
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
