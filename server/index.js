import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';
import cookieParser from 'cookie-parser';
import {cloudinaryConnect} from './utils/cloudinary.js'
import bodyParser from 'body-parser';


dotenv.config();
const ORIGIN_URL = process.env.ORIGIN_URL;
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL)
    .then(console.log("connected to mongodb"))
    .catch((e)=>console.log(e));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
// app.use(cors());

app.use(cors({
    origin: ["http://localhost:5173", "https://fineartssociety.vercel.app", ORIGIN_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "content-type"]
}));


app.use(cookieParser());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res)=>{
    res.json({
        message: "API is working",
    })
})

app.use('/v1/user', userRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/member', memberRoutes);
app.use('/v1/artwork', artworkRoutes);

cloudinaryConnect(); 
