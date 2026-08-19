# Migreringsplan: slå saman Blogg og CV til eitt repo

**Status:** Framlegg, ikkje starta. Krev at Claude GitHub App er installert på `Hawk-on/hawk-on.github.io`.

## Kontekst

Bloggen og CV-en er to Astro-prosjekt i kvart sitt repo, deploya til kvar sin GitHub Pages-instans:

| | Repo | URL | Base |
|---|---|---|---|
| CV | `Hawk-on/hawk-on.github.io` | `hawk-on.github.io/` | ingen |
| Blogg | `Hawk-on/Blog` | `hawk-on.github.io/Blog` | `/Blog` |

Dei deler allereie meir enn dei burde: 13 identiske CSS-variablar i to filer, ein Footer som skil seg berre i tekststrengane, eit identisk tema-bootstrap-script, og ni delte klassenamn i skal-laget. Endrar du `--raud` éin stad, sprikjer sidene utan varsel.

Målet er eitt repo, eitt byggjesteg, eitt design-lag — og at `siste-innlegg.json`-omvegen over nettet blir eit lokalt importkall.

**Dette er ikkje ein liten jobb.** Han rører URL-struktur, kommentarsystem, RSS-abonnentar og to CI-oppsett. Rekkjefølgja under er valt slik at det farlegaste er gjort og verifisert før noko blir irreversibelt.

---

## Steg 0 — Giscus, og kvifor det må gjerast fyrst

Dette er den einaste delen som kan øydeleggja data, og det einaste steget som bør gjerast **no, uavhengig av resten**.

Giscus er i dag konfigurert med `mapping="pathname"`. Det tyder at kvar kommentartråd er ein GitHub Discussion med *pathnamen som tittel* — til dømes `/Blog/ryktet-som-bar-dei-ut-i-vatnet/`. Endrar URL-en seg, leitar Giscus etter ein tråd som ikkje finst, og alle eksisterande kommentarar blir foreldrelause.

**Løysinga er å kopla tråd-nøkkelen frå URL-en før migreringa:**

```astro
mapping="specific"
term={slug}          <!-- t.d. "ryktet-som-bar-dei-ut-i-vatnet" -->
```

Med `specific` er nøkkelen slugen, som ikkje endrar seg når stien gjer det. Etter dette kan URL-ane flyttast fritt, no og seinare.

**Før du byter, sjekk Discussions-fana i `Hawk-on/Blog`:**

- **Tom** — byt fritt, ingenting går tapt. Dette var truleg tilfellet ved feilsøkinga 13. august, men det er du som ser fana.
- **Har trådar** — kvar tråd må døypast om frå `/Blog/<slug>/` til `<slug>` manuelt før byttet. Giscus finn tråden på tittel, så omdøypinga er nok; kommentarane følgjer med.

**Ei felle til:** Discussions bur i `Hawk-on/Blog`. Arkiverer du det repoet etter migreringa, blir Discussions **skrivebeskytta** og ingen kan kommentere meir. To utvegar:

- La `Hawk-on/Blog` liggja uarkivert som rein kommentar-backend, sjølv om koden er flytta ut. Ingen datatap, litt rart å sjå på.
- Peik Giscus mot `Hawk-on/hawk-on.github.io` med ein ny Discussions-kategori. Reinare, men eksisterande trådar blir liggjande att i det gamle repoet.

Anbefaling: behald `Hawk-on/Blog` uarkivert til du veit at trådane er verdt å ta vare på.

---

## Arkitektur: éin Astro-app, ikkje workspaces

For to personlege nettstader er npm workspaces med to appar og eit delt `packages/ui` overkill — det gjev byggjekompleksitet utan å løysa noko som eitt prosjekt ikkje løyser enklare.

Målstruktur i `Hawk-on/hawk-on.github.io`:

```
src/
├── content/blog/*.md          ← flytta uendra frå Blog-repoet
├── content.config.ts          ← flytta uendra
├── layouts/
│   ├── Grunnoppsett.astro     ← éin, slått saman
│   └── Artikkel.astro         ← frå bloggen
├── pages/
│   ├── index.astro            ← CV-en
│   ├── om.astro
│   └── blog/
│       ├── index.astro        ← bloggoversikt
│       ├── [slug].astro
│       ├── tag/[tag].astro
│       └── rss.xml.ts
├── components/                ← unionen av begge
└── styles/global.css          ← éi fil, sjå CSS-seksjonen
```

`base: '/Blog'` fell bort. Bloggsidene ligg under `/blog/` fordi dei ligg i `pages/blog/`, ikkje fordi Astro er konfigurert slik.

---

## Migreringssteg

**1. Giscus-førearbeidet over.** Verifiser at kommentarar framleis fungerer på noverande nettstad før du går vidare.

**2. Flytt innhald og kode.** `src/content/`, `content.config.ts`, `Artikkel.astro` og bloggkomponentane (`ArtikkelListe`, `ArtikkelMeta`, `Innhaldstabell`, `LeseProgresjon`, `Sok`, `GiscusKommentarar`) inn i CV-repoet. Innhaldsfilene sjølve treng ingen endringar.

**3. Rett opp `BASE_URL`.** Sju filer brukar `import.meta.env.BASE_URL`:

