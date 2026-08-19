# Glasswing blogginnlegg — Implementasjonsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Skrive eit grundig blogginnlegg (~15 min lesetid) om Project Glasswing og post-kvantum-kryptografi til bloggen på `hawk-on/Blog`.

**Architecture:** Éi ny Markdown-fil i `src/pages/` med Astro-frontmatter, sju seksjonar, nynorsk med kløyvd infinitiv, analytisk/strukturalistisk tone.

**Tech Stack:** Astro 4.x, Markdown, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-04-15-glasswing-blogginnlegg-design.md`

---

### Task 1: Opprett fil med frontmatter og skjelettstruktur

**Files:**
- Create: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Opprett fila med frontmatter og tomme seksjonar**

```markdown
---
layout: ../layouts/Artikkel.astro
tittel: "Det digitale grunnfjellet sprekk: AI, kvantedata og slutten på kryptografisk tryggleik"
dato: "2026-04-15"
ingress: "Project Glasswing og Google sitt kvantestudie er ikkje berre to nyhendesaker frå april 2026. Dei er symptom på to parallelle strukturelle skifte som saman utfordrar heile infrastrukturen digital tryggleik er bygd på."
tags: ["teknologi", "kryptografi", "AI", "sikkerheit", "kvantedata"]
lesetid: 15
---

## [OPNING — placeholder]

## LLM-skiftet i sårbarheitsforsking

## Project Glasswing i detalj

## Det kvantemessige grunnfjellet

## Post-kvantumet — er me der?

## Dei to skifta sett saman

## Kva no

## Ordliste
```

- [ ] **Steg 2: Stadfest at Astro les fila utan feil**

Køyr: `npm run dev` i `C:\Utvikling\Git\Anna utvikling\Blog`
Forvent: Sida er tilgjengeleg og viser tittel utan kompileringsfeil.

---

### Task 2: Skriv opning og seksjon 1 — LLM-skiftet

**Files:**
- Modify: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Erstatt opning-placeholder med ferdig tekst**

```markdown
Det er noko påfallande over at to av dei mest omtala teknologinyheitene i april 2026 handlar om det same — men frå kvar sin kant.

Den eine: Anthropic kunngjorde Project Glasswing den 7. april. Eit AI-system basert på ein ikkje-offentleg modell dei kallar Claude Mythos Preview hadde på nokre veker funne tusenvis av tidlegare ukjende sårbarheiter — zero-days — i alle store operativsystem og nettlesarar. Ikkje ei sårbarheit her og der. Tusenvis.

Den andre: Google publiserte i mars ei oppdatert kvitbok som viser at asymmetrisk 256-bit elliptisk kurve-kryptografi — den same kryptografien som vernar Bitcoin-lommebøker, TLS-tilkoplingar og digitale signaturer — kan knekjast av ein kvantedatamaskin med under 500 000 fysiske qubits. Det er ein 20 gongar reduksjon frå tidlegare estimat. Eit mål som plutseleg ser mykje nærare ut.

Kvar for seg er dette viktige nyheiter. Sett saman er dei noko meir: eit signal om at to strukturelle skifte i digital tryggleik konvergerer samstundes — og at arkitekturen me har bygd den digitale infrastrukturen på, byrjar å sprekke.
```

- [ ] **Steg 2: Skriv seksjon om LLM-skiftet**

```markdown
## LLM-skiftet i sårbarheitsforsking

I fleire tiår har sårbarheitsforsking vore eit handverk. Røynde penetrasjonstesterar gjekk gjennom kode linje for linje, dokumentasjon side for side, og fann feil gjennom ein kombinasjon av erfaring, intuisjon og tid. Det var ein tilnærming som skalerte dårleg: det fanst rett og slett for mykje kode, for mange system og for få kvalifiserte forskarar.

Store språkmodellar har byrja å endre dette — gradvis fyrst, og no raskare.

