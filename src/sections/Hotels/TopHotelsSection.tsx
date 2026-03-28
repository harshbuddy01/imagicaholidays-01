"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const topImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-c6a4d14eff50?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop",
];

const mainImage = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop";

export default function TopHotelsSection() {
  return (
    <section className="relative w-full flex flex-col overflow-hidden">
      {/* Top row: Swiper carousel floating every 3 sec */}
      <div className="w-full h-[40vh] md:h-[45vh]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {topImages.map((src, i) => (
            <SwiperSlide key={i} className="relative w-full h-full">
              <Image
                src={src}
                alt={`Hotel preview ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main bottom image with scroll reveal animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative w-full h-[55vh] md:h-[65vh]"
      >
        <Image
          src={mainImage}
          alt="Main Resort View"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Floating Center Badge animated to pop up */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
        viewport={{ once: true, amount: 0.8 }}
        className="absolute top-[40vh] md:top-[45vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
      >
        {/* Top block (Nº 01) */}
        <div className="bg-[#41a2d8] text-white px-5 py-2 flex items-baseline gap-2 shadow-sm">
          <span className="font-serif text-2xl md:text-3xl tracking-wide">
            N<span className="underline decoration-1 underline-offset-[3px] text-lg md:text-xl align-top">o</span>
          </span>
          <span className="font-serif text-4xl md:text-5xl border-l border-white/40 pl-2 ml-1">
            01
          </span>
        </div>
        
        {/* Bottom block (HOTELS) */}
        <div className="bg-[#41a2d8] text-white px-6 py-2 mt-[2px] w-full text-center shadow-lg">
          <span className="font-serif text-xl md:text-2xl tracking-[0.15em] uppercase">
            Hotels
          </span>
        </div>
      </motion.div>
    </section>
  );
}
