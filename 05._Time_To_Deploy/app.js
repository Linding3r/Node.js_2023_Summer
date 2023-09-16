const express = require('express');
const app = express();

const inventionsJSON = require('./inventions.json');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/public/game.html');
});

app.get('/inventions', (req, res) => {
    res.sendFile(__dirname + '/public/inventions.html');
});

app.get('/api/inventions', (req, res) => {
    res.send(inventionsJSON);
});

app.get('/api/inventions/random', (req, res) => {
    const random = getRandomInt(inventionsJSON.length);
    res.send(inventionsJSON[random]);
});

app.get('/api/inventions/fiverandom', (req, res) => {
    const fiveInventions = [];
    for (let i = 0; i < 5; i++) {
        const random = getRandomInt(inventionsJSON.length);
        if (!fiveInventions.includes(inventionsJSON[random])) {
            fiveInventions.push(inventionsJSON[random]);
        } else {
            i--;
        }
    }
    res.send(fiveInventions);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});

