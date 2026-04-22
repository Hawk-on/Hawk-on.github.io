import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { spraakStore } from '../../stores/spraakStore';
import { omsetjingar } from '../../utils/i18n';

const Kontakt: React.FC = () => {
  const [email, setEmail] = useState('Laster…');
  const [phone, setPhone] = useState('Laster…');
  const aktivSpraak = useStore(spraakStore);
  const t = omsetjingar[aktivSpraak].contact;

  useEffect(() => {
    // Base64-koda verdiar for å lura enkle botar
    const eEnc = 'aGhsMTk4N0Bob3RtYWlsLmNvbQ==';
    const pEnc = 'KzQ3IDkxNyAxNyA1Nzg=';

    const decode = (str: string) => {
      try { return atob(str); } catch (e) { return ''; }
    };

    setEmail(decode(eEnc));
    setPhone(decode(pEnc));
  }, []);

  return (
    <div className="kontakt-lenker">
      <a href={`mailto:${email}`} className="kontakt-item" id="kontakt-epost" data-umami-event="kontakt-epost">
        <span className="kontakt-item__type" data-i18n="contact.emailLabel">E-post</span>
        <span className="kontakt-item__verdi">{email}</span>
      </a>

      <a href={`tel:${phone.replace(/ /g, '')}`} className="kontakt-item" id="kontakt-tlf" data-umami-event="kontakt-telefon">
        <span className="kontakt-item__type" data-i18n="contact.phoneLabel">Telefon</span>
        <span className="kontakt-item__verdi">{phone}</span>
      </a>

      <a href="https://github.com/Hawk-on" className="kontakt-item" target="_blank" rel="noopener" data-umami-event="kontakt-github">
        <span className="kontakt-item__type">GitHub</span>
        <span className="kontakt-item__verdi">github.com/Hawk-on</span>
      </a>

      <a href="https://www.linkedin.com/in/hawkon" className="kontakt-item" target="_blank" rel="noopener" data-umami-event="kontakt-linkedin">
        <span className="kontakt-item__type">LinkedIn</span>
        <span className="kontakt-item__verdi">linkedin.com/in/hawkon</span>
      </a>
    </div>
  );
};

export default Kontakt;
