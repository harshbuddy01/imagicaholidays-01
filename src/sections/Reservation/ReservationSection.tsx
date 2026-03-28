"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

/* ── Component ────────────────────────────────────────────── */
export default function ReservationSection() {
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
      className="relative w-full min-h-screen bg-[#f4ebd9] overflow-hidden"
    >
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

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl z-10"
          >
            {/* Form header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
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
                  Destination
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("destination")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] focus:outline-none appearance-none cursor-pointer transition-colors duration-300 ${
                    focusedField === "destination" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                  }`}
                >
                  <option value="">Select your destination</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 translate-y-1 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Duration + Travel Date row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 5 Days"
                    value={formData.duration}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("duration")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none transition-colors duration-300 ${
                      focusedField === "duration" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("travelDate")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] focus:outline-none transition-colors duration-300 ${
                      focusedField === "travelDate" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                    }`}
                  />
                </div>
              </div>

              {/* Adults + Children counters */}
              <div className="grid grid-cols-2 gap-6">
                {/* Adults */}
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
                    Adults
                  </label>
                  <div className="flex items-center border-b-[1.5px] border-[#d5cab5] py-2">
                    <button
                      type="button"
                      onClick={() => adjustCount("adults", -1)}
                      className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#7a705e] hover:border-[#ae9e85] hover:text-[#ae9e85] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <span className="flex-1 text-center text-lg font-roman font-medium text-[#3d3831]">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustCount("adults", 1)}
                      className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#7a705e] hover:border-[#ae9e85] hover:text-[#ae9e85] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
                    Children
                  </label>
                  <div className="flex items-center border-b-[1.5px] border-[#d5cab5] py-2">
                    <button
                      type="button"
                      onClick={() => adjustCount("children", -1)}
                      className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#7a705e] hover:border-[#ae9e85] hover:text-[#ae9e85] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <span className="flex-1 text-center text-lg font-roman font-medium text-[#3d3831]">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustCount("children", 1)}
                      className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#7a705e] hover:border-[#ae9e85] hover:text-[#ae9e85] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                      </svg>
                    </button>
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

              {/* Full Name */}
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
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
                  className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none transition-colors duration-300 ${
                    focusedField === "fullName" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                  }`}
                />
              </div>

              {/* Phone + Email row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
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
                    className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none transition-colors duration-300 ${
                      focusedField === "phone" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
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
                    className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none transition-colors duration-300 ${
                      focusedField === "email" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                    }`}
                  />
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a705e] mb-2">
                  Special Requirements
                </label>
                <textarea
                  name="requirements"
                  placeholder="e.g. Prefer 4-star hotels, vegetarian food, specific places to visit..."
                  value={formData.requirements}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("requirements")}
                  onBlur={() => setFocusedField(null)}
                  rows={3}
                  className={`w-full bg-transparent border-b-[1.5px] py-3 text-sm text-[#3d3831] placeholder:text-[#b5a993] focus:outline-none resize-none transition-colors duration-300 ${
                    focusedField === "requirements" ? "border-[#ae9e85]" : "border-[#d5cab5]"
                  }`}
                />
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
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rotate-90 hidden lg:block tracking-[0.3em] text-[0.65rem] font-medium text-[#d5cab5] uppercase">
            Book Now
          </div>
        </div>
      </div>
    </section>
  );
}
