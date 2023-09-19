
const express = require('express');

const app = express();

// client only has access to the plublic folder with this line. This is serving static files from the public.
// This is also known as a security feature.
app.use(express.static('public'));


const welcomeMessageUtil = require('./util/welcomeMessageUtil');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/secondPage', (req, res) => {
    res.sendFile(__dirname + '/public/secondPage.html');
});

//==============================================

app.get('/welcomeMessage', (req, res) => {
    const userName = req.query.user;
    const welcomeMessage = welcomeMessageUtil.getWelcomeMessage(userName);
    res.send({ data: welcomeMessage });
});

const PORT = 8080;
app.listen(PORT, error => {
    if (error) {
        console.log('Server failed to start:', error);
        return;
    }
    console.log('Server is running on port:', PORT);
});
