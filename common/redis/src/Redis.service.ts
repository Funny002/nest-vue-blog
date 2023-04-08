import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { mergeOptions } from '@app/tools';
import { Repository } from 'typeorm';
import { Setting } from '@app/mysql';

interface ScanStreamOption {
  match?: string | undefined;
  count?: number | undefined;
  type?: string | undefined;
  key?: string | undefined;
}

@Injectable()
export class RedisServer {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(Setting) private settingRep: Repository<Setting>,
  ) {}

  scan(match: string, options?: ScanStreamOption & { on?: { [k: string]: () => void } }): Promise<string[]> {
    const { on, ...opt } = options || {};
    return new Promise<string[]>(success => {
      const stream = this.redis.scanStream(mergeOptions({ match }, opt));
      stream.on('data', success);
      const { data, ...ons } = on || {};
      for (const key in ons) {
        stream.on(key, on[key]);
      }
    });
  }

  async setAuthToken(uid: number, tags: string, token: { access: string, refresh: string }, expires: { access: number, refresh: number }) {
    const conf = JSON.parse((await this.settingRep.findOne({ where: { tags: 'sso', type: 'authority', keys: 'singleSignOn' }, select: { value: true } }))?.value || '{}');
    if (conf[tags]) {
      const list = await this.scan(`authority:${ uid }:${ tags }:*`, { count: 1000 });
      const pipe = this.redis.pipeline();
      for (const key of list) {
        const access = key.split('access:')[1];
        if (access) {
          pipe.set(`othersSign:${ access }`, 'true', 'EX', 60 * 60);
        }
      }
      pipe.del(...list);
      await pipe.exec();
    }
    // redis add token  -  Authority:{uid}:{tags}:{access, refresh}:{token} = {refresh, access}
    const pipe = this.redis.pipeline();
    pipe.set(`authority:${ uid }:${ tags }:access:${ token.access }`, token.refresh, 'EX', expires.access);
    pipe.set(`authority:${ uid }:${ tags }:refresh:${ token.refresh }`, token.access, 'EX', expires.refresh);
    await pipe.exec();
  }
}
