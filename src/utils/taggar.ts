/**
 * Normalisering av taggar.
 *
 * Rå-taggen frå frontmatter vert brukt som URL-segment, visingsnamn og
 * Umami-verdi på ein gong. Utan normalisering gav det kvar si tag-side for
 * `AI` og `ai`, for `Noreg` og `noreg`, og for `technology` og `teknologi`.
 *
 * Normaliseringa skjer her, ikkje i artiklane. Å skrive om frontmatter i 27
 * filer ville løyst det ein gong, og problemet ville kome att med neste
 * artikkel som skreiv taggen med stor bokstav.
 */

/** Slug for URL: små bokstavar, ASCII, berre bokstav, tal og bindestrek. */
export function tagSlug(rå: string): string {
  return rå
    .trim()
    .toLowerCase()
    .replace(/æ/g, 'e')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Taggar som peikar på same emnet. Nøkkel og verdi er begge slugar.
 * Venstresida forsvinn frå nettstaden; høgresida er den som står att.
 */
const SAMANSLÅING: Record<string, string> = {
  // Språkduplikat
  technology: 'teknologi',
  security: 'sikkerheit',
  // Sikkerheitsklynga
  infosec: 'sikkerheit',
  cybersikkerheit: 'sikkerheit',
  // KI-klynga
  'kunstig-intelligens': 'ai',
  sprakmodellar: 'ai',
  // Forkorta eigennamn
  okrim: 'okokrim',
};

/**
 * Visingsnamn der slugen ikkje held. Akronym som skal ha store bokstavar,
 * og ord der æ, ø eller å vart folda bort for URL-en si skuld.
 */
const VISING: Record<string, string> = {
  ai: 'AI',
  usa: 'USA',
  eu: 'EU',
  spu: 'SPU',
  cve: 'CVE',
  okonomi: 'økonomi',
  'sosiologisk-okonomi': 'sosiologisk-økonomi',
  neringspolitikk: 'næringspolitikk',
  okokrim: 'Økokrim',
  // Eigennamn
  linux: 'Linux',
  kubernetes: 'Kubernetes',
  kripos: 'Kripos',
  palestina: 'Palestina',
  turchin: 'Turchin',
  zeitenwende: 'Zeitenwende',
  maven: 'Maven',
  brics: 'BRICS',
  'cloud-act': 'CLOUD Act',
  azure: 'Azure',
  microsoft: 'Microsoft',
  palantir: 'Palantir',
  telenor: 'Telenor',
  osint: 'OSINT',
  ungarn: 'Ungarn',
  tyrkia: 'Tyrkia',
  spania: 'Spania',
  marokko: 'Marokko',
  frankrike: 'Frankrike',
  libanon: 'Libanon',
  israel: 'Israel',
  myanmar: 'Myanmar',
  bangladesh: 'Bangladesh',
  iran: 'Iran',
  kina: 'Kina',
  russland: 'Russland',
  noreg: 'Noreg',
};

/** Den endelege taggen ein rå frontmatter-verdi høyrer til. */
export function kanoniskTag(rå: string): string {
  const slug = tagSlug(rå);
  return SAMANSLÅING[slug] ?? slug;
}

/** Kanoniske taggar for eit innlegg, utan duplikat og i opphavleg rekkjefylgje. */
export function kanoniskeTaggar(taggar: readonly string[] = []): string[] {
  return [...new Set(taggar.map(kanoniskTag))];
}

/** Namnet lesaren ser. */
export function visTag(slug: string): string {
  return VISING[slug] ?? slug;
}

/**
 * Rå-taggar som ikkje lenger svarar til si eiga adresse, og kvar dei skal.
 * Grunnlaget for redirect-stubbane, slik at gamle lenkjer ikkje daudar.
 */
export function gamleTagStiar(alleRåTaggar: readonly string[]): Array<{ frå: string; til: string }> {
  const kanoniske = new Set(alleRåTaggar.map(kanoniskTag));
  const sett = new Map<string, string>();
  for (const rå of alleRåTaggar) {
    const til = kanoniskTag(rå);
    if (rå !== til && !kanoniske.has(rå)) sett.set(rå, til);
  }
  return [...sett].map(([frå, til]) => ({ frå, til }));
}
