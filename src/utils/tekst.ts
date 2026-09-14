const ORD_PER_MINUTT = 200;

/**
 * Reknar ut estimert lesetid frå råmarkdown.
 *
 * Kjeldelista er halden utanfor. Ho er oppslagsverk, ikkje lauptekst, og
 * på ein artikkel med tjue-tretti IEEE-referansar utgjer ho fort ein
 * tredjedel av teikna. Å telje henne med gav minuttal ingen kjende seg att i.
 *
 * Dette er einaste kjelde til lesetid. Feltet skal ikkje setjast i
 * frontmatter; då driv dei to frå kvarandre, slik dei gjorde før.
 */
export function reknaUtLesetid(tekst: string): number {
  const brodtekst = tekst.split(/^##\s+Kjelder\s*$/m)[0];

  const reinTekst = brodtekst
    .replace(/```[\s\S]*?```/g, ' ')          // kodeblokker
    .replace(/<[^>]+>/g, ' ')                  // html-taggar
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')     // bilete
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')   // lenkjer: behald lenkjeteksten
    .replace(/\\\[\d+\\\]/g, ' ')            // referansemerke, t.d. \[12\]
    .replace(/https?:\/\/\S+/g, ' ')           // nakne url-ar
    .replace(/[#>*_`~|-]/g, ' ');              // resterande markdown-teikn

  const ord = reinTekst.split(/\s+/).filter(o => /\p{L}|\p{N}/u.test(o));
  return Math.max(1, Math.ceil(ord.length / ORD_PER_MINUTT));
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
