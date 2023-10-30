import express from "express";
const app = express();


import session from "express-session";
import { rateLimit } from 'express-rate-limit';


import { config } from 'dotenv';
config();

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
  limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});