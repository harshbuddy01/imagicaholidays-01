'use client';

import React from 'react';
import Image from 'next/image';

export default function MaintenanceScreen() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#07090e] text-[#f8fafc] font-sans selection:bg-[#c5a880]/30 selection:text-[#fff]">
      {/* Background cinematic imagery with velvet luxury overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')",
            filter: "brightness(0.28) contrast(1.15) saturate(0.85)"
          }}
        />
        {/* Multi-layered soft vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/95 via-[#07090e]/70 to-[#07090e]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07090e]/50 to-[#07090e]" />
      </div>

      {/* Subtle top subtle border glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/40 to-transparent z-10" />

      {/* Top Header / Branding */}
      <header className="relative z-10 w-full pt-10 pb-4 px-6 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full p-1 border border-[#c5a880]/40 bg-[#0c1017]/80 backdrop-blur-md shadow-lg flex items-center justify-center">
            <Image
              src="/logo_transparent.png"
              alt="Imagica Holidays Logo"
              width={38}
              height={38}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="block text-xs md:text-sm font-semibold tracking-[0.25em] text-[#e2e8f0] uppercase font-serif">
              Imagica Holidays
            </span>
            <span className="block text-[9px] md:text-[10px] tracking-[0.3em] text-[#c5a880] uppercase font-light">
              Bespoke Luxury Journeys
            </span>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a880]/30 bg-[#0c1017]/60 backdrop-blur-md text-[11px] tracking-wider text-[#e2d5c3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
          <span>Scheduled Refinement</span>
        </div>
      </header>

      {/* Center Content Section */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-12 md:py-16 text-center my-auto flex flex-col items-center">
        
        {/* Subtle decorative badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/25 bg-[#c5a880]/10 backdrop-blur-md">
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.25em] text-[#e5c9a3] uppercase">
            Private Travel Studio
          </span>
        </div>

        {/* Primary Elegant Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#fdfbf7] font-serif leading-[1.15] mb-4">
          This website is under maintenance.
        </h1>

        {/* Italic Graceful Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-[#c5a880] font-serif italic font-light tracking-wide mb-8">
          It will be back soon.
        </p>

        {/* Delicate divider */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/60 to-transparent mb-8" />

        {/* Narrative editorial paragraph */}
        <p className="max-w-xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#94a3b8] font-light mb-10 px-4">
          We are currently elevating our digital showcase to present an even finer collection of handcrafted itineraries and retreat sanctuaries. While our online portal is temporarily paused, our private concierge remains at your service.
        </p>

        {/* Refined Concierge Contact Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md justify-center">
          {/* Direct WhatsApp Concierge Button */}
          <a
            href="https://wa.me/916291426647?text=Hi%20Imagica%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20a%20travel%20itinerary."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#c5a880] to-[#b39369] hover:from-[#d4b78f] hover:to-[#c5a880] text-[#07090e] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(197,168,128,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#07090e]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp Concierge</span>
          </a>

          {/* Direct Email Concierge Button */}
          <a
            href="mailto:support@imagicaholidays.com?subject=Travel%20Inquiry%20%E2%80%94%20Imagica%20Holidays"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-[#e2e8f0] font-medium text-xs tracking-wider transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#c5a880]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>support@imagicaholidays.com</span>
          </a>
        </div>

        {/* Private phone line */}
        <p className="mt-8 text-[11px] text-[#64748b] tracking-wider uppercase">
          Direct Line: <a href="tel:+916291426647" className="text-[#c5a880] hover:underline font-mono">+91 62914 26647</a>
        </p>
      </main>

      {/* Refined Minimalist Footer */}
      <footer className="relative z-10 w-full py-8 px-6 text-center border-t border-white/5">
        <p className="text-[11px] tracking-[0.2em] text-[#64748b] uppercase font-light">
          © {new Date().getFullYear()} Imagica Holidays • Handcrafted Journeys Across India & Beyond
        </p>
      </footer>
    </div>
  );
}
