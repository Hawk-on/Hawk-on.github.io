# Gemini Kontekst: Portefølje og blogg

## Kommunikasjonsmodus
- **Caveman lite:** Terse, nynorsk med kløyvd infinitiv.

## Viktig mandat
**Oppdater alltid denne fila, CLAUDE.md og README.md ved kvar endring i prosjektet.**

## Prosjektspesifikke instruksar
- **Arkitektur:** Astro 7 + React Islands + Nano Stores. CV på rota, blogg under `/blog/`.
- **Ruting:** `BASE_URL` er tom streng. Bruk `BLOGG_BASE` frå `src/utils/rutar.ts`.
- **Hydration:** Bruk `mounted` state i React-komponentar for å unngå hydration error (#418).
- **Navigering:** Bruk `astro:page-load` for å re-initialisere animasjonar og i18n.
- **Artiklar:** feature-format, 2500–4000 ord, obligatorisk kjeldekritikk-matrise. Ingen tankestrek i nye tekstar.

## Verifisering
- Sjekk mot `CLAUDE.md` sine språkvask-reglar.
- Unngå bokmål: `videregående` (-> `vidaregåande`), `mulighet` (-> `moglegheit`).
- Kvart inline-sitat skal ha ein span, og motsett. Ingen foreldrelause.
