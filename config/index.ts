import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

// config
import { MysqlConf } from './src/mysql.config';
import { RedisConf } from './src/redis.config';
import { AppConf } from './src/app.config';
import { EmailConf } from './src/email.config';

/** 引用 Config */
export class ConfigGlobal {
  static use(): DynamicModule {
    const load = [
      AppConf,
      RedisConf,
      EmailConf,
      MysqlConf,
    ];
    return ConfigModule.forRoot({ isGlobal: true, load });
  }
}

export * from './src/app.config';
export * from './src/mysql.config';
export * from './src/redis.config';
export * from './src/email.config';
// export * from './src/jwtAuth.config';
