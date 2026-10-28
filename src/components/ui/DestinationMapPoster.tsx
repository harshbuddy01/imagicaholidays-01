"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
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

interface PlacePin {
  id: string;
  name: string;
  top: string;
  left: string;
  height: number;
}

const DESTINATION_TERRAINS: Record<string, { image: string; tint: string; label: string; coords: string }> = {
  sikkim: {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tint: "#3b5328",
    label: "HIMALAYAN FRONTIER",
    coords: "27.3389° N / 88.6065° E",
  },
  gangtok: {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tint: "#3b5328",
    label: "SIKKIM HIGHLANDS",
    coords: "27.3389° N / 88.6065° E",
  },
  darjeeling: {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tint: "#354a24",
    label: "TEA TRAILS RIDGE",
    coords: "27.0378° N / 88.2632° E",
  },
  lachung: {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tint: "#2d421d",
    label: "NORTH SIKKIM ALPINE",
    coords: "27.6891° N / 88.7430° E",
  },
  pelling: {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tint: "#354a24",
    label: "WEST SIKKIM SUMMIT",
    coords: "27.3167° N / 88.2333° E",
  },
  kerala: {
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    tint: "#224422",
    label: "EMERALD BACKWATERS",
    coords: "9.9312° N / 76.2673° E",
  },
  munnar: {
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    tint: "#254924",
    label: "HIGH TEA SANCTUARY",
    coords: "10.0889° N / 77.0595° E",
  },
  cochin: {
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    tint: "#224422",
    label: "ARABIAN HARBOUR",
    coords: "9.9312° N / 76.2673° E",
  },
  rajasthan: {
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    tint: "#4a3520",
    label: "ROYAL THAR TERRAIN",
    coords: "26.9124° N / 75.7873° E",
  },
  jaipur: {
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    tint: "#4a3520",
    label: "PINK CITY EXPEDITION",
    coords: "26.9124° N / 75.7873° E",
  },
  udaipur: {
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    tint: "#42321c",
    label: "LAKES & PALACES",
    coords: "24.5854° N / 73.7125° E",
  },
  goa: {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tint: "#203a3d",
    label: "COASTAL OUTPOST",
    coords: "15.2993° N / 74.1240° E",
  },
};

