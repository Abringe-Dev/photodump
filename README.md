# Our Story

A mobile-first, data-driven romantic memory gallery built with React, Vite, Tailwind CSS, shadcn/ui, React Bits, and Motion.

## Run it

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Make it yours

All personal content lives in `src/data/memories.js`.

1. Update `site.tagline`, `site.heroNote`, and `site.nextDate`.
2. Replace the sample memories, captions, dates, and locations.
3. Add real photos under `public/photos/` and update each `src`, `width`, and `height`.
4. Replace `public/music/our-song.mp3` with your song. The included track is a generated ambient placeholder.
5. Replace `public/favicon.svg` if you want a custom icon.

The layout adapts to any number of memories. Each memory needs at least one photo.

## Project structure

```text
src/
  components/
    reactbits/        Animated React Bits components
    ui/               shadcn/ui primitives
    Hero.jsx          Hero and photo stack
    Timeline.jsx      Alternating memory timeline
    MemoryCard.jsx    Memory details and photo carousel
    Gallery.jsx       Filterable masonry gallery
    LoveLetter.jsx    Interactive envelope & typewriter letter
  context/            Lightbox and heart-confetti providers
  data/memories.js    All personal content
  hooks/              Capability, scroll, and media hooks
  lib/                Date and photo helpers
  globals.css         Theme tokens, glass, polaroid, and animation styles
```

## Accessibility and performance

- The lightbox supports keyboard arrows, Escape, swipe, and thumbnails.
- Motion respects `prefers-reduced-motion`.
- Heavy WebGL effects (Aurora, SplashCursor, Masonry) only run on capable desktop devices.
- Images use native lazy loading, dimensions, and a blur-up placeholder.
- Music is off by default and starts only after a user gesture.

## Deploy

The project is static. Netlify configuration is included in `netlify.toml`; Vercel needs no extra configuration.

```bash
npm run build
```

Deploy the `dist` folder.
