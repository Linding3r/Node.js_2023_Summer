<script>
    import { Router, Route, Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import toast, {Toaster} from 'svelte-french-toast'

    function handleLogin(event) {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)),
	      {
          loading: 'Saving...',
          success: 'Settings saved!',
          error: 'Could not save.',
        }
      );
    }
    
  </script>
  

      <div id="login-box">
          <h1>Sign in</h1>
        <form on:submit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Login"
            aria-label="Login"
            autocomplete="nickname"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autocomplete="current-password"
            required
          />
          <Toaster/>
          <button type="button" on:click={handleLogin}>Login</button>
        </form>
      </div>


  