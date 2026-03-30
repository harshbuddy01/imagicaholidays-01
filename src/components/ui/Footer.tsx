"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  destinations: [
    { label: "Gangtok", href: "/destinations/gangtok" },
    { label: "Lachung", href: "/destinations/lachung" },
    { label: "Darjeeling", href: "/destinations/darjeeling" },
    { label: "Pelling", href: "/destinations/pelling" },
  ],
  activities: [
    { label: "Trekking", href: "/#activities-section" },
    { label: "Yak Safari", href: "/#activities-section" },
    { label: "Camping", href: "/#activities-section" },
    { label: "River Rafting", href: "/#activities-section" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#artisans" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" }
  ],
  support: [
    { label: "Help Center", href: "/help-center" },
    { label: "Contact Us", href: "/#reservation" },
    { label: "Cancellation Policy", href: "/terms" },
    { label: "FAQs", href: "/faqs" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733-16z" />
        <path d="M4 20l6.768-6.768M20 4l-6.768 6.768" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1a1914] text-[#f0e7d6] overflow-hidden">
      {/* Top decorative border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ae9e85] to-transparent" />

      {/* ── Newsletter / CTA Banner ── */}
      <div className="relative border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-lg"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#ae9e85] mb-3">
                Stay Inspired
              </p>
              <h3 className="font-roman text-3xl md:text-4xl font-medium leading-tight text-[#f0e7d6]">
                Begin Your Himalayan Journey
              </h3>
              <p className="mt-3 text-sm text-[#a09383] leading-relaxed max-w-md">
                Get curated travel stories, exclusive deals, and insider guides delivered to your inbox.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex w-full md:w-auto gap-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-72 bg-white/5 border border-white/12 border-r-0 px-5 py-3.5 text-sm text-[#f0e7d6] placeholder:text-[#7a705e] focus:outline-none focus:border-[#ae9e85]/50 transition-colors rounded-l-sm"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-[#ae9e85] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1a1914] transition-all duration-300 hover:bg-[#c7b697] rounded-r-sm"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-16">
        <div className="grid gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">

          {/* Brand Column */}
          <div className="lg:pr-8">
            <Link href="/" className="font-roman text-2xl tracking-[0.15em] text-[#f0e7d6] font-medium">
              IMAGICAHOLIDAYS
            </Link>
            <p className="mt-4 text-sm text-[#a09383] leading-relaxed max-w-xs">
              Curating extraordinary Himalayan experiences across Sikkim, Darjeeling, and beyond. Your gateway to the roof of the world.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/12 text-[#a09383] transition-all duration-300 hover:border-[#ae9e85]/50 hover:text-[#ae9e85] hover:bg-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ae9e85] font-medium mb-5">
              Destinations
            </p>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#a09383] transition-colors duration-200 hover:text-[#f0e7d6]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ae9e85] font-medium mb-5">
              Activities
            </p>
            <ul className="space-y-3">
              {footerLinks.activities.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#a09383] transition-colors duration-200 hover:text-[#f0e7d6]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ae9e85] font-medium mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#a09383] transition-colors duration-200 hover:text-[#f0e7d6]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ae9e85] font-medium mb-5">
              Support
            </p>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#a09383] transition-colors duration-200 hover:text-[#f0e7d6]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-[#7a705e]">
            © {new Date().getFullYear()} imagicaholidays. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-[#7a705e]">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-[#a09383]">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-[#a09383]">Terms of Service</Link>
            <Link href="/cookies" className="transition-colors duration-200 hover:text-[#a09383]">Cookie Policy</Link>
            <Link href="/sitemap" className="transition-colors duration-200 hover:text-[#a09383]">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* ── Large Watermark Text ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
        <span className="font-roman text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold uppercase tracking-[0.15em] text-white/[0.02] leading-none block translate-y-1/3">
          IMAGICAHOLIDAYS
        </span>
      </div>
    </footer>
  );
}
