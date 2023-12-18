import { INestApplication } from '@nestjs/common';
//
import { ResponseInterceptor } from './src/response.interceptor';

/* 拦截器 */
export const useInterceptor = (app: INestApplication) => {
  app.useGlobalInterceptors(new ResponseInterceptor());
};
