#!/usr/bin/env node
/**
 * Kontroll av artiklane mot husreglane i CLAUDE.md.
 *
 * Reglane er lette å hugse og lette å gløyme. Dette steget gjer dei til noko
 * bygget kontrollerer i staden for noko ein oppdagar ved ei tilfeldig skanning.
 *
 * Skriptet er ein skralle, ikkje ein mur. Dei avvika som alt finst, ligg i
 * kjende-avvik.json og slepp gjennom. Eit nytt avvik feilar bygget. Rettar du
 * eit gammalt, seier skriptet frå at grunnlinja kan strammast.
 *
 *   npm run sjekk            kontroller
 *   npm run sjekk -- --skriv oppdater grunnlinja etter ei rydding
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename, relative, sep } from 'node:path';

const ARTIKLAR = 'src/content/blog';
const GRUNNLINJE = 'scripts/kjende-avvik.json';
const MAKS_FILNAMN = 55;
const MAKS_TITTEL = 80;
const INGRESS = { min: 120, maks: 400 };
const TAGGAR = { min: 3, maks: 8 };

const REGLAR = {
  'span-utan-kode': 'kjeldespan manglar data-kvalitet eller data-habilitet',
  'span-utan-merke': 'kjeldespan har ingen synleg kode mellom taggane',
  'merke-feil': 'synleg kode i spanen svarar ikkje til data-attributta',
  landingsside: 'kjelde peikar på ei landingsside utan sti',
  'foreldrelaus-inline': 'inline-referanse utan tilsvarande span',
  'foreldrelaus-span': 'span utan inline-referanse',
  tankestrek: 'tankestrek i artikkelteksten',
  'filnamn-for-langt': `filnamnet er over ${MAKS_FILNAMN} teikn`,
  'tittel-for-lang': `tittelen er over ${MAKS_TITTEL} teikn og blir kutta i fane og søkjeresultat`,
  'ingress-lengd': `ingressen er utanfor ${INGRESS.min}-${INGRESS.maks} teikn`,
  'tal-taggar': `talet på taggar er utanfor ${TAGGAR.min}-${TAGGAR.maks}`,
  'bilete-utan-alt': 'bilete er sett utan bileteAlt',
  'dato-bakover': 'oppdatertDato er før publisertDato',
  'dato-i-framtida': 'dato ligg fram i tid',
  'endringslogg-utan-dato': 'artikkelen har endringslogg, men ingen oppdatertDato',
  'dato-utan-endringslogg': 'artikkelen har oppdatertDato, men ingen endringslogg',
  'sprak-mot-mappe': 'sprak i frontmatter svarar ikkje til mappa fila ligg i',
  'omsetjing-utan-makker': 'omsetjing peikar på ei fil som ikkje finst',
  'omsetjing-ikkje-gjensidig': 'makkeren peikar ein annan stad attende',
};

/**
 * Alle .md under ARTIKLAR, som stiar relative til ARTIKLAR og med skråstrek.
 *
 * Gjekk ei stund flatt over mappa. Då vart `en/` ikkje kontrollert i det heile,
 * og det synte seg ikkje som ein feil: skriptet sa «ingen nye avvik» og talde
 * berre ikkje omsetjingane med.
 */
function finnArtiklar(mappe = ARTIKLAR) {
  const ut = [];
  for (const oppf of readdirSync(mappe, { withFileTypes: true })) {
    const sti = join(mappe, oppf.name);
    if (oppf.isDirectory()) ut.push(...finnArtiklar(sti));
    else if (oppf.name.endsWith('.md')) ut.push(relative(ARTIKLAR, sti).split(sep).join('/'));
  }
  return ut.sort();
}

/** Fila `omsetjing` peikar på, eller undefined om feltet er tomt. */
function makkerTil(fm) {
  if (!fm.omsetjing) return undefined;
  return (fm.sprak ?? 'nn') === 'en' ? `${fm.omsetjing}.md` : `en/${fm.omsetjing}.md`;
}

/**
 * Kryssjekk av omsetjingspar. Må skje etter at alle filene er lesne, sidan han
 * spør om andre filer enn den som blir kontrollert.
 *
 * `omsetjing` held nynorskslugen i begge filene; ruta set sjølv på `en/`-
 * prefikset. At målfila finst er ikkje nok: koplinga må gå båe vegar. Peikar A
 * på B medan B peikar på C, slepp begge gjennom ein rein eksistenssjekk, og
 * språkknappen fører lesaren til feil artikkel utan veg attende.
 */
