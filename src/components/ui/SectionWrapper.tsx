"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type SectionWrapperProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className="section-pad px-5 md:px-8 lg:px-12">
      <div className="content-shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 space-y-3 md:mb-14"
        >
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="headline max-w-4xl">{title}</h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[#5f5a4d] md:text-base">{description}</p>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
