// import mongoose from "mongoose";
// const AdminSchema = new mongoose.Schema({
//     certificate: {
//         type: String,
//         required: true
//     }
// })
import mongoose from 'mongoose';

const admin = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  certificate:{
    type: String
  },
  email:{
    type: String
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', admin);
export default Admin;