Utviklinga gjekk gjennom fleire fasar. I den fyrste fasen vart LLM-ar nytta som avanserte kodelesehjelpemiddel: ein forskar kunne spørje ein modell om kva ein funksjon gjorde, og få eit brukbart svar. I den andre fasen kom integrasjon med statiske analyseverktøy, der modellar vart brukt til å tolke og prioritere funn. I den tredje fasen — den me no er inne i — byrjar modellane å gjennomføre heile sårbarheitssøk autonomt, med minimal menneskeleg involvering.

Det er ikkje berre fart og skala som endrar seg. Det er òg *kva slags* feil som vert funne. Tradisjonelle statiske analyseverktøy er gode på kjente mønster — bufferoverflyt av typar som allereie er dokumentert, SQL-injeksjonar på standardformer. LLM-ar kan i prinsippet identifisere *korleis* fleire isolerte veikskapar i ulike delar av eit system samverkar til ein utnyttbar sårbarheit — noko som krev ei kontekstuell forståing av heile kodebasar som tidlegare berre erfarne menneskelige forskarar hadde.

Resultata frå akademisk forsking er so langt varsame med konklusjonane. Ein studie presentert ved ICSE 2026 viser at LLM-basert sårbarheitsfunn er tett knytt til klassiske kodemetrikkfaktorar — kompleksitet, koppling, storleik — og at modellane framleis slit med svært domene-spesifikke og tett integrerte feil. Framgangen har stogga i nokre år, skriv forskarane.

Project Glasswing er noko anna.
```

---

### Task 3: Skriv seksjon 2 — Project Glasswing i detalj

**Files:**
- Modify: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Skriv Glasswing-seksjonen**

```markdown
## Project Glasswing i detalj

Anthropic beskriv sjølv Claude Mythos Preview som «purpose-evaluated» for sårbarheitsfunn — ein modell som ikkje berre har vorte trent på kode, men som er evaluert og tilpassa spesifikt for å finne og beskrive feil i kritisk programvare.

Funna er konkrete og dokumenterte. Blant dei offentleg stadfesta: ein 27 år gammal TCP SACK-feil i OpenBSD, ein 16 år gammal H.264 codec-feil i FFmpeg, ein 17 år gammal FreeBSD NFS-sårbarheit med fjernkøyringspotensiell (CVE-2026-4747), og fleire sårbarheitslenker i Linux-kjernen — alle med fungerande utnyttingskode.

Det er verdt å dvele ved tala. Tjue-sju år. Seksten år. Desse feila har eksistert i produksjonskode gjennom heile den moderne internetteraen. Dei har overlevd utal revisjonar, oppgraderingar og manuelle kodevurderingar. Ein modell fann dei på veker.

Tilgangen til Mythos Preview er strengt avgrensa. Anthropic har samla eit lukka konsortium av over 40 selskap — Amazon, Microsoft, Apple, Google, Linux Foundation, CrowdStrike, Palo Alto Networks og Cisco er blant deltakarane. Ein liten handfull tryggleiksselskap er inkludert. Det brede publikum er ikkje.

Grunngjevinga er eksplisitt: dual-use-risiko. Det same verktøyet som kan finne og tette sårbarheiter kan nyttast til å finne og *utnytte* dei. Anthropic har valt å kontrollere tilgangen framfor å publisere ope — eit val som i seg sjølv fortel noko om kor potent systemet er vurdert til å vere.

Det reiser eit strukturelt spørsmål me kjem attende til: kven bør kontrollere slike verktøy, og kva konsekvensar har det at forsvar og angrep no tilgang til det same instrumentet?
```

---

### Task 4: Skriv seksjon 3 og 4 — Kvantedata og post-kvantum

**Files:**
- Modify: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Skriv kvanteseksjonen med tydeleg distinksjon**

```markdown
## Det kvantemessige grunnfjellet

Her er det naudsynt å stogge opp ved eit vanleg misforståing.

Når media skriv om at kvantedatamaskiner kan «knekke 256-bit kryptering», er det som regel snakk om *asymmetrisk* kryptografi — nærmare bestemt elliptisk kurve-kryptografi (ECC), der 256-bit refererer til nøkkellengda i den elliptiske kurve-diskrete logaritmeproblemet (ECDLP-256). Dette er kryptografien som vernar Bitcoin-transaksjonar, HTTPS-tilkoplingar, digitale signaturer og mykje anna av infrastrukturen til det moderne internett.

