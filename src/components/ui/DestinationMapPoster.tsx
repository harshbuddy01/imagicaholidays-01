"use client";

import React, { useMemo } from "react";
import Image from "next/image";

interface DestinationMapPosterProps {
  departurePort?: string;
  returnPort?: string;
  regions?: string;
  badges?: string[];
  title?: string;
  customMapUrl?: string | null;
  className?: string;
}

interface DestinationProfile {
  name: string;
  displayName: string;
  subtitle: string;
  coordinates: string;
  terrainType: "himalayan" | "backwaters" | "desert" | "coastal" | "island" | "standard";
  elevation?: string;
}

const DESTINATION_PROFILES: Record<string, DestinationProfile> = {
  gangtok: {
    name: "GANGTOK",
    displayName: "G A N G T O K",
    subtitle: "SIKKIM, INDIA",
    coordinates: "27.3389° N / 88.6065° E",
    terrainType: "himalayan",
    elevation: "1,650m",
  },
  darjeeling: {
    name: "DARJEELING",
    displayName: "D A R J E E L I N G",
    subtitle: "WEST BENGAL, INDIA",
    coordinates: "27.0378° N / 88.2632° E",
    terrainType: "himalayan",
    elevation: "2,042m",
  },
  lachung: {
    name: "LACHUNG",
    displayName: "L A C H U N G",
    subtitle: "NORTH SIKKIM, INDIA",
    coordinates: "27.6891° N / 88.7430° E",
    terrainType: "himalayan",
    elevation: "2,700m",
  },
  pelling: {
    name: "PELLING",
    displayName: "P E L L I N G",
    subtitle: "WEST SIKKIM, INDIA",
    coordinates: "27.3167° N / 88.2333° E",
    terrainType: "himalayan",
    elevation: "2,150m",
  },
  munnar: {
    name: "MUNNAR",
    displayName: "M U N N A R",
    subtitle: "KERALA, INDIA",
    coordinates: "10.0889° N / 77.0595° E",
    terrainType: "backwaters",
    elevation: "1,532m",
  },
  cochin: {
    name: "COCHIN",
    displayName: "K E R A L A",
    subtitle: "GOD'S OWN COUNTRY, INDIA",
    coordinates: "9.9312° N / 76.2673° E",
    terrainType: "backwaters",
    elevation: "3m",
  },
  kerala: {
    name: "KERALA",
    displayName: "K E R A L A",
    subtitle: "GOD'S OWN COUNTRY, INDIA",
    coordinates: "9.9312° N / 76.2673° E",
    terrainType: "backwaters",
    elevation: "12m",
  },
  thekkady: {
    name: "THEKKADY",
    displayName: "T H E K K A D Y",
    subtitle: "KERALA, INDIA",
    coordinates: "9.6031° N / 77.1615° E",
    terrainType: "backwaters",
    elevation: "900m",
  },
  alleppey: {
    name: "ALLEPPEY",
    displayName: "A L L E P P E Y",
    subtitle: "KERALA BACKWATERS, INDIA",
    coordinates: "9.4981° N / 76.3388° E",
    terrainType: "backwaters",
    elevation: "1m",
  },
  wayanad: {
    name: "WAYANAD",
    displayName: "W A Y A N A D",
    subtitle: "KERALA, INDIA",
    coordinates: "11.6854° N / 76.1320° E",
    terrainType: "backwaters",
    elevation: "700m",
  },
  jaipur: {
    name: "JAIPUR",
    displayName: "J A I P U R",
    subtitle: "RAJASTHAN, INDIA",
    coordinates: "26.9124° N / 75.7873° E",
    terrainType: "desert",
    elevation: "431m",
  },
  udaipur: {
    name: "UDAIPUR",
    displayName: "U D A I P U R",
    subtitle: "RAJASTHAN, INDIA",
    coordinates: "24.5854° N / 73.7125° E",
    terrainType: "desert",
    elevation: "598m",
  },
  jodhpur: {
    name: "JODHPUR",
    displayName: "J O D H P U R",
    subtitle: "RAJASTHAN, INDIA",
    coordinates: "26.2389° N / 73.0243° E",
    terrainType: "desert",
    elevation: "231m",
  },
  jaisalmer: {
    name: "JAISALMER",
    displayName: "J A I S A L M E R",
    subtitle: "RAJASTHAN, INDIA",
    coordinates: "26.9157° N / 70.9083° E",
    terrainType: "desert",
    elevation: "225m",
  },
  bikaner: {
    name: "BIKANER",
    displayName: "B I K A N E R",
    subtitle: "RAJASTHAN, INDIA",
    coordinates: "28.0229° N / 73.3119° E",
    terrainType: "desert",
    elevation: "242m",
  },
  rajasthan: {
    name: "RAJASTHAN",
    displayName: "R A J A S T H A N",
    subtitle: "LAND OF KINGS, INDIA",
    coordinates: "26.9124° N / 75.7873° E",
    terrainType: "desert",
    elevation: "350m",
  },
  goa: {
    name: "GOA",
    displayName: "G O A",
    subtitle: "WEST COAST, INDIA",
    coordinates: "15.2993° N / 74.1240° E",
    terrainType: "coastal",
    elevation: "5m",
  },
  "port blair": {
    name: "PORT BLAIR",
    displayName: "P O R T  B L A I R",
    subtitle: "ANDAMAN & NICOBAR, INDIA",
    coordinates: "11.6234° N / 92.7265° E",
    terrainType: "island",
    elevation: "16m",
  },
  kolkata: {
    name: "KOLKATA",
    displayName: "K O L K A T A",
    subtitle: "WEST BENGAL, INDIA",
    coordinates: "22.5726° N / 88.3639° E",
    terrainType: "standard",
    elevation: "9m",
  },
  sikkim: {
    name: "SIKKIM",
    displayName: "S I K K I M",
    subtitle: "HIMALAYAN FRONTIER, INDIA",
    coordinates: "27.5330° N / 88.5122° E",
    terrainType: "himalayan",
    elevation: "1,800m",
  },
};

