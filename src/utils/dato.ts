export function formaterDato(dato: string | Date | undefined, format: 'lang' | 'kort' = 'kort'): string {
  if (!dato) return '';

  const datoStr = dato instanceof Date
    ? dato.toISOString().slice(0, 10)
    : String(dato);

  const d = new Date(datoStr + 'T12:00:00');
  if (isNaN(d.getTime())) return datoStr;

  return d.toLocaleDateString('nn-NO', format === 'lang'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' }
  );
}
