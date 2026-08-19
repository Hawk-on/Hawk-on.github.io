import { useState } from 'react';

interface Innlegg {
  tittel: string;
  dato: string;
  ingress?: string;
  tags: string[];
  slug: string;
  datoFormatert: string;
}

export const useArtikkelListe = (alleInnlegg: Innlegg[]) => {
  const [aktivTag, setAktivTag] = useState('alle');

  const filtrerteInnlegg = aktivTag === 'alle' 
    ? alleInnlegg 
    : alleInnlegg.filter(i => i.tags.includes(aktivTag));

  const totalt = alleInnlegg.length;
  const synlege = filtrerteInnlegg.length;

  return {
    aktivTag,
    setAktivTag,
    filtrerteInnlegg,
    totalt,
    synlege
  };
};
