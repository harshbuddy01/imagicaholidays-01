"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   PREMIUM HANDMADE SVGS & ORNAMENTS
   ═══════════════════════════════════════════════════════════ */

const FlourishSeparator = () => (
  <div className="flex items-center justify-center gap-4 my-10 text-[#ae9e85] opacity-60">
    <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#ae9e85]" />
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="1">
      <path d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z" />
    </svg>
    <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#ae9e85]" />
  </div>
);

const LeafOrnament = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 200"
    className={`stroke-current fill-none ${className}`}
    strokeWidth="0.6"
  >
    {/* Delicate hand-drawn leaf vine */}
    <path d="M10,200 Q20,130 50,90 Q75,60 90,10" />
    <path d="M28,155 Q48,135 68,110 C50,118 34,136 28,155" />
    <path d="M50,105 Q70,85 85,55 C65,65 52,85 50,105" />
    <path d="M15,180 Q32,170 48,148 C32,152 20,168 15,180" />
  </svg>
);

const CornerOrnament = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={`stroke-current fill-none ${className}`} strokeWidth="0.8">
    <path d="M0,40 L0,0 L40,0" />
    <circle cx="2" cy="2" r="1.5" className="fill-current" />
  </svg>
);

export default function ArchitectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Bespoke System",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
         EDITORIAL HERO — FINE ART BOOK STYLE
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] bg-[#0c0b08] text-[#f0e7d6] flex flex-col justify-center overflow-hidden pt-32 pb-24 px-6 md:px-12 lg:px-24">
        
        {/* Soft background ambient shadows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(174,158,133,0.03)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[#0c0b08]/80" />

        {/* Tactile border running around the hero container */}
        <div className="absolute inset-6 md:inset-10 border border-[#ae9e85]/10 pointer-events-none z-0" />
        
        {/* Fine corners */}
        <CornerOrnament className="absolute top-8 left-8 md:top-12 md:left-12 w-6 h-6 text-[#ae9e85]/30" />
        <CornerOrnament className="absolute top-8 right-8 md:top-12 md:right-12 w-6 h-6 text-[#ae9e85]/30 rotate-90" />
        <CornerOrnament className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-6 h-6 text-[#ae9e85]/30 -rotate-90" />
        <CornerOrnament className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-6 h-6 text-[#ae9e85]/30 rotate-180" />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mb-8"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ae9e85] font-semibold">
              The Architecture Memoir
            </span>
            <div className="w-12 h-px bg-[#ae9e85]/30 mx-auto mt-3" />
          </motion.div>

          {/* Premium editorial headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="font-roman text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.15] text-white"
          >
            The Engineering Behind <br className="hidden sm:inline" />
            the <span className="font-roman italic text-[#ae9e85]">Digital Experience</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="font-roman text-lg md:text-xl italic text-[#a09383] mt-8 max-w-2xl mx-auto leading-relaxed"
          >
            "A portfolio of design-led software craftsmanship, created and optimized by Kumar Harsh Anand."
          </motion.p>

          <FlourishSeparator />

          {/* Micro details panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex justify-center items-center gap-12 text-[#a09383] text-xs font-light tracking-widest uppercase mt-6"
          >
            <div>
              <span className="text-[9px] text-[#ae9e85] block mb-1">Status</span>
              Senior Architect
            </div>
            <div className="w-px h-6 bg-[#ae9e85]/20" />
            <div>
              <span className="text-[9px] text-[#ae9e85] block mb-1">Focus</span>
              Design &amp; Engineering
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         THE CRAFTSMAN & HIS PHILOSOPHY (Asymmetrical Split)
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#090806] text-[#f0e7d6] py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-[#ae9e85]/10">
        
        {/* Botanical leaf watermark */}
        <LeafOrnament className="absolute right-12 top-10 w-48 h-80 text-[#ae9e85] opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Portrait Column (Left) — Looks like a canvas border painting */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 border border-[#ae9e85]/20 bg-[#12110d] rounded-sm max-w-[340px] shadow-2xl">
              <div className="absolute inset-2 border border-[#ae9e85]/5 pointer-events-none" />
              
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ae9e85]/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#ae9e85]/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#ae9e85]/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ae9e85]/40" />

              {/* Handcrafted frame box */}
              <div className="bg-[#171612] py-14 px-8 text-center flex flex-col justify-center items-center min-h-[380px]">
                {/* Handcrafted initials graphic */}
                <div className="w-20 h-20 rounded-full border border-[#ae9e85]/20 flex items-center justify-center font-roman text-2xl text-[#ae9e85] italic mb-6 bg-[#0c0b08]">
                  KA
                </div>
                <h3 className="font-roman text-xl text-white tracking-wide font-medium">
                  Kumar Harsh Anand
                </h3>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#ae9e85] mt-1 mb-6 font-light">
                  Senior Architect
                </span>
                <p className="text-[#a09383] text-xs font-light leading-relaxed italic border-t border-white/[0.04] pt-6">
                  "Software should not just run; it should behave gracefully. We design code that mirrors the aesthetics of high-end travel."
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Column (Right) — Clean asymmetrical text flow */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] font-semibold block mb-4">
                The Blueprint Philosophy
              </span>
              <h2 className="font-roman text-3xl md:text-5xl font-light text-white tracking-wide leading-snug">
                Where high performance meets <br />
                <span className="font-roman italic text-[#ae9e85]">meticulous design.</span>
              </h2>
            </div>

            <div className="font-roman text-stone-300 space-y-6 text-sm md:text-base leading-relaxed font-light">
              <p>
                My name is <strong className="text-[#f0e7d6] font-normal">Kumar Harsh Anand</strong>. I approach website architecture and backend programming not as templates or simple modular elements, but as custom, design-forward engineering. 
              </p>
              <p>
                When building the <strong className="text-[#f0e7d6] font-normal">Imagica Holidays</strong> ecosystem, I spent months tuning the interaction pathways. This meant crafting a high-performance frontend capable of displaying fluid animations, custom Google Maps integrations, and responsive components, but also coupling it to an enterprise CRM stack capable of handling real-world tourism tasks securely.
              </p>
              <p>
                A high-quality website is only as premium as its backend operations. The systems I design represent clean database architecture, caching layers that minimize server latency, and robust deployment hooks that keep operations running smoothly.
              </p>
            </div>

            {/* Asymmetrical design guidelines listing */}
            <div className="border-t border-[#ae9e85]/10 pt-10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#ae9e85] font-semibold block mb-6">
                Guiding Engineering Pillars
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { title: "Bespoke Logic", desc: "No generic templates. Every module is tailored to actual operational workflows." },
                  { title: "Visual Symphony", desc: "Perfect grid alignment, smooth transitions, and high-fidelity typography." },
                  { title: "Optimized Performance", desc: "Low LCP, custom caching, server-side data proxies, and zero leakages." },
                  { title: "Robust Infrastructure", desc: "Dockerized VM deployments with reverse proxies and secure keys." }
                ].map((pillar, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs text-[#ae9e85] font-medium font-roman italic">{idx + 1}. {pillar.title}</span>
                    <p className="text-xs text-[#a09383] font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         THE EXHIBITION — ASYMMETRICAL EDITORIAL TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0c0b08] py-32 px-6 md:px-12 lg:px-24 border-t border-[#ae9e85]/10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-24">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ae9e85] font-semibold">
              The Project Exhibition
            </span>
            <h2 className="font-roman text-3xl md:text-5xl font-light text-white tracking-wide mt-4">
              Handcrafted Modules &amp; Platforms
            </h2>
            <div className="w-16 h-px bg-[#ae9e85]/30 mx-auto mt-6" />
          </div>

          {/* Asymmetrical timeline layout */}
          <div className="space-y-28">
            {[
              {
                id: "01",
                category: "Enterprise Infrastructure",
                title: "Custom Travel CRM Platform",
                desc: "An end-to-end CRM framework tailored for high-ticket bookings. It handles query pipelines, client profiling, custom itinerary creation, automated proposal generators, invoice modules, and real-time activity tracking logs in one dashboard.",
                tech: ["Next.js 14", "Express.js", "Supabase PostgreSQL", "Prisma ORM", "Zustand"]
              },
              {
                id: "02",
                category: "Creative Frontend",
                title: "Imagica Holidays Portal",
                desc: "The digital face of the brand. Renders clean, high-performance static and dynamic pages with fluid Framer Motion states, bespoke state-by-state destination memoirs, villa sliders, and custom typography frameworks.",
                tech: ["Next.js App Router", "Framer Motion", "Tailwind CSS", "TypeScript"]
              },
              {
                id: "03",
                category: "Data Integrity & Security",
                title: "Google Reviews Proxy Engine",
                desc: "Renders authentic Google reviews directly onto the testimonials section using a secure backend API proxy. Prevents exposure of private Google Cloud keys to the browser client and implements lightweight caching.",
                tech: ["Google Places API", "Node.js Server Proxies", "LRU Cache"]
              },
              {
                id: "04",
                category: "DevOps & Operations",
                title: "GCP Docker VM Stack",
                desc: "A fully dockerized environment deployed on Google Cloud Platform. Houses multiple containers (MinIO, Meilisearch, Redis, n8n, CRM backend, Supabase proxy) routed through Caddy with automatic SSL renewals.",
                tech: ["Docker Compose", "GCP VM", "Caddy Server", "n8n Automation"]
              },
              {
                id: "05",
                category: "Financial Automation",
                title: "Invoice & Receipt Pipeline",
                desc: "Automated billing pipeline connected to Razorpay API. Dynamically generates print-ready PDF vouchers and invoices via headless Puppeteer browser workflows, automatically sending them to clients using Brevo SMTP.",
                tech: ["Razorpay Integration", "Puppeteer Web Scraping", "Brevo Mailer Engine"]
              }
            ].map((proj, idx) => (
              <div 
                key={proj.id} 
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative ${
                  idx % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Asymmetrical placement of project card number */}
                <div className={`md:col-span-2 text-left md:text-right font-roman text-5xl font-extralight text-[#ae9e85]/20 ${
                  idx % 2 === 0 ? "md:text-right" : "md:col-start-11 md:text-left"
                }`}>
                  [{proj.id}]
                </div>

                <div className={`md:col-span-8 space-y-4 ${
                  idx % 2 === 0 ? "" : "md:col-start-3"
                }`}>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#ae9e85] font-semibold block">
                    {proj.category}
                  </span>
                  <h3 className="font-roman text-2xl md:text-3xl text-white font-light tracking-wide">
                    {proj.title}
                  </h3>
                  <p className="text-[#a09383] text-sm font-light leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tech.map((t) => (
                      <span key={t} className="text-[10px] tracking-wider uppercase bg-white/[0.03] border border-white/[0.06] text-[#ae9e85] px-2.5 py-1 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         CONTACT SECTION — HANDMADE LETTER STYLE FORM
         ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative bg-[#090806] py-32 px-6 md:px-12 lg:px-24 border-t border-[#ae9e85]/10">
        
        {/* Vine ornament wrapping from side */}
        <LeafOrnament className="absolute left-6 bottom-10 w-40 h-72 text-[#ae9e85] opacity-5 -scale-x-100" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ae9e85] font-semibold">
              The Correspondence
            </span>
            <h2 className="font-roman text-3xl md:text-5xl font-light text-white tracking-wide mt-4">
              Write a Digital Letter
            </h2>
            <div className="w-12 h-px bg-[#ae9e85]/30 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Details Panel (Left) */}
            <div className="lg:col-span-4 space-y-8 font-light text-sm text-[#a09383]">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#ae9e85] block mb-2">
                  Direct Email
                </span>
                <a href="mailto:anandharsh437@gmail.com" className="text-white hover:text-[#ae9e85] transition-colors font-medium">
                  anandharsh437@gmail.com
                </a>
              </div>
              
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#ae9e85] block mb-2">
                  Phone / Whatsapp
                </span>
                <a href="tel:+918235337180" className="text-white hover:text-[#ae9e85] transition-colors font-medium">
                  +91 82353 37180
                </a>
              </div>

              <div className="pt-6 border-t border-white/[0.04]">
                <span className="text-[9px] uppercase tracking-wider text-[#ae9e85] block mb-3">
                  Digital Footprints
                </span>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/in/kumar-harsh-anand" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
                    <span>LinkedIn</span> →
                  </a>
                  <a href="https://www.instagram.com/harshanand437" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
                    <span>Instagram</span> →
                  </a>
                  <a href="https://github.com/harshbuddy01" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
                    <span>GitHub</span> →
                  </a>
                </div>
              </div>
            </div>

            {/* Custom Letter Form (Right) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-[#ae9e85]/20 bg-[#12110d] p-8 text-center rounded-sm"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#ae9e85]/30 flex items-center justify-center mx-auto mb-4 font-roman italic text-xl text-[#ae9e85]">
                      S
                    </div>
                    <h3 className="font-roman text-white text-lg font-medium mb-2">Letter Transmitted</h3>
                    <p className="text-[#a09383] text-xs font-light leading-relaxed">
                      Thank you. Your message has been routed to Kumar Harsh Anand. Expect a personal reply shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="border-b border-[#ae9e85]/20 pb-2">
                        <label className="text-[9px] uppercase tracking-widest text-[#ae9e85] block mb-1">
                          My Name is
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent text-white placeholder-white/10 text-sm outline-none font-light py-1"
                          placeholder="your name..."
                        />
                      </div>

                      <div className="border-b border-[#ae9e85]/20 pb-2">
                        <label className="text-[9px] uppercase tracking-widest text-[#ae9e85] block mb-1">
                          Reach Me at
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-transparent text-white placeholder-white/10 text-sm outline-none font-light py-1"
                          placeholder="email address..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="border-b border-[#ae9e85]/20 pb-2">
                        <label className="text-[9px] uppercase tracking-widest text-[#ae9e85] block mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-transparent text-white placeholder-white/10 text-sm outline-none font-light py-1"
                          placeholder="optional..."
                        />
                      </div>

                      <div className="border-b border-[#ae9e85]/20 pb-2">
                        <label className="text-[9px] uppercase tracking-widest text-[#ae9e85] block mb-1">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full bg-transparent text-[#ae9e85] text-sm outline-none font-light py-1 cursor-pointer"
                          style={{ colorScheme: "dark" }}
                        >
                          <option value="Bespoke System">Bespoke Custom CRM</option>
                          <option value="Luxury Website">Luxury Custom Website</option>
                          <option value="Consultation">Tech Consultancy</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-b border-[#ae9e85]/20 pb-2">
                      <label className="text-[9px] uppercase tracking-widest text-[#ae9e85] block mb-2">
                        The Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent text-white placeholder-white/10 text-sm outline-none font-light py-1 resize-none"
                        placeholder="tell me about your concept or business goals..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-3 bg-transparent border border-[#ae9e85]/30 hover:border-[#ae9e85] text-[#ae9e85] hover:text-white px-8 py-3.5 rounded-sm text-xs tracking-widest uppercase transition-all duration-300 font-medium"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Transmitting...
                        </>
                      ) : (
                        "Send Letter"
                      )}
                    </button>

                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SUBTLE ATTRIBUTION FOOTER STRIP
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0c0b08] border-t border-[#ae9e85]/10 py-10 px-6 text-center">
        <p className="text-[#7a705e] text-[10px] tracking-widest uppercase leading-relaxed max-w-2xl mx-auto">
          Crafted as a custom digital exhibition component for{" "}
          <Link href="/" className="text-[#ae9e85] hover:underline">Imagica Holidays</Link>
          . Code architecture &amp; interface designed exclusively by Kumar Harsh Anand. All rights reserved.
        </p>
      </section>

      <Footer />
    </>
  );
}
