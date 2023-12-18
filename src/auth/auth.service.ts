import { Injectable } from '@nestjs/common';
import { EmailService } from '@libs/email';
import { RedisService } from '@libs/redis';
import Redis from 'ioredis';
import { resolve } from 'path';
import { Setting } from '@mysql';
import { ManualHttpException } from '@libs/error';

@Injectable()
export class AuthService {
  private redis: Redis;

  constructor(
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.connect();
  }

  async sendCode(ip: string, email: string) {
    let count = JSON.parse((await this.redis.hget(`code:${ip}`, 'count')) || '[]') as number[];
    const countTime = Date.now() - 5 * 60000;
    //
    count = count.filter(v => v > countTime);
    await this.redis.hset(`code:${ip}`, 'count', JSON.stringify(count));
    if (count.length >= 3) return ManualHttpException('验证码发送过于频繁，请稍后再试');
    //
    const list = await this.redis.hget(`code:${ip}`, email);
    if (list && Date.now() - JSON.parse(list).time <= 60000) return ManualHttpException('验证码发送过于频繁，请稍后再试');
    //
    const time = Date.now();
    const code = Math.random().toString(36).slice(-5);
    await this.redis.expire(`code:${ip}`, 10 * 60);
    await this.redis.hset(`code:${ip}`, email, JSON.stringify({ code, time }));
    await this.redis.hset(`code:${ip}`, 'count', JSON.stringify(count.concat(time)));
    try {
      return await this.setEmailCode(email, { code, time });
    } catch (e) {
      console.log(e.message);
      ManualHttpException('邮件发送失败，请稍后再试');
    }
  }

  async setEmailCode(email: string, options: { [key: string]: any }) {
    const configList = await Setting.getKeys({ type: 'email', state: 'enable', power: 'system' });
    const { name, user, pass, ...emailOptions } = configList.reduce((prev: { [key: string]: any }, curr) => {
      if (curr.keys === 'port') {
        return Object.assign(prev, { [curr.keys]: parseInt(curr.value) });
      } else {
        return Object.assign(prev, { [curr.keys]: curr.value });
      }
    }, {});
    if (user && pass) emailOptions['auth'] = { user, pass };
    const emailConnect = new EmailService(<any>emailOptions);
    emailConnect.template(resolve('./email/register.html'), options);
    emailConnect.to(email);
    return await emailConnect.send('注册验证码', name);
  }

  async verifyCode(email: string, code: string) {

  }
}
