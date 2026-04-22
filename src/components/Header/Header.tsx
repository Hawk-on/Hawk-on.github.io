import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { spraakStore, toggleSpraak } from '../../stores/spraakStore';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const aktivSpraak = useStore(spraakStore);

  useEffect(() => {
    setMounted(true);
    // Initial tema-sjekk
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  // Ikkje vis noko som avvik frå server-HTML før me er "mounted" på klienten
  const visSpraak = mounted ? aktivSpraak : 'no';

  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = current === 'dark' || (!current && prefersDark) ? 'light' : 'dark';
    
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');

    const link = document.getElementById('favicon') as HTMLLinkLinkElement;
    if (link) {
      link.href = next === 'dark' ? '/assets/img/favicon-dark.png' : '/assets/img/favicon.png';
    }
  };

  return (
    <header className="nettstad-header">
      <div className="container--brei">
        <div className="nettstad-header__indre">
          <a href="/" className="nettstad-header__logo">HHL</a>
          
          <button 
            type="button" 
            className={`meny-bryter ${isMenuOpen ? 'meny-bryter--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Opne eller lukk meny"
          >
            <span className="meny-bryter__linje"></span>
            <span className="meny-bryter__linje"></span>
            <span className="meny-bryter__linje"></span>
          </button>

          <nav id="hovudnav" className={isMenuOpen ? 'nav--open' : ''}>
            <ul className="nettstad-nav">
              <li><a href="/#om" data-i18n="nav.about" onClick={() => setIsMenuOpen(false)}>Om meg</a></li>
              <li><a href="/#erfaring" data-i18n="nav.experience" onClick={() => setIsMenuOpen(false)}>Erfaring</a></li>
              <li><a href="/#utdanning" data-i18n="nav.education" onClick={() => setIsMenuOpen(false)}>Utdanning</a></li>
              <li><a href="/#ferdigheiter" data-i18n="nav.skills" onClick={() => setIsMenuOpen(false)}>Ferdigheiter</a></li>
              <li><a href="/#kontakt" data-i18n="nav.contact" onClick={() => setIsMenuOpen(false)}>Kontakt</a></li>
              <li><a href="https://hawk-on.github.io/Blog">Blogg</a></li>
              <li>
                <button type="button" onClick={toggleSpraak} className="lang-knapp" aria-label="Byt språk">
                  {visSpraak === 'no' ? 'EN' : 'NO'}
                </button>
              </li>
              <li>
                <button type="button" onClick={toggleTheme} className="tema-bryter" aria-label="Byt fargetema">
                  <span className="tema-bryter__sol" style={{ display: isDark ? 'none' : 'inline' }}>☀</span>
                  <span className="tema-bryter__mane" style={{ display: isDark ? 'inline' : 'none' }}>☽</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
