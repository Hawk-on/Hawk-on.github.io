# Prosjektkontekst: Blogg

## Om bloggen
Personleg blogg for Håkon Hole Lønning. Analyserer geopolitikk og teknologi.
Språk: Nynorsk med kløyvd infinitiv.

## Teknisk stack
- **Framework:** Astro 6.x (Content Layer API)
- **Søk:** Pagefind (statisk indeksering)
- **Kommentarar:** Giscus (React Island med dynamisk tema)
- **UI:** Statisk HTML + React Islands
- **Deploy:** GitHub Pages (Node 22)

## Viktig mandat
**Hugs å oppdatere denne fila (CLAUDE.md), README.md og gemini.md kvar gong det vert gjort endringar i arkitektur, teknisk stack eller viktige funksjonar.**

## Kjeldekritikk-system (Obligatorisk)
Alle artiklar skal bruka den to-dimensjonale kjelde-matrisa. Systemet er no fullt implementert i alle innlegg (per 28. april 2026).
- **Kvalitet (A-D):** A: Institusjonell/Forskning, B: Kvalitetsmedia, C: OSINT/Teknisk, D: Ustadfesta/Lekkasje.
- **Habilitet (1-3):** 1: Uavhengig, 2: Interessepart/Bias, 3: Partisisk/Statskontrollert.
- **Markering:** Bruk `<span id="ref-N" data-kvalitet="X" data-habilitet="Y">XY</span>[N] Kjeldetekst...` nedst i artikkelen.

## Kjeldebruk og referansar
- **Verifisering:** Ved kvar endring eller nytt innlegg, skal alle nye kjelder verifiserast via `google_web_search`. Peik alltid til spesifikke ressursar, aldri berre landingssider.
- **IEEE-stil:** Bruk IEEE-referansestil for alle kjelder. Legg til inline-sitat [N] og den spesifikke span-taggen over.

## Språkvask — sjekk alltid
- **Terminologi:** 'atomvåpen' -> 'kjernefysiske våpen', 'oppmerksomhet' -> 'merksemd'.
- **Kløyvd infinitiv:** Korte verb endar på -a (`vera`, `gjera`), lange på -e (`analysere`).
- **Schema:** Bruk `publisertDato` og `oppdatertDato` (valfri) i frontmatter.
- **Bokmålssnik:** Unngå `første` (-> `fyrste`), `blei` (-> `vart`), `noen` (-> `nokon`).

## Git og Deploy
- Push til `master` trigger auto-deploy.
- Bruk `;` som separator i PowerShell.
