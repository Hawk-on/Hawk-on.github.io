/**
 * Datoen fylgjer sidespråket, ikkje nettstaden.
 *
 * Locale var hardkoda til nn-NO, så den engelske artikkelen fekk «18. oktober
 * 2026» under `lang="en"`. Nynorsk er framleis standard; berre sider som seier
 * frå om noko anna, får noko anna.
 */
export function formaterDato(
  dato: string | Date | undefined,
  format: 'lang' | 'kort' = 'kort',
  sprak: 'nn' | 'en' = 'nn',
): string {
  if (!dato) return '';

  const datoStr = dato instanceof Date
    ? dato.toISOString().slice(0, 10)
    : String(dato);

  const d = new Date(datoStr + 'T12:00:00');
  if (isNaN(d.getTime())) return datoStr;

  return d.toLocaleDateString(sprak === 'en' ? 'en-GB' : 'nn-NO', format === 'lang'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' }
  );
}
