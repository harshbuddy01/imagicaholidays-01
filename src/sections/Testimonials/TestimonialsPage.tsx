"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   HAND-CRAFTED SVG ARTWORK & DECORATIONS
   ═══════════════════════════════════════════════════════════ */

const BotanicalBranch = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 200" className={`stroke-current fill-none ${className}`} strokeWidth="0.8">
    <path d="M50,200 Q45,100 50,0" />
    <path d="M50,150 Q75,120 90,80 Q75,100 50,110" />
    <path d="M50,120 Q25,90 10,50 Q25,70 50,80" />
    <path d="M50,70 Q70,50 80,20 Q65,40 50,50" />
    <path d="M50,40 Q30,20 20,-10 Q35,10 50,20" />
  </svg>
);

const HandDrawnFlower = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`stroke-current fill-transparent ${className}`} strokeWidth="0.6">
    <circle cx="50" cy="50" r="8" className="fill-current opacity-20" />
    <path d="M50,42 Q65,5 50,0 Q35,5 50,42" />
    <path d="M50,58 Q65,95 50,100 Q35,95 50,58" />
    <path d="M42,50 Q5,65 0,50 Q5,35 42,50" />
    <path d="M58,50 Q95,65 100,50 Q95,35 58,50" />
    <path d="M55,45 Q80,15 85,15 Q85,25 55,45" />
    <path d="M45,45 Q20,15 15,15 Q15,25 45,45" />
    <path d="M45,55 Q20,85 15,85 Q15,75 45,55" />
    <path d="M55,55 Q80,85 85,85 Q85,75 55,55" />
  </svg>
);

const VintageCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={`stroke-current fill-none ${className}`} strokeWidth="0.5">
    <path d="M0,40 L0,0 L40,0" />
    <path d="M4,36 L4,4 L36,4" />
    <path d="M0,0 Q20,20 0,40" />
    <path d="M0,0 Q20,20 40,0" />
    <circle cx="6" cy="6" r="1.5" className="fill-current" />
  </svg>
);

const FloralDivider = () => (
  <div className="flex items-center justify-center gap-6 my-10">
    <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#ae9e85]" />
    <HandDrawnFlower className="w-8 h-8 text-[#ae9e85]" />
    <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#ae9e85]" />
  </div>
);

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914] via-[#1a1914]/40 to-transparent" />
        
        {/* Handcrafted Hero Accents */}
        <BotanicalBranch className="absolute -left-16 bottom-0 w-80 h-96 text-[#d5cab5] drop-shadow-md opacity-[0.8] -scale-x-100" />
        <BotanicalBranch className="absolute -right-16 bottom-0 w-80 h-96 text-[#d5cab5] drop-shadow-md opacity-[0.8]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#ae9e85]" />
              <HandDrawnFlower className="w-5 h-5 text-[#ae9e85]" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#d5cab5] font-semibold">
                Our Guest Book
              </span>
              <HandDrawnFlower className="w-5 h-5 text-[#ae9e85]" />
              <div className="w-12 h-px bg-[#ae9e85]" />
            </div>
            
            <h1 className="font-roman text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-[0.08em] uppercase">
              Happy Travelers
            </h1>
            
            <p className="font-roman text-xl md:text-2xl italic text-[#a09383] mt-8 max-w-2xl mx-auto tracking-wide relative">
              <span className="absolute -top-4 -left-6 text-4xl text-[#ae9e85]/30">"</span>
              The finest compliment we can receive is the memory of your journey.
              <span className="absolute -bottom-6 -right-4 text-4xl text-[#ae9e85]/30">"</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 2. TESTIMONIALS GRID ══════════ */}
      <section className="relative bg-[#f4ebd9] py-24 md:py-32 px-6 md:px-12 lg:px-24">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
           <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent opacity-50" />
        </div>
        
        <FloralDivider />
        
        <div className="max-w-7xl mx-auto mt-16 font-serif">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-min">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                custom={i * 0.1}
                className={`relative group bg-white/60 backdrop-blur-md border border-[#d5cab5]/60 p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(174,158,133,0.15)] transition-all duration-700 ${t.colSpan}`}
              >
                {/* Handcrafted Card Ornaments */}
                <VintageCorner className="absolute top-2 left-2 w-8 h-8 text-[#ae9e85] opacity-40 transition-opacity duration-700 group-hover:opacity-100" />
                <VintageCorner className="absolute top-2 right-2 w-8 h-8 text-[#ae9e85] opacity-40 transition-opacity duration-700 group-hover:opacity-100 rotate-90" />
                <VintageCorner className="absolute bottom-2 right-2 w-8 h-8 text-[#ae9e85] opacity-40 transition-opacity duration-700 group-hover:opacity-100 rotate-180" />
                <VintageCorner className="absolute bottom-2 left-2 w-8 h-8 text-[#ae9e85] opacity-40 transition-opacity duration-700 group-hover:opacity-100 -rotate-90" />

                <div className="absolute top-6 right-8 text-8xl font-serif text-[#ae9e85]/10 leading-none select-none group-hover:text-[#ae9e85]/20 transition-colors duration-700">
                  "
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-1.5 mb-8">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <HandDrawnFlower key={idx} className="w-4 h-4 text-[#ae9e85]" />
                    ))}
                  </div>

                  <p className="text-[#5c544b] text-base md:text-lg leading-relaxed mb-10 italic font-light relative">
                    {t.text}
                  </p>

                  <div className="mt-auto flex items-center gap-5 pt-6 border-t border-[#d5cab5]/30 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full">
                       <HandDrawnFlower className="w-3 h-3 text-[#ae9e85]/50" />
                    </div>
                    
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#eee6d3] group-hover:border-[#ae9e85] transition-colors duration-700 shadow-inner">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover sepia-[.3] grayscale group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-1000"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h4 className="font-roman text-sm font-bold text-[#3d3831] uppercase tracking-[0.1em]">
                        {t.name}
                      </h4>
                      <p className="text-[10.5px] tracking-[0.2em] uppercase text-[#ae9e85] mt-1 font-sans">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. CTA SECTION ══════════ */}
      <section className="relative py-32 md:py-48 bg-[#1a1914] text-center px-6 overflow-hidden">
        {/* Vignette Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-10 mix-blend-screen" />
        
        {/* Floating Botanicals */}
        <BotanicalBranch className="absolute left-[5%] top-1/2 -translate-y-1/2 w-48 h-64 text-[#d5cab5] opacity-60 -scale-x-100" />
        <BotanicalBranch className="absolute right-[5%] top-1/2 -translate-y-1/2 w-48 h-64 text-[#d5cab5] opacity-60" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="flex flex-col items-center"
          >
            <HandDrawnFlower className="w-12 h-12 text-[#ae9e85] mb-6 animate-[spin_60s_linear_infinite]" />
            
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] block mb-4">
              Your Journey Awaits
            </span>
            <h2 className="font-roman text-4xl md:text-5xl lg:text-6xl font-medium text-[#f0e7d6] tracking-wide mb-8">
              Craft Your Masterpiece
            </h2>
            <p className="text-[#a09383] text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto font-light">
              Ready to craft unforgettable memories? Let our team design a bespoke Himalayan experience, hand-tailored entirely to your desires.
            </p>
            
            <Link
              href="/reserve"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-[#ae9e85] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0e7d6] transition-all duration-500 hover:text-[#1a1914] rounded-sm"
            >
              <span className="absolute inset-0 bg-[#ae9e85] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                Start Planning
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
