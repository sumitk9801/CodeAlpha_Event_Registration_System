import express from 'express';
import connectDB from "./DB/connectDb.js"
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRouter from './Routers/eventRoute.js';
import userRouter from './Routers/userRoute.js';
import registrationRoutes from './Routers/registrationRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT ;
const MONGO_URI = process.env.MONGO_URI ;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/registrations', registrationRoutes);

// Connect to MongoDB
connectDB()
.then(()=>{
    console.log("database has been connected");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

