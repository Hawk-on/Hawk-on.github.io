---
tittel: "Kven er agenten? Identitet, tilgang og tillit i agentar sin tidsalder"
publisertDato: "2026-04-21"
ingress: "Når ein AI-agent skriv kode, lastar ned avhengnadar og opnar ei fil i Azure Key Vault, gjer han det ikkje som deg — han gjer det som seg sjølv, med ein identitet tildelt av Entra ID og tilgangsrettar du har konfigurert. Dette er ikkje eit teknisk detalj: det er eit spørsmål om makt, ansvar og kontroll i ein infrastruktur der agenten gradvis overtek oppgåver som tidlegare kravde eit menneske."
tags: ["teknologi", "sikkerheit", "AI", "azure", "identitet", "microsoft"]
lesetid: 18
---

Tenk deg dette scenarioet: Du opnar GitHub Copilot Workspace, skriv ein setning om at autentiseringsmodulen treng å handtere token-rotasjon, og trykkjer «Generate». I løpet av dei neste ni minuttane opnar ein agent ein ny branch, les gjennom eksisterande kode i repo-et, hentar koblingsstrengane frå Azure Key Vault, skriv implementasjonen, køyrer testane i ein GitHub Actions-pipeline, og opnar ein Pull Request med ein skildring av kva han har gjort og kvifor. Ingen knapp er trykt. Ingen terminal er opna. Du har drukke kaffi.

Det som nettopp skjedde, er ikkje berre automatisering. Det er noko strukturelt annleis: ein ikkje-menneskeleg aktør har handla på vegner av deg i eit produksjonssystem, med tilgang til hemmelege ressursar, på tvers av fleire tenester, og med evna til å endre kode som skal ut i produksjon. Spørsmåla dette reiser er ikkje primært tekniske. Dei er styringsspørsmål: Kven *er* denne agenten? Kva kan han gjere? Kven er ansvarleg om noko går gale?

Dette er ein analyse av korleis identitets- og tilgangsarkitekturen i Microsoft-stacken handterer — og kvar han enno ikkje handterer — framveksten av slike ikkje-menneskelege aktørar. Microsoft-stacken er hovudlinsa, fordi det er der mesteparten av norsk og europeisk bedriftsinfrastruktur bur. Men problemet er bransjebreitt, og eg kjem til det òg.

Digital infrastruktur er aldri politisk nøytral. Arkitektoniske val fordeler makt. Kven som kan gjere kva, og på kva vilkår, er aldri berre tekniske spørsmål — dei er politiske. Identitetsarkitekturen for AI-agentar er intet unntak.

## I. Agentidentitet — kva det betyr at ein maskin er nokon

### Identitet som teknisk konstruksjon

I Microsoft Entra ID — tenesta som tidlegare heitte Azure Active Directory og som er fundamentet for identitetsstyring i praktisk talt alle Microsoft-baserte organisasjonar — finst det to grunnleggjande typar identitet: *brukaridentitetar* og *arbeidsbelastningsidentitetar* (på engelsk: workload identities).

Brukaridentiteten representerer ein person. Han er knytt til eit namn, ein e-postadresse, ein mobiltelefon for fleirfaktorautentisering. Heile det tradisjonelle tilgangsapparatet — passord, session token, Conditional Access, MFA-krav — er designa rundt føresetnaden om at identiteten tilhøyrer eit menneske som tek val og ber ansvar.

Arbeidsbelastningsidentiteten representerer ein applikasjon, ein teneste, ein pipeline — eller no, ein AI-agent. Han har ikkje ein mobiltelefon. Han kan ikkje trykke «Godkjenn» på ein autentiseringsapp. Han opererer ofte utan eit menneske som observerer kvart steg. Og han kan potensielt handle 24 timar i døgnet, sju dagar i veka, langt raskare enn noko menneske.

Det strukturelle gapet er dette: heile identitets- og tilgangsinfrastrukturen me har bygd dei siste 30 åra er designa for det fyrste tilfellet. Me er no i ferd med å bruke han for det andre.

### Managed Identity — det avgrensa utgangspunktet

Det enklaste og tryggaste identitetsprimitivet Azure tilbyr for ikkje-menneskelege aktørar er *Managed Identity*. Ein Managed Identity er ein identitet som Azure sjølv administrerer — det vil seie at det ikkje finst noko passord eller nøkkel som ein utviklar treng å rotere manuelt. Azure roterer dei underliggjande kryptografiske materialane automatisk.

Det finst to variantar: *system-assigned* (ein identitet som er knytt direkte til ein Azure-ressurs, som ein Azure Function eller ein Container App, og som vert sletta når ressursen vert sletta) og *user-assigned* (ein sjølvstendig identitet som kan koplast til fleire ressursar og handterast uavhengig av einskilde ressursar).

Kvifor er dette eit godt utgangspunkt? Fordi den vanlegaste feilen i tilgangsstyring for applikasjonar er at hemmelegheiter hamnar i kjeldekode, i miljøvariablar, eller i konfigurasjonsfiler som vert sjekka inn i git. Managed Identity eliminerer dette problemet for Azure-til-Azure-kommunikasjon. Ein Azure Function som treng å lese ei hemmelegheit frå Key Vault, treng ikkje eit passord for å autentisere seg mot Key Vault — han spør det lokale IMDS-endepunktet (Instance Metadata Service) om eit token, og Azure leverer det automatisk.

Flyten bak kulissene ser slik ut:

```
Azure Function (med Managed Identity)
  → GET http://169.254.169.254/metadata/identity/oauth2/token
  → Azure Instance Metadata Service
  → Entra ID (validerer at denne ressursen har ein tilknytt identitet)
  → Returnerer eit Bearer-token (JWT)
  → Azure Function brukar token mot Key Vault REST API
  → Key Vault sjekkar om identiteten har rolla "Key Vault Secrets User"
  → Returnerer hemmelegheita
```

Grensa er openbar: Managed Identity fungerer berre for ressursar *innanfor* Azure. Om ein agent treng å autentisere seg mot GitHub, mot ein ekstern API, eller mot eit system utanfor Azure-perimeteren, er Managed Identity ikkje tilstrekkeleg åleine.

### Service Principal og Workload Identity Federation

For meir fleksible scenarium — der agenten treng å handle på tvers av system, på tvers av skyar, eller frå infrastruktur som ikkje bur i Azure — finst det to andre mekanismar: *Service Principal* og *Workload Identity Federation*.

