import React, { useState, useEffect } from 'react';

interface KjeldeKategori {
  id: string;
  tittel: string;
  farge: string;
  beskriving: string;
}

const kvalitetKategoriar: Record<string, KjeldeKategori> = {
  'A': { id: 'A', tittel: 'Høg etterrettelegheit', farge: '#10b981', beskriving: 'Offisielle dokument, internasjonale organisasjonar eller fagfellevurdert forsking.' },
  'B': { id: 'B', tittel: 'God kvalitet', farge: '#3b82f6', beskriving: 'Anerkjend journalistikk eller leiande tenketankar med redaksjonell kontroll.' },
  'C': { id: 'C', tittel: 'Fagleg OSINT', farge: '#f59e0b', beskriving: 'Tekniske analysar eller domenespesifikke kjelder. Krev ofte teknisk verifisering.' },
  'D': { id: 'D', tittel: 'Ustadfesta / Partisisk', farge: '#ef4444', beskriving: 'Lekkasjar eller medium med tydeleg politisk slagside. Krev store atterhald.' }
};

const habilitetKategoriar: Record<string, KjeldeKategori> = {
  '1': { id: '1', tittel: 'Uavhengig', farge: '#6b7280', beskriving: 'Ingen kjende økonomiske eller politiske bindingar som påverkar nøytraliteten.' },
  '2': { id: '2', tittel: 'Strategisk bias', farge: '#6b7280', beskriving: 'Finansiert av interesseorganisasjonar eller statar. Fagleg god, men med ein tydeleg agenda.' },
  '3': { id: '3', tittel: 'Partisisk aktør', farge: '#6b7280', beskriving: 'Kjelda er ein direkte part i soga eller er statskontrollert propaganda/PR.' }
};

const KjeldeInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('opne-kjeldeinfo', handleOpen);
    return () => window.removeEventListener('opne-kjeldeinfo', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="kjelde-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="kjelde-modal" onClick={e => e.stopPropagation()}>
        <header className="kjelde-modal__header">
          <h2>Metode for kjeldekritikk</h2>
          <button className="kjelde-modal__lukk" onClick={() => setIsOpen(false)}>×</button>
        </header>
        
        <div className="kjelde-modal__innhald">
          <h3>Kvalitet (Etterrettelegheit)</h3>
          <div className="kjelde-skala">
            {Object.values(kvalitetKategoriar).map(kat => (
              <div key={kat.id} className="kjelde-skala__item">
                <span className="kjelde-badge" style={{ backgroundColor: kat.farge }}>{kat.id}</span>
                <div>
                  <strong>{kat.tittel}</strong>
                  <p>{kat.beskriving}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '2rem' }}>Habilitet (Bias & Agenda)</h3>
          <div className="kjelde-skala">
            {Object.values(habilitetKategoriar).map(kat => (
              <div key={kat.id} className="kjelde-skala__item">
                <span className="kjelde-badge kjelde-badge--habilitet">{kat.id}</span>
                <div>
                  <strong>{kat.tittel}</strong>
                  <p>{kat.beskriving}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="kjelde-modal__note" style={{ marginTop: '2rem' }}>
            <p><em>Kjeldekritikk er ikkje binært. Ei kjelde kan ha topp teknisk kvalitet (A), men vera ein direkte part i soga (3). Me deklarerer begge dimensjonar for å gje eit ærleg bilete.</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KjeldeInfo;
