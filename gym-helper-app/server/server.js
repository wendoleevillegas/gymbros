import dotenv from 'dotenv';
dotenv.config({ path: './.env' })

import connectToDB from './config/db.js';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import configurePassport from './config/passport.js';
import authRoutes from './routes/auth.routes.js'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

configurePassport(passport);
app.use(passport.initialize());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Running");
})

connectToDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongo DB Connection Failed | ", err);
    })