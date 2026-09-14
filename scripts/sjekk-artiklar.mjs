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
import { join, basename } from 'node:path';

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
};

/** Frontmatter er enkel nok til at dette held; ingen nøstede strukturar i bruk. */
function lesFrontmatter(tekst) {
  const blokk = tekst.split(/^---\s*$/m)[1] ?? '';
  const felt = {};
  for (const linje of blokk.split('\n')) {
    const m = linje.match(/^([a-zA-ZæøåÆØÅ]+):\s*(.*)$/);
    if (m) felt[m[1]] = m[2].trim().replace(/^"(.*)"$/, '$1');
  }
  return felt;
}

function sjekk(fil, tekst) {
  const funn = [];
  const legg = (kode, detalj) => funn.push({ kode, detalj });

  if (basename(fil).length > MAKS_FILNAMN) {
    legg('filnamn-for-langt', `${basename(fil).length} teikn`);
  }

  const fm = lesFrontmatter(tekst);
  const idag = new Date().toISOString().slice(0, 10);

  if ((fm.tittel ?? '').length > MAKS_TITTEL) {
    legg('tittel-for-lang', `${fm.tittel.length} teikn`);
  }
  const ingress = (fm.ingress ?? '').length;
  if (ingress < INGRESS.min || ingress > INGRESS.maks) {
    legg('ingress-lengd', `${ingress} teikn`);
  }
  const talTaggar = [...(fm.tags ?? '').matchAll(/"([^"]+)"/g)].length;
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

  const harLogg = /^#{2,3}\s+Endringslogg\s*$/m.test(tekst);
  if (harLogg && !oppdatert) legg('endringslogg-utan-dato', 'mangler oppdatertDato');
  if (oppdatert && !harLogg) legg('dato-utan-endringslogg', `oppdatertDato ${oppdatert}`);

  const brodtekst = tekst.split(/^## Kjelder\s*$/m)[0];
  for (const _ of brodtekst.matchAll(/—/g)) legg('tankestrek', '—');

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

const filer = readdirSync(ARTIKLAR).filter(f => f.endsWith('.md')).sort();
const faktisk = {};
const detaljar = [];
for (const f of filer) {
  for (const { kode, detalj } of sjekk(f, readFileSync(join(ARTIKLAR, f), 'utf8'))) {
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
console.log(`Artikkelkontroll: ${filer.length} artiklar, ingen nye avvik (${sum} kjende).`);
