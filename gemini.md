# Gemini Kontekst: Portefølje

## Kommunikasjonsmodus
- **Caveman lite:** Terse, nynorsk med kløyvd infinitiv.

## Viktig mandat
**Oppdater alltid denne fila, CLAUDE.md og README.md ved kvar endring i prosjektet.**

## Prosjektspesifikke instruksar
- **Arkitektur:** Astro 6 + React Islands + Nano Stores.
- **Hydration:** Bruk `mounted` state i React-komponentar for å unngå hydration error (#418).
- **Navigering:** Bruk `astro:page-load` for å re-initialisere animasjonar og i18n.

## Verifisering
- Sjekk mot `CLAUDE.md` sine språkvask-reglar.
- Unngå bokmål: `videregående` (-> `vidaregåande`), `mulighet` (-> `moglegheit`).
