import { useState, useEffect } from 'react';

export const useLeseProgresjon = (manueltLesetid?: number) => {
  const [prosent, setProsent] = useState(0);
  const [minIgjen, setMinIgjen] = useState(0);
  const [visTidIgjen, setVisTidIgjen] = useState(false);
  const [visTilToppen, setVisTilToppen] = useState(false);
  const [totalMin, setTotalMin] = useState(manueltLesetid || 1);

  useEffect(() => {
    const kropp = document.getElementById('artikkel-kropp');
    if (!manueltLesetid && kropp) {
      const ord = (kropp.textContent || '').trim().split(/\s+/).length;
      setTotalMin(Math.max(1, Math.round(ord / 200)));
    }

    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();

    const onScroll = () => {
      const el = document.documentElement;
      const scrollMax = el.scrollHeight - el.clientHeight;
      if (scrollMax <= 0) return;
      
      const scrollPct = el.scrollTop / scrollMax;
      const currentPct = Math.round(scrollPct * 100);
      
      setProsent(Math.min(scrollPct * 100, 100));
      setMinIgjen(Math.max(0, Math.round(totalMin * (1 - scrollPct))));
      setVisTidIgjen(scrollPct > 0.02 && scrollPct < 0.98);
      setVisTilToppen(el.scrollTop > el.clientHeight * 0.5);

      milestones.forEach(m => {
        if (currentPct >= m && !reached.has(m)) {
          reached.add(m);
          try {
            if ((window as any).umami) {
              (window as any).umami.track('les-djupn', { prosent: m, tittel: document.title });
            }
          } catch (e) {}
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [totalMin, manueltLesetid]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    prosent,
    minIgjen,
    visTidIgjen,
    visTilToppen,
    scrollToTop
  };
};
