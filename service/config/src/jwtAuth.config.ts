import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export interface JwtAuthOptions {
  secret: string;
  expiresIn: string;
}

export interface JwtPayLoad {
  [key: string]: any;

  exp: number;
  iat: number;
}

export const JwtAuth_NAME = 'JwtAuth';

export const JwtAuth_Key_Name = 'JwtAuth_Key';

export const JwtAuth = registerAs(JwtAuth_NAME, (): JwtAuthOptions => ({
  expiresIn: '12h',
  secret: 'jwt_secret_key',
}));
