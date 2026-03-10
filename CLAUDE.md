# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Håkon Hole Lønning. Static single-page site hosted on GitHub Pages. No build step, no framework — vanilla HTML, CSS, and JS.

## Architecture

- `index.html` — Single-page layout with anchor-based sections: hero, about, experience, education, skills, contact
- `style.css` — "Birch & Stone" Scandinavian light theme with CSS custom properties. WCAG AA compliant (4.5:1+ contrast). Includes responsive breakpoints (900px, 768px, 480px) and full print stylesheet
- `script.js` — i18n (Norwegian nynorsk / English), smooth scroll, IntersectionObserver animations, navbar scroll effects, Umami event tracking
- `antispam.js` — Obfuscates email/phone to prevent scraping (assembled from parts on DOMContentLoaded)
- `assets/img/` — Profile photo and favicon
- `assets/css/` — Additional stylesheets if any

## Conventions

- Norwegian nynorsk in UI text, English in code (variable names, comments)
- All user-visible strings are in the `translations` object in `script.js` (keyed by `data-i18n` attributes)
- Design tokens are CSS custom properties in `:root` — always use variables, never hardcode colors
- Hover effects: subtle (max `translateY(-2px)`), no bouncy/floating animations
- Transitions: use `var(--transition)` which targets specific properties (not `all`)

## Analytics

Umami (cloud.umami.is) with `data-umami-event` attributes on interactive elements and `umami.track()` calls for custom events. Always guard with `typeof umami !== 'undefined'`.

## Deployment

Push to `master` → GitHub Pages auto-deploys. No build step needed.
