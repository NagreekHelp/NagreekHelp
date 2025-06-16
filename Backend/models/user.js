import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phoneNumber : {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'User'], 
    default: 'User'
  },
  pincode: {
    type: String,
    required: true,
    match: /^[1-9][0-9]{5}$/
  },
  city: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z\s'-]+$/
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
