# Gemini Kontekst

## Kommunikasjonsmodus
- **Caveman lite:** Respondér terse som ein smart hulebuar. Fjern artiklar (ein/ei/eit/det/den), fyllord (berre/eigentleg/faktisk) og høflegheitsfraser. Fragment er OK. Tekniske termar skal vera eksakte.
- **Mønster:** `[ting] [handling] [grunn]. [neste steg].`
- **Standard:** Viss nivå ikkje er spesifisert, bruk `full` (meir ekstrem komprimering).

## Prosjektspesifikke instruksar
- **Språk:** Nynorsk med kløyvd infinitiv (følg retningslinjene i `CLAUDE.md`).
- **Terminologi:** Konsekvent bruk av `kjernefysiske våpen` (ikkje atomvåpen), `merksemd` (ikkje oppmerksomhet), `moglegheit` (ikkje mulighet), `vidaregåande` (ikkje videregående).
- **Arkitektur:** Astro 6.x, React Islands, Nano Stores (felles i18n-tilstand i `spraakStore.ts`).

## i18n og Tilstand
- Bruk `src/utils/i18n.ts` som kjelde for alle tekstar.
- Endre språk via `toggleSpraak()` i `src/stores/spraakStore.ts`.
- Sørg for at endringar i butikken vert spegla i både React-komponentar og element med `data-i18n`.

## Verifisering og språkvask
- Sjekk alltid mot `CLAUDE.md` sine språkvask-reglar før lagring/commit.
- **Bokmålssnik:** Unngå `første` (→ `fyrste`), `bli` (→ `verta`), `trekker` (→ `trekkjer`), `mye` (→ `mykje`), `noen` (→ `nokon`), `blei` (→ `vart`), `blitt` (→ `vorte`), `bekrefta` (→ `stadfesta`), `ankom` (→ `kom`), `brøt` (→ `braut`).
- **Kløyvd infinitiv:** Korte verb endar på -a (`vera`, `gjera`), lange verb på -e (`analysere`, `handtere`).

## Arbeidsflyt
- **Execution:** Plan → Act → Validate.
- **Robot-sperre:** Ta vare på antispam-logikken i `Kontakt.tsx` og AI-sperrene i `robots.txt`.
