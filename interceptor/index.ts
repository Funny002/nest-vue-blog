import { ResponseInterceptor } from './src/response.interceptor';
import { INestApplication } from '@nestjs/common';

export const useInterceptor = (app: INestApplication) => {
  app.useGlobalInterceptors(new ResponseInterceptor());
};