*Symmetrisk* kryptografi — som AES-256, den algoritmen som m.a. vert nytta til å kryptere filer og kommunikasjon — er eit anna tilfelle. Grover sin kvantemekaniske algoritme reduserer effektiv sikkerheit frå 256-bit til 128-bit. Det er ein alvorleg degradering, men ikkje ei fullstendig oppheving.

Skilnaden er vesentleg: det er den asymmetriske kryptografien som er *fundamental sårbar* overfor kvantedata, ikkje all kryptering.

Google sin kvitbok frå mars 2026 oppdaterer estimata for kor mange ressursar som trengst for å knekje ECDLP-256. Svaret: under 1 200 logiske qubits og 90 millionar Toffoli-portar — køyrbart på ein superleiar-qubit-datamaskin med under 500 000 fysiske qubits på nokre minutt. Dette representerer ein 20 gongar reduksjon i fysiske qubits samanlikna med tidlegare estimat.

Forskarar frå Caltech og kvantestartup Oratomic publiserte i mars ein separat analyse som konkluderer med at kryptografien i Bitcoin- og Ethereum-lommebøker kan knekjast med så få som 10 000 fysiske qubits — langt under det me i dag kallar NISQ-terskelen (Noisy Intermediate-Scale Quantum).

Google estimerer ein 10 prosent sjanse for at dette er teknisk mogleg innan 2032. Det er ikkje ein presis spådom — det er eit risikoestimat. Men eit risikoestimat frå eit selskap med noko av verdas leiande kvantedatamaskin-forsking bør takast alvorleg.

## Post-kvantumet — er me der?

Svaret er: delvis, og ikkje raskt nok.

NIST (National Institute of Standards and Technology) standardiserte i 2024 tre post-kvantum-kryptografiske algoritmar: CRYSTALS-Kyber for nøkkelutveksling, CRYSTALS-Dilithium for digitale signaturer, og SPHINCS+ som eit alternativ basert på hashfunksjonar. Desse er i prinsippet kvanteresistente — dei er basert på matematiske problem som ikkje vert effektivt løyste av Shor sin algoritme.

Cloudflare kunngjorde i 2026 ein plan om full post-kvantum-sikkerheit for all trafikk gjennom deira nettverk innan 2029. Det er eit ambisiøst mål og eit viktig signal.

Men det store problemet er ikkje dei teknologiselskapa som allereie er i gang med migrasjonen. Det er dei som ikkje er det.

Kritisk infrastruktur — kraftnett, banksystem, helseregister, offentleg kommunikasjon — er i stor grad bygd på kryptografiske standardar frå 1990- og 2000-talet. Migrasjon til post-kvantum-algoritmar krev ikkje berre ei programvareoppdatering; det krev gjennomgang og oppdatering av heile kryptografiske protokollar, nøkkelinfrastruktur og dei mange systema som kommuniserer med kvarandre.

Det mest undervurderte trusselscenarioet er det som vert kalla *«harvest now, decrypt later»*: aktørar — statar og andre — samlar inn kryptert trafikk i dag, med intensjon om å dekryptere han når kvantedatamaskiner er tilgjengelege. Data som er kryptert i dag og som skal vere konfidensielle i ti år, er allereie eit mål. Tidsrommet for å migrere er altså kortare enn folk flest trur.
```

---

### Task 5: Skriv seksjon 5 og 6 — Samanheng og løysingar

**Files:**
- Modify: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Skriv dei to avsluttande seksjonane**

```markdown
## Dei to skifta sett saman

Det er freistande å sjå Glasswing og kvantedatamaskiner som to separate nyheiter frå kvar sin del av teknologilandskapet. Det er ei mislesing.

