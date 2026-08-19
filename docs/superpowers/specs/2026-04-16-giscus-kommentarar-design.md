---
name: Giscus-kommentarar på artiklar
description: Giscus-widget (GitHub Discussions) på alle artiklar med dark-mode-synk
type: project
---

# Giscus-kommentarar — Design

## Mål

Legg til ein Giscus-kommentarwidget nedst på kvar artikkel. Kommentarar lagrast som GitHub Discussions i `Hawk-on/Blog` og er synlege både på bloggen og i GitHub-grensesnittet.

---

## Plassering

`src/layouts/Artikkel.astro` — mellom `</article>` og `<nav class="artikkel-tilbake-nav">`.

---

## Arkitektur

Eigen komponentfil `src/components/GiscusKommentarar.astro` som inneheld:
- Giscus `<script>`-taggen med all konfigurasjon
- Inline JS for dark-mode-synk

Montert i `Artikkel.astro` via `import` og `<GiscusKommentarar />`.

---

## Giscus-konfigurasjon

| Parameter | Verdi |
|-----------|-------|
| `data-repo` | `Hawk-on/Blog` |
| `data-repo-id` | `R_kgDOR94FZA` |
| `data-category` | `General` |
| `data-category-id` | `DIC_kwDOR94FZM4C6-7h` |
| `data-mapping` | `pathname` |
| `data-strict` | `0` |
| `data-reactions-enabled` | `1` |
| `data-emit-metadata` | `0` |
| `data-input-position` | `top` |
| `data-lang` | `no` |
| `data-loading` | `lazy` |

---

## Dark-mode-synk

Initial tema vert sett etter at Giscus-iframen melder seg klar (via `window.message`-event). Vidare endringar vert fanga av ein `MutationObserver` på `document.documentElement[data-theme]`, som sender `postMessage` til iframen.

Tema-mapping:
- `data-theme="light"` → Giscus `light`
- `data-theme="dark"` (eller OS-preferanse mørk utan eksplisitt val) → Giscus `dark_dimmed`

---

## HTML-struktur

```astro
<!-- src/components/GiscusKommentarar.astro -->
<section class="giscus-seksjon" aria-label="Kommentarar">
  <script src="https://giscus.app/client.js"
    data-repo="Hawk-on/Blog"
    data-repo-id="R_kgDOR94FZA"
    data-category="General"
    data-category-id="DIC_kwDOR94FZM4C6-7h"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="top"
    data-theme="light"
    data-lang="no"
    data-loading="lazy"
    crossorigin="anonymous"
    async>
  </script>
</section>

<script>
  (function () {
    function giscusTema() {
      const attr = document.documentElement.getAttribute('data-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return (attr === 'dark' || (!attr && prefersDark)) ? 'dark_dimmed' : 'light';
    }

    function sendTema(tema) {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (!iframe) return;
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: tema } } },
        'https://giscus.app'
      );
    }

    window.addEventListener('message', function handler(e) {
      if (e.origin !== 'https://giscus.app') return;
      if (e.data?.giscus?.discussion !== undefined) {
        sendTema(giscusTema());
        window.removeEventListener('message', handler);
      }
    });

    new MutationObserver(() => sendTema(giscusTema()))
      .observe(document.documentElement, { attributeFilter: ['data-theme'] });
  })();
</script>
```

---

## CSS

```css
.giscus-seksjon {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--lys-grå);
}
```

---

## Filer som vert endra

| Fil | Endring |
|-----|---------|
| `src/components/GiscusKommentarar.astro` | Ny fil — komponent med Giscus-script og dark-mode-synk |
| `src/layouts/Artikkel.astro` | Import + montering av `<GiscusKommentarar />` |
| `src/styles/global.css` | `.giscus-seksjon`-klasse |

---

## Verifikasjon

1. `npm run dev`
2. Opne ein artikkel — Giscus-widgeten skal vises under artikkelteksten
3. Byt til mørk modus — Giscus-iframen skal skifte til `dark_dimmed` utan reload
4. Logg inn med GitHub og legg att ein testkommentar
5. Sjekk at diskusjonen dukkar opp under `Hawk-on/Blog → Discussions → General`
