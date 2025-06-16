import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authRouter.js';
import requestsRouter from './Routes/requestRoutes.js';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',      // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow headers
    credentials: true // Important for sending cookies/auth headers
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.originalUrl}`);
    next(); 
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/', authRouter);
app.use('/req', requestsRouter);
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Server Error:`, err.stack);
    res.status(500).send('Something went wrong on the server!');
});

export default app;

