<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Login from "./component/Login/Login.svelte"
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
      <Login/>
    </Route>

    <Route>
      <h3>404</h3>
      <p>Error 404</p>
    </Route>
  </main>
</Router>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
