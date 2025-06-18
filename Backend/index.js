// import app from './app.js'; // Import your app that already includes Socket.IO and Express
// import http from 'http';
// import { Server } from 'socket.io';
// // import { handleChat } from './controllers/chatController.js';

// const PORT = process.env.PORT || 5050;

// // Create HTTP server from Express app
// const server = http.createServer(app);

// // Create Socket.IO server
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // Socket.IO handling
// io.on('connection', (socket) => {
//     console.log('a new user connected', socket.id)
// //   handleChat(io, socket);
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });
