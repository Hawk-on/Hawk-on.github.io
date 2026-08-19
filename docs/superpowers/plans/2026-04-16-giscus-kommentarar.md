# Giscus-kommentarar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Legg til Giscus-kommentarwidget (GitHub Discussions) nedst på kvar artikkel, med automatisk dark-mode-synk.

**Architecture:** Eigen `GiscusKommentarar.astro`-komponent inneheld Giscus-scripttagen og inline JS for dark-mode-synk via `MutationObserver` + `postMessage`. Komponenten monterast i `Artikkel.astro` mellom `</article>` og `<nav class="artikkel-tilbake-nav">`. CSS-klasse i `global.css`.

**Tech Stack:** Astro 4.x, Giscus (GitHub Discussions-backed), vanilla JS

---

### Task 1: Legg til CSS i global.css

**Files:**
- Modify: `src/styles/global.css` — legg til etter `.tag-teljing`-blokka (linje 364)

- [ ] **Steg 1: Les fila for å stadfeste innsettingspunktet**

Les `src/styles/global.css` linje 360–370 og stadfest at linje 364 er `}` som avsluttar `.tag-teljing`-blokka og linje 366 startar `/* Artikkel-side */`.

- [ ] **Steg 2: Legg til CSS-klassen**

Legg til følgjande etter `.tag-teljing { … }`-blokka og før `/* Artikkel-side */`-kommentaren:

```css
.giscus-seksjon {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--lys-grå);
}
```

Resultatet rundt innsettingspunktet skal sjå slik ut:

```css
.tag-teljing {
  font-family: var(--skrift-kode);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--grå);
  margin-bottom: 0.75rem;
  min-height: 1.2em;
}

.giscus-seksjon {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--lys-grå);
}

/* Artikkel-side */
```

- [ ] **Steg 3: Commit**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog"
git add src/styles/global.css
git commit -m "$(cat <<'EOF'
style: legg til .giscus-seksjon i global.css

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Lag GiscusKommentarar.astro-komponenten

**Files:**
- Create: `src/components/GiscusKommentarar.astro`

Kontroller at `src/components/`-mappa eksisterer (`ls src/components/` — om ho ikkje finst, opprett ho).

- [ ] **Steg 1: Opprett fila med heile innhaldet**

Lag `src/components/GiscusKommentarar.astro` med dette innhaldet (ingen frontmatter-blokk nødvendig):

```astro
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

    // Set initial theme after Giscus iframe is ready
    window.addEventListener('message', function handler(e) {
      if (e.origin !== 'https://giscus.app') return;
      if (e.data?.giscus?.discussion !== undefined) {
        sendTema(giscusTema());
        window.removeEventListener('message', handler);
      }
    });

    // Sync on theme toggle
    new MutationObserver(() => sendTema(giscusTema()))
      .observe(document.documentElement, { attributeFilter: ['data-theme'] });
  })();
</script>
```

- [ ] **Steg 2: Commit**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog"
git add src/components/GiscusKommentarar.astro
git commit -m "$(cat <<'EOF'
feat: legg til GiscusKommentarar-komponent

Giscus-widget med dark-mode-synk via MutationObserver + postMessage.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Monter komponenten i Artikkel.astro

**Files:**
- Modify: `src/layouts/Artikkel.astro`

Gjeldande tilstand å lesa fyrst (linje 1–20):

```astro
---
import Grunnoppsett from './Grunnoppsett.astro';
import { formaterDato } from '../utils/dato';

interface Props {
  tittel: string;
  dato: string | Date;
  ingress?: string;
  tags?: string[];
  lesetid?: number;
}

const { frontmatter } = Astro.props;
const { tittel, dato, ingress, tags = [], lesetid } = frontmatter;
const base = import.meta.env.BASE_URL;

const datoFormatert = formaterDato(dato, 'lang');
---
```

- [ ] **Steg 1: Legg til import i frontmatter-blokka**

Finn linja:
```astro
import { formaterDato } from '../utils/dato';
```

Erstatt med:
```astro
import { formaterDato } from '../utils/dato';
import GiscusKommentarar from '../components/GiscusKommentarar.astro';
```

- [ ] **Steg 2: Monter komponenten i HTML-delen**

Finn linja (linje ~39):
```astro
    </article>
```

Rett etter denne linja, legg til:
```astro
    <GiscusKommentarar />
```

Resultatet skal sjå slik ut:

```astro
    <article class="artikkel-kropp">
      <slot />
    </article>

    <GiscusKommentarar />

    <div class="les-framgang" id="les-framgang" aria-hidden="true"></div>
```

- [ ] **Steg 3: Commit**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog"
git add src/layouts/Artikkel.astro
git commit -m "$(cat <<'EOF'
feat: monter GiscusKommentarar i Artikkel-layouten

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Verifiser og push

**Files:**
- Ingen endringar

- [ ] **Steg 1: Køyr dev-server**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog" && npm run dev
```

Opne ein artikkel (t.d. `http://localhost:4321/petrodollaren-og-imperiet-sitt-sjolvmord`).

Sjekk:
- Giscus-widgeten vises under artikkelteksten, over «← Tilbake til alle innlegg»
- Ein skiljelinje (border-top) separerer widgeten frå artikkelen
- Widgeten lastar inn GitHub Discussions-grensesnittet (kan ta eit sekund)
- Reaksjonar (👍 ❤️ osv.) er synlege

- [ ] **Steg 2: Test dark-mode-synk**

Klikk på ☀/☽-knappen i navigasjonen. Giscus-iframen skal skifte frå `light` til `dark_dimmed` (mørkare bakgrunn) utan sidereload.

- [ ] **Steg 3: Push**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog" && git push
```

---

## Sjølvgjennomgang

**Spec-dekning:**
- ✅ Ny `GiscusKommentarar.astro`-komponent
- ✅ Montert i `Artikkel.astro` mellom `</article>` og tilbake-nav
- ✅ Alle Giscus-parametrar sette (repo, repoId, category, categoryId, mapping, reactions)
- ✅ Dark-mode-synk: initial tema + MutationObserver
- ✅ Tema-mapping: `light` / `dark_dimmed`
- ✅ `.giscus-seksjon` CSS-klasse

**Ingen placeholders att.**
