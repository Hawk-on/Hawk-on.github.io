# Prosjektkontekst: Portefølje

## Om porteføljen
Personleg portefølje og CV for Håkon Hole Lønning.
Språk: Nynorsk med kløyvd infinitiv.

## Teknisk stack
- Astro 6.x
- React 19 (Islands for Header, Footer, Kontakt, BloggSveip)
- Nano Stores (Sentralisert i18n-tilstand i `src/stores/spraakStore.ts`)
- GitHub Pages via GitHub Actions (Node 22)

## Viktig mandat
**Hugs å oppdatere denne fila (CLAUDE.md), README.md og gemini.md kvar gong det vert gjort endringar i arkitektur, teknisk stack eller viktige funksjonar.**

## i18n Arkitektur
- **Kjelde:** `src/utils/i18n.ts` inneheld alle tekststrengar.
- **Tilstand:** `spraakStore.ts` held på aktivt språk og synkroniserer med `localStorage`.
- **Navigering:** All logikk er pakka i `astro:page-load` for å fungera med Client Router.

## Antispam og Robot-kontroll
- **Kontaktinfo:** E-post og telefon er Base64-koda i `Kontakt.tsx`. Aldri legg ut i klartekst.
- **AI-sperre:** `robots.txt` blokkerer GPTBot, CCBot m.fl.

## Git og Deploy
- Deploy via GitHub Actions ved push til `master`.
- Brukar Node 22 i CI.
