// import Express
//const express = require("express");
// instantiate Express
//const app = express();

//Oneliner for the above, but should not be used in the future
const app = require("express")();

app.get("/", (req, res) => {
    res.send({ data: "This is the first request handler" });
})


// 80 http
// 443 https
// 80880 http developer port
// 9090 https developer port

//always have app.listen at the bottom of the file!
app.listen(8080);

