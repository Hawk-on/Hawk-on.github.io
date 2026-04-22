import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('NO');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initial tema-sjekk
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');

    // Lytt på endringar i språket (viss det skjer andre stader)
    const handleLangChange = () => {
      const currentLang = document.documentElement.lang === 'nn' ? 'NO' : 'EN';
      setLang(currentLang === 'NO' ? 'EN' : 'NO'); // Knappen viser kva me byter TIL
    };
    
    // Ved oppstart, sjekk kva knappen skal visa
    setLang(document.documentElement.lang === 'nn' ? 'EN' : 'NO');
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = current === 'dark' || (!current && prefersDark) ? 'light' : 'dark';
    
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');

    // Oppdater favicon
    const link = document.getElementById('favicon') as HTMLLinkLinkElement;
    if (link) {
      link.href = next === 'dark' ? '/assets/img/favicon-dark.png' : '/assets/img/favicon.png';
    }
  };

  const toggleLang = () => {
    // Me sender ein CustomEvent slik at vanilla-scriptet i index.astro kan oppdatera innhaldet
    const event = new CustomEvent('språkbyte');
    window.dispatchEvent(event);
    setLang(lang === 'NO' ? 'EN' : 'NO');
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
                <button type="button" onClick={toggleLang} className="lang-knapp" aria-label="Byt språk">
                  {lang}
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
