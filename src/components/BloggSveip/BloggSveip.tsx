import React, { useState, useEffect } from 'react';

interface Innlegg {
  tittel: string;
  dato: string;
  ingress: string;
  url: string;
}

const BloggSveip: React.FC = () => {
  const [innlegg, setInnlegg] = useState<Innlegg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://hawk-on.github.io/Blog/siste-innlegg.json')
      .then(res => res.json())
      .then(data => {
        setInnlegg(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || innlegg.length === 0) return null;

  return (
    <section id="siste-fra-bloggen" className="innfading synleg">
      <p className="seksjon-kicker">Siste frå bloggen</p>
      <div className="blogg-sveip">
        {innlegg.map((post, idx) => (
          <div key={idx} className="blogg-kort">
            <p className="blogg-kort__dato">{new Date(post.dato).toLocaleDateString('nn-NO', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <h3 className="blogg-kort__tittel">
              <a href={post.url}>{post.tittel}</a>
            </h3>
            <p className="blogg-kort__ingress">{post.ingress}</p>
          </div>
        ))}
      </div>
      <a href="https://hawk-on.github.io/Blog" className="knapp" style={{ marginTop: '2rem' }}>Besøk bloggen →</a>
    </section>
  );
};

export default BloggSveip;
