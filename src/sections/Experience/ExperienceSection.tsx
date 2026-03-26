"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import MediaCard from "@/components/ui/MediaCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ExperienceCard } from "@/lib/constants";
import { staggerContainer } from "@/lib/motion";
import "swiper/css";

type ExperienceSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: ExperienceCard[];
};

export default function ExperienceSection({
  id,
  eyebrow,
  title,
  description,
  cards,
}: ExperienceSectionProps) {
  if (cards.length === 0) {
    return null;
  }

  const [featured, ...rest] = cards;

  return (
    <SectionWrapper id={id} eyebrow={eyebrow} title={title} description={description}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 overflow-hidden border-t border-b border-[#dacbb1] py-8 md:mb-20"
      >
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center">
          <div className="relative h-80 md:h-[36rem] overflow-hidden group">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition duration-1000 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 pr-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#a5813b]">Signature Experience</p>
            <h3 className="text-4xl leading-[1.05] font-serif md:text-5xl lg:text-6xl text-[#181510]">{featured.title}</h3>
            <p className="body-measure text-sm leading-relaxed text-[#5a5446] md:text-base">{featured.description}</p>
            <button className="w-fit inline-flex items-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#181510] group/btn">
              Explore More <span className="ml-3 h-px w-8 bg-[#181510] transition-all duration-300 group-hover/btn:w-12"></span>
            </button>
          </div>
        </div>
      </motion.article>

      <div className="md:hidden">
        <Swiper slidesPerView={1.12} spaceBetween={14}>
          {rest.map((card) => (
            <SwiperSlide key={card.id}>
              <MediaCard title={card.title} description={card.description} image={card.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3"
      >
        {rest.map((card) => (
          <MediaCard key={card.id} title={card.title} description={card.description} image={card.image} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
