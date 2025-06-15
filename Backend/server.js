import connectToDB from './DB.js';
import app from './index.js';
import dotenv from 'dotenv';
console.log('🌱 Loading env...');
dotenv.config();
const PORT = process.env.PORT;

const startServer = async () => {
  console.log('🚀 Starting server...');
  await connectToDB();
  console.log('Connected DB')
    app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
};


startServer();