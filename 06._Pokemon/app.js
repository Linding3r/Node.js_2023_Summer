//const express = require('express');

//this is now possible due to us adding type: "module"  in the package.json
import express , {urlencoded} from 'express';
import { randomInFromInterval } from './util/randomUtil.js';

const app = express();

app.use(express.static('public'));
app.use(urlencoded({ extended: true }));


//with module we can't use __dirname, one of the trade offs of using modules instead of common JS
// instead we import path from path and use path.resolve
// ===================== Read Pages =====================

import { frontpagePage, battlePage, contactPage } from './util/preparePages.js';


// ======================== HTML ========================

app.get('/', (req, res) => {
    res.send(frontpagePage);
    //res.sendFile(path.resolve('./public/frontpage/frontpage.html'));
});

app.get('/battle', (req, res) => {
    res.send(battlePage);
});

app.get('/contact', (req, res) => {
    res.send(contactPage);
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
                const url = data.sprites.other["official-artwork"].front_default;
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


app.post('/contact', (req, res) => {
    console.log('Ok thanks for the message', req.body);
    res.redirect('/');
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
