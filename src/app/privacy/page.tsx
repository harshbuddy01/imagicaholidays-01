"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const WaxSeal = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`fill-[#8b1a1a] drop-shadow-lg ${className}`}>
    <path d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,30 30,15 50,15" opacity="0.8" />
    <path d="M45,30 L55,30 L55,70 L45,70 Z M40,40 L60,40 L60,45 L40,45 Z M40,55 L60,55 L60,60 L40,60 Z" fill="white" opacity="0.4" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

const SketchedUnderline = () => (
   <svg viewBox="0 0 400 10" className="w-full h-[2px] text-[#ae9e85] opacity-50 mt-1" preserveAspectRatio="none">
     <path d="M0,5 Q100,2 200,5 T400,3" fill="none" stroke="currentColor" strokeWidth="1.5" />
   </svg>
);

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen py-24 px-4 md:px-8 flex items-center justify-center bg-[#f4ebd9]">
      {/* ── Background Imagery ── */}
      <Image
        src="https://images.unsplash.com/photo-1542382156909-923f99d9b62a?q=80&w=1600&auto=format&fit=crop"
        alt="Mountain silhouette at dusk"
        fill
        className="object-cover fixed opacity-40 mix-blend-multiply"
        sizes="100vw"
        priority
      />

      {/* ── Close / Back Button ── */}
      <Link 
        href="/" 
        className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 bg-black/5 backdrop-blur-sm border border-[#3d3831]/20 hover:bg-[#3d3831] text-[#3d3831] hover:text-[#fcfbf8] rounded-full transition-all group flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      {/* ── Handmade Document ── */}
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl my-auto z-10 bg-[#FCFBF8] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8 md:p-14 lg:p-24 overflow-hidden"
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* Outer border decoration */}
        <div className="absolute inset-4 border border-[#e8dcc4] pointer-events-none" />
        <div className="absolute inset-5 border border-[#e8dcc4]/40 pointer-events-none" />
        
        {/* Handcrafted Visuals */}
        <WaxSeal className="absolute -top-10 -left-10 w-24 h-24 pointer-events-none rotate-[15deg] opacity-90" />
        
        {/* Header Text */}
        <div className="text-center mb-16 relative z-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a705e] mb-4">
            Legal Document
          </p>
          <h1 className="font-roman text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2c2822] tracking-wide mb-3">
            Privacy
            <span className="block mt-2 font-script italic text-[#ae9e85] text-5xl md:text-7xl font-normal">
              Policy
            </span>
          </h1>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 space-y-12 font-roman text-[#3d3831] leading-relaxed text-sm md:text-base">
          
          <section>
            <div className="mb-4">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">1.</span>
              <span className="text-[14px] tracking-[0.1em] uppercase text-[#2c2822] font-bold">
                Information We Collect
              </span>
              <SketchedUnderline />
            </div>
            <p className="mb-4 text-[#5c544b]">
              We collect information that you strictly provide to us for the purpose of booking and organizing your travel. This may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#5c544b] marker:text-[#ae9e85]">
              <li><strong className="text-[#2c2822] font-medium">Personal details:</strong> Name, address, email address, and phone number.</li>
              <li><strong className="text-[#2c2822] font-medium">Travel details:</strong> Travel dates, flight details, and dietary preferences.</li>
              <li><strong className="text-[#2c2822] font-medium">Identification:</strong> Copies of ID proofs (Passport, Voter ID, etc.) required for securing permits.</li>
            </ul>
          </section>

          <section>
            <div className="mb-4">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">2.</span>
              <span className="text-[14px] tracking-[0.1em] uppercase text-[#2c2822] font-bold">
                How We Use Your Information
              </span>
              <SketchedUnderline />
            </div>
            <p className="mb-4 text-[#5c544b]">
              We use the collected information solely for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#5c544b] marker:text-[#ae9e85]">
              <li>To process your bookings for hotels, cabs, and tours.</li>
              <li>To obtain necessary inner-line permits and restricted area permits from authorities.</li>
              <li>To communicate with you regarding your trip, booking confirmation, and updates.</li>
              <li>To improve our services and customize your travel experience.</li>
            </ul>
          </section>

          <section>
            <div className="mb-4">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">3.</span>
              <span className="text-[14px] tracking-[0.1em] uppercase text-[#2c2822] font-bold">
                Information Sharing
              </span>
              <SketchedUnderline />
            </div>
            <p className="mb-4 text-[#5c544b]">
              We <strong className="text-[#8b1a1a]">DO NOT</strong> sell or rent your personal information to third parties. We only share necessary details with trusted partners essential for your trip, such as:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#5c544b] marker:text-[#ae9e85]">
              <li>Hotels and accommodation providers.</li>
              <li>Transport operators and drivers.</li>
              <li>Government authorities for permit processing.</li>
            </ul>
          </section>

          <section>
            <div className="mb-4">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">4.</span>
              <span className="text-[14px] tracking-[0.1em] uppercase text-[#2c2822] font-bold">
                Data Security
              </span>
              <SketchedUnderline />
            </div>
            <p className="text-[#5c544b]">
              We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <div className="mb-4">
              <span className="font-script italic text-2xl text-[#ae9e85] pr-3">5.</span>
              <span className="text-[14px] tracking-[0.1em] uppercase text-[#2c2822] font-bold">
                Cookies
              </span>
              <SketchedUnderline />
            </div>
            <p className="text-[#5c544b]">
              Our website may use "cookies" to enhance your experience. Cookies are small files placed on your hard drive for record-keeping purposes. You can choose to set your web browser to refuse cookies or to alert you when cookies are being sent.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-[#e8dcc4] text-center">
             <p className="text-[10px] tracking-widest uppercase text-[#ae9e85]">
               Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
             </p>
          </div>
        </div>
        
        {/* Decorative corner staples/brasses */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#d5cab5] shadow-inner" />
      </motion.article>
    </main>
  );
}
