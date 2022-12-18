import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface EmailOptions {
  port: number;
  host: string;
  user: string;
  pass: string;
  pool: boolean;
  secure: boolean;
}

export const Email_Name = 'email-name';

export const Email = registerAs(Email_Name, (): EmailOptions => {
  return {
    port: 465,
    pool: true,
    secure: true,
    host: 'smtp.qiye.aliyun.com',
    user: process.env['EMAIL_USER'],
    pass: process.env['EMAIL_PASS'],
  };
});
