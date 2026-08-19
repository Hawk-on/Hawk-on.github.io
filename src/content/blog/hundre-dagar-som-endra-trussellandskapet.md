---
tittel: "Hundre dagar som endra trussellandskapet"
publisertDato: "2026-04-17"
ingress: "Eit kvartal med supply chain-åtak, statsaktørar og eit hastemøte mellom finansdepartementet og Wall Street. Ein gjennomgang av kva som eigentleg har skjedd, og kvifor det angår alle som byggjer programvare."
tags: ["cybersikkerheit", "supply-chain", "infosec", "osint", "ai", "geopolitikk"]
lesetid: 15
---

Fyrste kvartal av 2026 har produsert ein serie av cyberhendingar som kvar for seg ville dominert nyhendebiletet i ei veke om dei hadde landa i 2017. Samla sett utgjer dei eit mønster som få har skrive om i samanheng. Eg har brukt den siste tida til å lese meg gjennom primærkjelder — forensic-rapportar frå Google Threat Intelligence Group, Microsoft, Wiz og Snyk, kongressbrev referert av Bloomberg, skipsdata frå Lloyd's List, satellittbilete frå Vantor, og vidare — for å sjå om det finst ein raud tråd. Det gjer det, og han er meir uroande enn sensasjonell.

Dette er eit forsøk på å samle det eg har funne. Nokre av hendingane vil vere kjende for den som følgjer infosec-feltet tett. Andre har glidd under radaren trass i omfanget. Det eg prøver å vise er ikkje at éin ting er katastrofal, men at mange ting på kort tid peikar same veg.

## Oppsummering av hendingane

La meg byrje med det konkrete, for etterpå å snakke om kva det betyr.

**Supply chain-angrep mot AI-infrastruktur.** 27. mars publiserte ei gruppe som kallar seg TeamPCP to vondsinna versjonar av LiteLLM — eit open source Python-bibliotek som sit i om lag 36 prosent av alle cloud-miljø og har 95 millionar nedlastingar i månaden — til PyPI. Pakkane var tilgjengelege i om lag 40 minutt før dei vart oppdaga og fjerna. Men det var nok. Mercor, eit tre år gammalt AI-rekruteringsselskap verdsett til 10 milliardar dollar, som leverer treningsdata til OpenAI, Anthropic, Meta og Google, var eitt av tusenvis av selskap som lasta ned den kompromitterte pakka. Resultatet: utpressingsgruppa Lapsus$ kom seg gjennom Mercor si TailScale VPN og henta ut om lag fire terabyte data — 939 GB kjeldekode, ein 211 GB brukardatabase, og tre terabyte med videoopptak og passdokument frå kontraktørar. Meta har pausa alt arbeid med Mercor. Søksmål er reiste. Garry Tan i Y Combinator har uttalt at det som potensielt no er tilgjengeleg for utanlandske aktørar representerer «milliardar og atter milliardar i verdi og eit stort nasjonalt tryggingsproblem».

