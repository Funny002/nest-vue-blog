import { NestExpressApplication } from '@nestjs/platform-express';
import { SystemOptions } from '@app/config';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import * as csrf from 'csurf';
import helmet from 'helmet';

export const UseMiddleware = (app: NestExpressApplication, { cookie, limit }: SystemOptions) => {
  /** 加载中间件　*/
  app.use(cookieParser(cookie));
  app.use(csrf({ cookie: true, value: req => req.headers['csrf-token'] }));
  app.use(rateLimit(limit));
  app.use(helmet());
};
