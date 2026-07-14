"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface GoogleReview {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  time: number; // ms timestamp
  relativeTime: string;
  googleUrl: string;
}

interface PlaceInfo {
  name: string;
  rating: number;
  totalReviews: number;
}

/* ═══════════════════════════════════════════════════════════
   SVG ARTWORK
   ═══════════════════════════════════════════════════════════ */

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const StarIcon = ({ filled, half }: { filled: boolean; half?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    {half ? (
      <>
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stopColor="#f5c518" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#halfGrad)"
        />
      </>
    ) : (
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? "#f5c518" : "#d1d5db"}
      />
    )}
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= Math.floor(rating)} />
      ))}
    </div>
  );
};

const BotanicalBranch = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 200"
    className={`stroke-current fill-none ${className}`}
    strokeWidth="0.8"
  >
    <path d="M50,200 Q45,100 50,0" />
    <path d="M50,150 Q75,120 90,80 Q75,100 50,110" />
    <path d="M50,120 Q25,90 10,50 Q25,70 50,80" />
    <path d="M50,70 Q70,50 80,20 Q65,40 50,50" />
    <path d="M50,40 Q30,20 20,-10 Q35,10 50,20" />
  </svg>
);

const HandDrawnFlower = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={`stroke-current fill-transparent ${className}`}
    strokeWidth="0.6"
  >
    <circle cx="50" cy="50" r="8" className="fill-current opacity-20" />
    <path d="M50,42 Q65,5 50,0 Q35,5 50,42" />
    <path d="M50,58 Q65,95 50,100 Q35,95 50,58" />
    <path d="M42,50 Q5,65 0,50 Q5,35 42,50" />
    <path d="M58,50 Q95,65 100,50 Q95,35 58,50" />
    <path d="M55,45 Q80,15 85,15 Q85,25 55,45" />
    <path d="M45,45 Q20,15 15,15 Q15,25 45,45" />
    <path d="M45,55 Q20,85 15,85 Q15,75 45,55" />
    <path d="M55,55 Q80,85 85,85 Q85,75 55,55" />
  </svg>
);



/* ═══════════════════════════════════════════════════════════
   REVIEW CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */

