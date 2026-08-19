/**
 * RSS-feeden på den gamle stien /Blog/rss.xml.
 *
 * Feedlesarar forventar gyldig XML, ikkje ei meta-refresh-side, så denne
 * ruta serverer sjølve feeden på nytt i staden for å redirecte. Eksisterande
 * abonnentar held fram med å få innlegg utan å måtte gjere noko, medan
 * lenkjene inni feeden peikar til dei nye /blog/-adressene.
 */
export { GET } from '../blog/rss.xml';
