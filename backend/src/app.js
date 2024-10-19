import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

//middlewares

app.use(cors({
    origin: process.env.CORS_ORIGIN ||'http://localhost:3000',
    credentials: true}));
app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//importing routes

import UserRoutes from './routes/user.routes.js';

//route declaration 

app.use('/api/v1', UserRoutes);

export default app;