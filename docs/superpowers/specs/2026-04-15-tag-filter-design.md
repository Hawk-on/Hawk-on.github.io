---
name: Tag-filter ordsky på forsida
description: Horisontal tag-strip under hero på index.astro med live-filtrering av innleggslista
type: project
---

# Tag-filter — Design

## Mål

Legg til ein horisontal tag-strip mellom hero og innleggslista på forsida. Klikk på ein tag skjuler innlegg som ikkje har taggen. Klikk på «Alle» eller aktiv tag tilbakestiller lista.

---

## Plassering

`src/pages/index.astro` — mellom `<section class="forsida-hero">` og `<section>` (innleggslista).

---

## Rendering

- Tags hentast frå `innlegg.frontmatter.tags` (same `Astro.glob` som allereie finst)
- Deduplicerast med `Set`, sorterast etter frekvens (flest innlegg øvst)
- Rendererast som statisk HTML — ingen JS-frameworks, ingen server-round-trip

```astro
<!-- Bygg tag-frekvensliste i frontmatter-blokka -->
const tagFrekvens = new Map<string, number>();
sortertInnlegg.forEach(i => (i.frontmatter.tags ?? []).forEach(t => tagFrekvens.set(t, (tagFrekvens.get(t) ?? 0) + 1)));
const sorterteTags = [...tagFrekvens.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
```

---

## HTML-struktur

### Tag-strip
```html
<div class="tag-strip" id="tag-strip">
  <button class="tag tag--filter aktiv" data-tag="alle">Alle</button>
  {sorterteTags.map(tag => (
    <button class="tag tag--filter" data-tag={tag}>#{tag}</button>
  ))}
</div>
<p class="tag-teljing" id="tag-teljing"></p>
```

### Innleggsliste — legg til `data-tags` på kvart `<li>`
```html
<li class="artikkel-liste__element" data-tags={innlegg.frontmatter.tags?.join(',') ?? ''}>
```

---

## Klient-JS (inline `<script>` i index.astro)

```js
(function () {
  const strip = document.getElementById('tag-strip');
  const teljing = document.getElementById('tag-teljing');
  const innlegg = document.querySelectorAll('.artikkel-liste__element');
  const totalt = innlegg.length;

  function oppdaterTeljing(synlege) {
    teljing.textContent = synlege === totalt
      ? ''
      : `Viser ${synlege} av ${totalt} innlegg`;
  }

  strip.addEventListener('click', function (e) {
    const knapp = e.target.closest('[data-tag]');
    if (!knapp) return;
    const val = knapp.dataset.tag;

    strip.querySelectorAll('[data-tag]').forEach(k => k.classList.remove('aktiv'));
    knapp.classList.add('aktiv');

    let synlege = 0;
    innlegg.forEach(function (li) {
      const tags = li.dataset.tags ? li.dataset.tags.split(',') : [];
      const vis = val === 'alle' || tags.includes(val);
      li.hidden = !vis;
      if (vis) synlege++;
    });
    oppdaterTeljing(synlege);
  });
})();
```

---

## CSS (legg til i `global.css`)

```css
.tag-strip {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
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
  background: transparent;
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

## Filer som vert endra

| Fil | Endring |
|-----|---------|
| `src/pages/index.astro` | Tag-frekvensliste, strip-HTML, `data-tags` på `<li>`, inline JS |
| `src/styles/global.css` | `.tag-strip`, `.tag--filter`, `.tag--filter.aktiv`, `.tag-teljing` |

---

## Verifikasjon

1. `npm run dev`
2. Forsida viser tag-stripa under hero
3. Klikk på `#geopolitikk` → berre geopolitikk-innlegg synlege, teljing oppdatert
4. Klikk på `#geopolitikk` igjen → alle innlegg attende
5. Klikk «Alle» → same som over
6. Mørk modus: stripa brukar `--raud` (dark variant) og `--lys-grå` korrekt
7. Smal skjerm (mobil): stripa scrollar horisontalt
