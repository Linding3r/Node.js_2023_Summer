// import Express
//const express = require("express");
// instantiate Express
//const app = express();

//Oneliner for the above, but should not be used in the future
const app = require("express")();

const otherData = 123;

app.get("/", (req, res ) => {
    res.send({ data: "This is the first request handler", otherData: otherData});
});


// task: create a dog endpoint that returns woof
app.get("/dog", (req, res) => {
    res.send({ bark: "woof" });
});

app.get("/dog/:id/:someOtherValue", ( req, res ) => {
    console.log(req.params);
    res.send({dog: "Moew"});
});

let balance = 100;
app.get("/wallet/:withdrawelAmount", ( req, res ) => {
    const withdrawelAmount = req.params.withdrawelAmount
    balance -= withdrawelAmount;
    
    if(balance < 0) {
        balance += withdrawelAmount;
        res.send({ message: "You can't withdraw. No more money left."});
    } else {
        res.send({ message: `You've withdrawn ${withdrawelAmount}`});
    }
});


// 80 http
// 443 https
// 80880 http developer port
// 9090 https developer port

//always have app.listen at the bottom of the file!
app.listen(8080);

