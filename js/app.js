
const html = document.documentElement;

// Clés localStorage
const STORAGE_KEYS = {
    theme: 'theme',
    language: 'lng',
    // Ajoute ici d'autres prefs : 'particleCount', 'fontSize', etc.
};

// ====================== THÈME ======================
function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    updateParticlesColor();
}

function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
    applyTheme(savedTheme);

    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
}

// ====================== PARTICULES ======================
let particlesContainer = null;

function updateParticlesColor() {
    const color = getComputedStyle(html).getPropertyValue('--part-color').trim();
    if (!particlesContainer) return;
    
    const particles = particlesContainer.querySelectorAll('.particule');
    particles.forEach(p => {
        p.style.backgroundColor = color;
    });
}

function createParticles(count = 50) {
    if (!particlesContainer) {
        particlesContainer = document.getElementById('particules');
        if (!particlesContainer) return;
    }

    particlesContainer.innerHTML = ''; // Nettoyage propre

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particule';
        const size = Math.random() * 20 + 10;
        
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            background-color: var(--part-color);
            animation-duration: ${Math.random() * 5 + 5}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(p);
    }
}

// ====================== INTERNATIONALISATION ======================
let i18nInitialized = false;

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = i18next.t(key);
    });
}

function initI18n() {
    const savedLang = localStorage.getItem(STORAGE_KEYS.language) || 'fr';

    i18next.use(i18nextHttpBackend).init({
        lng: savedLang,
        fallbackLng: 'fr',
        debug: false,
        backend: {
            loadPath: 'locales/{{lng}}.json'
        }
    }).then(() => {
        i18nInitialized = true;
        updateContent();
        updateLanguageButton();
    });
}

function updateLanguageButton() {
    const langBtn = document.getElementById('langBtn');
    if (!langBtn) return;

    const currentLang = i18next.language || 'fr';
    const flag = document.getElementById('langFlag');
    const text = document.getElementById('langText');

    if (flag) flag.textContent = currentLang === 'fr' ? '🇫🇷' : '🇬🇧';
    if (text) text.textContent = currentLang.toUpperCase();
}

function switchLanguage() {
    const current = i18next.language;
    const newLang = current === 'fr' ? 'en' : 'fr';

    i18next.changeLanguage(newLang, () => {
        updateContent();
        localStorage.setItem(STORAGE_KEYS.language, newLang);
        updateLanguageButton();
    });
}

// ====================== INITIALISATION GLOBALE ======================
function initApp() {
    // Thème (déjà hydraté dans le <head>)
    initTheme();

    // Particules
    createParticles(50);

    // Langue
    initI18n();

    // Bouton langue
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', switchLanguage);
    }

    // Observer les changements de thème pour mettre à jour les particules
    const observer = new MutationObserver(() => {
        updateParticlesColor();
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
}

// Lancement quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initApp);

function updateOrbitRadius() {
    const wrap = document.querySelector('.hero-photo-wrap');
    if (!wrap) return;
    const size = wrap.offsetWidth;
    const radius = size * 0.5 + 20; // ~ moitié + marge
    document.querySelector('.orbit-container').style.setProperty('--orbit-radius', `${radius}px`);
}

window.addEventListener('resize', updateOrbitRadius);
document.addEventListener('DOMContentLoaded', updateOrbitRadius);


