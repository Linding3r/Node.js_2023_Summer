const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/secondPage', (req, res) => {
    res.sendFile(__dirname + '/public/secondPage.html');
});

//==============================================

app.get('/welcomeMessage', (req, res) => {
    const userName = req.query.user;
    if (!userName) {
        res.send({ data: 'Hello Stranger' });
    } else {
        res.send({ data: `Hello ${userName}.` });
    }
});

const PORT = 8080;
app.listen(PORT, error => {
    if (error) {
        console.log('Server failed to start:', error);
        return;
    }
    console.log('Server is running on port:', PORT);
});

module.exports(app);