function ReviewCard({
  review,
  index,
  isGoogle,
}: {
  review: any;
  index: number;
  isGoogle: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 180;
  const isLong = review.text.length > MAX_CHARS;

  // Generate initials avatar fallback
  const initials = review.author
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const avatarColors = [
    "from-violet-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-sky-500 to-blue-600",
    "from-fuchsia-500 to-purple-600",
  ];
  const colorClass = avatarColors[index % avatarColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
    >
      {/* Google badge */}
      {isGoogle && (
        <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity">
          <GoogleIcon />
        </div>
      )}

      {/* Header: Avatar + Name + Rating */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          {review.avatar && !review.avatar.startsWith("https://images.unsplash") ? (
            <Image
              src={review.avatar}
              alt={review.author}
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-white shadow-sm"
              unoptimized
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white`}
            >
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <a
            href={review.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors truncate block"
          >
            {review.author}
          </a>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">{review.relativeTime}</span>
          </div>
          {review.tag && (
            <span className="inline-block mt-1 text-[10px] bg-[#f4ebd9] text-[#8a7560] rounded-full px-2.5 py-0.5 font-medium tracking-wide">
              {review.tag}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div className="flex-1">
        <p className="text-gray-600 text-sm leading-relaxed">
          {isLong && !expanded ? (
            <>
              {review.text.slice(0, MAX_CHARS)}…{" "}
              <button
                onClick={() => setExpanded(true)}
                className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                More
              </button>
            </>
          ) : (
            <>
              {review.text}
              {isLong && (
                <>
                  {" "}
                  <button
                    onClick={() => setExpanded(false)}
                    className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                  >
                    Less
                  </button>
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <a
          href={review.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-blue-500 transition-colors"
        >
          <GoogleIcon />
          <span>{isGoogle ? "View on Google" : "Verified Review"}</span>
        </a>
        <div className="flex items-center gap-1 text-[11px] text-gray-300">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{review.rating}/5</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   OVERALL RATING BADGE
   ═══════════════════════════════════════════════════════════ */

function OverallRating({ place }: { place: PlaceInfo | null }) {
  const rating = place?.rating || 5.0;
  const total = place?.totalReviews || 200;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl mx-auto">
      {/* Big rating number */}
      <div className="text-center flex-shrink-0">
        <div className="text-7xl font-bold text-gray-900 leading-none">{rating.toFixed(1)}</div>
        <StarRating rating={rating} />
        <div className="text-sm text-gray-400 mt-1">{total.toLocaleString()} reviews</div>
      </div>

      {/* Bar chart */}
      <div className="flex-1 w-full space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const pct = star === 5 ? 88 : star === 4 ? 9 : star === 3 ? 2 : star === 2 ? 0.5 : 0.5;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-3">{star}</span>
              <StarIcon filled={true} />
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-[#f5c518] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (5 - star) * 0.1 }}
                />
              </div>
              <span className="text-xs text-gray-400 w-6">{pct}%</span>
            </div>
          );
        })}
      </div>

      {/* Write review CTA */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <GoogleIcon />
        <span className="text-xs text-gray-500 text-center">on Google Maps</span>
        <a
          href="https://maps.app.goo.gl/nYMH3mYr92GBcfCTA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
        >
          Write a Review
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKELETON LOADER
   ═══════════════════════════════════════════════════════════ */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-100 rounded w-2/3" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export default function TestimonialsPage() {
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGoogleReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/google-reviews");
      const data = await res.json();
      if (data.success && data.reviews?.length) {
        setGoogleReviews(data.reviews);
        setPlaceInfo(data.place);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoogleReviews();
  }, [fetchGoogleReviews]);

  // Only show real Google reviews
  const allReviews = googleReviews.map((r) => ({ ...r, isGoogle: true }));

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <>
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-[#100e0a]">
        <Image
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000&auto=format&fit=crop"
          alt="Happy travelers overlooking mountain vista"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0b] via-[#0f0e0b]/40 to-transparent" />

        <BotanicalBranch className="absolute -left-16 bottom-0 w-80 h-96 text-[#d5cab5] opacity-[0.7] -scale-x-100" />
        <BotanicalBranch className="absolute -right-16 bottom-0 w-80 h-96 text-[#d5cab5] opacity-[0.7]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#ae9e85]" />
              <HandDrawnFlower className="w-5 h-5 text-[#ae9e85]" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#d5cab5] font-semibold">
                Our Guest Book
              </span>
              <HandDrawnFlower className="w-5 h-5 text-[#ae9e85]" />
              <div className="w-12 h-px bg-[#ae9e85]" />
            </div>

            <h1 className="font-roman text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-[0.08em] uppercase">
              Happy Travelers
            </h1>

            <p className="font-roman text-xl md:text-2xl italic text-[#a09383] mt-8 max-w-2xl mx-auto tracking-wide relative">
              <span className="absolute -top-4 -left-6 text-4xl text-[#ae9e85]/30">"</span>
              The finest compliment we can receive is the memory of your journey.
              <span className="absolute -bottom-6 -right-4 text-4xl text-[#ae9e85]/30">"</span>
            </p>

            {/* Google rating pill in hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5"
            >
              <GoogleIcon />
              <div className="flex items-center gap-1.5">
                <StarRating rating={placeInfo?.rating || 5} />
                <span className="text-white font-bold text-sm">
                  {placeInfo?.rating?.toFixed(1) || "5.0"}
                </span>
                <span className="text-white/60 text-sm">
                  ({placeInfo?.totalReviews?.toLocaleString() || "200"}+ reviews)
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ OVERALL RATING ══════════ */}
      <section className="bg-[#0f0e0b] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <OverallRating place={placeInfo} />
        </div>
      </section>

      {/* ══════════ REVIEWS SECTION ══════════ */}
      <section className="relative bg-[#f8f5f0] py-20 px-6 md:px-12 lg:px-24 min-h-[600px]">


        <div className="max-w-7xl mx-auto">
          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Reviews grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key="google-reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {allReviews.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <GoogleIcon />
                    <div className="text-gray-500 text-lg mt-4 mb-2">Reviews are loading...</div>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                      If reviews don't appear, the Google Place ID may need to be verified in Vercel settings.
                    </p>
                  </div>
                ) : (
                  allReviews.map((review: any, i) => (
                    <ReviewCard
                      key={`${review.author}-${i}`}
                      review={review}
                      index={i}
                      isGoogle={review.isGoogle ?? false}
                    />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Write a review CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">
              Had a great experience? Share it with the world!
            </p>
            <a
              href="https://maps.app.goo.gl/nYMH3mYr92GBcfCTA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-800 text-sm font-semibold px-6 py-3 rounded-full hover:shadow-md hover:border-gray-300 transition-all duration-300 group"
            >
              <GoogleIcon />
              Write a Review on Google
              <svg
                className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="relative py-32 md:py-48 bg-[#1a1914] text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />

        <BotanicalBranch className="absolute left-[5%] top-1/2 -translate-y-1/2 w-48 h-64 text-[#d5cab5] opacity-60 -scale-x-100" />
        <BotanicalBranch className="absolute right-[5%] top-1/2 -translate-y-1/2 w-48 h-64 text-[#d5cab5] opacity-60" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="flex flex-col items-center"
          >
            <HandDrawnFlower className="w-12 h-12 text-[#ae9e85] mb-6 animate-[spin_60s_linear_infinite]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] block mb-4">
              Your Journey Awaits
            </span>
            <h2 className="font-roman text-4xl md:text-5xl lg:text-6xl font-medium text-[#f0e7d6] tracking-wide mb-8">
              Craft Your Masterpiece
            </h2>
            <p className="text-[#a09383] text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto font-light">
              Ready to craft unforgettable memories? Let our team design a bespoke Himalayan
              experience, hand-tailored entirely to your desires.
            </p>

            <Link
              href="/reserve"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-[#ae9e85] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0e7d6] transition-all duration-500 hover:text-[#1a1914] rounded-sm"
            >
              <span className="absolute inset-0 bg-[#ae9e85] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                Start Planning
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
