# Gemini Kontekst: Portefølje og blogg

## Kommunikasjonsmodus
- **Caveman lite:** Terse, nynorsk med kløyvd infinitiv.

## Viktig mandat
**Oppdater alltid denne fila, `CLAUDE.md` og `README.md` ved kvar endring i prosjektet.**
Fullstendige husreglar, arkitekturval og kjend gjeld står i `CLAUDE.md` (les den alltid fyrst; ikkje dupliser tabellane her så dei driv frå kvarandre). Metoden for research og skriving av nye artiklar ligg i `.claude/skills/kjeldeartikkel/SKILL.md`.

## Prosjektspesifikke instruksar
- **Arkitektur:** Astro 7 + React Islands + Nano Stores. CV på rota, blogg under `/blog/`.
- **Node:** 22.23.4 eller nyare, som kravd av Astro og byggjesteget i GitHub Actions.
- **Ruting:** `BASE_URL` er tom streng. Bruk `BLOGG_BASE` frå `src/utils/rutar.ts`. Alle interne blogg- og tag-lenkjer skal ha avsluttande skråstrek (`/`).
- **Header og meny:** `Header.tsx` og `Grunnoppsett.astro` viser bloggnavigasjonen under `/blog/` og `/om/`, og CV-navigasjonen på `/`.
- **Styling:** Felles stilar (`.container`, `.artikkel-liste`, `.artikkel-kort`, mørkmodus med både `html[data-theme="dark"]` og `prefers-color-scheme: dark`) ligg i `src/styles/global.css`.
- **Hydration:** Bruk `mounted` state i React-komponentar som les `localStorage` eller `spraakStore` for å unngå hydration error (#418).
- **Navigering:** Bruk `astro:page-load` på modulnivå for å re-initialisere animasjonar og i18n utan å duplisere event-lyttarar.
- **Artiklar:** Feature-format, 2500–4000 ord, 7–9 `##`-seksjonar, obligatorisk kjeldekritikk-matrise (`A–D` / `1–3`). Ingen tankestrek (`—`) i nye nynorsktekstar. Lesetid vert rekna ut i `src/utils/tekst.ts`.
- **Omsetjingar:** Nynorsk fyrst. Engelsk versjon er ei eiga fil i `src/content/blog/en/` med same slug, `sprak: en` og `omsetjing: <nynorskslug>` i begge filene.
- **Kontroll og CSP:** `npm run build` køyrer `npm run sjekk` (`scripts/sjekk-artiklar.mjs`), `astro build`, `scripts/csp-hashar.mjs` og `pagefind`.

## Verifisering
- Sjekk mot `CLAUDE.md` sine språkvask-reglar og `.claude/skills/kjeldeartikkel/SKILL.md` ved artikkelskriving.
- Unngå bokmål: `videregående` (-> `vidaregåande`), `mulighet` (-> `moglegheit`), `første` (-> `fyrste`), `blei` (-> `vart`), `noen` (-> `nokon`).
- Kvart inline-sitat `[\[N\]](#ref-N)` skal ha ein tilsvarande `<span id="ref-N" data-kvalitet="X" data-habilitet="Y">XY</span>`, og motsett. Ingen foreldrelause.
