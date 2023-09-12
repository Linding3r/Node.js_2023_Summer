const express = require('express');
const app = express();

// Local Time String
console.log(Date());
// UTC / Zulu time
console.log(new Date());
// Epoch timestamp / Unix / January 1 1970
console.log(Date.now());

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// task: create a route that returns the date
app.get('/date', (req, res) => {
    const date = new Date();
    res.send({ data: date });
});

// task2: Create a route that returns the current month
app.get('/month', (req, res) => {
    const date = new Date();
    res.send({ data: date.toLocaleString('en', { month: 'long' }) });
});

app.get('month2', (req, res) => {
    const date = new Date();
    res.send({ data: monthNames[date.getMonth()] });
});

// task3: Create a route that returns the current day
app.get('/day', (req, res) => {
    const date = new Date();
    res.send({ data: date.toLocaleString('en', { weekday: 'long' }) });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is runnong on port', PORT);
});
