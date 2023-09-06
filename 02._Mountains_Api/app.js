const express = require('express');
const app = express();
const Ajv = require('ajv');
const ajv = new Ajv();

app.use(express.json());

// added mountain.json with 80 mountains around the world
const mountainsJson = require('./mountains.json');

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
    required: ['name', 'height', 'countries'],
    additionalProperties: false,
};

// Compile the schema
const validate = ajv.compile(mountainSchema);

app.get('/', (req, res) => {
    res.send('Mountain API running 🥳');
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
    const reqCountry = req.params.country.charAt(0).toUpperCase() + req.params.country.slice(1).toLowerCase();
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
    const country = req.params.country.charAt(0).toUpperCase() + req.params.country.slice(1).toLowerCase();
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
        reqMountain.id = mountainsJson.length + 1;
        mountainsJson.push(reqMountain);
        res.send(req.body);
    } else {
        res.status(400).json({ error: 'Invalid request body format' });
    }
});

app.delete('/mountains/:id', (req, res) => {
    const reqId = Number(req.params.id);
    const mountainIndex = mountainsJson.findIndex(mountain => mountain.id === reqId);

    if (mountainIndex !== -1) {
        mountainsJson.splice(mountainIndex, 1);
        res.status(204).send();
        console.log('Successfully deleted mountain with ID:',reqId)
    } else {
        res.status(404).json({ error: 'No mountain found with id:', reqId });
    }
});

// PORT 4000 for deployement
const PORT = 4000;
//const PORT = 8080;

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
