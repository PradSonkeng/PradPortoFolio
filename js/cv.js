// Gestion des thèmes sombre et clair

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeBody = document.getElementById('themeBody');

    // Récupérer le thème sauvegardé ou utiliser le thème préféré du système
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Déterminer le thème initial
    let currentTheme = savedTheme || (prefersDarkScheme ? 'dark' : 'light');
    
    // Appliquer le thème initial
    applyTheme(currentTheme);
    
    // Ajouter l'écouteur d'événement au bouton de basculement
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
    
    /**
     * Applique le thème spécifié au document
     * @param {string} theme - 'light' ou 'dark'
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            themeBody.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        } else {
            themeBody.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    }
});
