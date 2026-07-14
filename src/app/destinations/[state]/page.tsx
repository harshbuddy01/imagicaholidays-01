"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

interface CityEntry {
  slug: string;
  title: string;
  location: string;
  description: string;
  image: string;
  highlights?: string[];
  bestFor?: string;
  startingPrice?: string;
}

const stateData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
  cities: CityEntry[];
  trendingNote?: string;
}> = {
  sikkim: {
    title: "Sikkim",
    tagline: "Himalayan Sanctuary",
    description: "Sacred peaks, alpine lakes, and ancient monasteries nestled in the clouds. Sikkim is one of India's most breathtaking and sought-after travel destinations.",
    bannerImage: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1800",
    accentColor: "#628ba8",
    bgFrom: "#edf1f4",
    bgTo: "#f4f7f9",
    trendingNote: "🔥 One of India's fastest growing travel destinations in 2025",
    cities: [
      {
        slug: "gangtok",
        title: "Gangtok",
        location: "East Sikkim",
        description: "The vibrant capital where Tibetan culture meets modern Himalayan living. Famous for MG Marg, Nathu La Pass, Tsomgo Lake, and panoramic Kanchenjunga views.",
        image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Tsomgo Lake", "Nathu La Pass", "MG Marg", "Rumtek Monastery"],
        bestFor: "Honeymoon, Family, Adventure",
        startingPrice: "₹10,475",
      },
      {
        slug: "pelling",
        title: "Pelling",
        location: "West Sikkim",
        description: "Panoramic Kanchenjunga views, India's first glass skywalk, and ancient monasteries make Pelling a once-in-a-lifetime retreat.",
        image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Pelling Skywalk", "Pemayangtse Monastery", "Khecheopalri Lake", "Singshore Bridge"],
        bestFor: "Nature, Spiritual, Trekking",
        startingPrice: "₹9,200",
      },
      {
        slug: "lachung",
        title: "Lachung",
        location: "North Sikkim",
        description: "A serene mountain village perched near the Valley of Flowers. Gateway to Yumthang Valley, Zero Point, and pristine high-altitude lakes.",
        image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Yumthang Valley", "Zero Point", "Shingba Sanctuary", "Lachung Monastery"],
        bestFor: "Alpine, Wildlife, Photography",
        startingPrice: "₹10,129",
      },
    ],
  },
  "west-bengal": {
    title: "West Bengal",
    tagline: "Colonial & Tea Heritage",
    description: "Mist-covered hills, rolling tea plantations, colonial architecture, and rich cultural legacies await you in West Bengal.",
    bannerImage: "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=1800",
    accentColor: "#a5813b",
    bgFrom: "#f9f5ee",
    bgTo: "#fcfaf6",
    cities: [
      {
        slug: "darjeeling",
        title: "Darjeeling",
        location: "West Bengal Hills",
        description: "The legendary Queen of Hills. Rolling tea gardens, UNESCO Toy Train, and sunrise vistas over Kanchenjunga that take your breath away.",
        image: "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Tiger Hill Sunrise", "Toy Train (UNESCO)", "Happy Valley Tea Estate", "Ghoom Monastery"],
        bestFor: "Honeymoon, Tea Lovers, Heritage",
        startingPrice: "₹5,200",
      },
      {
        slug: "kolkata",
        title: "Kolkata",
        location: "West Bengal",
        description: "The City of Joy. Grand colonial architecture, the Victoria Memorial, the Howrah Bridge, and India's most vibrant street food culture.",
        image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Temple", "Park Street Cuisine"],
        bestFor: "History, Art & Culture, Cuisine",
        startingPrice: "₹6,800",
      },
    ],
  },
  kerala: {
    title: "Kerala",
    tagline: "God's Own Country",
    description: "Serene backwaters, emerald tea gardens, lush spice plantations, and pristine wildlife — Kerala is unlike anywhere else on earth.",
    bannerImage: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1800",
    accentColor: "#4b8258",
    bgFrom: "#eaf0e9",
    bgTo: "#f2f6f1",
    cities: [
      {
        slug: "munnar",
        title: "Munnar",
        location: "Kerala Hills",
        description: "The emerald tea capital of South India. Rolling hills covered in green carpets of tea estates, pristine wildlife parks, and cool mountain air.",
        image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Echo Point"],
        bestFor: "Couple, Family, Wildlife",
        startingPrice: "₹14,500",
      },
      {
        slug: "wayanad",
        title: "Wayanad",
        location: "Kerala Forests",
        description: "Ancient Edakkal Caves, misty waterfalls, lush spice estates, and the Wayanad Wildlife Sanctuary in the heart of the Western Ghats.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Edakkal Caves", "Chembra Peak", "Soochipara Falls", "Wildlife Sanctuary"],
        bestFor: "Adventure, Nature, Wellness",
        startingPrice: "₹12,400",
      },
    ],
  },
  "tamil-nadu": {
    title: "Tamil Nadu",
    tagline: "Dravidian Heritage & Hill Stations",
    description: "Majestic stone temples, rich artistic traditions, and refreshing hill retreats set against the backdrop of the Nilgiri range.",
    bannerImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80",
    accentColor: "#9a6b3b",
    bgFrom: "#f5ede4",
    bgTo: "#f9f4ef",
    cities: [
      {
        slug: "ooty",
        title: "Ooty",
        location: "Nilgiri Hills",
        description: "The Queen of Hill Stations. Nilgiri Mountain Railway, Ooty Lake, Doddabetta Peak, and lush botanical gardens nestled in the cool Nilgiris.",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Nilgiri Mountain Railway", "Ooty Lake", "Doddabetta Peak", "Botanical Gardens"],
        bestFor: "Family, Nature, Photography",
        startingPrice: "₹8,000",
      },
    ],
  },
  rajasthan: {
    title: "Rajasthan",
    tagline: "Land of Kings",
    description: "Grand desert fortresses, royal lake palaces, and rich heritage narratives — Rajasthan is India's most regal travel story.",
    bannerImage: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=1800",
    accentColor: "#c9903b",
    bgFrom: "#f9f3e6",
    bgTo: "#fdf8ee",
    cities: [
      {
        slug: "jaipur",
        title: "Jaipur",
        location: "Rajasthan",
        description: "The Pink City. UNESCO-listed Amer Fort, the iconic Hawa Mahal, Jantar Mantar, and the opulent City Palace — royal Rajputana in full glory.",
        image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Amer Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
        bestFor: "Heritage, Culture, Photography",
        startingPrice: "₹22,500",
      },
      {
        slug: "udaipur",
        title: "Udaipur",
        location: "Rajasthan",
        description: "The City of Lakes. White marble palaces rising from Lake Pichola, stunning sunset boat rides, and the romance of the Mewar dynasty.",
        image: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["City Palace", "Jag Mandir", "Lake Pichola", "Gangaur Ghat"],
        bestFor: "Honeymoon, Luxury, Heritage",
        startingPrice: "₹24,800",
      },
    ],
  },
  goa: {
    title: "Goa",
    tagline: "Coastal Tranquility",
    description: "Sundecks, colonial architecture, and the gentle breeze of the Arabian Sea — Goa is India's perennial tropical paradise.",
    bannerImage: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1800",
    accentColor: "#3f888f",
    bgFrom: "#e9f2f2",
    bgTo: "#f2f8f8",
    cities: [
      {
        slug: "goa",
        title: "Goa",
        location: "West Coast",
        description: "Pristine beaches, UNESCO-listed churches, beach shacks, water sports, and the vibrant blend of Portuguese and Indian cultures.",
        image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1200",
        highlights: ["Bom Jesus Basilica", "Palolem Beach", "Aguada Fort", "Dudhsagar Falls"],
        bestFor: "Beaches, Nightlife, History",
        startingPrice: "₹18,500",
      },
    ],
  },
  "andaman-nicobar": {
    title: "Andaman & Nicobar",
    tagline: "Tropical Haven",
    description: "Turquoise waters, white-sand beaches, and rich marine biodiversity — the Andaman Islands are a pristine island paradise.",
    bannerImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1800&q=80",
    accentColor: "#3f888f",
    bgFrom: "#e9f2f2",
    bgTo: "#f2f8f8",
    trendingNote: "⭐ Trending: One of India's hottest emerging island destinations",
    cities: [
      {
        slug: "port-blair",
        title: "Port Blair",
        location: "Andaman Islands",
        description: "The capital and gateway to the Andaman archipelago. Cellular Jail, Havelock Island, Radhanagar Beach, and vibrant coral reef diving await.",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
        highlights: ["Cellular Jail", "Radhanagar Beach", "Ross Island", "Scuba Diving"],
        bestFor: "Beaches, History, Diving",
        startingPrice: "₹15,000",
      },
    ],
  },
};