Ein Service Principal er enkelt sagt ein "tenestekonto" for ein applikasjon i Entra ID. Han har ei unik ID, kan få roller og tillatingar på tvers av Azure-ressursar, og autentiserer seg tradisjonelt med anten ei hemmelegheit (client secret) eller eit sertifikat. Service Principal er meir fleksibel enn Managed Identity, men krev at nokon handterer rotering av hemmelegheiter eller sertifikat — noko som er ein vedlikehaldsbelastning og ein potensiell risiko.

*Workload Identity Federation* er det som endrar spelet. Det er ein mekanisme der ein ekstern identitetsleverandør — GitHub Actions, Azure Kubernetes Service, Google Cloud, eller ein annan OIDC-kompatibel leverandør — kan bevise ein identitet til Entra ID utan å distribuere noka hemmelegheit. I staden utvekslar dei eit kortvarig OIDC-token.

Slik ser det ut for ein GitHub Actions-pipeline som autentiserer mot Azure:

```yaml
permissions:
  id-token: write   # Gjev GitHub Actions lov til å be om eit OIDC-token
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

Det som skjer bak kulissene: GitHub Actions ber GitHub sin OIDC-leverandør om eit signert token for denne spesifikke køyringa. Tokenet inneheld claims om kven som trigga køyringa, kva repo det er, kva branch, og kva miljø. Entra ID er konfigurert til å stole på GitHub sin OIDC-leverandør, og verifiserer signaturen. Inga hemmelegheit er distribuert; tokenet er kortvarig og eingangsbruk.

Eit slikt token ser omtrentleg slik ut (forenkla):

```json
{
  "iss": "https://token.actions.githubusercontent.com",
  "sub": "repo:minorg/minrepo:environment:production",
  "aud": "api://AzureADTokenExchange",
  "ref": "refs/heads/main",
  "sha": "abc123...",
  "run_id": "12345678",
  "iat": 1745000000,
  "exp": 1745003600
}
```

`iss` seier kven som har utferda tokenet. `sub` identifiserer eksakt kva kjelde det kjem frå — i dette tilfellet eit spesifikt repo og miljø. `exp` set utløpstida. Entra ID kan konfigurere krav til alle desse felta, slik at berre token frå eit spesifikt repo og ein spesifik branch er gyldige.

Workload Identity Federation er grunnlaget for agentidentitet i CI/CD-pipelines. Ein agent som køyrer i GitHub Actions, er ein identitet i Entra ID — med akkurat dei tilgangsrettane som er konfigurert, og ikkje fleire.

## II. Kodagentar og repo-tilgang

### To modellar for repo-tilgang

Det finst to hovudmodellar for korleis ein kodagent autentiserer seg mot Azure-ressursar:

**Modell A — GitHub-native:** Agenten opererer som ein GitHub Actions-workflow. Autentiseringa skjer via OIDC Workload Identity Federation mellom GitHub og Entra ID. Agenten får eit kortvarig token med dei rollane som er konfigurert for dette repo-et og dette miljøet.

**Modell B — Azure DevOps-native:** Agenten opererer i Azure DevOps Pipelines med ein Service Connection. Microsoft har frå 2023 tilrådd å bruke Workload Identity Federation for Service Connections i staden for lagra hemmelegheiter. Ein sjølvhosta agent som køyrer på ein Azure VM eller Container Instance kan dessutan bruke Managed Identity direkte.

Skiljet er strukturelt viktig. Det er ikkje berre eit teknisk val — det bestemmer kor identitetslinja går, og dermed kven som administrerer tilgangsrettane. Ein GitHub-native agent er knytt til ein Azure AD-applikasjon som er konfigurert av Entra-administratoren. Ein Azure DevOps-native agent er knytt til ein Service Connection som er konfigurert av DevOps-administratoren. Desse er ofte to ulike personar med to ulike perspektiv på tilgangsstyring.

### GitHub Copilot Workspace og kodagentane

GitHub Copilot Workspace er Microsoft sin plattform for agentstyrte kodarbeidsflyttar — der ein agent kan opne, analysere, endre og teste kode basert på ein naturlegspråkleg instruksjon. Den identitetsmessige realiteten i 2026 er at Copilot Workspace-agenten har ein identitet som er avleia av GitHub App-tilgangen som er konfigurert i repo-et. Det vil seie at agenten opererer med dei tilgangane som GitHub App har fått — typisk lese- og skrivetilgang til repo-et, og tilgang til å opne Pull Requests.

Koplinga til Azure og Entra ID kjem når agenten triggar ein GitHub Actions-workflow. Det er der Workload Identity Federation kjem inn. Flyten ser slik ut, steg for steg:

1. Du gjev Copilot Workspace ein instruksjon
2. Agenten analyserer repo-et og lastar ned kontekst
3. Agenten skriv kode og opnar ein Pull Request
4. PR-en triggar ein GitHub Actions-workflow (CI)
5. Workflowen autentiserer seg mot Azure via OIDC
6. Workflowen hentar konfigurasjon frå Key Vault, byggjer og deployer

I steg 5 og 6 er agenten ein Entra ID-identitet med konkrete tilgangsrettar. I steg 1–4 er agenten ein GitHub App med GitHub-definerte tillatingar. Det er ikkje ein saumlaus identitetskjede — det er to separate tillitsdomene som er kopla saman gjennom repo-et.

### Azure DevOps og Managed Identity

Azure DevOps-agentar som køyrer på Azure-infrastruktur kan bruke Managed Identity direkte. Eit sjølvhosta pipeline-agentmiljø på ein Azure VM med ein tilknytt system-assigned Managed Identity kan autentisere mot Key Vault, Azure Container Registry, og andre Azure-ressursar utan noka hemmelegheit i pipeline-konfigurasjonen.

Det er verdt å merkje at mange organisasjonar framleis brukar den eldre modellen med hemmelegheiter lagra i Azure DevOps Service Connections — klient-ID og klient-hemmelegheit frå ein Service Principal, lagra som krypterte variablar i DevOps. Dette er ein potensiell angrepsvektor: om DevOps-miljøet sjølv vert kompromittert, er hemmelegheitene eksponerte. Microsoft sin tilråding frå 2023 er å gå over til Workload Identity Federation for alle nye Service Connections, og å migrere eksisterande. Det er eit konkret tiltak som mange organisasjonar enno ikkje har gjennomført.

### Minste privilegium i repo-kontekst

Det er eit mentalt skifte som krevst her: repo-tilgang er ikkje berre filsystemtilgang. Det er tilgang til produksjonspipelinen, avhengnadene, deploy-nøklane, og i mange tilfelle hemmelegheitene som er referert i pipeline-konfigurasjonane. Å gje ein kodagent "write"-tilgang til eit repo er å gje han ein posisjon i verdikjeda frå kjeldekode til produksjon.

Branch protection rules er den viktigaste kompensasjonsmekanismen. Ein agent bør *aldri* ha lov til å pushe direkte til `main` eller `master`. All kode frå ein agent bør gjennom ein Pull Request som krev godkjenning frå eit menneske — og helst ein med CODEOWNERS-krav slik at dei rette personane vert varsla. Required reviewers hindrar at ein kompromittert agent kan endre produksjonskode utan at nokon ser det.

---

**Kva er det minste ein kodagent treng?**

*Typisk CI/CD-agent:* Lese-tilgang til repo-et. Skrive-tilgang til Package Registry (for å publisere artifaktar). `Key Vault Secrets User` for spesifikke hemmelegheiter han treng. `AcrPush` for Container Registry om han byggjer container-image. Ikkje meir.

*Meir autonom kodagent (Copilot Workspace, AutoGen):* I tillegg skrive-tilgang til repo-et (for å opne PR-ar). Aldri direkte skrivetilgang til `main`. Aldri `Key Vault Secrets Officer`. Aldri eigarrettar på Azure-ressursar.

---

## III. Interne MCP-tenarar som kontekstleverandørar

### Kva er Model Context Protocol?

Model Context Protocol (MCP) er ein open standard som Anthropic publiserte i november 2024, og som raskt vart adoptert av Microsoft, Google, og eit breitt spekter av verktyutviklarar. Det er ein klient-server-protokoll som definerer korleis ein AI-agent (klienten) kan spørje eksterne system (tenarar) om kontekst — dokumentasjon, databaser, API-ar, interne verktøy — og korleis desse systema eksponerer sine kapabilitetar tilbake til agenten.

Skilnaden mellom ein *lokal* MCP-tenar og ein *fjernkontrollert* MCP-tenar er viktig. Ein lokal tenar køyrer på same maskin som agenten (t.d. ein VS Code-utvider som snakkar med ein lokal MCP-prosess) og treng ikkje nettverksautentisering utover operativsystemet. Ein fjernkontrollert tenar er eksponert som eit HTTP-endepunkt over nett — og her kjem tilgangskontrollen inn.

I ein bedriftskontekst betyr "intern MCP-tenar" ein tenar som sit bak bedrifta sin perimeter og gjev AI-agenten tilgang til intern kunnskap: teknisk dokumentasjon, CRM-data, kodebaseanalyse, sikkerheitspolicyar, HR-handbok. Utan autentisering og autorisasjon er dette ein opning mot sensitiv intern informasjon som er langt farlegare enn eit tilfeldig eksponert API.

### Autentisering av agentar mot MCP-tenarar

Det finst tre hovudmønster for korleis ein AI-agent kan autentisere seg mot ein intern MCP-tenar:

**Løysing A — Entra ID-token direkte:** Agenten er ein Managed Identity eller Service Principal i Entra ID. MCP-tenaren er registrert som ein Entra ID-applikasjon med ein eller fleire OAuth 2.0 scopes. Agenten hentar eit Bearer-token via Client Credentials-flyten og presenterer det i Authorization-header mot MCP-tenarens HTTP-endepunkt.

**Løysing B — Azure API Management (APIM) som MCP-gateway:** Dette er Microsoft sin tilrådde arkitektur for å eksponere MCP-tenarar i bedriftskontekst. APIM sit framfor MCP-tenaren og handterer autentisering med Entra ID. Agenten treng berre nå APIM-endepunktet; APIM validerer tokenet, sjekkar autorisasjonsreglar, og vidaresender til rett intern MCP-tenar. APIM gjev dessutan sentral logging, rate limiting, og tilgangsstyring som er vanskeleg å implementere konsistent på kvar einskild MCP-tenar.

```
AI-agent
  → Bearer-token (Entra ID) i Authorization-header
  → Azure API Management
     → Validerer token mot Entra ID
     → Sjekkar tilgangsreglar (policy)
     → Vidaresender til intern MCP-tenar
        → MCP-tenar spør intern datakjelde
        → Returnerer kontekst
  ← Kontekst til agenten
