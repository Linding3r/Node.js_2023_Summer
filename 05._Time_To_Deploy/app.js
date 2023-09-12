const express = require('express');
const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});