function sjekkPar(fil, fm, frontmatterar) {
  const funn = [];
  const iEnMappe = fil.startsWith('en/');
  const sprak = fm.sprak ?? 'nn';
  if (iEnMappe !== (sprak === 'en')) {
    funn.push({
      kode: 'sprak-mot-mappe',
      detalj: iEnMappe ? `ligg i en/, men sprak er ${sprak}` : 'sprak er en, men ligg ikkje i en/',
    });
    return funn;
  }

  const makker = makkerTil(fm);
  if (!makker) return funn;

  const fmMakker = frontmatterar.get(makker);
  if (!fmMakker) {
    funn.push({ kode: 'omsetjing-utan-makker', detalj: makker });
    return funn;
  }

  const attende = makkerTil(fmMakker);
  if (attende !== fil) {
    funn.push({
      kode: 'omsetjing-ikkje-gjensidig',
      detalj: `${fil} -> ${makker} -> ${attende ?? 'ingen stad'}`,
    });
  }
  return funn;
}

/**
 * Frontmatter er enkel nok til at dette held; ingen nøstede strukturar i bruk.
 *
 * YAML tillèt både doble og enkle hermeteikn rundt ein streng. Parsaren tok
 * berre dei doble, og då vart `omsetjing: 'a'` lese som strengen med hermeteikna
 * med. Makkersjekken leita etter `en/'a'.md`, og `sprak: 'en'` svara ikkje til
 * mappa. Eit gyldig par stoppa altså bygget på grunn av hermeteikna, ikkje på
 * grunn av innhaldet.
 */
function lesFrontmatter(tekst) {
  const blokk = tekst.split(/^---\s*$/m)[1] ?? '';
  const felt = {};
  for (const linje of blokk.split('\n')) {
    const m = linje.match(/^([a-zA-ZæøåÆØÅ]+):\s*(.*)$/);
    if (m) felt[m[1]] = m[2].trim().replace(/^"(.*)"$|^'(.*)'$/, '$1$2');
  }
  return felt;
}