Fire dagar seinare, natt til 31. mars, vart det same mønsteret repetert mot JavaScript-økosystemet. Nord-koreanske statsaktørar kjende som UNC1069 (Google) og Sapphire Sleet (Microsoft) kompromitterte NPM-kontoen til Jason Saayman, hovudvedlikehaldaren for Axios — eit HTTP-bibliotek som har om lag 100 millionar nedlastingar *per veke* og er til stades i om lag 80 prosent av alle cloud- og kodemiljø. Åtaket brukte ein subtil teknikk: angriparane endra ikkje ei einaste linje i Axios sin kjeldekode, men la til ei ny avhengnad, `plain-crypto-js`, som installerte ein cross-platform RAT (Remote Access Trojan) gjennom NPMs postinstall-hook. Kompromitterte versjonar var tilgjengelege i om lag tre timar før dei vart fjerna. Wiz reknar med at tre prosent av alle Axios-brukarar dreiv npm install i det vindauget [\[1\]](#ref-1).

**Det som braut kontinentale infrastruktursjikt.** Stryker, medisinteknikkgiganten, fekk 200 000 einingar sletta på tvers av 79 land. APT Iran — ei gruppe med koplingar til den breiare Handala-klynga — hevdar å ha eksfiltrert 375 terabyte frå Lockheed Martin, inkludert delar av F-35-konstruksjonsteikningar, og listar datasettet for 598 millionar dollar på dark web. Påstanden er uverifisert av Lockheed og ingen tryggingsforskar har bekrefta prøvedata, men gruppa har samtidig doksa 28 seniortekniske ingeniørar og sendt trugsmål direkte til dei og familiane deira. FBI-direktør Kash Patel fekk privat Gmail-innboks dumpa offentleg av Iran-tilknytte Handala Hack Team.

Og vidare: FBI sitt eige wiretap-nettverk — Digital Collection System Network, som inneheld data frå rettsgodkjende avlyttingar, pen register-metadata og informasjon om etterforskingsmål — vart kompromittert via ein kommersiell ISP-leverandør. Bloomberg siterte eit DoJ-brev til Kongressen som klassifiserte det som «major incident» etter FISMA [\[2\]](#ref-2). Salt Typhoon, den kinesiske MSS-tilknytte gruppa som i 2024 kompromitterte AT&T, Verizon og eit titals andre teleselskap, er mistenkt.

**Scattered LAPSUS$ Hunters — eit tidsskille [\[3\]](#ref-3).** I august 2025 slo tre av dei mest berykta finansielt motiverte kriminalgruppene på planeten — ShinyHunters, Scattered Spider og LAPSUS$ — seg saman til ein koalisjon. Dei stal 1,5 milliardar postar frå over 1000 Salesforce-tenantar, inkludert Google, Cisco, Adidas, Qantas, heile LVMH-familien (Louis Vuitton, Dior, Chanel), LastPass, Okta, AMD, Snowflake sjølv, Harvard og Pornhub. Cisco sitt private GitHub blei klona. Oracle sin legacy cloud blei knekt opp. Rockstar Games blei ramma gjennom ein SaaS-analyseleverandør dei færraste har høyrt om.

**Og så kom det store møtet.** 7. april samla finansminister Scott Bessent og Fed-sjef Jerome Powell konsernsjefane i USAs største bankar — Citi, Morgan Stanley, Bank of America, Wells Fargo, Goldman Sachs — til eit hastemøte bak lukka dører i finansdepartementet. Tema: Anthropic sin nye AI-modell, Claude Mythos. Modellen har vist seg å kunne finne og lenke saman tidlegare ukjende zero-day-sårbarheiter autonomt — inkludert ein feil i OpenBSD som har gått uoppdaga i 27 år, og ein feil i FFmpeg som overlevde fem millionar automatiserte tryggingstestar utan å bli oppdaga. Anthropic held modellen tilbake frå generell utgjeving og gir han berre til eit avgrensa sett partnarar gjennom initiativet Project Glasswing.

Finansministrar samlar ikkje Wall Street for å informere om programvare-produktlanseringar. Dei gjer det når dei ser systemisk risiko. Det var det som skjedde 7. april.

## Kva er det eigentleg som skjer?

Fire ting er verdt å merke seg når ein ser hendingane i samanheng.

**Supply chain har blitt den føretrukne angrepsvektoren mot AI-stacken.** Trivy, KICS, LiteLLM, Telnyx, Axios — alle kompromitterte i løpet av få veker. Mønsteret er konsistent: angriparar tek kontroll over open source-infrastruktur som nesten ingen reknar som «sin», for å nå tusenvis av organisasjonar i eit einaste slag. Det som gjer AI-stacken spesielt interessant som mål er at ein typisk AI-applikasjon har fleire API-nøklar per komponent enn nesten noko anna i infrastrukturen. LiteLLM er designa for å halde API-nøklar til dusinvis av LLM-leverandørar. Kompromitterer du LiteLLM, får du nøklar til OpenAI, Anthropic, Azure, AWS Bedrock, Mistral — alt i éin operasjon.

**Statsaktørar og kriminelle samarbeider no på ein måte dei ikkje gjorde før.** TeamPCP ser ut til å operere som initial access broker — dei skaffar tilgangen, så overleverer dei til Lapsus$ som tek seg av utpressinga. Dette er ein industrialisering av åtakøkonomien som ikkje liknar den gamle arbeidsdelinga der ransomware-gjengar var separate frå APT-ar.

**AI sine offensive cyber-evner har passert ein terskel.** Det er det som er kjernen i Mythos-møtet. Ein modell som autonomt kan finne 27 år gamle nullsårbarheiter i OpenBSD og deretter kjede dei saman til fungerande exploit, er noko kvalitativt anna enn det forsvararar har stått overfor før. Anthropic sjølv har publisert det i sitt eige tryggingsbrev: «Gitt utviklingstakten, vil det ikkje ta lang tid før slike evner spreier seg, potensielt utanfor aktørar som er forplikta til å bruke dei trygt.» Project Glasswing er eit forsøk på å gje forsvararar eit forsprang. Men forspranget er per definisjon mellombels.

**Den offentlege samtalen står i kontrast til omfanget.** Dette er det som forundrar meg mest. Kvar einskild hending her ville tidlegare dominert nyhendebiletet. No druknar dei i støy. Ein del av forklaringa er geopolitisk — Iran-krigen, Hormuz-blokaden, Scarborough — trekkjer oksygenet. Ein del er at kompleksiteten i desse sakene gjer dei vanskelege å fortelle i 90 sekund. Men resultatet er at offentlegheita står i ein tryggingssituasjon dei ikkje forstår omfanget av.

## Operasjonelle implikasjonar for oss som byggjer system

Dette er den delen som er mest konkret for dei av oss som sit med hendene i Kubernetes, Azure DevOps, og GitOps-pipelines. La meg vere praktisk.

**Pinn avhengnadene dine, og bruk npm ci / uv sync med lockfile.** `npm install` utan committed lockfile, eller `pip install` mot flytande versjonsintervall, er no ein reell trussel. Om du har CI-pipelines som oppdaterer avhengnader automatisk, må du anten verifisere signatur/provenance eller køyre med `--ignore-scripts`. I Axios-saka var det postinstall-hook-en som detonerte RAT-en; `npm ci --ignore-scripts` ville stoppa det.

**SLSA provenance og Trusted Publisher er ikkje lenger «nice to have».** Det som avslørte Axios-kompromitteringa var at den vondsinna 1.14.1 var publisert via stole CLI-token utan OIDC-binding eller SLSA-attestasjon. Legitime Axios-releaser bruker GitHub Actions med npm sin OIDC Trusted Publisher. Verktøy som kan verifisere dette på install-tidspunkt er i ferd med å bli standardkrav. For organisasjonar som handsamar sensitiv data — og det gjer både helseforvaltninga og utdanningsforvaltninga — bør dette vere på roadmap-en i 2026, ikkje 2027.

**Identity perimeter har erstatta network perimeter.** Ti av dei store innbrota eg har nemnt ovanfor starta med social engineering eller credential theft, ikkje eksploatering av uoppdaterte system. Scattered LAPSUS$ Hunters tek ikkje Salesforce ved å finne ein zero-day; dei tek Salesforce ved å ringe helpdesken og be om passord-reset. OAuth-applikasjonar med overprivilegerte scopes er ein særleg utsett vektor. Når eg jobbar med Entra ID og Workload Identity i Azure-stacken, er det nettopp dette eg tenker på — conditional access policies som faktisk validerer, ikkje berre loggar, og OAuth-apps som får minst mogleg tilgang.

**Utvid trusseldeteksjonen frå nettverk til forsyningskjeda.** Tradisjonell SIEM-overvaking av internt nettverkstrafikk fangar ikkje at LiteLLM 1.82.7 akkurat er installert i eit av dine container image-byggjer. Du treng SBOM-handtering, dependency scanning i CI, og ideelt sett runtime-deteksjon av kjende kompromitterte pakker. Verktøy som Snyk, Wiz og GitHub Dependabot har sine grenser, men dei er i det minste eit utgangspunkt.

**Tenk gjennom kva som skjer om ein SaaS-leverandør du stolar på blir kompromittert.** Collins Aerospace sine MUSE-innsjekkingssystem gjekk ned på tvers av Europa då dei blei ramma. Salesloft-breachen spreidde seg via OAuth-integrasjonar til nesten tusen kundar. Ein realistisk breach-simulering inkluderer ikkje berre «kva om våre system blir kompromitterte», men «kva om ein leverandør med tilgang til våre system blir kompromittert». Det er ikkje eit trøysteleg spørsmål, men det er det rette spørsmålet.

## Den politisk-økonomiske vinkelen

Her er det eg finn mest interessant, og mest uroande.

Dei tekniske faktaene eg har skildra ovanfor skjer ikkje i eit vakuum. Dei skjer i ein epoke der eit lite tal selskap sit på infrastrukturen som resten av økonomien er avhengig av. Mercor sit i data-pipelinen til dei tre største AI-laboratoria samtidig. LiteLLM sit i 36 prosent av cloud-miljø. Axios sit i 80 prosent. Collins Aerospace sit i innsjekkingssystema til kontinentale flyplassar. Salt Typhoon kompromitterte alle dei tre største amerikanske mobiloperatørane gjennom ein felles lawful intercept-infrastruktur som CALEA krev at dei skal ha.

Dette er konsentrasjonsrisiko. Det er ikkje cyber-konsentrasjonsrisiko — det er ei djupare strukturell avhengnad av nokre få leverandørar som marknadsdynamikken i teknologisektoren har gjort uunngåeleg. Varoufakis sitt poeng i *Technofeudalism* om at plattformar har erstatta marknader er relevant her: når du bygger på LiteLLM, bygger du ikkje på ein open standard som du kan byte ut; du byggjer inn ei avhengnad til eit enkelt Y Combinator-støtta selskap med kanskje ti vedlikehaldarar. Om vedlikehaldaren sin NPM-konto blir kompromittert, er heile stacken din kompromittert.

Det er ikkje eit tilfeldig trekk ved systemet. Det er det system gjer når incentiva er å akkumulere pipeline-kontroll i staden for å byggje robuste alternativ. Venture-kapital favoriserer vinnar-tek-alt. Open source-vedlikehaldarar er enkeltindivid utan ressursar til å stå imot statsaktørar. Linux Foundation rapporterte i 2025 at 74 prosent av dei 500 mest kritiske open source-prosjekta har færre enn tre aktive vedlikehaldarar, og 23 prosent er vedlikehaldne av ein einaste person. Vi har bygd global kritisk infrastruktur på ein dugnadsmodell som ikkje kan forsvare seg mot nasjonalstatar.

Mythos-møtet 7. april er symptomatisk på ein annan måte. Det som skjedde der er at styresmaktene i verdas største økonomi handsama utgjevinga av ein AI-modell som ein systemisk risiko på linje med bankkriser. Det er det den typen møte er. Det fortel oss at AI no er klassifisert som infrastruktur av same tyngd som finansmarknadene. Men det fortel oss òg at kapasiteten til å skape den risikoen er konsentrert hos eit fåtal selskap — Anthropic, OpenAI, Google, Meta. Staten forhandlar med dei, ikkje regulerer dei. Sullivan & Cromwell skreiv ein juridisk analyse av møtet der dei noterte at tiltaka Anthropic føreslår er frivillige og at det ikkje finst offentleg ramme for dette.

Det er eit interessant spegelbilete til statleg prissetting på essensielle gode, noko eg er oppteken av i andre samanhengar. Her skjer det motsette: Staten opptrer som formidlar mellom private aktørar, utan offentleg mandat og utan demokratisk innsyn. Den offentlege tryggingsinfrastrukturen blir koordinert gjennom lukka Treasury-møte og Substack-analysar i staden for gjennom NIST-standardar og offentleg lovgjeving. Det er ei form for privatisering av sikkerheit som går langt utover det som er nødvendig — og som byggjer institusjonelle mønster det blir vanskeleg å reversere.

For Noreg betyr dette fleire ting. Vi er eksponerte gjennom dei same supply chains som alle andre. Azure-stacken vi i offentleg sektor byggjer på er ikkje mindre avhengig av LiteLLM og Axios enn private aktørar. Helsenorge, Altinn, og Lånekassen sine system er like utsette for social engineering av helpdesken som Google var. Samtidig har vi ein tradisjon for offentleg eigarskap av kritisk infrastruktur som skil oss frå den amerikanske modellen. NSM har mandatet. Digitaliseringsdirektoratet har kapasiteten. Spørsmålet er om vi brukar det aktivt til å redusere avhengnadsrisiko eller om vi berre kjøper dei same produkta som alle andre.

## Eit ord om kjelder og verifisering

Ein ting eg vil understreke: all informasjon i denne artikkelen kan verifiserast gjennom fleire uavhengige kjelder. Eg har freista å unngå å stola på éin enkelt kjelde for dei spesifikke tala. Scattered LAPSUS$ Hunters sitt 1,5 milliardar-tal er stadfesta av BleepingComputer, Bank Info Security, Push Security og Hackread med ulike framstillingar. Mercor-innbrotet har rapportering i Fortune, Wired, TechCrunch og Strike Graph. Mythos-møtet er dokumentert av Bloomberg, Financial Times, CNBC, NBC News og Sullivan & Cromwell si juridiske analyse.

Påstandane som ikkje er uavhengig verifiserte er merkte som slike — særleg Lockheed Martin-krava frå APT Iran, som korkje Lockheed eller seriøse tryggingsforskarar har stadfesta. Eg føretrekkjer å gjengje både det som er sikkert og det som framleis er usikkert.

Open source intelligence er eit kraftig verktøy, men det har grenser. Det krev disiplin å skilje mellom kva som er dokumentert og kva som er spekulasjon, og det krev å lese primærkjelder i staden for oppsummeringar. For den som vil grave vidare, er Google Threat Intelligence Group sine forensic-rapportar, Microsoft Security Blog, Wiz Research, Snyk Labs og Datadog Security Labs dei stadene eg startar. Bloomberg og Financial Times for regulatoriske rammer. ENISA og NSM for europeiske perspektiv.

## Til slutt

Det eg sit igjen med etter å ha gått gjennom dette, er ei kjensle av at vi er i ein fase der det tekniske, økonomiske og politiske går samtidig i same retning — mot større konsentrasjon, større avhengnad, større sårbarheit, og mindre offentleg innsikt. Cyber er ikkje lenger eit tema for eige fagfelt. Det er noko som går rett inn i korleis samfunnsinfrastruktur fungerer, og som er vårt felles ansvar å forstå.

Det er ein grunn til at nokre av oss sit og les Bloomberg-oppslag om Treasury-møte side om side med Wiz sine forensic-rapportar side om side med Lloyd's List sine maritime data. Trådane heng saman. Dei hundre dagar som har gått har ikkje endra retninga vi går i, men det har gjort retninga tydelegare.

Vi kan framleis endre ho. Men det krev at vi ser ho først.

## Kjelder

<span id="ref-1" data-kvalitet="C" data-habilitet="2"></span>[1] Wiz Research, "Axios Compromised: How UNC1069 and Sapphire Sleet Infiltrated the JS Ecosystem," Wiz Research Blog, Mar. 2026. [Online]. Available: https://www.wiz.io/blog/axios-compromised-plain-crypto-js.
<span id="ref-2" data-kvalitet="B" data-habilitet="2"></span>[2] Bloomberg, "FBI Wiretap Network Compromised in Major Security Incident," Bloomberg Technology, Apr. 2026. [Online]. Available: https://www.bloomberg.com/news/articles/2026-04-07/fbi-wiretap-network-breached.
<span id="ref-3" data-kvalitet="C" data-habilitet="2"></span>[3] BleepingComputer, "Scattered LAPSUS$ Hunters: Coalition of Cybercrime Giants Steals 1.5 Billion Records," BleepingComputer, Aug. 2025. [Online]. Available: https://www.bleepingcomputer.com/news/security/scattered-lapsus-hunters-cybercrime-coalition-breaches-salesforce/.
