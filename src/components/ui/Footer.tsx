export default function Footer() {
  return (
    <footer className="mt-14 border-t border-[#dbcdb6] bg-[#1a1914] px-5 py-14 text-[#f0e7d6] md:px-8 md:py-16 lg:px-12">
      <div className="content-shell">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.25fr_0.85fr_0.85fr_1fr]">
          <div className="max-w-2xl">
            <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#c7af78]">Inspired by AYANA Bali</p>
            <h4 className="mt-3 text-3xl leading-[0.95] md:text-5xl">Island Hospitality Reimagined</h4>
            <p className="mt-4 text-sm text-[#d2c5ad] md:text-base">
              A high-fidelity destination concept shaped for immersive resort storytelling, cinematic transitions,
              and refined tropical luxury.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#bda982]">Stay</p>
            <ul className="mt-4 space-y-3 text-sm text-[#d8ccb7]">
              <li><a href="#hotels" className="transition hover:text-white">Villas</a></li>
              <li><a href="#hotels" className="transition hover:text-white">Suites</a></li>
              <li><a href="#hotels" className="transition hover:text-white">Family Escapes</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#bda982]">Experiences</p>
            <ul className="mt-4 space-y-3 text-sm text-[#d8ccb7]">
              <li><a href="#pools" className="transition hover:text-white">Pools</a></li>
              <li><a href="#dining" className="transition hover:text-white">Dining</a></li>
              <li><a href="#spa" className="transition hover:text-white">Spa & Wellness</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#bda982]">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-[#d8ccb7]">
              <p>Karang Mas Estate, Jimbaran, Bali</p>
              <p>
                <a href="tel:+620000000000" className="transition hover:text-white">+62 000 0000 0000</a>
              </p>
              <p>
                <a href="mailto:reservations@example.com" className="transition hover:text-white">reservations@example.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-[#bda982]">Reservations 24/7</p>
          <div className="flex gap-5 text-xs uppercase tracking-[0.18em] text-[#d8ccb7]">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
