<script>
    import Child from "../Child/Child.svelte";
    import {fridgeMessages } from "../../store/fridgeMessages.js";

    export let name;
    export let children;

    let cookieJar = ['🍪','🍪','🍪','🍪','🍪','🍪'];

    function handleShowLove(childName){
        console.log(`My name is ${name} and ${childName} loves me!`);
    }

    function handleEatCookie(childName){
        cookieJar.pop();
        //make the object reactive after pop()
        cookieJar = cookieJar;
        console.log(`${childName} ate a cookie! There are ${cookieJar.length} left`)
        console.log(cookieJar)
        if(cookieJar.length === 0){
            fillCookieJar();
        }
    }

    function fillCookieJar(){
        cookieJar.push('🍪','🍪','🍪','🍪','🍪','🍪');
        console.log(`Cookie jar filled! There are ${cookieJar.length} cookies in the jar!`)
    }

    function clearFridgeMessages(){
        fridgeMessages.set(["Fridge Messages Below:"]);
    }
</script>

<h1>{name}</h1>
<button on:click = {clearFridgeMessages}>Clear Fridge Messages</button>
<p>{cookieJar}</p>


<!-- Show all the children for this parent-->

{#each children as child}
    <Child child={child} onShowLove={handleShowLove} onEatCookie={handleEatCookie}/>
  {/each}
