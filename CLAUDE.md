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

## Artikkelformat
Blogginnlegga er feature-artiklar, ikkje notisar.
- **Lengd:** 2500–4000 ord for eit fullt innlegg. Kortare notisar kan finnast, men skal vere merkte som det i ingressen.
- **Seksjonar:** 7–9 `##`-seksjonar med reelle mellomtitlar, ikkje «Bakgrunn» og «Konklusjon». Kvar seksjon skal bere eit sjølvstendig ledd i argumentet. Ein seksjon som berre gjentek tesen i nye ord, skal strykast.
- **Kronologi:** minst éin sekvens med datoar som viser korleis noko faktisk gjekk føre seg. Det er dette som skil ein feature frå ein kommentar.
- **Motargument:** skal ha eigen seksjon og byggjast i beste form før det vert svart på. Ikkje eit avsnitt til slutt.
- **Interesser:** skal skrivast fram i brødteksten. Ein leverandør som argumenterer for strengare krav, og ei fagforeining som argumenterer for medlemmene sine, skal identifiserast som det i teksten, ikkje berre kodast i habilitetsfeltet.
- **Ingen fyllsetningar** av typen «dette reiser viktige spørsmål». Kvar setning skal anten bere informasjon eller bere argumentet vidare.

## Artikkelserie under arbeid
Serie om offentleg infrastruktur og teknoføydalisme.

| # | Artikkel | Status |
|---|---|---|
| 1 | **Den dyraste løysinga.** Konseptvalutgreiinga som konkluderte med at statleg sky er for dyrt, og kvifor nyttekostnadsmetoden avgjorde saka før politikken kom til orde. | Planlagt |
| 2 | **Offentleg produsent, privat leverandør.** Noreg lagar språkmodellar gjennom Nasjonalbiblioteket, men driftar dei ikkje som teneste. | Planlagt |
| 3 | **Forbrukaren som avvikla kundekategori.** Minneprodusentane prioriterer datasenter, og forbrukarmarknaden vert ikkje utkonkurrert på pris, men vald bort. | Planlagt |
| 4 | **Kva ein offentleg leverandør faktisk kan løyse.** Tilgang, kvalitet og eigarskap til avkastninga er tre ulike klasseskilje, og ein offentleg leverandør løyser berre eitt. | Planlagt |
| 5 | **Modellen ingen røysta over.** Generalisering av nr. 1: nyttekostnadsanalysen som politisk avgjerdsmekanisme. Føreset at nr. 1 er skriven. | Planlagt |

## Kjeldebruk og referansar
- **Verifisering:** Ved kvar endring eller nytt innlegg skal alle nye kjelder verifiserast med nettsøk. Peik alltid til spesifikke ressursar, aldri berre landingssider.
- **IEEE-stil:** Bruk IEEE-referansestil. Kvart inline-sitat skal ha eit tilsvarande span, og motsett. Ingen foreldrelause i nokon retning.
- **Kvalitet framfor mengd:** kjeldetettleik er ikkje eit tal å nå. Ei solid primærkjelde som ber ein heil seksjon er meir verdt enn fem nyhendesaker om same saka.
- **Hovudargumentet skal kvile på A-kjelder,** helst primærdokument lesaren kan opne sjølv. Bruk B og C der ingen primærkjelde finst, og sei det i teksten når det er slik. D skal grunngjevast i brødteksten, ikkje berre kodast.
- **Ei kjelde skal berre bere det ho faktisk seier.** Ikkje bruk éin referanse som dekning for eit heilt avsnitt der berre fyrste setning står i dokumentet. Manglar det belegg for eit ledd, skal det skrivast at det manglar, eller leddet strykast.

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

## Tankestrek
Tankestrek skal ikkje brukast i nye artiklar. Bruk komma, kolon, parentes eller punktum
i staden, alt etter kva leddet gjer.

**Regelen gjeld framover.** Dei 21 artiklane som brukar tankestrek i dag, skal ikkje endrast.
Ei masseerstatting ville gjeve store diffar utan innhaldsverdi, og risikere å bryte
setningar der streken ber meining.

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

## Kjend gjeld
Kjende avvik, førte opp utan å vere retta. Tala er kontrollerte mot repoet 9. september 2026.

**Kjeldekodar som manglar**
- `agentisk-identitet-og-tilgangskontroll.md`: to spanar (`ref-1`, `ref-2`) manglar `data-kvalitet` og `data-habilitet` heilt.
- `hydrologisk-krigforing-midtausten.md`: éin span manglar dei same kodane.

**Metadata**
- `lesetid` manglar i fire artiklar: `copy-fail-cve-2026-31431-linux-saarbarheit`, `oljefondet-sosiologisk-okonomi-turchin-polanyi`, `renteauk-feil-medisin-og-behovet-for-prisstyring`, `spu-folkemord-klage-kripos-norske-politikarar`. Feltet korrelerer heller ikkje med ordtalet i resten, og bør reknast ut i byggjesteget i staden for å setjast for hand.

**Taggar**
- Case-duplikat som gjev kvar si tag-side: `AI`/`ai`, `Gaza`/`gaza`, `Noreg`/`noreg`.
- Blanda språk: `technology`/`teknologi`, `security`/`sikkerheit`.
- Normaliser i tag-ruta, ikkje i kvar einskild artikkel.

**Filnamn over 55 teikn**
- `den-skjore-iran-usa-vapenkvilaog-kva-som-kan-kollapse-ho.md` (59). Har òg skrivefeil i slug-en: manglande bindestrek i `vapenkvilaog`.
- `gen-z-opproret-og-den-stille-politiske-omveltinga-i-sor.md` (58).
- `kritiske-mineral-og-den-nye-industrielle-rivaliseringa.md` (57).

Å endre eit filnamn endrar URL-en og bryt Giscus-tråden, sidan slugen er `term`. Skal dette
rettast, må det gjerast saman med ein redirect-stubb og omdøyping av Discussion-tråden.

## Git og Deploy
- Push til `master` trigger auto-deploy via GitHub Actions.
- Statiske filer ligg i `public/`. Ikkje bruk kopisteg i workflowen — lokale bygg skal vere identiske med CI.
