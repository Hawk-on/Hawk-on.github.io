import React, { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

const GiscusKommentarar: React.FC = () => {
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
        repo="Hawk-on/Blog"
        repoId="R_kgDOR94FZA"
        category="Announcements"
        categoryId="DIC_kwDOR94FZM4C6-7g"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="no"
        loading="lazy"
      />
    </section>
  );
};

export default GiscusKommentarar;
