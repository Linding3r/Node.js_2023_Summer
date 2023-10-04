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
    const img = button.querySelector(".icon");

    img.addEventListener("click", function() {
      button.click();
    });

    button.addEventListener("click", copyCodeToClipboard);
  });