// Adding event listener to inject contact info after user interaction or delay
// This prevents simple scrapers from seeing the email/phone in the initial HTML

document.addEventListener('DOMContentLoaded', () => {
    // Obfuscated data
    const e_user = 'hhl1987';
    const e_host = 'hotmail.com';
    const p_num = '917 17 578';
    const p_prefix = '+47';

    const emailLink = document.getElementById('contact-email');
    const phoneLink = document.getElementById('contact-phone');

    if (emailLink) {
        const fullEmail = `${e_user}@${e_host}`;
        emailLink.href = `mailto:${fullEmail}`;
        const span = emailLink.querySelector('.text');
        if (span) span.textContent = fullEmail;
    }

    if (phoneLink) {
        const fullPhone = `${p_prefix} ${p_num}`;
        phoneLink.href = `tel:${p_prefix}${p_num.replace(/ /g, '')}`;
        const span = phoneLink.querySelector('.text');
        if (span) span.textContent = fullPhone;
    }
});
