// import Express
const express = require("express");
// instantiate Express
const app = express();

//Oneliner for the above, but should not be used in the future
// app = require('express')();

// uses body-parser for json parser, if you don't use it and you return an empty json it will return undefined instead of empty json
app.use(express.json());

const otherData = 123;

app.get('/', (req, res) => {
    res.send({ data: 'This is the first request handler', otherData: otherData });
});

// task: create a dog endpoint that returns woof
app.get('/dog', (req, res) => {
    res.send({ bark: 'woof' });
});

app.get('/dog/:id/:someOtherValue', (req, res) => {
    console.log(req.params);
    res.send({ dog: 'Moew' });
});

//cat?name=Napster&age=2.5
app.get('/cat', (req, res) => {
    console.log(req.query);
    res.send({ data: req.query });
});

let balance = 100;
app.get('/wallet/:withdrawelAmount', (req, res) => {
    const withdrawelAmount = req.params.withdrawelAmount;
    balance -= withdrawelAmount;

    if (balance < 0) {
        balance += withdrawelAmount;
        res.send({ message: "You can't withdraw. No more money left." });
    } else {
        res.send({ message: `You've withdrawn ${withdrawelAmount}` });
    }
});

app.post('/giveMeTheBody', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// 80 http
// 443 https
// 80880 http developer port
// 9090 https developer port

//always have app.listen at the bottom of the file!
app.listen(8081);
