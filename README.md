# Håkon Hole Lønning — Portefølje

Personleg portefølje og CV bygd med Astro og React. Integrert med bloggen for automatisk visning av siste essay.

## Teknisk Stack
- **Framework:** Astro 6.x
- **UI:** React 19 (Islands)
- **State:** Nano Stores (Sentral i18n)
- **Språk:** Nynorsk (kløyvd infinitiv)

## Viktig mandat
Dokumentasjonen (README.md, CLAUDE.md, gemini.md) skal alltid oppdaterast ved tekniske eller arkitektoniske endringar.

## Kome i gang
```bash
npm install
npm run build
```

## Struktur
- `src/stores/spraakStore.ts`: Felles tilstand for språkval.
- `src/components/BloggSveip/`: Hentar siste innlegg frå blogg-repoet.
- `src/components/Kontakt/`: Antispam-verna kontaktinformasjon.
