import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface JwtAuthOptions {
  secret: string;
}

/** 配置名 */
export const JwtAuthName = 'Jwt_Auth_Name';

/** jwt配置 */
export const JwtAuthConf = registerAs(JwtAuthName, (): JwtAuthOptions => {
  return {
    secret: process.env['JWT_SECRET'],
  };
});
