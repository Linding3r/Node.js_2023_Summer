<script>
    import Home from './component/Home/Home.svelte';
    import Parent from './component/Parent/Parent.svelte';
    const parents = ['Anders', 'Caroline'];
    const children = [
        {
            name: 'Gustav',
            blackSheep: 'medium-black-sheep',
        },
        {
            name: 'Sarah',
            isGirl: true,
        },
        {
            name: 'Alexander',
            blackSheep: 'ultra-black-sheep',
        },
    ];
</script>

<Home>
    <h4>Welcome message above the door!</h4>
    <!--{#each paraents as parentName}
    <Parent name={parentName} children={children}/>
  {/each}-->
    <Parent name={parents[0]} {children} />
    <Parent name={parents[1]} {children} />
</Home>
