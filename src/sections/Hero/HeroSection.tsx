"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/lib/constants";
import { fetchWebsiteConfig } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

const heroVideos = [
  { id: "video-1", src: "/videos/hls/hero-1/playlist.m3u8" },
  { id: "video-2", src: "/videos/hls/hero-1/playlist.m3u8" },
];

const getBustedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("hero-1-hq-compressed.mp4") && !url.includes("v=")) {
    return url.includes("?") ? `${url}&v=2` : `${url}?v=2`;
  }
  return url;
};

const initHlsVideo = (video: HTMLVideoElement, url: string, fallbackUrl: string) => {
  if (!video) return;

  // If URL is not HLS, set src directly
  if (!url.endsWith(".m3u8") && !url.includes(".m3u8")) {
    video.src = url;
    return;
  }

  // Native HLS support (Safari)
  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  } else {
    // Dynamic import hls.js for other browsers (Chrome, Firefox, etc.)
    import("hls.js").then((HlsModule) => {
      const Hls = HlsModule.default;
      if (Hls.isSupported()) {
        if ((video as any)._hls) {
          (video as any)._hls.destroy();
        }
        const hls = new Hls({
          maxMaxBufferLength: 10,
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        (video as any)._hls = hls;
      } else {
        video.src = fallbackUrl;
      }
    }).catch(() => {
      video.src = fallbackUrl;
    });
  }
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [config, setConfig] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackSlide, setFallbackSlide] = useState(0);

  const [selectedDest, setSelectedDest] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchWebsiteConfig().then((data) => {
      if (data?.config?.hero) {
        setConfig(data.config.hero);
        if (data.config.hero.useVideo !== undefined) setUseFallback(!data.config.hero.useVideo);
      }
    });
  }, []);

  const slides = config?.fallbackSlides?.length > 0 ? config.fallbackSlides : heroSlides;

  useEffect(() => {
    const v1 = video1Ref.current;
    const fallbackMp4 = "/videos/hero-1-compressed.mp4";

    if (v1) {
      initHlsVideo(v1, getBustedUrl(config?.videoUrl1 || heroVideos[0].src), fallbackMp4);
    }
  }, [config?.videoUrl1]);

  useEffect(() => {
    // Delay loading video 2 by 4 seconds to free up network bandwidth for initial load
    const timer = setTimeout(() => {
      const v2 = video2Ref.current;
      const fallbackMp4 = "/videos/hero-1-compressed.mp4";
      if (v2) {
        initHlsVideo(v2, getBustedUrl(config?.videoUrl2 || heroVideos[1].src), fallbackMp4);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [config?.videoUrl2]);

  useEffect(() => {
    return () => {
      if (video1Ref.current && (video1Ref.current as any)._hls) {
        (video1Ref.current as any)._hls.destroy();
      }
      if (video2Ref.current && (video2Ref.current as any)._hls) {
        (video2Ref.current as any)._hls.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;
    const onV1End = () => {
      if (v2.readyState >= 1 && v2.duration > 0) { setActiveVideo(1); v2.currentTime = 0; v2.play().catch(() => {}); }
      else { v1.currentTime = 0; v1.play().catch(() => {}); }
    };
    const onV2End = () => { setActiveVideo(0); v1.currentTime = 0; v1.play().catch(() => {}); };
    v1.addEventListener("ended", onV1End);
    v2.addEventListener("ended", onV2End);
    v1.play().catch(() => {
      const resume = () => { v1.play().catch(() => {}); };
      document.addEventListener("touchstart", resume, { once: true });
      document.addEventListener("click", resume, { once: true });
    });
    return () => { v1.removeEventListener("ended", onV1End); v2.removeEventListener("ended", onV2End); };
  }, [useFallback]);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-video-wrapper", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!useFallback) return;
    const t = setInterval(() => setFallbackSlide((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [useFallback, slides.length]);

  return (
    <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-[#0c0a08]" id="journey">

      {/* ── VIDEO / FALLBACK BACKGROUND ── */}
      <div className="hero-video-wrapper absolute inset-0 w-full h-full">
        {useFallback ? (
          <AnimatePresence mode="wait">
            <motion.img key={fallbackSlide} src={slides[fallbackSlide]?.image || ""}
              alt={slides[fallbackSlide]?.title || ""}
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover z-[1]" />
          </AnimatePresence>
        ) : (
          <>
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ${activeVideo === 0 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video ref={video1Ref}
                onError={() => setUseFallback(true)} autoPlay loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ${activeVideo === 1 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
              <video ref={video2Ref}
                onError={() => setUseFallback(true)} autoPlay loop muted playsInline preload="none"
                className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </>
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 z-[3]" />
      </div>

      {/* ── HERO HEADING — left-aligned, large ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 md:px-14 max-w-7xl mx-auto pointer-events-none pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-runtime font-normal text-white leading-[0.92] tracking-[-0.02em] text-left">
            {/* Explore — large */}
            <span className="block text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[11rem]">
              Explore
            </span>
            {/* Destinations — even bigger */}
            <span className="block text-[3.8rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8.5rem] xl:text-[9.5rem] text-white/95 mt-1">
              Destinations
            </span>
          </h1>
        </motion.div>

        {/* Minimal line indicator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.4, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="origin-left mt-8 w-20 h-[1.5px] bg-white"
        />
      </div>

      {/* ── BOOKING WIDGET — bottom ── */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 z-20 px-4 md:px-10 max-w-4xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="w-full bg-black/50 backdrop-blur-xl border border-white/10 p-3 md:p-2.5 rounded-2xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0 pointer-events-auto shadow-2xl"
        >
          {/* Where To */}
          <div className="flex-1 flex flex-col px-5 border-b border-white/8 md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
            <label className="text-[0.5rem] font-bold tracking-[0.3em] uppercase text-[#d8be8f] mb-1 font-manrope">
              Where To?
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="bg-transparent text-white text-sm font-manrope focus:outline-none appearance-none cursor-pointer w-full font-medium"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d8be8f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundPosition: "right center", backgroundSize: "14px", backgroundRepeat: "no-repeat",
              }}
            >
              <option value="" className="bg-[#0f0d0a] text-white/60">Select destination</option>
              {["Gangtok","Darjeeling","Munnar","Wayanad","Jaipur","Udaipur","Goa","Leh Ladakh","Kashmir","Sikkim","Meghalaya","Bhutan"].map(d => (
                <option key={d} value={d} className="bg-[#0f0d0a] text-white">{d}</option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div className="flex-1 flex flex-col px-5 pb-2 md:pb-0">
            <label className="text-[0.5rem] font-bold tracking-[0.3em] uppercase text-[#d8be8f] mb-1 font-manrope">
              Travel Date
            </label>
            <input type="date" value={selectedDate} min={todayStr}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white text-sm font-manrope focus:outline-none cursor-pointer w-full [color-scheme:dark] font-medium" />
          </div>

          {/* Book Now */}
          <Link
            href={`/reserve?destination=${encodeURIComponent(selectedDest)}&arrival=${selectedDate}`}
            className="px-7 py-3 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] text-white text-[0.65rem] font-bold uppercase tracking-[0.22em] rounded-xl md:rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_24px_rgba(165,129,59,0.5)] active:scale-95 flex-shrink-0 font-manrope"
          >
            Book Now
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
