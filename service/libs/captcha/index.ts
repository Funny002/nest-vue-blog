import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class CaptchaService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  
  async getSVGCaptcha() {}
}
