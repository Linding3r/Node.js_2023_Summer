fetch("/battlepokemon")
.then((response) => response.json())
.then((data) => {
    const nameHeader = document.getElementById("pokemon-name")
    nameHeader.innerText = data.data.name;

    const strengthHeader = document.getElementById("pokemon-strength")
    strengthHeader.innerText = "Remaining strength: " + data.data.strength;

    const imageWrapperDiv = document.getElementById("image-wrapper")
    imageWrapperDiv.innerHTML = `<img id="pokemon-image" src="${data.data.url}" alt="${data.data.name}">`;
});

