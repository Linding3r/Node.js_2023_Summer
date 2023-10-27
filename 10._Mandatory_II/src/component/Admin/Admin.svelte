<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    
    onMount(async () => {
        const response = await fetch('/checkAuth');
        const data = await response.json();
        if (!data.isAuthenticated) {
            push('/login');
        }
    });
</script>
    

<h2>Admin Page</h2>