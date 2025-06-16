import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null
export function getRedisClient() {
    if (!redisClient) {
      redisClient = createClient({
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        }
      })
  
      redisClient.on('error', (err) => console.error('Redis Client Error', err))
  
      redisClient.connect()
    }
  
    return redisClient
  }

