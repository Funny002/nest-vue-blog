import { INestApplication } from '@nestjs/common';

// 中间件
import helmet from 'helmet';

/** 引入中间件 */
export const useMiddleware = (app: INestApplication) => {
  app.use(helmet());
};
