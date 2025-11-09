import express from 'express';
import env from 'dotenv';
import connectDB from './db/db.js';
import otRoutes from './routes/otRoutes.js';
import cors from 'cors';
env.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', otRoutes);
const startServer = async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
};

startServer();