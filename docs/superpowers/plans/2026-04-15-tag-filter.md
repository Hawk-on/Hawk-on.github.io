# Tag-filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Legg til ein horisontal tag-strip på forsida som live-filtrerer innleggslista ved klikk.

**Architecture:** Tags vert bygd statisk i Astro frå eksisterande `Astro.glob`-data, sortert etter frekvens. Klient-JS håndterer filtrering via `data-tags` på `<li>`-element og `hidden`-attributt. Ingen nye filer — alt i `index.astro` og `global.css`.

**Tech Stack:** Astro 4.x, vanilla JS, CSS custom properties

---

### Task 1: Legg til CSS i global.css

**Files:**
- Modify: `src/styles/global.css` — legg til etter `.tag:hover`-blokka (linje ~330)

- [ ] **Steg 1: Les fila for å finne rett innsettingspunkt**

Les `src/styles/global.css` rundt linje 327–335 for å stadfeste at `.tag:hover`-blokka er siste tag-relaterte regel.

- [ ] **Steg 2: Legg til CSS-klassane**

Legg til følgjande CSS etter `.tag:hover { ... }`-blokka:

```css
/* Tag-filter strip */
.tag-strip {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: var(--lys-grå) transparent;
}

.tag--filter {
  background: none;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag--filter.aktiv {
  color: var(--raud);
  border-color: var(--raud);
}

.tag-teljing {
  font-family: var(--skrift-kode);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--grå);
  margin-bottom: 0.75rem;
  min-height: 1.2em;
}
```

---

### Task 2: Oppdater index.astro

**Files:**
- Modify: `src/pages/index.astro`

Gjeldande tilstand å lesa fyrst:

```astro
---
import Grunnoppsett from '../layouts/Grunnoppsett.astro';
import { formaterDato } from '../utils/dato';

const base = import.meta.env.BASE_URL;
const innlegg = await Astro.glob('./*.md');
const sortertInnlegg = innlegg
  .sort((a, b) => new Date(b.frontmatter.dato).valueOf() - new Date(a.frontmatter.dato).valueOf());
---
```

- [ ] **Steg 1: Legg til tag-frekvensliste i frontmatter-blokka**

Erstatt den eksisterande frontmatter-blokka (linje 1–9) med:

```astro
---
import Grunnoppsett from '../layouts/Grunnoppsett.astro';
import { formaterDato } from '../utils/dato';

const base = import.meta.env.BASE_URL;
const innlegg = await Astro.glob('./*.md');
const sortertInnlegg = innlegg
  .sort((a, b) => new Date(b.frontmatter.dato).valueOf() - new Date(a.frontmatter.dato).valueOf());

const tagFrekvens = new Map<string, number>();
sortertInnlegg.forEach(i =>
  (i.frontmatter.tags ?? []).forEach((t: string) =>
    tagFrekvens.set(t, (tagFrekvens.get(t) ?? 0) + 1)
  )
);
const sorterteTags = [...tagFrekvens.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([t]) => t);
---
```

- [ ] **Steg 2: Legg til tag-strip og teljing mellom hero og innleggsseksjonen**

Finn denne linja i HTML-delen:

```astro
    <section>
      <p class="seksjon-tittel">Alle innlegg</p>
```

Og erstatt med:

```astro
    <div class="tag-strip" id="tag-strip">
      <button class="tag tag--filter aktiv" data-tag="alle">Alle</button>
      {sorterteTags.map(tag => (
        <button class="tag tag--filter" data-tag={tag}>#{tag}</button>
      ))}
    </div>
    <p class="tag-teljing" id="tag-teljing"></p>

    <section>
      <p class="seksjon-tittel">Alle innlegg</p>
```

- [ ] **Steg 3: Legg til data-tags på kvart innlegg-element**

Finn:

```astro
            <li class="artikkel-kort">
```

Erstatt med:

```astro
            <li class="artikkel-kort" data-tags={tags.join(',')}>
```

- [ ] **Steg 4: Legg til inline JS-script nedst i Grunnoppsett-blokka**

Finn linja `  </div>` rett før `</Grunnoppsett>` og legg til scriptet slik:

```astro
  </div>

  <script>
    (function () {
      const strip = document.getElementById('tag-strip');
      const teljing = document.getElementById('tag-teljing');
      const kort = document.querySelectorAll('.artikkel-kort');
      const totalt = kort.length;

      strip.addEventListener('click', function (e) {
        const knapp = e.target.closest('[data-tag]');
        if (!knapp) return;
        const val = knapp.dataset.tag;

        strip.querySelectorAll('[data-tag]').forEach(k => k.classList.remove('aktiv'));
        knapp.classList.add('aktiv');

        let synlege = 0;
        kort.forEach(function (li) {
          const tags = li.dataset.tags ? li.dataset.tags.split(',') : [];
          const vis = val === 'alle' || tags.includes(val);
          li.hidden = !vis;
          if (vis) synlege++;
        });

        teljing.textContent = synlege === totalt
          ? ''
          : 'Viser ' + synlege + ' av ' + totalt + ' innlegg';
      });
    })();
  </script>
</Grunnoppsett>
```

---

### Task 3: Verifiser og commit

**Files:**
- `src/pages/index.astro`
- `src/styles/global.css`

- [ ] **Steg 1: Køyr dev-server**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog" && npm run dev
```

Opne http://localhost:4321 (eller den porten Astro brukar). Sjekk:
- Tag-stripa vises under hero, over «Alle innlegg»
- «Alle»-knappen er aktiv (raud) ved innlasting
- Klikk på `#geopolitikk` → berre geopolitikk-innlegg synlege, teljing vises
- Klikk `#geopolitikk` igjen → alle innlegg tilbake, teljing forsvinn
- Klikk «Alle» → same som over
- Stripa scrollar horisontalt på smal skjerm

- [ ] **Steg 2: Commit**

```bash
cd "C:\Utvikling\Git\Anna utvikling\Blog"
git add src/pages/index.astro src/styles/global.css
git commit -m "$(cat <<'EOF'
feat: legg til horisontal tag-filter strip på forsida

Klikk på ein tag skjuler innlegg utan taggen. Klikk igjen eller
på «Alle» tilbakestiller lista. Teljing vises ved aktivt filter.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Steg 3: Push**

```bash
git push
```

---

## Sjølvgjennomgang

**Spec-dekning:**
- ✅ Horisontal strip mellom hero og innleggslista
- ✅ Tags sortert etter frekvens
- ✅ «Alle»-knapp aktiv som standard
- ✅ Klikk skjuler innlegg utan taggen (`hidden`)
- ✅ Klikk aktiv tag → tilbakestill
- ✅ Teljing («Viser X av Y innlegg»)
- ✅ CSS følgjer designsystemet (`--raud`, `--lys-grå`, `--skrift-kode`)
- ✅ Mobil: overflow-x scroll

**Ingen placeholders att.**
