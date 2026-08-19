import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  tagName: string;
}

export const useInnhaldstabell = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const kropp = document.getElementById('artikkel-kropp');
    if (!kropp) return;

    const headingElements = Array.from(kropp.querySelectorAll('h2, h3'));
    
    const mappedHeadings = headingElements.map((el, i) => {
      if (!el.id) el.id = `seksjon-${i}`;
      return {
        id: el.id,
        text: el.textContent || '',
        tagName: el.tagName
      };
    });

    setHeadings(mappedHeadings);

    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsOpen(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.5, 1] }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveId(id);
  };

  return {
    headings,
    activeId,
    isOpen,
    setIsOpen,
    scrollToSection
  };
};
