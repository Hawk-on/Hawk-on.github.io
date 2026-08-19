import { getCollection } from 'astro:content';

export async function GET() {
  const innlegg = await getCollection('blog', ({ data }) => {
    return !data.utkast;
  });

  const sorterteInnlegg = innlegg
    .sort((a, b) => {
      const datoA = a.data.oppdatertDato ?? a.data.publisertDato;
      const datoB = b.data.oppdatertDato ?? b.data.publisertDato;
      return datoB.valueOf() - datoA.valueOf();
    })
    .slice(0, 3)
    .map(i => ({
      tittel: i.data.tittel,
      dato: i.data.publisertDato,
      oppdatertDato: i.data.oppdatertDato,
      ingress: i.data.ingress,
      url: `https://hawk-on.github.io/blog/${i.id}/`
    }));

  return new Response(JSON.stringify(sorterteInnlegg), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
