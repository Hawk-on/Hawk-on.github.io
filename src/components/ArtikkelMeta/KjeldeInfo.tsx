import React, { useState, useEffect } from 'react';
import { bloggTekst, type Sprak } from '../../utils/i18n-blogg';

/** Fargane høyrer til skalaen, ikkje til språket, og ligg difor att her. */
const KVALITET_FARGE: Record<string, string> = {
  A: '#10b981',
  B: '#3b82f6',
  C: '#f59e0b',
  D: '#ef4444',
};

const KjeldeInfo: React.FC<{ sprak?: Sprak }> = ({ sprak = 'nn' }) => {
  const t = bloggTekst(sprak);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('opne-kjeldeinfo', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('opne-kjeldeinfo', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="kjelde-modal-overlay" onClick={() => setIsOpen(false)}>
      <div
        className="kjelde-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="kjelde-modal-tittel"
        onClick={e => e.stopPropagation()}
      >
        <header className="kjelde-modal__header">
          <h2 id="kjelde-modal-tittel">{t.kjeldeTittel}</h2>
          <button type="button" className="kjelde-modal__lukk" onClick={() => setIsOpen(false)} aria-label="Lukk">×</button>
        </header>
        
        <div className="kjelde-modal__innhald">
          <h3>{t.kjeldeKvalitet}</h3>
          <div className="kjelde-skala">
            {Object.entries(t.kvalitet).map(([id, kat]) => (
              <div key={id} className="kjelde-skala__item">
                <span className="kjelde-badge" style={{ backgroundColor: KVALITET_FARGE[id] }}>{id}</span>
                <div>
                  <strong>{kat.tittel}</strong>
                  <p>{kat.beskriving}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '2rem' }}>{t.kjeldeHabilitet}</h3>
          <div className="kjelde-skala">
            {Object.entries(t.habilitet).map(([id, kat]) => (
              <div key={id} className="kjelde-skala__item">
                <span className="kjelde-badge kjelde-badge--habilitet">{id}</span>
                <div>
                  <strong>{kat.tittel}</strong>
                  <p>{kat.beskriving}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="kjelde-modal__note" style={{ marginTop: '2rem' }}>
            <p><em>{t.kjeldeNote}</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KjeldeInfo;