Glasswing viser at AI-modellar no kan finne ukjende sårbarheiter i produksjonskode — i skala og med ein hastigheit som overtek menneskelege forskarar. Kvanteforskinga viser at den kryptografiske infrastrukturen som vernar dei systema, er på eit tidsspenn for fundamental svekkjing.

Saman skisserer dei eit scenario der angrepsterskelen fell samstundes som det kryptografiske forsvaret svekjest. Det er ikkje ein konspiratorisk kombinasjon — det er to uavhengige teknologiske trender som tilfeldigvis konvergerer i same tidsrom.

Det strukturelle poenget er dette: digital tryggleik har i mange tiår kvilt på ein kombinasjon av kryptografisk vanskelighet (det er matematisk dyrt å bryte kryptering) og menneskelig sårbarheitsforsking (det er tidkrevjande å finne feil). Begge desse antagelsane er under press.

Krypteringa vert ikkje ubrukleg over natta. Sårbarheitsforsking vert heller ikkje fullstendig automatisert over natta. Men trendlinjene er tydelege — og i systemtenking er det trendlinjene, ikkje augneblinksbildet, som avgjer kva ein bør handle på.

## Kva no

Svaret på strukturelle skifte av denne typen er sjeldan éi einskild løysing. Det er eit sett av parallelle tilpassingar — og det er verdt å skilje mellom kva som er teknisk og kva som er politisk.

**Teknisk:**

Migrering til post-kvantum-kryptografi er ikkje eit val, men eit tidsspørsmål. Prioritet bør gjevast til system som handterer data med lang konfidensialitetshorisont: helseregister, finansielle transaksjonar, statlege kommunikasjonssystem. NIST-standardane er på plass — det manglar ikkje standardar, det manglar migrasjonsfart.

For sårbarheitsforsking er opne avsløringsordningar (responsible disclosure) og strukturerte bug bounty-program viktigare enn nokon gong. Project Glasswing demonstrerer at AI-assistert forsking kan finne sårbarheiter som har lege skjult i tiår. Det same verktøyet i feil hender finn dei same feila — og utnyttar dei.

**Politisk og strukturelt:**

Spørsmålet om kven som kontrollerer system som Glasswing er ikkje berre eit tryggleikssprørsmål — det er eit maktspørsmål. Anthropic sitt val om å avgrense tilgang til eit lukka konsortium av 40+ selskap er ein avgjerd med implikasjonar langt utanfor det tekniske. Det er i praksis ein avgjerd om kven som har tilgang til eit av dei kraftigaste sårbarheitsverktøya som nokonsinne er laga.

Det finst eit argument for at dette er ansvarleg: betre at kritiske sårbarheiter vert oppdaga og tetta av eit kontrollert konsortium enn at dei vert funne av ein aktør utan avsløringsintensjon. Det argumentet er ikkje utan meining.

Men det finst òg eit motargument: lukka konsortier reproduserer og forsterkar eksisterande maktstrukturar. Dei 40+ selskapa er i hovudsak store amerikanske teknologiselskap og tryggleiksselskap. Dei representerer ikkje den globale infrastrukturen som Glasswing-funna gjeld.

Post-kvantum-migrasjonen og AI-assistert sårbarheitsfunn er begge globale utfordringar. Dei løysingane som vert valde — kven som koordinerer, kven som har tilgang, kven som set standardar — vil forme digital tryggleik for det neste tiåret. Det er ei avgjerd som fortener meir offentleg debatt enn ho har fått.

---

*Glasswing er eit av dei første klare teikna på at AI-modellar har passert ein terskel i sårbarheitsfunn. Det er ei god nyheit for alle som ynskjer betre programvare — og ei urovekkjande nyheit for alle som har vore avhengige av at feila var for vanskelege å finne.*
```

---

### Task 5b: Skriv ordliste

**Files:**
- Modify: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Erstatt `## Ordliste`-placeholder med ferdig omgrepsliste**

