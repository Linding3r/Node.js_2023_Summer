<script>
    import {fridgeMessages } from "../../store/fridgeMessages.js";

</script>

<h2>=================================</h2>
{#each $fridgeMessages as message}
    <p>{message}</p>
{/each}
<h2>=================================</h2>

<slot></slot>
<p>_______________________________________________</p>
<h3>Svelte Family Home</h3>
<p>_______________________________________________</p>