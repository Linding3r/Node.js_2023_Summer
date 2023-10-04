document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector("#login-form");
  const messageDiv = document.getElementById('message');


  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = loginForm.elements["username"].value;
      const password = loginForm.elements["password"].value;
      console.log(username, password);

      fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.message === 'Login successful') {
              messageDiv.textContent = 'Login successful. Redirecting...';
              localStorage.setItem("isLoggedIn", true);
              document.getElementById("login-box").style.display = "none"
              document.getElementById("content-container").style.display= "block"
              setTimeout(() => {
                  window.location.href = '/admin';
              }, 2000);
          } else {
              messageDiv.textContent = 'Login failed. Please try again.';
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  });
});
