# hawk-on — Blogg
Sist oppdatert: 28. april 2026.

Analysar av politikk, økonomi og teknologi frå eit strukturalistisk perspektiv.

## Teknisk Stack
- **Framework:** Astro 6.x (Content Layer)
- **Søk:** Pagefind
- **UI:** React 19 (Islands)
- **Kommentarar:** Giscus
- **Språk:** Nynorsk (kløyvd infinitiv)

## Viktig mandat
Dokumentasjonen (README.md, CLAUDE.md, gemini.md) skal alltid oppdaterast ved tekniske eller arkitektoniske endringar.

## Kome i gang
```bash
npm install
npm run build   # Bygger nettstad og køyrer pagefind-indeksering
```

## Nyaste artiklar
- **2026-04-27:** *Oljefondet: Frå finansiell fiksjon til geopolitisk slegge* (Sosiologisk økonomi og teknofeudalisme).
- **2026-04-24:** *Renteauke er feil medisin:* Analyse av Norges Bank sin pengepolitikk og behovet for prisstyring.
- **2026-04-23:** *FMA-korrupsjon:* Blindsoner i forsvarssektoren.

## Struktur
- `src/content.config.ts`: Konfigurasjon for innhaldssamlingar.
- `src/content/blog/`: Markdown-filer for analysar.
- `src/pages/index.astro`: Landingsside med søk og artikkel-liste.
- `src/pages/siste-innlegg.json.ts`: JSON-feed for integrasjon med portefølje.
