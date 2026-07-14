"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   HAND-DRAWN "WALL SKETCH" SVGS (RAW Blueprints & Hand-Sketched Lines)
   ═══════════════════════════════════════════════════════════ */

// A wobbly, rough hand-drawn box border SVG
const HandDrawnBorder = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none text-[#ae9e85]/40"
    preserveAspectRatio="none"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
  >
    <path d="M 2,2 Q 50,1 98,3 Q 99,50 97,97 Q 50,99 3,98 Q 1,50 2,2 Z" />
    <path d="M 3,4 Q 50,3 97,2 Q 98,50 96,96 Q 50,98 4,97 Q 2,50 3,4 Z" opacity="0.5" />
  </svg>
);

// A sketchy system architecture drawing (looks like a pencil sketch on a wall)
const WallArchitectureSketch = () => (
  <svg
    viewBox="0 0 400 320"
    className="w-full max-w-[400px] text-[#ae9e85] opacity-80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* CLIENT DEVICE (Laptop Sketch) */}
    <path d="M 40,90 L 140,90 L 125,140 L 55,140 Z" />
    <path d="M 35,140 L 145,140 L 140,145 L 40,145 Z" />
    <text x="65" y="115" className="font-mono text-[9px] fill-current stroke-none" letterSpacing="1">PORTAL</text>

    {/* Wobbly Connection Line 1 */}
    <path d="M 140,115 Q 190,110 240,115" strokeDasharray="3 3" />
    <path d="M 235,110 L 243,115 L 235,120" />

    {/* API SERVER (Server Rack Sketch) */}
    <path d="M 245,60 L 345,62 L 345,160 L 245,158 Z" />
    {/* Rack slots */}
    <path d="M 250,75 L 340,77 M 250,85 L 340,87" />
    <path d="M 250,105 L 340,107 M 250,115 L 340,117" />
    <path d="M 250,135 L 340,137 M 250,145 L 340,147" />
    {/* Knobs */}
    <circle cx="260" cy="70" r="2" className="fill-current" />
    <circle cx="260" cy="100" r="2" className="fill-current" />
    <circle cx="260" cy="130" r="2" className="fill-current" />
    <text x="275" y="123" className="font-mono text-[10px] fill-current stroke-none" letterSpacing="1.5">CRM CORE</text>

    {/* Wobbly Connection Down to DB */}
    <path d="M 295,160 Q 298,210 215,225" strokeDasharray="3 3" />
    <path d="M 218,220 L 210,226 L 218,230" />

    {/* DATABASE (Cylinder Sketch) */}
    <path d="M 120,210 C 120,200 200,200 200,210 C 200,220 120,220 120,210 Z" />
    <path d="M 120,210 L 120,260 C 120,270 200,270 200,260 L 200,210" />
    <path d="M 120,235 C 120,245 200,245 200,235" />
    <text x="142" y="243" className="font-mono text-[10px] fill-current stroke-none" letterSpacing="2">SUPABASE</text>

    {/* CLOUD HOSTING VM BOUNDARY (Rough encircling sketch) */}
    <path d="M 20,25 C 150,10 380,20 385,150 C 390,260 260,310 130,305 C 10,300 5,160 20,25 Z" strokeWidth="0.6" strokeDasharray="5 5" />
    <text x="35" y="45" className="font-mono text-[8px] fill-current opacity-40 stroke-none" letterSpacing="1">GCP VM ENVIRONMENT (DOCKER)</text>
  </svg>
);

// Minimal hand-drawn organic branch
const OrganicBranch = () => (
  <svg
    viewBox="0 0 100 120"
    className="w-20 h-24 text-[#ae9e85]/30 pointer-events-none"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.8"
    strokeLinecap="round"
  >
    <path d="M 10,110 Q 25,70 70,25" />
    <path d="M 25,85 Q 40,75 55,60 C 42,66 32,76 25,85 Z" className="fill-current/5" />
    <path d="M 45,60 Q 60,50 72,32 C 60,40 50,50 45,60 Z" className="fill-current/5" />
    <path d="M 15,100 Q 22,95 30,85 C 22,88 17,95 15,100 Z" className="fill-current/5" />
  </svg>
);

