const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const highlightStylesheet = document.getElementById('highlight-stylesheet');
const navbar = document.getElementById('navbar');
const navLogoDark = document.getElementById('nav-logo-dark');
const navLogoLight = document.getElementById('nav-logo-light');

function setDarkMode(isDarkMode) {
    body.classList.toggle('dark-mode', isDarkMode);
    highlightStylesheet.href = isDarkMode
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-light.min.css';
    navbar.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    if (document.getElementById('list-example')) {
        const listExample = document.getElementById('list-example');
        listExample.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    }
    navLogoDark.classList.toggle('d-none', isDarkMode);
    navLogoLight.classList.toggle('d-none', !isDarkMode);
    if(document.getElementById('banner')) {
        const banner = document.getElementById('banner');
        banner.setAttribute('style', isDarkMode ? 'background:radial-gradient(circle, rgba(43,48,53,1) 0%, rgba(129,144,160,1) 100%)' : 'background:#657ED4');
    }
}

const isDarkMode = localStorage.getItem('dark-mode') === 'true';

darkModeToggle.checked = isDarkMode;

setDarkMode(isDarkMode);

darkModeToggle.addEventListener('change', () => {
    const isChecked = darkModeToggle.checked;
    setDarkMode(isChecked);

    localStorage.setItem('dark-mode', isChecked);
});
