import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppName, AppSystem } from '@config';

// 中间件
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { useTraceIdInterceptor } from './src/traceId.interceptor';

/** 引入中间件 */
export const useMiddleware = (app: INestApplication) => {
  const config = app.get(ConfigService).get<AppSystem>(AppName);

  app.use(helmet());
  app.use(cookieParser(config.cookieSecret));
  app.use(useTraceIdInterceptor());
};
