"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/#journey", id: "#journey", label: "Journey" },
  { href: "/#hotels", id: "#hotels", label: "Hotels" },
  { href: "/#destinations-carousel", id: "#destinations-carousel", label: "Destinations" },
  { href: "/#activities-section", id: "#activities-section", label: "Activities" },
  { href: "/testimonials", id: "/testimonials", label: "Guests" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hotels");
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[rgba(16,14,10,0.92)] py-3 backdrop-blur-2xl"
          : "bg-gradient-to-b from-[rgba(9,8,6,0.62)] to-transparent py-5"
      }`}
    >
      <div className="content-shell flex items-center justify-between px-1">
        <Link href="#" className="font-serif text-xl tracking-[0.16em] text-white md:text-2xl">
          IMAGICAHOLIDAYS
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active === link.id ? "page" : undefined}
              className={`text-[0.68rem] uppercase tracking-[0.2em] transition ${
                active === link.id ? "text-[#d8be8f]" : "text-white/90 hover:text-[#d8be8f]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/reserve" className="group relative hidden overflow-hidden rounded-full border border-white/45 px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-[#ae9e85] md:block">
          <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1a1914]">Reserve</span>
          <div className="absolute inset-0 bg-[#ae9e85] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
        </Link>

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-full border border-white/50 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white md:hidden"
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-3 rounded-2xl border border-white/15 bg-[rgba(10,9,7,0.96)] p-4 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-white/10 pb-3 text-xs uppercase tracking-[0.22em] ${active === link.id ? "text-[#d8be8f]" : "text-white/90"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
