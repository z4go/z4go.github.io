# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

z4go is a static Osaka/Kansai **trip plan** site built with Astro + TypeScript, deployed to GitHub Pages.

## Commands

This project uses **Bun**, not npm/pnpm. Standard scripts (`dev`, `build`, `preview`) are in `package.json`.

- `bun run placeholders` — regenerate placeholder images into `src/assets/osaka-2026/` (`scripts/gen-placeholders.mjs`; renders text in the iannnnn-DOG font via `@resvg/resvg-js`, encodes with `sharp`). Real photos go in the same folders with the same filenames.

## Stack gotchas

- **Tailwind CSS v4** is wired through the `@tailwindcss/vite` plugin (`astro.config.mjs`) — do NOT add `@astrojs/tailwind`. Theme tokens are CSS-first in the `@theme` block of `src/styles/global.css`; there is no `tailwind.config.js`.
- **Images** use the built-in `astro:assets` `<Image>` component. `@astrojs/image` was removed from Astro years ago — never install or import it.
- Content-collection schemas import `z` from `astro:schema` (not `astro:content`).

## Theme

Hand-drawn *Excalidraw*-style UI on a crimson primary (`#d63346`). New components should reuse the helper classes in `src/styles/global.css` — `.sketch` (wobbly hand-drawn border), `.pop` / `.pop-sm` (hard offset shadow), `.lift` (hover lift), `.pill`, `.scribble` (highlighter underline) — instead of flat or evenly-rounded defaults. The display font is the self-hosted **iannnnn-DOG** (`public/iannnnn-DOG/`), applied site-wide.

## Content & structure

- Each trip day is a Markdown file in `src/content/trips/osaka-2026/`. Frontmatter is validated by `src/content.config.ts` and drives every component; `src/pages/osaka-2026/[day].astro` generates the routes.
- Frontmatter `hero`/`photos` paths are relative to the Markdown file (`../../../assets/...`).
- **Bilingual style:** day/page titles, section headings, UI labels, pills, map labels, reference titles and tags are in **English**; the Markdown write-up body, the `summary` blurb and `timeline` stop descriptions are in **Thai**. Keep this split consistent in new content.
- UI label strings live in `src/lib/i18n.ts`; components take a `lang` prop (currently `en` everywhere — `lang: th` in frontmatter switches a page's UI chrome to Thai).
- `{{ TODO }}` and `{{ TODO: note }}` markers in Markdown are styled by `plugins/remark-todo.mjs`.

## Deployment

- Deploys to GitHub Pages at the **org root** (`https://z4go.github.io/`). `astro.config.mjs` sets `site` and has **no `base`** — keep it so; the GitHub repo must be named `z4go.github.io` for URLs to resolve.
- `.github/workflows/deploy.yml` builds with Bun and deploys on push to `main`.
