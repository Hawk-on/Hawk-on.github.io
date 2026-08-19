import React from 'react';

interface ArtikkelMetaProps {
  datoFormatert: string;
  oppdatertFormatert?: string;
  lesetid?: number;
  tags: string[];
  base: string;
}

const ArtikkelMeta: React.FC<ArtikkelMetaProps> = ({ datoFormatert, oppdatertFormatert, lesetid, tags, base }) => {
  return (
    <div className="artikkel-header__meta">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <span>Publisert: {datoFormatert}</span>
        {oppdatertFormatert && oppdatertFormatert !== datoFormatert && (
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>Oppdatert: {oppdatertFormatert}</span>
        )}
      </div>
      <span data-lesetid-auto>{lesetid ? `~${lesetid} min lesing` : ''}</span>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map(tag => (
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
    </div>
  );
};

export default ArtikkelMeta;
