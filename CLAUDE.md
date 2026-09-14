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
| 1 | **Den dyraste løysinga.** Konseptvalutgreiinga som konkluderte med at statleg sky er for dyrt, og kvifor nyttekostnadsmetoden avgjorde saka før politikken kom til orde. | Publisert 9. sept. 2026 |
| 2 | **Modellen staten laga og ikkje driftar.** Noreg lagar språkmodellar gjennom Nasjonalbiblioteket, men ingen har fått i oppdrag å drifte dei som teneste. | Publisert 14. sept. 2026 |
| 3 | **Forbrukaren som avvikla kundekategori.** Minneprodusentane prioriterer datasenter, og forbrukarmarknaden vert ikkje utkonkurrert på pris, men vald bort. | Planlagt |
| 4 | **Kva ein offentleg leverandør faktisk kan løyse.** Tilgang, kvalitet og eigarskap til avkastninga er tre ulike klasseskilje, og ein offentleg leverandør løyser berre eitt. | Planlagt |
| 5 | **Modellen ingen røysta over.** Var tenkt som generalisering av nr. 1, men nr. 1 tok opp i seg Goodhart, enshittification og heile argumentet om nyttekostnadsanalysen som avgjerdsmekanisme. Treng ny vinkel, til dømes fleire KS1-saker der same mekanismen slo ut, elles bør han strykast. | Må omarbeidast |

## Kjeldebruk og referansar
- **Verifisering:** Ved kvar endring eller nytt innlegg skal alle nye kjelder verifiserast med nettsøk. Peik alltid til spesifikke ressursar, aldri berre landingssider.
- **IEEE-stil:** Bruk IEEE-referansestil. Kvart inline-sitat skal ha eit tilsvarande span, og motsett. Ingen foreldrelause i nokon retning.
- **Kvalitet framfor mengd:** kjeldetettleik er ikkje eit tal å nå. Ei solid primærkjelde som ber ein heil seksjon er meir verdt enn fem nyhendesaker om same saka.
- **Hovudargumentet skal kvile på A-kjelder,** helst primærdokument lesaren kan opne sjølv. Bruk B og C der ingen primærkjelde finst, og sei det i teksten når det er slik. D skal grunngjevast i brødteksten, ikkje berre kodast.
- **Ei kjelde skal berre bere det ho faktisk seier.** Ikkje bruk éin referanse som dekning for eit heilt avsnitt der berre fyrste setning står i dokumentet. Manglar det belegg for eit ledd, skal det skrivast at det manglar, eller leddet strykast.

## Taggar
Taggar vert normaliserte i `src/utils/taggar.ts`, ikkje i frontmatter. Skriv taggen
slik du vil i artikkelen; ruta gjer resten.

- **`tagSlug`** gjev URL-forma: små bokstavar, `æ→e`, `ø→o`, `å→a`, berre `[a-z0-9-]`.
- **`SAMANSLÅING`** peikar taggar som tyder det same til éin kanonisk slug
  (`technology→teknologi`, `infosec→sikkerheit`, `kunstig-intelligens→ai`).
- **`VISING`** gjev namnet lesaren ser, for akronym (`ai→AI`), eigennamn
  (`linux→Linux`) og ord der æøå vart folda bort (`okonomi→økonomi`).
- **Gamle adresser held fram med å svare.** `gamleTagStiar` genererer meta-refresh
  frå kvar rå-tagg som ikkje lenger eig si eiga adresse. `/blog/tag/AI/` og
  `/blog/tag/økonomi/` peikar vidare i staden for å gje 404.

Legg du til ein `VISING`-nøkkel, må han vere den **kanoniske slugen**, ikkje rå-taggen.
`næringspolitikk` blir `neringspolitikk`, ikkje `naringspolitikk`; det tok meg ein
runde å oppdage, sidan ein nøkkel som ikkje matchar berre gjer ingenting.

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
- **Lesetid skal ikkje setjast for hand.** `reknaUtLesetid` i `src/utils/tekst.ts` reknar henne ut ved bygging, og feltet finst ikkje lenger i schemaet. Kjeldelista vert halden utanfor rekninga.
- **Filnamn:** små bokstavar, bindestrek, `ø→o`, `å→a`, `æ→e`. Under ~55 teikn.

## Tankestrek
Tankestrek skal ikkje brukast i nye artiklar. Bruk komma, kolon, parentes eller punktum
i staden, alt etter kva leddet gjer.

**Regelen gjeld framover.** Dei 21 artiklane som brukar tankestrek i dag, skal ikkje endrast.
Ei masseerstatting ville gjeve store diffar utan innhaldsverdi, og risikere å bryte
setningar der streken ber meining.

## Tryggleik
Gjennomgang 14. september 2026. Retta same dag: Astro til 7.3.2 (kritisk RCE i
AVIF-optimalisering), fotnote-førehandsvisinga i `Artikkel.astro` bygd med DOM-nodar
i staden for `innerHTML`, JSON-LD-en escapar no `<`, alle GitHub Actions er pinna til
commit-SHA med versjonen i kommentar, og workflowen brukar `npm ci`.

**Om SHA-pinninga.** Flyttbare taggar som `@v4` kan peike på ny kode utan at noko i
repoet endrar seg. SHA-ane er dei `@v4`/`@v3` løyste til 14. september 2026.
Oppgradering krev no ei medviten endring: hent ny SHA, og oppdater kommentaren.
Merk at nyare majorversjonar finst (checkout v7, setup-node v7, configure-pages v6,
upload-pages-artifact v5, deploy-pages v5). Pinninga låser med vilje det som alt var i
bruk; majoroppgradering er ei eiga avgjerd.

