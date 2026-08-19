import { BLOGG_BASE } from '../../utils/rutar';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const base = BLOGG_BASE;
  const innlegg = await getCollection('blog', ({ data }) => {
    return import.meta.env.DEV || !data.utkast;
  });
  
  const sorterteInnlegg = innlegg
    .sort((a, b) => {
      const datoA = a.data.oppdatertDato ?? a.data.publisertDato;
      const datoB = b.data.oppdatertDato ?? b.data.publisertDato;
      return datoB.valueOf() - datoA.valueOf();
    });

  return rss({
    title: 'hawk-on',
    description: 'Analysar av politikk, økonomi og teknologi.',
    site: context.site!.toString(),
    items: sorterteInnlegg.map((post) => ({
      title: post.data.tittel,
      pubDate: post.data.oppdatertDato ?? post.data.publisertDato,
      description: post.data.ingress || '',
      link: `${base}/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body || '')),
    })),
  });
}
