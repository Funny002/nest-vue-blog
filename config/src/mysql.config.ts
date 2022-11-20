import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/** 数据库名称 */
export const Mysql_NAME = 'app_service';

/** 数据库配置 */
export const Mysql = registerAs(Mysql_NAME, (): TypeOrmModuleOptions => {
  return {
    // type
    type: 'mysql',
    // host port
    port: 3306,
    host: '127.0.0.1',
    // user pass
    username: 'root',
    password: '123456',
    // db charset
    database: 'nest_blog',
    charset: 'utf8mb4',
    // other
    logger: 'advanced-console',
    retryDelay: 5000,
    synchronize: true,
    retryAttempts: 10,
  };
});
