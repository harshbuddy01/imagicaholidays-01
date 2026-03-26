"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type MediaCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function MediaCard({ title, description, image }: MediaCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      tabIndex={0}
      className="card-lift group focus:outline-none"
    >
      <div className="relative h-[22rem] md:h-[28rem] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-focus-visible:scale-105"
        />
      </div>
      <div className="mt-6 space-y-2">
        <h3 className="text-2xl font-serif text-[#181510] md:text-3xl">{title}</h3>
        <p className="text-sm leading-relaxed text-[#5a5446] md:text-base">{description}</p>
        <button className="group/btn mt-4 inline-flex items-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#a5813b]">
          Discover <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </button>
      </div>
    </motion.article>
  );
}
