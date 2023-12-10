import { RedisOptions, RedisModuleOptions } from './interface';
import { RedisService } from './redis.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(options?: string | RedisModuleOptions | Array<RedisModuleOptions>, isGlobal?: boolean) {
    return {
      global: isGlobal,
      module: RedisModule,
      providers: [{
        provide: RedisOptions,
        useValue: options || {},
      }],
    };
  }

  static forRootAsync(options: { useFactory: () => RedisModuleOptions | Promise<RedisModuleOptions>, inject?: any[] }, isGlobal?: boolean) {
    return {
      global: isGlobal,
      module: RedisModule,
      providers: [{
        provide: RedisOptions,
        inject: options.inject || [],
        useFactory: options.useFactory,
      }],
    };
  }
}
