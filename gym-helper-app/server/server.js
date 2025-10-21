import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use(express.static("public"))

dotenv.config({
    path: './env'
})

app.get("/", (req, res) => {
    res.send("Running");
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is listening at port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB Connection Failed | ", err);
})