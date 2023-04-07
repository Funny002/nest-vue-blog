import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

/** 数据库名称 */
export const Mysql_NAME = 'app_service';

/** 数据库配置 */
export const Mysql = registerAs(Mysql_NAME, (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    port: 3306,
    host: '127.0.0.1',
    username: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASS'],
    database: process.env['MYSQL_DB'],
    charset: 'utf8',
    //
    debug: false,
    logger: 'simple-console',
    synchronize: true,
    retryDelay: 5000,
    retryAttempts: 10,
  };
});
