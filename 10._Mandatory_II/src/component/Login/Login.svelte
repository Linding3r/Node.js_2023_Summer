<script>
    let username = "";
    let password = "";
    
    async function login() {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        if (result.message === "Login successful") {
            // Login successful, redirect to authenticated page
            window.location.href = '/admin';
        } else {
            // Handle error here
            alert('Login failed!');
        }
    }
    </script>
    
    <input bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={login}>Login</button>
    