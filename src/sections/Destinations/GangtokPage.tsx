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
  { label: "Tour Packages", value: "8 Active Tours" },
  { label: "Starting Price", value: "₹10,475" },
  { label: "Famous For", value: "Heart of Sikkim" },
];

const whyVisit = [
  {
    title: "Spectacular Kanchenjunga Views",
    desc: "Gangtok offers breathtaking views of Mount Kanchenjunga, the third-highest mountain in the world. Sunrise views from Tashi View Point and Hanuman Tok are unforgettable.",
    icon: "🏔️",
  },
  {
    title: "MG Marg – Clean & Vibrant City Life",
    desc: "MG Marg is the heart of Gangtok, famous for cafes, restaurants, local shopping, nightlife and street culture. It is one of the cleanest pedestrian zones in India.",
    icon: "🏙️",
  },
  {
    title: "Ideal for Honeymoon & Family Tours",
    desc: "Peaceful environment, luxury hotels, scenic viewpoints, and comfortable road connectivity make Gangtok ideal for honeymoon packages, family holidays, group tours, and corporate trips.",
    icon: "💑",
  },
];

const attractions = [
  {
    name: "Enchey Monastery",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the oldest Buddhist monasteries, perched on a tranquil pine-covered hill about 3 km from central Gangtok.",
  },
  {
    name: "Ganesh Tok",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A sacred temple dedicated to Lord Ganesha at 6,500 ft offering panoramic views of the Kanchenjunga range.",
  },
  {
    name: "Plant Conservatory",
    tag: "Nature",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A beautiful greenhouse garden showcasing rare Himalayan plants, orchids, and seasonal flowers.",
  },
  {
    name: "Gonjang Monastery",
    tag: "Religious",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A peaceful Buddhist monastery near Tashi View Point with beautiful views of surrounding hills and valleys.",
  },
  {
    name: "Bakthang Waterfall",
    tag: "Nature",
    image: "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A stunning waterfall about 4 km from Gangtok on the way to Tsomgo Lake, surrounded by lush green hills.",
  },
  {
    name: "Banjhakri Falls",
    tag: "Nature",
    image: "https://images.pexels.com/photos/30778897/pexels-photo-30778897.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A popular tourist waterfall set in a forested area with a rich connection to Sikkimese folklore and Shamanic traditions.",
  },
  {
    name: "MG Marg",
    tag: "Landmark",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The main pedestrian street and most popular tourist hub, known for clean environment and vibrant atmosphere.",
  },
  {
    name: "Gangtok Ropeway",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A cable car ride offering panoramic aerial views of Gangtok town, valleys, and surrounding hills.",
  },
  {
    name: "Tashi View Point",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736744/pexels-photo-33736744.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A famous viewpoint to witness the majestic Kanchenjunga range and sunrise views over the Himalayas.",
  },
  {
    name: "Do Drul Chorten",
    tag: "Religious",
    image: "https://images.pexels.com/photos/19082530/pexels-photo-19082530.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A prominent white stupa built in 1945, surrounded by 108 prayer wheels. A peaceful spiritual stop.",
  },
  {
    name: "Hanuman Tok",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33736747/pexels-photo-33736747.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A Hindu temple complex in the upper reaches of Gangtok, maintained by the Indian Army with stunning views.",
  },
  {
    name: "Orchidarium",
    tag: "Nature",
    image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A stunning collection of 500+ species of orchids and seasonal flowers from the Himalayan region.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March – May",
    temp: "10°C – 22°C",
    desc: "Spring is the best time to visit Gangtok. Pleasant weather, clear skies, and blooming rhododendrons across the hills. Perfect for sightseeing, honeymoon trips, and photography.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June – August",
    temp: "15°C – 25°C",
    desc: "Mild rainfall and lush green landscapes. Less crowded and suitable for travelers seeking peaceful holidays. Occasional landslides may affect travel.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "September – November",
    temp: "10°C – 20°C",
    desc: "Monsoon clears the dust, offering crystal-clear views of the Himalayas. Cool and comfortable weather, great for sightseeing and adventure activities.",
    color: "#c47d3e",
    recommended: false,
  },
  {
    name: "Winter",
    months: "December – February",
    temp: "4°C – 15°C",
    desc: "Cold but beautiful. Nearby Tsomgo Lake and Nathula Pass often experience snow. Clear winter sky offers stunning mountain views.",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Gangtok Lachen Lachung 6N/7D",
    price: "₹18,800",
    duration: "7 Days / 6 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Lachen Lachung with Gurudongmar",
    price: "₹11,400",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok & Lachung Yumthang Valley",
    price: "₹9,000",
    duration: "5 Days / 4 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Nathula Pass Group Tour",
    price: "₹1,200",
    duration: "1 Day",
    tag: "Group Tour",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 5N/6D",
    price: "₹11,800",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Pelling Darjeeling 5N/6D",
    price: "₹12,500",
    duration: "6 Days / 5 Nights",
    tag: "Popular",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 4N/5D",
    price: "₹10,200",
    duration: "5 Days / 4 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok 3N/4D Tour Package",
    price: "₹8,900",
    duration: "4 Days / 3 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function GangtokPage() {
  const [visibleAttractions, setVisibleAttractions] = useState(6);

  return (
    <>
      <Navbar />

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative h-[65vh] md:h-[85vh] min-h-[450px] md:min-h-[600px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="White and red building on green mountain in Gangtok"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 via-[#1a1914]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1914]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#ae9e85]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">
                East Sikkim, India
              </span>
            </div>
            <h1 className="font-roman text-4xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.08em] md:tracking-[0.1em] uppercase">
              Gangtok
            </h1>
            <p className="font-roman text-base md:text-2xl italic text-[#d5cab5] mt-1.5 md:mt-2 tracking-wide">
              Where Tradition Meets Tranquility
            </p>
          </motion.div>
        </div>

        {/* Decorative corner frames */}
        <div className="absolute top-20 left-6 w-12 h-12 md:w-20 md:h-20 border-t border-l border-white/10" />
        <div className="absolute bottom-6 right-6 w-12 h-12 md:w-20 md:h-20 border-b border-r border-white/10" />
      </section>

      {/* ══════════ 2. ABOUT + QUICK INFO ══════════ */}
      <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24">
            {/* About text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">About Gangtok Holidays</span>
              </div>
              <h2 className="font-roman text-2xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-4 md:mb-6">
                Premium Gangtok Tour Packages & Luxury Sikkim Itineraries
              </h2>
              <div className="space-y-4">
                <p className="text-[#5c544b] leading-relaxed">
                  Discover the breathtaking capital of Sikkim with our handcrafted <strong>Gangtok tour packages</strong>. Nestled at 5,410 feet, Gangtok is Northeast India's premier holiday destination, blending ancient Tibetan Buddhist culture with spectacular Himalayan vistas. Whether you are seeking a romantic <strong>Gangtok honeymoon package</strong>, a peaceful family retreat, or premium sightseeing tours across East Sikkim, we curate unparalleled luxury experiences.
                </p>
                <p className="text-[#5c544b] leading-relaxed">
                  Every <strong>Sikkim holiday</strong> we design includes exclusive stays at the finest <strong>resorts in Gangtok</strong>, ensuring you wake up to pristine views of the majestic Mount Kanchenjunga. From strolling down the impeccably clean MG Marg to seeking blessings at the historic Rumtek Monastery, compiling the perfect <strong>Gangtok itinerary</strong> requires local expertise.
                </p>
                <p className="text-[#5c544b] leading-relaxed">
                  Unlike standard <strong>travel agencies</strong>, Imagica Holidays specializes in luxury, hassle-free travel. We handle your inner line permits, premium cab transfers, and exclusive accommodations. Discover the <strong>best time to visit Gangtok</strong> with our seasonal guides below, and let our destination experts tailor your perfect Himalayan escape.
                </p>
              </div>
            </motion.div>

            {/* Quick Info cards */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {quickInfo.map((info) => (
                  <div
                    key={info.label}
                    className="bg-white/40 backdrop-blur-sm border border-[#d5cab5]/50 p-5 rounded-sm hover:bg-white/60 transition-colors duration-300"
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#ae9e85] mb-2">{info.label}</p>
                    <p className="font-roman text-lg font-semibold text-[#3d3831]">{info.value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/reserve"
                className="mt-6 flex items-center justify-center gap-2 bg-[#3d3831] text-[#f4ebd9] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#2a2520] rounded-sm"
              >
                Explore Tours
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 3. WHY VISIT ══════════ */}
      <section className="bg-[#1a1914] py-14 md:py-28 px-5 md:px-16 lg:px-24 text-[#f0e7d6]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Discover What Makes It Special</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#f0e7d6] tracking-wide mt-3">
              Why Visit Gangtok?
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {whyVisit.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.15}
                className="group border border-white/8 p-5 md:p-8 rounded-sm hover:border-[#ae9e85]/30 transition-colors duration-500 relative overflow-hidden"
              >
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
      <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Must-Visit Places</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Top Attractions
            </h2>
            <p className="text-sm text-[#7a705e] mt-4 max-w-lg mx-auto">
              From breathtaking natural wonders to cultural landmarks, there&apos;s something for every traveler.
            </p>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {attractions.slice(0, visibleAttractions).map((attr, i) => (
              <motion.div
                key={attr.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={(i % 3) * 0.1}
                className="group relative overflow-hidden rounded-sm bg-white/30 border border-[#d5cab5]/30 hover:shadow-lg transition-shadow duration-500"
              >
                <div className="relative h-40 md:h-52 overflow-hidden">
                  <Image
                    src={attr.image}
                    alt={attr.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/50 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#ae9e85]/90 text-[#1a1914] text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-sm">
                    {attr.tag}
                  </span>
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
              <button
                onClick={() => setVisibleAttractions(attractions.length)}
                className="border border-[#3d3831] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d3831] transition-all duration-300 hover:bg-[#3d3831] hover:text-[#f4ebd9] rounded-sm"
                aria-label="View all tourist attractions in Gangtok"
              >
                View All Attractions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ 5. BEST TIME TO VISIT ══════════ */}
      <section className="bg-[#efe5d0] py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Seasonal Guide</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Best Time to Visit
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {seasons.map((s, i) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className={`relative p-6 rounded-sm border transition-all duration-300 hover:shadow-lg ${s.recommended
                  ? "bg-[#3d3831] text-[#f0e7d6] border-[#ae9e85]/30"
                  : "bg-white/40 text-[#3d3831] border-[#d5cab5]/40 hover:bg-white/60"
                  }`}
              >
                {s.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ae9e85] text-[#1a1914] text-[8px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-sm">
                    Recommended
                  </span>
                )}
                <div className="w-3 h-3 rounded-full mb-4" style={{ backgroundColor: s.color }} />
                <h3 className="font-roman text-xl font-semibold mb-1">{s.name}</h3>
                <p className={`text-[10px] tracking-[0.15em] uppercase mb-3 ${s.recommended ? "text-[#d5cab5]" : "text-[#ae9e85]"}`}>
                  {s.months}
                </p>
                <p className="font-roman text-2xl font-medium mb-3">{s.temp}</p>
                <p className={`text-xs leading-relaxed ${s.recommended ? "text-[#a09383]" : "text-[#7a705e]"}`}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recommendation note */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
            className="mt-10 flex items-start gap-4 bg-white/40 border border-[#d5cab5]/40 p-6 rounded-sm"
          >
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-roman text-sm font-semibold text-[#3d3831] mb-1">Our Recommendation</p>
              <p className="text-xs text-[#7a705e] leading-relaxed">
                Gangtok is a year-round destination, but the best time to visit depends on what kind of experience you are looking for — clear mountain views, blooming flowers, snowfall, or peaceful off-season travel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 6. TOUR PACKAGES ══════════ */}
      <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Curated Experiences</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Explore Tour Packages
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tourPackages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={(i % 4) * 0.1}
                className="group rounded-sm overflow-hidden bg-white/30 border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 to-transparent" />
                  {pkg.tag && (
                    <span className="absolute top-3 left-3 bg-[#ae9e85]/90 text-[#1a1914] text-[8px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-sm">
                      {pkg.tag}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="font-roman text-xl font-bold text-white">{pkg.price}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-roman text-sm font-semibold text-[#3d3831] mb-2 leading-snug">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#ae9e85]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" />
                    </svg>
                    {pkg.duration}
                  </div>
                  <Link
                    href="/reserve"
                    className="mt-3 flex items-center justify-center gap-2 w-full border border-[#3d3831] py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3d3831] hover:bg-[#3d3831] hover:text-[#f4ebd9] transition-all duration-300 rounded-sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 7. CTA BANNER ══════════ */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Mountain sunset panorama"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1914]/70" />
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-white tracking-wide mb-4">
              Ready to Explore Gangtok?
            </h2>
            <p className="text-sm text-white/60 mb-8 max-w-lg mx-auto">
              Browse our curated tour packages and start planning your unforgettable journey today!
            </p>
            <Link
              href="/reserve"
              className="inline-flex items-center gap-3 bg-[#ae9e85] text-[#1a1914] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#c7b697] rounded-sm"
            >
              View Tour Packages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