```

**Løysing C — Entra External Identities for multi-tenant:** I scenarium der agenten opererer på tvers av organisasjonsgrenser — t.d. ein ekstern AI-teneste som treng tilgang til ein intern MCP-tenar — kan Entra External Identities brukast for å gje gjestidentitetar avgrensa tilgang. Dette er eit meir avansert mønster som krev grundig planlegging av tilgangsomfang.

### Kvifor MCP-autentisering er eit uløyst problem

MCP-protokollen i sin opphavlege versjon (november 2024) hadde inga innebygd autentiseringsstandard. Det var opp til kvar MCP-tenar-implementasjon å handtere autentisering sjølv. Dette skapte eit fragmentert landskap der ulike MCP-tenarar autentiserte klientar på ulike måtar — eller ikkje autentiserte dei i det heile.

Anthropic publiserte ein autorisasjonsspesifikasjon for MCP (mars 2025) som byggjer på OAuth 2.1 og Dynamic Client Registration. [³](#ref-3) Microsoft sin APIM-integrasjon er eitt konkret svar på dette problemet. Men realiteten i 2026 er at mange MCP-tenarar i bedriftskontekst framleis ikkje har konsistent autentisering — og at det ikkje finst noka universell standard for kva eit gyldig MCP-klientbevis er.

Dette er eit kjent mønster i protokollhistoria: OAuth 1.0 hadde dei same utfordringane med fragmentert implementasjon, og det tok fleire år og OAuth 2.0 før feltet konvergerte. MCP er tidleg i same reisa.

### Konteksttilgang som privilegert tilgang

Det er eit viktig poeng som er lett å gå glipp av: konteksttilgang er privilegert tilgang. Om ein intern MCP-tenar gjev ein agent tilgang til bedrifta si tekniske dokumentasjon, CRM-data, eller prosjektplanar — er risikoen i prinsippet den same som om agenten hadde direkte databasetilgang til dei same dataa. Informasjonen er like sensitiv uavhengig av kva protokoll han kjem gjennom.

Prinsippet om minste privilegium gjeld like fullt for konteksttilgang. Ein kodagent som hjelper med autentiseringsmodulen, treng ikkje tilgang til HR-data eller finansrapportar frå intern MCP-infrastruktur. MCP-tenarar bør implementere per-sesjon scope — det vil seie at kvar agentsesjon berre har tilgang til dei ressursane som er eksplisitt deklarert for den konkrete oppgåva — ikkje global tilgang til alt tenaren eksponerer.

## IV. Avgrensing av tilgang til sensitive ressursar

### Azure Key Vault og RBAC

Azure Key Vault er Microsoft sin teneste for sikker lagring av hemmelegheiter — API-nøklar, databasepassord, TLS-sertifikat, kryptografiske nøklar. For AI-agentar som treng tilgang til hemmelegheiter, er Key Vault heilt sentralt. Spørsmålet er korleis ein styrer kva ein agent har tilgang til.

Den eldre modellen for tilgangsstyring i Key Vault er *Access Policies* — ein per-vault-konfigurasjon der ein identity (brukar, gruppe, eller Service Principal) vert gjeve sett av operasjonar (les, skriv, slett, og så vidare) for hemmelegheiter, nøklar, og sertifikat separat. Dette er framleis i bruk i mange organisasjonar, men Microsoft tilrår no *Azure RBAC* (rollebasert tilgangskontroll) for Key Vault. [¹²](#ref-12)

RBAC-modellen gjev fleire innebygde roller:

- `Key Vault Administrator` — full kontroll, inkludert administrasjon av sjølve tilgangsreglane
- `Key Vault Secrets Officer` — kan lese, skrive og slette hemmelegheiter
- `Key Vault Secrets User` — kan berre lese verdien av hemmelegheiter
- `Key Vault Reader` — kan sjå metadata om hemmelegheiter, men ikkje lese verdiane

For ein AI-agent som treng å hente konfigurasjonsverdiar, er `Key Vault Secrets User` det rette nivået — og ikkje eit einaste hakk høgare. Her er korleis ein gjev ein Managed Identity denne rolla for ein spesifikk Key Vault via Azure CLI:

```bash
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee-object-id <managed-identity-object-id> \
  --assignee-principal-type ServicePrincipal \
  --scope /subscriptions/<sub-id>/resourceGroups/<rg>/providers/Microsoft.KeyVault/vaults/<vault-name>
