# Gemini Kontekst: Blogg

## Kommunikasjonsmodus
- **Caveman lite:** Terse, ingen artiklar eller filler, nynorsk med kløyvd infinitiv.
- **Mønster:** `[ting] [handling] [grunn]. [neste steg].`

## Viktig mandat
**Oppdater alltid denne fila, CLAUDE.md og README.md ved kvar endring i prosjektet.**

## Prosjektspesifikke instruksar
- **Metodisk kjeldevurdering:** Kjelde-matrisa er no fullt implementert i alle artiklar (oppdatert 28. april 2026). Ved kvar ny kjelde, gjer ein aktiv vurdering av Kvalitet (A-D) og Habilitet (1-3) basert på skalaen i `CLAUDE.md`. Deklarer dette alltid i kjelde-lista.
- **Dato-schema:** Alle artiklar skal ha `publisertDato` og `oppdatertDato` (viss endra).
- **Språk:** Nynorsk (kløyvd infinitiv). 'kjernefysiske våpen' konsekvent.
- **Søk:** Bruk `data-pagefind-body` i `Artikkel.astro`.

## Verifisering
- Sjekk mot `CLAUDE.md` sine språkvask-reglar før commit.
- **Kjelde-krav:** Alle lenkjer må vera djupe (ingen landingssider). Verifiser kvar enkelt URL via `google_web_search`.
- Bruk IEEE-stil for kjelder.

## Arbeidsflyt
- **Execution:** Plan → Act → Validate.
- **Git:** Push via GitHub proxy (`127.0.0.1:62343`) eller PowerShell.
