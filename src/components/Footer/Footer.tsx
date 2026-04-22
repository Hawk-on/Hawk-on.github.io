import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="nettstad-footer">
      <div className="container--brei">
        <div className="nettstad-footer__indre">
          <span>© {new Date().getFullYear()} Håkon Hole Lønning</span>
          <span>Bygd med <a href="https://astro.build">Astro</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