export default function StatePage() {
  const params = useParams();
  const stateSlug = typeof params.state === "string" ? params.state : "";
  const current = stateData[stateSlug];

  if (!current) {
    return (
      <main className="bg-[#f8f5f0] min-h-screen text-[#1a1714]">
        <Navbar />
        <section className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-glyptic text-4xl uppercase tracking-widest mb-4">State Not Found</h1>
          <p className="font-serif italic text-stone-500 mb-8">The state you are looking for does not exist in our memoirs.</p>
          <Link href="/destinations" className="border border-[#a5813b] text-[#a5813b] px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#a5813b] hover:text-white transition-all">
            Back to Destinations
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const accent = current.accentColor;

  return (
    <main className="min-h-screen text-[#1a1714]" style={{ background: `linear-gradient(160deg, ${current.bgFrom} 0%, ${current.bgTo} 100%)` }}>
      {/* Paper texture — absolute to avoid scroll repaint */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none z-0" />

      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative h-[55vh] md:h-[75vh] overflow-hidden">
        <Image src={current.bannerImage} alt={current.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.trendingNote && (
              <div
                className="inline-flex items-center gap-2 text-white text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 rounded-full mb-4 shadow-lg backdrop-blur-sm"
                style={{ background: `${accent}cc` }}
              >
                {current.trendingNote}
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: accent }} />
              <span className="text-[9px] tracking-[0.4em] uppercase font-bold" style={{ color: "#d5cab5" }}>
                {current.tagline}
              </span>
            </div>
            <h1 className="font-roman text-4xl md:text-7xl lg:text-8xl font-medium text-white tracking-[0.06em] uppercase leading-none">
              {current.title}
            </h1>
            <p className="text-sm md:text-base text-white/65 mt-3 max-w-lg font-serif italic leading-relaxed">
              {current.description}
            </p>
          </motion.div>
        </div>

        {/* Corner frames */}
        <div className="absolute top-16 left-6 w-10 h-10 border-t border-l border-white/15" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/15" />
      </section>

      {/* ══════════════ CITIES GRID ══════════════ */}
      <section className="relative z-10 py-12 md:py-24 px-5 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold" style={{ color: accent }}>
              Choose Your Retreat
            </span>
            <h2 className="font-roman text-2xl md:text-4xl font-medium text-[#1a1714] tracking-wide mt-2">
              Cities & Retreats in {current.title}
            </h2>
            <div className="w-10 h-px mx-auto mt-5" style={{ background: `${accent}60` }} />
          </motion.div>

          {/* City cards — responsive grid: 1 col mobile, 2-3 desktop */}
          <div className={`grid gap-5 md:gap-8 ${current.cities.length === 1 ? "max-w-lg mx-auto" : current.cities.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
            {current.cities.map((city, idx) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
              >
                <Link
                  href={`/destinations/${city.slug}`}
                  className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-stone-200/60 hover:-translate-y-1"
                  style={{ borderTop: `3px solid ${accent}` }}
                >
                  {/* City Image */}
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    <Image
                      src={city.image}
                      alt={city.title}
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Location pill */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        📍 {city.location}
                      </span>
                    </div>

                    {/* Price badge */}
                    {city.startingPrice && (
                      <div className="absolute bottom-3 right-3">
                        <span
                          className="text-white text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                          style={{ background: `${accent}dd` }}
                        >
                          From {city.startingPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="p-5 md:p-6">
                    <h3
                      className="font-roman text-2xl md:text-3xl font-semibold tracking-wide uppercase transition-colors duration-300"
                      style={{ color: "#1a1914" }}
                    >
                      {city.title}
                    </h3>

                    {city.bestFor && (
                      <p className="text-[9px] uppercase tracking-[0.2em] font-bold mt-1 mb-3" style={{ color: accent }}>
                        Best for: {city.bestFor}
                      </p>
                    )}

                    <p className="text-xs text-stone-500 font-serif leading-relaxed mb-4">
                      {city.description}
                    </p>

                    {/* Highlights */}
                    {city.highlights && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {city.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[8px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-full border"
                            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}08` }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.18em] font-bold py-2.5 px-3 rounded-xl transition-all duration-300 group-hover:shadow-md"
                      style={{ background: `${accent}12`, color: accent }}
                    >
                      <span>Explore {city.title}</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BACK LINK ══════════════ */}
      <section className="pb-12 md:pb-20 text-center">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 hover:underline"
          style={{ color: accent }}
        >
          <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Back to All Destinations
        </Link>
      </section>

      <Footer />
    </main>
  );
}
