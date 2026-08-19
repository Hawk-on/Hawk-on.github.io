export const omsetjingar = {
  no: {
    nav: { about: 'Om meg', experience: 'Erfaring', education: 'Utdanning', skills: 'Ferdigheiter', contact: 'Kontakt' },
    hero: {
      kicker: 'Full-Stack Utviklar · .NET · Azure',
      role: 'Full-Stack Utviklar',
      description: '.NET, Azure og moderne webutvikling. Eg likar å lære nye domene og byggje robuste løysingar som skapar verdi.',
      contact: 'Kontakt meg',
      experience: 'Sjå erfaring'
    },
    section: { about: 'Om meg', experience: 'Arbeidserfaring', education: 'Utdanning', skills: 'Ferdigheiter', contact: 'Ta kontakt' },
    about: {
      p1: 'Eg bur med kone og born på Vestlandet, og kjem opphavleg frå Osterøy. Fritida mi liker eg å bruke på PC, fiske og turar i fjell og skog.',
      p2: 'Det som driv meg innan programutvikling er gleda av å lære nye domene og teknologiar. Det fantastiske med dette faget er variasjonen og den konstante straumen av nye ting å lære.'
    },
    job: { developer: 'Utviklar', fullstack: 'Full-Stack Utviklar', senioradvisor: 'Seniorrådgjevar' },
    job0: { date: 'August 2026 – No', desc: 'Arbeider med utvikling og forvaltning av digitale tenester i offentleg sektor.' },
    job1: { date: 'Juni 2024 – Juni 2026', desc: 'Jobba med moderne helseteknologi, inkludert ny plattform på Azure Arc og Kubernetes.' },
    job2: { date: 'Nov 2021 – Mai 2024', desc: 'Jobba med genetikkportalen.no og simple.no.' },
    job3: { date: 'Aug 2019 – Nov 2021', desc: 'Jobba med sjølvbeteningsløysing (Interact) og prosessflytverktøy (Interact Flow).' },
    job4: { date: 'Des 2012 – Aug 2019', title: 'Vektar', desc: 'Hadde mange forskjellige oppdrag. Objektleiar, mobilvektar, områdevektar, arrangementsvakthald.' },
    edu1: { date: 'Aug 2015 – Juni 2019', title: 'Bachelor i informasjonsvitskap' },
    edu2: { date: 'Aug 2011 – Des 2012', title: 'Grunnskolelærarutdanning 5–10' },
    edu3: { date: 'Aug 2009 – Juni 2011', title: 'Bachelor i engelsk' },
    edu4: { date: 'Aug 2003 – Juni 2007', title: 'Tekniske og allmenne fag (TAF)', desc: 'Studiekompetanse og fagbrev som maskinarbeidar.' },
    skills: { languages: 'Språk', tech: 'Teknologiar' },
    lang: { norwegian: 'Norsk (Nynorsk)', english: 'Engelsk (God)' },
    contact: { desc: 'Eg er alltid interessert i ein prat om teknologi og moglegheiter.', emailLabel: 'E-post', phoneLabel: 'Telefon' }
  },
  en: {
    nav: { about: 'About Me', experience: 'Experience', education: 'Education', skills: 'Skills', contact: 'Contact' },
    hero: {
      kicker: 'Full-Stack Developer · .NET · Azure',
      role: 'Full-Stack Developer',
      description: '.NET, Azure, and modern web development. I enjoy learning new domains and building robust solutions that create value.',
      contact: 'Contact Me',
      experience: 'See Experience'
    },
    section: { about: 'About Me', experience: 'Work Experience', education: 'Education', skills: 'Skills', contact: 'Get in Touch' },
    about: {
      p1: 'I live with my wife and children on the west coast of Norway, and originally come from Osterøy. In my spare time I enjoy PCs, fishing, and hiking in the mountains and woods.',
      p2: 'What drives me in software development is the joy of learning new domains and technologies. The amazing thing about this field is the variety and the constant stream of new things to learn.'
    },
    job: { developer: 'Developer', fullstack: 'Full-Stack Developer', senioradvisor: 'Senior Adviser' },
    job0: { date: 'August 2026 – Present', desc: 'Working on the development and operation of digital public services.' },
    job1: { date: 'Jun 2024 – Jun 2026', desc: 'Worked with modern health technology, including a new platform on Azure Arc and Kubernetes.' },
    job2: { date: 'Nov 2021 – May 2024', desc: 'Worked on genetikkportalen.no and simple.no.' },
    job3: { date: 'Aug 2019 – Nov 2021', desc: 'Worked with self-service solutions (Interact) and process flow tools (Interact Flow).' },
    job4: { date: 'Dec 2012 – Aug 2019', title: 'Security Guard', desc: 'Many different assignments: site manager, mobile guard, area guard, event security.' },
    edu1: { date: 'Aug 2015 – Jun 2019', title: 'Bachelor in Information Science' },
    edu2: { date: 'Aug 2011 – Dec 2012', title: 'Teacher Education (Grades 5–10)' },
    edu3: { date: 'Aug 2009 – Jun 2011', title: 'Bachelor in English' },
    edu4: { date: 'Aug 2003 – Jun 2007', title: 'Technical and General Subjects (TAF)', desc: 'Higher education entrance qualification and certificate as machinist.' },
    skills: { languages: 'Languages', tech: 'Technologies' },
    lang: { norwegian: 'Norwegian (Native)', english: 'English (Proficient)' },
    contact: { desc: "I'm always up for a chat about technology and opportunities.", emailLabel: 'Email', phoneLabel: 'Phone' }
  }
};

export type Spraak = keyof typeof omsetjingar;
