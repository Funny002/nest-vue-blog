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

export const EmailName = 'email-name';

const EmailHostMap = {
  aliyun: { port: 465, host: 'smtp.qiye.aliyun.com' },
};

export const EmailConf = registerAs(EmailName, (): EmailOptions => {
  const { port, host } = EmailHostMap[process.env['EMAIL_TYPE']] || {};
  return { port, host, pool: true, secure: true, user: process.env['EMAIL_USER'], pass: process.env['EMAIL_PASS'] };
});
