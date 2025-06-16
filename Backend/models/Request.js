import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    documentName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: [
        'requested',
        'waiting_for_document',
        'waiting_for_completion',
        'waiting_for_payment',
        'finished',
        'cancelled_by_user',
        'cancelled_by_center',
      ],
      default: 'requested',
    },
    submittedDocuments: [{ type: String }], // array of file URLs or file names
    chat: [
      {
        sender: { type: String, enum: ['user', 'admin'] },
        message: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Request', RequestSchema);
