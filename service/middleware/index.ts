import { NestExpressApplication } from '@nestjs/platform-express';
import { AppSystem } from '@app/config';
// 中间件
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

/** 中间件配置声明*/
interface middlewareOptions {
  limit: AppSystem['limit']
}

/** 引入中间件 */
export const useMiddleware = (app: NestExpressApplication, { limit }: Partial<middlewareOptions> = {}) => {
  if (limit) app.use(rateLimit(limit));
  app.use(helmet());
};
