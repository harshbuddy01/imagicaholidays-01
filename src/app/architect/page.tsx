"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

/* ─────────────────────────────────────────────
   ANIMATED COUNTER HOOK
───────────────────────────────────────────── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─────────────────────────────────────────────
   STATS ROW COMPONENT
───────────────────────────────────────────── */
function StatCard({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, 1800, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm text-[#a09383] mt-1 font-light tracking-wide">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD COMPONENT
───────────────────────────────────────────── */
function ProjectCard({
  title, description, tags, index,
}: {
  title: string; description: string; tags: string[]; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group relative bg-[#18171280] border border-white/[0.06] rounded-2xl p-8 hover:border-[#ae9e85]/30 transition-all duration-500 hover:bg-[#1e1c16]/80 cursor-default"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(174,158,133,0.04), transparent)" }} />
      
      {/* Number */}
      <span className="text-[11px] tracking-[0.3em] uppercase text-[#ae9e85]/50 font-medium">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="text-white font-semibold text-lg mt-3 mb-3 group-hover:text-[#f0e7d6] transition-colors">
        {title}
      </h3>
      <p className="text-[#7a705e] text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-[10px] tracking-wider uppercase bg-white/[0.04] border border-white/[0.08] text-[#ae9e85] px-2.5 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SKILL BAR
───────────────────────────────────────────── */
function SkillBar({ label, level, index }: { label: string; level: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-[#d5cab5] font-medium">{label}</span>
        <span className="text-[#ae9e85]">{level}%</span>
      </div>
      <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ae9e85] to-[#d5cab5] rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ArchitectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const [chars, setChars] = useState(0);

  // Typewriter effect for hero subtitle
  const subtitles = ["Software Engineer.", "UX / UI Designer.", "Full-Stack Architect.", "CRM Builder.", "Travel Tech Specialist."];
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = subtitles[subtitleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setSubtitleIdx((i) => (i + 1) % subtitles.length);
    } else {
      const speed = isDeleting ? 40 : 70;
      timeout = setTimeout(() => {
        setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, subtitleIdx]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const projects = [
    {
      title: "Enterprise Travel CRM",
      description: "Custom-built full-stack CRM covering the complete lead lifecycle — intake → assignment → proposal generation → payment tracking → tour operations → automated vouchers. Includes a live activity log, RBAC, Kanban pipeline, and 4 webhook sources.",
      tags: ["Next.js 14", "Express.js", "Supabase", "Prisma", "BullMQ", "Zustand"],
    },
    {
      title: "Imagica Holidays — Marketing Website",
      description: "Luxury travel brand website with immersive GSAP scroll animations, Framer Motion reveals, dynamic destination pages, an advanced CMS for journey and blog content, and a high-performance Next.js App Router architecture.",
      tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "Google Reviews Integration",
      description: "Secure server-side proxy to the Google Places API — renders live reviews without exposing credentials to the browser. Built with Next.js App Router API routes, 1-hour caching, and a beautiful animated rating widget.",
      tags: ["Google Places API", "Next.js API Routes", "Server Components"],
    },
    {
      title: "Automated Deployment Pipeline",
      description: "Docker Compose stack on a GCP VM — running the backend API, Meilisearch, Redis, MinIO, n8n, and Caddy as a reverse proxy with automatic HTTPS. Auto-restarts via GitHub push hooks.",
      tags: ["Docker", "GCP VM", "Caddy", "Meilisearch", "Redis", "MinIO"],
    },
    {
      title: "Finance & PDF Invoice Module",
      description: "End-to-end finance module — invoice generation, Razorpay payment link integration, vendor payment tracking, PDF generation via Puppeteer, and automated email dispatch via Brevo SMTP.",
      tags: ["Razorpay", "Puppeteer", "Brevo SMTP", "PDF Generation"],
    },
    {
      title: "CMS & Website Control Dashboard",
      description: "A headless CMS built inside the CRM — letting the team manage journey cards, destination highlights, blog posts, testimonials, landing state hero slides, and trending packages from a visual dashboard.",
      tags: ["Headless CMS", "Cloudflare R2", "Rich Text Editor", "File Upload"],
    },
  ];

  const skills = [
    { label: "React / Next.js", level: 96 },
    { label: "UI / UX Design", level: 92 },
    { label: "Node.js / Express", level: 90 },
    { label: "Database Design (PostgreSQL)", level: 85 },
    { label: "DevOps / Docker / GCP", level: 80 },
    { label: "Motion & Animation", level: 88 },
  ];

  return (
    <>
      <Navbar />

      {/* ════════════════════════════════════════════
          HERO — DARK LUXURY FULL VIEWPORT
          ════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#0a0906] flex flex-col justify-center overflow-hidden pt-24 pb-20 px-6 md:px-12 lg:px-20">
        
        {/* Ambient gradient blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #ae9e85 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #d5cab5 0%, transparent 70%)" }} />

        {/* Vertical text label (left side) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-3">
          <div className="w-px h-24 bg-white/10" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 -rotate-90 whitespace-nowrap origin-center">
            Portfolio · 2026
          </span>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[#ae9e85]/20 rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ae9e85] animate-pulse" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#ae9e85] font-medium">
              Available for Projects
            </span>
          </motion.div>

          {/* Name headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[14vw] sm:text-[10vw] lg:text-[8vw] xl:text-[7rem] font-bold tracking-tighter text-white leading-none mb-4"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.03em" }}
          >
            Kumar<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(174,158,133,0.4)" }}>
              Harsh
            </span>{" "}
            <span className="text-[#ae9e85]">Anand</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl md:text-3xl text-[#7a705e] font-light tracking-wide mb-10 h-10 flex items-center gap-1"
          >
            <span>{displayText}</span>
            <span className="w-0.5 h-7 bg-[#ae9e85] animate-[blink_0.9s_step-end_infinite]" />
          </motion.div>

          {/* Short bio row */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[#7a705e] text-base md:text-lg leading-relaxed max-w-2xl mb-12 font-light"
          >
            I design and build sophisticated digital products — from CRM platforms that manage millions in revenue, to blazing-fast luxury marketing websites that convert visitors into clients. Every pixel, every API, every animation — handcrafted with obsessive precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-[#ae9e85] hover:bg-[#c7b697] text-[#0a0906] font-semibold text-sm px-7 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(174,158,133,0.3)]"
            >
              Let's Work Together
              <ArrowIcon />
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium text-sm px-7 py-4 rounded-full transition-all duration-300"
            >
              View My Work
            </a>
          </motion.div>

          {/* Social quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <a href="https://www.linkedin.com/in/kumar-harsh-anand" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#ae9e85] hover:border-[#ae9e85]/40 transition-all duration-300">
              <LinkedInIcon />
            </a>
            <a href="https://www.instagram.com/harshanand437" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#ae9e85] hover:border-[#ae9e85]/40 transition-all duration-300">
              <InstagramIcon />
            </a>
            <a href="mailto:anandharsh437@gmail.com"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#ae9e85] hover:border-[#ae9e85]/40 transition-all duration-300">
              <EmailIcon />
            </a>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <span className="text-[11px] text-white/25 tracking-widest">Follow for updates</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          STATS STRIP
          ════════════════════════════════════════════ */}
      <section className="bg-[#111009] border-y border-white/[0.05] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-white/[0.05]">
          {[
            { value: 6, label: "Modules Built", suffix: "+" },
            { value: 15, label: "Tables in Schema", suffix: "+" },
            { value: 100, label: "Components Created", suffix: "+" },
            { value: 1, label: "Years in Production", suffix: "" },
          ].map((s, i) => (
            <div key={i} className={i === 0 ? "" : "pl-10"}>
              <StatCard value={s.value} label={s.label} suffix={s.suffix} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ABOUT — SPLIT LAYOUT
          ════════════════════════════════════════════ */}
      <section className="bg-[#0c0b08] py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left — Portrait & bio card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative"
          >
            {/* Portrait frame */}
            <div className="relative w-full max-w-[400px] mx-auto">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#ae9e85]/50 z-10" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#ae9e85]/50 z-10" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#ae9e85]/50 z-10" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#ae9e85]/50 z-10" />
              
              <div className="bg-gradient-to-br from-[#1a1914] to-[#0f0e0b] border border-white/[0.06] rounded-xl p-10 text-center">
                {/* Avatar placeholder — add your photo here */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ae9e85] to-[#7a705e] mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-[#0a0906] shadow-xl">
                  KH
                </div>
                <h2 className="text-white text-xl font-bold tracking-tight mb-1">Kumar Harsh Anand</h2>
                <p className="text-[#ae9e85] text-sm tracking-wider mb-6">Senior Software Engineer & UX Architect</p>
                <div className="space-y-3 text-left">
                  {[
                    { icon: <EmailIcon />, text: "anandharsh437@gmail.com", href: "mailto:anandharsh437@gmail.com" },
                    { icon: <PhoneIcon />, text: "+91 82353 37180", href: "tel:+918235337180" },
                  ].map((item) => (
                    <a key={item.href} href={item.href}
                      className="flex items-center gap-3 text-[#7a705e] hover:text-[#ae9e85] transition-colors text-sm group"
                    >
                      <span className="text-[#ae9e85]/60 group-hover:text-[#ae9e85] transition-colors">{item.icon}</span>
                      {item.text}
                    </a>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-white/[0.05]">
                  <a href="https://www.linkedin.com/in/kumar-harsh-anand" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#7a705e] hover:text-[#ae9e85] transition-colors">
                    <LinkedInIcon /> LinkedIn
                  </a>
                  <div className="w-px h-4 bg-white/10" />
                  <a href="https://www.instagram.com/harshanand437" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#7a705e] hover:text-[#ae9e85] transition-colors">
                    <InstagramIcon /> Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Floating skill chip */}
            <div className="absolute -right-4 top-8 bg-[#ae9e85] text-[#0a0906] text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-lg hidden lg:block">
              Open to Projects
            </div>
          </motion.div>

          {/* Right — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#ae9e85] font-medium block mb-4">About Me</span>
            <h2 className="text-white text-4xl font-bold tracking-tight mb-6 leading-tight">
              Precision-crafted<br />digital products —<br />
              <span className="text-[#ae9e85]">end to end.</span>
            </h2>
            <p className="text-[#7a705e] text-base leading-relaxed mb-10">
              I work at the intersection of engineering and design — building systems that are architecturally sound, visually exceptional, and genuinely useful. My work on the Imagica Holidays ecosystem spanned 12+ months, covering a complete enterprise CRM, a luxury marketing website, automated pipelines, finance modules, and live API integrations.
            </p>

            {/* What I do list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                "Custom CRM Development",
                "Premium Website Design",
                "API & Backend Engineering",
                "UI / UX System Design",
                "DevOps & Deployment",
                "Motion & Interaction Design",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-[#a09383]">
                  <span className="text-[#ae9e85] flex-shrink-0"><CheckIcon /></span>
                  {item}
                </div>
              ))}
            </div>

            {/* Skill bars */}
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <SkillBar key={skill.label} label={skill.label} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROJECTS GRID
          ════════════════════════════════════════════ */}
      <section id="projects" className="bg-[#0a0906] py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.3em] text-[#ae9e85] font-medium block mb-4"
            >
              What I Built for Imagica Holidays
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white text-4xl md:text-5xl font-bold tracking-tight"
            >
              A Complete Digital
              <br />
              <span className="text-[#ae9e85]">Ecosystem.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT SECTION
          ════════════════════════════════════════════ */}
      <section id="contact" className="bg-[#0c0b08] py-28 px-6 md:px-12 lg:px-20 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          
          {/* Left text */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#ae9e85] font-medium block mb-5">Get in Touch</span>
              <h2 className="text-white text-4xl font-bold tracking-tight mb-6 leading-snug">
                Let's build<br />something<br />
                <span className="text-[#ae9e85]">extraordinary.</span>
              </h2>
              <p className="text-[#7a705e] text-sm leading-relaxed mb-8">
                Whether you're a travel agency, hospitality brand, or any business that wants a premium custom website, CRM, or digital platform — I'd love to hear from you.
              </p>

              {/* Contact chips */}
              <div className="space-y-3">
                {[
                  { icon: <EmailIcon />, label: "Email", value: "anandharsh437@gmail.com", href: "mailto:anandharsh437@gmail.com" },
                  { icon: <PhoneIcon />, label: "Phone", value: "+91 82353 37180", href: "tel:+918235337180" },
                  { icon: <LinkedInIcon />, label: "LinkedIn", value: "kumar-harsh-anand", href: "https://www.linkedin.com/in/kumar-harsh-anand" },
                  { icon: <InstagramIcon />, label: "Instagram", value: "@harshanand437", href: "https://www.instagram.com/harshanand437" },
                ].map((c) => (
                  <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] hover:border-[#ae9e85]/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <span className="text-[#ae9e85] group-hover:scale-110 transition-transform">{c.icon}</span>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-[#7a705e] font-medium">{c.label}</div>
                      <div className="text-sm text-[#d5cab5] font-medium">{c.value}</div>
                    </div>
                    <ArrowIcon />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-[#131210] border border-white/[0.06] rounded-2xl p-8 md:p-10"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ae9e85]/10 border border-[#ae9e85]/30 flex items-center justify-center mx-auto mb-6">
                      <CheckIcon />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-3">Message Received!</h3>
                    <p className="text-[#7a705e] text-sm max-w-sm mx-auto">
                      Thank you for reaching out. Kumar Harsh Anand will review your inquiry and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-xs text-[#ae9e85] hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl font-bold mb-1">Start a Conversation</h3>
                      <p className="text-[#7a705e] text-sm">Tell me about your project and I'll get back to you promptly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#7a705e] mb-2 font-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Alex Johnson"
                          className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ae9e85]/50 text-white placeholder:text-white/20 text-sm px-4 py-3.5 rounded-xl outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#7a705e] mb-2 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ae9e85]/50 text-white placeholder:text-white/20 text-sm px-4 py-3.5 rounded-xl outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#7a705e] mb-2 font-medium">
                          Company / Business
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="Elite Travel Co."
                          className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ae9e85]/50 text-white placeholder:text-white/20 text-sm px-4 py-3.5 rounded-xl outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#7a705e] mb-2 font-medium">
                          Project Budget (INR)
                        </label>
                        <select
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ae9e85]/50 text-white text-sm px-4 py-3.5 rounded-xl outline-none transition-all"
                          style={{ colorScheme: "dark" }}
                        >
                          <option value="" disabled>Select range...</option>
                          <option value="under-50k">Under ₹50,000</option>
                          <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                          <option value="1l-3l">₹1,00,000 – ₹3,00,000</option>
                          <option value="3l-plus">₹3,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#7a705e] font-medium">
                          Tell Me About Your Project *
                        </label>
                        <span className="text-[10px] text-white/20">{chars}/500</span>
                      </div>
                      <textarea
                        required
                        rows={5}
                        maxLength={500}
                        value={form.message}
                        onChange={(e) => { setForm({ ...form, message: e.target.value }); setChars(e.target.value.length); }}
                        placeholder="Describe what you want to build — a website, CRM, booking system, or full digital platform..."
                        className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ae9e85]/50 text-white placeholder:text-white/20 text-sm px-4 py-3.5 rounded-xl outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#ae9e85] hover:bg-[#c7b697] disabled:opacity-60 text-[#0a0906] font-bold text-sm py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(174,158,133,0.25)] group"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="group-hover:translate-x-1 transition-transform">
                            <ArrowIcon />
                          </span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BOTTOM ATTRIBUTION STRIP
          ════════════════════════════════════════════ */}
      <section className="bg-[#0a0906] border-t border-white/[0.04] py-8 px-6 text-center">
        <p className="text-[#7a705e] text-xs tracking-widest uppercase">
          This portfolio page is crafted as a part of the{" "}
          <Link href="/" className="text-[#ae9e85] hover:underline">Imagica Holidays</Link>
          {" "}digital platform — a full-stack product designed &amp; engineered by Kumar Harsh Anand in 2025–2026.
        </p>
      </section>

      <Footer />
    </>
  );
}
