"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SitemapPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 flex items-center justify-center bg-[#f4ebd9]">
      <Image
        src="https://images.unsplash.com/photo-1542382156909-923f99d9b62a?q=80&w=1600&auto=format&fit=crop"
        alt="Mountain silhouette"
        fill
        className="object-cover fixed opacity-40 mix-blend-multiply"
        sizes="100vw"
        priority
      />

      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-black/5 backdrop-blur-sm border border-[#3d3831]/20 hover:bg-[#3d3831] text-[#3d3831] hover:text-[#fcfbf8] rounded-full transition-all flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl z-10 bg-[#FCFBF8] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-12 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-4 border border-[#e8dcc4] pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <h1 className="font-roman text-4xl md:text-5xl font-semibold text-[#2c2822] tracking-wide mb-3">
            The Compass
            <span className="block mt-2 font-script italic text-[#ae9e85] text-5xl">Map</span>
          </h1>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 font-roman text-[#5c544b]">
            <div>
               <h3 className="font-bold text-[#8b1a1a] mb-4 uppercase tracking-widest text-[11px]">Destinations</h3>
               <ul className="space-y-3">
                  <li><Link href="/destinations/gangtok" className="hover:text-[#2c2822]">Gangtok</Link></li>
                  <li><Link href="/destinations/lachung" className="hover:text-[#2c2822]">Lachung</Link></li>
                  <li><Link href="/destinations/darjeeling" className="hover:text-[#2c2822]">Darjeeling</Link></li>
                  <li><Link href="/destinations/pelling" className="hover:text-[#2c2822]">Pelling</Link></li>
                  <li><Link href="/destinations/wayanad" className="hover:text-[#2c2822]">Wayanad</Link></li>
                  <li><Link href="/destinations/munnar" className="hover:text-[#2c2822]">Munnar</Link></li>
               </ul>
            </div>
            <div>
               <h3 className="font-bold text-[#8b1a1a] mb-4 uppercase tracking-widest text-[11px]">Company</h3>
               <ul className="space-y-3">
                  <li><Link href="/about" className="hover:text-[#2c2822]">About Us</Link></li>
                  <li><Link href="/testimonials" className="hover:text-[#2c2822]">Testimonials</Link></li>
                  <li><Link href="/careers" className="hover:text-[#2c2822]">Careers</Link></li>
                  <li><Link href="/blog" className="hover:text-[#2c2822]">Blog</Link></li>
                  <li><Link href="/press" className="hover:text-[#2c2822]">Press</Link></li>
               </ul>
            </div>
            <div>
               <h3 className="font-bold text-[#8b1a1a] mb-4 uppercase tracking-widest text-[11px]">Resources</h3>
               <ul className="space-y-3">
                  <li><Link href="/faqs" className="hover:text-[#2c2822]">FAQs</Link></li>
                  <li><Link href="/help-center" className="hover:text-[#2c2822]">Help Center</Link></li>
                  <li><Link href="/terms" className="hover:text-[#2c2822]">Terms & Cancelation</Link></li>
                  <li><Link href="/privacy" className="hover:text-[#2c2822]">Privacy Policy</Link></li>
                  <li><Link href="/cookies" className="hover:text-[#2c2822]">Cookie Policy</Link></li>
               </ul>
            </div>
        </div>
      </motion.article>
    </main>
  );
}
