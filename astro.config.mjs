import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://hawk-on.github.io',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
});
