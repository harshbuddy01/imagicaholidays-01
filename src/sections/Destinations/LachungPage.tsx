"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const quickInfo = [
  { label: "State", value: "Sikkim" },
  { label: "Tour Packages", value: "7 Active Tours" },
  { label: "Starting Price", value: "₹10,129" },
  { label: "Famous For", value: "Valley of Flowers" },
];

const whyVisit = [
  {
    title: "Gateway to Yumthang Valley",
    desc: "Lachung is the base for visiting Yumthang Valley — blooming rhododendrons in spring, snow-covered landscapes in winter, surrounded by majestic Himalayan mountains. Perfect for nature lovers and photographers.",
    icon: "🌸",
  },
  {
    title: "Scenic Road Journey with Waterfalls",
    desc: "The journey to Lachung is filled with natural beauty — Seven Sisters Waterfall, Naga Waterfall, Bhim Nala Waterfall, and stunning Teesta River views along the entire route.",
    icon: "🌊",
  },
  {
    title: "Peaceful Himalayan Village Experience",
    desc: "Unlike crowded tourist places, Lachung offers calm, pollution-free environment, traditional wooden houses, apple orchards, the beautiful Lachung Monastery, and authentic Bhutia culture.",
    icon: "🏡",
  },
];

const attractions = [
  {
    name: "Yumthang Valley",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    short: "The Valley of Flowers of Sikkim — surrounded by snow-capped peaks, alpine meadows, hot springs, and the Teesta River. Blooms with colorful rhododendrons in spring.",
  },
  {
    name: "Mount Katao",
    tag: "Adventure",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    short: "A high-altitude snow destination known for breathtaking mountain views and winter snow activities. Less crowded, ideal for adventure lovers.",
  },
  {
    name: "Yumesamdong (Zero Point)",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
    short: "Where the civilian road ends near the Indo-China border. Surrounded by snow-clad mountains and alpine terrain — raw Himalayan beauty.",
  },
  {
    name: "Shingba Rhododendron Sanctuary",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
    short: "Home to over 40 species of rhododendrons. In spring, the valley turns into a vibrant carpet of red, pink, white, and purple flowers.",
  },
  {
    name: "Sanglaphu Lake",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    short: "A pristine high-altitude lake at 16,670 ft, newly opened in 2024. Known for its frozen beauty and sacred, untouched nature.",
  },
  {
    name: "Lachung Monastery",
    tag: "Religious",
    image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=800&auto=format&fit=crop",
    short: "Built in 1880, this Nyingma sect monastery features colorful murals, prayer flags, and a large statue of Guru Padmasambhava surrounded by pine forests.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March – May",
    temp: "5°C – 18°C",
    desc: "Yumthang Valley blooms with colorful rhododendrons. Snow starts melting, revealing lush green landscapes. Clear mountain views and pleasant weather — ideal for sightseeing and photography.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June – August",
    temp: "10°C – 22°C",
    desc: "Cool and refreshing compared to the plains. Green valleys and waterfalls everywhere. Good for family vacations. Occasional rainfall as monsoon begins late June.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "September – November",
    temp: "5°C – 18°C",
    desc: "Crystal-clear views of snow peaks. Fresh post-monsoon greenery. Pleasant and stable weather with less rainfall — another excellent time to visit.",
    color: "#c47d3e",
    recommended: false,
  },
  {
    name: "Winter",
    months: "December – February",
    temp: "-5°C – 10°C",
    desc: "Snow-covered mountains and roads. Best time to visit Zero Point for snow. Magical white landscapes but very cold weather — dress warm!",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Lachen, Lachung Budget Group Tour",
    price: "₹5,500",
    duration: "4 Days / 3 Nights",
    tag: "Group Tour",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Gangtok Lachen Lachung 6N/7D",
    price: "₹18,800",
    duration: "7 Days / 6 Nights",
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Gangtok & Lachung Yumthang Valley",
    price: "₹9,000",
    duration: "5 Days / 4 Nights",
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Gangtok Lachen Lachung with Gurudongmar",
    price: "₹11,400",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Lachung 2N/3D Tour Package",
    price: "₹14,000",
    duration: "3 Days / 2 Nights",
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Lachen Lachung 3N North Sikkim",
    price: "₹7,700",
    duration: "4 Days / 3 Nights",
    tag: "",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Lachung Budget Group Tour",
    price: "₹4,500",
    duration: "3 Days / 2 Nights",
    tag: "Budget",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=600&auto=format&fit=crop",
  },
];

