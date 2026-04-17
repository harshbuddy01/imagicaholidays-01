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
  { label: "State", value: "West Bengal" },
  { label: "Tour Packages", value: "5 Active Tours" },
  { label: "Starting Price", value: "₹9,780" },
  { label: "Famous For", value: "Queen of the Hills" },
];

const whyVisit = [
  {
    title: "Stunning Views of Mt. Kanchenjunga",
    desc: "Darjeeling offers panoramic views of Mt. Kanchenjunga, the world's third-highest peak. Tiger Hill is a popular spot for breathtaking sunrise views over the Himalayas.",
    icon: "🏔️",
  },
  {
    title: "Darjeeling Himalayan Railway (Toy Train)",
    desc: "A UNESCO World Heritage Site, the Toy Train offers a nostalgic, scenic ride through lush tea gardens and dense forests, making it a must-do activity for visitors.",
    icon: "🚂",
  },
  {
    title: "Tea Gardens & Estates",
    desc: "Known for its world-famous Darjeeling tea, visitors can tour the lush tea estates, learn about tea production, and enjoy freshly brewed tea while surrounded by beautiful hills.",
    icon: "🍵",
  },
];

const attractions = [
  {
    name: "Tiger Hill",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736744/pexels-photo-33736744.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The most famous sunrise viewpoint in Darjeeling. Breathtaking panoramic views of Mt. Kanchenjunga and, on clear days, even Mt. Everest.",
  },
  {
    name: "Darjeeling Himalayan Railway",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The iconic Toy Train offers a scenic joy ride through hills, tunnels, and tea gardens. A UNESCO World Heritage railway.",
  },
  {
    name: "Japanese Peace Pagoda",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33736745/pexels-photo-33736745.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A serene white pagoda on Jalapahar Hill promoting peace and harmony, with beautiful views of Darjeeling and surrounding mountains.",
  },
  {
    name: "Happy Valley Tea Estate",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736752/pexels-photo-33736752.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the oldest tea estates where visitors can see tea processing and enjoy fresh Darjeeling tea tasting.",
  },
  {
    name: "Ghoom Monastery",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Also known as Yiga Choeling Monastery, it houses a 15-foot-high statue of Maitreya Buddha. One of the oldest Tibetan monasteries.",
  },
  {
    name: "Batasia Loop",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/33736747/pexels-photo-33736747.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A spiral railway created to lower the gradient of the Darjeeling Himalayan Railway. Commissioned in 1919 with stunning mountain views.",
  },
  {
    name: "Padmaja Naidu Zoological Park",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/30238128/pexels-photo-30238128.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of India's most famous high-altitude zoos, known for conservation of red pandas, snow leopards, and Himalayan black bears.",
  },
  {
    name: "Himalayan Mountaineering Institute",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/32313654/pexels-photo-32313654.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Established in 1954 in honor of Tenzing Norgay. Houses a mountaineering museum with equipment and stories of Himalayan expeditions.",
  },
  {
    name: "Tenzing Rock",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A famous natural rock on Hill Cart Road used for rock-climbing training by the Himalayan Mountaineering Institute.",
  },
  {
    name: "Chitrey Tea Garden",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736754/pexels-photo-33736754.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A scenic tea estate near Manebhanjan along the route to Singalila National Park and Sandakphu trekking trail.",
  },
  {
    name: "Japanese Temple",
    tag: "Religious",
    image: "https://images.pexels.com/photos/17210173/pexels-photo-17210173.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A serene Buddhist temple built by Japanese monk Nichidatsu Fujii to promote world peace, located on Jalapahar Hill.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March – May",
    temp: "10°C – 20°C",
    desc: "Spring is one of the best times to visit. Pleasant cool weather, blooming rhododendrons and cherry blossoms, and the clearest views of Mt. Kanchenjunga.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June – August",
    temp: "15°C – 25°C",
    desc: "Mild summers make it a great escape from the plains. Moderate rainfall enhances the lush greenery. Good time for tea garden tours, but be cautious of occasional landslides.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "September – November",
    temp: "10°C – 20°C",
    desc: "Cool, dry weather with clear skies and stunning mountain views. The region is lush after the monsoon, perfect for trekking and sightseeing.",
    color: "#c47d3e",
    recommended: true,
  },
  {
    name: "Winter",
    months: "December – February",
    temp: "2°C – 12°C",
    desc: "Cold with possible snowfall at Tiger Hill and Sandakphu. Great for snow lovers and crisp Himalayan views. Warm clothing essential.",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Darjeeling 2N/3D Tour Package",
    price: "₹5,200",
    duration: "3 Days / 2 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 5N/6D",
    price: "₹11,800",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33736744/pexels-photo-33736744.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Pelling Darjeeling 5N/6D",
    price: "₹12,500",
    duration: "6 Days / 5 Nights",
    tag: "Popular",
    image: "https://images.pexels.com/photos/33736747/pexels-photo-33736747.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 4N/5D",
    price: "₹10,200",
    duration: "5 Days / 4 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/33736745/pexels-photo-33736745.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Pelling & Darjeeling 4N/5D",
    price: "₹9,200",
    duration: "5 Days / 4 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/33736754/pexels-photo-33736754.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATION
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
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function DarjeelingPage() {
  const [visibleAttractions, setVisibleAttractions] = useState(6);

  return (
    <>
      <Navbar />

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative h-[65vh] md:h-[85vh] min-h-[450px] md:min-h-[600px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Train traveling through lush green countryside in Darjeeling"
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
                West Bengal, India
              </span>
            </div>
            <h1 className="font-roman text-4xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">
              Darjeeling
            </h1>
            <p className="font-roman text-base md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">
              The Queen of the Hills
            </p>
          </motion.div>
        </div>

        <div className="absolute top-20 left-6 w-12 h-12 md:w-20 md:h-20 border-t border-l border-white/10" />
        <div className="absolute bottom-6 right-6 w-12 h-12 md:w-20 md:h-20 border-b border-r border-white/10" />
      </section>

      {/* ══════════ 2. ABOUT + QUICK INFO ══════════ */}
      <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ae9e85" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85]">About Darjeeling Holidays</span>
              </div>
              <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-4 md:mb-6">
                Luxury Darjeeling Tour Packages & Tea Estate Retreats
              </h2>
              <div className="space-y-4">
                <p className="text-[#5c544b] leading-relaxed">
                  Experience the pinnacle of Himalayan elegance with our bespoke <strong>Darjeeling tour packages</strong>. Crowned as the &ldquo;Queen of the Hills&rdquo;, Darjeeling is West Bengal's most coveted holiday destination, offering travelers breathtaking, unobstructed views of the majestic Mount Kanchenjunga. Whether you are searching for a peaceful family getaway or a romantic <strong>Darjeeling honeymoon package</strong>, our handcrafted itineraries promise unparalleled luxury.
                </p>
                <p className="text-[#5c544b] leading-relaxed">
                  As regional travel experts, Imagica Holidays ensures your <strong>Darjeeling itinerary</strong> encompasses the very best this iconic hill station has to offer. Ride the UNESCO World Heritage <strong>Toy Train (Darjeeling Himalayan Railway)</strong>, witness the incredible sunrise from <strong>Tiger Hill</strong>, and walk through sprawling, world-famous <strong>Darjeeling tea estates</strong> while staying in premium heritage properties and luxury resorts.
                </p>
                <p className="text-[#5c544b] leading-relaxed">
                  Avoid the hassle of coordinating taxis and permits. Our comprehensive <strong>West Bengal tourism packages</strong> offer end-to-end service, seamlessly connecting Darjeeling with neighboring jewels like Gangtok and Pelling. Review our guide on the <strong>best time to visit Darjeeling</strong> below and let us craft a five-star Himalayan retreat customized entirely around you.
                </p>
              </div>
            </motion.div>

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
              Why Visit Darjeeling?
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
                aria-label="View all tourist attractions in Darjeeling"
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

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
            className="mt-10 flex items-start gap-4 bg-white/40 border border-[#d5cab5]/40 p-6 rounded-sm"
          >
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-roman text-sm font-semibold text-[#3d3831] mb-1">Our Recommendation</p>
              <p className="text-xs text-[#7a705e] leading-relaxed">
                Darjeeling, with its cool climate and stunning landscapes, is a year-round destination. However, the best time to visit depends on the kind of experience you&apos;re looking for — clear mountain views, blooming flowers, snowfall, or peaceful off-season travel.
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tourPackages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={(i % 3) * 0.1}
                className="group rounded-sm overflow-hidden bg-white/30 border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                <div className="p-5">
                  <h3 className="font-roman text-base font-semibold text-[#3d3831] mb-2 leading-snug">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#ae9e85]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" />
                    </svg>
                    {pkg.duration}
                  </div>
                  <Link
                    href="/reserve"
                    className="mt-4 flex items-center justify-center gap-2 w-full border border-[#3d3831] py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3d3831] hover:bg-[#3d3831] hover:text-[#f4ebd9] transition-all duration-300 rounded-sm"
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
          src="https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Darjeeling Toy Train"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1914]/70" />
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="font-roman text-3xl md:text-5xl font-medium text-white tracking-wide mb-4">
              Ready to Explore Darjeeling?
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
