---
name: kjeldeartikkel
description: Research, verify and write a sourced long-form blog article for this site, optionally in both nynorsk and English. Use when the user asks for a new article, a blog post about a current story, or a source review of an existing one. Covers the research method, verification discipline, plain-language pass and the bilingual structure.
---

# Kjeldeartikkel

Metoden for å skrive ein kjeldebasert artikkel på denne bloggen.

**Formatreglane står i `CLAUDE.md`**, ikkje her. Lengd, seksjonstal, kjeldematrise,
tankestrek, filnamn og språkvask er definerte der, og byggjesteget `npm run sjekk`
handhevar det som lèt seg mekanisere. Les dei før du skriv, og ikkje gjenta dei i
nye dokument. To kopiar av same regel endar alltid med at den eine driv frå den
andre, og at den som vinn, vinn i stillheit.

Denne fila dekkjer det CLAUDE.md ikkje gjer: korleis ein kjem fram til teksten.

## 1. Oppdraget er eit spor, ikkje ei kjelde

Den viktigaste regelen, og den eg har brote.

Får du eit oppdrag med påstandar, tal eller lenkjer i, er alt saman **ustadfesta**
til du har sjekka det sjølv. Ein brukar som skriv «seks gruppesøksmål ifylgje
kvartalsrapporten» har lese det ein stad, og den staden kan vere feil.

- Stadfest kvart tal mot primærdokumentet.
- Lèt det seg ikkje stadfeste, bruk det ikkje. Skriv i teksten at du ikkje fann
  belegg, og kva du fann i staden.
- Lenkjer i oppdraget kan vere daude eller feil. Opne dei.

Det same gjeld det du sjølv skreiv i ein tidlegare artikkel.

## 2. Primærdokument fyrst

Rekkjefylgja er: lovtekst, rettsavgjerd, tilsynsvedtak, selskapet sine eigne
dokument, og **så** omtale av dei.

Avtalar og vilkår finst ofte i fleire språkversjonar som ikkje er like. Hent den
norske og den engelske, og samanlikn. Dei interessante funna ligg i skilnadene.

Wayback Machine når sida er endra. `firecrawl_scrape` når ho er stor; hent ut
klausulane med `grep` eller `python` i staden for å lese 60 000 teikn.

## 3. Negative funn er funn

Det du leita etter og ikkje fann, høyrer ofte heime i teksten.

Døme frå Dexcom-saka: avtalen har eigne landsavsnitt for seks land, og ordet
«Norge» finst ikkje i heile dokumentet. Det var ikkje noko eg leita etter. Det vart
den skarpaste setninga i artikkelen.

Skriv eksplisitt når du ikkje fann norsk dekning, ikkje fann eit tilsynsvedtak,
eller ikkje fann belegg for eit ledd. Fråværet er informasjon.

## 4. Skil mellom det du veit og det du trur

Tolking er lov, og ofte poenget. Men ho skal merkjast i brødteksten, ikkje gøymast
i formuleringa.

Bruk forma: «her går eg over i tolking», så argumentet, så kva du **ikkje** kan slå
fast. Påstå aldri ein skjult motivasjon hjå ein namngjeven person utan belegg.
Strukturen treng ingen intensjon for å vere verdt å skrive om.

## 5. Datoar før årsak

Når to ting skjer og du vil hevde samanheng, set opp kronologien fyrst.

Det avgjer ofte saka åleine. Minneprisane steig frå september 2025 og var varsla i
februar 2026; krigen byrja 28. februar. Dermed var allokeringa etablert før krigen,
og krigen er eit tillegg, ikkje ei forklaring.

Same grep bar Dexcom-artikkelen: domstolen kravde eintydig samtykke i mai 2024, og
dialogen som produserer eintydig samtykke kom i oktober 2026.

## 6. Habilitet handlar om interesse i utfallet

Kvalitetskoden (A–D) gjeld kva slags kjelde det er. Habiliteten (1–3) gjeld om
kjelda har noko å tene på svaret.

- Eit departement som omtalar si eiga satsing er 2, ikkje fordi det lyg, men fordi
  det er part.
- Eit advokatfirma som har reist søksmålet er 2.
- Eit tilsyn eller eit akademisk register er 1.
- Ein lovtekst eller ein lisens er primærkjelde til sin eigen ordlyd, same kven som
  gav han ut.

Skriv grunngjevinga i kjeldenotatet når koden kan overraske.

## 7. Dine eigne bindingar

Skriv dei i chatten, og i teksten når dei er relevante for lesaren.

Gjeld saka selskapet som lagar modellen du er, eit parti brukaren er medlem i,
eller ein organisasjon han høyrer til, så sei det. Vurder ikkje motiva til ein part
du sjølv høyrer til.

## 8. Motargumenta i sterkaste form

Eigen seksjon, aldri eit avsnitt til slutt. Tre til fem innvendingar.

Ei av dei skal vere den som kan gjere deg mest feil, og ho skal byggjast så godt du
klarer før du svarar. Klarer du ikkje å avvise henne, skriv det.

## 9. Klarspråk er eit eige steg

Ikkje noko du gjer medan du skriv. Køyr det som ein runde til slutt.

Mål som er lette å kontrollere:

- Snittsetning under 15 ord.
- Ingen setningar over 32 ord.
- Kvart fagord forklart der det fyrst dukkar opp. Voldgift, gruppesøksmål, fortale,
  rettkomen interesse, ufråvikeleg.
- Aktiv form framfor passiv, verb framfor substantiv.
- Éin tanke per setning.

```bash
# Finn setningane som må delast
python3 -c "
import re,pathlib,sys
b=pathlib.Path(sys.argv[1]).read_text().split('## Kjelder')[0]
t=re.sub(r'\[\\\\\[\d+\\\\\]\]\(#ref-\d+\)|^---[\s\S]*?^---','',b,flags=re.M)
s=[x.strip() for x in re.split(r'(?<=[.!?])\s+',t) if len(x.split())>2 and not x.strip().startswith('#')]
print('snitt:',round(sum(len(x.split()) for x in s)/len(s),1))
for x in s:
    if len(x.split())>32: print(len(x.split()),'|',x[:160])
" src/content/blog/<slug>.md
```

## 10. Tospråkleg, når artikkelen fortener det

Strukturen er to filer, ikkje ei ordliste.

| | |
|---|---|
| Nynorsk | `src/content/blog/<slug>.md`, `sprak: nn` |
| Engelsk | `src/content/blog/en/<slug>.md`, `sprak: en` |
| Kopling | `omsetjing: <slug>` i begge |

Resten går av seg sjølv: ruta `[...slug].astro` finn makkeren, `Header` byter
knappen frå å byte store til å navigere, `<html lang>` og `hreflang` fylgjer med,
og engelsk blir halden utanfor oversikt, RSS og taggsider.

Den engelske er ei **tilpassing**, ikkje ei omsetjing. Forklar EØS, GDPR,
Datatilsynet og norske etatar for lesarar som ikkje kjenner dei. Same struktur,
same kjeldenummerering, så `ref-N` peikar på same kjelde i begge.

## Arbeidsgang

1. Les 2–3 eksisterande artiklar og `CLAUDE.md`.
2. Research. Primærdokument fyrst, deretter omtale.
3. **Legg fram funn og disposisjon. Vent.**
4. Skriv nynorsk ferdig, med merknader i teksten der du er usikker.
5. Klarspråksrunde.
6. `npm run sjekk` til han er grøn.
7. Engelsk tilpassing.
8. `npm run build`, og kontroller at språkbyttet går begge vegar.
9. Ikkje commit eller push utan at det er bede om.
