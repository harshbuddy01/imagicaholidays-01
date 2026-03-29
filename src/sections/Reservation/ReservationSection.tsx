"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/* ── Destination options ──────────────────────────────────── */
const destinations = [
  "Gangtok",
  "Lachung",
  "Darjeeling",
  "Pelling",
  "Namchi",
  "Ravangla",
  "Yuksom",
  "Tsomgo Lake",
];

/* ── Handcrafted UI Accents ──────────────────────────────── */
const WaxSeal = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`fill-[#8b1a1a] drop-shadow-lg ${className}`}>
    <path d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,30 30,15 50,15" opacity="0.8" />
    <path d="M45,30 L55,30 L55,70 L45,70 Z M40,40 L60,40 L60,45 L40,45 Z M40,55 L60,55 L60,60 L40,60 Z" fill="white" opacity="0.4" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

const PencilMountain = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={`stroke-[#ae9e85] fill-none ${className}`} strokeWidth="0.5">
    <path d="M10,90 L50,30 L80,70 L120,20 L160,80 L190,90" />
    <path d="M40,45 Q50,35 60,45" opacity="0.6" />
    <path d="M110,35 Q120,25 130,35" opacity="0.6" />
    <path d="M0,95 L200,95" strokeDasharray="1 3" />
  </svg>
);

const SketchedUnderline = () => (
   <svg viewBox="0 0 400 10" className="absolute -bottom-1 left-0 w-full h-[2px] text-[#d5cab5] opacity-50 preserve-3d" preserveAspectRatio="none">
     <path d="M0,5 Q100,2 200,5 T400,3" fill="none" stroke="currentColor" strokeWidth="1.5" />
   </svg>
);

