<script>
  import { onMount } from 'svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { Router, Link, Route } from "svelte-routing";


  onMount(() => {
		toast.success("Welcome to Mandatory II", {
      icon: '👋',
})});
</script>

<Router>
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="login">Login</Link>
    </nav>
  </header>

  <main>
    <Route path="/">
      <h3>Home</h3>
      <p>Home sweet home...</p>
    </Route>

    <Route path="about">
      <h3>About</h3>
      <p>That's what it's all about!</p>
    </Route>

    <Route path="login">
      <h1>Sign in</h1>
      <form>
        <input
          type="text"
          name="login"
          placeholder="Login"
          aria-label="Login"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          required
        />
      </form>
      <button type="submit" class="contrast">Login</button>
    </Route>

    <Route>
      <h3>404</h3>
      <p>Error 404</p>
    </Route>
  </main>
</Router>

<style>

</style>
