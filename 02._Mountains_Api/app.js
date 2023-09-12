const express = require('express');
const app = express();
const Ajv = require('ajv');
const ajv = new Ajv();

app.use(express.json());

// added mountain.json with 80 mountains around the world
let mountainsJson = require('./mountains.json');

let currentId = 80;

const mountainSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        height: { type: 'number' },
        countries: {
            type: 'array',
            items: { type: 'string' },
        },
    },
    additionalProperties: false,
};

// Compile the schema
const validate = ajv.compile(mountainSchema);

function formatReqString(str) {
    const words = str.split(' ');
    const capitalizedWords = words.map(word => {
        if (word.length === 0) {
            return word;
        }
        const firstChar = word.charAt(0).toUpperCase();
        const restOfString = word.slice(1).toLowerCase();
        return firstChar + restOfString;
    });

    return capitalizedWords.join(' ');
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/mountains', (req, res) => {
    res.send({ data: mountainsJson });
});

app.get('/mountains/:id', (req, res) => {
    const reqId = parseInt(req.params.id);
    const mountain = mountainsJson.find(mountain => mountain.id === reqId);

    if (mountain) {
        res.send({ data: mountain });
    } else {
        res.status(404).send(`No mountains found with id: ${req.params.id}`);
    }
});

app.get('/by-country/:country', (req, res) => {
    const reqCountry = formatReqString(req.params.country);
    const mountains = mountainsJson.filter(mountain => mountain.countries.includes(reqCountry));

    if (mountains.length > 0) {
        res.send({ data: mountains });
    } else {
        res.status(404).send('No mountains found in the specified country.');
    }
});

app.get('/above-height/:height', (req, res) => {
    const height = req.params.height;
    const mountains = mountainsJson.filter(mountain => mountain.height > height);

    if (mountains.length > 0) {
        res.send({ data: mountains });
    } else {
        res.status(404).send('No mountains found above the specified height.');
    }
});

app.get('/under-height/:height', (req, res) => {
    const height = req.params.height;
    const mountains = mountainsJson.filter(mountain => mountain.height < height);

    if (mountains.length > 0) {
        res.send({ data: mountains });
    } else {
        res.status(404).send('No mountains found under the specified height.');
    }
});

app.get('/countries/:amount', (req, res) => {
    const amount = parseInt(req.params.amount);
    const mountains = mountainsJson.filter(mountain => mountain.countries.length === amount);

    if (mountains.length > 0) {
        res.send({ data: mountains });
    } else {
        res.status(404).send('No mountains with that amount of countries.');
    }
});

app.get('/tallest-in-country/:country', (req, res) => {
    const country = formatReqString(req.params.country);
    const mountainsByReqCountry = mountainsJson.filter(mountain => mountain.countries.includes(country));
    let tallestMountain;

    for (const mountain of mountainsByReqCountry) {
        if (!tallestMountain || mountain.height > tallestMountain.height) {
            tallestMountain = mountain;
        }
    }

    if (tallestMountain) {
        res.send({ data: tallestMountain });
    } else {
        res.status(404).send('No mountains found in specified country');
    }
});

app.post('/mountains', (req, res) => {
    const reqMountain = req.body;

    if (validate(reqMountain)) {
        reqMountain.id = ++currentId;
        mountainsJson.push(reqMountain);
        res.send(req.body);
    } else {
        res.status(400).send({ error: 'Invalid request body format' });
    }
});

app.patch('/mountains/:id', (req, res) => {
    const reqId = Number(req.params.id);
    const editedMountain = req.body;
    const mountainIndex = mountainsJson.findIndex(mountain => mountain.id === reqId);

    if (mountainIndex === -1) {
        res.status(404).send(`No mountains found with id: ${reqId}`);
    } else if (!validate(editedMountain)) {
        res.status(400).send({ error: 'Invalid request body format' });
    } else {
        editedMountain.id = reqId;
        mountainsJson[mountainIndex] = {...mountainsJson[mountainIndex], ...editedMountain};
        res.send(req.body);
    }
});

app.delete('/mountains/:id', (req, res) => {
    const reqId = Number(req.params.id);
    const mountainIndex = mountainsJson.findIndex(mountain => mountain.id === reqId);

    if (mountainIndex !== -1) {
        mountainsJson.splice(mountainIndex, 1);
        res.send(`Successfully deleted mountain with id: ${reqId}`);
    } else {
        res.status(404).send({ error: `No mountain found with id: ${reqId}` });
    }
});

app.delete('/by-name/:name', (req, res) => {
    const reqName = formatWord(req.params.name);
    const mountainIndex = mountainsJson.findIndex(mountain => mountain.name === reqName);

    if (mountainIndex !== -1) {
        mountainsJson.splice(mountainIndex, 1);
        res.send(`Successfully deleted ${reqName}`);
    } else {
        res.status(404).send({ error: `No mountain found found by the name: ${reqName}` });
    }
});

const PORT = 8080;

// error will return a "stacktrace" if there is an error, if no error it's "undefined"
app.listen(PORT, error => {
    if (error) {
        console.log('Error starting the server', error);
        return;
    }
    console.log('Server is running on port', PORT);
});

// Use this when deploying!
module.exports = app;
