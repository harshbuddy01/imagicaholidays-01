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

      // Always try to parse as JSON first
      let data;
      try {
        data = await res.json();
      } catch {
        // If JSON parsing fails, it's a server error
        setError("Server error. Please try again later.");
        return;
      }

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push("/");
        }, 2500);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
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
      className="relative min-h-screen py-20 px-4 md:px-8 flex items-center justify-center"
    >
      {/* ── Background Imagery ── */}
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop"
        alt="Mountain landscape at golden hour"
        fill
        className="object-cover fixed"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-[#1a1914]/70 fixed" />

      {/* ── Close / Back Button ── */}
      <Link 
        href="/" 
        className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all group flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      {/* ── Handmade Document ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl my-auto z-10 bg-[#FCFBF8] shadow-[0_30px_80px_rgba(0,0,0,0.4)] p-8 md:p-14 lg:p-20 overflow-hidden"
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* Outer border decoration */}
        <div className="absolute inset-4 border border-[#e8dcc4] pointer-events-none" />
        <div className="absolute inset-5 border border-[#e8dcc4]/40 pointer-events-none" />
        
        {/* Handcrafted Visuals */}
        <PencilMountain className="absolute bottom-4 -right-10 w-96 h-48 opacity-10 pointer-events-none" />
        <WaxSeal className="absolute -top-10 -left-10 w-24 h-24 pointer-events-none rotate-[15deg] opacity-90" />
        
        {/* Header Text */}
        <div className="text-center mb-12 relative z-10">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#ae9e85]" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1">
              <path d="M12 2v20 m4-16l-4-4-4 4 m8 12l-4 4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="#ae9e85" fill="none" />
            </svg>
            <div className="w-12 h-[1px] bg-[#ae9e85]" />
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a705e] mb-4">
            Curated Expeditions
          </p>
          <h2 className="font-roman text-3xl md:text-5xl font-semibold text-[#2c2822] tracking-wide mb-3">
            Reserve Your
            <span className="block mt-2 font-script italic text-[#ae9e85] text-5xl md:text-6xl font-normal">
              Journey
            </span>
          </h2>
        </div>

        {/* ── The Form ── */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
          
          {/* Trip Details Section */}
          <div>
            <div className="mb-6 border-b border-[#e8dcc4] pb-2">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">I.</span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#3d3831] font-bold">
                Trip Details
              </span>
            </div>
            
            <div className="space-y-6">
              <div className="relative group">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Destination <span className="text-[#8b1a1a]">*</span>
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("destination")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select an exquisite destination</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <SketchedUnderline />
                <div className="absolute right-2 top-1/2 translate-y-2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c2822" strokeWidth="1.5">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Duration <span className="text-[#8b1a1a]">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g. 5 Days & 4 Nights"
                  value={formData.duration}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("duration")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman placeholder:text-[#d3ccbc] focus:outline-none"
                />
                <SketchedUnderline />
              </div>

              <div className="relative">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Travel Date <span className="text-[#8b1a1a]">*</span>
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("travelDate")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman focus:outline-none"
                />
                <SketchedUnderline />
              </div>

              {/* Adults & Children grouped vertically, or close together naturally */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-2">
                <div className="flex-1">
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-3">Adults</label>
                  <div className="flex items-center gap-6">
                    <button type="button" onClick={() => adjustCount("adults", -1)} className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#9e927c] hover:border-[#2c2822] hover:text-[#2c2822] transition-colors">-</button>
                    <span className="text-xl font-roman text-[#2c2822] w-6 text-center">{formData.adults}</span>
                    <button type="button" onClick={() => adjustCount("adults", 1)} className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#9e927c] hover:border-[#2c2822] hover:text-[#2c2822] transition-colors">+</button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-3">Children</label>
                  <div className="flex items-center gap-6">
                    <button type="button" onClick={() => adjustCount("children", -1)} className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#9e927c] hover:border-[#2c2822] hover:text-[#2c2822] transition-colors">-</button>
                    <span className="text-xl font-roman text-[#2c2822] w-6 text-center">{formData.children}</span>
                    <button type="button" onClick={() => adjustCount("children", 1)} className="w-8 h-8 rounded-full border border-[#d5cab5] flex items-center justify-center text-[#9e927c] hover:border-[#2c2822] hover:text-[#2c2822] transition-colors">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div>
            <div className="mb-6 border-b border-[#e8dcc4] pb-2">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">II.</span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#3d3831] font-bold">
                Traveller Identity
              </span>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Full Name <span className="text-[#8b1a1a]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="How should we address you?"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman placeholder:text-[#d3ccbc] focus:outline-none"
                />
                <SketchedUnderline />
              </div>

              <div className="relative">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Phone Number <span className="text-[#8b1a1a]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 or Local Area Code"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman placeholder:text-[#d3ccbc] focus:outline-none"
                />
                <SketchedUnderline />
              </div>

              <div className="relative">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Email Address <span className="text-[#8b1a1a]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Where shall we send the itinerary?"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman placeholder:text-[#d3ccbc] focus:outline-none"
                />
                <SketchedUnderline />
              </div>

              <div className="relative">
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#9e927c] font-bold mb-1">
                  Special Curations (Optional)
                </label>
                <textarea
                  name="requirements"
                  placeholder="Any dietary needs, occasions to celebrate, or pace preferences?"
                  value={formData.requirements}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("requirements")}
                  onBlur={() => setFocusedField(null)}
                  rows={2}
                  className="w-full bg-transparent border-none py-3 text-base text-[#2c2822] font-roman placeholder:text-[#d3ccbc] focus:outline-none resize-none"
                />
                <SketchedUnderline />
              </div>
            </div>
          </div>

          {/* Form Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-[#8b1a1a]/5 border border-[#8b1a1a]/20 text-center rounded-sm"
              >
                <p className="text-xs text-[#8b1a1a] font-medium tracking-wide">{error}</p>
              </motion.div>
            )}
            
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-[#ae9e85]/10 border border-[#ae9e85]/30 text-center rounded-sm"
              >
                <svg className="w-8 h-8 mx-auto text-[#ae9e85] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <h4 className="font-roman text-xl text-[#3d3831] mb-1">Your Letter Has Been Sent</h4>
                <p className="text-xs text-[#7a705e] tracking-wide">
                  An artisan from our team will reach out to you shortly. Redirecting you home...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Action */}
          {!submitted && (
            <div className="pt-6 flex justify-center">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`relative overflow-hidden px-14 py-4 border transition-all duration-500 rounded-sm ${
                  loading
                    ? "border-[#d5cab5] text-[#9e927c] cursor-wait"
                    : "border-[#2c2822] text-[#2c2822] hover:bg-[#2c2822] hover:text-[#fcfbf8] shadow-sm"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]">
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Delivering Letter...
                    </>
                  ) : (
                    "Seal & Send Letter"
                  )}
                </span>
                
                {/* Subtle sheen */}
                {!loading && (
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#fcfbf8]/10 to-transparent hover:animate-[shimmer_1.5s_infinite]" />
                )}
              </motion.button>
            </div>
          )}

        </form>
        
        {/* Decorative corner staples/brasses */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
      </motion.div>
    </section>
  );
}
