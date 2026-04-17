"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function SectionTransitionBridge() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-[#181510]"
        >
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 w-full h-[120%]"
            >
                <Image
                    src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2000&auto=format&fit=crop"
                    alt="Himalayan Mountain Range Transition"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                {/* Gradients to blend smoothly with top and bottom sections */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5f0] via-transparent to-transparent h-32" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f4ebd9] via-transparent to-transparent h-32 mt-auto" />
            </motion.div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]) }}
                    className="text-center text-white mix-blend-overlay"
                >
                    <p className="font-ornate text-3xl md:text-5xl tracking-[0.2em] opacity-80">Discover</p>
                </motion.div>
            </div>
        </section>
    );
}
