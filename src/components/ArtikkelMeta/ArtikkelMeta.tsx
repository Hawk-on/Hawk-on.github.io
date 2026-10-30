import React from 'react';
import { visTag } from '../../utils/taggar';
import { bloggTekst, type Sprak } from '../../utils/i18n-blogg';

interface ArtikkelMetaProps {
  datoFormatert: string;
  oppdatertFormatert?: string;
  lesetid?: number;
  tags: string[];
  base: string;
  sprak?: Sprak;
}

const ArtikkelMeta: React.FC<ArtikkelMetaProps> = ({ datoFormatert, oppdatertFormatert, lesetid, tags, base, sprak = 'nn' }) => {
  const t = bloggTekst(sprak);
  return (
    <div className="artikkel-header__meta">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <span>{t.publisert}: {datoFormatert}</span>
        {oppdatertFormatert && oppdatertFormatert !== datoFormatert && (
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>{t.oppdatert}: {oppdatertFormatert}</span>
        )}
      </div>
      <span data-lesetid-auto>{lesetid ? t.lesetid(lesetid) : ''}</span>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <a 
            key={tag} 
            href={`${base}/tag/${tag}/`} 
            className="tag" 
            data-umami-event="tagg-klikk" 
            data-umami-event-tag={tag}
          >
            {visTag(tag)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArtikkelMeta;