```markdown
## Ordliste

*For deg som ikkje jobbar med dette til dagleg.*

**Zero-day / zero-day sårbarheit**
Ein tidlegare ukjend feil i programvare. Utviklaren har hatt null dagar på å fikse han — derav namnet. Ekstra farleg fordi det ikkje finst nokon oppdatering å installere.

**Sårbarheit**
Ein feil i programvare eller eit system som kan utnyttast til å gjere noko systemet ikkje er meint å tillate — til dømes å få tilgang til data, øydelegge system eller ta kontroll over ein datamaskin.

**LLM (Large Language Model / stor språkmodell)**
Ei AI-modell trent på enorme mengder tekst og kode. Kan generere, analysere og forstå språk og programkode. Claude, GPT-4 og Gemini er eksempel.

**Penetrasjonstest (pentest)**
Ein kontrollert, planlagd simulert åttak på eit system — gjennomført av tryggleiksekspertar — for å finne sårbarheiter *før* faktiske angriparar gjer det.

**Asymmetrisk kryptografi**
Kryptering som brukar eit par av matematisk relaterte nøklar: éin offentleg (alle kan sjå han) og éin privat (berre du har han). Brukt i HTTPS, Bitcoin og e-post-signering. Det er denne typen kryptografi som er sårbar overfor kvantedatamaskiner.

**Symmetrisk kryptografi**
Kryptering der same nøkkel vert brukt til å kryptere og dekryptere. Raskare og meir robust mot kvantedatamaskiner enn asymmetrisk kryptografi. Eksempel: AES-256, brukt til å kryptere filer og diskar.

**Elliptisk kurve-kryptografi (ECC)**
Ein type asymmetrisk kryptografi basert på matematikken til elliptiske kurver. Svært utbreidd i moderne internettprotokoll — inkludert den kryptografien som vernar Bitcoin-lommebøker.

**Kvantedatamaskin**
Ein datamaskin som nyttar kvantemekaniske eigenskapar til å løyse visse typar matematiske problem langt raskare enn klassiske datamaskiner. Ikkje betre til alt — men dramatisk raskare på nokre spesifikke problem, mellom anna dei som moderne kryptografi er bygd på.

**Qubit**
Den grunnleggjande eininga i ein kvantedatamaskin. I motsetnad til ein vanleg bit (0 eller 1) kan ein qubit vere 0 og 1 samstundes — noko som gjer det mogleg å prosessere mange moglegheiter parallelt.

**Post-kvantum-kryptografi**
Kryptografiske algoritmar utforma for å vere sikre *òg* mot kvantedatamaskiner. NIST har no standardisert fleire slike algoritmar, og bransjen er i gang med å migrere.

**Shor sin algoritme**
Ein kvantealgoritme som effektivt løyser dei matematiske problema asymmetrisk kryptografi er bygd på. Om ein kvantedatamaskin er kraftig nok til å køyre han, kan han bryte RSA og ECC.

**Grover sin algoritme**
Ein kvantealgoritme som søkjer raskare enn klassiske datamaskiner, og som halverer den effektive sikkerheita til symmetrisk kryptografi. AES-256 vert effektivt redusert til AES-128 — alvorleg, men ikkje øydeleggjande.

**TLS (Transport Layer Security)**
Protokollen som krypterer trafikk mellom nettlesar og nettsider. Det er TLS som gjev «hengelåsen» i adressefeltet når du besøkjer ei sikker nettside.

**CVE (Common Vulnerabilities and Exposures)**
Eit offentleg register over kjende programvaresårbarheiter. Kvar sårbarheit får eit unikt ID-nummer (t.d. CVE-2026-4747) som gjer det lettare å spore og kommunisere om han.

**NIST**
National Institute of Standards and Technology — det amerikanske standardiseringsinstituttet. Godkjenner mellom anna kryptografistandardar som vert brukt globalt.

**Dual-use**
Teknologi eller kunnskap som kan nyttast til *begge* føremål: anten til å forsvare system eller til å angripe dei. Eit skarpt knivblad er dual-use. Eit sårbarheitsverktøy som Glasswing er dual-use.

**«Harvest now, decrypt later»**
Ein strategi der ein aktør — gjerne ein statleg etterretningsteneste — samlar inn kryptert kommunikasjon i dag, sjølv om han ikkje kan lese han enno. Når kvantedatamaskiner er kraftige nok, kan han dekryptere alt han har lagra. Det betyr at data som er kryptert *no* kan vere i fare — sjølv om trusselen ligg år fram i tid.
```

