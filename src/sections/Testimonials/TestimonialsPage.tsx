"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const testimonials = [
  {
    id: 1,
    name: "Eleanor & James",
    location: "Pelling & Darjeeling",
    text: "Our trip was nothing short of magical. The views from the skywalk in Pelling were unforgettable, and waking up to the sunrise over Kanchenjunga in Darjeeling felt like a dream. Every hotel, every transfer—flawless.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    id: 2,
    name: "Aarav Sharma",
    location: "Gangtok Explorer",
    text: "Imagicaholidays truly understands luxury. The heritage stay in Gangtok was sublime, and the local guides shared stories that brought the monasteries to life. I felt entirely looked after.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    colSpan: "col-span-1",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    location: "Lachung Retreat",
    text: "Finding peace in the Valley of Flowers was precisely what I needed. The curated itinerary struck the perfect balance between thrilling exploration and peaceful solitude. A masterclass in travel design.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    colSpan: "col-span-1",
  },
  {
    id: 4,
    name: "The Patel Family",
    location: "Sikkim Grand Tour",
    text: "Traveling with children can be challenging, but this team anticipated every need. From comfortable sanitized vehicles to child-friendly dining recommendations, they crafted a journey our family will treasure forever.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: 5,
    name: "Mei Lin",
    location: "Darjeeling Tea Trail",
    text: "I appreciated the deep cultural immersion. Visiting the old tea estates and riding the Toy Train was beautifully nostalgic. The team’s bespoke service is unmatched.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    colSpan: "col-span-1",
  },
  {
    id: 6,
    name: "David Ross",
    location: "Pelling Heritage",
    text: "Breathtaking landscapes complemented by immaculate service. Walking through the Rabdentse Ruins at sunset, guided by locals who knew every secret, was the highlight of my year.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    colSpan: "col-span-1",
  },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function TestimonialsPage() {
  return (
    <>
      <Navbar />

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-[#100e0a]">
        <Image
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000&auto=format&fit=crop"
          alt="Happy travelers overlooking mountain vista"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914] via-[#1a1914]/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#ae9e85]" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#d5cab5] font-semibold">
                Guest Book
              </span>
              <div className="w-12 h-px bg-[#ae9e85]" />
            </div>
            <h1 className="font-roman text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-[0.08em] uppercase">
              Happy Travelers
            </h1>
            <p className="font-roman text-xl md:text-2xl italic text-[#a09383] mt-6 max-w-2xl mx-auto tracking-wide">
              "The finest compliment we can receive is the memory of your journey."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 2. TESTIMONIALS GRID ══════════ */}
      <section className="relative bg-[#f4ebd9] py-24 md:py-32 px-6 md:px-12 lg:px-24">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#ae9e85] to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                custom={i * 0.1}
                className={`relative group bg-white/40 backdrop-blur-sm border border-[#d5cab5]/40 p-8 md:p-10 rounded-sm hover:shadow-2xl hover:shadow-[#d5cab5]/20 transition-all duration-700 ${t.colSpan}`}
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-6 right-8 text-8xl font-serif text-[#ae9e85]/15 leading-none select-none group-hover:text-[#ae9e85]/25 transition-colors duration-700">
                  "
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill="#ae9e85">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Body Text */}
                  <p className="text-[#5c544b] text-base md:text-lg leading-relaxed mb-10 italic font-light relative">
                    {t.text}
                  </p>

                  {/* User Info (pushed to bottom) */}
                  <div className="mt-auto flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#d5cab5]">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-roman text-sm font-bold text-[#3d3831] uppercase tracking-wide">
                        {t.name}
                      </h4>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#ae9e85] mt-1">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ae9e85] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. CTA SECTION ══════════ */}
      <section className="relative py-28 md:py-40 bg-[#1a1914] text-center px-6 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-[0.03]" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] block mb-4">
              Your Journey Awaits
            </span>
            <h2 className="font-roman text-4xl md:text-6xl font-medium text-[#f0e7d6] tracking-wide mb-8">
              Become Our Next Happy Traveler
            </h2>
            <p className="text-[#a09383] text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Ready to craft unforgettable memories? Let our team design a bespoke Himalayan experience tailored entirely to your desires.
            </p>
            
            <Link
              href="/reserve"
              className="inline-flex items-center gap-3 bg-white text-[#1a1914] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#ae9e85] hover:text-white rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Start Planning
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
