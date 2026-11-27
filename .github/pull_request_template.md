## Kva

<!-- Kva PR-en endrar, i éin eller to setningar. -->

## Kvifor

<!-- Grunnen til endringa. For ein artikkel: tesen i éi setning. -->

## Type

<!-- Kryss av det som gjeld. -->

- [ ] Ny artikkel
- [ ] Endring i publisert artikkel
- [ ] Engelsk omsetjing
- [ ] Kode, stil eller bygg
- [ ] Avhengnader eller workflowar
- [ ] Dokumentasjon (CLAUDE.md, README.md, gemini.md)

## Sjekkliste

**Alltid**

- [ ] `npm run sjekk` gjev «ingen nye avvik»
- [ ] `npm run build` går gjennom
- [ ] Grunnlinja i `scripts/kjende-avvik.json` er ikkje skriven på nytt for å gjere eit nytt avvik stille

**Artiklar** (stryk om det ikkje gjeld)

- [ ] Alle nye kjelder er kontrollerte med nettsøk og peikar på spesifikke ressursar, ikkje landingssider
- [ ] Kjeldegranskaren er køyrd, og kvart funn er retta eller grunngjeve under «Merknader»
- [ ] Hovudargumentet kviler på A-kjelder; B, C og D er grunngjevne i teksten der dei blir brukte
- [ ] Interesser er skrivne fram i brødteksten, og eigne bindingar er opplyste der dei er relevante
- [ ] Motargumenta har eigen seksjon
- [ ] `publisertDato` er datoen artikkelen faktisk går ut
- [ ] Ved endring i publisert artikkel: `oppdatertDato` og `### Endringslogg` følgjer kvarandre
- [ ] Tospråkleg: `sprak` og `omsetjing` står i begge filene, og `npm run kjelder -- <slug>` er køyrd etter siste endring i kjeldelista
- [ ] Serietabellen i CLAUDE.md er oppdatert om artikkelen er del av serien

**Kode og arkitektur** (stryk om det ikkje gjeld)

- [ ] CLAUDE.md, README.md og gemini.md er oppdaterte ved endringar i arkitektur, stack eller viktige funksjonar
- [ ] Nye GitHub Actions er pinna til commit-SHA med versjonen i kommentar
- [ ] Ny tredjepartsressurs: CSP-en i `Grunnoppsett.astro` er vurdert

## Merknader

<!-- Det som ikkje er kontrollert, avgjerder som står opne, eller ting den som flettar må vite. -->
