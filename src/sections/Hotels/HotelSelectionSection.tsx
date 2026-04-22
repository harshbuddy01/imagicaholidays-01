import { motion } from "framer-motion";

export default function HotelSelectionSection() {
  return (
    <section className="relative w-full flex flex-col items-center bg-[#f8f5f0] py-20 px-4 md:px-8 text-[#5c544b] overflow-hidden">

      {/* Decorative vertical dots at the top */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]"></div>
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]"></div>
        <div className="w-1 h-1 rounded-full bg-[#ae9e85]"></div>
      </div>

      {/* Main Text Intro */}
      <div className="text-center font-serif text-lg md:text-xl font-light leading-relaxed max-w-2xl">
        <p>IMAGICA HOLIDAYS is home to four distinctive hotels,</p>
        <p>each offering its own unique charm</p>
        <p>and heavenly vistas.</p>
        <p className="mt-8">Which will you pick?</p>
      </div>

      {/* Tiny diamond decoration */}
      <div className="my-10">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#ae9e85" />
        </svg>
      </div>

      {/* Eyebrow: imagicaholidays Hotels */}
      <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-[#7a705e] mb-6">
        IMAGICA HOLIDAYS Hotels
      </p>

      {/* Hotel Selection Menu */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm font-medium tracking-widest text-[#5c544b]">
        {["VILLAS", "SEGARA", "RESORT", "RIMBA"].map((hotel, idx) => (
          <div key={hotel} className="flex items-center gap-4">
            <button className="flex items-center gap-2 hover:text-black transition-colors group">
              <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#5c544b] group-hover:bg-[#5c544b] group-hover:text-white transition-colors">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              {hotel}
            </button>
            {idx < 3 && <span className="text-[#d0c6b5] mx-1 md:mx-4 hidden sm:inline-block">|</span>}
          </div>
        ))}
      </div>

      {/* Detailed Horizontal Line with Sunburst Center */}
      <div className="relative w-full max-w-4xl flex items-center justify-center my-16">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#b5a993] to-[#b5a993] mr-4"></div>

        {/* Sunburst Icon */}
        <div className="flex-shrink-0 text-[#ae9e85]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          </svg>
        </div>

        <div className="w-full h-px bg-gradient-to-l from-transparent via-[#b5a993] to-[#b5a993] ml-4"></div>

        {/* Vertical dotted guides at the ends of the line (visible on large screens) */}
        <div className="absolute left-0 -top-8 w-px h-8 border-l-[1.5px] border-dotted border-[#b5a993] hidden md:block"></div>
        <div className="absolute right-0 -top-8 w-px h-8 border-r-[1.5px] border-dotted border-[#b5a993] hidden md:block"></div>
        <div className="absolute left-0 top-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-[#b5a993] hidden md:block bg-[#f8f5f0]"></div>
        <div className="absolute right-0 top-1/2 translate-x-1/2 w-2 h-2 rounded-full border border-[#b5a993] hidden md:block bg-[#f8f5f0]"></div>
      </div>

      {/* Bottom Focus Area */}
      <div className="text-center">
        <h3 className="font-serif text-2xl md:text-3xl font-light mb-6">
          Your Exclusive Tranquil Haven
        </h3>


        {/* Tiny diamond decoration at bottom */}
        <div className="flex justify-center mt-6">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#b5a993" />
          </svg>
        </div>
      </div>

      {/* Side Rotated Text Decoration */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block tracking-[0.3em] text-[0.65rem] font-medium text-[#a0947f] uppercase">
        IMAGICAHOLIDAYS
      </div>

    </section>
  );
}
