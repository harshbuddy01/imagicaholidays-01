"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const stats = [
  { label: "Hectares", value: "90" },
  { label: "Dining Venues", value: "30+" },
  { label: "Pools", value: "14" },
  { label: "Spa Experiences", value: "50+" }
];

export default function EstateIntroSection() {
  return (
    <section className="section-pad px-5 md:px-8 lg:px-12">
      <div className="content-shell grid gap-10 rounded-[2rem] border border-[#ddcfb8] bg-[linear-gradient(145deg,#f6efe2_0%,#efe5d2_100%)] p-7 md:grid-cols-[1.4fr_1fr] md:items-end md:p-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-5"
        >
          <p className="eyebrow">The Estate</p>
          <h2 className="headline max-w-3xl">A Destination Woven Into Bali&apos;s Southern Cliffs</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#5c5648] md:text-base">
            Inspired by AYANA&apos;s multi-resort concept, this experience blends private villas, oceanfront hotels,
            destination restaurants, and signature wellness programs into one integrated landscape.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="rounded-2xl border border-[#d5c6ae] bg-white/45 p-4 backdrop-blur"
            >
              <p className="text-3xl leading-none md:text-4xl">{item.value}</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-[#7b705d]">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
