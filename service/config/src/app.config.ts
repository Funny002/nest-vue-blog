import { registerAs } from '@nestjs/config';

/** 服务配置声明 */
export interface AppSystem {
  port: number;
  prefix: string;
  version: string;
  limit?: {
    windowMs: number;
    max: number;
  }
}

/** sso服务配置名 */
export const SSO_NAME = 'app_system';
/** 服务配置名 */
export const Service_NAME = 'app_service';
/** sso服务配置 */
export const Sso = registerAs(SSO_NAME, (): AppSystem => ({
  port: 9871,
  prefix: '',
  version: '1',
}));
/** 服务配置 */
export const Service = registerAs(Service_NAME, (): AppSystem => ({
  port: 9771,
  prefix: '',
  version: '1',
}));
