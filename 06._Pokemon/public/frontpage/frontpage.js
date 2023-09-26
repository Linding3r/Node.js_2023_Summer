function randomInFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomPokemonId =randomInFromInterval(1, 151);

const url = `https://pokeapi.co/api/v2/pokemon/`;

fetch(url + randomPokemonId)
    .then(((response) => {
        if(!response.ok) {
            throw new Error('Error getting pokemon');
        }
        return response.json();  
    }))
    .then((data) => {
        data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        //data.name = data.name.replace(data.name.charAt(0), data.name.charAt(0).toUpperCase());
        console.log(data.name)
        document.getElementById("pokemon-name").innerText = data.name;
        document.getElementById("image-wrapper").innerHTML = `<img id="pokemon-image" src="${data.sprites.other.home.front_default}" alt="${data.name}">`;
        // with the one under you could do crossside scripting attacks if you don't sanitize the data
        // with the one above we define the source of the image and the alt text so you can't do crossside scripting attacks by adding a alert etc
        //document.getElementById("pokemon-image").src = data.sprites.other.home.front_default;
    });
