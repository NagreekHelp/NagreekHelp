// import connectToDB from './DB.js';
// import app from './app.js';
// import dotenv from 'dotenv';
// console.log('🌱 Loading env...');
// dotenv.config();
// const PORT = process.env.PORT;

// const startServer = async () => {
//   console.log('🚀 Starting server...');
//   await connectToDB();
//   console.log('Connected DB')
//     app.listen(PORT, () => {
//     console.log(`✅ Server running at http://localhost:${PORT}`);
//   });
// };


// startServer();


// server.js
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectToDB from './DB.js';
import { handleChat } from './controllers/handleChat.js';

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  console.log('🌱 Connecting to DB...');
  await connectToDB();
  console.log('✅ Connected to DB');

  // Create HTTP server from Express app
  const server = http.createServer(app);

  // Create Socket.IO server
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Socket.IO connection event
  io.on('connection', (socket) => {
    console.log('✅ New socket connection:', socket.id);
    handleChat(io, socket); // Optional later
  });

  // Start combined server
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
