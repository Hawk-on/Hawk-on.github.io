# Håkon Hole Lønning — Portefølje

Personleg portefølje og CV bygd med [Astro](https://astro.build) og [React](https://react.dev).

## Teknisk Stack
- **Framework:** Astro 6.x (Static)
- **UI:** React 19 (Islands-arkitektur)
- **State:** Nano Stores (delt tilstand mellom React og Vanilla JS)
- **Styling:** Vanilla CSS med CSS-variablar
- **SEO:** JSON-LD (Person schema), OpenGraph, Sitemap
- **Språk:** Nynorsk (kløyvd infinitiv) med sentralisert i18n-støtte (NN/EN)

## Kome i gang

```bash
npm install
npm run dev       # lokalt på http://localhost:4321
npm run build     # bygg til ./dist
npm run preview   # førehandsvis produksjonsbygg
```

## Struktur

```
src/
├── assets/          # Optimaliserte bilete (Image-komponent)
├── components/      # React-komponentar (Header, Footer, Kontakt, BloggSveip)
├── layouts/         # Grunnoppsett (SEO, Client Router)
├── pages/           # index.astro (Hovudside med Nano Store-lyttar)
├── stores/          # spraakStore.ts (Sentralisert språktilstand)
├── utils/           # i18n.ts (Omsetjingar og typar)
└── styles/          # global.css (Design-tokens og styling)
```

## Antispam
Kontaktinformasjon er verna ved bruk av Base64-sløring og dynamisk utfylling via React for å hindra enkel scraping av botar.
