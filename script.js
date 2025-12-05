// Language Content
const translations = {
    no: {
        nav: {
            about: "Om meg",
            experience: "Erfaring",
            education: "Utdanning",
            skills: "Ferdigheiter", // Ferdigheter -> Ferdigheiter
            contact: "Kontakt"
        },
        hero: {
            greeting: "Hei, eg er", // jeg -> eg
            title: "Full-Stack Utviklar & Teknologientusiast", // Utvikler -> Utviklar
            description: "Spesialist innan .NET, Azure og moderne webutvikling. Eg brenn for å lære nye domene og byggje robuste løysingar som skaper verdi.", // innen -> innan, Jeg brenner -> Eg brenn, lære -> lære, domener -> domene, bygge -> byggje, løsninger -> løysingar
            contact: "Kontakt meg",
            experience: "Sjå erfaring" // Se -> Sjå
        },
        section: {
            about: "Om meg",
            experience: "Arbeidserfaring",
            education: "Utdanning",
            skills: "Ferdigheiter", // Ferdigheter -> Ferdigheiter
            contact: "Ta kontakt"
        },
        about: {
            p1: "Eg bur med kone og barn i Bergen, men kjem opphavleg frå Osterøy. På fritida likar eg å byggje PC og spele dataspel, men eg er også veldig glad i å gå turar i fjell og skog, samt fiske og jakte.", // Jeg bor -> Eg bur, kommer opprinnelig -> kjem opphavleg, fra -> frå, fritiden -> fritida, liker jeg -> likar eg, bygge -> byggje, spille -> spele, gå turer -> gå turar
            p2: "Det som driv meg innan programutvikling er gleda av å lære nye domene og teknologiar. Det fantastiske med dette faget er variasjonen og den konstante straumen av nye ting å lære." // driver -> driv, innen -> innan, gleden -> gleda, domener -> domene, teknologier -> teknologiar, strømmen -> straumen
        },
        job: {
            developer: "Utviklar", // Utvikler -> Utviklar
            fullstack: "Full-Stack Utviklar" // Utvikler -> Utviklar
        },
        job1: {
            date: "Juni 2024 - No", // Nå -> No
            desc: "Arbeider med moderne helseteknologi, inkludert ny plattform på Azure Arc og Kubernetes."
        },
        job2: {
            date: "Nov 2021 - Mai 2024",
            desc: "Jobba med genetikkportalen.no og simple.no." // Jobbet -> Jobba
        },
        job3: {
            date: "Aug 2019 - Nov 2021",
            desc: "Jobba med sjølvbeteningsløysing (Interact) og prosessflytverktøy (Interact Flow)." // Jobbet -> Jobba, selvbetjeningsløsning -> sjølvbeteningsløysing
        },
        job4: {
            date: "Des 2012 - Aug 2019",
            title: "Vektar", // Vekter -> Vektar
            desc: "Hadde mange forskjellige oppdrag. Objektleiar, mobilvektar, områdevektar, arrangementsvakthald." // Objektleder -> Objektleiar, vekter -> vektar
        },
        edu1: {
            date: "Aug 2015 - Juni 2019",
            title: "Bachelor i informasjonsvitskap" // informasjonsvitenskap -> informasjonsvitskap
        },
        edu2: {
            date: "Aug 2011 - Des 2012",
            title: "Grunnskolelærarutdanning 5-10" // lærer -> lærar
        },
        edu3: {
            date: "Aug 2009 - Juni 2011",
            title: "Bachelor i engelsk"
        },
        edu4: {
            date: "Aug 2003 - Juni 2007",
            title: "Tekniske og allmenne fag (TAF)",
            desc: "Studiekompetanse og fagbrev som maskinarbeidar."
        },
        skills: {
            languages: "Språk",
            tech: "Teknologiar" // Teknologier -> Teknologiar
        },
        lang: {
            norwegian: "Norsk (Nynorsk)",
            english: "Engelsk (God)"
        },
        contact: {
            desc: "Eg er alltid interessert i ein hyggeleg prat om teknologi og moglegheiter." // Jeg -> Eg, en hyggelig -> ein hyggeleg, muligheter -> moglegheiter
        },
        footer: {
            text: "&copy; 2025 Håkon Høie Lønning. Laga med HTML, CSS og JS." // Bygget -> Laga, 2024 -> 2025 (User made this change manually just before, keeping it)
        }
    },
    en: {
        nav: {
            about: "About Me",
            experience: "Experience",
            education: "Education",
            skills: "Skills",
            contact: "Contact"
        },
        hero: {
            greeting: "Hi, I'm",
            title: "Full-Stack Developer & Tech Enthusiast",
            description: "Specialist in .NET, Azure, and modern web development. I am passionate about learning new domains and building robust solutions that create value.",
            contact: "Contact Me",
            experience: "See Experience"
        },
        section: {
            about: "About Me",
            experience: "Work Experience",
            education: "Education",
            skills: "Skills",
            contact: "Get in Touch"
        },
        about: {
            p1: "I live with my wife and children in Bergen, but originally come from Osterøy. In my spare time, I enjoy building PCs and playing video games. I also love hiking in the mountains and woods, as well as fishing and hunting.",
            p2: "What drives me in software development is the joy of learning new domains and technologies. The amazing thing about this field is the variety and the constant stream of new things to learn."
        },
        job: {
            developer: "Developer",
            fullstack: "Full-Stack Developer"
        },
        job1: {
            date: "Jun 2024 - Present",
            desc: "Working with modern health technology, including a new platform on Azure Arc and Kubernetes."
        },
        job2: {
            date: "Nov 2021 - May 2024",
            desc: "Worked on genetikkportalen.no and simple.no."
        },
        job3: {
            date: "Aug 2019 - Nov 2021",
            desc: "Worked with self-service solutions (Interact) and process flow tools (Interact Flow)."
        },
        job4: {
            date: "Dec 2012 - Aug 2019",
            title: "Security Guard",
            desc: "Had many different assignments. Site manager, mobile guard, area guard, event security."
        },
        edu1: {
            date: "Aug 2015 - Jun 2019",
            title: "Bachelor in Information Science"
        },
        edu2: {
            date: "Aug 2011 - Dec 2012",
            title: "Teacher Education (Grades 5-10)"
        },
        edu3: {
            date: "Aug 2009 - Jun 2011",
            title: "Bachelor in English"
        },
        edu4: {
            date: "Aug 2003 - Jun 2007",
            title: "Technical and General Subjects (TAF)",
            desc: "Higher education entrance qualification and certificate of apprenticeship as a machinist."
        },
        skills: {
            languages: "Languages",
            tech: "Technologies"
        },
        lang: {
            norwegian: "Norwegian (Native)",
            english: "English (Good)"
        },
        contact: {
            desc: "I am always interested in a nice chat about technology and opportunities."
        },
        footer: {
            text: "&copy; 2024 Håkon Høie Lønning. Built with HTML, CSS, and JS."
        }
    }
};

// Language Handling
let currentLang = 'no'; // Default fallback

function initLanguage() {
    // Force default to Norwegian (Nynorsk)
    currentLang = 'no';

    // Apply lang
    updateContent();
    updateLangButton();
}

function toggleLanguage() {
    currentLang = currentLang === 'no' ? 'en' : 'no';
    updateContent();
    updateLangButton();
}

function updateContent() {
    document.documentElement.lang = currentLang;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, i) => obj[i], translations[currentLang]);

        if (value) {
            element.textContent = value;
        }
    });
}

function updateLangButton() {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
        // Show the option we can switch TO
        btn.textContent = currentLang === 'no' ? 'EN' : 'NO';
    }
}

// Event Listener for Language Toggle
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
});


// Existing Animation & Logic
// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.section-title, .timeline-item, .card, .about-content, .hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});
