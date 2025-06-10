import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createServer } from 'http';
import { redisClient } from './redis';

export const initSocket = (app: any) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || '*',
    },
  });

  const pubClient = redisClient.duplicate();
  const subClient = redisClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));

  return { io, httpServer };
};
