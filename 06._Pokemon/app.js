//const express = require('express');

//this is now possible due to us adding type: "module"  in the package.json
import express from 'express';
import { randomInFromInterval } from './util/randomUtil.js';


const app = express();

app.use(express.static('public'));

import path from 'path';

//with module we can't use __dirname, one of the trade offs of using modules instead of common JS
// instead we import path from path and use path.resolve

// ======================== HTML ========================

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/frontpage/frontpage.html'));
});

app.get('/battle', (req, res) => {
    res.sendFile(path.resolve('./public/battle/battle.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve('./public/contact/contact.html'));
});

// ======================== Routes ========================

let currentPokemon;

app.get('/battlepokemon', (req, res) => {
    if (!currentPokemon || currentPokemon.strength <= 1) {
        const randomPokemonId = randomInFromInterval(1, 151);

        fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemonId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error getting pokemon');
                }
                return response.json();
            })
            .then(data => {
                const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                const url = data.sprites.other.home.front_default;
                const strength = randomInFromInterval(1, 10);

                currentPokemon = {
                    name,
                    url,
                    strength,
                };
                res.send({ data: currentPokemon });
            });
    } else {
        currentPokemon.strength--;
        res.send({ data: currentPokemon });
    }
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
