import { registerAs } from '@nestjs/config';

/** 配置参数声明 */
export interface JwtAuthOptions {
  secret: string;
  expiresIn: string;
}

/** JWT解析后配置声明 */
export interface JwtPayLoad {
  [key: string]: any;
  
  exp: number;
  iat: number;
}

/** 配置名 */
export const JwtAuth_NAME = 'JwtAuth';
/** jwt标识名 */
export const JwtAuth_Key_Name = 'JwtAuth_Key';
/** jwt配置 */
export const JwtAuth = registerAs(JwtAuth_NAME, (): JwtAuthOptions => ({
  expiresIn: '12h',
  secret: 'jwt_secret_key',
}));
