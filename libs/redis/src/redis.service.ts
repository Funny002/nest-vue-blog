import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { RedisOptions, RedisModuleOptions } from './interface';
import * as IoRedis from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private logger = new Logger(RedisService.name);
  private redisPackage = new Map<string, IoRedis.Redis>();

  constructor(@Inject(RedisOptions) opt: string | RedisModuleOptions | Array<RedisModuleOptions>) {
    let opts = [];
    if (typeof opt === 'string') {
      opts = [{ name: 'default', url: opt }];
    } else {
      opts = (!Array.isArray(opt) ? [opt] : opt);
    }
    if (opts.length === 1) {
      opts[0].name = opts[0].name || 'default';
    }
    try {
      const diffName: string[] = [];
      for (const item of opts) {
        if (!item.name) {
          throw new Error(`[option.name] Cannot be empty`);
        }
        if (diffName.includes(item.name)) {
          throw new Error(`[${item.name}] repeat`);
        } else {
          diffName.push(item.name);
        }
      }

      /* 创建连接 */
      opts.reduce((prev: Map<string, IoRedis.Redis>, curr) => {
        const { name, ...options } = curr;
        prev.set(name, this.createClient(options));
        return prev;
      }, this.redisPackage);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private handleOption(opt: RedisModuleOptions) {
    const { name, url, retryTimes, maxRetry: maxRetriesPerRequest, host, port, ...options } = opt;
    if (url) return url;
    const retryStrategy = (times: number) => {
      return this.createRetryStrategy(times, retryTimes);
    };
    return { port: 6379, host: '127.0.0.1', ...options, retryStrategy, lazyConnect: true, maxRetriesPerRequest };
  }

  /* 重试 */
  private createRetryStrategy(times: number, retryAttempts?: number) {
    if (!retryAttempts || times > retryAttempts) {
      this.logger.error('Retry time exhausted');
      return undefined;
    }
    return retryAttempts || 0;
  }

  /* 错误处理 */
  private handleError(client: IoRedis.Redis) {
    client.on('error', error => {
      this.logger.error(error);
    });
  }

  /* 创建配置 */
  createClient(option: string | RedisModuleOptions) {
    let redis: IoRedis.Redis;
    if (typeof option === 'string') {
      redis = new IoRedis.Redis(option);
    } else {
      redis = new IoRedis.Redis(<any>this.handleOption(option));
    }
    this.handleError(redis);
    return redis;
  }

  /* 连接 */
  connect(name = 'default'): IoRedis.Redis {
    if (!this.redisPackage.has(name)) {
      this.logger.error(`[${name}] not found`);
    }
    return this.redisPackage.get(name) || null;
  }

  /* 关闭 */
  close() {
    for (const keys in this.redisPackage) {
      this.redisPackage[keys].quit();
    }
    this.logger.log('redis service closed');
  }

  /* 程序推出 */
  onApplicationShutdown(): any {
    this.close();
  }
}
