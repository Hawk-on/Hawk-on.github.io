/**
 * Grensesnitt-tekstar for bloggen, på nynorsk og engelsk.
 *
 * Dette er ikkje same mekanismen som `i18n.ts`. Ordlista for CV-en blir styrt
 * av ein nanostores-atom, fordi lesaren byter språk med ein knapp og teksten
 * skal skifte i same dokumentet. Her er språket ein eigenskap ved sida: ein
 * artikkel på engelsk er ei anna fil på ei anna adresse, og språket kan ikkje
 * endre seg medan du står der. Difor går det som prop, ikkje gjennom ein store.
 *
 * Grunnen til at dette måtte på plass: `<html lang>` fylgde artikkelen, men
 * grensesnittet rundt stod att på nynorsk. Ein skjermlesar fekk då engelsk
 * uttale på nynorsk tekst, som er verre enn om heile sida hadde vore nynorsk.
 */

export type Sprak = 'nn' | 'en';

export interface BloggTekst {
  meny: string;
  menyOm: string;
  menyCv: string;
  menyBlogg: string;
  byteTema: string;
  publisert: string;
  oppdatert: string;
  lesetid: (minutt: number) => string;
  innhald: string;
  kjeldeTittel: string;
  kjeldeKvalitet: string;
  kjeldeHabilitet: string;
  kjeldeNote: string;
  kvalitet: Record<'A' | 'B' | 'C' | 'D', { tittel: string; beskriving: string }>;
  habilitet: Record<'1' | '2' | '3', { tittel: string; beskriving: string }>;
  lesMeir: string;
  tilbake: string;
  tidIgjen: (minutt: number) => string;
  tilToppen: string;
  personvern: string;
  bygdMed: string;
}

const nn: BloggTekst = {
  meny: 'Opne eller lukk meny',
  menyOm: 'Om',
  menyCv: 'CV',
  menyBlogg: 'Blogg',
  byteTema: 'Byt fargetema',
  publisert: 'Publisert',
  oppdatert: 'Oppdatert',
  lesetid: m => `~${m} min lesing`,
  innhald: 'Innhald',
  kjeldeTittel: 'Metode for kjeldekritikk',
  kjeldeKvalitet: 'Kvalitet (Etterrettelegheit)',
  kjeldeHabilitet: 'Habilitet (Bias & Agenda)',
  kjeldeNote: 'Kjeldekritikk er ikkje binært. Ei kjelde kan ha topp teknisk kvalitet (A), men vera ein direkte part i soga (3). Me deklarerer begge dimensjonar for å gje eit ærleg bilete.',
  kvalitet: {
    A: { tittel: 'Høg etterrettelegheit', beskriving: 'Offisielle dokument, internasjonale organisasjonar eller fagfellevurdert forsking.' },
    B: { tittel: 'God kvalitet', beskriving: 'Anerkjend journalistikk eller leiande tenketankar med redaksjonell kontroll.' },
    C: { tittel: 'Fagleg OSINT', beskriving: 'Tekniske analysar eller domenespesifikke kjelder. Krev ofte teknisk verifisering.' },
    D: { tittel: 'Ustadfesta / Partisisk', beskriving: 'Lekkasjar eller medium med tydeleg politisk slagside. Krev store atterhald.' },
  },
  habilitet: {
    '1': { tittel: 'Uavhengig', beskriving: 'Ingen kjende økonomiske eller politiske bindingar som påverkar nøytraliteten.' },
    '2': { tittel: 'Strategisk bias', beskriving: 'Finansiert av interesseorganisasjonar eller statar. Fagleg god, men med ein tydeleg agenda.' },
    '3': { tittel: 'Partisisk aktør', beskriving: 'Kjelda er ein direkte part i soga eller er statskontrollert propaganda/PR.' },
  },
  lesMeir: 'Les meir om emnet',
  tilbake: '← Tilbake til alle innlegg',
  tidIgjen: m => `${m} min igjen`,
  tilToppen: 'Til toppen',
  personvern: 'Personvern',
  bygdMed: 'Bygd med',
};

const en: BloggTekst = {
  meny: 'Open or close menu',
  menyOm: 'About',
  menyCv: 'CV',
  menyBlogg: 'Blog',
  byteTema: 'Switch colour theme',
  publisert: 'Published',
  oppdatert: 'Updated',
  lesetid: m => `~${m} min read`,
  innhald: 'Contents',
  kjeldeTittel: 'Source criticism method',
  kjeldeKvalitet: 'Quality (verifiability)',
  kjeldeHabilitet: 'Independence (bias and agenda)',
  kjeldeNote: 'Source criticism is not binary. A source can be of the highest technical quality (A) and still be a direct party to the story (3). Both dimensions are declared so the picture stays honest.',
  kvalitet: {
    A: { tittel: 'High verifiability', beskriving: 'Official documents, international organisations or peer-reviewed research.' },
    B: { tittel: 'Good quality', beskriving: 'Established journalism or leading think tanks with editorial control.' },
    C: { tittel: 'Technical OSINT', beskriving: 'Technical analysis or domain-specific sources. Often needs separate verification.' },
    D: { tittel: 'Unconfirmed or partisan', beskriving: 'Leaks, or outlets with a pronounced political slant. Requires heavy caveats.' },
  },
  habilitet: {
    '1': { tittel: 'Independent', beskriving: 'No known financial or political ties affecting neutrality.' },
    '2': { tittel: 'Strategic bias', beskriving: 'Funded by interest groups or states. Professionally sound, but with a clear agenda.' },
    '3': { tittel: 'Partisan actor', beskriving: 'The source is a direct party to the story, or is state-controlled propaganda or PR.' },
  },
  lesMeir: 'More on this subject',
  tilbake: '← Back to all posts',
  tidIgjen: m => `${m} min left`,
  tilToppen: 'Back to top',
  personvern: 'Privacy',
  bygdMed: 'Built with',
};

/** Tekstane for eit språk. Nynorsk er standard, slik resten av nettstaden er. */
export function bloggTekst(sprak: Sprak = 'nn'): BloggTekst {
  return sprak === 'en' ? en : nn;
}
