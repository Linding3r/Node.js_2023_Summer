<script>
    export let child;
    export let onShowLove;
    export let onEatCookie;

    import {fridgeMessages } from "../../store/fridgeMessages.js";

    let customFridgeMessage = "";

    export function submitFridgeMessage(){
        fridgeMessages.set([...$fridgeMessages, customFridgeMessage]);
        customFridgeMessage = "";
    }

</script>

<button on:click={() => onShowLove(child.name)}>Show 🩶</button>
<button on:click={() => onEatCookie(child.name)}>Eat 🍪</button>
<br>
<br>
<input bind:value={customFridgeMessage} placeholder="Custom Fridge Message"/>
<button on:click={submitFridgeMessage}>Submit Fridge Message</button>


<div 
    class:is-girl={child.isGirl}
    class:is-boy={!child.isGirl}
    class={child.blackSheep || 'not-a-black-sheep'}
>
    <h3>{child.name}</h3>
</div>




<style>
    .is-boy {
        color: rgb(81, 81, 197);
    }
    .is-girl {
        color: rgb(255, 187, 198);
    }
    .not-a-black-sheep {
        background-color: rgb(0, 183, 255);
    }
    .medium-black-sheep {
        background-color: rgb(63, 63, 63);
    }
    .ultra-black-sheep {
        background-color: rgb(0, 0, 0);
    }
</style>