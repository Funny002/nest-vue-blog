import { RedisOptions as RedisOptions_ioredis } from 'ioredis';
import { registerAs } from '@nestjs/config';

export const RedisName = 'redis-ioredis';

export type RedisOptions = RedisOptions_ioredis & { url?: string };

export const RedisConf = registerAs(RedisName, (): RedisOptions => {
  return {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
  };
});
