import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

export type JwtAuthOptions = JwtModuleOptions

/** 配置名 */
export const JwtAuthName = 'Jwt_Auth_Name';

/** jwt配置 */
export const JwtAuthConf = registerAs(JwtAuthName, (): JwtAuthOptions => {
  return {
    secret: process.env['JWT_SECRET'],
    signOptions: { expiresIn: '12h' },
  };
});
