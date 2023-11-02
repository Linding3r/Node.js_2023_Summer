<script>
  import Home from "./pages/Home/Home.svelte";
  import Admin from "./pages/Admin/Admin.svelte";
  import LoginSignup from "./pages/LoginSignup/LoginSignup.svelte";
  import { onMount } from 'svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { Router, Link, Route } from "svelte-routing";

  onMount(() => {
    toast("Welcome to Mandatory II", {
      icon: '👋',
    });
  });
</script>

<Toaster />

<Router>
  <nav class="sidebar">
    <img src="/img/l_logo.png" alt="Logo" style="height: 100px; margin-bottom:40px;">
    <Link to="/"><p>Home</p></Link>
    <Link to="/login"><p>Login</p></Link>
    <Link to="/admin"><p>Admin</p></Link>
  </nav>

  <main>
    <Route path="/" component={Home}></Route>
    <Route path="/login"><LoginSignup /></Route>
    <Route path="/admin"><Admin /></Route>
  </main>
</Router>

<style>
  .sidebar {
    height: 100vh;
    width: 100px;
    background-color: #304d9d;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .sidebar p {
    display: block;
    padding: 15px;
    color: #f0f0f0;
    text-decoration: none;
    margin-bottom: 10px;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .sidebar p:hover {
    background-color: #3857ad;
  }
  
  main {
    margin-left: 100px;
    padding: 20px;
  }
</style>

