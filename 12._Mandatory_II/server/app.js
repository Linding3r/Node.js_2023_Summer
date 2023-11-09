import { config } from 'dotenv';
config();

import express from 'express';
const app = express();

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import helmet from 'helmet';
app.use(helmet());

import session from 'express-session';

import { rateLimit } from 'express-rate-limit';

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const allRoutesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  });
  
app.use('/api/auth', authRateLimiter);

import authRouters from './routers/authRouters.js'
app.use(authRouters);

import signupRouters from './routers/signupRouters.js'
app.use(signupRouters)

import nodemailerRouters from './routers/nodemailerRouters.js'
app.use(nodemailerRouters)

import emailRouter from './routers/emailRouter.js'
app.use(emailRouter)

app.all("*", (req, res) => {
    res.status(404).send({ data: `Unsupported path ${req.path}`})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
