fetch("/welcomeMessage?user=Thomas")
.then(response => response.json())
.then(result => {
    console.log(result)
    const message = document.getElementById("welcome-message");
    message.innerText = result.data;
});