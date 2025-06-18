import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: String,
  file: String, // File URL or filename if needed
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
