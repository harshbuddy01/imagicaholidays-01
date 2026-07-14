"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface DropdownItem {
  label: string;
  href: string;
  image?: string;
}

interface NavLink {
  href: string;
  id: string;
  label: string;
  icon?: React.ReactNode;
  dropdown?: DropdownItem[];
}

const links: NavLink[] = [
  { 
    href: "/journey", 
    id: "/journey", 
    label: "Journey",
    icon: (
      <svg className="w-3.5 h-3.5 mb-1 text-inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M2 20L12 4L22 20H2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20L12 12L16 20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  { 
    href: "/#destinations-carousel", 
    id: "#destinations-carousel", 
    label: "Destinations",
    icon: (
      <svg className="w-3.5 h-3.5 mb-1 text-inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 21S5 14 5 9.5a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2" fill="currentColor" />
      </svg>
    ),
    dropdown: [
      { label: "Gangtok", href: "/destinations/gangtok", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=150" },
      { label: "Darjeeling", href: "/destinations/darjeeling", image: "https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?w=150" },
      { label: "Munnar", href: "/destinations/munnar", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150" },
      { label: "Wayanad", href: "/destinations/wayanad", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=150" },
      { label: "Jaipur", href: "/destinations/jaipur", image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=150" },
      { label: "Udaipur", href: "/destinations/udaipur", image: "https://images.unsplash.com/photo-1566837403146-36528327c57f?w=150" },
      { label: "Goa", href: "/destinations/goa", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=150" },
      { label: "Pelling", href: "/destinations/pelling", image: "https://images.unsplash.com/photo-1543336775-49935ed6e76d?w=150" },
      { label: "Lachung", href: "/destinations/lachung", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=150" }
    ]
  },
  { href: "/testimonials", id: "/testimonials", label: "Experiences" },
  { href: "/blog", id: "/blog", label: "Stories" },
  { href: "/about", id: "/about", label: "About Us" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(pathname.startsWith('/journey') ? '/journey' : '#destinations-carousel');
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["#journey", "#destinations-carousel", "#activities-section"];
    const elements = ids
      .map((id) => document.querySelector(id))
      .filter((node): node is Element => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { threshold: [0.25, 0.45, 0.7], rootMargin: "-20% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/journey')) {
      setActive('/journey');
    }
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled || pathname.startsWith('/journey')
          ? "border-b border-white/10 bg-[rgba(16,14,10,0.95)] py-2 backdrop-blur-2xl"
          : "bg-gradient-to-b from-[rgba(9,8,6,0.7)] to-transparent py-4"
          }`}
      >
        <div className="content-shell flex items-center justify-between px-4 md:px-1">
          {/* Logo Brand: Centered icon stacked on top of text, no subtext */}
          <Link href="/" className="relative z-[60] flex flex-col items-center justify-center gap-0.5 group">
            <div className="relative w-14 h-9 md:w-16 md:h-11">
              <Image
                src="/logo_new.png"
                alt="Imagica Holidays Logo"
                fill
                className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <span className="font-garamond text-[12px] tracking-[0.32em] text-white md:text-[15px] md:tracking-[0.4em] font-semibold leading-none mt-1.5 group-hover:text-[#d8be8f] transition-colors duration-300">
              IMAGICA HOLIDAYS
            </span>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {links.map((link) => {
              const isHighlightStyle = link.label === "Journey" || link.label === "Destinations";
              const isActive = active === link.id;

              return (
                <div key={link.href} className="relative group py-2">
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex items-center justify-center gap-1.5 transition duration-300 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] font-manrope font-semibold ${
                      isHighlightStyle 
                        ? "text-[#d8be8f] hover:text-[#f3dfbf]" 
                        : isActive ? "text-[#d8be8f]" : "text-white/75 hover:text-[#d8be8f]"
                    }`}
                  >
                    {link.label}
                    {link.label === "Destinations" && (
                      <svg className="w-2.5 h-2.5 text-inherit transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </Link>

                  {/* Elegant bottom accent line on hover */}
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-[#d8be8f]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                  {/* Active Page Indicator */}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d8be8f] shadow-[0_0_8px_rgba(216,190,143,0.8)]" />
                  )}

                  {/* Destinations Luxury Mega-Dropdown Menu */}
                  {link.label === "Destinations" && link.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-[#0b0908]/98 border border-[#d8be8f]/20 rounded-xl p-6 w-[700px] shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl flex gap-6 text-left">
                        {/* Elegant top accent bar */}
                        <div className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8be8f]/50 to-transparent" />
                        
                        {/* Left Side: Regions Grid (2/3 width) */}
                        <div className="flex-1 grid grid-cols-3 gap-5">
                          {/* Column 1: Himalayan East */}
                          <div>
                            <h4 className="font-manrope text-[0.58rem] tracking-[0.25em] uppercase text-[#d8be8f] font-bold mb-4 border-b border-white/5 pb-1">
                              Himalayan East
                            </h4>
                            <ul className="space-y-2.5">
                              <li><Link href="/destinations/gangtok" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Gangtok</Link></li>
                              <li><Link href="/destinations/darjeeling" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Darjeeling</Link></li>
                              <li><Link href="/destinations/pelling" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Pelling</Link></li>
                              <li><Link href="/destinations/lachung" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Lachung</Link></li>
                            </ul>
                          </div>
                          
                          {/* Column 2: Royal Heritage */}
                          <div>
                            <h4 className="font-manrope text-[0.58rem] tracking-[0.25em] uppercase text-[#d8be8f] font-bold mb-4 border-b border-white/5 pb-1">
                              Royal Heritage
                            </h4>
                            <ul className="space-y-2.5">
                              <li><Link href="/destinations/jaipur" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Jaipur</Link></li>
                              <li><Link href="/destinations/udaipur" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Udaipur</Link></li>
                            </ul>
                          </div>

                          {/* Column 3: Tropical South */}
                          <div>
                            <h4 className="font-manrope text-[0.58rem] tracking-[0.25em] uppercase text-[#d8be8f] font-bold mb-4 border-b border-white/5 pb-1">
                              Tropical South
                            </h4>
                            <ul className="space-y-2.5">
                              <li><Link href="/destinations/munnar" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Munnar</Link></li>
                              <li><Link href="/destinations/wayanad" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Wayanad</Link></li>
                              <li><Link href="/destinations/goa" className="font-garamond text-[0.95rem] text-white/80 hover:text-[#d8be8f] tracking-wide block transition-colors">Goa</Link></li>
                            </ul>
                          </div>
                        </div>

                        {/* Vertical Separator */}
                        <div className="w-px bg-white/10 self-stretch my-1" />

                        {/* Right Side: Featured Spot (1/3 width) */}
                        <div className="w-[220px] flex flex-col justify-between p-1">
                          <div className="relative h-28 rounded-lg overflow-hidden border border-white/10 mb-3 group/featured">
                            <Image 
                              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300" 
                              alt="Featured Destination" 
                              width={220}
                              height={112}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/featured:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent" />
                            <div className="absolute bottom-2.5 left-2.5">
                              <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#d8be8f] font-bold block mb-0.5">Featured Memoir</span>
                              <span className="text-[0.75rem] uppercase tracking-[0.15em] text-white font-bold block font-garamond">Munnar, Kerala</span>
                            </div>
                          </div>
                          <p className="text-[0.62rem] text-white/55 font-manrope leading-relaxed mb-3">
                            Wander through mist-shrouded emerald slopes, where cloud-kissed heights offer sanctuary.
                          </p>
                          <Link 
                            href="/destinations" 
                            className="text-[0.58rem] uppercase tracking-[0.2em] text-[#d8be8f] hover:text-white font-bold transition-colors flex items-center gap-1.5"
                          >
                            Explore All Escape
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Side CTA & WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            {/* WhatsApp Chat Button — Official Green Bubble Icon */}
            <a 
              href="https://wa.me/918235337180?text=Hi!%20I'd%20like%20to%20plan%20a%20trip%20with%20Imagica%20Holidays." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all duration-500 shadow-[0_0_10px_rgba(37,211,102,0.15)] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
              aria-label="Chat on WhatsApp"
            >
              {/* Official WhatsApp logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.45.646 4.75 1.775 6.74L2 30l7.47-1.742A13.935 13.935 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z" fill="currentColor"/>
                <path d="M22.003 19.284c-.32-.16-1.89-.932-2.183-1.038-.293-.107-.506-.16-.719.16-.213.32-.824 1.038-1.01 1.251-.187.213-.373.24-.693.08-.32-.16-1.352-.499-2.575-1.591-.952-.85-1.594-1.9-1.781-2.22-.186-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.623-.524-.538-.72-.549l-.612-.01a1.174 1.174 0 0 0-.852.4c-.293.32-1.118 1.092-1.118 2.665s1.145 3.09 1.304 3.303c.16.213 2.252 3.44 5.459 4.826.763.33 1.358.526 1.822.674.765.244 1.462.21 2.012.127.614-.091 1.89-.773 2.156-1.52.267-.746.267-1.385.187-1.52-.08-.133-.293-.213-.612-.373Z" fill="white"/>
              </svg>
            </a>

            {/* Inquiry CTA Button */}
            <Link href="/reserve" className="group relative overflow-hidden rounded-full px-5 py-2.5 shadow-[0_0_15px_rgba(216,190,143,0.3)] hover:shadow-[0_0_25px_rgba(216,190,143,0.6)] transition-shadow duration-500 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d]">
              <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white font-manrope">
                Inquire Now
              </span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors relative z-10">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Mobile Right Side Controls (WhatsApp icon + Hamburger only — no Enquiry text pill) */}
          <div className="flex items-center gap-3 relative z-[60] md:hidden">
            {/* Mobile WhatsApp Icon Button */}
            <a 
              href="https://wa.me/918235337180?text=Hi!%20I'd%20like%20to%20plan%20a%20trip%20with%20Imagica%20Holidays." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] active:bg-[#25D366] active:text-white transition-all duration-300"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.45.646 4.75 1.775 6.74L2 30l7.47-1.742A13.935 13.935 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z" fill="currentColor"/>
                <path d="M22.003 19.284c-.32-.16-1.89-.932-2.183-1.038-.293-.107-.506-.16-.719.16-.213.32-.824 1.038-1.01 1.251-.187.213-.373.24-.693.08-.32-.16-1.352-.499-2.575-1.591-.952-.85-1.594-1.9-1.781-2.22-.186-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.623-.524-.538-.72-.549l-.612-.01a1.174 1.174 0 0 0-.852.4c-.293.32-1.118 1.092-1.118 2.665s1.145 3.09 1.304 3.303c.16.213 2.252 3.44 5.459 4.826.763.33 1.358.526 1.822.674.765.244 1.462.21 2.012.127.614-.091 1.89-.773 2.156-1.52.267-.746.267-1.385.187-1.52-.08-.133-.293-.213-.612-.373Z" fill="white"/>
              </svg>
            </a>

            {/* Mobile Hamburger Button */
            <button
              onClick={() => { setOpen((prev) => !prev); setDestOpen(false); }}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex flex-col items-center justify-center w-10 h-10 animate-fade-in"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                className="block w-5 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-[1.5px] bg-white rounded-full my-[3px]"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                className="block w-5 h-[1.5px] bg-white rounded-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-[#0e0d0a] md:hidden flex flex-col"
          >
            {/* Mobile Top Bar */}
            <div className="flex items-center justify-between px-4 py-5">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <div className="relative w-10 h-8">
                  <Image src="/logo_new.png" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <span className="font-garamond text-[13px] tracking-[0.25em] text-white font-bold">
                    IMAGICA HOLIDAYS
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex flex-col items-center justify-center w-10 h-10"
              >
                <motion.span animate={{ rotate: 45, y: 0 }} className="block w-5 h-[1.5px] bg-white rounded-full" />
                <motion.span animate={{ opacity: 0 }} className="block w-5 h-[1.5px] bg-white rounded-full my-[3px]" />
                <motion.span animate={{ rotate: -45, y: 0 }} className="block w-5 h-[1.5px] bg-white rounded-full" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1 -mt-16">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setDestOpen((p) => !p)}
                        className="w-full flex items-center justify-between py-4 border-b border-white/8 text-left"
                      >
                        <span className="text-xl font-garamond tracking-[0.1em] text-white/90">
                          {link.label}
                        </span>
                        <motion.svg
                          animate={{ rotate: destOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {destOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-4 pl-4">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="text-sm font-garamond text-[#ae9e85] hover:text-white transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 border-b border-white/8 text-xl font-garamond tracking-[0.1em] text-white/90"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/reserve"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-r from-[#8a6b2d] via-[#c9a84c] to-[#8a6b2d] rounded-full text-[0.72rem] font-bold uppercase tracking-[0.25em] text-white shadow-[0_0_20px_rgba(201,168,76,0.35)] hover:shadow-[0_0_30px_rgba(201,168,76,0.6)] active:scale-95 transition-all duration-300 relative overflow-hidden group/mcta"
                >
                  <span className="relative z-10">Inquire Now</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white relative z-10">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </nav>

            <div className="px-8 pb-8">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ae9e85]/30 to-transparent mb-4" />
              <p className="text-[10px] text-[#7a705e] tracking-[0.2em] uppercase text-center font-mono">
                Curating Extraordinary Journeys
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
