import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import checklistRoutes from './routes/checklist.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI not configured');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('Mongo connected'))
  .catch((err) => console.error('Mongo connection error', err));

app.use('/api', authRoutes);
app.use('/api/checklists', authMiddleware, checklistRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
