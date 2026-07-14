"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { heroSlides } from "@/lib/constants";
import { fetchWebsiteConfig } from "@/lib/api";

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
    video.load();
    video.play().catch(() => {});
    return;
  }

  // Native HLS support (Safari)
  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.load();
    video.play().catch(() => {});
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
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else {
        video.src = fallbackUrl;
        video.load();
        video.play().catch(() => {});
      }
    }).catch(() => {
      video.src = fallbackUrl;
      video.load();
      video.play().catch(() => {});
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
        // Only use fallback (static images) if CRM explicitly says no video
        // AND there is no video URL provided. If a videoUrl exists, always play it.
        const hasVideoUrl = !!(data.config.hero.videoUrl1 || data.config.hero.videoUrl2);
        const crmSaysNoVideo = data.config.hero.useVideo === false;
        // Use fallback ONLY when no video URL is available
        setUseFallback(crmSaysNoVideo && !hasVideoUrl);
      }
    });
  }, []);


  const slides = config?.fallbackSlides?.length > 0 ? config.fallbackSlides : heroSlides;
  const hasSecondVideo = config ? !!config.videoUrl2 : true;

  useEffect(() => {
    const v1 = video1Ref.current;
    const fallbackMp4 = "/videos/hero-1-compressed.mp4";

    if (v1) {
      // Always use CRM video URL when available — they are direct MP4s
      const src = config?.videoUrl1 || heroVideos[0].src;
      initHlsVideo(v1, getBustedUrl(src), fallbackMp4);
      
      v1.play().catch(() => {
        const resume = () => { if (v1) v1.play().catch(() => {}); };
        document.addEventListener("touchstart", resume, { once: true });
        document.addEventListener("click", resume, { once: true });
      });
    }
  }, [config?.videoUrl1]);

  useEffect(() => {
    if (!hasSecondVideo) return;
    // Delay loading video 2 by 4 seconds to free up network bandwidth for initial load
    const timer = setTimeout(() => {
      const v2 = video2Ref.current;
      const fallbackMp4 = "/videos/hero-1-compressed.mp4";
      if (v2) {
        const src = config?.videoUrl2 || heroVideos[1].src;
        initHlsVideo(v2, getBustedUrl(src), fallbackMp4);
        
        if (activeVideo === 1) {
          v2.play().catch(() => {
            const resume = () => { if (v2) v2.play().catch(() => {}); };
            document.addEventListener("touchstart", resume, { once: true });
            document.addEventListener("click", resume, { once: true });
          });
        }
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [config?.videoUrl2, hasSecondVideo]);

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
    if (!v1) return;
    const onV1End = () => {
      if (hasSecondVideo && v2 && v2.readyState >= 1 && v2.duration > 0) { 
        setActiveVideo(1); 
        v2.currentTime = 0; 
        v2.play().catch(() => {}); 
      } else { 
        v1.currentTime = 0; 
        v1.play().catch(() => {}); 
      }
    };
    const onV2End = () => { setActiveVideo(0); v1.currentTime = 0; v1.play().catch(() => {}); };
    v1.addEventListener("ended", onV1End);
    if (v2) {
      v2.addEventListener("ended", onV2End);
    }
    v1.play().catch(() => {
      const resume = () => { v1.play().catch(() => {}); };
      document.addEventListener("touchstart", resume, { once: true });
      document.addEventListener("click", resume, { once: true });
    });
    return () => { 
      v1.removeEventListener("ended", onV1End); 
      if (v2) {
        v2.removeEventListener("ended", onV2End); 
      }
    };
  }, [useFallback, config, hasSecondVideo]);

  // No GSAP parallax — removed because moving a video element on scroll
  // forces expensive composite layer invalidation every frame (major lag source)

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
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
            </div>
            {hasSecondVideo && (
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ${activeVideo === 1 ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}>
                <video ref={video2Ref}
                  onError={() => setUseFallback(true)} autoPlay loop muted playsInline preload="none"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
              </div>
            )}
          </>
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 z-[3]" />
      </div>

      {/* ── HERO HEADING ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 md:px-14 max-w-7xl mx-auto pointer-events-none pb-56 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-runtime font-normal text-white leading-[0.92] tracking-[-0.02em] text-left">
            <span className="block text-[3.2rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[11rem]">
              Explore
            </span>
            <span className="block text-[2.8rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8.5rem] xl:text-[9.5rem] text-white/95 mt-1">
              Destinations
            </span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.4, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="origin-left mt-5 md:mt-8 w-14 md:w-20 h-[1.5px] bg-white"
        />
      </div>

      {/* ── BOTTOM CONTENT ── */}
      <div className="absolute bottom-[88px] md:bottom-8 inset-x-0 z-20 px-3 md:px-10 max-w-4xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="w-full pointer-events-auto"
        >
          {/* ═══ MOBILE LAYOUT ═══ */}
          <div className="md:hidden flex flex-col gap-2">
            {/* Booking Card */}
            <div className="bg-black/55 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl">
              <div className="flex items-end gap-2.5 mb-3">
                <div className="flex-1">
                  <label className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#d8be8f] mb-0.5 block font-manrope">Where To?</label>
                  <select value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}
                    className="bg-transparent text-white text-[13px] font-manrope focus:outline-none appearance-none cursor-pointer w-full font-medium"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d8be8f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: "right center", backgroundSize: "12px", backgroundRepeat: "no-repeat" }}>
                    <option value="" className="bg-[#0f0d0a] text-white/60">Select destination</option>
                    {["Gangtok","Darjeeling","Munnar","Wayanad","Jaipur","Udaipur","Goa","Leh Ladakh","Kashmir","Sikkim","Meghalaya","Bhutan"].map(d => (
                      <option key={d} value={d} className="bg-[#0f0d0a] text-white">{d}</option>
                    ))}
                  </select>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex-1">
                  <label className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#d8be8f] mb-0.5 block font-manrope">When?</label>
                  <input type="date" value={selectedDate} min={todayStr} onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-white text-[13px] font-manrope focus:outline-none cursor-pointer w-full [color-scheme:dark] font-medium" />
                </div>
              </div>
              <Link href={`/reserve?destination=${encodeURIComponent(selectedDest)}&arrival=${selectedDate}`}
                className="w-full py-2.5 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] text-white text-[10px] font-bold uppercase tracking-[0.22em] rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] font-manrope">
                Book Now
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="bg-black/40 backdrop-blur-lg border border-white/8 rounded-xl px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => (<svg key={i} className="w-2.5 h-2.5 fill-current text-[#FBBC04]" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" /></svg>))}</div>
                <span className="text-[10px] font-bold text-white">4.8</span>
              </div>
              <div className="w-px h-4 bg-white/15" />
              <a href="tel:+918910750374" className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#d8be8f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-[9px] font-bold font-manrope text-white/80">Call</span>
              </a>
              <div className="w-px h-4 bg-white/15" />
              <a href="mailto:info@imagicaholidays.com" className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#d8be8f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-[9px] font-bold font-manrope text-white/80">Email</span>
              </a>
              <div className="w-px h-4 bg-white/15" />
              <a href="https://wa.me/918235337180?text=Hi!%20I'd%20like%20to%20plan%20a%20trip%20with%20Imagica%20Holidays." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.562 7.93-7.93a7.9 7.9 0 0 0-2.327-5.592M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-5.454c-.19-.095-1.125-.556-1.298-.622-.173-.067-.3-.098-.426.095-.126.192-.489.621-.6.745-.11.124-.22.14-.41.045-1.82-.91-3.064-2.525-3.51-3.293-.11-.19-.01-.291.085-.386.09-.088.192-.221.288-.33.095-.11.13-.186.195-.31.065-.125.033-.233-.017-.33-.05-.095-.426-1.028-.584-1.41-.154-.372-.325-.322-.426-.327-.1-.004-.215-.004-.33-.004a.64.64 0 0 0-.462.216c-.16.173-.61.597-.61 1.458s.627 1.696.715 1.815c.088.12 1.234 1.884 2.99 2.642.417.18.74.287.993.367.42.132.802.113 1.102.068.334-.05 1.125-.46 1.282-.905.158-.445.158-.826.11-.905-.047-.08-.173-.127-.363-.222"/></svg>
                <span className="text-[9px] font-bold font-manrope text-[#25D366]">Chat</span>
              </a>
            </div>
          </div>

          {/* ═══ DESKTOP LAYOUT ═══ */}
          <div className="hidden md:block">
            <div className="w-full bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col gap-3.5 shadow-2xl">
              <div className="w-full flex flex-row items-center gap-0">
                <div className="flex-1 flex flex-col px-5 border-r border-white/10">
                  <label className="text-[0.5rem] font-bold tracking-[0.3em] uppercase text-[#d8be8f] mb-1 font-manrope">Where To?</label>
                  <select value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}
                    className="bg-transparent text-white text-sm font-manrope focus:outline-none appearance-none cursor-pointer w-full font-medium"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d8be8f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: "right center", backgroundSize: "14px", backgroundRepeat: "no-repeat" }}>
                    <option value="" className="bg-[#0f0d0a] text-white/60">Select destination</option>
                    {["Gangtok","Darjeeling","Munnar","Wayanad","Jaipur","Udaipur","Goa","Leh Ladakh","Kashmir","Sikkim","Meghalaya","Bhutan"].map(d => (
                      <option key={d} value={d} className="bg-[#0f0d0a] text-white">{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex flex-col px-5">
                  <label className="text-[0.5rem] font-bold tracking-[0.3em] uppercase text-[#d8be8f] mb-1 font-manrope">Travel Date</label>
                  <input type="date" value={selectedDate} min={todayStr} onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-white text-sm font-manrope focus:outline-none cursor-pointer w-full [color-scheme:dark] font-medium" />
                </div>
                <Link href={`/reserve?destination=${encodeURIComponent(selectedDest)}&arrival=${selectedDate}`}
                  className="px-7 py-3 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] text-white text-[0.65rem] font-bold uppercase tracking-[0.22em] rounded-full flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(165,129,59,0.5)] active:scale-95 flex-shrink-0 font-manrope">
                  Book Now
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="border-t border-white/8 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => (<svg key={i} className="w-3 h-3 fill-current text-[#FBBC04]" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" /></svg>))}</div>
                  <span className="text-xs font-bold text-white">4.8</span>
                  <span className="text-[10px] text-white/50">out of 5 · Google Reviews</span>
                </div>
                <div className="flex items-center gap-5">
                  <a href="tel:+918910750374" className="flex items-center gap-1.5 hover:text-[#d8be8f] transition-colors">
                    <svg className="w-3.5 h-3.5 text-[#d8be8f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span className="text-[10px] font-bold font-manrope text-white/90">Talk to Expert</span>
                  </a>
                  <a href="mailto:info@imagicaholidays.com" className="flex items-center gap-1.5 hover:text-[#d8be8f] transition-colors">
                    <svg className="w-3.5 h-3.5 text-[#d8be8f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="text-[10px] font-bold font-manrope text-white/90">Email Us</span>
                  </a>
                  <a href="https://wa.me/918235337180?text=Hi!%20I'd%20like%20to%20plan%20a%20trip%20with%20Imagica%20Holidays." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors">
                    <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.562 7.93-7.93a7.9 7.9 0 0 0-2.327-5.592M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-5.454c-.19-.095-1.125-.556-1.298-.622-.173-.067-.3-.098-.426.095-.126.192-.489.621-.6.745-.11.124-.22.14-.41.045-1.82-.91-3.064-2.525-3.51-3.293-.11-.19-.01-.291.085-.386.09-.088.192-.221.288-.33.095-.11.13-.186.195-.31.065-.125.033-.233-.017-.33-.05-.095-.426-1.028-.584-1.41-.154-.372-.325-.322-.426-.327-.1-.004-.215-.004-.33-.004a.64.64 0 0 0-.462.216c-.16.173-.61.597-.61 1.458s.627 1.696.715 1.815c.088.12 1.234 1.884 2.99 2.642.417.18.74.287.993.367.42.132.802.113 1.102.068.334-.05 1.125-.46 1.282-.905.158-.445.158-.826.11-.905-.047-.08-.173-.127-.363-.222"/></svg>
                    <span className="text-[10px] font-bold font-manrope text-white/90">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
