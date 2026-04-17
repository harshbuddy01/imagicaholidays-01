"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const quickInfo = [
    { label: "State", value: "Rajasthan" },
    { label: "Tour Packages", value: "4 Active Tours" },
    { label: "Starting Price", value: "₹24,800" },
    { label: "Famous For", value: "Lakes & Romantic Palaces" },
];

const whyVisit = [
    {
        title: "City of Lakes",
        desc: "Experience the magic of Udaipur's interconnected lake system, featuring the iconic Lake Pichola and the serene Fateh Sagar Lake.",
        icon: "🌅",
    },
    {
        title: "Venice of the East",
        desc: "Renowned as one of the most romantic cities in India, Udaipur offers stunning lakeside dining and breathtaking sunset boat rides.",
        icon: "🚣",
    },
    {
        title: "Mewar Heritage",
        desc: "Explore the legacy of the Mewar dynasty through the lens of its magnificent City Palace and the historic Jag Mandir island palace.",
        icon: "🏤",
    },
];

const attractions = [
    {
        name: "City Palace",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A magnificent complex of palaces on the eastern bank of Lake Pichola, built over a period of nearly 400 years.",
    },
    {
        name: "Jag Mandir",
        tag: "Island",
        image: "https://images.pexels.com/photos/29801416/pexels-photo-29801416.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "An island palace in Lake Pichola, also known as the 'Lake Garden Palace', offering stunning views and royal history.",
    },
    {
        name: "Lake Pichola",
        tag: "Nature",
        image: "https://images.pexels.com/photos/29824645/pexels-photo-29824645.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "One of the oldest and largest lakes of Udaipur, world-famous for its scenic beauty and the palaces situated within it.",
    },
    {
        name: "Saheliyon-ki-Bari",
        tag: "Garden",
        image: "https://images.pexels.com/photos/29824651/pexels-photo-29824651.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A major garden and a popular tourist space in Udaipur, famous for its fountains, marble elephants, and lotus pools.",
    },
    {
        name: "Old City Streets",
        tag: "Culture",
        image: "https://images.pexels.com/photos/29837943/pexels-photo-29837943.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "Wander through the vibrant narrow streets of the old city, filled with traditional handicrafts, silver jewelry, and local snacks.",
    },
    {
        name: "Gangaur Ghat",
        tag: "Spirituality",
        image: "https://images.pexels.com/photos/29824639/pexels-photo-29824639.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "One of the main ghats on the waterfront of Lake Pichola, ideal for witnessing traditional ceremonies and beautiful sunsets.",
    },
];

const tourPackages = [
    {
        title: "Udaipur Romantic Getaway 3D/2N",
        price: "₹24,800",
        duration: "3 Days / 2 Nights",
        tag: "Couple Friendly",
        image: "https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Mewar Royal Heritage Explorer",
        price: "₹32,500",
        duration: "5 Days / 4 Nights",
        tag: "Luxury",
        image: "https://images.pexels.com/photos/29801416/pexels-photo-29801416.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Lakes & Palaces Photography Tour",
        price: "₹21,200",
        duration: "3 Days / 2 Nights",
        tag: "Culture",
        image: "https://images.pexels.com/photos/29824639/pexels-photo-29824639.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
];

const seasons = [
    {
        name: "Winter",
        months: "October - March",
        temp: "10°C - 28°C",
        desc: "The absolute best time to visit the City of Lakes. Perfect for boat rides and exploring the palaces without the heat.",
        color: "#7b9eb8",
        recommended: true,
    },
    {
        name: "Summer",
        months: "April - June",
        temp: "28°C - 42°C",
        desc: "A quieter time where you can enjoy the luxury lakeside resorts at a slower pace and benefit from seasonal offers.",
        color: "#d4a853",
        recommended: false,
    },
    {
        name: "Monsoon",
        months: "July - September",
        temp: "25°C - 35°C",
        desc: "Udaipur is arguably at its most beautiful during the rains, as the lakes fill up and the surrounding hills turn emerald green.",
        color: "#8ba87e",
        recommended: true,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function UdaipurPage() {
    return (
        <>
            <Navbar />

            <section className="relative h-[65vh] md:h-[85vh] min-h-[450px] md:min-h-[600px] overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=1800"
                    alt="Sunset view of Udaipur City Palace and Lake Pichola"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 via-[#1a1914]/15 to-transparent" />
                <div className="relative h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-10 md:pb-20">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-px bg-[#ae9e85]" />
                            <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">Rajasthan, India</span>
                        </div>
                        <h1 className="font-roman text-4xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">Udaipur</h1>
                        <p className="font-roman text-base md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">The Venice of the East</p>
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-4 md:mb-6">Experience Lakeside Grandeur in Udaipur</h2>
                            <div className="space-y-4 text-[#5c544b] leading-relaxed">
                                <p>Welcome to Udaipur, the "City of Lakes," where royal history meets romantic tranquility. Our <strong>luxury Udaipur tour packages</strong> are designed to offer an immersive experience into the heart of Mewar culture.</p>
                                <p>From stays in iconic island palaces to private boat cruises on Lake Pichola at sunset, every moment in Udaipur is designed to feel like a royal fairy tale. Explore <strong>Udaipur tourism</strong> with the experts at Imagica Holidays.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
                            <div className="grid grid-cols-2 gap-4">
                                {quickInfo.map((info) => (
                                    <div key={info.label} className="bg-white/40 backdrop-blur-sm border border-[#d5cab5]/50 p-5 rounded-sm">
                                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#ae9e85] mb-2">{info.label}</p>
                                        <p className="font-roman text-lg font-semibold text-[#3d3831]">{info.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-[#1a1914] py-14 md:py-28 px-5 md:px-16 lg:px-24 text-[#f0e7d6]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                        {whyVisit.map((item, i) => (
                            <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}
                                className="group border border-white/8 p-5 md:p-8 rounded-sm hover:border-[#ae9e85]/30 transition-colors duration-500">
                                <span className="text-4xl mb-5 block">{item.icon}</span>
                                <h3 className="font-roman text-xl font-semibold text-[#f0e7d6] mb-3">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-[#a09383]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div key={attr.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={(i % 3) * 0.1}
                                className="group relative overflow-hidden rounded-sm bg-white/30 border border-[#d5cab5]/30 hover:shadow-lg transition-shadow duration-500">
                                <div className="relative h-40 md:h-52 overflow-hidden">
                                    <Image src={attr.image} alt={attr.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <span className="absolute top-3 left-3 bg-[#ae9e85]/90 text-[#1a1914] text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-sm">{attr.tag}</span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-roman text-lg font-semibold text-[#3d3831] mb-2">{attr.name}</h3>
                                    <p className="text-xs text-[#7a705e] leading-relaxed">{attr.short}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
