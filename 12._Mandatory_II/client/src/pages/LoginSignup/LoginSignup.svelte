<script>
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { navigate } from 'svelte-routing';
	import { user } from '../../stores/userStore.js';

    let rightPanelActive = false;
  
    function togglePanel() {
      rightPanelActive = !rightPanelActive;
    }
    
	let loginEmail = '';
  	let loginPassword = '';
	let confirmPassword = '';
	let signupPassword = '';
	let signupEmail = '';
	let name ='';

	async function login() {
		const response = await fetch('http://localhost:8080/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ loginEmail, loginPassword })
		});

		if (response.ok) {
		const data = await response.json();
		console.log(data)
		user.set(data);
		toast.success('Successfully logged in');

		navigate('/admin');
		} else {
		toast.error('Wrong email or password');
		}
	}

	async function signUp() {
    if (signupPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signupEmail, signupPassword, name })
    });

    if (response.ok) {
      const data = await response.json();
	  toast.success('Successfully signed up');
      user.set(data);
      navigate('/login');
    } else {
      toast.error('Signup failed');
    }
  }


  </script>
  
  <div class="container" class:right-panel-active={rightPanelActive}>
    <div class="form-container sign-up-container">
      <form on:submit|preventDefault={signUp}>
        <h1>Create Account</h1>
        <input type="text" bind:value={name} placeholder="Name" />
        <input type="email" bind:value={signupEmail} placeholder="Email" />
        <input type="password" bind:value={signupPassword} placeholder="Password" />
		<input type="password" bind:value={confirmPassword} placeholder="Confirm Password" />
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form on:submit|preventDefault={login}>
        <h1>Sign in</h1>
        <input type="email" bind:value={loginEmail} placeholder="Email" />
        <input type="password" bind:value={loginPassword} placeholder="Password" />
        <!-- <a href="#">Forgot your password?</a> -->
        <button>Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Log in with your personal information to come back to where you left of!</p>
          <button class="ghost" on:click={togglePanel}>Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details to create a new account!</p>
          <button class="ghost" on:click={togglePanel}>Sign Up</button>
        </div>
      </div>
    </div>
  </div>
  

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
	box-sizing: border-box;
}

h1 {
	font-weight: bold;
	margin: 0;
}

p {
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;

}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #304d9d;
	background-color: #304d9d;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
    color: #333;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.sign-in-container h1 {
    color:#333;
}

.sign-up-container h1{
    color: #333;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #304d9d;
	background: -webkit-linear-gradient(to right, #304d9d, #4161b7);
	background: linear-gradient(to right, #304d9d, #4161b7);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

</style>