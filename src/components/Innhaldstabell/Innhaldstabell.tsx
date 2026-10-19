import React from 'react';
import { useInnhaldstabell } from './useInnhaldstabell';
import './Innhaldstabell.css';
import { bloggTekst, type Sprak } from '../../utils/i18n-blogg';

const Innhaldstabell: React.FC<{ sprak?: Sprak }> = ({ sprak = 'nn' }) => {
  const { headings, activeId, isOpen, setIsOpen, scrollToSection } = useInnhaldstabell();
  const t = bloggTekst(sprak);

  if (headings.length < 2) return null;

  return (
    <details className="innhaldstabell" open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="innhaldstabell__tittel">
        <span>{t.innhald}</span>
        <span className="innhaldstabell__pil" aria-hidden="true">▾</span>
      </summary>
      <ol className="innhaldstabell__liste">
        {headings.map((h) => (
          <li key={h.id} className={h.tagName === 'H3' ? 'innhaldstabell__element--h3' : ''}>
            <a 
              href={`#${h.id}`} 
              className={activeId === h.id ? 'is-aktiv' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(h.id);
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
};

export default Innhaldstabell;
