<script>
    import Home from './pages/Home/Home.svelte';
    import Admin from './pages/Admin/Admin.svelte';
    import LoginSignup from './pages/LoginSignup/LoginSignup.svelte';
    import ResetPassword from './pages/ResetPassword/ResetPassword.svelte';
    import Random from './pages/Random/Random.svelte';
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { Router, Link, Route } from 'svelte-routing';
    import PrivateRoute from './component/PrivateRoutes/PrivateRoute.svelte';
    import { user } from './stores/userStore.js';
    import { BASE_URL } from './stores/global.js';
    import LostPassword from './pages/LostPassword/LostPassword.svelte';

    async function checkAuthStatus() {
        console.log('Checking auth');
        try {
            const response = await fetch($BASE_URL + '/api/checkAuth', {
                credentials: 'include',
            });
            const data = await response.json();
            if (data.isAuthenticated) {
                const userData = { name: data.name, isAdmin: data.is_admin };
                user.set(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                user.set(null);
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Failed to check authentication status', error);
        }
    }

    async function logout() {
        try {
            const response = await fetch($BASE_URL + '/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                user.set(null);
                toast(data.message, { icon: '✌️' });
            } else {
                toast.error('Logout failed.');
            }
        } catch (error) {
            console.error('Failed to logout', error);
            toast.error('An error occurred while logging out.');
        }
    }

    onMount(async () => {
        await checkAuthStatus();
        if ($user) {
            toast(`Welcome back ${$user.name}!`, { icon: '👋' });
        }
    });
</script>

<Toaster />

<Router>
    {#if $user}
        <nav class="sidebar">
            <img src="/img/l_logo.png" alt="Logo" style="height: 100px; margin-bottom:40px;" />
            <Link to="/"><p>Home</p></Link>
            <Link to="/random"><p>Random</p></Link>
            {#if $user.isAdmin === 1}
                <Link to="/admin"><p>Admin</p></Link>
            {/if}
            <a on:click={logout}><p>Logout</p></a>
        </nav>
    {/if}

    <main>
        {#if $user}
            <Route path="/" component={Home} />
            <Route path="/random" component={Random} />
            {#if $user.isAdmin === 1}
                <Route path="/admin"><Admin /></Route>
            {/if}
        {:else}
            <Route path="*" component={LoginSignup} />
            <Route path="/forgottenPassword" component={LostPassword} />
            <Route path="/reset-password" component={ResetPassword} />
        {/if}
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

    .logout-button {
        background: none;
        border: none;
        padding: 15px;
        color: #f0f0f0;
        text-decoration: none;
        margin-bottom: 10px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    .sidebar p:hover {
        background-color: #3857ad;
    }

    main {
        margin-left: 100px;
        padding: 20px;
    }
</style>
