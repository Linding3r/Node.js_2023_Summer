
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


app.get("/doorman/:key", (req, res) => {
    if(req.params.key === "sesamopenup") {
        //return res.send({ data: "You are allowed to enter!" })
       return res.redirect("/welcomeMessage");
    }
    res.send({ data: "You are not allowed to enter!" });
});


app.get("/proxyserver", (req, res) => {
    // task request https://google.com
    // task: Then serve it
    fetch("https://google.com")
        .then(response => response.text())
        .then(data => {
            res.send(data);
        });
});


const PORT = 8080;
app.listen(PORT, error => {
    if (error) {
        console.log('Server failed to start:', error);
        return;
    }
    console.log('Server is running on port:', PORT);
});