export default function DestinationMapPoster({
  departurePort = "",
  returnPort = "",
  regions = "",
  badges = [],
  title = "",
  customMapUrl = null,
  className = "",
}: DestinationMapPosterProps) {
  // Resolve terrain style and metadata
  const terrainConfig = useMemo(() => {
    const haystack = `${departurePort} ${returnPort} ${title} ${badges.join(" ")} ${regions}`.toLowerCase();
    for (const [key, cfg] of Object.entries(DESTINATION_TERRAINS)) {
      if (haystack.includes(key)) return cfg;
    }
    return {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      tint: "#3b5328",
      label: "CURATED EXPEDITION",
      coords: "27.0378° N / 88.2632° E",
    };
  }, [departurePort, returnPort, title, badges, regions]);

  // Construct 3D Map Pointers automatically from departure and return ports
  const places = useMemo<PlacePin[]>(() => {
    const depName = departurePort?.trim().toUpperCase() || "START";
    const retName = returnPort?.trim().toUpperCase() || "DESTINATION";

    if (!returnPort || depName === retName) {
      return [
        {
          id: "primary",
          name: depName,
          top: "42%",
          left: "48%",
          height: 80,
        },
      ];
    }

    return [
      {
        id: "dep",
        name: depName,
        top: "48%",
        left: "34%",
        height: 72,
      },
      {
        id: "ret",
        name: retName,
        top: "32%",
        left: "62%",
        height: 92,
      },
    ];
  }, [departurePort, returnPort]);

  return (
    <div
      className={`relative w-full h-full bg-[#080d15] text-[#d8be8f] select-none overflow-hidden flex flex-col justify-between ${className}`}
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #0d1728 0%, #070d17 65%, #040810 100%)",
      }}
    >
      {/* ── Top Cartographic HUD Bar ── */}
      <div className="relative z-30 pt-3 px-4 flex items-center justify-between text-[8px] font-mono tracking-[0.22em] text-[#d8be8f]/80 uppercase pointer-events-none">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d8be8f] animate-ping" />
          3D TERRAIN MAP
        </span>
        <span className="text-[#a5813b] font-semibold">{terrainConfig.label}</span>
      </div>

      {/* ── 3D Floating Terrain Map Board (From SikkimMapSection in Repo) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ rotateZ: [34, 40, 34], rotateX: [52, 58, 52] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[310px] h-[310px] sm:w-[350px] sm:h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Earth Crust Extrusions (The deep 3D Thickness dropping below the map board) */}
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-[15%] shadow-xl pointer-events-none"
              style={{
                borderRadius: "38% 52% 35% 62% / 55% 42% 48% 45%",
                backgroundColor: i < 3 ? terrainConfig.tint : i < 6 ? "#2c3b20" : "#1c1813",
                transform: `translateZ(-${i * 3}px)`,
                border: i === 0 ? "1.5px solid #6b8a4f" : "none",
              }}
            />
          ))}

          {/* Top Surface: High-Res Topographical Mountain Satellite Terrain */}
          <div
            className="absolute inset-[15%] pointer-events-none"
            style={{
              borderRadius: "38% 52% 35% 62% / 55% 42% 48% 45%",
              transform: "translateZ(2px)",
              overflow: "hidden",
            }}
          >
            <Image
              src={terrainConfig.image}
              alt="Destination Terrain Map"
              width={600}
              height={600}
              className="w-full h-full object-cover scale-[1.35]"
            />
            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

            {/* Glowing Golden Route Trace on the 3D Land Surface */}
            {places.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
                <path
                  d="M 38 48 Q 50 38 62 34"
                  fill="none"
                  stroke="#f0d59e"
                  strokeWidth="1.8"
                  strokeDasharray="3 2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>

          {/* ── 3D Map Pointers pointing completely ABOVE the land ── */}
          <div
            className="absolute inset-[15%] z-20 pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              borderRadius: "38% 52% 35% 62% / 55% 42% 48% 45%",
            }}
          >
            {places.map((place) => (
              <div
                key={place.id}
                className="absolute"
                style={{
                  top: place.top,
                  left: place.left,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Embedded Glowing Map Dot on the 3D surface */}
                <div className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-[#181510] -translate-x-1.5 -translate-y-1.5 shadow-[0_0_15px_rgba(255,255,255,0.95)]" />

                {/* Vertical 3D Pole Shooting straight up into the air ABOVE the map */}
                <div
                  className="absolute left-[0px] bottom-[5px] w-[2px] bg-gradient-to-t from-white/90 via-[#f0d59e] to-white/90 transform origin-bottom"
                  style={{
                    height: `${place.height}px`,
                    transform: "rotateX(-90deg)",
                    boxShadow: "0 0 8px rgba(0,0,0,0.6)",
                  }}
                />

                {/* Floating Tag facing the camera - offsetting the parent's tilt */}
                <div
                  className="absolute left-0 top-0"
                  style={{
                    transform: `translateZ(${place.height}px) rotateZ(-37deg) rotateX(-55deg)`,
                  }}
                >
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                    <div className="bg-[#101926]/95 backdrop-blur-md text-[#f8f5f0] px-3 py-1 rounded-md shadow-2xl whitespace-nowrap border border-[#d8be8f]/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d8be8f] animate-ping" />
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#f2ddad] drop-shadow-sm font-sans">
                        {place.name}
                      </span>
                    </div>
                    {/* Tag connector baseline tip */}
                    <div className="w-2 h-2 bg-[#101926]/95 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-[#d8be8f]/50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom HUD Footer Bar ── */}
      <div className="relative z-30 pb-3 px-4 flex items-center justify-between text-[8px] font-mono tracking-[0.16em] uppercase text-[#a5813b] pointer-events-none">
        <span className="text-[#d8be8f]/80 font-bold">
          {departurePort || "START"} ➔ {returnPort || "DESTINATION"}
        </span>
        <span className="text-[7.5px] text-[#c5a059]/70 font-mono">
          {terrainConfig.coords}
        </span>
      </div>
    </div>
  );
}
