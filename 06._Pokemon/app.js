//const express = require('express');

//this is now possible due to us adding type: "module"  in the package.json
import express from 'express';

const app = express();

app.use(express.static('public'));

import path from "path";

//with module we can't use __dirname, one of the trade offs of using modules instead of common JS
// instead we import path from path and use path.resolve


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/frontpage.html'));
});





const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
