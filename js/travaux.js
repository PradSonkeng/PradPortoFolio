// -----THEME SWITCHER-----
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement; // Get the root element

// ------PARTICLES------
const partColor = ["var(--part-color)"];
// Code for generating particles
function CreateParticules(){
    const container = document.getElementById("particules");
    if (!container) return;

    //vider le conteneur avant de recréer
    container.innerHTML = "";
    
    for (let i = 0; i < 50; i++) {
        const p = document.createElement("div");
        p.className = "particule";
        const size = Math.random() * 20 + 10;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            background-color: ${partColor};
            animation-duration: ${Math.random() * 5 + 5}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(p);
    }

}
// Mettree a jour les couleurs des part existante
function updatepart() {
    const particules = document.querySelectorAll(".particule");
    particules.forEach(particule => {
        particule.style.backgroundColor = partColor;
    });
}
// Gest theme

themeBtn.addEventListener("click", () => {
    // Check the current theme and toggle it
    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
    }
    updatepart();
});

// Initialisation des part au chrgement de la page
document.addEventListener("DOMContentLoaded", () => {
    CreateParticules();
});

//------ i18next ------
i18next.use(i18nextHttpBackend).init({
    lng: localStorage.getItem('lng') || 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de secours
    debug: true,
    backend: {
        loadPath: 'locales/{{lng}}.json' // Chemin vers les fichiers de traduction
    }
})
.then(() => {
    updateContent(); // Met à jour le contenu après l'initialisation
});
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}
// -----LANGUAGE SWITCHER-----
const langBtn = document.getElementById("langBtn");

langBtn.addEventListener("click", () => {
    const currentLang = i18next.language;
    const newLang = currentLang === "fr" ? "en" : "fr";

    i18next.changeLanguage(newLang, () => {
        updateContent();
        localStorage.setItem('lng', newLang); // Sauvegarde la langue choisie
        // Met à jour le texte et le drapeau du bouton
        document.getElementById("langFlag").textContent = newLang === "fr" ? "🇫🇷" : "🇬🇧";
        document.getElementById("langText").textContent = newLang.toUpperCase();
    });
});
