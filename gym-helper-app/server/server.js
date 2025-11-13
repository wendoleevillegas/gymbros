import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import cors from 'cors';
import passport from 'passport';
import express from 'express';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);

dotenv.config({
    path: './env'
})

app.get("/", (req, res) => {
    res.send("Running");
})
app.use('/api/auth', authRoutes);
connectToDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is listening at port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB Connection Failed | ", err);
})