---

### Task 6: Språkvask og faktasjekk

**Files:**
- Modify: `src/pages/glasswing-og-post-kvantum-kryptografi.md`

- [ ] **Steg 1: Sjekk nynorsk-krav**

Kontroller at heile innlegget brukar:
- Kløyvd infinitiv (a-infinitiv etter lang vokal / e-infinitiv etter kort: «å skrive», «å finna», «å lesa», «å byggje»)
- Nynorsk-former: «ikkje» (ikkje «ikke»), «kva» (ikkje «hva»), «òg» / «også», «me» eller «vi», «vert» (ikkje «blir»), «hjå» (ikkje «hos»), «eit»/«ei»/«ein» (ikkje «et»/«ei»/«en» bokmål-stil)
- Sjekk særleg overgangen mellom seksjonar — det er her bokmål-glidingar gjerne smett inn

- [ ] **Steg 2: Faktasjekk nøkkeltal**

Verifiser desse påstandane mot kjeldene:
- Glasswing lansert 7. april 2026 ✓ (Anthropic.com/glasswing)
- 27-år gammal TCP SACK-feil (OpenBSD) ✓
- 16-år gammal H.264 codec-feil (FFmpeg) ✓
- 17-år gammal FreeBSD NFS RCE (CVE-2026-4747) ✓
- Google: under 500 000 fysiske qubits for ECDLP-256 ✓
- Google: ~20x reduksjon frå tidlegare estimat ✓
- Caltech/Oratomic: ~10 000 qubits for Bitcoin/Ethereum ✓
- Google: 10 % sjanse for Q-Day innan 2032 ✓
- NIST standardiserte CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+ i 2024 ✓

- [ ] **Steg 3: Sjekk lesetid**

Tel ord i den ferdige fila. Om lag 1800–2200 ord tilsvarer 15 min lesetid (ved 130–150 ord/min for analytisk tekst). Juster `lesetid`-feltet i frontmatter om naudsynt.

---

### Task 7: Commit

**Files:**
- `src/pages/glasswing-og-post-kvantum-kryptografi.md`
- `docs/superpowers/specs/2026-04-15-glasswing-blogginnlegg-design.md`
- `docs/superpowers/plans/2026-04-15-glasswing-blogginnlegg.md`

- [ ] **Steg 1: Stage og commit**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog"
git add src/pages/glasswing-og-post-kvantum-kryptografi.md
git add docs/superpowers/specs/2026-04-15-glasswing-blogginnlegg-design.md
git add docs/superpowers/plans/2026-04-15-glasswing-blogginnlegg.md
git commit -m "feat: legg til innlegg om Glasswing og post-kvantum-kryptografi

Grundig analyse (~15 min) av Project Glasswing og Google sitt kvantestudie
som to parallelle strukturelle skifte i digital tryggleik.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

- [ ] **Steg 2: Verifiser commit**

```bash
git log --oneline -3
```

Forvent: Ny commit øvst med rett melding.

---

## Sjølvgjennomgang av planen

**Spec-dekning:**
- ✅ Opning med Glasswing som startpunkt
- ✅ LLM-skiftet i sårbarheitsforsking (skala, hastigheit, farleg/naudsynt)
- ✅ Project Glasswing i detalj (funn, tilgang, dual-use)
- ✅ Distinksjon asymmetrisk vs symmetrisk kryptografi
- ✅ Google mars 2026 kvitbok
- ✅ Post-kvantum-status (NIST, Cloudflare, «harvest now»)
- ✅ Dei to skifta sett saman
- ✅ Løysingsorientert avslutning
- ✅ Ordliste for ikkje-tekniske lesarar
- ✅ Nynorsk-krav og lesetid

**Ingen placeholders att.**
