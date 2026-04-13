# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal CV/portfolio site for Håkon Hole Lønning. Astro-based static site hosted on GitHub Pages via GitHub Actions. Visually matches the blog at `hawk-on/blog`.

## Architecture

- `src/pages/index.astro` — Single-page CV with anchor sections: hero, om, erfaring, utdanning, ferdigheiter, kontakt
- `src/layouts/Grunnoppsett.astro` — Base layout: sticky header, nav, footer, dark mode toggle. Same structure as the blog.
- `src/styles/global.css` — Design system: same tokens as the blog (Playfair Display, Source Serif 4, JetBrains Mono, warm cream palette). Includes responsive breakpoints and full print stylesheet.
- `assets/` — Static assets (profile photo, favicons). Copied to `public/` during CI build.
- `.github/workflows/deploy.yml` — GitHub Actions: installs deps, copies `assets/` and `robots.txt` to `public/`, runs `astro build`, deploys to GitHub Pages.

## Design system

Matches `hawk-on/blog` exactly. Key tokens in `:root`:
- `--kvit` / `--svart` — page background / text
- `--raud: #b8001f` — red accent (dark mode: `#e84058`)
- `--lys-grå` — borders and card backgrounds
- `--skrift-brei` — Playfair Display (headings)
- `--skrift-brød` — Source Serif 4 (body)
- `--skrift-kode` — JetBrains Mono (nav, labels, dates)

Dark mode: toggled via `data-theme` on `<html>`, persisted in `localStorage`.

## Conventions

- Norwegian nynorsk in UI text, English in code (variable names, comments)
- Client-side i18n: `data-i18n` attributes on elements, translations object in `<script is:inline>` in `index.astro`
- Language toggle: `id="lang-knapp"` button in nav, wired in the page script
- Antispam: email/phone assembled from parts in client JS — never in raw HTML
- Design tokens as CSS custom properties — never hardcode colors
- Hover effects: subtle transitions only

## Deployment

**Important:** GitHub Pages must be configured to use GitHub Actions as the source (Settings → Pages → Source: GitHub Actions).

Push to `master` → GitHub Actions builds Astro → deploys `dist/` to GitHub Pages.

Local dev: `npm install && npm run dev`
