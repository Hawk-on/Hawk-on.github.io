/**
 * Reknar ut estimert lesetid basert på tekstinnhald.
 * Brukar eit gjennomsnitt på 200 ord i minuttet.
 */
export function reknaUtLesetid(tekst: string): number {
  const ordPerMinutt = 200;
  const reineOrd = tekst.trim().split(/\s+/).length;
  const minutt = Math.ceil(reineOrd / ordPerMinutt);
  return minutt;
}

/**
 * Genererer eit kort utdrag (excerpt) frå tekst viss ingress manglar.
 */
export function genererUtdrag(tekst: string, lengde: number = 160): string {
  // Fjern Markdown-syntax for utdraget
  const reinTekst = tekst
    .replace(/^#+\s+/gm, '') // Overskrifter
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Lenkjer
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Fet skrift
    .replace(/(\*|_)(.*?)\1/g, '$2') // Kursiv
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Kode
    .replace(/\n+/g, ' ') // Linjeskift
    .trim();

  if (reinTekst.length <= lengde) return reinTekst;
  return reinTekst.slice(0, lengde).trim() + '...';
}