function resolveDestinationProfile(
  dep = "",
  ret = "",
  reg = "",
  badges: string[] = [],
  title = ""
): DestinationProfile {
  const combined = `${dep} ${ret} ${reg} ${badges.join(" ")} ${title}`.toLowerCase();

  for (const [key, profile] of Object.entries(DESTINATION_PROFILES)) {
    if (combined.includes(key)) {
      return profile;
    }
  }

  // Fallback to departurePort or primary keyword
  const primaryName = dep.trim() || ret.trim() || "EXPEDITION";
  const formattedLetters = primaryName.toUpperCase().split("").join(" ");

  return {
    name: primaryName.toUpperCase(),
    displayName: formattedLetters,
    subtitle: "INDIA",
    coordinates: "27.0378° N / 88.2632° E",
    terrainType: "himalayan",
  };
}

export default function DestinationMapPoster({
  departurePort = "",
  returnPort = "",
  regions = "",
  badges = [],
  title = "",
  customMapUrl = null,
  className = "",
}: DestinationMapPosterProps) {
  const profile = useMemo(
    () => resolveDestinationProfile(departurePort, returnPort, regions, badges, title),
    [departurePort, returnPort, regions, badges, title]
  );

  // If a valid custom map image is provided from R2 or user upload, render that
  const hasValidCustomMap = Boolean(
    customMapUrl &&
      !customMapUrl.includes("pexels-photo-30156563") &&
      (customMapUrl.includes("r2") || customMapUrl.includes("terraink") || customMapUrl.includes("maps"))
  );

  if (hasValidCustomMap && customMapUrl) {
    return (
      <div className={`relative w-full h-full bg-[#0a121e] overflow-hidden ${className}`}>
        <Image
          src={customMapUrl}
          alt={`${profile.name} Cartographic Map`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 border border-[#d8be8f]/20 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full bg-[#08101d] text-[#d8be8f] select-none overflow-hidden flex flex-col justify-between ${className}`}
      style={{
        background: "radial-gradient(ellipse at 50% 35%, #0f1c30 0%, #08101d 70%, #050a12 100%)",
      }}
    >
      {/* ── Cartographic Hairline Border ── */}
      <div className="absolute inset-2 border border-[#d8be8f]/25 pointer-events-none z-10" />
      <div className="absolute inset-3 border border-[#d8be8f]/10 pointer-events-none z-10" />

      {/* Lat/Long corner tick marks */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t-2 border-l-2 border-[#d8be8f] z-20" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#d8be8f] z-20" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b-2 border-l-2 border-[#d8be8f] z-20" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b-2 border-r-2 border-[#d8be8f] z-20" />

      {/* Top Header Information Bar */}
      <div className="relative z-20 pt-4 px-5 flex items-center justify-between text-[8px] font-mono tracking-[0.2em] text-[#a5813b]/80 uppercase">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d8be8f] animate-pulse" />
          CARTOGRAPHY
        </span>
        <span className="text-[#d8be8f]/60">THEME: MIDNIGHT BLUE</span>
      </div>

      {/* ── Central Vector Cartography Terrain Canvas ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full opacity-90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid System */}
          <g stroke="#d8be8f" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="3 6">
            <line x1="50" y1="0" x2="50" y2="300" />
            <line x1="100" y1="0" x2="100" y2="300" />
            <line x1="150" y1="0" x2="150" y2="300" />
            <line x1="200" y1="0" x2="200" y2="300" />
            <line x1="250" y1="0" x2="250" y2="300" />
            <line x1="300" y1="0" x2="300" y2="300" />
            <line x1="350" y1="0" x2="350" y2="300" />
            <line x1="0" y1="50" x2="400" y2="50" />
            <line x1="0" y1="100" x2="400" y2="100" />
            <line x1="0" y1="150" x2="400" y2="150" />
            <line x1="0" y1="200" x2="400" y2="200" />
          </g>

          {/* ── TERRAIN SPECIFIC VECTORS ── */}
          {profile.terrainType === "himalayan" && (
            <g>
              {/* Mountain Ridge Elevation Contours (Organic Curves in Antique Gold) */}
              <path
                d="M-20,40 Q60,120 180,60 T380,40"
                stroke="#c5a059"
                strokeWidth="0.8"
                strokeOpacity="0.25"
              />
              <path
                d="M-20,70 Q90,140 210,80 T420,90"
                stroke="#c5a059"
                strokeWidth="0.8"
                strokeOpacity="0.2"
              />
              <path
                d="M-20,110 Q120,180 230,120 T420,130"
                stroke="#c5a059"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <path
                d="M10,140 Q140,210 250,150 T420,170"
                stroke="#c5a059"
                strokeWidth="0.8"
                strokeOpacity="0.22"
              />

              {/* Meandering Himalayan River Vein (Golden Gorge) */}
              <path
                d="M190,-10 C185,45 230,70 210,115 C190,150 205,185 195,240 C185,280 220,310 200,340"
                stroke="#f0d59e"
                strokeWidth="2.2"
                strokeOpacity="0.85"
                strokeLinecap="round"
              />
              {/* Tributary branches */}
              <path
                d="M210,115 C240,110 280,125 320,110"
                stroke="#d8be8f"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <path
                d="M195,150 C160,155 120,140 80,160"
                stroke="#d8be8f"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <path
                d="M195,185 C225,190 260,180 300,200"
                stroke="#d8be8f"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <path
                d="M205,80 C175,70 140,85 100,75"
                stroke="#d8be8f"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* Mountain Peak Triangles */}
              <polygon points="120,65 125,75 115,75" fill="#d8be8f" fillOpacity="0.4" />
              <polygon points="280,55 286,67 274,67" fill="#d8be8f" fillOpacity="0.4" />
              <polygon points="340,95 345,105 335,105" fill="#d8be8f" fillOpacity="0.3" />
              <polygon points="70,125 76,137 64,137" fill="#d8be8f" fillOpacity="0.3" />
            </g>
          )}

          {profile.terrainType === "backwaters" && (
            <g>
              {/* Serpentine Kerala Waterways & Lagoon Channels */}
              <path
                d="M60,-10 C80,50 40,100 70,150 C100,200 50,250 80,310"
                stroke="#f0d59e"
                strokeWidth="3"
                strokeOpacity="0.85"
                strokeLinecap="round"
              />
              <path
                d="M70,150 C120,140 180,170 240,145 C300,120 340,160 410,130"
                stroke="#e2c180"
                strokeWidth="2"
                strokeOpacity="0.75"
              />
              <path
                d="M180,170 C190,210 220,240 250,280"
                stroke="#d8be8f"
                strokeWidth="1.4"
                strokeOpacity="0.6"
              />
              <path
                d="M240,145 C230,90 270,50 310,20"
                stroke="#d8be8f"
                strokeWidth="1.4"
                strokeOpacity="0.5"
              />

              {/* Tea Garden Topographic Rings */}
              <ellipse cx="280" cy="90" rx="45" ry="25" stroke="#c5a059" strokeWidth="0.8" strokeOpacity="0.3" />
              <ellipse cx="280" cy="90" rx="30" ry="16" stroke="#c5a059" strokeWidth="0.8" strokeOpacity="0.35" />
              <ellipse cx="280" cy="90" rx="15" ry="8" stroke="#c5a059" strokeWidth="0.8" strokeOpacity="0.4" />
            </g>
          )}

          {profile.terrainType === "desert" && (
            <g>
              {/* Rajasthan Dune Waves & Fort Bastion Axes */}
              <path d="M-20,60 Q80,20 180,60 T380,50" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.3" />
              <path d="M-20,95 Q90,55 200,95 T420,80" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.4" />
              <path d="M-20,135 Q110,85 220,130 T420,120" stroke="#f0d59e" strokeWidth="1.8" strokeOpacity="0.6" />
              <path d="M-20,175 Q120,135 240,170 T420,160" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.35" />

              {/* Royal Fort Geometric Hub */}
              <rect x="185" y="105" width="30" height="30" stroke="#e2c180" strokeWidth="1.5" strokeOpacity="0.7" fill="#08101d" />
              <circle cx="200" cy="120" r="8" stroke="#f0d59e" strokeWidth="1.5" strokeOpacity="0.9" />
              <line x1="160" y1="120" x2="240" y2="120" stroke="#d8be8f" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="200" y1="80" x2="200" y2="160" stroke="#d8be8f" strokeWidth="1" strokeOpacity="0.5" />
            </g>
          )}

          {profile.terrainType === "coastal" && (
            <g>
              {/* Goa Coastline & Arabian Sea Bathymetry */}
              <path
                d="M120,-10 Q140,80 130,160 T160,310"
                stroke="#f0d59e"
                strokeWidth="2.8"
                strokeOpacity="0.9"
              />
              <path
                d="M90,-10 Q110,80 100,160 T130,310"
                stroke="#c5a059"
                strokeWidth="1"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
              />
              <path
                d="M60,-10 Q80,80 70,160 T100,310"
                stroke="#c5a059"
                strokeWidth="0.8"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
              />
              {/* Mandovi / Zuari River mouths */}
              <path d="M130,110 C180,105 240,125 310,115" stroke="#e2c180" strokeWidth="1.8" strokeOpacity="0.75" />
              <path d="M140,180 C190,175 230,195 290,185" stroke="#e2c180" strokeWidth="1.8" strokeOpacity="0.75" />
            </g>
          )}

          {(profile.terrainType === "island" || profile.terrainType === "standard") && (
            <g>
              <path
                d="M160,50 C180,60 190,90 170,110 C150,130 130,160 150,190 C170,220 160,250 140,270"
                stroke="#f0d59e"
                strokeWidth="2.2"
                strokeOpacity="0.85"
              />
              <circle cx="240" cy="80" r="12" stroke="#d8be8f" strokeWidth="1.2" strokeOpacity="0.6" />
              <circle cx="270" cy="140" r="16" stroke="#d8be8f" strokeWidth="1.2" strokeOpacity="0.6" />
              <circle cx="230" cy="200" r="9" stroke="#d8be8f" strokeWidth="1.2" strokeOpacity="0.6" />
            </g>
          )}

          {/* ── EXPEDITION ROUTE WAYPOINTS ── */}
          {/* Waypoint A (Departure) */}
          <circle cx="150" cy="130" r="6" fill="#08101d" stroke="#f0d59e" strokeWidth="2" />
          <circle cx="150" cy="130" r="2.5" fill="#f0d59e" />

          {/* Connected Dashed Glowing Route Line */}
          <path
            d="M150,130 C190,110 210,140 250,105"
            stroke="#f0d59e"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />

          {/* Waypoint B (Destination/Return) */}
          <circle cx="250" cy="105" r="6" fill="#08101d" stroke="#f0d59e" strokeWidth="2" />
          <circle cx="250" cy="105" r="2.5" fill="#f0d59e" />

          {/* Compass Rose Accent in Corner */}
          <g transform="translate(345, 45) scale(0.65)">
            <circle cx="0" cy="0" r="22" stroke="#d8be8f" strokeWidth="0.8" strokeOpacity="0.4" />
            <polygon points="0,-22 4,-6 0,0" fill="#f0d59e" />
            <polygon points="0,-22 -4,-6 0,0" fill="#a5813b" />
            <polygon points="0,22 4,6 0,0" fill="#a5813b" />
            <polygon points="0,22 -4,6 0,0" fill="#70582d" />
            <polygon points="22,0 6,4 0,0" fill="#a5813b" />
            <polygon points="-22,0 -6,4 0,0" fill="#70582d" />
            <text x="0" y="-26" textAnchor="middle" fill="#d8be8f" fontSize="9" fontFamily="monospace" fontWeight="bold">N</text>
          </g>
        </svg>
      </div>

      {/* ── Bottom Cartographic Typography & Metadata (Matching Screenshot 2) ── */}
      <div className="relative z-20 pb-4 px-4 text-center">
        {/* Subtle decorative gold diamond separator */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8be8f]/60" />
          <span className="text-[7px] text-[#d8be8f]/80">◆</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8be8f]/60" />
        </div>

        {/* Primary Destination Name with Wide Tracking */}
        <h3 className="font-roman text-xl sm:text-2xl font-bold tracking-[0.32em] text-[#f2ddad] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {profile.displayName}
        </h3>

        {/* Country / State Subtitle */}
        <p className="text-[9px] font-sans font-semibold tracking-[0.28em] text-[#a5813b] uppercase mt-0.5 mb-1.5">
          {profile.subtitle}
        </p>

        {/* Exact Real GPS Coordinates */}
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black/40 border border-[#d8be8f]/20 backdrop-blur-xs">
          <span className="text-[8px] font-mono text-[#c5a059] tracking-[0.14em]">
            {profile.coordinates}
          </span>
          {profile.elevation && (
            <>
              <span className="text-[8px] text-[#d8be8f]/40">•</span>
              <span className="text-[8px] font-mono text-[#a5813b] tracking-wider">
                {profile.elevation}
              </span>
            </>
          )}
        </div>

        {/* Footer Credit & Route */}
        <div className="mt-2.5 flex items-center justify-between text-[7px] font-mono text-[#8a785d]/70 tracking-widest uppercase border-t border-[#d8be8f]/10 pt-1.5 px-2">
          <span>{departurePort || "START"} ➔ {returnPort || "END"}</span>
          <span>IMAGICA CARTOGRAPHY</span>
        </div>
      </div>
    </div>
  );
}
