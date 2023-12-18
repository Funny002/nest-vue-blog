import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { registerAs } from '@nestjs/config';

/** 服务配置声明 */
export interface AppSystem {
  port: number;
  prefix: string;
  version: string;
  //
  cookieSecret?: string;
  pipes?: ValidationPipeOptions;
}

/** 服务配置名 */
export const AppName = 'app_name';

/** 服务配置 */
export const AppConf = registerAs(AppName, (): AppSystem => {
  return {
    port: 9871,
    prefix: '',
    version: '1',
    pipes: {
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    },
    cookieSecret: process.env['COOKIE_SECRET'],
  };
});
