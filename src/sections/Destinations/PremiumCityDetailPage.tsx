"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { fetchDestinationCms, DestinationCmsData } from "@/lib/api";

interface QuickInfoItem {
  label: string;
  value: string;
}

interface WhyVisitItem {
  title: string;
  desc: string;
  icon: string;
}

interface AttractionItem {
  name: string;
  tag: string;
  image: string;
  short: string;
}

interface SeasonItem {
  name: string;
  months: string;
  temp: string;
  desc: string;
  color: string;
  recommended: boolean;
}

interface TourPackageItem {
  title: string;
  price: string;
  duration: string;
  tag?: string;
  image: string;
}

export interface PremiumCityDetailPageProps {
  citySlug: string;
  cityName: string;
  stateName: string;
  tagline: string;
  heroImage: string;
  quickInfo: QuickInfoItem[];
  whyVisit: WhyVisitItem[];
  attractions: AttractionItem[];
  seasons: SeasonItem[];
  tourPackages: TourPackageItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Map raw string icons/emojis to clean golden line art SVGs for a premium look
const renderSectionIcon = (iconStr: string) => {
  switch (iconStr) {
    case "🏔️":
    case "mountain":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 20h20L12 3zM12 3l5 8.5M12 3l-5 8.5M7 11.5h10" />
        </svg>
      );
    case "🚂":
    case "train":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <rect x={3} y={3} width={18} height={14} rx={2} />
          <path d="M7 21h10M5 17h14M12 9v4M9 11h6" />
        </svg>
      );
    case "🍵":
    case "tea":
    case "leaf":
    case "🍃":
    case "🍀":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3C8 3 5 7 5 12s3 9 7 9c4 0 7-4 7-9S16 3 12 3zM5 12h14" />
        </svg>
      );
    case "🐘":
    case "wildlife":
    case "deer":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case "🛶":
    case "boat":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c4-2 14-2 18 0l-2 6H5l-2-6zM8 12l4-8 4 8" />
        </svg>
      );
    case "🌸":
    case "flower":
    case "bud":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      );
    case "✨":
    case "sparkle":
    case "magic":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-5.714L5 13l5.714-2.286L13 5z" />
        </svg>
      );
    case "🏰":
    case "palace":
    case "fort":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
        </svg>
      );
    case "🏖️":
    case "beach":
    case "sun":
      return (
        <svg className="w-8 h-8 text-[#a5813b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      );
    default:
      return <span className="text-3xl text-[#a5813b]">{iconStr}</span>;
  }
};

