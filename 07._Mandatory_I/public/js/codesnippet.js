function copyCodeToClipboard(event) {
    const codeSnippet = event.target.previousElementSibling;
    const textArea = document.createElement('textarea');
    textArea.value = codeSnippet.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach((button) => {
    button.addEventListener('click', copyCodeToClipboard);
});