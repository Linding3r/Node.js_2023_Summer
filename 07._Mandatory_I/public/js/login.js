const message = localStorage.getItem('errorMessage');

if (message === 'notloggedin') {
  errorMessage.textContent = 'You are not logged in. Please log in to access this page.';
  errorMessage.style.display = 'block';
} else if (message === 'tokeninvalid') {
  errorMessage.textContent = 'Your session has expired. Please log in again.';
  errorMessage.style.display = 'block';
}

// Clear the error message from local storage
localStorage.removeItem('errorMessage');

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  
  if(username === "test" && password === "test"){
    localStorage.setItem("isLoggedIn", true)
    document.getElementById("login-box").style.display = "none"
    document.getElementById("content-container").style.display= "block"
  }
});