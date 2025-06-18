export const handleChat = (io, socket) => {
  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`🟢 Socket ${socket.id} joined room ${roomId}`);
  });

  // Leave a room (optional cleanup)
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`🔴 Socket ${socket.id} left room ${roomId}`);
  });

  // Handle sending a message
  socket.on('send-message', (message) => {
    const { roomId } = message;

    if (!roomId) {
      console.warn('⚠️ No roomId provided in message:', message);
      return;
    }

    // Broadcast to everyone else in the same room
    socket.to(roomId).emit('receive-message', message);
    console.log(`📨 Message sent to room ${roomId}:`, message);
  });

  // Handle socket disconnect
  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
};
