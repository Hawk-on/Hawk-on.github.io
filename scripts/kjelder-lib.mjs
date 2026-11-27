/**
 * Felles lesing av kjeldelista i ein artikkel.
 *
 * Brukt av `kjelder.mjs` (omnummerering) og `sjekk-artiklar.mjs` (parkontroll).
 * Formatet er det CLAUDE.md skildrar:
 *
 *   inline:  [\[N\]](#ref-N)
 *   liste:   <span id="ref-N" data-kvalitet="X" data-habilitet="Y">XY</span>\[N\] ...
 *
 * Oppføringane står anten med blank linje mellom seg eller tett, éi per linje.
 * Begge finst i repoet, så ei oppføring varer frå sin span til neste span,
 * neste overskrift eller slutten av fila.
 */

/**
 * Frontmatter er enkel nok til at dette held; ingen nøstede strukturar i bruk.
 *
 * YAML tillèt både doble og enkle hermeteikn rundt ein streng. Parsaren tok
 * berre dei doble, og då vart `omsetjing: 'a'` lese som strengen med hermeteikna
 * med. Makkersjekken leita etter `en/'a'.md`, og `sprak: 'en'` svara ikkje til
 * mappa. Eit gyldig par stoppa altså bygget på grunn av hermeteikna, ikkje på
 * grunn av innhaldet.
 */
export function lesFrontmatter(tekst) {
  const blokk = tekst.split(/^---\s*$/m)[1] ?? '';
  const felt = {};
  for (const linje of blokk.split('\n')) {
    const m = linje.match(/^([a-zA-ZæøåÆØÅ]+):\s*(.*)$/);
    if (m) felt[m[1]] = m[2].trim().replace(/^"(.*)"$|^'(.*)'$/, '$1$2');
  }
  return felt;
}

const OVERSKRIFT = /^## (?:Kjelder|Sources)\s*$/m;
const SPAN_START = /^<span id="ref-(\d+)"/m;
export const INLINE = /\[\\\[(\d+)\\\]\]\(#ref-(\d+)\)/g;

/**
 * Del teksten i tre: alt før kjeldelista, oppføringane, og det som kjem etter.
 * `skilje` er det som stod mellom oppføringane, så ei omordning held forma.
 */
export function delOpp(tekst) {
  const overskrift = tekst.search(OVERSKRIFT);
  const fraa = overskrift < 0 ? 0 : overskrift;
  const etterOverskrift = tekst.slice(fraa);
  const fyrsteSpan = etterOverskrift.search(SPAN_START);
  if (fyrsteSpan < 0) return { brodtekst: tekst, oppforingar: [], skilje: '\n\n', hale: '' };

  const start = fraa + fyrsteSpan;
  const rest = tekst.slice(start);
  const nesteOverskrift = rest.search(/^#{1,6} /m);
  const slutt = nesteOverskrift < 0 ? tekst.length : start + nesteOverskrift;

  const liste = tekst.slice(start, slutt);
  const bitar = liste.split(/(?=^<span id="ref-\d+")/m);
  const skilje = /\n[ \t]*\n\s*$/.test(bitar[0] ?? '') ? '\n\n' : '\n';

  const oppforingar = bitar.map(bit => {
    const tekstBit = bit.replace(/\s+$/, '');
    const m = tekstBit.match(/^<span id="ref-(\d+)"([^>]*)>(.*?)<\/span>/);
    const attr = m?.[2] ?? '';
    return {
      nr: m?.[1],
      kvalitet: attr.match(/data-kvalitet="([^"]*)"/)?.[1],
      habilitet: attr.match(/data-habilitet="([^"]*)"/)?.[1],
      url: adresse(tekstBit),
      tekst: tekstBit,
    };
  });

  // Det som stod etter siste oppføring, slik at fila sluttar som før.
  const sisteRa = liste.match(/\s*$/)[0];
  return {
    brodtekst: tekst.slice(0, start),
    oppforingar,
    skilje,
    hale: sisteRa + tekst.slice(slutt),
  };
}

/**
 * Adressa til ei oppføring. IEEE-forma `Available: <url>` er vanlegast, men
 * nokre artiklar lenkjer tittelen i Markdown (`["Tittel"](https://...)`). Utan
 * den andre forma vart slike kjelder lesne som kjelder utan adresse, og to ulike
 * dokument med same kode slapp gjennom parkontrollen.
 */
function adresse(tekst) {
  return (
    tekst.match(/Available:\s*(https?:\/\/\S+?)\.?(?:\s|\[|$)/)?.[1] ??
    tekst.match(/\]\((https?:\/\/[^)\s]+)\)/)?.[1] ??
    tekst.match(/(https?:\/\/[^\s)>\]]+?)\.?(?:[\s)>\]]|$)/)?.[1]
  );
}

/** Nummer i den rekkjefølgja dei fyrst blir siterte i brødteksten. */
export function siteringsrekkjefolgje(brodtekst) {
  const sett = [];
  for (const m of brodtekst.matchAll(INLINE)) if (!sett.includes(m[2])) sett.push(m[2]);
  return sett;
}

/** Kjeldelista som Map frå nummer til kode og adresse. */
export function kjeldekart(tekst) {
  const kart = new Map();
  for (const o of delOpp(tekst).oppforingar) if (o.nr) kart.set(o.nr, o);
  return kart;
}
