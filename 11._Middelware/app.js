import express from 'express';
import { rateLimit } from 'express-rate-limit';

const app = express();

const allRoutesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

app.use('/auth', authRateLimiter);


import authRouter from './routers/authRouter.js';
app.use(authRouter);

function ipLogger(req, res, next) {
    console.log('IP log:', new Date(), req.ip);
    next();
}

app.use('/room', ipLogger);

//middleware
function butler(req, res, next) {
    console.log('Welcome to the mansion', req.ip);
    next();
}

function doorMan(req, res, next) {
    if (req.params.secretPhrase === 'SesameOpen') {
        next();
    } else {
        res.send({ data: 'You do not haver access' });
    }
}

app.get('/secretRoom/:secretPhrase', doorMan, (req, res) => {
    res.send({ data: 'You are now in the secret room' });
});

//import Room routes which needs to come after all middleware
import roomsRouter from './routers/roomsRouter.js';
app.use(roomsRouter);

import furnituresRouter from './routers/furnituresRouter.js';
//app.use("/furniture",furnituresRouter);  Don't use this, but you might see it in real life cases. Called prepending
app.use(furnituresRouter);

// wildcard - Fallback
app.get('*', (req, res) => {
    res.send('<h1>404 - Page Not Found</h1>');
});

app.get('*', (req, res) => {
    res.status(404).send({ data: `Unsupported path ${req.path}` });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
