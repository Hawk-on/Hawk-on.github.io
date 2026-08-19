import React from 'react';
import { useLeseProgresjon } from './useLeseProgresjon';
import './LeseProgresjon.css';

interface LeseProgresjonProps {
  manueltLesetid?: number;
}

const LeseProgresjon: React.FC<LeseProgresjonProps> = ({ manueltLesetid }) => {
  const { prosent, minIgjen, visTidIgjen, visTilToppen, scrollToTop } = useLeseProgresjon(manueltLesetid);

  return (
    <>
      <div 
        className="les-framgang" 
        style={{ width: `${prosent}%` }} 
        aria-hidden="true"
      ></div>

      <div className={`les-tid-igjen ${visTidIgjen ? 'synleg' : ''}`} aria-hidden="true">
        {minIgjen} min igjen
      </div>

      <button 
        type="button" 
        className={`til-toppen ${visTilToppen ? 'synleg' : ''}`} 
        onClick={scrollToTop}
        aria-label="Til toppen"
      >
        ↑
      </button>
    </>
  );
};

export default LeseProgresjon;
