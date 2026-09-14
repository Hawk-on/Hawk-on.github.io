#!/usr/bin/env node
/**
 * Byter ut 'unsafe-inline' i script-src med SHA-256-hashar av dei faktiske
 * inline-skripta. Køyrer etter `astro build`, på ferdig HTML.
 *
 * Kvifor ikkje Astro sin eigen `security.csp`: han støttar korkje ClientRouter
 * eller Shiki, og begge er i bruk her. Denne varianten unngår begge:
 *
 * - **ClientRouter.** Ved navigering blir skripta frå målsida køyrde under
 *   CSP-en til sida du kom frå. Difor får alle sider det same settet med
 *   hashar, ikkje sine eigne. Sju hashar dekkjer heile nettstaden.
 * - **Shiki.** Syntaksfarginga brukar inline *stilar*, ikkje skript. Det er
 *   `style-src` som må halde på 'unsafe-inline'; `script-src` treng det ikkje.
 *
 * JSON-LD vert med vilje ikkje hasha. `<script type="application/ld+json">` er
 * ein datablokk: HTML-algoritmen merkjer han som ikkje-køyrbar før CSP i det
 * heile blir spurd, så script-src gjeld ikkje for han.
 *
 * Redirect-stubbane har inga CSP-meta, sidan dei ikkje brukar Grunnoppsett.
 * Dei blir hoppa over.
 */
import { readFileSync, writeFileSync, globSync } from 'node:fs';
import { createHash } from 'node:crypto';

const DIST = 'dist';
const META = /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/;
const SCRIPT = /<script([^>]*)>([\s\S]*?)<\/script>/g;

const filer = globSync(`${DIST}/**/*.html`).filter(f =>
  readFileSync(f, 'utf8').includes('http-equiv="Content-Security-Policy"'));

function inlineSkript(html) {
  const ut = [];
  for (const m of html.matchAll(SCRIPT)) {
    const [, attr, kropp] = m;
    if (/\ssrc=/.test(attr)) continue;
    if (/application\/ld\+json/.test(attr)) continue;
    ut.push(kropp);
  }
  return ut;
}

// Samla sett, slik at navigering med ClientRouter ikkje blir blokkert.
const hashar = new Set();
for (const f of filer) {
  for (const k of inlineSkript(readFileSync(f, 'utf8'))) {
    hashar.add(`'sha256-${createHash('sha256').update(k, 'utf8').digest('base64')}'`);
  }
}
const liste = [...hashar].sort();

let endra = 0;
for (const f of filer) {
  const html = readFileSync(f, 'utf8');
  const m = html.match(META);
  if (!m) continue;

  const direktiv = m[2].split(';').map(d => d.trim()).filter(Boolean).map(d => {
    if (!d.startsWith('script-src ')) return d;
    const kjelder = d.split(/\s+/).filter(k => k !== "'unsafe-inline'");
    return [...kjelder, ...liste].join(' ');
  });

  const ny = html.replace(META, `$1${direktiv.join('; ')}$3`);
  if (ny !== html) { writeFileSync(f, ny); endra++; }
}

if (!liste.length) {
  console.error('CSP: fann ingen inline-skript. Noko er gale; avbryt.');
  process.exit(1);
}

// Kontroller resultatet. Endrar Astro bootstrap-skripta sine i ein framtidig
// versjon, skal bygget stoppe her, ikkje levere ein policy som blokkerer sida.
const avvik = [];
let skriptTalde = 0;
for (const f of filer) {
  const html = readFileSync(f, 'utf8');
  const innhald = html.match(META)?.[2] ?? '';
  const src = innhald.split(';').map(d => d.trim()).find(d => d.startsWith('script-src ')) ?? '';
  if (src.includes("'unsafe-inline'")) avvik.push(`${f}: 'unsafe-inline' står att i script-src`);
  if (!innhald.includes("style-src") || !innhald.match(/style-src[^;]*'unsafe-inline'/)) {
    avvik.push(`${f}: style-src mista 'unsafe-inline' (Shiki treng han)`);
  }
  if (!src.includes("'wasm-unsafe-eval'")) avvik.push(`${f}: mista 'wasm-unsafe-eval' (Pagefind)`);
  for (const kropp of inlineSkript(html)) {
    skriptTalde++;
    const h = `'sha256-${createHash('sha256').update(kropp, 'utf8').digest('base64')}'`;
    if (!src.includes(h)) avvik.push(`${f}: inline-skript utan hash`);
  }
}

if (avvik.length) {
  console.error(`CSP: ${avvik.length} avvik.`);
  for (const a of avvik.slice(0, 10)) console.error('  ' + a);
  process.exit(1);
}
console.log(`CSP: ${liste.length} hashar, ${endra} sider oppdaterte, ${skriptTalde} inline-skript dekte.`);
