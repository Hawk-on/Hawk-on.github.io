import { atom } from 'nanostores';
import type { Spraak } from '../utils/i18n';

// Hent initial verdi frå localStorage dersom mogleg (berre i nettlesar)
const initialSpraak = (typeof localStorage !== 'undefined' && localStorage.getItem('valgtSpraak') as Spraak) || 'no';

export const spraakStore = atom<Spraak>(initialSpraak);

// Funksjon for å byta språk
export function toggleSpraak() {
  const nyVerdi = spraakStore.get() === 'no' ? 'en' : 'no';
  spraakStore.set(nyVerdi);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('valgtSpraak', nyVerdi);
  }
}
