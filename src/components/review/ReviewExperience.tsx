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

/* ═════════════════════════════════════════════════════════════════
   BESPOKE INLINE SVG GRAPHICS & EMBLEMS
   ═════════════════════════════════════════════════════════════════ */

// Himalayan Mountain Line Art Etching
const MountainEtchingSVG = () => (
  <svg viewBox="0 0 200 70" fill="none" className="w-full h-full">
    <path
      d="M5 65 L45 22 L65 42 L85 12 L115 48 L145 20 L175 52 L195 65"
      stroke="url(#goldGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M85 12 L85 65 M145 20 L145 65 M45 22 L45 65"
      stroke="#b39252"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      opacity="0.4"
    />
    <circle cx="85" cy="12" r="2.5" fill="#f0ca44" />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8a6b2d" />
        <stop offset="50%" stopColor="#f7d070" />
        <stop offset="100%" stopColor="#b39252" />
      </linearGradient>
    </defs>
  </svg>
);

// Ornate Corner Brass Mounts for Photographic Keepsake
const CornerBrass = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const rotation =
    position === "tl" ? "rotate-0" : position === "tr" ? "rotate-90" : position === "br" ? "rotate-180" : "-rotate-90";
  return (
    <div className={`absolute ${position === "tl" ? "top-2 left-2" : position === "tr" ? "top-2 right-2" : position === "bl" ? "bottom-2 left-2" : "bottom-2 right-2"} w-5 h-5 pointer-events-none ${rotation}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M2 12 V2 H12" stroke="#d4af37" strokeWidth="2" strokeLinecap="square" />
        <circle cx="5" cy="5" r="1.5" fill="#f5d77f" />
        <path d="M2 22 L22 2" stroke="#8a6b2d" strokeWidth="0.75" opacity="0.6" />
      </svg>
    </div>
  );
};

// Official Google G Multi-Color Icon
const GoogleGIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
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

// Sculpted 3D Gold Star
const SculptedStar = ({ filled = false, size = 32 }: { filled?: boolean; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`transition-all duration-300 ${filled ? "drop-shadow-[0_0_12px_rgba(245,215,127,0.7)]" : ""}`}
  >
    <defs>
      <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff2be" />
        <stop offset="40%" stopColor="#ffd700" />
        <stop offset="70%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#997028" />
      </linearGradient>
      <linearGradient id="unselectedStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a3e2e" />
        <stop offset="100%" stopColor="#251f17" />
      </linearGradient>
    </defs>
    <path
      d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.27l-6.18 3.24L7 13.63l-5-4.87 6.91-1L12 1.5z"
      fill={filled ? "url(#goldStarGrad)" : "url(#unselectedStarGrad)"}
      stroke={filled ? "#f5d77f" : "#685435"}
      strokeWidth={filled ? "1" : "0.75"}
      strokeLinejoin="round"
    />
    {filled && (
      <path
        d="M12 3.5l2.1 4.25 4.7.68-3.4 3.3.8 4.67-4.2-2.2-4.2 2.2.8-4.67-3.4-3.3 4.7-.68L12 3.5z"
        fill="#ffffff"
        opacity="0.3"
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

  // Private Feedback State (for 1-3 stars)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Quick Reflection Copy State
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
        // Fallback smoothly
      }
    };
    fetchTourInfo();
  }, [tourCode]);

  const ratingTiers: Record<number, { title: string; subtitle: string; starsDisplay: string; badge: string }> = {
    1: {
      title: "Fell Short of Expectations",
      subtitle: "Your disappointment matters deeply to our leadership. We will personally make this right.",
      starsDisplay: "★ ☆ ☆ ☆ ☆",
      badge: "Private Redress"
    },
    2: {
      title: "Needed Greater Polish",
      subtitle: "Please illuminate where our hospitality wavered so our managing directors can intervene immediately.",
      starsDisplay: "★ ★ ☆ ☆ ☆",
      badge: "Founders Review"
    },
    3: {
      title: "Pleasant Moments",
      subtitle: "Tell our founders how we can elevate your journey from pleasant into pure Himalayan perfection.",
      starsDisplay: "★ ★ ★ ☆ ☆",
      badge: "Constructive"
    },
    4: {
      title: "Memorable & Splendid Expedition",
      subtitle: "We are thrilled that your holiday with Imagica was filled with delightful mountain memories.",
      starsDisplay: "★ ★ ★ ★ ☆",
      badge: "Excellence"
    },
    5: {
      title: "Transcendental & Unforgettable",
      subtitle: "An extraordinary journey. We are profoundly honored to have curated your private odyssey.",
      starsDisplay: "★ ★ ★ ★ ★",
      badge: "Peak Distinction"
    }
  };

  const reviewSuggestions = [
    {
      title: "🏔️ Mountain Splendor & Luxury Stays",
      badge: "Scenic Stays & Serenity",
      text: "Our private expedition arranged by Imagica Holidays was sheer perfection. Flawless hospitality, spectacular luxury stays in Sikkim, and exceptional personal attention from our chauffeur. Truly 10/10!"
    },
    {
      title: "🚗 Impeccable Transit & Pacing",
      badge: "Chauffeur & Routing",
      text: "From the warm airport reception to every scenic mountain transit, Imagica Holidays took care of every single nuance. Smooth mountain driving, prompt permits, and peace of mind throughout."
    },
    {
      title: "✨ 24/7 Concierge & Peace of Mind",
      badge: "Personal Concierge",
      text: "Exquisite itinerary planning and round-the-clock concierge warmth. Everything was effortless, peaceful, and truly unforgettable. Imagica Holidays is the gold standard for luxury travel."
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
    if (tourCode) {
      try {
        await fetch(`https://api.imagicaholidays.com/api/v1/public/review/${tourCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, action: "opened_google_review" })
        });
      } catch {
        // Silent
      }
    }
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("completed");
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
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
    } catch {
      // Graceful
    }
    setSubmittingFeedback(false);
    setFeedbackSubmitted(true);
    setStep("completed");
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="relative min-h-screen bg-[#0a0806] text-[#faf6ee] selection:bg-[#d4af37]/30 selection:text-[#ffd700] overflow-x-hidden font-manrope">
      {/* ── AMBIENT TEXTURAL BACKGROUNDS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Architectural Sketch Watermark */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-luminosity bg-repeat bg-[length:700px]"
          style={{ backgroundImage: `url('/images/destinations_sketch_bg.webp')` }}
        />
        {/* Golden Atmospheric Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#d4af37]/15 via-[#b39252]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#d4af37]/8 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#997028]/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* EDITORIAL HERO TITLE & CEREMONIAL HEADER */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#16130e]/80 backdrop-blur-md mb-5 shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#f0ca44] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#e8c676]">
              Exclusive Guest Memoir & Concierge Dossier
            </span>
            <span className="text-[#a5813b]">✦</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-normal text-[#fbf8f0] tracking-tight leading-[1.15] mb-4"
          >
            Your Himalayan Odyssey,{" "}
            <span className="font-script block sm:inline text-[#e5be59] text-4xl sm:text-6xl lg:text-7xl font-normal drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]">
              Immortalized
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-[#cfc5b3] font-light max-w-2xl mx-auto leading-relaxed"
          >
            As the mountain mist settles over the peaks, our Founders and Concierge Guild invite you to share your private
            impressions. Your perspective shapes the pinnacle of bespoke Himalayan travel.
          </motion.p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* TWO-COLUMN EDITORIAL SHOWCASE (DESKTOP SPLIT / MOBILE STACK) */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ───────────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: THE ARCHIVAL VOYAGE KEEPSAKE (MAGAZINE DOSSIER) */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative rounded-3xl bg-gradient-to-b from-[#18140f] via-[#120f0b] to-[#0c0a07] border border-[#d4af37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-7 backdrop-blur-xl"
            >
              {/* Corner Brass Brackets */}
              <CornerBrass position="tl" />
              <CornerBrass position="tr" />
              <CornerBrass position="bl" />
              <CornerBrass position="br" />

              {/* Sub-header of the Keepsake */}
              <div className="flex items-center justify-between border-b border-[#8a6b2d]/30 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 relative shrink-0">
                    <Image
                      src="/imagica_logo_gold_2x.png"
                      alt="Imagica Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-playfair text-xs tracking-[0.2em] uppercase text-[#e8c676] font-semibold">
                    Expedition Dossier
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a5813b] border border-[#8a6b2d]/40 px-2 py-0.5 rounded-full bg-[#1e1912]">
                  {tourCode || "ARCHIVE #2026"}
                </span>
              </div>

              {/* Breathtaking Framed Photograph of Sikkim Peaks */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-inner group mb-5">
                <Image
                  src="/images/pelling-snow.jpg"
                  alt="Kanchenjunga Snow Peaks, Sikkim"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a07] via-transparent to-black/20" />

                {/* 3D Wax Seal Badge in Top-Right Corner of Photograph */}
                <div className="absolute top-3 right-3 flex flex-col items-center">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#8a1c1c] via-[#5c1313] to-[#3a0a0a] border-2 border-[#d4af37] shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex items-center justify-center p-1 transform rotate-[-8deg] hover:rotate-0 transition-transform">
                    {/* Inner gold seal ridge */}
                    <div className="w-full h-full rounded-full border border-dashed border-[#e8c676]/60 flex items-center justify-center relative">
                      <Image
                        src="/imagica_logo_gold_2x.png"
                        alt="Seal Crest"
                        width={28}
                        height={28}
                        className="object-contain drop-shadow"
                      />
                    </div>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-[#e8c676] font-bold mt-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    Verified Seal
                  </span>
                </div>

                {/* Photo Location Caption */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#e8c676] font-semibold block">
                      Mount Kanchenjunga Sanctuary
                    </span>
                    <span className="text-xs text-white/90 font-roman">
                      {destination || "Pelling & Gangtok Private Corridor, Sikkim"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/60">2026</span>
                </div>
              </div>

              {/* Cultural Mountain Line-Art Illustration */}
              <div className="h-10 px-4 mb-4 opacity-75">
                <MountainEtchingSVG />
              </div>

              {/* Itinerary Memoir Boarding Pass Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#110e0a]/90 border border-[#8a6b2d]/25 text-left mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a5813b] block">Patron</span>
                  <span className="text-xs font-semibold text-[#f5f1e8] truncate block">
                    {guestName || "Distinguished Traveler"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a5813b] block">Expedition Code</span>
                  <span className="text-xs font-mono font-medium text-[#e8c676]">
                    {tourCode || "TUR-2026-LIVE"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a5813b] block">Concierge Office</span>
                  <span className="text-xs font-medium text-[#dcd1be]">Imagica Private Client</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a5813b] block">Expedition Status</span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Completed Journey
                  </span>
                </div>
              </div>

              {/* Concierge Hand-Written Inscription */}
              <div className="pt-2 border-t border-[#8a6b2d]/25 text-center">
                <p className="font-script text-xl sm:text-2xl text-[#e8c676] drop-shadow">
                  &ldquo;May the quiet serenity of the mountains linger with you always.&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a65] block mt-1">
                  Harsh Anand & The Imagica Concierge Guild
                </span>
              </div>
            </motion.div>

            {/* Accolade Trust Plaque */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-2xl bg-[#15120e]/60 border border-[#8a6b2d]/20 p-4 flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f1a13] border border-[#d4af37]/40 flex items-center justify-center">
                  <span className="text-[#ffd700] text-lg">★</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#faf6ee]">Google Maps Rated 4.9</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                      180+ Reviews
                    </span>
                  </div>
                  <span className="text-[11px] text-[#9c8e7c]">Independently verified traveler tributes</span>
                </div>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#e8c676] hover:text-[#ffd700] underline uppercase tracking-wider font-semibold transition-colors"
              >
                Inspect ↗
              </a>
            </motion.div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: THE CELESTIAL RATING & INTERACTIVE SALON */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* ═════════════════════════════════════════════════════════ */}
              {/* STEP 1: INITIAL CELESTIAL RATING STATION */}
              {/* ═════════════════════════════════════════════════════════ */}
              {step === "rate" && (
                <motion.div
                  key="step-rate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-gradient-to-b from-[#191510]/95 via-[#13100c]/95 to-[#0e0c09]/95 border-2 border-[#d4af37]/40 backdrop-blur-2xl shadow-[0_24px_80px_rgba(212,175,55,0.18)] p-6 sm:p-10 relative overflow-hidden"
                >
                  {/* Subtle Corner Accents */}
                  <CornerBrass position="tl" />
                  <CornerBrass position="tr" />

                  {/* Section Title */}
                  <div className="text-center mb-8">
                    <span className="font-script text-2xl sm:text-3xl text-[#e8c676] block mb-1">
                      Your Verdict on Our Craft
                    </span>
                    <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-[#faf6ee] font-normal tracking-tight">
                      How Was Your Journey?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#baa990] font-light mt-2 max-w-md mx-auto">
                      Select a golden medallion to capture your overall impression of your vehicle, chauffeur, boutique
                      hotels, and 24/7 concierge.
                    </p>
                  </div>

                  {/* The 5 Sculptural Golden Medallions */}
                  <div className="relative flex items-center justify-center gap-2 sm:gap-4 my-8 py-4 px-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isHoveredOrActive = star <= activeRating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleSelectRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="group relative flex flex-col items-center focus:outline-none transition-transform duration-300 transform active:scale-95 hover:scale-110 cursor-pointer"
                          aria-label={`Rate ${star} Stars`}
                        >
                          {/* Radial Glow on Hover */}
                          <div
                            className={`absolute inset-0 rounded-2xl bg-[#ffd700]/25 blur-xl transition-opacity duration-300 ${
                              isHoveredOrActive ? "opacity-100" : "opacity-0"
                            }`}
                          />

                          {/* Medallion Disc */}
                          <div
                            className={`relative w-14 h-16 sm:w-18 sm:h-22 rounded-2xl flex flex-col items-center justify-center p-1.5 transition-all duration-300 border ${
                              isHoveredOrActive
                                ? "bg-gradient-to-b from-[#2a2215] to-[#15110a] border-[#ffd700] shadow-[0_8px_25px_rgba(212,175,55,0.4)]"
                                : "bg-[#14110d] border-[#4a3e2e]/50 hover:border-[#8a6b2d]"
                            }`}
                          >
                            <SculptedStar filled={isHoveredOrActive} size={30} />
                            <span
                              className={`text-[11px] sm:text-xs font-bold mt-1 transition-colors ${
                                isHoveredOrActive ? "text-[#ffd700]" : "text-[#7a6a52]"
                              }`}
                            >
                              {star} ★
                            </span>
                          </div>

                          {/* Micro-label beneath */}
                          <span
                            className={`text-[9px] uppercase tracking-wider font-semibold mt-2 transition-colors ${
                              isHoveredOrActive ? "text-[#e8c676]" : "text-[#5a4e3c]"
                            }`}
                          >
                            {star === 5 ? "Peerless" : star === 4 ? "Delight" : star === 3 ? "Good" : star === 2 ? "Modest" : "Subpar"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Rating Descriptor Card */}
                  <div className="min-h-[90px] flex items-center justify-center text-center p-4 rounded-2xl bg-[#110e0a]/80 border border-[#8a6b2d]/30 mb-8">
                    {activeRating > 0 ? (
                      <motion.div
                        key={activeRating}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#2a2215] border border-[#d4af37]/40 text-[#ffd700] font-bold">
                            {ratingTiers[activeRating].badge}
                          </span>
                          <span className="text-xs text-[#e8c676] font-mono tracking-widest">
                            {ratingTiers[activeRating].starsDisplay}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-playfair font-semibold text-[#faf6ee]">
                          {ratingTiers[activeRating].title}
                        </h3>
                        <p className="text-xs text-[#cfc5b3] max-w-md mx-auto leading-relaxed">
                          {ratingTiers[activeRating].subtitle}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="text-xs sm:text-sm text-[#8c7e6c] font-light flex items-center gap-2">
                        <span className="text-[#d4af37] text-base">✦</span>
                        Tap any medallion above to register your sentiment.
                      </p>
                    )}
                  </div>

                  {/* Bottom Assurance Pillars */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#8a6b2d]/25 text-center">
                    <div className="p-2">
                      <span className="text-[10px] text-[#e8c676] font-bold block uppercase tracking-wider">
                        100% Verified
                      </span>
                      <span className="text-[10px] text-[#8c7e6c]">Real patron review</span>
                    </div>
                    <div className="p-2 border-x border-[#8a6b2d]/25">
                      <span className="text-[10px] text-[#e8c676] font-bold block uppercase tracking-wider">
                        Founders Eye
                      </span>
                      <span className="text-[10px] text-[#8c7e6c]">Read by directors</span>
                    </div>
                    <div className="p-2">
                      <span className="text-[10px] text-[#e8c676] font-bold block uppercase tracking-wider">
                        Zero Spam
                      </span>
                      <span className="text-[10px] text-[#8c7e6c]">Strictly confidential</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════════════════ */}
              {/* STEP 2A: 4 & 5 STARS -> THE GOOGLE MAPS CELEBRATION */}
              {/* ═════════════════════════════════════════════════════════ */}
              {step === "google_prompt" && (
                <motion.div
                  key="step-google"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-gradient-to-b from-[#1a150f]/95 via-[#130f0b]/95 to-[#0e0c08]/95 border-2 border-[#d4af37]/60 backdrop-blur-2xl shadow-[0_24px_90px_rgba(212,175,55,0.25)] p-6 sm:p-10 relative overflow-hidden"
                >
                  <CornerBrass position="tl" />
                  <CornerBrass position="tr" />

                  {/* Back to rating link */}
                  <button
                    type="button"
                    onClick={() => setStep("rate")}
                    className="inline-flex items-center gap-1.5 text-xs text-[#a5813b] hover:text-[#ffd700] mb-6 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    ← Modify My Rating ({rating}★)
                  </button>

                  {/* Celebration Header */}
                  <div className="text-center mb-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#272013] border border-[#d4af37]/50 text-[#ffd700] text-xs font-bold mb-3 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      <span>✨</span>
                      <span>{rating === 5 ? "5-Star Transcendental" : "4-Star Excellence"}</span>
                      <span>✨</span>
                    </div>
                    <h2 className="font-playfair text-2xl sm:text-4xl text-[#faf6ee] font-normal tracking-tight">
                      Thank You for Elevating Us
                    </h2>
                    <p className="text-xs sm:text-sm text-[#cfc5b3] font-light mt-2 max-w-lg mx-auto leading-relaxed">
                      Your gracious tribute on Google Maps helps other discerning travelers discover genuine, unhurried
                      Himalayan luxury.
                    </p>
                  </div>

                  {/* ─────────────────────────────────────────────────── */}
                  {/* THE OFFICIAL GOOGLE MAPS VERIFIED ACTION PLAQUE */}
                  {/* ─────────────────────────────────────────────────── */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-[#231b12] to-[#120e09] border border-[#ffd700]/50 p-5 sm:p-6 mb-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#8a6b2d]/30 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg p-2 shrink-0">
                          <GoogleGIcon />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white tracking-wide">
                              Imagica Holidays
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                              ✓ Verified
                            </span>
                          </div>
                          <span className="text-xs text-[#cfc5b3] block">
                            Himalayan Luxury Concierge • Google Maps
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-right">
                        <span className="text-2xl font-bold font-playfair text-[#ffd700]">4.9</span>
                        <div className="text-left">
                          <div className="flex text-[#ffd700] text-xs">★★★★★</div>
                          <span className="text-[10px] text-[#a5813b] font-mono">180+ Reviews</span>
                        </div>
                      </div>
                    </div>

                    {/* MAIN CTA BUTTON WITH METALLIC SHIMMER */}
                    <button
                      type="button"
                      onClick={handleOpenGoogle}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ffd700] via-[#f7d070] to-[#c9a84c] text-[#14100a] py-4 px-6 font-bold text-sm sm:text-base uppercase tracking-wider shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_12px_45px_rgba(212,175,55,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {/* Sweeping Shimmer Beam */}
                      <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out" />
                      
                      <GoogleGIcon />
                      <span>Post Verified Review on Google Maps</span>
                      <span className="text-lg transition-transform group-hover:translate-x-1">➔</span>
                    </button>

                    <p className="text-[11px] text-[#8c7e6c] text-center mt-3">
                      Opens direct Google Write Review dialog for Imagica Holidays in a new tab.
                    </p>
                  </div>

                  {/* ─────────────────────────────────────────────────── */}
                  {/* TAP-TO-COPY LUXURY TRAVELER REFLECTION VIGNETTES */}
                  {/* ─────────────────────────────────────────────────── */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#e8c676] font-semibold flex items-center gap-1.5">
                        <span>✦</span> Curated Guest Reflections (Tap to Copy)
                      </span>
                      <span className="text-[10px] text-[#8c7e6c]">Optional one-tap inspiration</span>
                    </div>

                    <div className="space-y-2.5">
                      {reviewSuggestions.map((sug, idx) => (
                        <div
                          key={idx}
                          className="group relative rounded-xl bg-[#130f0b]/90 border border-[#8a6b2d]/30 hover:border-[#ffd700]/60 p-3.5 transition-all"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-[#f5f1e8] group-hover:text-[#ffd700] transition-colors">
                              {sug.title}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopySuggestion(sug.text, idx)}
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                                copiedIndex === idx
                                  ? "bg-emerald-500 text-black font-extrabold"
                                  : "bg-[#251e15] text-[#e8c676] hover:bg-[#3d3121] border border-[#8a6b2d]/40"
                              }`}
                            >
                              {copiedIndex === idx ? "✓ Copied to Clipboard" : "📋 Copy Reflection"}
                            </button>
                          </div>
                          <p className="text-xs text-[#baa990] font-light italic leading-relaxed">
                            &ldquo;{sug.text}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════════════════ */}
              {/* STEP 2B: 1-3 STARS -> FOUNDERS' PRIVATE REDRESS TELEGRAM */}
              {/* ═════════════════════════════════════════════════════════ */}
              {step === "private_feedback" && (
                <motion.div
                  key="step-private"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-gradient-to-b from-[#1a120e]/95 via-[#130d0a]/95 to-[#0d0907]/95 border-2 border-[#c2614b]/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(194,97,75,0.25)] p-6 sm:p-10 relative overflow-hidden"
                >
                  <CornerBrass position="tl" />
                  <CornerBrass position="tr" />

                  {/* Back button */}
                  <button
                    type="button"
                    onClick={() => setStep("rate")}
                    className="inline-flex items-center gap-1.5 text-xs text-[#a5813b] hover:text-[#ffd700] mb-5 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    ← Revisit Rating ({rating}★)
                  </button>

                  {/* Executive Urgent Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#351610] border border-[#c2614b]/60 text-[#fca59d] text-xs font-bold mb-3 shadow-[0_0_15px_rgba(194,97,75,0.3)]">
                      <span>⚠️</span>
                      <span>Founders&apos; Priority Redress Channel</span>
                    </div>
                    <h2 className="font-playfair text-2xl sm:text-3xl text-[#faf6ee] font-normal tracking-tight">
                      We Regret That We Fell Short
                    </h2>
                    <p className="text-xs sm:text-sm text-[#cfc5b3] font-light mt-1.5 leading-relaxed">
                      Your experience bypasses all support tiers and lands directly on the personal desk of our Managing
                      Directors. We are deeply committed to understanding what occurred.
                    </p>
                  </div>

                  {/* Category Selection Pills */}
                  <form onSubmit={handleSubmitFeedback} className="space-y-5">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#e8c676] font-semibold block mb-2.5">
                        Which facets of your journey required higher standards?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {feedbackCategories.map((cat) => {
                          const isSelected = selectedTags.includes(cat);
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedTags(selectedTags.filter((t) => t !== cat));
                                } else {
                                  setSelectedTags([...selectedTags, cat]);
                                }
                              }}
                              className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-[#351610] border-[#c2614b] text-[#ffd6d0]"
                                  : "bg-[#140e0a] border-[#5a3e2c]/50 text-[#baa990] hover:border-[#8a523b]"
                              }`}
                            >
                              <span>{cat}</span>
                              <span className="text-xs">{isSelected ? "✓" : "+"}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Notes Field */}
                    <div>
                      <label htmlFor="private-feedback-text" className="text-xs uppercase tracking-wider text-[#e8c676] font-semibold block mb-2">
                        Personal Dispatch to the Founders
                      </label>
                      <textarea
                        id="private-feedback-text"
                        name="private-feedback-text"
                        rows={4}
                        required
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Please share specific moments (e.g. hotel room standards, vehicle hygiene, or driver punctuality)..."
                        className="w-full text-sm p-4 rounded-xl border border-[#8a523b]/50 bg-[#120d09] text-white focus:outline-none focus:ring-2 focus:ring-[#c2614b] transition-all placeholder:text-[#6e5848]"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={submittingFeedback}
                        className="flex-1 rounded-xl bg-gradient-to-r from-[#d96b52] to-[#b34832] text-white py-3.5 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_8px_25px_rgba(217,107,82,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submittingFeedback ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Transmitting to Directors...
                          </>
                        ) : (
                          "Transmitting to Directors Desk ➔"
                        )}
                      </button>

                      {/* Immediate WhatsApp Escalation Button */}
                      <a
                        href="https://wa.me/919876543210?text=Urgent%20Founders%20Redress%20Request%20regarding%20my%20tour"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-[#25D366]/40 bg-[#122818] text-[#25D366] hover:bg-[#183921] px-4 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <span>WhatsApp Priority</span>
                      </a>
                    </div>

                    <p className="text-[11px] text-[#8c7465] text-center">
                      🔒 Strictly confidential between you and the Managing Directors. Never made public.
                    </p>
                  </form>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════════════════ */}
              {/* STEP 3: COMPLETED CONFIRMATION SCREEN */}
              {/* ═════════════════════════════════════════════════════════ */}
              {step === "completed" && (
                <motion.div
                  key="step-completed"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-gradient-to-b from-[#18140f] to-[#0e0c08] border-2 border-[#d4af37]/60 backdrop-blur-2xl shadow-[0_24px_90px_rgba(212,175,55,0.2)] p-8 sm:p-14 text-center overflow-hidden relative"
                >
                  <CornerBrass position="tl" />
                  <CornerBrass position="tr" />

                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1f3a22] to-[#0f1d11] border border-emerald-500/50 flex items-center justify-center text-3xl text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                    ✓
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-playfair text-[#faf6ee] mb-3">
                    Thank You, Esteemed Patron
                  </h2>

                  <p className="text-sm sm:text-base text-[#cfc5b3] font-light max-w-md mx-auto mb-8 leading-relaxed">
                    {feedbackSubmitted
                      ? "Your confidential report has been transmitted to our Managing Directors. We take every syllable to heart and will reach out personally."
                      : "Your Google Maps tribute guides other discerning travelers toward authentic, uncompromised luxury. We look forward to curating your next mountain escape."}
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
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#8a6b2d]/50 bg-[#1b1712] text-[#e8c676] text-xs font-bold uppercase tracking-wider hover:bg-[#251f18] transition-colors"
                    >
                      Explore Future Odysseys
                    </Link>
                  </div>
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
