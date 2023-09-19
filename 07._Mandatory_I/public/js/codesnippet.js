function copyCodeToClipboard() {
    const codeSnippet = document.getElementById('code-snippet');
    const textArea = document.createElement('textarea');
    textArea.value = codeSnippet.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', copyCodeToClipboard);