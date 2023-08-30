const express = require("express");
const app = express();

// added mountain.json with 80 mountains around the world
const mountainsJson = require("./mountains.json");

// added this as I missed the exercise point stating: Don’t work with database or use a persistence layer
// Though showing how I would have done it without persitence layer
/*const mountainsJson = [
    {
        "id": 1,
        "name": "Mount Everest",
        "height": 8848,
        "countries": [
            "Nepal",
            "China"
        ]
    },
    {
        "id": 2,
        "name": "K2",
        "height": 8611,
        "countries": [
            "Pakistan",
            "China"
        ]
    },
    {
        "id": 3,
        "name": "Kangchenjunga",
        "height": 8586,
        "countries": [
            "Nepal",
            "India"
        ]
    },
    {
        "id": 4,
        "name": "Lhotse",
        "height": 8516,
        "countries": [
            "Nepal",
            "China"
        ]
    },
    {
        "id": 5,
        "name": "Makalu",
        "height": 8485,
        "countries": [
            "Nepal",
            "China"
        ]
    },
    {
        "id": 6,
        "name": "Cho Oyu",
        "height": 8188,
        "countries": [
            "Nepal",
            "China"
        ]
    },
    {
        "id": 7,
        "name": "Dhaulagiri",
        "height": 8167,
        "countries": [
            "Nepal"
        ]
    },
    {
        "id": 8,
        "name": "Manaslu",
        "height": 8163,
        "countries": [
            "Nepal"
        ]
    },
    {
        "id": 9,
        "name": "Nanga Parbat",
        "height": 8126,
        "countries": [
            "Pakistan"
        ]
    },
    {
        "id": 10,
        "name": "Annapurna",
        "height": 8091,
        "countries": [
            "Nepal"
        ]
    }
];*/

app.get("/", (req, res) => {
    res.send(mountainsJson);
});

app.get("/:id", (req, res) => {
    const reqId = parseInt(req.params.id);
    const mountain = mountainsJson.find(mountain => mountain.id === reqId);

    res.send(mountain);
});

app.get("/by-country/:country", (req, res) => {
    const reqCountry = req.params.country.toLowerCase;
    const mountains = mountainsJson.filter(mountain => mountain.countries.includes(reqCountry));

    if (mountains.length > 0) {
        res.send(mountains);
    } else {
        res.status(404).send("No mountains found in the specified country.");
    }
});

app.get("/above-height/:height", (req, res) => {
    const height = req.params.height;
    const mountains = mountainsJson.filter(mountain => mountain.height > height);

    if(mountains.length > 0) {
        res.send(mountains);
    } else {
        res.status(404).send("No mountains found above the specified height.");
    }
});

app.get("/under-height/:height", (req, res) => {
    const height = req.params.height;
    const mountains = mountainsJson.filter(mountain => mountain.height < height);

    if(mountains.length > 0) {
        res.send(mountains);
    } else {
        res.status(404).send("No mountains found under the specified height.");
    }
});

app.get("/countries/:amount", (req, res) => {
    const amount = parseInt(req.params.amount);
    const mountains = mountainsJson.filter(mountain => mountain.countries.length === amount);

    if(mountains.length > 0) {
        res.send(mountains);
    } else {
        res.status(404).send("No mountains with that amount of countries.");
    }
});

app.get("/tallest-in-country/:country", (req, res) => {
    const country = req.params.country;
    const mountainsByReqCountry = mountainsJson.filter(mountain => mountain.countries.includes(country));
    let tallestMountain;

    for (const mountain of mountainsByReqCountry){
        if(!tallestMountain || mountain.height > tallestMountain.height){
            tallestMountain = mountain;
        }
    }

    if(tallestMountain){
        res.send(tallestMountain);
    } else {
        res.status(404).send("No mountains found in specified country");
    }
});


app.listen(8080);