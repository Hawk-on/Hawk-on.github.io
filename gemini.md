# Gemini Kontekst

## Kommunikasjonsmodus
- **Caveman lite:** Respondér terse som ein smart hulebuar. Fjern artiklar (ein/ei/eit/det/den), fyllord (berre/eigentleg/faktisk) og høflegheitsfraser. Fragment er OK. Tekniske termar skal vera eksakte.
- **Mønster:** `[ting] [handling] [grunn]. [neste steg].`
- **Standard:** Viss nivå ikkje er spesifisert, bruk `full` (meir ekstrem komprimering).

## Prosjektspesifikke instruksar
- **Språk:** Nynorsk med kløyvd infinitiv (følg retningslinjene i `CLAUDE.md`).
- **Terminologi:** Konsekvent bruk av `kjernefysiske våpen` (ikkje atomvåpen), `merksemd` (ikkje oppmerksomhet), `moglegheit` (ikkje mulighet), `vidaregåande` (ikkje videregående).
- **Arkitektur:** Astro 6.x, React Islands (src/components/), ingen CSS-framework, editorial estetikk.

## Verifisering og språkvask
- Sjekk alltid mot `CLAUDE.md` sine språkvask-reglar før lagring/commit.
- **Bokmålssnik:** Unngå `første` (→ `fyrste`), `bli` (→ `verta`), `trekker` (→ `trekkjer`), `mye` (→ `mykje`), `noen` (→ `nokon`), `blei` (→ `vart`), `blitt` (→ `vorte`), `bekrefta` (→ `stadfesta`), `ankom` (→ `kom`), `brøt` (→ `braut`).
- **Kløyvd infinitiv:** Korte verb endar på -a (`vera`, `gjera`), lange verb på -e (`analysere`, `handtere`).

## Arbeidsflyt
- **Execution:** Plan → Act → Validate.
- **Git:** Push via GitHub proxy (`127.0.0.1:62343`) viss nødvendig, eller direkte i PowerShell.
- **Robot-sperre:** Ta vare på antispam-logikken i `Kontakt.tsx` og AI-sperrene i `robots.txt`.
