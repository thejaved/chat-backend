import { createClient } from 'redis';

const url = process.env.REDIS_URL as string;
export const redisClient = createClient({ url });

export const connectRedis = async () => {
  if (!url) throw new Error('REDIS_URL is not defined');
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};