```

Det er mogleg å gjere scope-et endå meir granulært — ned til ei einskild hemmelegheit — ved å bruke RBAC på hemmelegheitnivå i staden for vault-nivå. For ein CI/CD-agent som berre treng ein database-tilkoplingsstreng, er det rett ting å gjere: gje tilgang til akkurat den hemmelegheita, ikkje til heile Key Vault.

Kvifor er dette viktig? Fordi ein agent med `Key Vault Secrets Officer`-tilgang kan skrive nye hemmelegheiter og overskrive eksisterande. Ein kompromittert agent med denne tilgangen kan injisere ei falsk tilkoplingsstreng som peikar mot ein angriparkontrollert database — og dermed kompromittere all data som passerer gjennom systemet. `Key Vault Secrets User` kan berre lese; han kan ikkje sabotere.

### Conditional Access for Workload Identities

Conditional Access er Microsoft sitt system for å definere vilkår som må vere oppfylte for at ein identitet skal få tilgang til ein ressurs. Tradisjonelt har Conditional Access vore for brukaridentitetar: krev MFA om brukaren loggar inn frå eit ukjend nettverk, blokker tilgang om enheten ikkje er Intune-registrert, og liknande.

Microsoft har no utvida Conditional Access til å gjelde for *workload identities* — Service Principals og Managed Identities. [⁴](#ref-4) Dette gjer det mogleg å definere politikkar som avgrenser kva ein AI-agent kan gjere basert på kontekst:

- Avgrense til spesifikke IP-adresseintervall (agenten kan berre nå ressursar frå kjende sky-utgangspunkt)
- Blokkere tilgang til bestemte ressursar utanfor spesifiserte tidsrom
- Krevje at agenten berre opererer frå spesifikke Azure-regionar

Det finst ei viktig grense: Conditional Access for workload identities krev Entra ID P1 eller P2-lisensiering. Det er ikkje inkludert i gratisversjonen av Entra ID. Dette er eit strukturelt poeng som fortel oss noko om prioriteringane i produktutviklinga: grunnleggjande tryggleiksverktøy for agentidentitetar er plassert bak ein betalingsmur.

### Microsoft Purview og dokumentsensitivitet

For organisasjonar som brukar Microsoft 365, er Microsoft Purview det sentrale systemet for å klassifisere og kontrollere kva data som kan handterast av kven — inkludert av AI-agentar. [⁵](#ref-5)

*Sensitivity labels* er merkelappar på dokument og e-postar som reflekterer kor sensitive dei er: `Public`, `Internal`, `Confidential`, `Highly Confidential`. Desse merkjelappane er ikkje berre informative — dei kan utløyse automatisk kryptering, avgrense deling, og kontrollere kva applikasjonar som kan opne dokumentet.

*Data Loss Prevention (DLP)* er Purview-funksjonen som hindrar at sensitiv informasjon vert sendt ut av organisasjonen — gjennom e-post, nedlasting, copy-paste, eller API-kall. Ein DLP-policy kan t.d. blokkere at eit dokument som inneheld personnummer vert sendt til ein ekstern mottakar, eller at eit dokument merkt `Highly Confidential` vert kopiert til ein clipboard.

Korleis fungerer dette i samspel med AI-agentar? Svaret er: delvis, og under utvikling. Microsoft 365 Copilot respekterer sensitivity labels — ein Copilot-agent vil ikkje referere til innhaldet i eit dokument merkt `Highly Confidential` om brukaren ikkje har tilgang til det. Men integrasjonen mellom Purview og tredjeparts AI-agentar (AutoGen, GitHub Copilot Workspace, Azure AI Foundry-baserte agentar) er ikkje fullstendig i 2026. Ein agent som opererer utanfor Microsoft 365-konteksten, har ikkje automatisk tilgang til Purview sine tilgangskontrollar.

---

**Scenario: Agenten finn ein API-nøkkel i koden**

Ein kodagent gjennomgår ein eldre kodebase og finn ein hardkoda API-nøkkel i ein konfigurasjonsfil. Kva skjer — og kva bør skje?

*Kva agenten kan gjere:* Flagge funnet i Pull Request-kommentaren. Foreslå å flytte nøkkelen til Key Vault. Opne eit issue. Ikkje meir.

*Kva agenten bør hindre frå å gjere:* Logge nøkkelen til stdout (som hamnar i CI-loggar som er offentlege i mange repo). Inkludere nøkkelen i ei samanfatning som vert lagra i ein vector-database. Sende nøkkelen til eit eksternt system som del av ein MCP-førespurnad.

*Kva infrastrukturen bør gjere:* GitHub Advanced Security har secret scanning som oppdagar hardkoda hemmelegheiter og varslar automatisk. Purview DLP kan blokkere at hemmelegheiter vert sendt ut av tenanten. Key Vault og Managed Identity eliminerer behovet for hardkoda nøklar i utgangspunktet.

Det strukturelle poenget: mange av dei farlegaste tinga ein agent kan gjere, er ikkje tilsikta vondsinna handlingar — dei er sideeffektar av at agenten prøver å vere hjelpsam.

---

### Privileged Identity Management for agentar

Privileged Identity Management (PIM) er ein Azure-funksjon for *just-in-time* tilgang. [¹¹](#ref-11) I staden for å gje ein identitet permanente privilegerte roller, får identiteten berre tilgangen i ein avgrensa periode — etter at han har godkjent ein aktiveringsførespurnad (eventuelt etter at ein godkjennar har gjort det).

PIM støttar delvis Service Principals og Managed Identities for visse Azure-roller. Det er altså mogleg å konfigurere ein agentidentitet slik at han normalt ikkje har tilgang til ei Azure-rolle, men kan aktivere han midlertidig ved behov.

Utfordringa er at PIM-aktiveringsmodellen er designa for menneskelege arbeidsflytmønster. Eit menneske loggar inn, ber om aktivering, ventar på godkjenning (typisk 5–15 minutt), og jobbar deretter i eit avgrensa tidsrom. Ein AI-agent som triggast av ein webhook kl. 03:47 og treng å deploye ein hotfix i løpet av sekund, passar ikkje inn i denne modellen. Dette er eit eksempel på eit breiare mønster: tilgangsinfrastrukturen er designa for menneskleg åtferd, ikkje for agentoperasjonar.

## V. Kva seier dei andre? Komparative tilnærmingar

Microsoft-stacken er hovudlinsa i denne analysen fordi det er der mesteparten av norsk og europeisk bedriftsinfrastruktur bur. Men agentisk identitet er eit bransjebreitt strukturproblem. Korleis dei andre store aktørane tenkjer rundt det, er avgjerande for å forstå kvar feltet er på veg.

### OpenAI — function calling og Agents SDK

OpenAI introduserte function calling med GPT-4 i juni 2023. Modellen kan erklære at han vil kalle ein funksjon, levere parametrar i eit strukturert JSON-format, og la applikasjonsrammeverket utføre kallet og returnere resultatet. Autorisasjonen — om kallet faktisk skal utførast, og med kva tilgang — ligg heilt og fullt på applikasjonslaget. OpenAI sitt API veit kva funksjon modellen har bede om; han veit ikkje om identiteten som kallar, har rett til å gjere det.

OpenAI Agents SDK (2025) legg til eit tynt orkestrasjonslag over function calling. Handoffs mellom agentar er implementerte som in-process Python-kall — agenten A overleverer til agenten B ved å kalle ein Python-funksjon, ikkje ved å utveksle eit identitets-token. Det finst inga identitetsmodell i SDK-et; identitet er applikasjonsutviklaren sitt ansvar.

OpenAI sin "operator"/"user"-distinksjon i bruksvilkåra er ein policy-distinksjon, ikkje ein teknisk identitetsdistinksjon. Operatøren (selskapet som brukar OpenAI sitt API) er ansvarleg for å handheve eigne brukarautentiseringsreglar; OpenAI leverer ikkje infrastruktur for det.

### Anthropic — Claude og Model Context Protocol

Claude sin verktøybruk fylgjer same grunnmønster som OpenAI: modellen erklærer eit verktøykall, applikasjonsrammeverket avgjer om det skal utførast. Det er ikkje noko identitetsprimitiv innebygd i sjølve modellen.

Men Anthropic har gjort det arkitektonisk mest interessante bidraget i rommet: Model Context Protocol. MCP er eit klient-server-protokoll der MCP-tenarar eksponerer verktøy og ressursar på ein standardisert måte, og MCP-klientar (som Claude, men òg eit veksande tal andre modellar og rammeverk) kan oppdage og bruke desse verktøya.

Det relevante identitetsmessige bidraget i MCP er at protokollen definerer eit scope-omgrep på tenarnivå — tenaren kan erklære kva tillatingar han krev, og klienten må godkjenne desse tillatingane eksplisitt. [³](#ref-3) Dette er nærare OAuth enn noko anna i agentrommet: det finst eit formalisert samtykke-steg der agenten (eller mennesket bak) godkjenner kva tenaren skal ha lov til å gjere.

Gapet: MCP svarer framleis ikkje på det grunnleggjande spørsmålet om delegasjonskjeda. Kven er agenten autorisert av? Med kva grenser? For kor lenge? Desse spørsmåla er framleis opp til implementasjonen å svare på.

### Google — Vertex AI og Agent2Agent-protokollen

Google sin tilnærming er den mest infrastrukturorientererte. Vertex AI Agent Builder let utviklarar deploye agentar som Vertex AI-ressursar med tilknytte Google Cloud service accounts. Det betyr at agentane arvar GCP IAM-modellen — den næraste noko leverandør er komne eit reelt identitetsprimitiv for agentar.

Ein Vertex AI-agent har ein Google Cloud service account som kan få IAM-roller med finjustert tilgang til GCP-ressursar: berre lese-tilgang til ein spesifikk Cloud Storage-bøtte, berre skrivetilgang til ein Firestore-samling, og liknande. Dette er strukturelt meir solid enn "lagre hemmelegheiter i applikasjonen" — men IAM-rollene er framleis statiske. Agenten får service account sine fulle rettar uavhengig av kva den konkrete oppgåva krev.

*Agent2Agent (A2A)* er Google sin foreslåtte standard for agent-til-agent-kommunikasjon, annonsert i april 2025. [¹⁵](#ref-15) A2A definerer korleis ein agent kan kalle ein annan agent sine kapabilitetar — inkludert eit autentiseringsskjema basert på HTTP Bearer-token og "agent cards" (oppdagingsdokument som skildrar kva ein agent tilbyr og kva autentisering han krev). A2A inkluderer fleire identitetsprimitiv enn MCP: agentar har URI-ar, dei erklærer autentiseringskrav eksplisitt, og kall inneheld autentiserings-header.

A2A og MCP er parallelle standardar som ikkje samverkar — dei løyser delvis overlappande problem med ulike tilnærmingar. Feltet er fragmentert: ein agent som brukar MCP for verktøytilgang og A2A for agent-til-agent-kommunikasjon, opererer i to separate tillitsdomene med to separate autentiseringsmekanismar.

### Mistral, Cohere og orkestrasjonslaget

Mistral (Les Agents) og Cohere (Coral) fylgjer same grunnmønster som OpenAI: function calling som autorisasjonsgrensesnitt, inga eigenarta identitets- eller autorisasjonsinnovasjon. Autorisasjon ligg heilt på applikasjonslaget. Det er relevant å nemne ikkje fordi Mistral og Cohere ikkje er gode nok, men fordi det viser at dette mønsteret er universelt — det er ikkje eit Microsoft- eller OpenAI-spesifikt val. Det er bransjenormen.

LangChain og LlamaIndex er orkestrasjonrammeverk som sit over alle modellleverandørar og legg til kjedar, minne, og agentkonstruksjonar. LangGraph legg til statlege agentprimitiv. Ingen av desse rammeverka implementerer eit identitetslag — dei føreset at applikasjonsutviklaren handterer autentisering og autorisasjon mot dei ytre systema.

### Samanlikning og mønster

Det er eit klårt mønster: alle leverandørar deler same grunnarkitektur. Modellen ber om eit verktøykall. Applikasjonsrammeverket avgjer om det vert utført. Det finst ingen universell identitetslag mellom modellkallet og ressursen som vert aksessert.

MCP (Anthropic) og A2A (Google) er dei to mest substansielle arkitektoniske bidraga. Men dei løyser ulike problem: MCP handterer verktøyoppdaging og -invokasjon, A2A handterer agent-til-agent-kommunikasjon. Ingen av dei handterer fullt ut delegasjonskjeda mellom eit menneske og ein agent som handlar på vegner av det mennesket.

Google sin Vertex AI IAM-integrasjon er det næraste noko leverandør er komne eit reelt identitetsprimitiv — men berre innanfor GCP-økosystemet, og med statiske rollar.

Den strukturelle ironien er verd å nemne: dei selskapa som byggjer dei mest kapable agentane, er dei same selskapa som må byggje styringsinfrastrukturen for å avgrense dei. Dei opererer med konkurransemessige insentiv som favoriserer kapabilitetsleveranse over styringsmodenheit. Det er ikkje eit argument mot AI-agentane — det er ein observasjon om kvar presset ligg.

## VI. Styringsutfordringar og strukturell analyse

### Frå ansvarleg brukar til ansvarleg eigar

Tradisjonell tilgangsstyring er bygd rundt eit enkelt prinsipp: ein person er ansvarleg for sine eigne handlingar. Tilgangssystema er laga for å gje rette tilgangar til rette personar, og revisjonsloggane dokumenterer kven som har gjort kva. Om noko går gale, finst det ein person å snakke med.

Agentidentitetar bryt dette mønsteret. Ein Managed Identity er knytt til ein Azure-ressurs — ein Function App, ein Container Instance — ikkje til ein person. Kven eig ressursen, eig ansvaret for kva Managed Identity-en gjer. Det er eit organisatorisk spørsmål, og i mange organisasjonar er det eit ubesvart spørsmål: ingen har eksplisitt teke eigarskap over kva agentidentitetane i produksjonsmiljøet har tilgang til.

Dette er ikkje hypotetisk. Supply chain-angrep via kompromitterte CI/CD-pipelines — SolarWinds i 2020, XZ Utils i 2024 — er angrep via agentar, ikkje via personar. Angriparen kompromitterte ikkje ein brukar som deretter misbrukte tilgangen sin. Angriparen kompromitterte systemet som hadde tilgang, og systemet hadde tilgang til nesten alt.

### Identitetsspredning i agentlandskapet

Kvar kodagent, kvar pipeline, kvar MCP-integrasjon, kvar Azure AI Foundry-app er ein ny identitet. Med eit veksande tal agentrammeverk — Microsoft AutoGen, Semantic Kernel, GitHub Copilot Workspace, Azure AI Foundry, og eit hundretals open source-alternativ — veks antalet agentidentitetar i ein organisasjon raskt og usynleg.

Dette er eit kjent mønster frå pre-cloud-æraen. Organisasjonar bygde seg opp hundrevis av tenestekontoar — ein for kvar applikasjon, ein for kvar integrasjon, ein for kvar pipeline — utan oversikt over kva tilgang kvar einskild hadde, kven som eigde dei, eller om dei framleis var i bruk. Revisjonsrapportar frå den tida avslørte tenestekontoar med seniortilgang som hadde stått ubrukte i seks år.

Agentidentitetar er i ferd med å reprodusere dette mønsteret i ein mykje raskare skala. Microsoft Entra ID har verktøy for å identifisere ubrukte og overprivilegerte identitetar (Entra ID Governance, Access Reviews), men desse verktøya er ikkje designa spesifikt for agentlandskapet og krev aktiv innsats å konfigurere og oppretthalde.

Behovet for ein agentidentitetsregistratur er reelt: eit sentralt register over kva agentidentitetar som eksisterer, kva tilgang dei har, kven som er human eigar, og kva formål dei tener. I dag er det som regel ikkje noka slik oversikt.

### Microsoft som identitetssentralisering

Det er ikkje tilfeldig at identitetsinfrastrukturen for AI-agentar i Microsoft-stacken er Entra ID. For ein organisasjon som brukar Azure, GitHub, og Microsoft 365 — det vil seie det meste av norsk og europeisk bedriftsinfrastruktur — er Entra ID den einaste moglege sentralen. Det finst ikkje eit alternativ innanfor dette økosystemet.

Den som eig identitetsplattforma, set vilkåra for kven som kan operere. Prissettinga fortel oss noko: Conditional Access for workload identities krev P1 eller P2-lisensiering. Microsoft Purview DLP krev Compliance-lisensiering. Privileged Identity Management krev P2. Det vil seie at dei mektigaste styringsverktøya for agentidentitetar er plasserte bak ein betalingsmur som mange organisasjonar ikkje er villige til å krysse.

Dette er ikkje eit argument mot Microsoft-stacken. Det er ein analyse av kva det strukturelle avhengnadsforholdet inneber: tryggleiken for agentidentitetar er delvis ein funksjon av kva ein organisasjon er villig til å betale for Microsoft-lisensiering.

### Regulatoriske dimensjonar

EU AI Act, som tredde i kraft i 2024, klassifiserer visse AI-system som "høgrisiko" og stiller krav om revisjon, dokumentasjon, og menneskleg tilsyn. [⁷](#ref-7) Autonome AI-agentar med tilgang til bedriftsressursar — særleg i sektorar som helsevesen, offentleg forvalting, og kritisk infrastruktur — kan falle inn under desse krava. Det finst ikkje enno ei eintydig avgjerd om kor grensa går, men retningsreisinga er klar: agentar som tek avgjerder med reelle konsekvensar, vil treffe regulatorisk merksemd.

GDPR (personvernforordninga) gjeld fullt ut for AI-agentar som handterer personopplysningar. [⁸](#ref-8) Artikkel 5(2) sitt ansvarsprinsipp krev at behandlingsansvarlege kan demonstrere at behandlinga er lovleg — noko som krev at ein kan forklare kva ein agent har gjort med persondata, og på kva grunnlag. Artikkel 22 stiller krav om menneskleg tilsyn for automatiserte avgjerder med "juridiske eller tilsvarande konsekvensar" for einskildpersonar.

NIS2-direktivet, som regulerer nettverks- og informasjonstryggleik for verksemder i kritisk infrastruktur i EU, stiller krav til tilgangsstyring, hendinglogging, og leverandørkjede-risikostyring som direkte er relevante for agentidentitetar. [⁸](#ref-8)

---

**Norsk offentleg sektor**

NSM sine Grunnprinsipper for IKT-sikkerheit 2.0 definerer eit sett av basistiltak for identitets- og tilgangsstyring som er direkte relevante: minste privilegium, tilgangskontroll basert på behov, logging og overvaking av privilegert tilgang. [⁹](#ref-9) Desse prinsippa er ikkje skrivne med AI-agentar i tanke, men dei gjeld like fullt.

For statlege organ som tek i bruk AI-agentar, er spørsmålet ikkje om NSM sine prinsipp gjeld — dei gjer det — men om det finst kompetanse og ressursar til å implementere dei for eit nytt, raskt veksande klasse av identitetar. Digitaliseringsdirektoratet si rolle som standardiseringsaktør for offentleg sektor er sentral her: det trengst klåre tilrådingar for agentidentitetar i offentleg infrastruktur, tilsvarande det som finst for brukaridentitetar.

---

## Konklusjon

Agentidentitet er ikkje eit teknisk detalj. Det er eit spørsmål om makt og ansvar i ein infrastruktur som er i rask endring.

Teknologien er komen lengre enn styringa. AI-agentar kan allereie i dag opne Pull Requests, hente hemmelegheiter frå Key Vault, deployere til produksjon, og spørje intern dokumentasjon gjennom MCP-tenarar. Identitets- og tilgangsinfrastrukturen som eksisterer — Entra ID, Managed Identity, Workload Identity Federation, Key Vault RBAC, Conditional Access — er solid, men han er designa for eit anna problem: stabile, statiske applikasjonar med veldefinert åtferd, ikkje dynamiske, autonome agentar som reagerer på naturlegspråkleg instruksjon.

Fire prinsipp for ein organisasjon som vil gjere dette riktig:

**Inventory.** Vit kva agentidentitetar de har. Ikkje berre dei store, veldokumenterte CI/CD-pipeline-identitetane, men òg dei midlertidige, eksperimentelle, eller gløymde. Bruk Entra ID sine styringsverktøy aktivt.

**Least privilege.** Gjev agentidentitetar det minimale settet av tilgangar dei treng for den konkrete oppgåva. Ikkje `Key Vault Secrets Officer` når `Key Vault Secrets User` er tilstrekkeleg. Ikkje "write"-tilgang til heile repo-et når berre ein branch treng det. Scope-et til agenten bør vere so lite som mogleg.

**Observability.** Logg kva agentane gjer — ikkje berre om dei lukkast eller feiler. Kva ressursar vart aksessert? Kva token vart utferda? Kva handlingar vart utførd? Tradisjonelle SIEM-system er optimerte for brukarhandlingar; agentar produserer eit anna mønster av aktivitet som krev eiga konfigurasjon for å fangast opp.

**Ownership.** Kvar agentidentitet skal ha ein human eigar — ein person som er ansvarleg for kva tilgang identiteten har, og som vert varsla om endringar. Utan eigarskap er det ingen som ser når tilgangen vert for brei, eller når identiteten vert overflødig.

Me er tidleg i ein epoke der ikkje-menneskelege aktørar gradvis overtek oppgåver i produksjonssystema. Den teknologiske overgangen skjer raskare enn den institusjonelle — raskare enn reguleringa, raskare enn standardane, raskare enn organisasjonskulturen. Det betyr at gapet mellom kva agentar *kan* gjere og kva dei *bør* gjere er på sitt vidaste akkurat no.

Å handtere det gapet krev tenking, ikkje berre konfigurering. Infrastruktur er aldri nøytral.

## Ordliste

**Agent2Agent (A2A)** — Open standard, foreslått av Google i april 2025, for kommunikasjon mellom AI-agentar. Definerer eit autentiseringsskjema basert på HTTP Bearer-token og "agent cards" — oppdagingsdokument som skildrar kva ein agent tilbyr.

**API Management (APIM)** — Azure sin gateway-teneste for å eksponere og beskytte API-ar. Kan brukast som sentralt kontrollpunkt for MCP-tenarar i bedriftskontekst: autentiserer inngåande kall, sjekkar tilgangsreglar, og vidaresender til interne tenarar.

**Azure DevOps** — Microsoft sin DevOps-plattform for prosjektstyring, repo-hald, CI/CD og meir. Brukar Service Connections for å autentisere pipelines mot Azure-ressursar.

**CI/CD** — Continuous Integration / Continuous Deployment. Automatiserte pipelines for bygging, testing og utsending av kode. I agentkontekst er CI/CD-pipelines ein viktig stad der agentidentitetar opererer.

**Conditional Access** — Politikkar i Entra ID som avgjer under kva vilkår ein identitet får tilgang — basert på plassering, eining, risikosignal, og no òg for workload identities.

**DLP (Data Loss Prevention)** — Politikkar i Microsoft Purview som hindrar at sensitiv data vert sendt ut av organisasjonen — gjennom e-post, nedlasting, copy-paste, eller API-kall.

**Entra ID** — Microsoft sitt identitetssystem (tidlegare Azure Active Directory). Sentralen for autentisering og tilgangsstyring i Microsoft-stacken.

**GitHub Actions** — GitHub sin CI/CD-plattform. Workflowautomatisering knytt direkte til eit repo. Støttar OIDC Workload Identity Federation for autentisering mot Azure.

**IMDS (Instance Metadata Service)** — Eit internt endepunkt (169.254.169.254) på Azure-VM-ar og containers som gjev Managed Identity-token automatisk, utan at hemmelegheiter treng distribuerast.

**JWT (JSON Web Token)** — Eit digitalt "passbevis" — eit JSON-objekt som inneheld claims om kven ein er (iss, sub, aud, exp m.fl.), signert av ein påliteleg part. OIDC-token er implementerte som JWT.

**Key Vault** — Azure sin teneste for sikker lagring av hemmelegheiter (API-nøklar, passord, sertifikat, kryptografiske nøklar).

**Least privilege (minste privilegium)** — Eit grunnprinsipp i tryggleik: ein identitet bør berre ha akkurat den tilgangen som er nødvendig for oppgåva — ikkje meir, ikkje lenger enn nødvendig.

**Managed Identity** — Ein automatisk administrert identitet for Azure-ressursar. Ingen passord å handtere; Azure roterer hemmelegheiter automatisk. Finst i system-assigned og user-assigned variant.

**MCP (Model Context Protocol)** — Open standard for korleis AI-agentar hentar kontekst frå eksterne system — dokumentasjon, databaser, verktøy. Opphaveleg publisert av Anthropic, no breitt adoptert.

**Microsoft Purview** — Microsoft sin plattform for datahandtering og -klassifisering. Inkluderer sensitivity labels, DLP og revisjonslogging.

**OAuth 2.0** — Industristandard for autorisasjon: kva ein identitet har lov til å gjere. Grunnlaget for Workload Identity Federation og MCP sin autorisasjonsmodell.

**OIDC (OpenID Connect)** — Ein identitetsprotokoll bygd på OAuth 2.0. Brukt av GitHub Actions, Azure Kubernetes Service m.fl. for å bevise identitet til Entra ID utan hemmelegheiter.

**PIM (Privileged Identity Management)** — Ein Azure-funksjon for just-in-time tilgang: identitetar får berre privilegerte roller når dei treng det, og berre i ein avgrensa periode.

**RBAC (Role-Based Access Control)** — Tilgangsstyring basert på roller, ikkje individuelle identitetar. Ein agent får ein rolle (t.d. "Key Vault Secrets User") som avgjer kva han kan gjere.

**Sensitivity labels** — Merkelappar på dokument og data (t.d. "Confidential") i Microsoft Purview som styrer kva som kan gjerast med dei — kven som kan opne dei, om dei kan delast ut av organisasjonen.

**Service Principal** — Ein applikasjonsidentitet i Entra ID — tilsvarer ein "tenestekonto". Meir fleksibel enn Managed Identity, men krev manuelt vedlikehald av hemmelegheiter eller sertifikat.

**Workload Identity Federation** — Ein mekanisme som lèt ein ekstern identitetsleverandør (t.d. GitHub) bekrefte ein identitet til Entra ID utan å distribuere hemmelegheiter. Grunnlaget for OIDC-basert autentisering i CI/CD.

**Zero trust** — Eit tryggleiksparadigme der ingen identitet — ikkje eingong innanfor nettverket — vert stolt på automatisk. Alle aksessar vert verifiserte eksplisitt, uavhengig av nettverkslokasjon.

## Kjelder

<span id="ref-1">[1]</span> Microsoft, "Workload identity federation," *Microsoft Learn*, 2024. [Online]. Available: https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation. [Accessed: Apr. 21, 2026].

<span id="ref-2">[2]</span> Microsoft, "Use Azure API Management as a Model Context Protocol (MCP) server gateway," *Microsoft Learn*, 2025. [Online]. Available: https://learn.microsoft.com/en-us/azure/api-management/export-api-model-context-protocol. [Accessed: Apr. 21, 2026].

<span id="ref-3" data-kvalitet="A" data-habilitet="1"></span>[3] Anthropic, "MCP Authorization," *Model Context Protocol Specification*, Mar. 2025. [Online]. Available: https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization. [Accessed: Apr. 21, 2026].

<span id="ref-4" data-kvalitet="A" data-habilitet="2"></span>[4] Microsoft, "Conditional Access for workload identities," *Microsoft Learn*, 2024. [Online]. Available: https://learn.microsoft.com/en-us/entra/identity/conditional-access/workload-identity. [Accessed: Apr. 21, 2026].

<span id="ref-5" data-kvalitet="A" data-habilitet="2"></span>[5] Microsoft, "Learn about sensitivity labels," *Microsoft Learn*, 2024. [Online]. Available: https://learn.microsoft.com/en-us/purview/sensitivity-labels. [Accessed: Apr. 21, 2026].

<span id="ref-6" data-kvalitet="B" data-habilitet="2"></span>[6] Cloud Native Computing Foundation, "Cloud Native AI Security Whitepaper," *CNCF*, 2024. [Online]. Available: https://www.cncf.io/reports/cloud-native-ai-security-whitepaper/. [Accessed: Apr. 21, 2026].

<span id="ref-7" data-kvalitet="A" data-habilitet="1"></span>[7] European Parliament and Council of the EU, "Regulation (EU) 2024/1689 of the European Parliament and of the Council laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)," *Official Journal of the European Union*, Jul. 12, 2024. [Online]. Available: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689. [Accessed: Apr. 21, 2026].

<span id="ref-8" data-kvalitet="A" data-habilitet="1"></span>[8] European Parliament and Council of the EU, "Directive (EU) 2022/2555 on measures for a high common level of cybersecurity across the Union (NIS2 Directive)," *Official Journal of the European Union*, Dec. 27, 2022. [Online]. Available: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2555. [Accessed: Apr. 21, 2026].

<span id="ref-9" data-kvalitet="A" data-habilitet="1"></span>[9] Nasjonal sikkerhetsmyndighet, "Grunnprinsipper for IKT-sikkerhet 2.0," *NSM*, 2023. [Online]. Available: https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet-2-0/. [Accessed: Apr. 21, 2026].

<span id="ref-10" data-kvalitet="A" data-habilitet="2"></span>[10] Microsoft, "Use service connections with workload identity federation," *Microsoft Learn*, 2024. [Online]. Available: https://learn.microsoft.com/en-us/azure/devops/pipelines/library/connect-to-azure. [Accessed: Apr. 21, 2026].

<span id="ref-11" data-kvalitet="A" data-habilitet="2"></span>[11] Microsoft, "What is Microsoft Entra Privileged Identity Management?," *Microsoft Learn*, 2024. [Online]. Available: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure. [Accessed: Apr. 21, 2026].

<span id="ref-12" data-kvalitet="A" data-habilitet="2"></span>[12] Microsoft, "Azure role-based access control (Azure RBAC) vs. access policies for Key Vault," *Microsoft Learn*, 2024. [Online]. Available: https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-access-policy. [Accessed: Apr. 21, 2026].

<span id="ref-13" data-kvalitet="A" data-habilitet="1"></span>[13] S. Rose, O. Borchert, S. Mitchell, and S. Connelly, "Zero Trust Architecture," *NIST Special Publication 800-207*, National Institute of Standards and Technology, Aug. 2020. [Online]. Available: https://doi.org/10.6028/NIST.SP.800-207. [Accessed: Apr. 21, 2026].

<span id="ref-14" data-kvalitet="A" data-habilitet="1"></span>[14] GitHub, "About security hardening with OpenID Connect," *GitHub Docs*, 2024. [Online]. Available: https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect. [Accessed: Apr. 21, 2026].

<span id="ref-15" data-kvalitet="A" data-habilitet="2"></span>[15] Google, "Agent2Agent Protocol (A2A)," GitHub google/A2A, Apr. 2025. [Online]. Available: https://google.github.io/A2A. [Accessed: Apr. 21, 2026].
