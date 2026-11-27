#!/usr/bin/env node
/**
 * Nummerer kjeldene i ein artikkel om etter IEEE: i den rekkjefølgja dei fyrst
 * blir siterte. Har artikkelen ein engelsk makker, får han same omnummerering.
 *
 *   npm run kjelder -- <slug>          nummerer om og skriv filene
 *   npm run kjelder -- <slug> --tørr   vis berre kva som ville endra seg
 *
 * <slug> kan òg vere ein sti til den nynorske eller den engelske fila.
 *
 * Kvifor makkeren får nynorsk-rekkjefølgja og ikkje si eiga: den engelske er
 * ei tilpassing, og ei setning kan ha flytt seg. Nummerert kvar for seg ville
 * ref-12 peike på ulike kjelder i dei to filene. Same kart på begge held
 * nummera like, og `npm run sjekk` kontrollerer at dei faktisk er det.
 *
 * Skriptet nektar om para ikkje har same kjeldenummer før omnummereringa.
 * Då veit det ikkje kva nummer som svarar til kva, og ei gjetting ville
 * spreidd feilen i staden for å rette han.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { delOpp, siteringsrekkjefolgje, lesFrontmatter, INLINE } from './kjelder-lib.mjs';

const ARTIKLAR = 'src/content/blog';
const args = process.argv.slice(2);
const torr = args.includes('--tørr') || args.includes('--torr');
const mal = args.find(a => !a.startsWith('--'));

if (!mal) {
  console.error('Bruk: npm run kjelder -- <slug> [--tørr]');
  process.exit(1);
}

function finnNynorsk(mal) {
  const slug = basename(mal).replace(/\.md$/, '');
  const iEn = /(^|\/)en\//.test(mal);
  if (!iEn) return join(ARTIKLAR, `${slug}.md`);
  const fm = lesFrontmatter(readFileSync(join(ARTIKLAR, 'en', `${slug}.md`), 'utf8'));
  return join(ARTIKLAR, `${fm.omsetjing || slug}.md`);
}

const nnSti = finnNynorsk(mal);
if (!existsSync(nnSti)) {
  console.error(`Fann ikkje ${nnSti}.`);
  process.exit(1);
}
const nnTekst = readFileSync(nnSti, 'utf8');
const nnFm = lesFrontmatter(nnTekst);
const enSti = nnFm.omsetjing ? join(ARTIKLAR, 'en', `${nnFm.omsetjing}.md`) : null;
const enTekst = enSti && existsSync(enSti) ? readFileSync(enSti, 'utf8') : null;

/**
 * Kartet frå gamalt til nytt nummer. Fyrst det brødteksten siterer, så det som
 * berre blir sitert inne i kjeldelista (t.d. «sjå [12]» i eit kjeldenotat), og
 * til sist oppføringar ingen siterer. Dei siste er foreldrelause og blir
 * flagga av `npm run sjekk`; her får dei berre plass bakerst.
 */
function lagKart(tekst) {
  const { brodtekst, oppforingar } = delOpp(tekst);
  const rekkje = siteringsrekkjefolgje(brodtekst);
  for (const o of oppforingar) {
    for (const m of o.tekst.matchAll(INLINE)) if (!rekkje.includes(m[2])) rekkje.push(m[2]);
  }
  for (const o of oppforingar) if (o.nr && !rekkje.includes(o.nr)) rekkje.push(o.nr);
  return new Map(rekkje.map((gamalt, i) => [gamalt, String(i + 1)]));
}

function bruk(tekst, kart) {
  const { brodtekst, oppforingar, skilje, hale } = delOpp(tekst);
  const nytt = nr => kart.get(nr) ?? nr;
  const inline = t => t.replace(INLINE, (_, _a, nr) => `[\\[${nytt(nr)}\\]](#ref-${nytt(nr)})`);

  const omsett = oppforingar.map(o => {
    const ny = nytt(o.nr);
    const t = inline(o.tekst)
      .replace(/^<span id="ref-\d+"/, `<span id="ref-${ny}"`)
      // Det synlege nummeret står som `\[N\]`, `[N]` eller ` [N]` i ulike
      // artiklar. Alle tre blir skrivne om, og forma blir ståande som ho var.
      .replace(/^(<span [^>]*>.*?<\/span>)(\s*)(\\?\[)\d+(\\?\])/, `$1$2$3${ny}$4`);
    return { nr: Number(ny), t };
  });
  omsett.sort((a, b) => a.nr - b.nr);
  // Halen er det som står etter kjeldelista, til dømes ein endringslogg. Eit
  // sitat der må følgje med, elles peikar det på kjelda som hadde nummeret før.
  return inline(brodtekst) + omsett.map(o => o.t).join(skilje) + inline(hale);
}

/**
 * Eldre artiklar siterer òg med `[¹](#ref-1)` eller `[[3]](#ref-3)`. Skriptet
 * skriv berre om standardforma, så i ei slik artikkel ville det synlege talet
 * stå att uendra medan lenkja flytta seg. Det er verre enn ingen omnummerering.
 */
function andreFormer(tekst) {
  const alle = [...tekst.matchAll(/\[[^\]]*\]?\]\(#ref-\d+\)/g)].map(m => m[0]);
  return alle.filter(l => !/^\[\\\[\d+\\\]\]\(#ref-\d+\)$/.test(l));
}
for (const [sti, tekst] of [[nnSti, nnTekst], [enSti, enTekst]]) {
  if (!tekst) continue;
  const avvik = andreFormer(tekst);
  if (avvik.length) {
    console.error(`${sti} siterer òg utan standardforma [\\[N\\]](#ref-N), til dømes:`);
    for (const l of [...new Set(avvik)].slice(0, 3)) console.error(`  ${l}`);
    console.error('Gjer om sitata til standardforma fyrst, elles blir dei synlege tala ståande feil.');
    process.exit(1);
  }
}

const kart = lagKart(nnTekst);

if (enTekst) {
  const nnNr = delOpp(nnTekst).oppforingar.map(o => o.nr).sort();
  const enNr = delOpp(enTekst).oppforingar.map(o => o.nr).sort();
  const berreNn = nnNr.filter(n => !enNr.includes(n));
  const berreEn = enNr.filter(n => !nnNr.includes(n));
  if (berreNn.length || berreEn.length) {
    console.error('Para har ikkje same kjeldenummer, så skriptet veit ikkje kva som svarar til kva.');
    if (berreNn.length) console.error(`  berre i nynorsk: ${berreNn.join(', ')}`);
    if (berreEn.length) console.error(`  berre i engelsk: ${berreEn.join(', ')}`);
    console.error('Gje den nye kjelda same nummer i begge filene, og køyr på nytt.');
    process.exit(1);
  }
}

const endra = [...kart].filter(([g, n]) => g !== n);
if (!endra.length) {
  console.log(`Nummereringa er alt i orden (${kart.size} kjelder).`);
  process.exit(0);
}

console.log(`${endra.length} av ${kart.size} kjelder får nytt nummer:`);
for (const [g, n] of endra) console.log(`  ${g} -> ${n}`);

if (torr) {
  console.log('\n--tørr: ingenting er skrive.');
  process.exit(0);
}

writeFileSync(nnSti, bruk(nnTekst, kart));
console.log(`\nSkreiv ${nnSti}`);
if (enTekst) {
  writeFileSync(enSti, bruk(enTekst, kart));
  console.log(`Skreiv ${enSti}`);
}
console.log('Køyr npm run sjekk for å kontrollere paret.');
