const express = require("express");
const app = express();

const mountainsJson = require("./mountains.json");

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
        res.status(404).send("No mountains found in specified country")
    }
})


app.listen(8080);