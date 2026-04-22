# Prosjektkontekst: Portefølje

## Om porteføljen
Personleg portefølje og CV for Håkon Hole Lønning.
Språk: Nynorsk med kløyvd infinitiv.

## Teknisk stack
- Astro 6.x
- React 19 (Islands for Header, Footer, Kontakt)
- Statisk HTML for hovudinnhald (index.astro)
- GitHub Pages via GitHub Actions (Node 22)

## Stilpreferansar
- Editorial estetikk — Playfair Display / Source Serif 4
- CSS-variablar i global.css, ikkje inline styling
- Komponentnamn på norsk (Grunnoppsett, Header, Kontakt osv.)

## Språkvask — sjekk alltid for dårlege omsetjingar
Gå gjennom ferdig tekst og sjekk spesifikt for:
- **Bokmålsformer som sniker seg inn:**
  - Fleirtal: `-ene` på hankjønn (→ `-ane`)
  - Verb i presens: `trekker` (→ `trekkjer`), `bygger` (→ `byggjer`), `følger` (→ `følgjer`)
  - Preteritum/perfektum: `falt` (→ `fall`), `blei` (→ `vart`), `blitt` (→ `vorte`), `bekrefta` (→ `stadfesta`), `ankom` (→ `kom`), `brøt` (→ `braut`)
  - Adjektiv/diverse: `første` (→ `fyrste`), `noen` (→ `nokon`), `mulighet` (→ `moglegheit`), `oppmerksomhet` (→ `merksemd`), `videregående` (→ `vidaregåande`)
- **Kløyvd infinitiv:**
  - Korte verb (monosyllabiske/vanlege): -a ending (`vera`, `gjera`, `koma`, `sova`, `gjennomføra`)
  - Lange verb (polysyllabiske): -e ending (`analysere`, `handtere`, `vurdere`, `invitere`)

## Antispam og Robot-kontroll
- **Kontaktinfo:** E-post og telefon er Base64-koda i `Kontakt.tsx` og vert dekoda dynamisk i klienten. Aldri legg ut e-post i klartekst i HTML.
- **AI-sperre:** `robots.txt` blokkerer aktivt GPTBot, CCBot og andre AI-crawlarar for å verna innhaldet.

## Git og Deploy
- Deploy skjer via GitHub Actions ved push til `master`.
- Brukar Node 22 i CI-miljøet.
- Ved push-feil via proxy (127.0.0.1:62343), sjekk at Claude-appen på mobilen ikkje er i dvale.
