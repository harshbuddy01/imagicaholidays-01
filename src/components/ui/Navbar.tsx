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
  desc?: string;
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
    ),
    dropdown: [
      { label: "Luxury Escapes", desc: "Indulge in comfort", href: "/journey", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120" },
      { label: "Adventure Trips", desc: "For the explorers", href: "/journey", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=120" },
      { label: "Road Trips", desc: "Scenic drives & beyond", href: "/journey", image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=120" },
      { label: "Family Holidays", desc: "Memories together", href: "/journey", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=120" },
      { label: "Honeymoon", desc: "Romance redefined", href: "/journey", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=120" },
      { label: "Custom Journey", desc: "Tailored just for you", href: "/journey", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=120" },
    ]
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
      { label: "Ladakh", href: "/destinations/darjeeling", image: "https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?w=150" },
      { label: "Kashmir", href: "/destinations/gangtok", image: "https://images.unsplash.com/photo-1566837403146-36528327c57f?w=150" },
      { label: "Sikkim", href: "/destinations/gangtok", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=150" },
      { label: "Meghalaya", href: "/destinations/lachung", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150" },
      { label: "Bhutan", href: "/destinations/pelling", image: "https://images.unsplash.com/photo-1543336775-49935ed6e76d?w=150" },
      { label: "Vietnam", href: "/destinations/udaipur", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=150" },
      { label: "Bali", href: "/destinations/wayanad", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=150" },
      { label: "Thailand", href: "/destinations/goa", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=150" },
    ]
  },
  { href: "/#hotels", id: "#hotels", label: "Hotels" },
  { href: "/testimonials", id: "/testimonials", label: "Experiences" },
  { href: "/blog", id: "/blog", label: "Stories" },
  { href: "/about", id: "/about", label: "About Us" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(pathname.startsWith('/journey') ? '/journey' : '#hotels');
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["#journey", "#hotels", "#destinations-carousel", "#activities-section"];
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
          {/* Logo Brand matching Mockup */}
          <Link href="/" className="relative z-[60] flex items-center gap-3 group">
            <div className="relative w-10 h-8 md:w-12 md:h-10">
              <Image
                src="/logo_icon.png"
                alt="Imagica Holidays Logo"
                fill
                className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="font-serif text-[11px] tracking-[0.25em] text-white md:text-[14px] md:tracking-[0.35em] font-bold">
                IMAGICA HOLIDAYS
              </span>
              <span className="text-[6px] tracking-[0.18em] text-[#d8be8f]/80 uppercase font-semibold">
                HANDCRAFTED LUXURY JOURNEYS
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
            {links.map((link) => {
              const isHighlightStyle = link.label === "Journey" || link.label === "Destinations";
              const isActive = active === link.id;

              return (
                <div key={link.href} className="relative group py-2">
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex flex-col items-center justify-center transition duration-300 px-4 py-1.5 rounded-full border border-transparent text-[0.66rem] uppercase tracking-[0.18em] ${
                      isHighlightStyle 
                        ? "text-[#d8be8f] font-semibold bg-white/[0.04] border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/[0.08]" 
                        : isActive ? "text-[#d8be8f]" : "text-white/80 hover:text-[#d8be8f]"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>

                  {/* CUSTOM DROPDOWNS MATCHING MOCKUP */}
                  {/* Journey Category List Dropdown */}
                  {link.label === "Journey" && link.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-[#100e0a]/95 border border-white/10 rounded-2xl p-4 min-w-[280px] shadow-2xl backdrop-blur-xl bg-opacity-95">
                        <div className="flex flex-col gap-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group/item"
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/90 group-hover/item:text-[#d8be8f]">
                                  {item.label}
                                </span>
                                <span className="text-[0.55rem] text-white/50 tracking-wide mt-0.5">
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Destinations Grid Card Dropdown */}
                  {link.label === "Destinations" && link.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-[#100e0a]/95 border border-white/10 rounded-2xl p-4 min-w-[340px] shadow-2xl backdrop-blur-xl bg-opacity-95">
                        <div className="grid grid-cols-2 gap-3">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="relative h-20 rounded-xl overflow-hidden group/item border border-white/10"
                            >
                              <img 
                                src={item.image} 
                                alt={item.label} 
                                className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" 
                              />
                              <div className="absolute inset-0 bg-black/45 group-hover/item:bg-black/25 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white group-hover/item:text-[#d8be8f] transition-colors">
                                  {item.label}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Plan My Journey button matching Mockup */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/reserve" className="group relative overflow-hidden rounded-full px-6 py-3 shadow-[0_0_15px_rgba(216,190,143,0.3)] hover:shadow-[0_0_25px_rgba(216,190,143,0.6)] transition-shadow duration-500 flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d]">
              <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
                Plan My Journey
              </span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors relative z-10">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setOpen((prev) => !prev); setDestOpen(false); setJourneyOpen(false); }}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-[60] flex flex-col items-center justify-center w-10 h-10 md:hidden"
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
                  <Image src="/logo_icon.png" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <span className="font-serif text-[11px] tracking-[0.25em] text-white font-bold">
                    IMAGICA HOLIDAYS
                  </span>
                  <span className="text-[6px] tracking-[0.18em] text-[#d8be8f]/80 uppercase font-semibold">
                    HANDCRAFTED LUXURY JOURNEYS
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
                        onClick={() => {
                          if (link.label === "Journey") setJourneyOpen((p) => !p);
                          if (link.label === "Destinations") setDestOpen((p) => !p);
                        }}
                        className="w-full flex items-center justify-between py-4 border-b border-white/8 text-left"
                      >
                        <span className="text-xl font-serif tracking-[0.1em] text-white/90">
                          {link.label}
                        </span>
                        <motion.svg
                          animate={{ rotate: (link.label === "Journey" ? journeyOpen : destOpen) ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {((link.label === "Journey" && journeyOpen) || (link.label === "Destinations" && destOpen)) && (
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
                                  className="text-sm text-[#ae9e85] hover:text-white transition-colors"
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
                      className="block py-4 border-b border-white/8 text-xl font-serif tracking-[0.1em] text-white/90"
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
                  className="flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] rounded-full text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(216,190,143,0.3)]"
                >
                  Inquiry Now
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
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
