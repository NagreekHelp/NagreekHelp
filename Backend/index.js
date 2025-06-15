// import express from 'express';
// import cors from 'cors';
// import authProfileRouter from './Routes/authProfileRouter.js'
// const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173',     // your frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));
// app.use(express.json());
// // app.options('*', cors());
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });
// app.use('/', authProfileRouter);

import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authProfileRouter.js'; // Ensure this path is correct

const app = express();

// 1. Use the CORS middleware globally and early.
// This handles the preflight OPTIONS requests and sets the necessary headers.
app.use(cors({
    origin: 'http://localhost:5173',      // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow headers
    credentials: true // Important for sending cookies/auth headers
}));

// 2. Parse JSON request bodies. This should come after CORS.
app.use(express.json());

// 3. Optional: Add a simple logger middleware to see incoming requests.
// This can help confirm if requests are reaching your Express app.
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.originalUrl}`);
    // console.log('Request Headers:', req.headers); // Uncomment for more detailed header inspection
    next(); // Pass control to the next middleware/route handler
});

// Root endpoint for a basic check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 4. Mount your authentication router.
// Given your frontend makes a POST to '/auth/register',
// and your app.use('/', authProfileRouter) means routes defined
// within authProfileRouter are relative to the root,
// authProfileRouter.js should define a route like:
// router.post('/auth/register', ...)
app.use('/', authRouter);

// 5. Optional: Basic error handling middleware (should be last)
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Server Error:`, err.stack);
    res.status(500).send('Something went wrong on the server!');
});

export default app;

