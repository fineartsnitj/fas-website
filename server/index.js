import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const ORIGIN_URL = process.env.ORIGIN_URL;
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL)
    .then(console.log("connected to mongodb"))
    .catch((e)=>console.log(e));

const app = express();
app.use(express.json());
// app.use(cors({credentials: true, origin: true}));

app.use(cors({
    origin: ["http://localhost:5173", "https://fineartssociety.vercel.app", ORIGIN_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(cookieParser());


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// app.listen(4000, ()=>{
//     console.log("server running on port 4000");
// });

app.get('/', (req, res)=>{
    res.json({
        message: "API is working",
    })
})

app.use('/v1/user', userRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/member', memberRoutes);
