// app.js
import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authRouter.js';
import requestsRouter from './Routes/requestRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

app.use('/', authRouter);
app.use('/req', requestsRouter);
app.use('/messages', chatRoutes);

export default app;
