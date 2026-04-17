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
    { label: "Tour Packages", value: "6 Active Tours" },
    { label: "Starting Price", value: "₹22,500" },
    { label: "Famous For", value: "Pink City & Royal Forts" },
];

const whyVisit = [
    {
        title: "Majestic Palaces",
        desc: "Jaipur is home to some of India's most stunning royal residences, from the iconic Hawa Mahal to the sprawling City Palace complex.",
        icon: "🏰",
    },
    {
        title: "Architectural Wonders",
        desc: "Witness the precision of the Jantar Mantar observatory and the imposing scale of Amer Fort, showcasing Rajputana brilliance.",
        icon: "📐",
    },
    {
        title: "Royal Hospitality",
        desc: "Experience the legendary 'Atithi Devo Bhava' in world-renowned heritage hotels and luxury palace stays.",
        icon: "👑",
    },
];

const attractions = [
    {
        name: "Amer Fort",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A stunning UNESCO World Heritage site known for its artistic Hindu style elements and breathtaking views of Maota Lake.",
    },
    {
        name: "Hawa Mahal",
        tag: "Landmark",
        image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "The 'Palace of Winds' is a high screen wall built so women of the royal household could observe street festivals unseen from the outside.",
    },
    {
        name: "City Palace",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/35394354/pexels-photo-35394354.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A majestic complex of courtyards, gardens, and buildings, still serving as the residence of the royal family of Jaipur.",
    },
    {
        name: "Albert Hall Museum",
        tag: "Culture",
        image: "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "The oldest museum of the state, functioning as the state museum of Rajasthan and showcasing Indo-Saracenic architecture.",
    },
    {
        name: "Gaitore Ki Chhatriyan",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/19905363/pexels-photo-19905363.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "The royal crematorium grounds for the Kachwaha Rajput kings, featuring intricately carved marble cenotaphs.",
    },
    {
        name: "Jantar Mantar",
        tag: "Science",
        image: "https://images.pexels.com/photos/31971481/pexels-photo-31971481.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A UNESCO World Heritage site featuring the world's largest stone sundial, built by Maharaja Sawai Jai Singh II.",
    },
];

const tourPackages = [
    {
        title: "Royal Jaipur Luxury Weekend 3D/2N",
        price: "₹22,500",
        duration: "3 Days / 2 Nights",
        tag: "Luxury",
        image: "https://images.pexels.com/photos/35394354/pexels-photo-35394354.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Jaipur & Amer Heritage Trail",
        price: "₹28,200",
        duration: "4 Days / 3 Nights",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Pink City Photography Tour",
        price: "₹18,500",
        duration: "2 Days / 1 Night",
        tag: "Culture",
        image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
];

const seasons = [
    {
        name: "Winter",
        months: "October - March",
        temp: "8°C - 25°C",
        desc: "The best time to visit Jaipur. Weather is pleasant for sightseeing and outdoor activities. Nights can be quite chilly.",
        color: "#7b9eb8",
        recommended: true,
    },
    {
        name: "Summer",
        months: "April - June",
        temp: "25°C - 45°C",
        desc: "Summers are hot in Jaipur. Luxury resorts offer excellent indoor experiences and evening palace tours.",
        color: "#d4a853",
        recommended: false,
    },
    {
        name: "Monsoon",
        months: "July - September",
        temp: "24°C - 33°C",
        desc: "The city turns lush and many rooftop restaurants offer beautiful views of rain-washed forts.",
        color: "#8ba87e",
        recommended: false,
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

export default function JaipurPage() {
    return (
        <>
            <Navbar />

            <section className="relative h-[65vh] md:h-[85vh] min-h-[450px] md:min-h-[600px] overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=1800"
                    alt="Majestic Amer Fort in Jaipur"
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
                        <h1 className="font-roman text-4xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">Jaipur</h1>
                        <p className="font-roman text-base md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">The Pink City of India</p>
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-4 md:mb-6">Discover Royal Rajasthan in Jaipur</h2>
                            <div className="space-y-4 text-[#5c544b] leading-relaxed">
                                <p>Immerse yourself in the opulent legacy of the Kachwaha Rajputs with our <strong>luxury Jaipur tour packages</strong>. The "Pink City" is a vibrant tapestry of history, culture, and royal grandeur.</p>
                                <p>From private sunrise tours of Amer Fort to exclusive dining experiences in heritage palaces, we curate every detail of your <strong>Jaipur itinerary</strong> to ensure a five-star experience.</p>
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
