"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides, hotelTabs, pools, dining, spa, villas } from "@/lib/constants";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Collect all unique images to preload
        const images: string[] = [];

        heroSlides.forEach((slide) => { if (slide.image) images.push(slide.image) });
        Object.values(hotelTabs).forEach((tabArray) => {
            tabArray.forEach((item) => { if (item.image) images.push(item.image) });
        });
        pools.forEach((item) => { if (item.image) images.push(item.image) });
        dining.forEach((item) => { if (item.image) images.push(item.image) });
        spa.forEach((item) => { if (item.image) images.push(item.image) });
        villas.forEach((item) => { if (item.image) images.push(item.image) });

        const distinctImages = [...new Set(images)];
        const totalImages = distinctImages.length;
        let loadedCount = 0;

        if (totalImages === 0) {
            setLoading(false);
            return;
        }

        // Lock body scroll
        document.body.style.overflow = "hidden";

        // Preload all images and track progress
        distinctImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => handleImageLoad();
            img.onerror = () => handleImageLoad(); // Even on error, count it to proceed
        });

        function handleImageLoad() {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalImages) * 100));

            if (loadedCount >= totalImages) {
                // Wait a small moment to show 100% before animating out
                setTimeout(() => {
                    setLoading(false);
                    document.body.style.overflow = "";
                }, 600);
            }
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const numStairs = 5;
    const stairArray = Array.from({ length: numStairs });

    return (
        <AnimatePresence>
            {loading && (
                <div className="fixed inset-0 z-[100] flex flex-col pointer-events-auto bg-transparent overflow-hidden">
                    {/* Top Stairs */}
                    <div className="flex h-1/2 w-full">
                        {stairArray.map((_, i) => (
                            <motion.div
                                key={`top-stair-${i}`}
                                initial={{ y: "-100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-100%" }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: 0.08 * i
                                }}
                                className="flex-1 bg-[#181510] border-r border-[#181510]/50"
                            />
                        ))}
                    </div>

                    {/* Bottom Stairs */}
                    <div className="flex h-1/2 w-full">
                        {stairArray.map((_, i) => (
                            <motion.div
                                key={`bottom-stair-${i}`}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.76, 0, 0.24, 1],
                                    // Reverse the delay for the bottom so it creates an engaging opening pattern
                                    delay: 0.08 * (numStairs - 1 - i)
                                }}
                                className="flex-1 bg-[#181510] border-r border-[#181510]/50"
                            />
                        ))}
                    </div>

                    {/* Centered Brand Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#d8be8f]"
                    >
                        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] font-light uppercase">
                            imagicaholidays
                        </h1>
                        <p className="mt-4 text-xs tracking-widest font-sans font-semibold">
                            {progress}%
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
