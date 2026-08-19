# Prosjektkontekst: Portefølje og blogg

## Om nettstaden
Personleg nettstad for Håkon Hole Lønning, med CV på rota og blogg under `/blog/`.
Dei to låg tidlegare i kvart sitt repo (`Hawk-on/hawk-on.github.io` og `Hawk-on/Blog`)
og vart slåtte saman i august 2026 for å dele designsystem, layout og byggjesteg.

**Standardspråk:** Nynorsk med kløyvd infinitiv.
**Tekniske artiklar** (IT, sikkerheit, programvare o.l.) kan skrivast på engelsk. Engelsk er de facto fagspråk innan IT og reduserer risikoen for feil omsetjingar og tvetydigheit i tekniske omgrep.

## Teknisk stack
- **Framework:** Astro 7.x (Content Layer API)
- **UI:** Statisk HTML + React 19 Islands
- **i18n:** Nano Stores — gjeld berre CV-delen
- **Søk:** Pagefind (statisk indeksering, køyrer over heile `dist`)
- **Kommentarar:** Giscus (React Island med dynamisk tema)
- **Deploy:** GitHub Pages via GitHub Actions (Node 22), push til `master`

## Struktur

```
src/
├── content/blog/*.md      Blogginnlegg
├── content.config.ts      Schema for innhaldssamlinga
├── layouts/
│   ├── Grunnoppsett.astro Delt skal for heile nettstaden
│   └── Artikkel.astro     Artikkellayout
├── pages/
│   ├── index.astro        CV
│   ├── om.astro           Om-side
│   ├── blog/              Bloggen
│   └── Blog/              Redirect-stubbar frå den gamle stien
├── components/            Delte + seksjonsspesifikke islands
├── utils/rutar.ts         BLOGG_BASE — bruk denne, ikkje BASE_URL
└── styles/global.css      Éi fil: designtoken, skal, CV-stilar, bloggstilar
```

## Fallgruver etter samanslåinga

- **`import.meta.env.BASE_URL` er tom streng.** Bloggen hadde `base: '/Blog'` før; no finst ingen base. Bruk `BLOGG_BASE` frå `src/utils/rutar.ts`.
- **Skal-laget** (`.container`, `.nettstad-*`, `.meny-bryter`, `.tema-bryter`) kjem frå CV-delen og er med vilje ikkje duplisert i bloggseksjonen av `global.css`.
- **Header er rutemedviten.** `aktuellSti` avgjer om CV-ankera eller bloggnavigasjonen vert viste. Språkknappen er berre synleg på CV-delen, og logoen er hauk-merket + «hawk-on» under `/blog/`, «HHL» på CV-en.
- **Umami har to ID-ar.** CV og blogg held kvar sin statistikkstraum; `Grunnoppsett.astro` vel ID etter rute.
- **Komponent-CSS finst ved sida av `global.css`.** `ArtikkelListe`, `Innhaldstabell` og `LeseProgresjon` har kvar si `.css`-fil som komponenten importerer. Skriv du same markup direkte i ein `.astro`-fil, får du ikkje den stilen — det var slik tag-sida mista tagg-wrappen. Stil som gjeld på tvers høyrer heime i `global.css`.
- **`/Blog/` (stor B) er redirect-stubbar,** ikkje ekte sider. `src/pages/Blog/[...sti].astro` genererer meta-refresh for alle innlegg og taggar; `Blog/rss.xml.ts` serverer feeden på nytt som gyldig XML, ikkje som redirect.

## Kjeldekritikk-system (obligatorisk for blogginnlegg)
Alle artiklar skal bruka den to-dimensjonale kjelde-matrisa.
- **Kvalitet (A–D):** A: Institusjonell/Forskning, B: Kvalitetsmedia, C: OSINT/Teknisk, D: Ustadfesta/Lekkasje.
- **Habilitet (1–3):** 1: Uavhengig, 2: Interessepart/Bias, 3: Partisisk/Statskontrollert.
- **Markering:** `<span id="ref-N" data-kvalitet="X" data-habilitet="Y">XY</span>\[N\] Kjeldetekst...` nedst i artikkelen.
- **Inline:** `[\[N\]](#ref-N)` plassert før punktum. `Artikkel.astro` injiserer fargekoda merke i køyretid frå `data-`-attributta, så denne ankerforma er berande.

## Kjeldebruk og referansar
- **Verifisering:** Ved kvar endring eller nytt innlegg skal alle nye kjelder verifiserast med nettsøk. Peik alltid til spesifikke ressursar, aldri berre landingssider.
- **IEEE-stil:** Bruk IEEE-referansestil. Kvart inline-sitat skal ha eit tilsvarande span, og motsett — ingen foreldrelause i nokon retning.

## Giscus
- `mapping="specific"` med artikkelens slug som `term`. **Ikkje** `pathname` — det ville binde kommentartrådane til URL-en og gjere dei foreldrelause ved kvar stiendring.
- Discussions bur i **dette** repoet (kategorien Announcements). Flytta hit i august 2026; det gamle Blog-repoet hadde ingen trådar, så ingenting gjekk tapt.
- `strict="1"` — slugar som `palantir-frankrike-...` og `palantir-moderniteten-...` deler ord, og GitHub si fuzzy-søking kunne elles blande trådane.
- Giscus har inga norsk omsetjing; `lang="en"`.

## Språkvask — sjekk alltid
- **Terminologi:** 'atomvåpen' → 'kjernefysiske våpen', 'oppmerksomhet' → 'merksemd'.
- **Kløyvd infinitiv:** Korte verb endar på -a (`vera`, `gjera`), lange på -e (`analysere`).
- **Bokmålssnik:** Unngå `første` (→ `fyrste`), `blei` (→ `vart`), `noen` (→ `nokon`).
- **Schema:** Bruk `publisertDato` og `oppdatertDato` (valfri) i frontmatter.
- **Filnamn:** små bokstavar, bindestrek, `ø→o`, `å→a`, `æ→e`. Under ~55 teikn.

## Antispam og robot-kontroll
- **Kontaktinfo:** E-post og telefon er Base64-koda i `Kontakt.tsx`. Aldri legg ut i klartekst.
- **AI-sperre:** `public/robots.txt` blokkerer GPTBot, CCBot m.fl.

## Content Security Policy
Sett som `<meta http-equiv>` i `Grunnoppsett.astro`. Tre ting er load-bearing:
- `frame-src https://giscus.app` — kommentar-iframen
- `'wasm-unsafe-eval'` — Pagefind er WebAssembly
- `font-src https://fonts.gstatic.com` — Google Fonts
- **`connect-src https://gateway.umami.is`** — Umami lastar skriptet frå
  `cloud.umami.is`, men sender målingane til `gateway.umami.is`. Har du berre
  `cloud` i `connect-src`, lastar skriptet fint og statistikken forsvinn i
  stillheit. Denne feilen stod i CV-en frå april til august 2026.

## Viktig mandat
**Hugs å oppdatere denne fila (CLAUDE.md), README.md og gemini.md kvar gong det vert gjort endringar i arkitektur, teknisk stack eller viktige funksjonar.**

## Git og Deploy
- Push til `master` trigger auto-deploy via GitHub Actions.
- Statiske filer ligg i `public/`. Ikkje bruk kopisteg i workflowen — lokale bygg skal vere identiske med CI.
