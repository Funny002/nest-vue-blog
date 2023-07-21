import { RedisModule as NestRedisModule } from '@svtslv/nestjs-ioredis';
import { Redis_Name, RedisOptions } from '@app/config';
import { Setting, UserConf } from '@app/mysql';
import { MysqlModel } from '@app/common/mysql';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
//
import { AuthRedisServer } from './src/AuthRedis.service';

@Module({
  imports: [
    // mysql
    MysqlModel.feature(Setting, UserConf),
    // redis
    NestRedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { config: configService.get<RedisOptions>(Redis_Name) };
      },
    }),
  ],
  providers: [AuthRedisServer],
  exports: [AuthRedisServer],
})
export class RedisModule {}

export { AuthRedisServer } from './src/AuthRedis.service';
