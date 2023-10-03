<script>
    import Traktor from './lib/Traktor.svelte';
    import Ground from './lib/Ground.svelte';
    import Farmer from './lib/Farmer.svelte';

    const wheels = ['🛞', '🛞', '🛞', '🛞'];
    let showTractor = false;
    const welcomeMessage = 'Welcome to the main component';
    const farmerName = "Farmer John";
</script>

<h1 id="welcome-message">{welcomeMessage}</h1>
<h2>This is the main component</h2>


<Farmer name={farmerName}/>
<button on:click={() => (showTractor = !showTractor)}>
    {#if showTractor}
        Hide Tractor
    {:else}
        Show Tractor
    {/if}
</button>

{#if showTractor}
    <Traktor {wheels} />
    <Ground />
{/if}

<style>
    #welcome-message {
        color: rgb(150, 210, 62);
    }
</style>
