const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const highlightStylesheet = document.getElementById("highlight-stylesheet");

function setDarkMode(isDarkMode) {
  body.classList.toggle("dark-mode", isDarkMode);
  highlightStylesheet.href = isDarkMode
    ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-dark.min.css"
    : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-light.min.css";
}

const isDarkMode = localStorage.getItem("dark-mode") === "true";

darkModeToggle.checked = isDarkMode;

setDarkMode(isDarkMode);

darkModeToggle.addEventListener("change", () => {
  const isChecked = darkModeToggle.checked;
  setDarkMode(isChecked);

  localStorage.setItem("dark-mode", isChecked);
});
