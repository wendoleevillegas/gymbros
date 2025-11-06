import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import cors from 'cors';
import passport from 'passport';
import express from 'express';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

dotenv.config({
    path: './env'
})

app.get("/", (req, res) => {
    res.send("Running");
})

connectToDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is listening at port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB Connection Failed | ", err);
})