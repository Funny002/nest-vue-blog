import { ManualHttpException } from '@libs/error';
import { Injectable } from '@nestjs/common';
import { TokenOptions } from './interface';
import { RedisService } from 'libs/redis';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';

// Mysql
import { Setting, UserConf } from '@mysql';

/* 单个应用最多保留有效token */
const maxLimit = 30;

@Injectable()
export class tokenService {
  private redis: Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.connect();
  }

  /* 登录限制配置 */
  private async getGlobalConfig() {
    let conf = await this.redis.get('settings:login_limit');
    if (!conf) {
      const config = await Setting.getInfoKeys({ keys: 'login_limit' });
      conf = JSON.stringify({ t: Date.now(), v: config });
      await this.redis.set('settings:login_limit', conf, 'EX', 60 * 10);
    }
    return JSON.parse(conf).v;
  }

  /* 用户登录限制配置 */
  private async getUserConfig(uid: number) {
    const redisKey = `settings:user:${uid}`;
    let conf = await this.redis.get(redisKey);
    const globalConfig = await this.getGlobalConfig();
    if (!conf) {
      const config = await UserConf.getInfoKeys({ uid }, { login_limit: true });
      conf = JSON.stringify({ t: Date.now(), v: config });
      await this.redis.set(redisKey, conf, 'EX', 60 * 10);
    }
    return Object.assign(globalConfig || {}, JSON.parse(conf).v || {});
  }

  /* 获取一下时间 */
  private getTime() {
    const time = new Date();
    const state = ~~(time.getTime() / 1000);
    time.setHours(time.getHours() + 12);
    const expires = ~~(time.getTime() / 1000);
    time.setHours(time.getHours() + 12);
    return { state, expires, end: ~~(time.getTime() / 1000) };
  }

  /* 处理 redis 的 token */
  private async handlerExpiresToken(uid: number, tags: string, limit: number) {
    const score = ~~(Date.now() / 1000);
    const accessKey = `${tags}:${uid}:access`;
    const tokensKey = `${tags}:${uid}:tokens`;
    const refreshKey = `${tags}:${uid}:refresh`;
    // 删除超时
    await this.redis.zremrangebyscore(accessKey, 0, score);
    await this.redis.zremrangebyscore(refreshKey, 0, score);
    // 限制数量
    if (limit) {
      await this.redis.zremrangebyrank(accessKey, 0, -limit);
      await this.redis.zremrangebyrank(refreshKey, 0, -limit);
    }
    // 数据处理
    const access = await this.redis.zrange(accessKey, 0, await this.redis.zcard(accessKey));
    if (access.length) {
      const filterToken = access.concat(await this.redis.hmget(tokensKey, ...access));
      const delToken = (await this.redis.hkeys(tokensKey)).filter(v => !filterToken.includes(v));
      if (delToken.length) await this.redis.hdel(tokensKey, ...delToken);
    } else { // 删除令牌数据
      await this.redis.del(tokensKey);
      await this.redis.del(accessKey);
      await this.redis.del(refreshKey);
    }
  }

  /* 创建令牌 */
  createToken(payload: any, tags = 'web'): TokenOptions {
    const { state, expires, end } = this.getTime();
    const accessToken = this.jwtService.sign({ ...payload, tags, state, expires }, { expiresIn: '12h' });
    const refreshToken = this.jwtService.sign({ ...payload, tags, state, expires, end }, { expiresIn: '1d' });
    return { accessToken, refreshToken, accessExpires: expires, refreshExpires: end };
  }

  /* token 添加到 redis */
  async setToken(uid: number, tags: string, token: TokenOptions) {
    const conf = await this.getUserConfig(uid);
    const allowedTags: string[] = conf['allowed_tags'] || [];
    if (allowedTags.length && allowedTags.includes(tags)) ManualHttpException('没有权限');
    await this.handlerExpiresToken(uid, tags, conf[tags] || maxLimit);
    //
    const tokensKey = `${tags}:${uid}:tokens`;
    await this.redis.hset(tokensKey, token.refreshToken, token.accessToken);
    await this.redis.hset(tokensKey, token.accessToken, token.refreshToken);
    await this.redis.zadd(`${tags}:${uid}:access`, token.accessExpires, token.accessToken);
    await this.redis.zadd(`${tags}:${uid}:refresh`, token.refreshExpires, token.refreshToken);
  }

  /* token 查询 */
  async hasToken(token: string, types: 'access' | 'refresh' = 'access') {
    const { uid, tags } = this.jwtService.decode(token);
    const score = await this.redis.zscore(`${tags}:${uid}:${types}`, token);
    if (!score) return false;
    if (parseInt(score) < ~~(Date.now() / 1000)) {
      if (types === 'refresh') {
        token = await this.redis.hget(`${tags}:${uid}:tokens`, token);
      }
      await this.delToken(token, uid, tags);
      return false;
    }
    return true;
  }

  /* token 删除 */
  async delToken(access: string, uid?: number, tags?: string) {
    if (!uid) {
      const conf = this.jwtService.decode(access);
      uid = conf.uid;
      tags = conf.tags;
    }
    const tokensKey = `${tags}:${uid}:tokens`;
    const refresh = await this.redis.hget(tokensKey, access);
    //
    await this.redis.hdel(tokensKey, access, refresh);
    await this.redis.zrem(`${tags}:${uid}:access`, access);
    await this.redis.zrem(`${tags}:${uid}:refresh`, refresh);
  }
}
