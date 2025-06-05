import { createClient } from 'redis';

export const redisClient = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});
redisClient.on('error', err => console.log('Redis Client Error', err));
