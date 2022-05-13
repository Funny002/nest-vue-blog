import { registerAs } from '@nestjs/config';

export interface MysqlOptions {
  host: string;
  port: number;
  db: string;
  user: string;
  pass: string;
}

export const MysqlConfig = registerAs('mysql', () => ({
  host: '127.0.0.1',
  port: 3306,
  db: 'blog',
  user: 'blog',
  pass: '123456',
} as MysqlOptions));