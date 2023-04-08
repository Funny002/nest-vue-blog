import { RedisModule as NestRedisModule } from '@svtslv/nestjs-ioredis';
import { Redis_Name, RedisOptions } from '@app/config';
import { RedisServer } from './src/Redis.service';
import { MysqlModel } from '@app/common/mysql';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Setting } from '@app/mysql';

@Module({
  imports: [
    // mysql
    MysqlModel.feature(Setting),
    // redis
    NestRedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { config: configService.get<RedisOptions>(Redis_Name) };
      },
    }),
  ],
  providers: [RedisServer],
  exports: [RedisServer],
})
export class RedisModule {}

export { RedisServer } from './src/Redis.service';