**Dependabot** (`.github/dependabot.yml`) held actions og npm-avhengnader oppdaterte,
vekentleg, gruppert til få pull requests. Han oppdaterer SHA-pinningane og
versjonskommentarane automatisk.

**Merk at PR-ar ikkje blir kontrollerte.** `deploy.yml` køyrer berre på push til
`master`, så ein Dependabot-PR viser ingen sjekkar. Vil du ha `npm ci`, `npm run sjekk`
og `npm run build` køyrt på PR-ar, må det ein eigen workflow til uten deploy-steget.

**Framleis ope, medvite:**
- **`script-src 'unsafe-inline'`** opphevar det meste av XSS-vernet i CSP-en. GitHub
  Pages kan ikkje setje HTTP-headarar, så nonce er umogleg, men hashar er farbare.
- **`frame-ancestors` verkar ikkje i `<meta>`-CSP.** Spesifikasjonen ignorerer
  direktivet der, så nettstaden kan rammast inn. Lèt seg ikkje fikse utan headarar.
- **Umami-skriptet lastar utan `integrity`.** Det er den største tredjepartsflata på
  nettstaden.

**Ikkje tryggleik, og skal ikkje forvekslast med det:** Base64-kodinga av kontaktinfo
lurer naive skraparar og ingenting anna. `robots.txt` er ei oppmoding, ikkje ei sperre.

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

## Artikkelkontroll i bygget
`npm run sjekk` (`scripts/sjekk-artiklar.mjs`) kontrollerer artiklane mot husreglane.
Steget køyrer fyrst i `npm run build`, og som eige steg i deploy-workflowen.

Kontrollerte reglar, kjelder: span utan `data-kvalitet`/`data-habilitet`, span utan
synleg kode, synleg kode som ikkje svarar til attributta, kjelder som peikar på
landingssider utan sti, og foreldrelause referansar i begge retningar.

Kontrollerte reglar, frontmatter og form: tittel over 80 teikn (blir kutta i fane og
søkjeresultat), ingress utanfor 120-400 teikn, færre enn 3 eller fleire enn 8 taggar,
`bilete` utan `bileteAlt`, tankestrek og filnamn over 55 teikn.

Kontrollerte reglar, datoar: `oppdatertDato` før `publisertDato`, datoar fram i tid,
endringslogg utan `oppdatertDato`, og `oppdatertDato` utan endringslogg.

**`oppdatertDato` vert ikkje utleidd frå git, og skal ikkje bli det.** Datoen er eit
redaksjonelt signal om at innhaldet er endra, ikkje eit filtidsstempel. Commiten som
fjerna `lesetid` frå frontmatter rørte 23 artikkelfiler utan å endre eit ord; med
git-utleiing ville alle 23 fortalt lesaren at dei var oppdaterte den dagen. Set datoen
for hand når du faktisk endrar innhaldet, og skriv ein `### Endringslogg`-seksjon som
seier kva som er endra. Kontrollen krev at dei to fylgjest åt.

**Skriptet er ein skralle, ikkje ein mur.** Avvika som alt fanst, ligg i
`scripts/kjende-avvik.json` og slepp gjennom. Eit *nytt* avvik feilar bygget. Rettar
du eit gammalt, seier skriptet frå at grunnlinja kan strammast:
`npm run sjekk -- --skriv`. Skriv aldri grunnlinja på nytt for å gjere eit nytt
avvik stille; då mistar kontrollen heile funksjonen sin.

## Kjend gjeld
Kjende avvik, førte opp utan å vere retta. Tala er kontrollerte mot repoet 9. september 2026.

**Kjeldekodar**
Tala under er frå `scripts/kjende-avvik.json`, som er fasiten. Køyr `npm run sjekk`
for gjeldande stoda.

- **Heilt utan kodar:** `agentisk-identitet-og-tilgangskontroll` (2).

Retta 14. september 2026: 51 tomme spanar er fylte ut, 35 spanar i fire artiklar er
falda frå det gamle toespan-formatet, og ein motstridande kode i `narrativkrigen` er
retta.

**Om toespan-formatet,** sidan eg fyrst skildra det feil. Fire artiklar brukte
`<span data-kvalitet="B">B</span><span class="kjelde-badge--habilitet">2</span>`.
Habiliteten mangla ikkje; han låg i ein søskenspan. Men skriptet i `Artikkel.astro`
les berre `data-` frå spanen med `id`, så inline-merket viste halve koden medan
kjeldelista viste heile. Formatet finst ikkje lenger i repoet.

**Filnamn over 55 teikn**
- `den-skjore-iran-usa-vapenkvilaog-kva-som-kan-kollapse-ho.md` (59). Har òg skrivefeil i slug-en: manglande bindestrek i `vapenkvilaog`.
- `gen-z-opproret-og-den-stille-politiske-omveltinga-i-sor.md` (58).
- `kritiske-mineral-og-den-nye-industrielle-rivaliseringa.md` (57).

Å endre eit filnamn endrar URL-en og bryt Giscus-tråden, sidan slugen er `term`. Skal dette
rettast, må det gjerast saman med ein redirect-stubb og omdøyping av Discussion-tråden.

## Git og Deploy
- Push til `master` trigger auto-deploy via GitHub Actions.
- Statiske filer ligg i `public/`. Ikkje bruk kopisteg i workflowen — lokale bygg skal vere identiske med CI.
