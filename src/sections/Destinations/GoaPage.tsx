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
    { label: "State", value: "Goa" },
    { label: "Tour Packages", value: "4 Active Tours" },
    { label: "Starting Price", value: "₹8,500" },
    { label: "Famous For", value: "Beaches & Nightlife" },
];

const whyVisit = [
    {
        title: "Pristine Beaches",
        desc: "From the vibrant shores of Baga and Calangute to the serene sands of Palolem and Agonda, Goa offers a beach for every mood.",
        icon: "🏖️",
    },
    {
        title: "Portuguese Heritage",
        desc: "Explore the charming Latin Quarter of Fontainhas and the majestic churches of Old Goa, reflecting centuries of Portuguese influence.",
        icon: "⛪",
    },
    {
        title: "Vibrant Nightlife",
        desc: "Experience world-class beach clubs, night markets, and sunset parties that make Goa the entertainment capital of India.",
        icon: "✨",
    },
];

const attractions = [
    {
        name: "Basilica of Bom Jesus",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/20717176/pexels-photo-20717176.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A UNESCO World Heritage site and a landmark in the history of Christianity, known for its baroque architecture.",
    },
    {
        name: "Palolem Beach",
        tag: "Nature",
        image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A beautiful crescent-shaped beach in South Goa known for its calm waters and palm-fringed shores.",
    },
    {
        name: "Dudhsagar Falls",
        tag: "Nature",
        image: "https://images.pexels.com/photos/29236033/pexels-photo-29236033.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "One of India's tallest waterfalls, located on the Mandovi River, looking like a 'sea of milk' as it cascades down.",
    },
    {
        name: "Aguada Fort",
        tag: "Heritage",
        image: "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A well-preserved 17th-century Portuguese fort and lighthouse overlooking the Arabian Sea.",
    },
    {
        name: "Fontainhas",
        tag: "Cultural",
        image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "The vibrant Latin Quarter of Panjim, famous for its colorful narrow streets and colonial-style villas.",
    },
    {
        name: "Anjuna Flea Market",
        tag: "Shopping",
        image: "https://images.pexels.com/photos/11442148/pexels-photo-11442148.jpeg?auto=compress&cs=tinysrgb&w=800",
        short: "A legendary Wednesday market offering everything from handicrafts to bohemian clothing and jewelry.",
    },
];

const seasons = [
    {
        name: "Winter",
        months: "November - February",
        temp: "20°C - 30°C",
        desc: "The peak tourist season. The weather is perfect for beach activities and water sports. All beach shacks and clubs are fully operational.",
        color: "#7b9eb8",
        recommended: true,
    },
    {
        name: "Summer",
        months: "March - May",
        temp: "25°C - 35°C",
        desc: "A great time for those seeking peace and luxury at discounted rates. The sea is calm, perfect for dolphin sighting tours.",
        color: "#d4a853",
        recommended: false,
    },
    {
        name: "Monsoon",
        months: "June - September",
        temp: "24°C - 30°C",
        desc: "Goa turns into a lush green paradise. Romantic and peaceful, perfect for nature lovers and experiencing the vibrant traditional festivals.",
        color: "#8ba87e",
        recommended: false,
    },
];

const tourPackages = [
    {
        title: "Luxury North Goa Retreat 4D/3N",
        price: "₹18,500",
        duration: "4 Days / 3 Nights",
        tag: "Featured",
        image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "South Goa Serenity & Wellness",
        price: "₹22,000",
        duration: "5 Days / 4 Nights",
        tag: "Wellness",
        image: "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Romantic Goa Honeymoon Special",
        price: "₹28,500",
        duration: "6 Days / 5 Nights",
        tag: "Couple Friendly",
        image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=600",
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

export default function GoaPage() {
    const [visibleAttractions, setVisibleAttractions] = useState(6);

    return (
        <>
            <Navbar />

            <section className="relative h-[65vh] md:h-[85vh] min-h-[450px] md:min-h-[600px] overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1800"
                    alt="Aerial view of Goa coastline"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1914]/60 via-[#1a1914]/15 to-transparent" />
                <div className="relative h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-10 md:pb-20">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-px bg-[#ae9e85]" />
                            <span className="text-[10px] tracking-[0.35em] uppercase text-[#d5cab5]">Goa, India</span>
                        </div>
                        <h1 className="font-roman text-4xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.1em] uppercase">Goa</h1>
                        <p className="font-roman text-base md:text-2xl italic text-[#d5cab5] mt-2 tracking-wide">The Pearl of the Orient</p>
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#3d3831] tracking-wide mb-4 md:mb-6">Experience Tropical Luxury in Goa</h2>
                            <div className="space-y-4 text-[#5c544b] leading-relaxed">
                                <p>Unwind in the vibrant paradise of Goa with our curated <strong>luxury tour packages</strong>. From the sun-kissed beaches of the north to the tranquil retreats of the south, Goa offers a perfect blend of relaxation and excitement.</p>
                                <p>Our <strong>Goa holiday packages</strong> feature stays in premium beach resorts, private sunset cruises, and guided heritage walks through colonial architecture. Experience the best of <strong>Goa tourism</strong> with Imagica Holidays.</p>
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
                        {attractions.slice(0, visibleAttractions).map((attr, i) => (
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

            <section className="bg-[#efe5d0] py-14 md:py-28 px-5 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide">Best Time to Visit</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                        {seasons.map((s, i) => (
                            <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                                className={`p-6 rounded-sm border transition-all duration-300 ${s.recommended ? "bg-[#3d3831] text-[#f0e7d6]" : "bg-white/40 text-[#3d3831]"}`}>
                                <h3 className="font-roman text-xl font-semibold mb-1">{s.name}</h3>
                                <p className="text-[10px] tracking-[0.15em] uppercase mb-3 text-[#ae9e85]">{s.months}</p>
                                <p className="text-xs leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#f4ebd9] py-14 md:py-28 px-5 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="font-roman text-3xl md:text-5xl font-medium text-[#3d3831] tracking-wide">Explore Tour Packages</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {tourPackages.map((pkg, i) => (
                            <motion.div key={pkg.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={(i % 3) * 0.1}
                                className="group rounded-sm overflow-hidden bg-white/30 border border-[#d5cab5]/30 hover:shadow-xl transition-all duration-500 text-left">
                                <div className="relative h-56 overflow-hidden">
                                    <Image src={pkg.image} alt={pkg.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute bottom-4 left-4"><span className="font-roman text-2xl font-bold text-white">{pkg.price}</span></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-roman text-lg font-semibold text-[#3d3831] mb-2">{pkg.title}</h3>
                                    <div className="text-xs uppercase text-[#ae9e85] mb-4">{pkg.duration}</div>
                                    <Link href="/reserve" className="flex items-center justify-center border border-[#3d3831] py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#3d3831] hover:bg-[#3d3831] hover:text-[#f4ebd9] transition-all duration-300">View Details</Link>
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
