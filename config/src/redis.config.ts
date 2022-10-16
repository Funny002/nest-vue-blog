import { RedisOptions as RedisOptions_ioredis } from 'ioredis';
import { registerAs } from '@nestjs/config';

export const Redis_Name = 'redis-ioredis';

export type RedisOptions = RedisOptions_ioredis & { url?: string }

export const Redis = registerAs(Redis_Name, (): RedisOptions => ({
  host: '127.0.0.1',
  port: 6379,
  db: 0,
}));