/* ── Component ────────────────────────────────────────────── */
export default function ReservationSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    travelDate: "",
    adults: 2,
    children: 0,
    fullName: "",
    phone: "",
    email: "",
    requirements: "",
  });

  useEffect(() => {
    const arrival = searchParams.get("arrival");
    if (arrival) {
      setFormData((prev) => ({ ...prev, travelDate: arrival }));
    }
  }, [searchParams]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const adjustCount = (field: "adults" | "children", delta: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(field === "adults" ? 1 : 0, prev[field] + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || `Request failed (${res.status}). Please try again.`);
      } else {
        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
          setTimeout(() => {
            router.push("/");
          }, 2500);
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reservation"
      className="relative w-full h-screen bg-[#f4ebd9] overflow-hidden"
    >
      <Link 
        href="/" 
        className="absolute top-8 right-8 z-50 p-2 hover:bg-white/10 rounded-full transition-all group"
        aria-label="Back to home"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* ═══════════ LEFT: Hero Image Side ═══════════ */}
        <div className="relative w-full lg:w-[48%] min-h-[400px] lg:min-h-screen overflow-hidden">
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop"
            alt="Mountain landscape at golden hour"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 48vw"
            priority
          />

          {/* Warm gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/80 via-[#1a1914]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1914]/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#1a1914]/10" />

          {/* Content over image */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#ae9e85]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">
                  Reserve Your Experience
                </span>
              </div>

              <h2 className="font-roman text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-wide mb-4">
                Begin Your
                <br />
                <span className="font-script italic text-[#d5cab5] text-5xl md:text-6xl lg:text-7xl">
                  Journey
                </span>
              </h2>

              <p className="text-sm text-white/60 max-w-sm leading-relaxed mb-8">
                Let us craft a bespoke Himalayan experience tailored to your desires. 
                From misty peaks to warm valley sunsets — your adventure awaits.
              </p>

              {/* Trust badges */}
              <div className="flex items-center gap-6">
                {[
                  { number: "500+", label: "Happy Travellers" },
                  { number: "15+", label: "Destinations" },
                  { number: "4.9", label: "Rating" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-roman text-xl md:text-2xl font-semibold text-[#ae9e85]">
                      {stat.number}
                    </p>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/50 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Decorative corner frame */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-white/15" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-white/15 hidden lg:block" />
        </div>

        {/* ═══════════ RIGHT: Booking Form Side ═══════════ */}
        <div className="w-full lg:w-[52%] relative flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-0">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3d3831 0.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />

          {/* Handcrafted Visuals */}
          <PencilMountain className="absolute -bottom-2 -left-10 w-96 h-48 opacity-15 pointer-events-none" />
          <div className="absolute top-10 right-10 w-24 h-24 border border-[#ae9e85]/10 rounded-full flex items-center justify-center">
             <div className="w-px h-16 bg-[#ae9e85]/20 rotate-45" />
             <div className="w-16 h-px bg-[#ae9e85]/20 rotate-45" />
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg z-10 bg-white/30 backdrop-blur-[1px] border-l border-[#d5cab5]/40 pl-10 pr-6 py-6"
          >
            {/* Form ornament corners */}
            <div className="absolute top-0 left-0 w-px h-full bg-[#d5cab5]/40" />

            {/* Form header */}
            <div className="mb-6 relative">
              <WaxSeal className="absolute -top-12 -left-20 w-16 h-16 pointer-events-none rotate-12" />
              <div className="flex items-center gap-2 mb-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4" strokeLinecap="round"/>
                  <path d="M4.93 4.93l2.83 2.83" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">
                  Plan Your Trip
                </span>
              </div>
              <h3 className="font-roman text-2xl md:text-3xl font-medium text-[#3d3831] tracking-wide">
                Booking Details
              </h3>
            </div>

            {/* ── Trip Details ── */}
            <div className="space-y-5 mb-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#ae9e85] font-medium">
                Trip Information
              </p>

              {/* Destination */}
              <div className="relative">
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
                  Destination <span className="text-[#ae9e85]">*</span>
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("destination")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select your destination</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <SketchedUnderline />
                <div className="absolute right-0 top-1/2 -translate-y-1 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Single Column Details */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold">
                    Duration <span className="text-[#ae9e85]">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 5 Days"
                    value={formData.duration}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("duration")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none"
                  />
                  <SketchedUnderline />
                </div>

                <div className="relative">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold">
                    Travel Date <span className="text-[#ae9e85]">*</span>
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("travelDate")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] focus:outline-none"
                  />
                  <SketchedUnderline />
                </div>
              </div>

              {/* Adults + Children (More compact) */}
              <div className="flex gap-10">
                <div className="flex-1">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold mb-1">Adults</label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => adjustCount("adults", -1)} className="text-[#ae9e85] hover:text-[#3d3831]">•</button>
                    <span className="text-base font-roman text-[#3d3831]">{formData.adults}</span>
                    <button type="button" onClick={() => adjustCount("adults", 1)} className="text-[#ae9e85] hover:text-[#3d3831]">+</button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold mb-1">Children</label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => adjustCount("children", -1)} className="text-[#ae9e85] hover:text-[#3d3831]">•</button>
                    <span className="text-base font-roman text-[#3d3831]">{formData.children}</span>
                    <button type="button" onClick={() => adjustCount("children", 1)} className="text-[#ae9e85] hover:text-[#3d3831]">+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-8">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d5cab5] to-transparent" />
              <div className="absolute bg-[#f4ebd9] px-3">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#ae9e85" />
                </svg>
              </div>
            </div>

            {/* ── Contact Information ── */}
            <div className="space-y-5 mb-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#ae9e85] font-medium">
                Contact Information
              </p>

              {/* Contact Information (Single Column) */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold">
                    Full Name <span className="text-[#ae9e85]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none"
                  />
                  <SketchedUnderline />
                </div>

                <div className="relative">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold">
                    Phone Number <span className="text-[#ae9e85]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none"
                  />
                  <SketchedUnderline />
                </div>

                <div className="relative">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold">
                    Email Address <span className="text-[#ae9e85]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none"
                  />
                  <SketchedUnderline />
                </div>

                <div className="relative">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#7a705e] font-bold">
                    Special Requirements
                  </label>
                  <textarea
                    name="requirements"
                    placeholder="e.g. Prefer 4-star hotels..."
                    value={formData.requirements}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("requirements")}
                    onBlur={() => setFocusedField(null)}
                    rows={2}
                    className="w-full bg-transparent border-none py-2 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none resize-none"
                  />
                  <SketchedUnderline />
                </div>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Submit Button ── */}
            <motion.button
              type="submit"
              disabled={loading || submitted}
              whileHover={!loading && !submitted ? { scale: 1.01 } : {}}
              whileTap={!loading && !submitted ? { scale: 0.98 } : {}}
              className={`group relative w-full overflow-hidden py-4 text-[12px] font-semibold uppercase tracking-[0.25em] transition-all duration-500 rounded-sm ${
                submitted
                  ? "bg-green-700 text-white"
                  : loading
                  ? "bg-[#5c544b] text-[#d5cab5] cursor-wait"
                  : "bg-[#3d3831] text-[#f4ebd9] hover:bg-[#2a2520]"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {submitted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Inquiry Sent Successfully
                  </>
                ) : loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </span>

              {/* Hover shimmer effect */}
              {!loading && !submitted && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              )}
            </motion.button>

            {/* Trust note */}
            <p className="text-center text-[10px] text-[#b5a993] tracking-wider mt-4">
              We respond within 24 hours · No payment required · Free cancellation
            </p>
          </motion.form>

          {/* Side rotated text */}
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rotate-90 hidden lg:block tracking-[0.6em] text-[0.4rem] font-bold text-[#ae9e85]/40 uppercase">
            BOOKING SLIP
          </div>
        </div>
      </div>
    </section>
  );
}
