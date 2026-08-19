import React, { useEffect } from 'react';

const Sok: React.FC = () => {
  useEffect(() => {
    const initPagefind = () => {
      const searchElement = document.querySelector("#search");
      if (!searchElement) return;

      // Sjekk om PagefindUI alt er lasta
      if ((window as any).PagefindUI) {
        // Fjern eventuelt gamalt innhald før re-init
        searchElement.innerHTML = '';
        
        new (window as any).PagefindUI({
          element: "#search",
          showSubResults: true,
          translations: {
            placeholder: "Søk i analysar...",
            clear_search: "Tøm",
            load_more: "Sjå fleire",
            search_label: "Søk",
            filters_label: "Filter",
            zero_results: "Fann ingen ting for [SEARCH_TERM]",
            many_results: "Fann [COUNT] treff for [SEARCH_TERM]",
            one_result: "Fann 1 treff for [SEARCH_TERM]",
            alt_search: "Ingen treff for [SEARCH_TERM]. Viser treff for [DIFFERENT_TERM] i staden",
            search_suggestion: "Prøv å søkja etter [SUGGESTION] i staden",
            searching: "Søkjer..."
          }
        });
      }
    };

    // Last ressursar viss dei manglar
    if (!document.querySelector('link[href*="pagefind-ui.css"]')) {
      const link = document.createElement('link');
      link.href = '/pagefind/pagefind-ui.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (!(window as any).PagefindUI) {
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.onload = initPagefind;
      document.head.appendChild(script);
    } else {
      initPagefind();
    }

    // Lytt på Astro-navigering for å re-initialisera
    document.addEventListener('astro:page-load', initPagefind);
    
    return () => {
      document.removeEventListener('astro:page-load', initPagefind);
    };
  }, []);

  return (
    <div id="search" className="pagefind-container">
      {/* Pagefind vert injisert her */}
    </div>
  );
};

export default Sok;
