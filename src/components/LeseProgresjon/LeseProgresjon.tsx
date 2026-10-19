import React from 'react';
import { useLeseProgresjon } from './useLeseProgresjon';
import './LeseProgresjon.css';
import { bloggTekst, type Sprak } from '../../utils/i18n-blogg';

interface LeseProgresjonProps {
  manueltLesetid?: number;
  sprak?: Sprak;
}

const LeseProgresjon: React.FC<LeseProgresjonProps> = ({ manueltLesetid, sprak = 'nn' }) => {
  const { prosent, minIgjen, visTidIgjen, visTilToppen, scrollToTop } = useLeseProgresjon(manueltLesetid);
  const t = bloggTekst(sprak);

  return (
    <>
      <div 
        className="les-framgang" 
        style={{ width: `${prosent}%` }} 
        aria-hidden="true"
      ></div>

      <div className={`les-tid-igjen ${visTidIgjen ? 'synleg' : ''}`} aria-hidden="true">
        {t.tidIgjen(minIgjen)}
      </div>

      <button 
        type="button" 
        className={`til-toppen ${visTilToppen ? 'synleg' : ''}`} 
        onClick={scrollToTop}
        aria-label={t.tilToppen}
      >
        ↑
      </button>
    </>
  );
};

export default LeseProgresjon;
