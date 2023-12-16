import { Injectable } from '@nestjs/common';
import { RedisService } from '@libs/redis';
import Redis from 'ioredis';
import { Setting } from '@mysql';

@Injectable()
export class EmailService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = redisService.connect();
  }

  async getConfig() {
    let conf = await this.redis.get('email:config');
    if (conf) {
      const config = await Setting.getKeys({ type: 'email' });
      console.log('Setting.getKeys', config);
    }
    return conf;
  }
}
