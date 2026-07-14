"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ═══════════════════════════════════════════════════════════
   SVG DECORATIONS & ICONS
   ═══════════════════════════════════════════════════════════ */

const HandDrawnFlower = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={`stroke-current fill-transparent ${className}`}
    strokeWidth="0.6"
  >
    <circle cx="50" cy="50" r="8" className="fill-current opacity-20" />
    <path d="M50,42 Q65,5 50,0 Q35,5 50,42" />
    <path d="M50,58 Q65,95 50,100 Q35,95 50,58" />
    <path d="M42,50 Q5,65 0,50 Q5,35 42,50" />
    <path d="M58,50 Q95,65 100,50 Q95,35 58,50" />
    <path d="M55,45 Q80,15 85,15 Q85,25 55,45" />
    <path d="M45,45 Q20,15 15,15 Q15,25 45,45" />
    <path d="M45,55 Q20,85 15,85 Q15,75 45,55" />
    <path d="M55,55 Q80,85 85,85 Q85,75 55,55" />
  </svg>
);

const LeafOrnament = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 200"
    className={`stroke-current fill-none ${className}`}
    strokeWidth="0.8"
  >
    <path d="M10,200 Q25,120 60,80 Q90,50 110,10" />
    <path d="M34,150 Q60,130 85,100 Q60,110 34,150" />
    <path d="M60,100 Q85,80 105,45 Q80,60 60,100" />
    <path d="M18,175 Q40,165 58,140 Q40,145 18,175" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function ArchitectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API delay for local/production stability
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 45 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  return (
    <>
      <Navbar />

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative min-h-[90vh] bg-[#0f0e0b] text-[#f0e7d6] flex flex-col justify-center overflow-hidden pt-24 pb-16 px-6 md:px-12 lg:px-24">
        {/* Background Subtle Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(174,158,133,0.05)_0%,transparent_70%)]" />
        
        {/* Corner Botanical Branch */}
        <LeafOrnament className="absolute -right-12 top-10 w-64 h-96 text-[#ae9e85] opacity-25" />
        <LeafOrnament className="absolute -left-12 bottom-10 w-64 h-96 text-[#ae9e85] opacity-25 -scale-x-100 -scale-y-100" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Portrait / Visual Frame Column (Left) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-80 h-[480px] md:w-[350px] md:h-[520px] rounded-sm p-4 border border-[#ae9e85]/20 bg-gradient-to-b from-[#1a1914] to-[#13120f] shadow-2xl group"
            >
              {/* Double nested frame border */}
              <div className="absolute inset-2 border border-[#ae9e85]/10 pointer-events-none" />
              
              {/* Handmade Corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ae9e85]/40" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ae9e85]/40" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#ae9e85]/40" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#ae9e85]/40" />

              {/* Portrait Placeholder Canvas */}
              <div className="relative w-full h-full bg-[#171612] flex flex-col justify-center items-center overflow-hidden">
                <HandDrawnFlower className="w-16 h-16 text-[#ae9e85]/20 mb-6 animate-[spin_80s_linear_infinite]" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#ae9e85] font-light mb-1">
                  Creator & UX Architect
                </span>
                <span className="font-roman text-xl text-[#ae9e85] tracking-wide font-medium">
                  Kumar Harsh Anand
                </span>
                <div className="w-12 h-px bg-[#ae9e85]/20 my-4" />
                <p className="text-[#a09383] text-xs text-center px-8 leading-relaxed font-light italic">
                  "Translating complex logic into minimal, breathtaking luxury design."
                </p>

                {/* Micro ornament line */}
                <div className="absolute bottom-6 w-16 h-0.5 bg-[#ae9e85]/10" />
              </div>
            </motion.div>
          </div>

          {/* Text Biography Column (Right) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <div className="flex items-center gap-3 mb-6">
                <HandDrawnFlower className="w-5 h-5 text-[#ae9e85]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] font-semibold">
                  Creative Software Engineer
                </span>
              </div>

              <h1 className="font-roman text-4xl md:text-6xl font-medium tracking-[0.05em] uppercase text-white leading-tight mb-8">
                Crafting Next-Gen <br/>
                <span className="text-[#ae9e85] italic">Digital Luxury</span>
              </h1>

              <div className="space-y-6 text-[#a09383] text-sm md:text-base leading-relaxed font-light">
                <p>
                  Hello, I am <strong className="text-[#f0e7d6] font-medium">Kumar Harsh Anand</strong>. I specialize in designing and engineering bespoke software architectures, premium user interfaces, and automated business ecosystems.
                </p>
                <p>
                  As the architect of the <strong className="text-[#f0e7d6] font-medium">Imagica Holidays</strong> platform, my goal was to unify aesthetics with high performance. I built a custom, lightning-fast Next.js frontend paired with a reliable Express.js + Supabase backend designed to handle dynamic workflows, real-time activity logs, CRM task scheduling, and live external APIs securely.
                </p>
                <p>
                  Whether it is designing micro-animations, styling fluid layouts, or tuning high-concurrency database queries, I believe code should be written with the same artistry and precision as a luxury retreat.
                </p>
              </div>

              {/* Technologies list */}
              <div className="mt-10 border-t border-[#ae9e85]/10 pt-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#ae9e85] font-semibold mb-4">
                  Core Architectural Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 14", "React 18", "Express.js", "Prisma ORM", "Supabase", "Docker", "GCP VM", "Framer Motion"].map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs bg-[#1a1914] border border-[#ae9e85]/10 px-3 py-1.5 rounded-full text-[#a09383]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════ COLLABORATE & CONTACT FORM ══════════ */}
      <section className="relative py-24 bg-[#f8f5f0] px-6 md:px-12 lg:px-24">
        {/* Botanical side ornament */}
        <LeafOrnament className="absolute left-[3%] top-1/2 -translate-y-1/2 w-48 h-80 text-[#ae9e85] opacity-15 -scale-x-100" />
        
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Quick Info & Social Cards */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#ae9e85] font-bold block mb-3">
                Connect
              </span>
              <h2 className="font-roman text-3xl md:text-4xl font-medium text-[#1a1914] tracking-wide mb-6">
                Start a Conversation
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm">
                If you are a business owner looking for a premium custom website, custom CRM software, or software advisory, feel free to reach out directly.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4 border-l-2 border-[#ae9e85] pl-6 py-2">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#ae9e85] block font-bold">
                    Email
                  </span>
                  <a href="mailto:harshanand@imagicaholidays.com" className="text-gray-800 text-sm hover:underline font-medium">
                    harshanand@imagicaholidays.com
                  </a>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#ae9e85] block font-bold">
                    Contact Phone
                  </span>
                  <a href="tel:+918231656" className="text-gray-800 text-sm hover:underline font-medium">
                    +91 97750 09000
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-10">
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 block mb-3">
                  Other Channels
                </span>
                <div className="flex items-center gap-4">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/harshanand" },
                    { label: "Instagram", href: "https://www.instagram.com/harshanand" },
                    { label: "GitHub", href: "https://github.com/harshbuddy01" }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-[#ae9e85] border border-gray-200 bg-white rounded-md px-4 py-2 hover:border-[#ae9e85] transition-all"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Custom B2B Form */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              className="bg-white rounded-sm border border-gray-100 p-8 shadow-md"
            >
              <h3 className="font-roman text-xl text-gray-800 font-medium mb-6 pb-4 border-b border-gray-50">
                Project Inquiries & Collaborations
              </h3>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <HandDrawnFlower className="w-12 h-12 text-[#ae9e85] mx-auto mb-4 animate-bounce" />
                  <p className="font-medium text-gray-900 text-lg">Thank you!</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Your inquiry has been received. Kumar Harsh Anand will get in touch with you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 block mb-2 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#fcfbfa] border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#ae9e85] rounded-sm transition-all"
                        placeholder="e.g. Alexander Pierce"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 block mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#fcfbfa] border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#ae9e85] rounded-sm transition-all"
                        placeholder="e.g. alex@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 block mb-2 font-medium">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#fcfbfa] border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#ae9e85] rounded-sm transition-all"
                      placeholder="e.g. Elite Travel Agency"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 block mb-2 font-medium">
                      Project Description or Collaboration Request
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#fcfbfa] border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#ae9e85] rounded-sm transition-all resize-none"
                      placeholder="Tell us about the digital solution or CRM system you want to build..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1a1914] text-white py-4 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-[#ae9e85] hover:text-[#1a1914] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Request...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
