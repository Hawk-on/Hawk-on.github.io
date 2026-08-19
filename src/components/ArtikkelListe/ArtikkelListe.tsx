import React from 'react';
import { useArtikkelListe } from './useArtikkelListe';
import './ArtikkelListe.css';

interface Innlegg {
  tittel: string;
  dato: string;
  ingress?: string;
  tags: string[];
  slug: string;
  datoFormatert: string;
}

interface ArtikkelListeProps {
  alleInnlegg: Innlegg[];
  sorterteTags: string[];
  base: string;
}

const ArtikkelListe: React.FC<ArtikkelListeProps> = ({ alleInnlegg, sorterteTags, base }) => {
  const { aktivTag, setAktivTag, filtrerteInnlegg, totalt, synlege } = useArtikkelListe(alleInnlegg);

  return (
    <>
      <div className="tag-strip">
        <button 
          className={`tag tag--filter ${aktivTag === 'alle' ? 'aktiv' : ''}`} 
          onClick={() => setAktivTag('alle')}
        >
          Alle
        </button>
        {sorterteTags.map(tag => (
          <button 
            key={tag}
            className={`tag tag--filter ${aktivTag === tag ? 'aktiv' : ''}`} 
            onClick={() => setAktivTag(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      <p className="tag-teljing">
        {synlege === totalt ? '' : `Viser ${synlege} av ${totalt} innlegg`}
      </p>

      <section>
        <p className="seksjon-tittel">Alle innlegg</p>
        <ul className="artikkel-liste">
          {filtrerteInnlegg.map(innlegg => (
            <li key={innlegg.slug} className="artikkel-kort">
              <div className="artikkel-kort__dato">{innlegg.datoFormatert}</div>
              <div>
                <h2 className="artikkel-kort__tittel">
                  <a href={`${base}/${innlegg.slug}`}>{innlegg.tittel}</a>
                </h2>
                {innlegg.ingress && <p className="artikkel-kort__ingress">{innlegg.ingress}</p>}
                {innlegg.tags.length > 0 && (
                  <div className="artikkel-kort__tags">
                    {innlegg.tags.map(tag => (
                      <a 
                        key={tag} 
                        href={`${base}/tag/${tag}`} 
                        className="tag" 
                        data-umami-event="tagg-klikk" 
                        data-umami-event-tag={tag}
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ArtikkelListe;