export default function PremiumCityDetailPage({
  citySlug,
  cityName,
  stateName,
  tagline,
  heroImage,
  quickInfo: fallbackQuickInfo,
  whyVisit: fallbackWhyVisit,
  attractions: fallbackAttractions,
  seasons: fallbackSeasons,
  tourPackages: fallbackTourPackages,
}: PremiumCityDetailPageProps) {
  const [visibleAttractions, setVisibleAttractions] = useState(6);
  const [cmsData, setCmsData] = useState<DestinationCmsData | null>(null);

  useEffect(() => {
    fetchDestinationCms(citySlug).then((data) => {
      if (data) {
        setCmsData(data);
      }
    });
  }, [citySlug]);

  // Per-city unique inline SVG watermarks — each city gets its own artistic identity
  const citySketchSVGs: Record<string, React.ReactNode> = {
    gangtok: (
      // Buddhist monastery on a mountain ridge with prayer flags
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M40 280 L100 180 L130 220 L160 140 L200 180 L240 120 L280 180 L310 200 L360 280Z" stroke="#628ba8" strokeWidth="2" fill="none"/>
        <rect x="175" y="155" width="50" height="65" stroke="#628ba8" strokeWidth="1.5" fill="none"/>
        <path d="M165 155 L200 130 L235 155Z" stroke="#628ba8" strokeWidth="1.5" fill="none"/>
        <path d="M120 100 L130 100 M140 105 L150 105 M160 100 L170 100 M180 108 L190 108 M200 100 L210 100" stroke="#628ba8" strokeWidth="1" opacity="0.8" strokeDasharray="2 4"/>
        <path d="M120 100 L210 100" stroke="#628ba8" strokeWidth="0.6" strokeDasharray="3 6"/>
      </svg>
    ),
    darjeeling: (
      // Toy train on steep hillside with tea bushes
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M20 280 Q80 240 140 220 Q200 200 260 180 Q320 160 380 140" stroke="#a5813b" strokeWidth="3" fill="none"/>
        <rect x="100" y="200" width="60" height="25" rx="3" stroke="#a5813b" strokeWidth="2" fill="none"/>
        <rect x="105" y="207" width="14" height="12" stroke="#a5813b" strokeWidth="1" fill="none"/>
        <rect x="122" y="207" width="14" height="12" stroke="#a5813b" strokeWidth="1" fill="none"/>
        <circle cx="108" cy="227" r="5" stroke="#a5813b" strokeWidth="1.5" fill="none"/>
        <circle cx="153" cy="227" r="5" stroke="#a5813b" strokeWidth="1.5" fill="none"/>
        <path d="M98 202 L90 195 L95 195" stroke="#a5813b" strokeWidth="1.5"/>
        <path d="M20 265 Q60 258 100 260 Q150 258 200 262 Q250 258 300 260 Q340 258 380 262" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M20 275 Q60 268 100 270 Q150 268 200 272" stroke="#a5813b" strokeWidth="0.8" fill="none" opacity="0.3"/>
      </svg>
    ),
    pelling: (
      // Kanchenjunga peaks with suspension bridge silhouette
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M20 280 L80 160 L120 200 L160 100 L200 150 L240 80 L280 140 L320 100 L370 180 L390 280Z" stroke="#628ba8" strokeWidth="2" fill="none"/>
        <path d="M50 280 L350 280" stroke="#628ba8" strokeWidth="3"/>
        <path d="M80 280 Q200 220 320 280" stroke="#628ba8" strokeWidth="2.5" fill="none"/>
        <path d="M80 280 L100 240" stroke="#628ba8" strokeWidth="1.5"/>
        <path d="M320 280 L300 240" stroke="#628ba8" strokeWidth="1.5"/>
        <path d="M100 240 L300 240" stroke="#628ba8" strokeWidth="1"/>
        <path d="M130 260 L130 242 M160 255 L160 241 M190 252 L190 240 M220 255 L220 241 M250 260 L250 242 M280 262 L280 243" stroke="#628ba8" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
    lachung: (
      // Alpine valley with rhododendron blooms and snow
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M20 280 L60 180 L100 220 L140 130 L180 170 L220 90 L260 160 L300 120 L340 180 L380 280Z" stroke="#628ba8" strokeWidth="2" fill="none"/>
        <circle cx="80" cy="180" r="15" stroke="#8ba87e" strokeWidth="1.5" fill="none"/>
        <circle cx="80" cy="175" r="8" stroke="#8ba87e" strokeWidth="1"/>
        <circle cx="140" cy="230" r="12" stroke="#8ba87e" strokeWidth="1.5" fill="none"/>
        <circle cx="140" cy="225" r="7" stroke="#8ba87e" strokeWidth="1"/>
        <circle cx="300" cy="220" r="12" stroke="#8ba87e" strokeWidth="1.5" fill="none"/>
        <path d="M200 90 L180 95 L200 100 L220 95Z" stroke="#628ba8" strokeWidth="1" fill="none" opacity="0.5"/>
      </svg>
    ),
    munnar: (
      // Tea garden terraces with sun over hills
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M20 280 Q80 240 140 260 Q200 240 260 260 Q320 240 380 260" stroke="#4b8258" strokeWidth="2" fill="none"/>
        <path d="M20 260 Q80 220 140 240 Q200 220 260 240 Q320 220 380 240" stroke="#4b8258" strokeWidth="2" fill="none"/>
        <path d="M20 240 Q80 200 140 220 Q200 200 260 220 Q320 200 380 220" stroke="#4b8258" strokeWidth="1.5" fill="none"/>
        <path d="M20 220 Q80 180 140 200 Q200 180 260 200 Q320 180 380 200" stroke="#4b8258" strokeWidth="1.5" fill="none"/>
        <circle cx="340" cy="80" r="30" stroke="#d4a853" strokeWidth="2" fill="none"/>
        <path d="M340 44 L340 34 M340 126 L340 116 M304 80 L294 80 M376 80 L386 80 M316 56 L309 49 M371 111 L378 118 M364 56 L371 49 M316 104 L309 111" stroke="#d4a853" strokeWidth="1.5" opacity="0.6"/>
      </svg>
    ),
    wayanad: (
      // Ancient cave rock carvings and forest trees
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M40 220 Q80 200 100 180 Q130 150 120 200 Q140 180 160 200 Q180 160 200 200 Q220 170 240 200 Q250 180 280 220 L280 280 L40 280Z" stroke="#4b8258" strokeWidth="2" fill="none"/>
        <circle cx="90" cy="192" r="8" stroke="#4b8258" strokeWidth="1.5" fill="none"/>
        <path d="M80 192 L100 192 M90 182 L90 202" stroke="#4b8258" strokeWidth="1"/>
        <path d="M160 198 Q165 188 175 192 Q180 200 170 205 Q160 202 160 198Z" stroke="#4b8258" strokeWidth="1.2" fill="none"/>
        <path d="M320 280 L320 170 Q330 155 340 145 Q350 155 360 170 L360 280" stroke="#4b8258" strokeWidth="1.5" fill="none"/>
        <path d="M330 200 Q340 185 360 195 M325 220 Q340 205 365 215" stroke="#4b8258" strokeWidth="1" fill="none" opacity="0.7"/>
      </svg>
    ),
    goa: (
      // Beach sunset with lighthouse and waves
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <circle cx="320" cy="100" r="45" stroke="#d4a853" strokeWidth="2" fill="none"/>
        <path d="M320 50 L320 34 M320 166 L320 150 M270 100 L254 100 M366 100 L382 100 M288 68 L277 57 M363 143 L374 154 M352 68 L363 57 M288 132 L277 143" stroke="#d4a853" strokeWidth="1.5" opacity="0.5"/>
        <path d="M20 200 Q80 185 140 195 Q200 182 260 195 Q320 182 380 195" stroke="#3f888f" strokeWidth="2" fill="none"/>
        <path d="M20 215 Q80 200 140 210 Q200 197 260 210 Q320 197 380 210" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <path d="M20 230 Q80 215 140 225 Q200 212 260 225 Q320 212 380 225" stroke="#3f888f" strokeWidth="1" fill="none"/>
        <rect x="90" y="150" width="8" height="45" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <path d="M85 150 L98 150 L98 158 L85 158Z" stroke="#3f888f" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    jaipur: (
      // Hawa Mahal facade silhouette
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <rect x="80" y="80" width="240" height="170" stroke="#c9903b" strokeWidth="2" fill="none"/>
        <path d="M80 80 L95 60 L110 80 M112 80 L127 60 L142 80 M144 80 L159 60 L174 80 M176 80 L191 60 L206 80 M208 80 L223 60 L238 80 M240 80 L255 60 L270 80 M272 80 L287 60 L302 80 M304 80 L319 65 L320 80" stroke="#c9903b" strokeWidth="1.5" fill="none"/>
        <path d="M80 115 L320 115 M80 145 L320 145 M80 175 L320 175 M80 205 L320 205" stroke="#c9903b" strokeWidth="0.8" opacity="0.5"/>
        <rect x="90" y="120" width="20" height="22" stroke="#c9903b" strokeWidth="1" fill="none" opacity="0.7"/>
        <rect x="118" y="120" width="20" height="22" stroke="#c9903b" strokeWidth="1" fill="none" opacity="0.7"/>
        <rect x="146" y="120" width="20" height="22" stroke="#c9903b" strokeWidth="1" fill="none" opacity="0.7"/>
        <rect x="174" y="120" width="20" height="22" stroke="#c9903b" strokeWidth="1" fill="none" opacity="0.7"/>
      </svg>
    ),
    udaipur: (
      // Lake Pichola with City Palace reflection
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <rect x="120" y="60" width="160" height="130" stroke="#c9903b" strokeWidth="2" fill="none"/>
        <path d="M100 60 L115 40 L120 60 M145 60 L155 38 L165 60 M185 60 L200 35 L215 60 M235 60 L245 38 L255 60 M270 60 L275 40 L280 60" stroke="#c9903b" strokeWidth="1.5" fill="none"/>
        <path d="M40 210 Q200 195 360 210" stroke="#3f888f" strokeWidth="1" fill="none"/>
        <path d="M40 220 Q200 205 360 220" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <path d="M40 230 Q200 215 360 230" stroke="#3f888f" strokeWidth="1" fill="none"/>
        {/* Reflection */}
        <path d="M120 210 L280 210 L280 270 L120 270Z" stroke="#c9903b" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4 4"/>
      </svg>
    ),
    "port-blair": (
      // Cellular Jail and underwater coral reef
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <rect x="140" y="80" width="120" height="160" stroke="#3f888f" strokeWidth="2" fill="none"/>
        <rect x="180" y="50" width="40" height="30" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <path d="M140 110 L260 110 M140 135 L260 135 M140 160 L260 160 M140 185 L260 185 M140 210 L260 210" stroke="#3f888f" strokeWidth="0.8" opacity="0.5"/>
        <path d="M60 240 Q65 225 70 240 Q75 225 80 240 Q85 225 90 240" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <path d="M100 245 Q105 230 110 245 Q115 230 120 245 Q125 230 130 245" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <path d="M300 245 Q305 228 310 245 Q315 228 320 245 Q325 228 330 245" stroke="#3f888f" strokeWidth="1.5" fill="none"/>
        <circle cx="75" cy="220" r="5" stroke="#3f888f" strokeWidth="1" fill="none"/>
        <circle cx="315" cy="222" r="5" stroke="#3f888f" strokeWidth="1" fill="none"/>
      </svg>
    ),
    kolkata: (
      // Howrah Bridge with Victoria Memorial dome
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M20 220 L20 120 L180 100 L380 120 L380 220" stroke="#a5813b" strokeWidth="2" fill="none"/>
        <path d="M20 150 Q200 120 380 150" stroke="#a5813b" strokeWidth="2.5" fill="none"/>
        <path d="M20 180 Q200 160 380 180" stroke="#a5813b" strokeWidth="2" fill="none"/>
        <path d="M75 220 L75 100 M155 220 L155 100 M245 220 L245 100 M325 220 L325 100" stroke="#a5813b" strokeWidth="1" opacity="0.5"/>
        <path d="M20 220 L380 220" stroke="#a5813b" strokeWidth="2.5"/>
        {/* Victoria Memorial dome */}
        <rect x="165" y="60" width="70" height="55" stroke="#a5813b" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M165 60 Q200 40 235 60" stroke="#a5813b" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M192 60 L192 45 L208 45 L208 60" stroke="#a5813b" strokeWidth="1" fill="none" opacity="0.5"/>
      </svg>
    ),
    ooty: (
      // Nilgiri mountain railway with lake panorama
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-full opacity-[0.06]">
        <path d="M20 280 Q60 250 100 240 Q140 225 180 235 Q220 218 260 225 Q300 210 380 220" stroke="#9a6b3b" strokeWidth="2.5" fill="none"/>
        <rect x="100" y="222" width="50" height="22" rx="2" stroke="#9a6b3b" strokeWidth="1.5" fill="none"/>
        <rect x="105" y="228" width="12" height="10" stroke="#9a6b3b" strokeWidth="1" fill="none"/>
        <rect x="120" y="228" width="12" height="10" stroke="#9a6b3b" strokeWidth="1" fill="none"/>
        <circle cx="108" cy="245" r="4" stroke="#9a6b3b" strokeWidth="1.2" fill="none"/>
        <circle cx="143" cy="245" r="4" stroke="#9a6b3b" strokeWidth="1.2" fill="none"/>
        <path d="M96 222 L90 216 L93 216" stroke="#9a6b3b" strokeWidth="1.2"/>
        {/* Lake */}
        <path d="M20 260 Q100 252 180 258 Q250 252 350 258" stroke="#628ba8" strokeWidth="1.5" fill="none"/>
        <path d="M20 268 Q100 260 180 266 Q250 260 350 266" stroke="#628ba8" strokeWidth="1" fill="none" opacity="0.6"/>
      </svg>
    ),
  };

  const currentHeroImage = cmsData?.pageContent?.heroImage || cmsData?.heroImage || heroImage;
  const currentAttractions = cmsData?.pageContent?.attractions && cmsData.pageContent.attractions.length > 0
    ? cmsData.pageContent.attractions
    : fallbackAttractions;

  // Determine regional aesthetics based on state name for premium personalization
  const stateLower = stateName.toLowerCase();
  let gradientOverlay = "from-[#1a1914]/60";
  let themeBg = "bg-[#f4ebd9]";
  let textHighlight = "text-[#a5813b]";

  if (stateLower.includes("sikkim") || stateLower.includes("bengal") || stateLower.includes("himalayan")) {
    gradientOverlay = "from-sky-950/65";
    themeBg = "bg-[#edf1f4]";
    textHighlight = "text-[#628ba8]";
  } else if (stateLower.includes("kerala") || stateLower.includes("munnar") || stateLower.includes("wayanad")) {
    gradientOverlay = "from-emerald-950/60";
    themeBg = "bg-[#eaf0e9]";
    textHighlight = "text-[#4b8258]";
  } else if (stateLower.includes("goa") || stateLower.includes("coast") || stateLower.includes("andaman")) {
    gradientOverlay = "from-teal-950/60";
    themeBg = "bg-[#e9f2f2]";
    textHighlight = "text-[#3f888f]";
  } else if (stateLower.includes("rajasthan")) {
    gradientOverlay = "from-amber-950/60";
    themeBg = "bg-[#f9f3e6]";
    textHighlight = "text-[#c9903b]";
  }

  // Pick this city's unique SVG watermark
  const CitySketchSVG = citySketchSVGs[citySlug] || null;

  // Determine which sketch .webp to tile behind the page
  let sketchBgPattern = "/images/destinations_sketch_bg.webp";
  if (stateLower.includes("sikkim") || stateLower.includes("bengal") || stateLower.includes("himalayan")) {
    sketchBgPattern = "/images/activities_sketch_bg.webp";
  } else if (stateLower.includes("kerala") || stateLower.includes("goa") || stateLower.includes("andaman")) {
    sketchBgPattern = "/images/stays_sketch_bg.webp";
  }

  return (
    <div className={`relative ${themeBg} text-[#3d3831] overflow-hidden`}>
      {/* Tiled hand-drawn sketch background — absolute (not fixed) to avoid scroll repaint */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-multiply bg-repeat bg-[size:420px] md:bg-[size:700px]"
        style={{ backgroundImage: `url('${sketchBgPattern}')`, willChange: 'transform' }}
      />
      {/* Per-city unique SVG line art watermark overlay */}
      {CitySketchSVG && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
          <div className="absolute bottom-0 right-0 w-[65vw] h-[65vh] max-w-[750px] max-h-[560px]">
            {CitySketchSVG}
          </div>
          <div className="absolute top-[25%] left-0 w-[35vw] h-[35vh] max-w-[420px] max-h-[360px] opacity-40 scale-x-[-1]">
            {CitySketchSVG}
          </div>
        </div>
      )}
      {/* Natural paper texture — absolute (not fixed) to avoid scroll repaint */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.04] pointer-events-none z-0" />

      <Navbar />

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative h-[65vh] md:h-[85vh] min-h-[450px] md:min-h-[600px] overflow-hidden">
        <Image
          src={currentHeroImage}
          alt={`A stunning luxury tour visual of ${cityName}`}
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} via-black/15 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#ae9e85]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">
                {stateName}, India
              </span>
            </div>
            <h1 className="font-roman text-4xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">
              {cityName}
            </h1>
            <p className="font-roman text-base md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">
              {tagline}
            </p>
          </motion.div>
        </div>

        <div className="absolute top-20 left-6 w-12 h-12 md:w-20 md:h-20 border-t border-l border-white/10" />
        <div className="absolute bottom-6 right-6 w-12 h-12 md:w-20 md:h-20 border-b border-r border-white/10" />
      </section>

      {/* ══════════ 2. ABOUT + QUICK INFO ══════════ */}
      <section className="bg-transparent relative z-10 py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">About {cityName} Holidays</span>
              </div>
              <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-4 md:mb-6">
                Luxury {cityName} Tour Packages & Custom Retreats
              </h2>
              <div className="space-y-4">
                {cmsData?.aboutHtml ? (
                  <div 
                    className="text-[#5c544b] leading-relaxed space-y-4 font-serif"
                    dangerouslySetInnerHTML={{ __html: cmsData.aboutHtml }}
                  />
                ) : (
                  <p className="text-[#5c544b] leading-relaxed font-serif text-base">
                    {descriptionTextMapping[citySlug] || `Experience the pinnacle of luxury with our handcrafted ${cityName} tour packages. Hand-curated itineraries by regional specialists bring you deep into the heart of India's most pristine destinations. Enjoy luxury boutique accommodations, private transfers, and bespoke experiences tailored exclusively to your personal tastes.`}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {fallbackQuickInfo.map((info) => (
                  <div
                    key={info.label}
                    className="bg-white/40 backdrop-blur-sm border border-[#d5cab5]/50 p-5 rounded-sm hover:bg-white/60 transition-colors duration-300 shadow-sm"
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#ae9e85] mb-2">{info.label}</p>
                    <p className="font-roman text-lg font-semibold text-[#3d3831]">{info.value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/reserve"
                className="mt-6 flex items-center justify-center gap-2 bg-[#3d3831] text-[#f4ebd9] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#2a2520] rounded-sm shadow-md"
              >
                Plan My Journey
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 3. WHY VISIT ══════════ */}
      <section className="bg-[#1a1914] relative z-10 py-14 md:py-28 px-5 md:px-16 lg:px-24 text-[#f0e7d6] overflow-hidden">
        {/* Dark sketch pattern overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('/images/stays_sketch_bg.webp')] bg-repeat bg-[size:450px] md:bg-[size:800px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Discover What Makes It Special</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#f0e7d6] tracking-wide mt-3">
              Why Visit {cityName}?
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {fallbackWhyVisit.map((item, i) => (
              <div
                key={item.title}
                className="group border border-white/8 p-5 md:p-8 rounded-sm hover:border-[#ae9e85]/30 transition-colors duration-500 relative overflow-hidden bg-black/20"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ae9e85]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-5 block">{renderSectionIcon(item.icon)}</div>
                <h3 className="font-roman text-xl font-semibold text-[#f0e7d6] mb-3 tracking-wide">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#a09383]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. TOP ATTRACTIONS ══════════ */}
      <section className="bg-transparent relative z-10 py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Must-Visit Places</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Top Attractions in {cityName}
            </h2>
            <p className="text-sm text-[#7a705e] mt-4 max-w-lg mx-auto font-serif">
              From breathtaking natural wonders to heritage landmarks, here are the places you cannot miss.
            </p>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAttractions.slice(0, visibleAttractions).map((attr, i) => (
              <motion.div
                key={attr.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={(i % 3) * 0.1}
                className="group relative overflow-hidden rounded-sm bg-white border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={attr.image}
                    alt={attr.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 left-3 bg-[#ae9e85] text-white text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-sm shadow`}>
                    {attr.tag}
                  </span>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-roman text-lg font-semibold text-[#3d3831] mb-2">{attr.name}</h3>
                  <p className="text-xs text-stone-500 font-serif leading-relaxed">{attr.short}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleAttractions < currentAttractions.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleAttractions(currentAttractions.length)}
                className="border border-[#3d3831] px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d3831] transition-all duration-300 hover:bg-[#3d3831] hover:text-[#f4ebd9] rounded-sm"
              >
                View All Attractions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ 5. BEST TIME TO VISIT ══════════ */}
      <section className="bg-transparent relative z-10 py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Seasonal Guide</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Best Time to Visit {cityName}
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackSeasons.map((s, i) => (
              <div
                key={s.name}
                className={`relative p-6 rounded-sm border transition-all duration-300 hover:shadow-lg ${s.recommended
                  ? "bg-[#3d3831] text-[#f0e7d6] border-[#ae9e85]/30 shadow-md"
                  : "bg-white/50 text-[#3d3831] border-[#d5cab5]/40 hover:bg-white/80"
                  }`}
              >
                {s.recommended && (
                  <span className="absolute -top-3.5 left-6 bg-[#ae9e85] text-[#1a1914] text-[8px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-sm shadow">
                    Recommended
                  </span>
                )}
                <div className="w-3.5 h-3.5 rounded-full mb-4" style={{ backgroundColor: s.color }} />
                <h3 className="font-roman text-xl font-semibold mb-1">{s.name}</h3>
                <p className={`text-[10px] tracking-[0.15em] uppercase mb-3 ${s.recommended ? "text-[#d5cab5]" : "text-[#ae9e85]"}`}>
                  {s.months}
                </p>
                <p className="font-roman text-2xl font-medium mb-3">{s.temp}</p>
                <p className={`text-xs leading-relaxed font-serif ${s.recommended ? "text-[#a09383]" : "text-[#7a705e]"}`}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 6. TOUR PACKAGES ══════════ */}
      <section className="bg-transparent relative z-10 py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Curated Experiences</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Explore {cityName} Tour Packages
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackTourPackages.map((pkg, i) => (
              <div
                key={pkg.title}
                className="group rounded-sm overflow-hidden bg-white border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {pkg.tag && (
                      <span className="absolute top-3 left-3 bg-[#ae9e85] text-white text-[8px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-sm shadow">
                        {pkg.tag}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="font-roman text-xl font-bold text-white">{pkg.price}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-roman text-base font-semibold text-[#3d3831] mb-2 leading-snug">{pkg.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#ae9e85] font-bold">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" strokeLinecap="round" />
                      </svg>
                      {pkg.duration}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white pt-0">
                  <Link
                    href={`/reserve?destination=${encodeURIComponent(cityName)}`}
                    className="flex items-center justify-center gap-2 w-full border border-[#3d3831] py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3d3831] hover:bg-[#3d3831] hover:text-white transition-all duration-300 rounded-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 7. CTA BANNER ══════════ */}
      <section className="relative z-10 py-16 md:py-32 overflow-hidden">
        <Image
          src={currentHeroImage}
          alt={`Ready to plan your luxury journey to ${cityName}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-white tracking-wide mb-4">
              Ready to Explore {cityName}?
            </h2>
            <p className="text-sm text-white/70 mb-8 max-w-lg mx-auto font-serif">
              Browse our handcrafted boutique packages or consult with our destination experts to design your bespoke retreat.
            </p>
            <Link
              href={`/reserve?destination=${encodeURIComponent(cityName)}`}
              className="inline-flex items-center gap-3 bg-[#ae9e85] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#c7b697] rounded-sm shadow-lg"
            >
              Curate My Journey
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Fallback plain descriptions when CMS does not have it configured
const descriptionTextMapping: Record<string, string> = {
  gangtok: "Explore the scenic capital of Sikkim. Gangtok offers majestic Himalayan viewpoints, ancient Tibetan Buddhist monasteries, and vibrant cultural walks down MG Marg.",
  darjeeling: "The legendary Queen of Hills. Famous for rolling hills of tea gardens, panoramic sunrise views over Mt. Kanchenjunga from Tiger Hill, and the UNESCO heritage Toy Train.",
  pelling: "A peaceful monastery retreat in West Sikkim. Witness stunning mountain waterfalls, walk across the famous glass skywalk, and explore the ancient Pemayangtse ruins.",
  lachung: "A pristine high-altitude mountain village. Explore the gorgeous Yumthang Valley, zero-point snow peaks, and natural hot springs nestled in alpine meadows.",
  munnar: "The emerald tea garden capital of Kerala. Famous for its sprawling mist-covered mountains, lakes, waterfalls, and rich wilderness.",
  wayanad: "An organic wonderland in the Western Ghats. Known for ancient spice estates, caves, waterfalls, and private forest villas.",
  goa: "The ultimate beach getaway. Offers sandy coastlines, historic Portuguese architecture, and boutique resorts next to the Arabian Sea.",
  jaipur: "The historic Pink City. Step back in time with grand sandstone fortresses, astronomy observatories, and luxury royal palaces.",
  udaipur: "The romantic City of Lakes. Famous for majestic white marble palaces rising from calm lake waters.",
};
