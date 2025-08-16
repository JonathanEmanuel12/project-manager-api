// src/services/RedisService.ts
import Redis from 'ioredis'

export class RedisService {
    private static redis: Redis

    private constructor() { }

    private static getClient(): Redis {
        if (!this.redis) {
            this.redis = new Redis({
                host: process.env.REDIS_HOST || 'localhost',
                port: Number(process.env.REDIS_PORT) || 6379,
                password: process.env.REDIS_PASSWORD || undefined,
            })
        }

        return this.redis
    }

    static async save(key: string, value: string, expSeconds: number = 600): Promise<void> {
        const client = this.getClient()
        await client.set(key, value, 'EX', expSeconds)
    }

    static async get(key: string): Promise<string | null> {
        const client = this.getClient()
        return await client.get(key)
    }
}
