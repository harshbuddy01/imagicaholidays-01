"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PLACES = [
  { id: "gangtok", name: "GANGTOK", top: "35%", left: "35%", height: 220 },
  { id: "kaziranga", name: "KAZIRANGA", top: "65%", left: "65%", height: 160 },
  { id: "tawang", name: "TAWANG", top: "25%", left: "75%", height: 250 },
  { id: "shillong", name: "SHILLONG", top: "55%", left: "25%", height: 140 },
  { id: "darjeeling", name: "DARJEELING", top: "45%", left: "45%", height: 190 },
];

export default function SikkimMapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll strictly for this section to trigger the "Zoom out to small" map effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // The Map starts MASSIVE (scale 3) to give that zoomed-in feeling from the landing page,
  // and smoothly "goes small" (scale 1) descending perfectly into place as you scroll completely into the map page.
  const mapScale = useTransform(scrollYProgress, [0, 1], [3, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[150svh] bg-[#0c0a08] py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Scroll-driven intro text overlay */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
        className="absolute top-24 text-center z-30 w-full"
      >
        <h2 className="text-[#a5813b] text-[0.65rem] uppercase tracking-[0.4em] font-bold">Discover The Highlands</h2>
        <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mt-4">The Majestic Map</h3>
      </motion.div>

      {/* Floating 3D Map Container hooked to scroll scaler */}
      <motion.div
        style={{ 
          scale: mapScale,
          opacity: mapOpacity,
          perspective: "3000px" 
        }}
        className="relative w-[95vw] max-w-[850px] aspect-square flex items-center justify-center mt-20"
      >
        {/* Core Rotated Topographic Map Board */}
        <motion.div
          animate={{ rotateZ: [35, 42, 35], rotateX: [55, 60, 55] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Earth Crust Extrusions (The deep 3D Thickness dropping below the map) */}
          {[...Array(25)].map((_, i) => (
            <div 
              key={i}
              className="absolute inset-[15%] shadow-2xl"
              style={{
                // Organic, irregular landmass shape utilizing complex border radius
                borderRadius: "38% 52% 35% 62% / 55% 42% 48% 45%",
                backgroundColor: i < 5 ? "#405b2b" : i < 10 ? "#354a24" : "#28201b",
                transform: `translateZ(-${i * 4}px)`,
                border: i === 0 ? "2px solid #5a803f" : "none"
              }}
            />
          ))}

          {/* Top Surface: The HUGE Green Mountain Image! */}
          <div 
            className="absolute inset-[15%]"
            style={{ 
               borderRadius: "38% 52% 35% 62% / 55% 42% 48% 45%",
               transform: "translateZ(2px)",
               overflow: "hidden"
            }}
          >
            {/* Real Topographical Mountain Imagery from Unsplash applied directly to the surface */}
            <img 
              src="https://images.unsplash.com/photo-ilrO9BN7QSE?auto=format&fit=crop&w=1200&q=80" 
              alt="Mountain Terrain Map"
              className="w-full h-full object-cover scale-[1.3]"
            />
            {/* Dimensional shadow to embed the mountain feeling */}
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          {/* 3D Map Pointers pointing completely ABOVE the land */}
          <div 
            className="absolute inset-[15%] z-20 pointer-events-none" 
            style={{ transformStyle: "preserve-3d", borderRadius: "38% 52% 35% 62% / 55% 42% 48% 45%" }}
          >
            {PLACES.map((place) => (
              <div 
                key={place.id}
                className="absolute"
                style={{
                  top: place.top,
                  left: place.left,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Embedded Map Dot literally on the 3D surface */}
                <div className="w-4 h-4 rounded-full bg-white border-[4px] border-[#181510] -translate-x-2 -translate-y-2 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

                {/* Vertical 3D Pole Shooting straight up into the air ABOVE the map */}
                <div 
                  className="absolute left-[0px] bottom-[8px] w-[2px] bg-white/90 transform origin-bottom"
                  style={{ 
                    height: `${place.height}px`,
                    transform: "rotateX(-90deg)", // Projects it purely vertical off the flat plane
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                  }}
                />

                {/* Floating Tag facing the camera - offsetting the parent's tilt */}
                <div 
                  className="absolute left-0 top-0"
                  style={{
                    transform: `translateZ(${place.height}px) rotateZ(-38deg) rotateX(-58deg)`
                  }}
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <div className="bg-[#181510]/90 backdrop-blur-md text-[#f8f5f0] px-4 py-2 rounded shadow-2xl whitespace-nowrap border border-white/10">
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em]">
                        {place.name}
                      </span>
                    </div>
                    {/* Tag connector baseline tip */}
                    <div className="w-2.5 h-2.5 bg-[#181510]/90 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}