import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { spraakStore } from '../../stores/spraakStore';
import { formaterDato } from '../../utils/dato';

export interface Innlegg {
  tittel: string;
  dato: string;
  ingress: string;
  url: string;
}

interface BloggSveipProps {
  initialInnlegg?: Innlegg[];
}

const BloggSveip: React.FC<BloggSveipProps> = ({ initialInnlegg }) => {
  const [innlegg, setInnlegg] = useState<Innlegg[]>(initialInnlegg ?? []);
  const [loading, setLoading] = useState(!initialInnlegg);
  const [mounted, setMounted] = useState(false);
  const aktivSpraak = useStore(spraakStore);

  useEffect(() => {
    setMounted(true);
    if (initialInnlegg) return;
    fetch('/siste-innlegg.json')
      .then(res => res.json())
      .then(data => {
        setInnlegg(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [initialInnlegg]);

  if (loading || innlegg.length === 0) return null;

  const visSpraak = mounted ? aktivSpraak : 'no';

  return (
    <section id="siste-fra-bloggen" className="innfading synleg">
      <p className="seksjon-kicker">{visSpraak === 'no' ? 'Siste frå bloggen' : 'Latest from the blog'}</p>
      <div className="blogg-sveip">
        {innlegg.map((post, idx) => (
          <div key={idx} className="blogg-kort">
            <p className="blogg-kort__dato">{formaterDato(post.dato, 'kort', visSpraak === 'no' ? 'nn' : 'en')}</p>
            <h3 className="blogg-kort__tittel">
              <a href={post.url}>{post.tittel}</a>
            </h3>
            <p className="blogg-kort__ingress">{post.ingress}</p>
          </div>
        ))}
      </div>
      <a href="/blog/" className="knapp" style={{ marginTop: '2rem' }}>
        {visSpraak === 'no' ? 'Besøk bloggen →' : 'Visit the blog →'}
      </a>
    </section>
  );
};

export default BloggSveip;
