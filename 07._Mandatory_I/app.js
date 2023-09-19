import express from 'express';
const app = express();
app.use(express.static('public'));

import path from 'path';

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/frontpage.html'));
});

app.get('/express', (req, res) => {
    res.sendFile(path.resolve('./public/expresspage.html'));
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
