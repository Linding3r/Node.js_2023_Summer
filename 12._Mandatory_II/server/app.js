import { config } from 'dotenv';
config();

import express from 'express';
const app = express();

import helmet from 'helmet';
app.use(helmet());

import session from 'express-session';

import { rateLimit } from 'express-rate-limit';

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

const allRoutesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  });
  
app.use('/auth', authRateLimiter);

import authRouters from './routers/authRouters.js'
app.use(authRouters);

import nodemailerRouters from './routers/nodemailerRouters.js'
app.use(nodemailerRouters)

app.all("*", (req, res) => {
    res.status(404).send({ data: `Unsupported path ${req.path}`})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