/* ═══════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function LachungPage() {
  const [visibleAttractions, setVisibleAttractions] = useState(6);

  return (
    <>
      <Navbar />

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://unsplash.com/photos/QHuJaQQHj-M/download?force=true&w=1800"
          alt="Aerial view of mountain with statue in Lachung"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 via-[#1a1914]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1914]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#ae9e85]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">North Sikkim, India</span>
            </div>
            <h1 className="font-roman text-6xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">
              Lachung
            </h1>
            <p className="font-roman text-xl md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">
              Gateway to the Valley of Flowers
            </p>
          </motion.div>
        </div>
        <div className="absolute top-20 left-6 w-20 h-20 border-t border-l border-white/10" />
        <div className="absolute bottom-6 right-6 w-20 h-20 border-b border-r border-white/10" />
      </section>

      {/* ══════════ 2. ABOUT + QUICK INFO ══════════ */}
      <section className="bg-[#f4ebd9] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">About Lachung Holidays</span>
              </div>
              <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-6">
                Premium North Sikkim Tours & Lachung Packages
              </h2>
              <div className="space-y-4">
                <p className="text-[#5c544b] leading-relaxed">
                  Discover the untouched beauty of North Sikkim with our award-winning <strong>Lachung tour packages</strong>. Situated at a breathtaking altitude of 9,600 feet, Lachung serves as the gateway to the world-renowned <strong>Yumthang Valley (Valley of Flowers)</strong> and the high-altitude wonders of <strong>Zero Point (Yumesamdong)</strong>. For travelers seeking pristine snow-capped mountains and tranquil apple orchards, Lachung is the ultimate <strong>Sikkim holiday destination</strong>.
                </p>
                <p className="text-[#5c544b] leading-relaxed">
                  Navigating the rugged terrain of North Sikkim requires expert planning and restricted area permits, which is why Imagica Holidays offers fully managed <strong>luxury North Sikkim itineraries</strong>. Unlike typical budget travel, our packages focus on premium comfort, featuring the most comfortable <strong>resorts in Lachung</strong>, private mountain-ready transport, and guided tours to majestic spots like the Lachung Monastery and Shingba Rhododendron Sanctuary.
                </p>
                <p className="text-[#5c544b] leading-relaxed">
                  Whether you are planning a vibrant spring blossom tour or a snowy winter adventure, our local expertise guarantees a flawless experience. Explore the <strong>best time to visit Lachung</strong> below, and let us handle all logistics so you can simply revel in the raw, majestic beauty of the Himalayas.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {quickInfo.map((info) => (
                  <div key={info.label} className="bg-white/40 backdrop-blur-sm border border-[#d5cab5]/50 p-5 rounded-sm hover:bg-white/60 transition-colors duration-300">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#ae9e85] mb-2">{info.label}</p>
                    <p className="font-roman text-lg font-semibold text-[#3d3831]">{info.value}</p>
                  </div>
                ))}
              </div>
              <Link href="/reserve" className="mt-6 flex items-center justify-center gap-2 bg-[#3d3831] text-[#f4ebd9] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#2a2520] rounded-sm">
                Explore Tours
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 3. WHY VISIT ══════════ */}
      <section className="bg-[#1a1914] py-20 md:py-28 px-6 md:px-16 lg:px-24 text-[#f0e7d6]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Discover What Makes It Special</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#f0e7d6] tracking-wide mt-3">Why Visit Lachung?</h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyVisit.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}
                className="group border border-white/8 p-8 rounded-sm hover:border-[#ae9e85]/30 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ae9e85]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-4xl mb-5 block">{item.icon}</span>
                <h3 className="font-roman text-xl font-semibold text-[#f0e7d6] mb-3 tracking-wide">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#a09383]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. TOP ATTRACTIONS ══════════ */}
      <section className="bg-[#f4ebd9] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Must-Visit Places</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">Top Attractions</h2>
            <p className="text-sm text-[#7a705e] mt-4 max-w-lg mx-auto">From breathtaking natural wonders to cultural landmarks, there&apos;s something for every traveler.</p>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {attractions.slice(0, visibleAttractions).map((attr, i) => (
              <motion.div key={attr.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={(i % 3) * 0.1}
                className="group relative overflow-hidden rounded-sm bg-white/30 border border-[#d5cab5]/30 hover:shadow-lg transition-shadow duration-500">
                <div className="relative h-52 overflow-hidden">
                  <Image src={attr.image} alt={attr.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/50 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#ae9e85]/90 text-[#1a1914] text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-sm">{attr.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-roman text-lg font-semibold text-[#3d3831] mb-2">{attr.name}</h3>
                  <p className="text-xs text-[#7a705e] leading-relaxed">{attr.short}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {visibleAttractions < attractions.length && (
            <div className="text-center mt-10">
              <button onClick={() => setVisibleAttractions(attractions.length)} className="border border-[#3d3831] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d3831] transition-all duration-300 hover:bg-[#3d3831] hover:text-[#f4ebd9] rounded-sm" aria-label="View all tourist attractions in Lachung">
                View All Attractions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ 5. BEST TIME TO VISIT ══════════ */}
      <section className="bg-[#efe5d0] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Seasonal Guide</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">Best Time to Visit</h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {seasons.map((s, i) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className={`relative p-6 rounded-sm border transition-all duration-300 hover:shadow-lg ${s.recommended ? "bg-[#3d3831] text-[#f0e7d6] border-[#ae9e85]/30" : "bg-white/40 text-[#3d3831] border-[#d5cab5]/40 hover:bg-white/60"}`}>
                {s.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ae9e85] text-[#1a1914] text-[8px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-sm">Recommended</span>}
                <div className="w-3 h-3 rounded-full mb-4" style={{ backgroundColor: s.color }} />
                <h3 className="font-roman text-xl font-semibold mb-1">{s.name}</h3>
                <p className={`text-[10px] tracking-[0.15em] uppercase mb-3 ${s.recommended ? "text-[#d5cab5]" : "text-[#ae9e85]"}`}>{s.months}</p>
                <p className="font-roman text-2xl font-medium mb-3">{s.temp}</p>
                <p className={`text-xs leading-relaxed ${s.recommended ? "text-[#a09383]" : "text-[#7a705e]"}`}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} className="mt-10 flex items-start gap-4 bg-white/40 border border-[#d5cab5]/40 p-6 rounded-sm">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-roman text-sm font-semibold text-[#3d3831] mb-1">Our Recommendation</p>
              <p className="text-xs text-[#7a705e] leading-relaxed">
                Lachung is a year-round destination in North Sikkim, but the best time to visit depends on whether you want snow, flowers, or clear Himalayan views. Located at an altitude of around 9,600 ft, Lachung offers different experiences in every season.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 6. TOUR PACKAGES ══════════ */}
      <section className="bg-[#f4ebd9] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Curated Experiences</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">Explore Tour Packages</h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tourPackages.map((pkg, i) => (
              <motion.div key={pkg.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={(i % 3) * 0.1}
                className="group rounded-sm overflow-hidden bg-white/30 border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 to-transparent" />
                  {pkg.tag && <span className="absolute top-3 left-3 bg-[#ae9e85]/90 text-[#1a1914] text-[8px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-sm">{pkg.tag}</span>}
                  <div className="absolute bottom-3 left-3"><span className="font-roman text-xl font-bold text-white">{pkg.price}</span></div>
                </div>
                <div className="p-5">
                  <h3 className="font-roman text-base font-semibold text-[#3d3831] mb-2 leading-snug">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#ae9e85]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round"/></svg>
                    {pkg.duration}
                  </div>
                  <Link href="/reserve" className="mt-4 flex items-center justify-center gap-2 w-full border border-[#3d3831] py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3d3831] hover:bg-[#3d3831] hover:text-[#f4ebd9] transition-all duration-300 rounded-sm">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 7. CTA BANNER ══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop" alt="Yumthang Valley panorama" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#1a1914]/70" />
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-white tracking-wide mb-4">Ready to Explore Lachung?</h2>
            <p className="text-sm text-white/60 mb-8 max-w-lg mx-auto">Browse our curated tour packages and start planning your unforgettable journey today!</p>
            <Link href="/reserve" className="inline-flex items-center gap-3 bg-[#ae9e85] text-[#1a1914] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#c7b697] rounded-sm">
              View Tour Packages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
