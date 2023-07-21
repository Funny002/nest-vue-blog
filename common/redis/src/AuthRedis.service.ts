import { Errors, ManualException } from '@app/common/error';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting, UserConf } from '@app/mysql';
import { Injectable } from '@nestjs/common';
import { mergeOptions } from '@app/tools';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRedisServer {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(Setting) private settingRep: Repository<Setting>,
    @InjectRepository(UserConf) private userConfRep: Repository<UserConf>,
  ) {}

  private handleConf(conf: { [Name: string]: string }) {
    const target: { [name: string]: number | string[]; allowed_tags?: string[] } = {};
    for (const [keys, value] of Object.entries(conf)) {
      if (keys === 'allowed_tags') {
        target[keys] = conf[keys] ? conf[keys].split(',') : [];
      } else {
        target[keys] = parseInt(conf[keys]);
      }
    }
    return target;
  }

  private async HandlingValidTokens(uid: number, tags: string) {
    const access_keys = `users:tokens:${uid}:${tags}:access`;
    const tokens_keys = `users:tokens:${uid}:${tags}:tokens`;
    const access = await this.redis.zrange(access_keys, 0, await this.redis.zcard(access_keys));
    if (access.length) {
      const refresh = access.concat(await this.redis.hmget(tokens_keys, ...access));
      const data = (await this.redis.hkeys(tokens_keys)).filter(v => !refresh.includes(v));
      data.length && (await this.redis.hdel(tokens_keys, ...data));
    }
  }

  private async setConf(uid: number | string, value: { [Name: string]: any }, expires = 86400) {
    const keys = `users:info:${uid}`;
    try {
      for (const [key, data] of Object.entries(value)) {
        if (Array.isArray(data)) {
          await this.redis.hset(keys, key, data.join(','));
        } else {
          await this.redis.hset(keys, key, data);
        }
      }
      await this.redis.expire(keys, expires);
      return true;
    } catch (e) {
      await this.redis.del(keys);
      return false;
    }
  }

  // 获取配置
  async getConf(key: number | 'default') {
    const keys = `users:info:${key}`;
    const state = await this.redis.exists(keys);
    let conf: any;
    if (!state) {
      let result: any;
      if (typeof key === 'string') {
        result = await this.settingRep.find({ where: { tags: 'sso', type: 'user' } });
      } else {
        const userConf = await this.userConfRep.findOne({ where: { uid: key }, select: { authConf: true } });
        result = JSON.parse((userConf || {}).authConf || '[]');
      }
      conf = result.reduce(function (result: { [name: string]: any }, { keys, value }: { [name: string]: any }) {
        result[keys] = !value ? '' : value;
        return result;
      }, {});
      await this.setConf(key, conf, 60 * 60 * 2);
    } else {
      conf = await this.redis.hgetall(keys);
    }
    return this.handleConf(conf);
  }

  // 删除配置
  async delConf(key: number | 'default') {
    await this.redis.del(`users:info:${key}`);
  }

  // 添加
  async setToken(uid: number, tags: string, token: { access: string; refresh: string }, expires: { access: number; refresh: number }) {
    const key_tokens = `users:tokens:${uid}:${tags}:tokens`;
    const key_access = `users:tokens:${uid}:${tags}:access`;
    const key_refresh = `users:tokens:${uid}:${tags}:refresh`;
    const conf = mergeOptions(await this.getConf('default'), (await this.getConf(uid)) || {});
    if ((conf['allowed_tags'] || []).length && !conf['allowed_tags'].includes(tags)) ManualException(Errors.noAuthority);
    if (conf[tags] || 0) {
      const access_state = await this.redis.zremrangebyrank(key_access, 0, -conf[tags]);
      const refresh_state = await this.redis.zremrangebyrank(key_refresh, 0, -conf[tags]);
    }
    await this.HandlingValidTokens(uid, tags);
    await this.redis.hset(key_tokens, token.access, token.refresh);
    await this.redis.hset(key_tokens, token.refresh, token.access);
    await this.redis.zadd(key_access, expires.access, token.access);
    await this.redis.zadd(key_refresh, expires.refresh, token.refresh);
  }

  // 删除
  async delToken(uid: number, tags: string, access: string) {
    const tokens = `users:tokens:${uid}:${tags}:tokens`;
    const refresh = await this.redis.hget(tokens, access);
    //
    await this.redis.hdel(tokens, access, refresh);
    await this.redis.zrem(`users:tokens:${uid}:${tags}:access`, access);
    await this.redis.zrem(`users:tokens:${uid}:${tags}:refresh`, refresh);
  }

  // 验证
  async hasToken(uid: number, tags: string, token: string) {
    const score = await this.redis.zscore(`users:tokens:${uid}:${tags}:access`, token);
    if (!score) return false;
    if (parseInt(score) < Math.floor(Date.now() / 1000)) {
      await this.delToken(uid, tags, token);
      return false;
    }
    return true;
  }
}
