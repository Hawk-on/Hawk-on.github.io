import { atom, onMount } from 'nanostores';
import type { Spraak } from '../utils/i18n';

// Alltid start med 'no' for å samsvara med SSR (Server Side Rendering)
export const spraakStore = atom<Spraak>('no');

// Bruk onMount for å henta lagra språk berre på klienten
onMount(spraakStore, () => {
  if (typeof localStorage !== 'undefined') {
    const lagra = localStorage.getItem('valgtSpraak') as Spraak;
    if (lagra && lagra !== spraakStore.get()) {
      spraakStore.set(lagra);
    }
  }
});

export function toggleSpraak() {
  const nyVerdi = spraakStore.get() === 'no' ? 'en' : 'no';
  spraakStore.set(nyVerdi);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('valgtSpraak', nyVerdi);
  }
}
