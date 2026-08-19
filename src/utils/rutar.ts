/**
 * Rotstien til bloggdelen av nettstaden.
 *
 * Bloggen låg tidlegare i eit eige repo med Astro-konfigurasjonen `base: '/Blog'`,
 * og sidene brukte `import.meta.env.BASE_URL`. Etter samanslåinga er dette éin
 * nettstad utan `base`, og bloggen ligg under `src/pages/blog/`. Bruk denne
 * konstanten i staden for BASE_URL, som no ville løysa seg til tom streng.
 */
export const BLOGG_BASE = '/blog';