```
src/layouts/Grunnoppsett.astro   src/pages/rss.xml.ts
src/layouts/Artikkel.astro       src/pages/404.astro
src/pages/om.astro               src/pages/tag/[tag].astro
src/pages/index.astro
```

Etter flyttinga er `BASE_URL` tom streng. Innfør ein konstant i staden — `const BLOGG_BASE = '/blog'` — og bruk han eksplisitt. Ikkje la `${base}` stå og løysast til tomt; det gjev lenkjer som *ser* rette ut i dev og peikar feil i prod.

**4. Tre hardkoda absoluttlenkjer** må rettast:

- `Grunnoppsett.astro:23` — fallback `'https://hawk-on.github.io/Blog'` → `'https://hawk-on.github.io'`
- `siste-innlegg.json.ts:20` — `.../Blog/${i.id}/` → `/blog/${i.id}/`
- CSP-en sin `img-src` — uendra, same origin

**5. `BloggSveip` blir lokal.** CV-komponenten hentar i dag `siste-innlegg.json` over nettet. I same prosjekt kan han bruka `getCollection('blog')` direkte ved bygg. Behald gjerne JSON-endepunktet ei stund — noko anna kan konsumera det.

**6. Slå saman CSP-ane.** Bloggen sin er strengast (han treng `frame-src giscus.app` og `'wasm-unsafe-eval'`); CV-en sin er ei delmengd. Bruk bloggen sin som utgangspunkt.

**7. Redirects frå gamle URL-ar.** GitHub Pages har ingen serverside-redirects, men Astro kan generere meta-refresh-sider:

```js
redirects: {
  '/Blog/':          '/blog/',
  '/Blog/rss.xml':   '/blog/rss.xml',
  '/Blog/[slug]/':   '/blog/[slug]/',
}
```

**Rekkjefølgja er kritisk her.** Så lenge `Hawk-on/Blog` deployar til Pages, eig det repoet stien `/Blog/` og brukarsida kjem ikkje til. Du må **slå av Pages på Blog-repoet fyrst**, så tek redirect-stubbane frå brukarsida over.

**8. Éin deploy-workflow.** CV-repoet sin workflow er allereie rett etter at kopi-hacket vart fjerna. Legg til Pagefind-steget frå bloggen: `astro build && pagefind --site dist`.

---

## CSS-samanslåinga er den fiklete biten

Ni klassenamn finst i begge filene. Eg sjekka innhaldet, og **tre av dei skil seg**:

| Klasse | Status |
|---|---|
| `.nettstad-header` | identisk |
| `.nettstad-footer` | identisk |
| `.container` | **ulik** |
| `.hopp-til-innhald` | **ulik** |
| `.nettstad-nav` | **ulik** |

Dei tre ulike må avgjerast eksplisitt, ikkje slåast saman på slump. `.container` er den viktigaste: bloggen brukar 720 px for lesbarheit i brødtekst, CV-en har si eiga breidd. Truleg svar er å behalda begge som `.container` (720 px, tekst) og `.container--brei` (960 px), og la CV-sidene bruka den breie.

Dei 13 designvariablane er identiske og kan slåast saman utan tanke. Bloggen sine Pagefind-variablar kjem i tillegg.

---

## Det som brotnar, og kva det kostar

| Brot | Kostnad | Tiltak |
|---|---|---|
| Kommentartrådar | Høg om trådar finst | Steg 0 — `mapping="specific"` fyrst |
| Discussions blir readonly | Total om repoet arkiverast | Ikkje arkiver `Hawk-on/Blog` |
| RSS-abonnentar | Middels | Redirect-stub på `/Blog/rss.xml` |
| Eksterne lenkjer til artiklar | Låg–middels | Redirect-stubbar per slug |
| Søkeindeks | Låg | Pagefind byggjer på nytt |
| Umami-statistikk | Låg | Stibrot i historikken, ikkje datatap |

`data-pagefind-body` står berre på artikkelkroppen, så CV-sida blir ikkje indeksert når Pagefind køyrer over heile `dist`. Det treng ingen endring.

---

## Verifisering

Køyr desse før du slår av Pages på Blog-repoet:

1. `npm run build` — alle sider byggjer, ingen schema-feil
2. Alle ruter svarar 200: `/`, `/blog/`, `/blog/<slug>/`, `/blog/tag/<tag>/`, `/blog/rss.xml`, `/om/`
3. Pagefind-søk gjev treff på ein kjend term
4. Giscus: iframe lastar, og **tråden er den same** som før migreringa — test på ein artikkel med kommentar
5. Merke-injeksjonen (`Artikkel.astro`) fargelegg kjeldesitata
6. Innhaldstabellen genererer, mørk modus held over navigasjon
7. Null CSP-brot, null 4xx i konsollen
8. `BloggSveip` på CV-en viser dei tre siste innlegga
9. Differensialtest av CSP: `giscus.app` blir ramma, eit ukjent domene blir blokkert

## Rullback

Fram til steg 7 er alt reversibelt — `Hawk-on/Blog` deployar framleis og eig `/Blog/`. Punktet utan retur er å slå av Pages der. Ta ein tag på begge repo før det steget.
