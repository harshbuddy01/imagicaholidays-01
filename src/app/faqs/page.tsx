"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TornTape = ({ className = "" }: { className?: string }) => (
  <div className={`absolute h-8 bg-white/40 backdrop-blur-md shadow-sm border border-white/50 z-20 mix-blend-screen ${className}`}
       style={{ clipPath: 'polygon(2% 0%, 98% 3%, 100% 96%, 1% 100%)' }} />
);

const faqs = [
  {
    question: "Do I need a special permit to travel in Sikkim?",
    answer: "Yes, special permits (Inner Line or Protected Area) are required for remote sections like Nathu La Pass and North Sikkim. We handle all necessary paperwork for you."
  },
  {
    question: "What is the best time of year to journey to the Himalayas?",
    answer: "The pristine window is from March to May (Rhododendron bloom) and late September to mid-December (crystalline azure skies)."
  },
  {
    question: "How do you handle altitude sickness during the trip?",
    answer: "We craft 'slow travel' itineraries to acclimatize. Our drivers and guides are trained to handle high-altitude symptoms quietly and professionally."
  },
  {
    question: "Can itineraries be heavily customized?",
    answer: "Absolutely. From requesting specific organic menus to booking vintage luxury properties—we accommodate your unique vision."
  },
  {
    question: "What is the booking and payment process?",
    answer: "We require a 50% advance to secure your reservation. The final balance is settled before or upon arrival."
  }
];

export default function FAQsPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 bg-[#211f1c] overflow-hidden">
      {/* ── Dark Wall Background ── */}
      <Image
        src="https://images.unsplash.com/photo-1518640467707-6811f4a4ab75?q=80&w=1600&auto=format&fit=crop"
        alt="Dark textured wall"
        fill
        className="object-cover fixed opacity-20 mix-blend-color-burn"
        sizes="100vw"
        priority
      />

      {/* ── Close / Back Button ── */}
      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-white/5 backdrop-blur-sm border border-[#fcfbf8]/20 hover:bg-[#ae9e85] text-[#ae9e85] hover:text-[#1a1914] rounded-full transition-all group flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header Content */}
        <div className="text-center mb-16">
          <p className="text-[12px] tracking-[0.4em] uppercase text-[#ae9e85] mb-4">
            Travel Knowledge
          </p>
          <h1 className="font-roman text-5xl md:text-6xl lg:text-7xl font-semibold text-[#f0e7d6] tracking-wide mb-3">
            Common Inquiries
          </h1>
          <p className="font-script text-3xl md:text-4xl text-[#ae9e85]">Tap a postcard to read</p>
        </div>

        {/* ── Corkboard Grid of Postcards ── */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 pt-8">
          {faqs.map((faq, idx) => {
            // Give each card a slight random-looking rotation and offset
            const rotateAngles = [-3, 4, -2, 5, -4];
            const translateYs = [0, 20, -10, 30, 0];
            const rotate = rotateAngles[idx % rotateAngles.length];
            const yOffset = translateYs[idx % translateYs.length];

            const isFlipped = flippedIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotate: rotate - 10 }}
                animate={{ opacity: 1, y: yOffset, rotate: rotate }}
                transition={{ duration: 0.8, delay: idx * 0.15, type: "spring" }}
                className="relative cursor-pointer group w-[280px] md:w-[320px] aspect-[4/3] perspective-1000"
                onClick={() => toggleFlip(idx)}
              >
                {/* Vintage tape at the top */}
                <TornTape className="w-20 top-[-12px] left-1/2 -translate-x-1/2" />

                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* FRONT SIDE (Question) */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-[#FCFBF8] shadow-[0_15px_30px_rgba(0,0,0,0.4)] p-8 flex flex-col items-center justify-center text-center border-l-4 border-[#8b1a1a]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                     {/* Paper texture */}
                     <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                     
                     <span className="font-script text-6xl text-[#ae9e85] opacity-30 absolute top-4 left-4">Q.</span>
                     <h3 className="font-roman text-lg md:text-xl font-medium text-[#2c2822] leading-snug">
                       {faq.question}
                     </h3>
                     <p className="mt-6 text-[10px] uppercase tracking-widest text-[#7a705e] group-hover:text-[#8b1a1a] transition-colors border-b border-[#ae9e85]/30 pb-1">
                       Tap to answer
                     </p>
                  </div>

                  {/* BACK SIDE (Answer) */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-[#efdfc3] shadow-[0_15px_30px_rgba(0,0,0,0.4)] p-8 flex flex-col items-center justify-center text-center rotate-y-180 border-r-4 border-[#ae9e85]"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                     {/* Paper texture */}
                     <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                     
                     {/* Postal stamp mimic */}
                     <div className="absolute top-4 right-4 w-12 h-12 border-2 border-[#8b1a1a]/40 rounded-full flex flex-col items-center justify-center opacity-60">
                        <span className="text-[8px] uppercase tracking-widest text-[#8b1a1a]">Answer</span>
                     </div>

                     <p className="font-roman text-[#5c544b] text-sm md:text-base leading-relaxed pt-4">
                       {faq.answer}
                     </p>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 text-center">
             <p className="text-[12px] uppercase tracking-widest text-[#a09383] mb-4">
                Still have questions?
             </p>
             <Link href="/#reservation" className="inline-block border border-[#ae9e85] px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#ae9e85] hover:bg-[#ae9e85] hover:text-[#1a1914] transition-colors">
               Contact An Artisan
             </Link>
        </div>
      </div>
    </main>
  );
}
