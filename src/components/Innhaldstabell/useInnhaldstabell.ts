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
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
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
