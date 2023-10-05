function copyCodeToClipboard(event) {
  const codeSnippet = event.target.previousElementSibling;
  const textToCopy = codeSnippet.textContent.trim(); // removes whitespace from both ends of the string aka codesnippet
  const textArea = document.createElement('textarea');
  textArea.value = textToCopy;
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

  const copyButtons2 = document.querySelectorAll('.copy-button2');

copyButtons.forEach((button) => {
    const img = button.querySelector(".icon");

    img.addEventListener("click", function() {
      button.click();
    });

    button.addEventListener("click", copyCodeToClipboard);
  });