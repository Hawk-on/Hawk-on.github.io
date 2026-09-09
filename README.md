# Håkon Hole Lønning — Portefølje og blogg

Personleg nettstad bygd med Astro og React. CV på rota, blogg under `/blog/`.
Dei to låg tidlegare i kvart sitt repo og vart slåtte saman i august 2026 for å dele
designsystem, layout og byggjesteg.

## Teknisk Stack
- **Framework:** Astro 7.x (Content Layer API)
- **UI:** React 19 (Islands)
- **State:** Nano Stores (sentral i18n, berre CV-delen)
- **Søk:** Pagefind (statisk indeksering over heile `dist`)
- **Kommentarar:** Giscus mot GitHub Discussions i dette repoet
- **Språk:** Nynorsk (kløyvd infinitiv)

## Viktig mandat
Dokumentasjonen (README.md, CLAUDE.md, gemini.md) skal alltid oppdaterast ved tekniske eller arkitektoniske endringar.

## Kome i gang
```bash
npm install
npm run build    # astro build && pagefind --site dist
```

Statiske filer ligg i `public/`. Lokale bygg skal vere identiske med CI.

## Struktur
- `src/content/blog/`: Blogginnlegga, med schema i `src/content.config.ts`.
- `src/layouts/Grunnoppsett.astro`: Delt skal for heile nettstaden. Vel Umami-ID og JSON-LD etter rute.
- `src/pages/blog/`: Bloggen. `src/pages/Blog/` er redirect-stubbar frå den gamle stien.
- `src/utils/rutar.ts`: `BLOGG_BASE`. Bruk denne, ikkje `BASE_URL`, som er tom streng etter samanslåinga.
- `src/stores/spraakStore.ts`: Felles tilstand for språkval på CV-delen.
- `src/components/BloggSveip/`: Hentar siste innlegg frå `/siste-innlegg.json` i same nettstad.
- `src/components/Kontakt/`: Antispam-verna kontaktinformasjon.

## Skrivereglar
Blogginnlegga er feature-artiklar med obligatorisk kjeldekritikk-matrise.
Sjå `CLAUDE.md` for artikkelformat, kjeldekrav og språkvask.
