import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const Mongo_Uri = process.env.MONGO_URL;

const connectToDB = async () => {
  try {
    if (!Mongo_Uri) throw new Error("MONGO_URL not found in env");

    console.log('🌍 Connecting to DB...');
    await mongoose.connect(Mongo_Uri);
    console.log('✅ Connected to DB');
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
    process.exit(1); // 🔴 Exit the app immediately
  }
};

export default connectToDB;
