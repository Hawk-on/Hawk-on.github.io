import React from 'react';
import { bloggTekst, type Sprak } from '../../utils/i18n-blogg';

const Footer: React.FC<{ sprak?: Sprak }> = ({ sprak = 'nn' }) => {
  const t = bloggTekst(sprak);
  return (
    <footer className="nettstad-footer">
      <div className="container--brei">
        <div className="nettstad-footer__indre">
          <span>© {new Date().getFullYear()} Håkon Hole Lønning</span>
          <span><a href="/personvern/">{t.personvern}</a></span>
          <span>{t.bygdMed} <a href="https://astro.build">Astro</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
