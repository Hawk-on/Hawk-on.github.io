import React, { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

interface Props {
  /** Stabil nøkkel for kommentartråden — artikkelens slug, ikkje URL-stien. */
  term: string;
}

const GiscusKommentarar: React.FC<Props> = ({ term }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return currentTheme === 'dark' || (!currentTheme && prefersDark) ? 'dark' : 'light';
    };

    setTheme(getTheme());

    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="giscus-container" style={{ marginTop: '4rem', borderTop: '1px solid var(--lys-grå)', paddingTop: '2rem' }}>
      <Giscus
        id="comments"
        repo="Hawk-on/hawk-on.github.io"
        repoId="MDEwOlJlcG9zaXRvcnkxNTUzODU2MDk="
        category="Announcements"
        categoryId="DIC_kwDOCUL_Cc4DDwbg"
        mapping="specific"
        term={term}
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </section>
  );
};

export default GiscusKommentarar;
