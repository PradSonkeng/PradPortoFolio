// -----THEME SWITCHER-----
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement; // Get the root element

themeBtn.addEventListener("click", () => {
    // Check the current theme and toggle it
    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
    }
});