---
tittel: "Modellen staten laga og ikkje driftar"
publisertDato: 2026-09-14
ingress: "Noreg har bygd ein nasjonal språkmodell, ei superdatamaskin å trene han på og ein KI-fabrikk å køyre han i. Modellen vart likevel levert som ei nedlasting på ei amerikansk plattform, og knapt to veker seinare kjøpte Nvidia plattforma. Gapet mellom å byggje og å drifte er ikkje teknisk. Det er eit oppdrag ingen har fått."
tags: ["digital-suverenitet", "kunstig-intelligens", "offentleg-sektor", "sprakmodellar", "teknofoydalisme", "noreg"]
lesetid: 13
---

## Landet har maskina

Seksti meter under bakken, i ei nedlagd olivingruve ved Nordfjordeid, står Olivia, den kraftigaste datamaskina i Noreg. Ho kom til bygda i april 2025, vart opna av forskings- og høgare utdanningsminister Sigrun Aasland i juni same år, og er sidan utvida ein gong. Ved lanseringa hadde ho 64 512 AMD-prosessorkjernar og 304 Nvidia GH200-brikker. I februar 2026 kom 144 nye til, slik at talet no er 448 [\[1\]](#ref-1).

Sigma2, som eig og driv maskina, er eit statleg aksjeselskap under Sikt, finansiert over Kunnskapsdepartementet gjennom Forskingsrådet [\[2\]](#ref-2). Den 1. september 2026 gjekk Noreg dessutan inn i LUMI-AI, den nye europeiske KI-maskina, med 20,4 millionar euro. Den norske delen åleine gjev meir reknekraft enn heile Olivia gjer i dag [\[3\]](#ref-3).

Dette er verdt å slå fast tidleg, fordi det fjernar den vanlegaste bortforklaringa. Noreg manglar ikkje reknekraft. Noreg manglar ikkje eigarskap til reknekraft. Og Noreg manglar ikkje ein språkmodell heller.

Det som manglar, er leddet mellom dei.

## Oppdraget, avtalen og lanseringa

Historia har ein ryddig kronologi, og han er verdt å fylgje, fordi kvart steg er eit steg staten faktisk tok.

Regjeringa gav Nasjonalbiblioteket i oppdrag å utvikle språkmodellar på bokmål, nynorsk og samiske språk, og å gjera dei tilgjengelege [\[4\]](#ref-4). Den 5. september 2025 sette Kulturdepartementet av 45 millionar kroner i statsbudsjettet, ikkje til maskinvare, men til opphavsrett: pengane skulle gjera det mogleg for Nasjonalbiblioteket å inngå ein avtale med Kopinor om bruk av norsk avisinnhald i treninga [\[5\]](#ref-5)[\[4\]](#ref-4).

Den 19. desember 2025 vart avtalen signert. Kopinor inngjekk han på vegner av Mediebedriftenes Landsforening og avisene. Staten betaler 45 millionar kroner i året, og journalistar og mediehus får vederlag for at modellar vert trena på materialet deira [\[5\]](#ref-5). Regjeringa omtalte det som verdas fyrste vederlagsavtale av slaget [\[4\]](#ref-4).

Den 26. mai 2026 kunngjorde KI-laben ved Nasjonalbiblioteket Borealis, ein familie instruksjonstrente modellar for bokmål, nynorsk og engelsk [\[6\]](#ref-6). Den 10. august 2026 vart modellane lanserte politisk, frå scena i Nasjonalbiblioteket, med digitaliserings- og forvaltningsminister Karianne Tung, kultur- og likestillingsminister Lubna Jaffery og nasjonalbibliotekar Åse Wetås til stades [\[7\]](#ref-7). Den 21. august kom Borealis 2 [\[8\]](#ref-8).

Eg har lite å utsetje på noko av dette. Vederlagsavtalen er reelt nybrotsarbeid. Å betale rettshavarane for treningsdata, i staden for å skrape fyrst og møte dei i retten etterpå, er det motsette av korleis dei store modellhusa har bore seg åt. Nasjonalbiblioteket skriv sjølv at dei så langt dei veit er fyrste nasjon som gjer eigne modellar trena på lisensiert, opphavsrettsverna materiale fritt tilgjengelege [\[7\]](#ref-7). Så vidt eg kan sjå, stemmer det.

Det er den siste setninga i pressemeldinga som er problemet. Der står det kvar modellane skulle koma: «Språkmodellene vil være tilgjengelige på Huggin Face i løpet av uke 34» [\[7\]](#ref-7).

Det er heile leveransen. Uke 34 var 17. til 23. august.

## Kva «fritt tilgjengeleg» tyder i lisensteksten

Pressemeldinga seier at modellane vert gjorde fritt tilgjengelege og kan takast i bruk av offentleg sektor, forskingsmiljø og næringsliv [\[7\]](#ref-7). Det er sant i den tydinga at du kan lasta dei ned utan å betale. Det er ikkje sant i den tydinga ordet «fri» har i programvaresamanheng, og skilnaden har praktiske fylgjer.

KI-laben deler Borealis i to. Dei fulle modellane, som er trena med avisinnhaldet frå Kopinor-avtalen, kjem under det dei kallar NB-license: ei tilpassing av Apache 2.0 med bruksavgrensingar. Brukarane skal ikkje med vilje bruke modellen til å rekonstruere treningsdata, og dei skal ikkje bruke modellen eller det han produserer til å levere tenester som i hovudsak gjev sluttbrukarar tilgang til dei lisensierte presseprodukta [\[6\]](#ref-6).

Dei avgrensingane er lette å forsvare. Dei fylgjer direkte av avtalen med rettshavarane, og utan dei ville avtalen truleg ikkje vorte inngått. Men dei gjer lisensen til noko anna enn open kjeldekode, og ein leverandør som skal byggje på modellen, må lesa dei nøye.

Dei opne modellane, utan avisinnhaldet, har eit anna vilkår. Dei kjem under Gemma-lisensen [\[6\]](#ref-6).

Gemma-lisensen er skriven av Google. Punkt 4.1 seier at Google når som helst kan oppdatere Gemma, og at brukaren skal gjera rimelege freistnader på å bruke den nyaste versjonen. Punkt 4.5 gjev Google rett til å seia opp avtalen ved brot. Vilkåra gjeld uttrykkjeleg òg for modellavleidingar, medrekna når dei vert tilbydde gjennom ei vertsteneste [\[9\]](#ref-9).

Det tyder at den varianten av den norske nasjonale språkmodellen som er friast å bruke, er den som er underlagd eit amerikansk selskap sine einsidig fastsette vilkår.

## Fundamentet er ikkje norsk

Grunnen står i modellkortet. Borealis 2 startar frå `google/gemma-4-26B-A4B-it`, med vidare førtrening på norske data og instruksjonstrening oppå [\[8\]](#ref-8). Den fyrste Borealis-familien bygde tilsvarande på Gemma 3 [\[6\]](#ref-6).

Noreg eig altså det norske laget. Fundamentet er leigd.

Det er her innvendinga om suverenitet får sitt eigentlege svar, og svaret er meir ubehageleg enn den vanlege versjonen. Faren er ikkje fyrst og fremst at ein privat leverandør skal drifte modellen. Faren er at sjølve vekta er ei avleiing av noko ein hyperskalerar eig, under vilkår han kan endre, og at den norske parten ikkje har nokon annan stad å gå dersom vilkåra vert endra.

Det var heller ikkje uunngåeleg. Språkteknologigruppa ved Universitetet i Oslo slepte NorMistral-11B-thinking 11. desember 2025. Han byggjer på Mistral-Nemo-Base-2407 og er gjeven ut under rein Apache 2.0, kommersiell bruk inkludert [\[10\]](#ref-10). Andre europeiske offentlege modellar har gjort det same: sveitsiske Apertus kom 2. september 2025 under Apache 2.0 i to storleikar [\[11\]](#ref-11), og tyske Teuken-7B frå OpenGPT-X finst i ein Apache 2.0-versjon for kommersiell bruk [\[12\]](#ref-12).

Ein skal vera ærleg om kva valet kosta, og eg kjem attende til det. Gemma 4 er truleg eit betre utgangspunkt enn noko Noreg kunne trena frå grunnen av for 45 millionar i året. Men då er det utgangspunktet ein reell avhengnad, og den bør stå i dokumentasjonen i staden for i ingressen om norsk sjølvråderett.

Ein detalj tyder på at dette ikkje er heilt gjennomarbeidd. Modellkortet for Borealis 2 oppgjev NB-lisensen. Den vedlagde LICENSE-fila i same repositoriet omtalar modellen som ei avleiing av Gemma 3, altså feil generasjon, noko ein norsk lesar påpeikte offentleg. Dette er ein førehandsversjon, og slikt skjer. Men det er den juridiske teksten som fylgjer landets nasjonale språkmodell, og ein etat som skal ta han i bruk, må byggje risikovurderinga si på nett den fila.

## Kanalen staten valde, og kven som kjøpte han

Hugging Face er eit privat selskap i New York, grunnlagt i 2016 [\[13\]](#ref-13). Det er den mest brukte plattforma for opne modellar i verda, og det var eit heilt naturleg val for ein KI-lab som ville nå utviklarar.

Den 3. september 2026 kunngjorde Nvidia at selskapet har gått med på å kjøpe Hugging Face for 12,93 milliardar dollar. Om lag 11,9 milliardar går til aksjonærane, og opp mot ein milliard er sett av til å halde på dei tilsette [\[14\]](#ref-14)[\[15\]](#ref-15). Jensen Huang skreiv i kunngjeringa at plattforma skal halde fram med å vera open for heile økosystemet, og at Nvidia-maskinvare ikkje skal krevjast for å byggje på eller levere gjennom henne [\[14\]](#ref-14).

Eg trur ikkje det er noko gale i den lovnaden. Poenget er kva som skjedde med strukturen, ikkje kva som skjedde med intensjonane.

Knapt to veker før kunngjeringa la Noreg sin nasjonale språkmodell ut på plattforma, i tråd med det som stod i pressemeldinga frå regjeringa. Det selskapet som sel brikkene modellane vert trena og køyrde på, eig no òg den mest brukte distribusjonskanalen for dei. For Noreg tyder det at leveransekanalen for eit nasjonalt kulturpolitisk verkemiddel, finansiert over statsbudsjettet og forhandla fram med norske rettshavarorganisasjonar, no ligg hjå eit selskap i Santa Clara.

Det finst ei setning på modellkortet til Borealis 2 som oppsummerer stoda betre enn eg klarer: «This model isn't deployed by any Inference Provider» [\[8\]](#ref-8).

Ingen driftar han. Der modellen faktisk kan kallast over eit API mot betaling, er det på utanlandske marknadsplassar som Featherless [\[16\]](#ref-16).

## Avstanden mellom ei nedlasting og ei teneste

Karianne Tung sa ved lanseringa at sjukehusa våre, politiet og norske bedrifter no får eit nytt og viktig verktøy [\[7\]](#ref-7).

Tenk på kva som skal til for at eit sjukehus skal bruke ein språkmodell på pasientopplysningar. Det trengst eit endepunkt med ein driftsavtale og ein oppetidsgaranti. Det trengst tilgangsstyring, logging og revisjonsspor. Det trengst ein databehandlaravtale med eit rettssubjekt som kan saksøkjast. Det trengst eit rettsleg grunnlag etter personvernforordninga, ei vurdering etter KI-forordninga, og nokon som held modellen oppdatert og svarer når han sluttar å svare klokka to om natta.

Ei nedlasting er ingen av desse tinga. `ollama run` er ikkje ei sjukehusinnføring. Avstanden mellom vekter på ei nettside og ei teneste ein saksbehandlar kan bruke, er heile den avstanden, og ho vert ikkje mindre av at vektene er gratis.

Her er det viktig å vera presis, for ein del av leddet finst. Sigma2 sin KI-fabrikk tilbyr ei KI-inferensteneste retta mot offentleg sektor med krav til personvernforordninga og norsk datalagring, og ei dedikert inferensteneste der Sigma2 set opp og driftar ein eigen instans med valfri modell og garantert kapasitet. Den siste er merkt som pilotfase [\[17\]](#ref-17). Telenor opna si KI-fabrikk i november 2024, den fyrste i Noreg, med Nvidia-maskinvare i norske datasenter og over 190 modellar klare for utrulling [\[18\]](#ref-18)[\[19\]](#ref-19). Telenor er 53,97 prosent eigd av staten ved Nærings- og fiskeridepartementet [\[20\]](#ref-20).

Kapasiteten manglar altså ikkje, og institusjonane finst. Det som manglar, er at nokon har fått i oppdrag å drifte nett denne modellen som ei teneste nokon kan nå. Oppdraget til Nasjonalbiblioteket var å utvikle modellar og gjera dei tilgjengelege [\[4\]](#ref-4). «Tilgjengeleg» vart tolka som publisert.

Gapet er ikkje eit teknisk gap. Det er eit gap i oppdragsteksten.

## Sveits og Tyskland skreiv drifta inn i oppdraget

To land har gjort det same som Noreg og teke eitt steg til.

Sveits slepte Apertus 2. september 2025, utvikla av EPFL, ETH Zürich og det nasjonale superdatasenteret CSCS, trena på Alps-maskina i Lugano og gjeven ut under Apache 2.0 i 8 og 70 milliardar parametrar [\[11\]](#ref-11). Men dei stoppa ikkje der. Swisscom, som den sveitsiske staten eig 51 prosent av [\[21\]](#ref-21), tok modellen inn på si suverene sveitsiske KI-plattform for bedriftskundar. Og for alle andre sette Public AI Inference Utility opp eit ope endepunkt, med over 115 000 GPU-timar fordelte på tjue klynger i meir enn fem land berre den fyrste månaden [\[11\]](#ref-11).

Tyskland gjorde ein variant av det same. Teuken-7B vart utvikla i OpenGPT-X-konsortiet under Fraunhofer IAIS og IIS, finansiert av det tyske næringsdepartementet og trena på JUWELS-maskina i Jülich [\[12\]](#ref-12). Deutsche Telekom tok modellen frå forsking til marknad og vart fyrste leverandør som tilbaud han kommersielt, integrert i sitt eige Business GPT-produkt [\[22\]](#ref-22).

Mønsteret er verdt å leggje merke til. I begge tilfella er det andre leddet, drifta, teke av eit selskap med sterk nasjonal forankring og tung statleg eigardel. Det er ikkje eit argument for at staten må gjera alt sjølv. Det er eit argument for at nokon må ha fått jobben.

Noreg har Sigma2, heileigd av staten, og Telenor, majoritetseigd av staten. Begge har KI-fabrikkar i drift. Ingen av dei har fått Borealis i oppdrag.

## Kva som skjer når leddet manglar

Konsekvensen er ikkje at ingen brukar KI i norsk forvaltning. Konsekvensen er at dei brukar noko anna.

Skatteetaten ynskjer å ta i bruk kunstig intelligens, men vert bremsa av at Microsoft og Databricks ikkje prioriterer den norske Azure-regionen med dei nyaste KI-tenestene. Etaten vurderer difor å flytte IT-løysingar ut av Noreg for å få tilgang [\[23\]](#ref-23).

Les den setninga ein gong til. Ein norsk etat vurderer å flytte data ut av landet fordi ein amerikansk leverandør si regionale utrullingsplan ikkje passar. Det er ikkje eit suverenitetstap som kjem av eit vedtak. Det er eit suverenitetstap som kjem av eit fråvær: ingen norsk instans tilbaud det etaten trong, då etaten trong det.

Regjeringa sin eigen digitaliseringsstrategi seier at det er behov for ein nasjonal infrastruktur for KI som mellom anna inkluderer tilgang til reknekraft og språkmodellar tilpassa norske og samiske språk, med 2030 som horisont [\[24\]](#ref-24). Digdir fekk i september 2025 i oppdrag å etablere KI Norge, med 30 millionar kroner til etablering, regulatorisk sandkasse og KI-tilsyn [\[25\]](#ref-25).

Måla er der. Reknekrafta er der. Modellen er der. Tilsynet er på veg. Det einaste ingen har sett namn på, er kven som svarer når sjukepleiaren trykkjer send.

## Motargumenta fortener eit svar

**Nasjonalbiblioteket er eit bibliotek, ikkje ein driftsorganisasjon.** Dette er det sterkaste motargumentet, og det er rett. Å drifte eit endepunkt med oppetidsgaranti for sjukehus døgnet rundt ligg utanfor både mandatet og kompetansen til eit nasjonalbibliotek, og det ville vore uklokt å be dei om det. Svaret mitt er ikkje at Nasjonalbiblioteket skulle gjort det. Svaret er at oppdragsteksten skulle namngjeve kven som skulle. Eit oppdrag som endar ved publisering, er eit oppdrag som med vilje stoppar før brukaren.

**Gemma var det rette ingeniørvalet.** Truleg sant. Å trene ein konkurransedyktig grunnmodell frå botnen krev meir pengar og meir tekst enn Noreg har, og mengda norsk tekst i verda er avgrensa på ein måte ingen løyving fiksar. Å byggje oppå ein sterk open base er rasjonelt. Men to ting fylgjer av det. Ein bør slutte å kalle resultatet suverent utan atterhald, og ein bør skrive ned kva ein gjer dersom Google endrar vilkåra. Eg finn ikkje noko slikt exit-scenario i dokumentasjonen.

**Opne vekter er suvereniteten.** Dette er det argumentet eg har mest sympati med. Poenget med opne vekter er nettopp at kven som helst kan køyre dei, at ingen kan ta dei frå deg, og at eit statleg endepunkt ville vore eit nytt sentralt feilpunkt. Kopinor-avtalen gjer dette reelt på ein måte som få andre land har fått til. Men «kven som helst kan køyre han» er ein kapasitet, ikkje ei teneste. Retten til å forgreine er berre verkeleg dersom nokon faktisk driv ei forgreining. Eit sjukehus kan i prinsippet drifte sin eigen modell. I praksis kjøper det ei teneste, og då er spørsmålet berre kven som sel henne.

**Pilotane kjem.** Dei gjer det, og Sigma2 si dedikerte inferensteneste er eit konkret steg [\[17\]](#ref-17). Kritikken min gjeld rekkjefylgja. Modellen vart lansert politisk med to statsrådar i august, og drifta er framleis i pilot. Lanseringa av noko som ikkje kan brukast enno, er ei lansering av eit dokument, ikkje av eit verktøy.

## Eit ledd som manglar eit namn

Det er lett å lese dette som endå ei historie om at Noreg ikkje satsar. Det ville vore feil. Forskingsrådet leverte i 2025 ei konseptvalutgreiing for tungregning som tilrådde investeringar i storleiksordenen 3,4 milliardar kroner [\[26\]](#ref-26). Olivia er bygd. LUMI-AI er kjøpt inn. Vederlagsavtalen er forhandla fram og betalt. Modellen er trena, og han er god.

Staten har altså løyvd pengar til maskiner, til rettar og til utvikling. Alle desse har det til felles at dei er ting med ein pris og ein sluttdato. Ei teneste er noko anna: ein driftskostnad som aldri tek slutt, eit ansvar nokon må bera i det år som kjem, og ein telefon som ringjer.

Det er den kategorien som fell ut. Ikkje fordi nokon var imot, men fordi ho ikkje har ein naturleg eigar i strukturen, og fordi ingen budsjettpost heiter «å svare når nokon spør».

Difor endar det slik det har enda. Vektene til den norske nasjonale språkmodellen ligg to stader. Den eine er inne i eit fjell ved Nordfjordeid, på ei maskin staten eig. Den andre er på ein tenar i New York som Nvidia kjøpte den 3. september.

Berre den eine av dei er vår, og det er ikkje den som svarer når nokon spør.

## Kjelder

<span id="ref-1" data-kvalitet="A" data-habilitet="2">A2</span>\[1\] Sigma2, «Olivia expands: Massive GPU capacity upgrade», 27. februar 2026. [Online]. Available: https://www.sigma2.no/news/2026/olivia-expands-massive-gpu-capacity-upgrade. [Accessed: 14. september 2026]. Sigma2 er operatør for maskina og har eigeninteresse i å framheve kapasiteten; tala er likevel primære.

<span id="ref-2" data-kvalitet="A" data-habilitet="2">A2</span>\[2\] Sigma2, «About us». [Online]. Available: https://www.sigma2.no/about-us. [Accessed: 14. september 2026]. Kjelde til eigarskap og finansiering, opplyst av selskapet sjølv.

<span id="ref-3" data-kvalitet="A" data-habilitet="2">A2</span>\[3\] Sigma2, «Norway joins LUMI-AI, Europe's new AI supercomputer», 1. september 2026. [Online]. Available: https://www.sigma2.no/news/2026/norway-joins-lumi-ai-europes-new-ai-supercomputer. [Accessed: 14. september 2026].

<span id="ref-4" data-kvalitet="A" data-habilitet="2">A2</span>\[4\] Kultur- og likestillingsdepartementet, «Trening på aviser gir betre språkmodellar», regjeringen.no. [Online]. Available: https://www.regjeringen.no/no/aktuelt/trening-pa-aviser-gir-betre-sprakmodellar/id3121019/. [Accessed: 14. september 2026]. Habilitet 2 fordi departementet omtalar si eiga satsing, ikkje fordi framstillinga er uetterretteleg.

<span id="ref-5" data-kvalitet="A" data-habilitet="2">A2</span>\[5\] Nasjonalbiblioteket, «Nasjonalbiblioteket inngår historisk avtale med landets aviser om innhold til kunstig intelligens», 19. desember 2025. [Online]. Available: https://www.nb.no/pressemeldinger/nasjonalbiblioteket-inngar-historisk-avtale-med-landets-aviser-om-innhold-til-kunstig-intelligens/. [Accessed: 14. september 2026]. Kjelde til vederlaget på 45 millionar kroner i året. Nasjonalbiblioteket er part i avtalen.

<span id="ref-6" data-kvalitet="A" data-habilitet="2">A2</span>\[6\] Nasjonalbiblioteket AI-lab, «Borealis: A new family of Norwegian-centric models», 26. mai 2026. [Online]. Available: https://ai.nb.no/borealis/. [Accessed: 14. september 2026]. Primærkjelde til lisensdelinga mellom fulle og opne modellar.

<span id="ref-7" data-kvalitet="A" data-habilitet="2">A2</span>\[7\] Nasjonalbiblioteket, «Nye språkmodeller fra Nasjonalbiblioteket skal styrke KI tilpasset norske forhold», 10. august 2026. [Online]. Available: https://www.nb.no/pressemeldinger/nye-sprakmodeller-fra-nasjonalbiblioteket-skal-styrke-ki-tilpasset-norske-forhold/. [Accessed: 14. september 2026]. Kjelde til lanseringa, til sitatet frå statsråd Tung og til at leveransekanalen er Hugging Face i veke 34.

<span id="ref-8" data-kvalitet="A" data-habilitet="2">A2</span>\[8\] NbAiLab, modellkort for «borealis2-26b-a4b-preview», Hugging Face, 21. august 2026. [Online]. Available: https://huggingface.co/NbAiLab/borealis2-26b-a4b-preview. [Accessed: 14. september 2026]. Primærkjelde til basismodellen `google/gemma-4-26B-A4B-it` og til at ingen inferensleverandør driftar modellen.

<span id="ref-9" data-kvalitet="A" data-habilitet="2">A2</span>\[9\] Google, «Gemma Terms of Use», Google AI for Developers. [Online]. Available: https://ai.google.dev/gemma/terms. [Accessed: 14. september 2026]. Lisensteksten sjølv. Utgjevaren er part, men er samstundes den einaste autoriteten på eigne vilkår.

<span id="ref-10" data-kvalitet="A" data-habilitet="1">A1</span>\[10\] Language Technology Group, Universitetet i Oslo, «Large Language Models for Norwegian», om NorMistral-11B-thinking, 11. desember 2025. [Online]. Available: https://www.mn.uio.no/ifi/english/research/groups/ltg/llms-for-norwegian/. [Accessed: 14. september 2026]. Kjelde til Apache 2.0-lisens og til basismodellen Mistral-Nemo.

<span id="ref-11" data-kvalitet="B" data-habilitet="2">B2</span>\[11\] Public AI Inference Utility, «With love, from Switzerland», om Apertus. [Online]. Available: https://publicai.co/stories/apertus. [Accessed: 14. september 2026]. Habilitet 2 fordi Public AI er offisiell internasjonal distributør for modellen og dermed part i det dei skildrar.

<span id="ref-12" data-kvalitet="A" data-habilitet="2">A2</span>\[12\] Fraunhofer IIS, «Multilingual and open source: OpenGPT-X research project releases large language model». [Online]. Available: https://www.audioblog.iis.fraunhofer.com/open-gptx-llm. [Accessed: 14. september 2026]. Fraunhofer leier konsortiet som utvikla Teuken-7B.

<span id="ref-13" data-kvalitet="C" data-habilitet="1">C1</span>\[13\] Contrary Research, «Hugging Face Business Breakdown & Founding Story». [Online]. Available: https://research.contrary.com/report/hugging-face. [Accessed: 14. september 2026]. Nytta berre til selskapet sitt grunnleggingsår og hovudkontor.

<span id="ref-14" data-kvalitet="A" data-habilitet="2">A2</span>\[14\] J. Huang, «NVIDIA to Acquire Hugging Face», NVIDIA Blog, 3. september 2026. [Online]. Available: https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/. [Accessed: 14. september 2026]. Primærkjelde til kjøpesummen og til lovnaden om vidare openheit. Kjøparen si eiga framstilling.

<span id="ref-15" data-kvalitet="B" data-habilitet="1">B1</span>\[15\] Reuters, «Nvidia bets $13 billion on open AI models with Hugging Face deal», 3. september 2026. [Online]. Available: https://www.reuters.com/business/nvidia-buy-hugging-face-nearly-13-billion-big-bet-open-ai-models-2026-09-03/. [Accessed: 14. september 2026]. Uavhengig stadfesting av fordelinga mellom aksjonærar og tilsette.

<span id="ref-16" data-kvalitet="C" data-habilitet="2">C2</span>\[16\] Featherless, oppføring for «NbAiLab/borealis2-26b-a4b-preview». [Online]. Available: https://featherless.ai/models/NbAiLab/borealis2-26b-a4b-preview. [Accessed: 14. september 2026]. Kommersiell marknadsplass; nytta berre som døme på at modellen vert tilbydd mot betaling av ein utanlandsk aktør.

<span id="ref-17" data-kvalitet="A" data-habilitet="2">A2</span>\[17\] Sigma2, «KI-fabrikken: Norges nasjonale knutepunkt for KI». [Online]. Available: https://www.sigma2.no/nb/ki-fabrikken. [Accessed: 14. september 2026]. Kjelde til at inferenstenesta finst og at den dedikerte varianten er merkt pilotfase.

<span id="ref-18" data-kvalitet="A" data-habilitet="2">A2</span>\[18\] Telenor, «Telenor AI Factory». [Online]. Available: https://www.telenoraifactory.no/. [Accessed: 14. september 2026]. Leverandøren si eiga marknadsføring; nytta til talet på tilgjengelege modellar.

<span id="ref-19" data-kvalitet="B" data-habilitet="1">B1</span>\[19\] Data Center Knowledge, «MWC 2026: Red Hat, Telenor Team Up for Sovereign Norway AI Factory», 3. mars 2026. [Online]. Available: https://www.datacenterknowledge.com/business/mwc-2026-red-hat-telenor-team-up-for-sovereign-norway-ai-factory. [Accessed: 14. september 2026]. Uavhengig omtale av maskinvare og datasenterplassering.

<span id="ref-20" data-kvalitet="A" data-habilitet="1">A1</span>\[20\] Nærings- og fiskeridepartementet, «Telenor ASA», regjeringen.no. [Online]. Available: https://www.regjeringen.no/no/dep/nfd/org/etater-og-virksomheter-under-narings--og-fiskeridepartementet/selskaper/telenor-asa/id2951813/. [Accessed: 14. september 2026]. Kjelde til eigardelen på 53,97 prosent.

<span id="ref-21" data-kvalitet="A" data-habilitet="2">A2</span>\[21\] Swisscom, «Company profile». [Online]. Available: https://www.swisscom.ch/en/about/company.html. [Accessed: 14. september 2026]. Kjelde til at det sveitsiske statsforbundet eig 51 prosent.

<span id="ref-22" data-kvalitet="A" data-habilitet="2">A2</span>\[22\] Deutsche Telekom, «Boost for Digital Sovereignty: Telekom Offers OpenGPT-X Language Model 'Made in Germany'», 12. desember 2024. [Online]. Available: https://www.telekom.com/en/newsroom/latest-updates/media-information/2024/12/boost-for-digital-sovereignty. [Accessed: 14. september 2026]. Selskapet si eiga kunngjering av at det kommersialiserer modellen.

<span id="ref-23" data-kvalitet="B" data-habilitet="1">B1</span>\[23\] digi.no, «Frustrert over «annenrangs» Microsoft Azure i Norge». [Online]. Available: https://www.digi.no/artikler/frustrert-over-annenrangs-microsoft-azure-i-norge/568530. [Accessed: 14. september 2026]. Fagpresse med redaktøransvar; kjelde til at Skatteetaten vurderer å flytte løysingar ut av landet.

<span id="ref-24" data-kvalitet="A" data-habilitet="2">A2</span>\[24\] Digitaliserings- og forvaltningsdepartementet, «Fremtidens digitale Norge», kap. 4.2 «Utnytte mulighetene i kunstig intelligens». [Online]. Available: https://www.regjeringen.no/no/dokumenter/fremtidens-digitale-norge/id3054645/?ch=5. [Accessed: 14. september 2026].

<span id="ref-25" data-kvalitet="A" data-habilitet="2">A2</span>\[25\] Digdir, «Digdir etablerer KI Norge», 18. september 2025. [Online]. Available: https://www.digdir.no/kunstig-intelligens/digdir-etablerer-ki-norge/7412. [Accessed: 14. september 2026]. Kjelde til oppdraget og til løyvinga på 30 millionar kroner.

<span id="ref-26" data-kvalitet="A" data-habilitet="2">A2</span>\[26\] Norges forskningsråd, «Konseptvalgutredning for tungregning», rapport til Kunnskapsdepartementet, 2025. [Online]. Available: https://www.forskningsradet.no/siteassets/publikasjoner/2025/rapport--til-kunnskapsdepartementet---konseptvalgutrtedning-for-tungregning-med-vedlegg-v3.pdf. [Accessed: 14. september 2026]. Forskingsrådet er oppdragstakar og har eigeninteresse i storleiken på løyvinga til forskingsinfrastruktur.
