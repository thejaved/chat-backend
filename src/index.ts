import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import api from './api';
import { connectDb } from './config/db';
import { connectRedis } from './config/redis';
import { initSocket } from './config/socket';
import { errorHandler } from './middlewares/errorHandler';
import { registerSocketEvents } from './services/socketService';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') }));
app.use(helmet());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/api', api);
app.use(errorHandler);

const start = async () => {
  await connectDb();
  await connectRedis();

  const { io, httpServer } = initSocket(app);
  registerSocketEvents(io);

  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => console.log(`Server running on port ${port}`));
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