function sjekk(fil, tekst, fm) {
  const funn = [];
  const legg = (kode, detalj) => funn.push({ kode, detalj });

  if (basename(fil).length > MAKS_FILNAMN) {
    legg('filnamn-for-langt', `${basename(fil).length} teikn`);
  }

  const idag = new Date().toISOString().slice(0, 10);

  if ((fm.tittel ?? '').length > MAKS_TITTEL) {
    legg('tittel-for-lang', `${fm.tittel.length} teikn`);
  }
  const ingress = (fm.ingress ?? '').length;
  if (ingress < INGRESS.min || ingress > INGRESS.maks) {
    legg('ingress-lengd', `${ingress} teikn`);
  }
  const tagInnhald = (fm.tags ?? '').replace(/^\[|\]$/g, '').trim();
  const talTaggar = tagInnhald ? tagInnhald.split(',').map(s => s.trim()).filter(Boolean).length : 0;
  if (talTaggar < TAGGAR.min || talTaggar > TAGGAR.maks) {
    legg('tal-taggar', `${talTaggar} taggar`);
  }
  if (fm.bilete && !fm.bileteAlt) legg('bilete-utan-alt', fm.bilete);

  const publisert = (fm.publisertDato ?? '').slice(0, 10);
  const oppdatert = (fm.oppdatertDato ?? '').slice(0, 10);
  if (publisert > idag) legg('dato-i-framtida', `publisertDato ${publisert}`);
  if (oppdatert) {
    if (oppdatert > idag) legg('dato-i-framtida', `oppdatertDato ${oppdatert}`);
    if (oppdatert < publisert) legg('dato-bakover', `${oppdatert} < ${publisert}`);
  }

  // Begge overskriftene, av same grunn som Kjelder/Sources: ei omsett artikkel
  // skal kunne halde heile teksten på eitt språk. Utan «Changelog» ville ei
  // oppdatert omsetjing fått dato-utan-endringslogg og stoppa bygget.
  const harLogg = /^#{2,3}\s+(?:Endringslogg|Changelog)\s*$/m.test(tekst);
  if (harLogg && !oppdatert) legg('endringslogg-utan-dato', 'mangler oppdatertDato');
  if (oppdatert && !harLogg) legg('dato-utan-endringslogg', `oppdatertDato ${oppdatert}`);

  // Språkreglane under gjeld nynorsk. Engelske omsetjingar har eiga form,
  // og ein tankestrek er ikkje eit avvik der.
  const erNynorsk = (fm.sprak ?? 'nn') !== 'en';
  const brodtekst = tekst.split(/^## (?:Kjelder|Sources)\s*$/m)[0];
  if (erNynorsk) {
    for (const _ of brodtekst.matchAll(/—/g)) legg('tankestrek', '—');
  }

  const spanar = new Map();
  for (const m of tekst.matchAll(/<span id="ref-(\d+)"([^>]*)>(.*?)<\/span>/g)) {
    const [, nr, attr, kropp] = m;
    const kvalitet = attr.match(/data-kvalitet="([^"]*)"/)?.[1];
    const habilitet = attr.match(/data-habilitet="([^"]*)"/)?.[1];
    spanar.set(nr, true);
    if (!kvalitet || !habilitet) {
      legg('span-utan-kode', `ref-${nr}`);
    } else if (!kropp.trim()) {
      legg('span-utan-merke', `ref-${nr}`);
    } else if (kropp.trim() !== `${kvalitet}${habilitet}`) {
      legg('merke-feil', `ref-${nr}: «${kropp.trim()}» mot ${kvalitet}${habilitet}`);
    }
  }

  const inline = new Set([...tekst.matchAll(/\(#ref-(\d+)\)/g)].map(m => m[1]));
  for (const nr of inline) if (!spanar.has(nr)) legg('foreldrelaus-inline', `ref-${nr}`);
  for (const nr of spanar.keys()) if (!inline.has(nr)) legg('foreldrelaus-span', `ref-${nr}`);

  for (const m of tekst.matchAll(/Available:\s*(https?:\/\/\S+?)[.\s]*(?:\[|$)/gm)) {
    const url = m[1].replace(/\.$/, '');
    if (/^https?:\/\/[^/]+\/?$/.test(url)) legg('landingsside', url);
  }

  return funn;
}

const filer = finnArtiklar();

// To rundar. Kryssjekken av omsetjingspar spør om frontmatteren til ei anna
// fil, og kan difor ikkje køyre før alle er lesne.
const innhald = new Map(filer.map(f => [f, readFileSync(join(ARTIKLAR, f), 'utf8')]));
const frontmatterar = new Map([...innhald].map(([f, tekst]) => [f, lesFrontmatter(tekst)]));

const faktisk = {};
const detaljar = [];
for (const f of filer) {
  const tekst = innhald.get(f);
  const fm = frontmatterar.get(f);
  const funn = [...sjekk(f, tekst, fm), ...sjekkPar(f, fm, frontmatterar)];
  for (const { kode, detalj } of funn) {
    const nykel = `${f}::${kode}`;
    faktisk[nykel] = (faktisk[nykel] ?? 0) + 1;
    detaljar.push({ nykel, detalj });
  }
}

if (process.argv.includes('--skriv')) {
  writeFileSync(GRUNNLINJE, JSON.stringify(faktisk, null, 2) + '\n');
  console.log(`Grunnlinja er skriven: ${Object.keys(faktisk).length} oppføringar.`);
  process.exit(0);
}

let grunnlinje = {};
try {
  grunnlinje = JSON.parse(readFileSync(GRUNNLINJE, 'utf8'));
} catch {
  console.error(`Fann ikkje ${GRUNNLINJE}. Køyr: npm run sjekk -- --skriv`);
  process.exit(1);
}

const nye = [];
const betra = [];
for (const [nykel, tal] of Object.entries(faktisk)) {
  const tolt = grunnlinje[nykel] ?? 0;
  if (tal > tolt) nye.push({ nykel, tal, tolt });
}
for (const [nykel, tolt] of Object.entries(grunnlinje)) {
  const tal = faktisk[nykel] ?? 0;
  if (tal < tolt) betra.push({ nykel, tal, tolt });
}

if (betra.length) {
  console.log('\nRetta sidan sist. Stram grunnlinja med: npm run sjekk -- --skriv');
  for (const b of betra) console.log(`  ${b.nykel}: ${b.tolt} -> ${b.tal}`);
}

if (nye.length) {
  console.error('\nNye avvik:');
  for (const n of nye) {
    const [fil, kode] = n.nykel.split('::');
    console.error(`  ${fil}`);
    console.error(`    ${kode}: ${REGLAR[kode]} (${n.tal}, tolt ${n.tolt})`);
    for (const d of detaljar.filter(d => d.nykel === n.nykel).slice(0, 5)) {
      console.error(`      ${d.detalj}`);
    }
  }
  console.error('\nRett dei, eller skriv grunnlinja på nytt om avviket er medvite.');
  process.exit(1);
}

const sum = Object.values(faktisk).reduce((a, b) => a + b, 0);
const omsette = filer.filter(f => f.startsWith('en/')).length;
const nynorske = filer.length - omsette;
console.log(
  `Artikkelkontroll: ${nynorske} artiklar og ${omsette} ` +
  `${omsette === 1 ? 'omsetjing' : 'omsetjingar'}, ingen nye avvik (${sum} kjende).`
);
