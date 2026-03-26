# AYANA Bali Inspired Website Clone

A complete Next.js + Tailwind scaffold inspired by the visual language of AYANA Bali:

- fullscreen hero slider with animated text
- tabbed hotels section with horizontal sliders
- pools, dining, and spa experience grids
- Framer Motion reveal animations
- GSAP ScrollTrigger parallax effect in hero

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Swiper.js

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. If you hit a runtime error like missing chunk files (for example Cannot find module ./394.js), run a clean rebuild:

```bash
npm run rebuild
```

## Project Structure

```text
src/
	app/
	assets/
	components/
		ui/
	lib/
	sections/
		Hero/
		Hotels/
		Experience/
	styles/
```

## Roadmap Alignment

- Phase 1 Setup: complete
- Phase 2 Layout: complete
- Phase 3 Sections: complete
- Phase 4 Animations: complete baseline (Framer + GSAP)
- Phase 5 Optimization: starter pass complete (optimized images, priority only on first hero slide)

## Notes

- Replace Unsplash URLs with your own licensed media for production.
- Fine tune spacing and animation timing against the live AYANA reference for pixel-level matching.
- Deploy easily on Vercel after pushing to GitHub.
