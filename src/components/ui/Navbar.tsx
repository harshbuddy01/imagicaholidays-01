"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/journey", id: "/journey", label: "Journey" },
  { href: "/#hotels", id: "#hotels", label: "Hotels" },
  {
    href: "/#destinations-carousel",
    id: "#destinations-carousel",
    label: "Destinations",
    dropdown: [
      { label: "Gangtok", href: "/destinations/gangtok" },
      { label: "Pelling", href: "/destinations/pelling" },
      { label: "Lachung", href: "/destinations/lachung" },
      { label: "Darjeeling", href: "/destinations/darjeeling" },
      { label: "Munnar", href: "/destinations/munnar" },
      { label: "Wayanad", href: "/destinations/wayanad" },
      { label: "Jaipur", href: "/destinations/jaipur" },
      { label: "Udaipur", href: "/destinations/udaipur" },
      { label: "Goa", href: "/destinations/goa" },
    ]
  },
  { href: "/#activities-section", id: "#activities-section", label: "Activities" },
  { href: "/testimonials", id: "/testimonials", label: "Guests" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(pathname.startsWith('/journey') ? '/journey' : '#hotels');
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

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
          ? "border-b border-white/10 bg-[rgba(16,14,10,0.92)] py-2 backdrop-blur-2xl"
          : "bg-gradient-to-b from-[rgba(9,8,6,0.62)] to-transparent py-4"
          }`}
      >
        <div className="content-shell flex items-center justify-between px-4 md:px-1">
          <Link href="/" className="relative z-[60] flex flex-col items-center justify-center gap-1 group">
            <div className="relative w-16 md:w-20 aspect-[1.5]">
              <Image
                src="/logo_icon.png"
                alt="Imagica Holidays Logo"
                fill
                className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <span className="font-serif text-[10px] tracking-[0.25em] text-white md:text-[13px] md:tracking-[0.3em] font-medium mt-[-4px]">
              IMAGICAHOLIDAYS
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  aria-current={active === link.id ? "page" : undefined}
                  className={`text-[0.68rem] uppercase tracking-[0.2em] transition ${active === link.id ? "text-[#d8be8f]" : "text-white/90 hover:text-[#d8be8f]"
                    }`}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-[#1a1914] border border-white/10 rounded-lg py-4 px-6 min-w-[200px] shadow-2xl backdrop-blur-xl bg-opacity-95">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-[0.6rem] uppercase tracking-[0.15em] text-white/70 hover:text-[#d8be8f] transition-colors whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop reserve button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/reserve" className="group relative overflow-hidden rounded-full px-6 py-2.5 shadow-[0_0_15px_rgba(216,190,143,0.3)] hover:shadow-[0_0_25px_rgba(216,190,143,0.6)] transition-shadow duration-500 flex items-center justify-center gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] opacity-90 transition-opacity duration-500 group-hover:opacity-100 animate-gradient-panning background-size-200" />
              <div className="absolute inset-0 border border-[#d8be8f]/50 rounded-full animate-ping opacity-20" />
              <svg className="w-3.5 h-3.5 text-white relative z-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white">
                Reserve
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setOpen((prev) => !prev); setDestOpen(false); }}
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

      </header >
      {/* ─── Full-screen mobile menu ─── */}
      <AnimatePresence>
        {
          open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[9999] bg-[#0e0d0a] md:hidden flex flex-col"
            >
              {/* Top bar in overlay */}
              <div className="flex items-center justify-between px-4 py-5">
                <Link href="/" onClick={() => setOpen(false)} className="font-serif text-lg tracking-[0.14em] text-white">
                  IMAGICAHOLIDAYS
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

              {/* Nav links */}
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
                          onClick={() => setDestOpen((prev) => !prev)}
                          className="w-full flex items-center justify-between py-4 border-b border-white/8"
                        >
                          <span className="text-2xl font-serif tracking-[0.1em] text-white/90">
                            {link.label}
                          </span>
                          <motion.svg
                            animate={{ rotate: destOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
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
                                    key={item.href}
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
                        className="block py-4 border-b border-white/8 text-2xl font-serif tracking-[0.1em] text-white/90"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Reserve button in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    href="/reserve"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#8a6b2d] via-[#a5813b] to-[#8a6b2d] rounded-full text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white shadow-[0_0_20px_rgba(216,190,143,0.3)]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Reserve Now
                  </Link>
                </motion.div>
              </nav>

              {/* Bottom decorative */}
              <div className="px-8 pb-8">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ae9e85]/30 to-transparent mb-4" />
                <p className="text-[10px] text-[#7a705e] tracking-[0.2em] uppercase text-center">
                  Curating Extraordinary Journeys
                </p>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
}
