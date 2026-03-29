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
  { label: "State", value: "Kerala" },
  { label: "Tour Packages", value: "3 Active Tours" },
  { label: "Starting Price", value: "₹14,500" },
  { label: "Famous For", value: "Tea Estates & Backwaters" },
];

const whyVisit = [
  {
    title: "Lush Tea Plantations",
    desc: "Munnar is famous for its endless expanse of tea estates rolling over the hills, offering breathtaking emerald landscapes and fresh mountain air.",
    icon: "🍃",
  },
  {
    title: "Rich Wildlife",
    desc: "Home to the Eravikulam National Park, where you can spot the endangered Nilgiri Tahr and experience the rare Neelakurinji blooms.",
    icon: "🐘",
  },
  {
    title: "Tranquil Backwaters",
    desc: "Experience the unique houseboat stays and serene backwater cruises that Kerala is worldwide renowned for.",
    icon: "🛶",
  },
];

const attractions = [
  {
    name: "Mattupetty Dam",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1593693397690-362cb96c8c6a?q=80&w=800&auto=format&fit=crop",
    short: "A concrete gravity dam nestled in the hills, known for its scenic water reservoir and exciting boating experiences.",
  },
  {
    name: "Eravikulam National Park",
    tag: "Wildlife",
    image: "https://images.unsplash.com/photo-1620668988358-81e05d9bc37e?q=80&w=800&auto=format&fit=crop",
    short: "Kerala's first national park, famous for the endangered Nilgiri Tahr and rolling grasslands.",
  },
  {
    name: "Tea Museum",
    tag: "Heritage",
    image: "https://images.unsplash.com/photo-1579781354185-5a50787acc43?q=80&w=800&auto=format&fit=crop",
    short: "Discover the legacy and history of tea plantations in Munnar, complete with fresh tea tasting sessions.",
  },
  {
    name: "Echo Point",
    tag: "Adventure",
    image: "https://images.unsplash.com/photo-1596707323067-27b9ef80a316?q=80&w=800&auto=format&fit=crop",
    short: "A picturesque spot situated on the banks of a serene lake, famous for its natural echo phenomenon.",
  },
  {
    name: "Kundala Lake",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop",
    short: "An idyllic lake surrounded by lush green hills, where you can enjoy pedal boating and Kashmiri Shikara rides.",
  },
  {
    name: "Attukal Waterfalls",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?q=80&w=800&auto=format&fit=crop",
    short: "A spectacular waterfall cascading through rolling hills and dense jungles, perfect for trekking enthusiasts.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "September - March",
    temp: "10°C - 25°C",
    desc: "Winter is the best time to visit Munnar. The weather is cool, pleasant, and perfect for sightseeing, trekking, and exploring the tea estates.",
    color: "#7b9eb8",
    recommended: true,
  },
  {
    name: "Summer",
    months: "April - May",
    temp: "15°C - 25°C",
    desc: "Summers are mild and peaceful. It's an excellent time to escape the scorching heat of the plains and enjoy the cool mountain breeze.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Monsoon",
    months: "June - August",
    temp: "10°C - 20°C",
    desc: "Munnar looks stunningly lush and green during the monsoon. Ideal for nature lovers seeking quiet retreats, though outdoor activities may be restricted.",
    color: "#8ba87e",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Magical Munnar Explorer 4 Days 3 Nights",
    price: "₹14,500",
    duration: "4 Days/ 3 Night",
    tag: "Couple Friendly",
    image: "https://unsplash.com/photos/Tp-kViKErbw/download?force=true&w=600",
  },
  {
    title: "Kerala Backwaters & Munnar – 6 Nights 7 Days",
    price: "₹26,200",
    duration: "7 Days/ 6 Nights",
    tag: "Family-Friendly",
    image: "https://unsplash.com/photos/t-3qo5bGC0Q/download?force=true&w=600",
  },
  {
    title: "Munnar Wildlife & Heritage 5 Days 4 Nights",
    price: "₹19,200",
    duration: "5 Days/ 4 Night",
    tag: "Adventure",
    image: "https://images.unsplash.com/photo-1620668988358-81e05d9bc37e?q=80&w=600&auto=format&fit=crop",
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
export default function MunnarPage() {
  const [visibleAttractions, setVisibleAttractions] = useState(6);

  return (
    <>
      <Navbar />

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://unsplash.com/photos/Tp-kViKErbw/download?force=true&w=1800"
          alt="Silhouette of boat on sea during sunset in Munnar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 via-[#1a1914]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1914]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#ae9e85]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">
                Kerala, India
              </span>
            </div>
            <h1 className="font-roman text-6xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">
              Munnar
            </h1>
            <p className="font-roman text-xl md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">
              The Emerald Heaven of Kerala
            </p>
          </motion.div>
        </div>

        {/* Decorative corner frames */}
        <div className="absolute top-20 left-6 w-20 h-20 border-t border-l border-white/10" />
        <div className="absolute bottom-6 right-6 w-20 h-20 border-b border-r border-white/10" />
      </section>

      {/* ══════════ 2. ABOUT + QUICK INFO ══════════ */}
      <section className="bg-[#f4ebd9] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24">
            {/* About text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">About Munnar</span>
              </div>
              <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-6">
                God's Own Country
              </h2>
              <p className="text-[#5c544b] leading-relaxed mb-4">
                Munnar is a tranquil hill station in Kerala, historically known as the summer resort of the erstwhile British administration in South India. It is situated at the confluence of three mountain streams—Mudrapuzha, Nallathanni, and Kundala.
              </p>
              <p className="text-[#5c544b] leading-relaxed mb-4">
                Famous for its expansive tea plantations, colonial towns, winding lanes, and magnificent waterfalls, Munnar offers an unmatched natural sanctuary. The region is highly coveted for the Eravikulam National Park and the spectacular Neelakurinji flowers, which bloom once every twelve years.
              </p>
              <p className="text-[#5c544b] leading-relaxed">
                Whether you seek the serenity of emerald green hills or the tranquil backwaters closer to the coast, a journey through Munnar provides the quintessential Kerala experience.
              </p>
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
                href="#packages"
                className="mt-6 flex items-center justify-center gap-2 bg-[#3d3831] text-[#f4ebd9] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#2a2520] rounded-sm"
              >
                Explore Tours
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#f0e7d6] tracking-wide mt-3">
              Why Visit Munnar?
            </h2>
            <p className="text-sm text-[#a09383] mt-4 max-w-xl mx-auto">
              Discover what makes this destination special and why travelers from around the world choose to explore Munnar.
            </p>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyVisit.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.15}
                className="group border border-white/8 p-8 rounded-sm hover:border-[#ae9e85]/30 transition-colors duration-500 relative overflow-hidden"
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
      <section className="bg-[#f4ebd9] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Must-Visit Places</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Top Attractions
            </h2>
            <p className="text-sm text-[#7a705e] mt-4 max-w-lg mx-auto">
              Discover the must-visit places in Munnar. From breathtaking natural wonders to cultural landmarks, there's something for every traveler.
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
                <div className="relative h-52 overflow-hidden">
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
                  <p className="text-xs text-[#7a705e] leading-relaxed mb-4">{attr.short}</p>

                </div>
              </motion.div>
            ))}
          </div>

          {visibleAttractions < attractions.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleAttractions(attractions.length)}
                className="border border-[#3d3831] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d3831] transition-all duration-300 hover:bg-[#3d3831] hover:text-[#f4ebd9] rounded-sm"
              >
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
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Best Time to Visit
            </h2>
            <p className="text-sm text-[#7a705e] mt-4 max-w-lg mx-auto">
              Plan your trip to Munnar with our seasonal guide. Each season offers unique experiences and different weather conditions.
            </p>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {seasons.map((s, i) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className={`relative p-6 rounded-sm border transition-all duration-300 hover:shadow-lg ${
                  s.recommended
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
                Munnar’s pristine beauty is best experienced between September and March. The weather is cool, incredibly pleasant, and provides the perfect backdrop for exploring the rolling tea estates and viewing the local wildlife.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 6. TOUR PACKAGES ══════════ */}
      <section id="packages" className="bg-[#f4ebd9] py-20 md:py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">Curated Experiences</span>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide mt-3">
              Explore Tour Packages
            </h2>
            <div className="w-12 h-px bg-[#ae9e85] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourPackages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={(i % 3) * 0.1}
                className="group rounded-sm overflow-hidden bg-white/30 border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 to-transparent" />
                  {pkg.tag && (
                    <span className="absolute top-4 left-4 bg-[#ae9e85]/90 text-[#1a1914] text-[8px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-sm">
                      {pkg.tag}
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="font-roman text-2xl font-bold text-white">{pkg.price}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-roman text-lg font-semibold text-[#3d3831] mb-3 leading-snug">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#ae9e85] mb-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2" strokeLinecap="round"/>
                    </svg>
                    {pkg.duration}
                  </div>
                  <div className="mt-auto">
                    <Link
                      href="/reserve"
                      className="mt-6 flex items-center justify-center gap-2 w-full border border-[#3d3831] py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#3d3831] hover:bg-[#3d3831] hover:text-[#f4ebd9] transition-all duration-300 rounded-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 7. CTA BANNER ══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="https://unsplash.com/photos/t-3qo5bGC0Q/download?force=true&w=1800"
          alt="Brown nipa hut on green grass field during daytime in Munnar"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1914]/70" />
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-white tracking-wide mb-4">
              Ready to Explore Munnar?
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
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
