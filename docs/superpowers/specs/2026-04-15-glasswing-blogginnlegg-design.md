# Spec: Blogginnlegg om Project Glasswing og post-kvantum-kryptografi

**Dato:** 2026-04-15
**Status:** Godkjent av brukar

---

## Kontekst

Anthropic lanserte Project Glasswing 7. april 2026 — eit AI-basert sårbarheitsdeteknasjonssystem bygd rundt Claude Mythos Preview, ein ureleasa grensemodell. Samstundes publiserte Google i mars 2026 ei oppdatert kvitbok som viser at asymmetrisk 256-bit elliptisk kurve-kryptografi (ECDLP-256) kan knekjast med under 500 000 fysiske qubits — ein 20x reduksjon frå tidlegare estimat.

Desse to hendingane representerer kvar sin strukturelle trend som saman utfordrar heile infrastrukturen digital tryggleik er bygd på.

---

## Innlegg-metadata

- **Filnamn:** `src/pages/glasswing-og-post-kvantum-kryptografi.md`
- **Tittel:** `Det digitale grunnfjellet sprekk: AI, kvantedata og slutten på kryptografisk tryggleik`
- **Dato:** `2026-04-15`
- **Ingress:** Om Project Glasswing og Google sitt kvantstudie berre er symptom på noko langt større — to parallelle skifte som saman utfordrar heile infrastrukturen digital tryggleik er bygd på.
- **Tags:** `["teknologi", "kryptografi", "AI", "sikkerheit", "kvantedata"]`
- **Lesetid:** `15`
- **Layout:** `../layouts/Artikkel.astro`

---

## Seksjonar

### 1. Opning
Glasswing som inngang. Modellen finn tusenvis av zero-days i alle store OS og nettlesarar på veker. Introduserer dei to parallelle skifta som vert analysert.

### 2. LLM-skiftet i sårbarheitsforsking
- Frå manuelle penetrasjonstester til autonome modellar
- Skala og hastigheit: kva som tidlegare tok månader tek no timar
- Kvifor dette er farleg (låg terskel for angrep) og naudsynt (forsvararar treng same verktøy)

### 3. Project Glasswing i detalj
- Kva er funne: 27-år gammal TCP SACK-feil (OpenBSD), 16-år gammal H.264 codec-feil (FFmpeg), 17-år gammal FreeBSD NFS RCE-bug (CVE-2026-4747), fleire Linux-kjerne-sårbarheitslenker
- Kven har tilgang: lukka konsortium av 40+ selskap (Amazon, Microsoft, Apple, Google, Linux Foundation, CrowdStrike, Palo Alto Networks, Cisco)
- Kvifor Anthropic ikkje slepper det ope: dual-use-risiko

### 4. Det kvantemessige grunnfjellet
- **Viktig distinksjon:** Google-studiet gjeld ECDLP-256 (asymmetrisk ECC, brukt i Bitcoin, TLS, digitale signaturer) — IKKJE symmetrisk AES-256
- AES-256 mot kvantedata: Grover sin algoritme halverer sikkerheita (effektivt AES-128), bryt han ikkje
- Google mars 2026: under 500 000 fysiske qubits og nokre minutt køyretid
- Caltech/Oratomic: Bitcoin-lommebøker kan knekjast med ~10 000 fysiske qubits
- Tidslinje: Google estimerer 10 % sjanse for "Q-Day" innan 2032

### 5. Post-kvantumet — er me der?
- NIST sine nye standardar: CRYSTALS-Kyber (nøkkelutveksling), CRYSTALS-Dilithium (digitale signaturer)
- Cloudflare: full post-kvantum-sikkerheit innan 2029
- Kva som manglar: migrasjonstempoet i kritisk infrastruktur, bankar, offentleg sektor
- "Harvest now, decrypt later"-angrep: kvifor det hastar sjølv om Q-Day er år unna

### 6. Dei to skifta sett saman
- AI demokratiserer angrep: Glasswing kan i teorien ruste opp angreparar like godt som forsvarar
- Kvantedata underminerer forsvar: mykje av kryptografien som vernar infrastruktur i dag vert ugyldig
- Ikkje ein konspiratorisk kombinasjon — to uavhengige krefter som treffer i same tidsrom

### 7. Kva no — strukturelt
- Løysingsorientert avslutning (B+C-hybrid)
- Opne sårbarheitsordningar og ansvarleg avslørings-praksis
- Akselerert post-kvantum-migrering — særleg i offentleg sektor
- Spørsmål om kven som kontrollerer verktøya: Glasswing i lukka konsortium er eitt svar, men ikkje det einaste

---

## Språkkrav
- Nynorsk med kløyvd infinitiv
- Analytisk, ikkje agitatorisk
- Strukturalistisk — system framfor einskildpersonar
- Grundig språkvask før commit

---

## Kjelder å referere
- Anthropic Project Glasswing: https://www.anthropic.com/glasswing
- Google kvantstudie (mars 2026): https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/
- Caltech/Oratomic: https://www.coindesk.com/markets/2026/03/31/quantum-computers-could-break-crypto-wallet-encryption-with-just-10-000-qubits-researchers-say
- Arctic Wolf om Glasswing: https://arcticwolf.com/resources/blog/project-glasswing-marks-a-turning-point-for-cybersecurity/
