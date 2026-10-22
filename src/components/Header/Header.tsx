import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { spraakStore, toggleSpraak } from '../../stores/spraakStore';
import { bloggTekst } from '../../utils/i18n-blogg';

interface HeaderProps {
  /** Astro.url.pathname — avgjer kva navigasjon som vert vist. */
  aktuellSti?: string;
  /** Adressa til same artikkelen på det andre språket. Berre sett når makkeren finst. */
  spraakUrl?: string;
  /** Språket på sida ein står på no. */
  sprak?: 'nn' | 'en';
}

const Header: React.FC<HeaderProps> = ({ aktuellSti = '/', spraakUrl, sprak = 'nn' }) => {
  // Bloggreina fylgjer artikkelspråket. CV-reina held fram med data-i18n og
  // nanostores, sidan språket der blir bytt med ein knapp i same dokumentet.
  const t = bloggTekst(sprak);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const aktivSpraak = useStore(spraakStore);

  useEffect(() => {
    setMounted(true);
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  // Ikkje vis noko som avvik frå server-HTML før me er "mounted" på klienten
  const visSpraak = mounted ? aktivSpraak : 'no';

  // CV-en ligg på rota og har ankernavigasjon; alt under /blog/ har bloggnavigasjon
  const erBlogg = aktuellSti.startsWith('/blog');

  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = current === 'dark' || (!current && prefersDark) ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');

    const link = document.getElementById('favicon') as HTMLLinkElement | null;
    if (link) {
      link.href = next === 'dark' ? '/assets/img/favicon-dark.png' : '/assets/img/favicon.png';
    }
  };

  const lukk = () => setIsMenuOpen(false);

  return (
    <header className="nettstad-header">
      <div className="container--brei">
        <div className="nettstad-header__indre">
          <a href="/" className="nettstad-header__logo">
            {erBlogg ? (
              <>
                <img
                  src={`/assets/img/favicon-header${isDark ? '-dark' : ''}.png`}
                  alt=""
                  className="nettstad-header__ikon"
                  aria-hidden="true"
                />
                hawk-on
              </>
            ) : 'HHL'}
          </a>

          <button
            type="button"
            className={`meny-bryter ${isMenuOpen ? 'meny-bryter--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t.meny}
          >
            <span className="meny-bryter__linje"></span>
            <span className="meny-bryter__linje"></span>
            <span className="meny-bryter__linje"></span>
          </button>

          <nav id="hovudnav" className={isMenuOpen ? 'nav--open' : ''}>
            <ul className="nettstad-nav">
              {erBlogg ? (
                <>
                  <li><a href="/blog/" className={aktuellSti === '/blog/' ? 'aktiv' : ''} onClick={lukk}>{t.menyBlogg}</a></li>
                  <li><a href="/om/" className={aktuellSti === '/om/' ? 'aktiv' : ''} onClick={lukk}>{t.menyOm}</a></li>
                  <li><a href="/" onClick={lukk}>{t.menyCv}</a></li>
                  <li><a href="/blog/rss.xml" data-umami-event="nav-rss" onClick={lukk}>RSS</a></li>
                  {spraakUrl && (
                    <li>
                      {/* Her navigerer knappen i staden for å byte store: artikkelen
                          finst som to tekstar, ikkje som ei ordliste. */}
                      <a
                        href={spraakUrl}
                        className="lang-knapp"
                        hrefLang={sprak === 'nn' ? 'en' : 'nn'}
                        data-umami-event="artikkel-spraakbyte"
                        aria-label={sprak === 'nn' ? 'Read this article in English' : 'Les denne artikkelen på nynorsk'}
                        onClick={lukk}
                      >
                        {sprak === 'nn' ? 'EN' : 'NO'}
                      </a>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li><a href="/#om" data-i18n="nav.about" onClick={lukk}>Om meg</a></li>
                  <li><a href="/#erfaring" data-i18n="nav.experience" onClick={lukk}>Erfaring</a></li>
                  <li><a href="/#utdanning" data-i18n="nav.education" onClick={lukk}>Utdanning</a></li>
                  <li><a href="/#ferdigheiter" data-i18n="nav.skills" onClick={lukk}>Ferdigheiter</a></li>
                  <li><a href="/#kontakt" data-i18n="nav.contact" onClick={lukk}>Kontakt</a></li>
                  <li><a href="/blog/" onClick={lukk}>Blogg</a></li>
                  <li>
                    <button type="button" onClick={toggleSpraak} className="lang-knapp" aria-label="Byt språk">
                      {visSpraak === 'no' ? 'EN' : 'NO'}
                    </button>
                  </li>
                </>
              )}
              <li>
                <button type="button" onClick={toggleTheme} className="tema-bryter" aria-label={t.byteTema}>
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
