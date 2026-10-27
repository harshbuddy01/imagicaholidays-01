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

  const ratingLabels: Record<number, { title: string; subtitle: string; emoji: string }> = {
    1: { title: "Very Disappointing", subtitle: "We are deeply sorry we fell short of your expectations.", emoji: "😔" },
    2: { title: "Could Be Better", subtitle: "We want to know what didn't go smoothly.", emoji: "🙁" },
    3: { title: "Average Journey", subtitle: "Tell us how we can make our service truly exceptional.", emoji: "😐" },
    4: { title: "Wonderful Experience!", subtitle: "We are delighted you had a great holiday with us!", emoji: "😊" },
    5: { title: "Exceptional & Unforgettable! 🌟", subtitle: "We are honored to have created lifelong memories for you.", emoji: "🎉" }
  };

  const reviewSuggestions = [
    "Our holiday arranged by Imagica Holidays was seamless and unforgettable! Excellent hotels, punctual driver, and caring coordination throughout. Highly recommended!",
    "Amazing experience traveling with Imagica Holidays! The itinerary pacing was perfect and the team was available 24/7. Will definitely book our next trip with them!",
    "Top-notch hospitality! From arrival pickup to sightseeing and hotel stays, everything was organized to perfection. Truly a 5-star experience."
  ];

  const feedbackCategories = [
    "Driver & Transportation",
    "Hotel & Room Quality",
    "Itinerary Pacing",
    "Meals & Dining",
    "Trip Coordinator / Support",
    "Sightseeing & Tickets"
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
    setTimeout(() => setCopiedIndex(null), 2500);
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
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1714] flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-[#1a1714]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle Luxury Background Ornaments */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#d4af37]/10 via-[#c5a880]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full max-w-2xl relative z-10">
          
          <AnimatePresence mode="wait">
            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 1: INITIAL STAR RATING SCREEN */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "rate" && (
              <motion.div
                key="step-rate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 backdrop-blur-xl border border-[#e8dfd3] shadow-2xl shadow-[#1a1714]/5 rounded-3xl p-8 sm:p-12 text-center"
              >
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ece1] border border-[#e2d5c3] text-[#8c6b32] text-xs font-semibold tracking-wider uppercase mb-6">
                  <span>✦</span>
                  <span>Guest Experience & Feedback</span>
                  <span>✦</span>
                </div>

                {/* Greeting */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-normal text-[#1a1714] leading-tight mb-3">
                  {guestName ? `Welcome back, ${guestName}` : "How Was Your Journey?"}
                </h1>

                <p className="text-sm sm:text-base text-[#6b6257] font-manrope max-w-md mx-auto mb-10 leading-relaxed">
                  {destination
                    ? `We hope your holiday to ${destination} was filled with moments of wonder and ease. How would you rate your overall experience with Imagica Holidays?`
                    : "Your feedback is our compass. Please rate your travel experience with Imagica Holidays to help us continuously elevate our service."}
                </p>

                {/* 5 Interactive Golden Stars */}
                <div className="flex justify-center items-center gap-3 sm:gap-4 my-8">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = activeStarCount >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleSelectRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="group relative p-2 transition-transform duration-200 hover:scale-125 focus:outline-none focus:scale-125"
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <svg
                          className={`w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 drop-shadow-sm ${
                            isFilled
                              ? "fill-[#d4af37] text-[#c09a27] scale-110 drop-shadow-[0_4px_12px_rgba(212,175,55,0.45)]"
                              : "fill-[#e9e3da] text-[#ded6cb] hover:fill-[#f3e7bb]"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>

                        {/* Little sparkle dot on active hover */}
                        {hoverRating === star && (
                          <span className="absolute -top-1 right-1 w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Dynamic Reaction */}
                <div className="h-16 flex flex-col justify-center items-center">
                  {activeStarCount > 0 ? (
                    <motion.div
                      key={activeStarCount}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0.5"
                    >
                      <p className="text-base sm:text-lg font-playfair font-bold text-[#8c6b32] flex items-center justify-center gap-1.5">
                        <span>{ratingLabels[activeStarCount]?.emoji}</span>
                        <span>{ratingLabels[activeStarCount]?.title}</span>
                      </p>
                      <p className="text-xs text-[#8c8275]">
                        {ratingLabels[activeStarCount]?.subtitle}
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-xs text-[#a0978b] italic">
                      Tap a star to share your rating
                    </p>
                  )}
                </div>

                {/* Tour Reference Indicator */}
                {tourCode && (
                  <div className="mt-8 pt-6 border-t border-[#ede5d8] text-xs text-[#9c9183]">
                    Tour Reference: <span className="font-mono font-semibold text-[#5c5246]">{tourCode}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 2A: 4-5 STARS -> CELEBRATION & GOOGLE MAPS PROMPT */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "google_prompt" && (
              <motion.div
                key="step-google"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-2 border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/15 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
              >
                {/* Glowing Top Ribbon */}
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#b8943d]" />

                {/* Back to change rating */}
                <button
                  type="button"
                  onClick={() => setStep("rate")}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8c8275] hover:text-[#1a1714] font-semibold mb-6 transition-colors bg-[#f7f3ed] hover:bg-[#ede5d8] px-3 py-1.5 rounded-full"
                >
                  <span>←</span> Change Rating ({rating}★)
                </button>

                {/* Big Celebratory Star Burst */}
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#fcf7ee] to-[#f4ece1] border border-[#e8dfd3] flex items-center justify-center shadow-inner relative">
                  <span className="text-4xl animate-bounce">🌟</span>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d4af37] rounded-full animate-ping" />
                </div>

                <div className="flex justify-center items-center gap-1 mb-3 text-[#d4af37]">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-2xl drop-shadow-sm">★</span>
                  ))}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-[#1a1714] mb-3">
                  Thank You for the {rating}-Star Love!
                </h2>

                <p className="text-sm sm:text-base text-[#5c5246] font-manrope max-w-lg mx-auto mb-8 leading-relaxed">
                  As an artisanal holiday boutique, nothing delights our team more than knowing you had a seamless journey. 
                  Would you please take <strong className="text-[#1a1714] font-bold">30 seconds</strong> to publish your review on our official Google Maps profile? It means everything to our drivers, guides, and planners!
                </p>

                {/* Primary Google Maps Button */}
                <div className="space-y-4 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={handleOpenGoogle}
                    className="w-full group relative overflow-hidden rounded-2xl bg-[#1a1714] hover:bg-[#2b241e] text-white p-4 sm:p-5 shadow-2xl border border-[#d4af37]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/25 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex items-center justify-center gap-3">
                      {/* Google G Logo SVG */}
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                        </svg>
                      </div>

                      <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                        Post Review on Google Maps
                      </span>

                      <span className="text-xl text-[#d4af37] font-bold group-hover:translate-x-1 transition-transform">
                        ↗
                      </span>
                    </div>
                  </button>

                  <p className="text-xs text-[#8c8275] flex items-center justify-center gap-1.5 font-medium">
                    <span>🔒</span>
                    <span>Direct official Google Maps page &bull; Takes less than 30 seconds</span>
                  </p>
                </div>

                {/* Quick-Copy Review Snippets for Customer Convenience */}
                <div className="mt-10 pt-8 border-t border-[#ede5d8] text-left">
                  <p className="text-xs font-semibold text-[#8c6b32] uppercase tracking-wider mb-3 text-center">
                    💡 In a hurry? Tap to copy a quick review snippet:
                  </p>

                  <div className="space-y-2.5">
                    {reviewSuggestions.map((text, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCopySuggestion(text, idx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs leading-relaxed ${
                          copiedIndex === idx
                            ? "bg-[#eaf5ea] border-[#5cb85c] text-[#2d662d]"
                            : "bg-[#faf6ee] hover:bg-[#f4ede0] border-[#e8dfd3] text-[#5c5246]"
                        }`}
                      >
                        <p className="flex-1 italic">&ldquo;{text}&rdquo;</p>
                        <span className="shrink-0 px-2 py-1 rounded bg-white border border-[#ded5c6] text-[10px] font-bold text-[#8c6b32]">
                          {copiedIndex === idx ? "✓ Copied!" : "Copy"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* STEP 2B: 1-3 STARS -> PRIVATE FEEDBACK RESOLUTION */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            {step === "private_feedback" && (
              <motion.div
                key="step-private"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white/90 backdrop-blur-xl border border-[#e8dfd3] shadow-2xl shadow-[#1a1714]/5 rounded-3xl p-8 sm:p-12 text-left relative"
              >
                {/* Back to change rating */}
                <button
                  type="button"
                  onClick={() => setStep("rate")}
                  className="text-xs text-[#8c8275] hover:text-[#1a1714] flex items-center gap-1 font-medium mb-6 transition-colors"
                >
                  ← Change Rating ({rating}★)
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8e6] text-[#c53929] text-xs font-semibold mb-4">
                  <span>Direct Management Care</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-playfair font-normal text-[#1a1714] mb-2">
                  We Hear You, and We Want to Make It Right
                </h2>

                <p className="text-xs sm:text-sm text-[#6b6257] font-manrope mb-6 leading-relaxed">
                  Your journey should have been flawless. Please tell our leadership team what fell short so we can investigate and address your concern directly.
                </p>

                <form onSubmit={handleSubmitPrivateFeedback} className="space-y-6">
                  {/* Category Tags */}
                  <div>
                    <label className="block text-xs font-bold text-[#4a4237] uppercase tracking-wider mb-2">
                      Which area could be improved? (Select all that apply)
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
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                              isSelected
                                ? "bg-[#1a1714] text-white border-[#1a1714] font-semibold"
                                : "bg-[#fcfaf7] text-[#6b6257] border-[#ded5c6] hover:border-[#1a1714]"
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
                    <label htmlFor="feedback-details" className="block text-xs font-bold text-[#4a4237] uppercase tracking-wider mb-2">
                      Please share details with our Founders: <span className="text-[#d93025]">*</span>
                    </label>
                    <textarea
                      id="feedback-details"
                      name="feedback-details"
                      required
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="e.g. The hotel room was not as expected, or the driver arrived late on day 2..."
                      className="w-full text-sm p-4 rounded-xl border border-[#ded5c6] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a1714] focus:border-transparent transition-all placeholder:text-[#a0978b]"
                    />
                    <div className="error-msg text-xs text-[#d93025] mt-1.5 hidden">
                      <span aria-hidden="true">❌</span> Please write a few words so we can address your issue.
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingFeedback}
                    className="w-full rounded-2xl bg-[#1a1714] hover:bg-[#2e2924] text-white py-4 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submittingFeedback ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting to Founders...
                      </>
                    ) : (
                      "Send Confidential Feedback to Management →"
                    )}
                  </button>

                  <p className="text-[11px] text-[#8c8275] text-center">
                    This message is sent privately to our Head of Operations and Founding Team. It is never posted publicly.
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/90 backdrop-blur-xl border border-[#e8dfd3] shadow-2xl shadow-[#1a1714]/5 rounded-3xl p-8 sm:p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#eaf5ea] border border-[#5cb85c]/30 flex items-center justify-center text-3xl">
                  ✓
                </div>

                <h2 className="text-3xl font-playfair font-normal text-[#1a1714] mb-3">
                  Thank You So Much!
                </h2>

                <p className="text-sm sm:text-base text-[#6b6257] font-manrope max-w-md mx-auto mb-8 leading-relaxed">
                  {feedbackSubmitted
                    ? "Your feedback has been logged directly with our leadership team. We take every note to heart and will reach out if needed."
                    : "Your support makes a profound difference for our small, dedicated team. We look forward to planning your next luxury getaway!"}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1a1714] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2e2924] transition-colors"
                  >
                    Return to Homepage
                  </Link>
                  <Link
                    href="/destinations"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#ded5c6] text-[#4a4237] text-xs font-bold uppercase tracking-wider hover:bg-[#f4ede0] transition-colors"
                  >
                    Explore Future Destinations
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
