"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Global Page Transition Preloader
 * 
 * Automatically discovers ALL images on the current page (from <img> tags,
 * background-image CSS, and Next.js <Image> components) and preloads them
 * before revealing the page content. Shows the staircase animation during loading.
 * 
 * This works on EVERY page navigation AFTER the initial load.
 * The initial load is handled by the main Preloader component.
 */
export default function PageTransitionPreloader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const isInitialMount = useRef(true);

    const preloadImages = useCallback(() => {
        // Small delay to let the DOM render images
        const timer = setTimeout(() => {
            // Collect all image sources from the page
            const imageSources: string[] = [];

            // 1. All <img> tags (includes Next.js Image components which render as <img>)
            document.querySelectorAll("img").forEach((img) => {
                const src = img.getAttribute("src") || img.getAttribute("data-src");
                if (src && !src.startsWith("data:")) {
                    imageSources.push(src);
                }
                // Also check srcset
                const srcset = img.getAttribute("srcset");
                if (srcset) {
                    srcset.split(",").forEach((entry) => {
                        const url = entry.trim().split(" ")[0];
                        if (url && !url.startsWith("data:")) {
                            imageSources.push(url);
                        }
                    });
                }
            });

            // 2. Background images from inline styles
            document.querySelectorAll("[style]").forEach((el) => {
                const style = (el as HTMLElement).style.backgroundImage;
                if (style) {
                    const match = style.match(/url\(["']?(.+?)["']?\)/);
                    if (match && match[1] && !match[1].startsWith("data:")) {
                        imageSources.push(match[1]);
                    }
                }
            });

            // Deduplicate
            const uniqueImages = [...new Set(imageSources)];
            const total = uniqueImages.length;

            if (total === 0) {
                setLoading(false);
                document.body.style.overflow = "";
                return;
            }

            let loaded = 0;

            function onImageDone() {
                loaded++;
                setProgress(Math.round((loaded / total) * 100));
                if (loaded >= total) {
                    setTimeout(() => {
                        setLoading(false);
                        document.body.style.overflow = "";
                    }, 400);
                }
            }

            uniqueImages.forEach((src) => {
                const img = new window.Image();
                img.src = src;
                if (img.complete) {
                    onImageDone();
                } else {
                    img.onload = onImageDone;
                    img.onerror = onImageDone; // Count errors too so the page still loads
                }
            });

            // Safety fallback: If images take too long (8 seconds), reveal anyway
            setTimeout(() => {
                if (loaded < total) {
                    setLoading(false);
                    document.body.style.overflow = "";
                }
            }, 8000);
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Skip the initial mount - the main Preloader handles that
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // On subsequent path changes, start loading
        setLoading(true);
        setProgress(0);
        document.body.style.overflow = "hidden";

        const cleanup = preloadImages();
        return cleanup;
    }, [pathname, preloadImages]);

    const numStairs = 5;
    const stairArray = Array.from({ length: numStairs });

    return (
        <AnimatePresence>
            {loading && (
                <div className="fixed inset-0 z-[99] flex flex-col pointer-events-auto bg-transparent overflow-hidden">
                    {/* Top Stairs */}
                    <div className="flex h-1/2 w-full">
                        {stairArray.map((_, i) => (
                            <motion.div
                                key={`pt-top-${i}`}
                                initial={{ y: "-100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-100%" }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: 0.06 * i,
                                }}
                                className="flex-1 bg-[#181510] border-r border-[#181510]/50"
                            />
                        ))}
                    </div>

                    {/* Bottom Stairs */}
                    <div className="flex h-1/2 w-full">
                        {stairArray.map((_, i) => (
                            <motion.div
                                key={`pt-bot-${i}`}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: 0.06 * (numStairs - 1 - i),
                                }}
                                className="flex-1 bg-[#181510] border-r border-[#181510]/50"
                            />
                        ))}
                    </div>

                    {/* Centered Loading Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#d8be8f]"
                    >
                        <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-[0.3em] font-light uppercase">
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
