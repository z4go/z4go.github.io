# z4go ✈️ — Osaka / Kansai trip plan

A static **5-day Osaka & Kansai trip plan** (Nov 13–17, 2026) — Kyoto
temples, a flexible Kansai day trip, and Universal Studios Japan. Built with
**Astro** + **Bun**, hand-drawn in a *Cloudflare × Excalidraw* theme, and
deployed free to **GitHub Pages**.

🔗 Live site: **https://z4go.github.io/**

## Tech

- **Astro 5** + TypeScript — static site generator
- **Content collections** — one Markdown file per trip day (`src/content/trips/`)
- **Tailwind CSS v4** — via the `@tailwindcss/vite` plugin (CSS-first theme)
- **`astro:assets`** `<Image>` — auto WebP + responsive images
- **GitHub Actions** — auto-deploy on push to `main`

> **Note on the spec:** `@astrojs/image` was removed from Astro years ago — its
> replacement, the built-in `astro:assets`, is used here instead.

## Develop

```sh
bun install          # install dependencies
bun run placeholders # (re)generate placeholder images
bun run dev          # dev server → http://localhost:4321
bun run build        # build to ./dist
bun run preview      # preview the production build
```

## Project structure

```
src/
  assets/osaka-2026/      day-N/hero.jpg + photo-*.jpg  (optimized by Astro)
  components/
    TripHero.astro        title, date, location + weather pills, hero image
    DayStats.astro        4 metric cards — steps / spent / stops / photos
    Timeline.astro        time · stop · cost table
    RouteMap.astro        key-free Google Maps embed from a coords array
    PhotoGrid.astro       responsive grid, lazy-loaded, click-to-lightbox
    ReferenceList.astro   link cards with icon + external-link indicator
    TagList.astro         hashtag pills
    DayLayout.astro       assembles all of the above from frontmatter
    SiteNav.astro         sticky nav with Day 1–5 dots
  content/trips/osaka-2026/   day-1.md … day-5.md
  content.config.ts       trip collection schema
  layouts/BaseLayout.astro    HTML shell, fonts, footer
  pages/
    index.astro           trip index with day cards
    osaka-2026/[day].astro  one page per day → /osaka-2026/day-1 … day-5
  styles/global.css       Tailwind theme + hand-drawn surfaces
plugins/remark-todo.mjs   turns `{{ TODO }}` markers into styled spans
scripts/gen-placeholders.mjs  generates placeholder images
```

## Images

The repo ships with **generated placeholder images** so the build works before
real photos exist. To use real photos:

1. Resize source images to **max 1600px wide** before committing.
2. Drop them into `src/assets/osaka-2026/day-N/` using the same filenames
   (`hero.jpg`, `photo-1.jpg`, …) — frontmatter paths stay unchanged.
3. Hero images are cropped **3:2**; grid thumbnails **1:1**.

`astro:assets` converts them to responsive WebP at build time.

## Content

Each day is a Markdown file. Frontmatter drives every component (`stats`,
`timeline`, `coords`, `references`, `tags`, …); the Markdown body is the
write-up. Days 1 & 5 are written; Days 2–4 use `{{ TODO }}` markers and
`callout` / `todo-block` blocks for pending decisions.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with Bun
and publishes `dist/` to GitHub Pages.

> **One-time setup:** this site targets the **org root** (`z4go.github.io`).
> The repo must be named `z4go.github.io`, and in **Settings → Pages → Build
> and deployment → Source** select **GitHub Actions**. `astro.config.mjs` uses
> `site: 'https://z4go.github.io'` with no `base`.
