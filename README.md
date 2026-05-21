# z4go ✈️

A small, fast **travel planner** — keep every trip and its day-by-day
itinerary in one place. Built with [Astro](https://astro.build) and
[Bun](https://bun.sh), deployed free on **GitHub Pages**.

🔗 Live site: **https://z4go.github.io/z4go/**

## Tech

- **Astro 5** — static site generator
- **Bun** — package manager & runtime
- Plain CSS — Ocean / Teal theme
- **GitHub Actions** — auto-deploy on push to `main`

## Develop

```sh
bun install      # install dependencies
bun run dev      # start dev server → http://localhost:4321/z4go
bun run build    # build to ./dist
bun run preview  # preview the production build
```

## Add a trip

Everything lives in [`src/data/trips.ts`](src/data/trips.ts). Add a new
object to the `trips` array — a page is generated for each `slug`
automatically.

## Project structure

```
src/
  components/   Header, Footer, TripCard
  data/         trips.ts — all trip & itinerary data
  layouts/      Layout.astro — shared page shell
  lib/          url.ts — base-path-aware link helper
  pages/        index.astro, trips/[slug].astro
  styles/       global.css — theme + layout
public/         favicon.svg
.github/        workflows/deploy.yml — GitHub Pages deploy
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with
Bun and publishes `dist/` to GitHub Pages.

> **One-time setup:** in the repo, go to **Settings → Pages → Build and
> deployment → Source** and select **GitHub Actions**.

The `site` and `base` in [`astro.config.mjs`](astro.config.mjs) are set
for the `z4go/z4go` repo. If you fork or rename, update them to match.