export default function ArchitectPage() {
  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
         DARK-LIGHT MIX: MINIMALIST GRAPHIC SPLIT SCREEN
         ═══════════════════════════════════════════════════════════ */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0c0b08] text-[#f0e7d6] overflow-hidden pt-20">
        
        {/* LEFT PANEL: Deep Dark Slate with Rough Wall Sketches */}
        <div className="relative flex flex-col justify-between p-8 md:p-16 lg:p-20 bg-[#0c0b08] border-b lg:border-b-0 lg:border-r border-[#ae9e85]/10">
          
          {/* Subtle grid lines matching physical blueprints */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#ae9e85 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          {/* Header Title */}
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] font-semibold block">
              Architect / Creator
            </span>
            <h1 className="font-roman text-4xl md:text-5xl font-light tracking-wide text-white leading-tight">
              Kumar Harsh Anand
            </h1>
            <div className="w-16 h-px bg-[#ae9e85]/30 mt-4" />
          </div>

          {/* Wall sketch system diagram centered */}
          <div className="relative z-10 my-12 flex justify-center items-center py-10">
            <div className="absolute -top-4 -left-4">
              <OrganicBranch />
            </div>
            <WallArchitectureSketch />
          </div>

          {/* Brief Signature Statement */}
          <div className="relative z-10 max-w-sm">
            <p className="text-xs text-[#a09383] font-light leading-relaxed italic">
              "Every digital landscape requires structural discipline. These sketches illustrate the Dockerized GCP container cluster serving Imagica Holidays."
            </p>
          </div>

        </div>

        {/* RIGHT PANEL: Warm Natural Linen Light Background */}
        <div className="relative flex flex-col justify-between p-8 md:p-16 lg:p-20 bg-[#f9f7f2] text-[#1c1a17]">
          
          {/* Sketchy hand-drawn border around the content container */}
          <div className="absolute inset-6 md:inset-10 z-0">
            <HandDrawnBorder />
          </div>

          {/* Biography & Mission Statement */}
          <div className="relative z-10 space-y-8 mt-6">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#ae9e85] font-bold block">
              Digital Blueprint
            </span>
            
            <h2 className="font-roman text-2xl md:text-3xl font-light text-[#0c0b08] leading-relaxed">
              Custom systems designed with <br />
              <span className="font-roman italic text-[#ae9e85]">craftsmanship and logic.</span>
            </h2>

            <div className="text-xs md:text-sm text-[#4a453e] font-light leading-relaxed space-y-4 max-w-md">
              <p>
                A high-end travel website shouldn't feel like a boilerplate template. I specialize in building custom digital infrastructures where beautiful user experiences connect seamlessly to optimized backends.
              </p>
              <p>
                For Imagica Holidays, I built the entire custom CRM platform, automated dynamic PDF invoice systems, server-side Google review proxies, and managed VM configurations.
              </p>
            </div>
          </div>

          {/* Mini Blueprint Index (List of Modules) */}
          <div className="relative z-10 my-10 space-y-4 max-w-md">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#ae9e85] font-bold block border-b border-[#ae9e85]/20 pb-2">
              System Exhibition Index
            </span>
            <div className="divide-y divide-[#ae9e85]/10 text-xs">
              {[
                { no: "01", title: "Custom Travel CRM", desc: "Intake, profiles, & visual lead lifecycles." },
                { no: "02", title: "Dynamic PDF Invoice Pipeline", desc: "Automated billing via Razorpay & Puppeteer." },
                { no: "03", title: "Places Reviews Caching Engine", desc: "Secure proxy to display verified customer reviews." },
                { no: "04", title: "Docker Container Topology", desc: "Configured vm instances routing via Caddy." }
              ].map((item) => (
                <div key={item.no} className="py-3 flex items-start gap-4">
                  <span className="font-mono text-[#ae9e85] font-semibold">{item.no}</span>
                  <div>
                    <span className="font-medium text-[#1c1a17] block">{item.title}</span>
                    <span className="text-[11px] text-[#7a7266] font-light">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Hand-Drawn Contact Box */}
          <div className="relative z-10 p-6 bg-[#0c0b08] text-[#f0e7d6] rounded-sm shadow-xl">
            <div className="absolute inset-1.5 border border-[#ae9e85]/10 pointer-events-none" />
            
            <h3 className="font-roman text-sm text-white tracking-wider mb-4 font-light">
              Correspondence
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
              <div>
                <span className="text-[9px] text-[#ae9e85] uppercase tracking-wider block mb-1">Email Direct</span>
                <a href="mailto:anandharsh437@gmail.com" className="hover:text-white underline decoration-[#ae9e85]/40">
                  anandharsh437@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[9px] text-[#ae9e85] uppercase tracking-wider block mb-1">Phone / Whatsapp</span>
                <a href="tel:+918235337180" className="hover:text-white">
                  +91 82353 37180
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5 text-[10px] tracking-wider uppercase text-[#ae9e85]">
              <a href="https://www.linkedin.com/in/kumar-harsh-anand" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn →
              </a>
              <a href="https://www.instagram.com/harshanand437" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram →
              </a>
              <a href="https://github.com/harshbuddy01" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GitHub →
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* FOOTER STRIP */}
      <section className="bg-[#0c0b08] border-t border-[#ae9e85]/10 py-6 px-6 text-center text-[#7a705e] text-[9px] tracking-widest uppercase">
        Designed exclusively by Kumar Harsh Anand for the{" "}
        <Link href="/" className="text-[#ae9e85] hover:underline">Imagica Holidays</Link>
        {" "}Platform. All Rights Reserved © 2026.
      </section>

      <Footer />
    </>
  );
}
