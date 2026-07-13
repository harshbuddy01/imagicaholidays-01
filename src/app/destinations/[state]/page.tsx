"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Hierarchical State -> Cities Data Mapping
const stateData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  cities: Array<{
    slug: string;
    title: string;
    location: string;
    description: string;
    image: string;
  }>;
}> = {
  sikkim: {
    title: "Sikkim",
    tagline: "Himalayan Sanctuary",
    description: "Sacred peaks, alpine lakes, and ancient monasteries nestled in the clouds.",
    bannerImage: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1800",
    cities: [
      {
        slug: "gangtok",
        title: "Gangtok",
        location: "East Sikkim",
        description: "A sanctuary in the Himalayas where tradition meets tranquility.",
        image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        slug: "pelling",
        title: "Pelling",
        location: "West Sikkim",
        description: "Sacred lakes and ancient monasteries with a view of the gods.",
        image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        slug: "lachung",
        title: "Lachung",
        location: "North Sikkim",
        description: "Snow-capped peaks, alpine valleys, and breathtaking frozen waterbodies.",
        image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
      }
    ]
  },
  "west-bengal": {
    title: "West Bengal",
    tagline: "Colonial & Tea Heritage",
    description: "Mist-covered hills, rolling tea plantations, and rich cultural legacies.",
    bannerImage: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1800",
    cities: [
      {
        slug: "darjeeling",
        title: "Darjeeling",
        location: "West Bengal",
        description: "Mist-kissed peaks and rolling tea gardens in the Queen of Hills.",
        image: "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        slug: "kolkata",
        title: "Kolkata",
        location: "West Bengal",
        description: "The City of Joy, renowned for its heritage, architecture, and art.",
        image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
      }
    ]
  },
  kerala: {
    title: "Kerala",
    tagline: "God's Own Country",
    description: "Serene backwaters, emerald tea gardens, and lush spice plantations.",
    bannerImage: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1800",
    cities: [
      {
        slug: "munnar",
        title: "Munnar",
        location: "Kerala",
        description: "The emerald heaven where clouds rest upon velvet green hills.",
        image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        slug: "wayanad",
        title: "Wayanad",
        location: "Kerala",
        description: "Ancient caves and misty plantations in the heart of the Western Ghats.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      }
    ]
  },
  "tamil-nadu": {
    title: "Tamil Nadu",
    tagline: "Dravidian Heritage & Hill Stations",
    description: "Majestic stone temples, rich artistic traditions, and refreshing hill retreats.",
    bannerImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80",
    cities: [
      {
        slug: "ooty",
        title: "Ooty",
        location: "Tamil Nadu",
        description: "The Queen of Hill Stations, nestled in the scenic Nilgiri Hills.",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      }
    ]
  },
  rajasthan: {
    title: "Rajasthan",
    tagline: "Land of Kings",
    description: "Grand desert fortresses, royal lake palaces, and rich heritage narratives.",
    bannerImage: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=1800",
    cities: [
      {
        slug: "jaipur",
        title: "Jaipur",
        location: "Rajasthan",
        description: "The Pink City where history is written in sandstone and light.",
        image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        slug: "udaipur",
        title: "Udaipur",
        location: "Rajasthan",
        description: "A golden sunset over the legendary City of Lakes.",
        image: "https://images.pexels.com/photos/29851603/pexels-photo-29851603.jpeg?auto=compress&cs=tinysrgb&w=800",
      }
    ]
  },
  goa: {
    title: "Goa",
    tagline: "Coastal Tranquility",
    description: "Sundecks, colonial architecture, and the gentle breeze of the Arabian Sea.",
    bannerImage: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1800",
    cities: [
      {
        slug: "goa",
        title: "Goa",
        location: "West Coast",
        description: "Pristine sands and colonial whispers on the edge of the Arabian Sea.",
        image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=800",
      }
    ]
  },
  "andaman-nicobar": {
    title: "Andaman & Nicobar",
    tagline: "Tropical Haven",
    description: "Turquoise waters, white-sand beaches, and rich marine biodiversity.",
    bannerImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1800&q=80",
    cities: [
      {
        slug: "port-blair",
        title: "Port Blair",
        location: "Andaman Islands",
        description: "Pristine beaches, historical landmarks, and vibrant coral reefs.",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
      }
    ]
  }
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
          <Link href="/destinations" className="btn-tertiary">Back to Archive</Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#f8f5f0] min-h-screen text-[#1a1714] relative">
      {/* Background Hand-Drawn Sketch & Paper Texture Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-multiply bg-[url('/images/destinations_sketch_bg.webp')] bg-repeat bg-[size:450px] md:bg-[size:800px] bg-center" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none z-0" />

      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden z-10">
        <Image
          src={current.bannerImage}
          alt={current.title}
          fill
          className="object-cover brightness-[0.55] contrast-[1.05]"
          priority
        />
        <div className="absolute inset-0 bg-[#3d3831]/20 mix-blend-multiply" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.8em] text-[#d8be8f] font-bold mb-6">
              {current.tagline}
            </p>
            <h1 className="font-glyptic text-5xl md:text-8xl text-white uppercase tracking-[0.05em] leading-tight">
              {current.title}
            </h1>
            <div className="flex justify-center items-center gap-6 mt-8">
              <div className="w-10 h-px bg-[#d8be8f]/40" />
              <p className="font-roman text-white/70 italic text-md tracking-wider max-w-lg">{current.description}</p>
              <div className="w-10 h-px bg-[#d8be8f]/40" />
            </div>
          </motion.div>
        </div>

        <div className="absolute top-16 left-8 right-8 bottom-8 border border-white/10 pointer-events-none" />
      </section>

      {/* Cities list Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#a5813b] font-bold mb-3">Explore Regions</p>
          <h2 className="font-roman italic text-3xl text-stone-700">Handcrafted retreats in {current.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
          {current.cities.map((city, idx) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
              className="group"
            >
              <Link href={`/destinations/${city.slug}`} className="block">
                {/* Handcrafted Card Frame */}
                <div className="relative aspect-[4/5] bg-white shadow-xl p-4 transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={city.image}
                      alt={city.title}
                      fill
                      className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.08] mix-blend-overlay" />
                  </div>
                  <div className="absolute -inset-2 border border-[#a5813b]/10 group-hover:border-[#a5813b]/30 transition-colors duration-700 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="mt-8 flex flex-col items-center md:items-start text-center md:text-left px-2">
                  <p className="font-manrope text-[#a5813b] text-[10px] uppercase tracking-[0.25em] font-bold mb-2">
                    {city.location}
                  </p>
                  <h3 className="font-glyptic text-2xl text-[#1a1714] uppercase tracking-wider group-hover:text-[#a5813b] transition-colors duration-300">
                    {city.title}
                  </h3>
                  <p className="mt-3 text-stone-500 font-serif text-sm leading-relaxed max-w-sm">
                    {city.description}
                  </p>
                  <span className="mt-4 font-roman text-[10px] uppercase tracking-[0.25em] text-[#a5813b] group-hover:underline">
                    Explore memoirs &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
