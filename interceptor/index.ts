import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './src/response.interceptor';

// export { ResponseDto } from './src/response.interceptor';

export const UseInterceptor = (app: NestExpressApplication) => {
  app.useGlobalInterceptors(new ResponseInterceptor());
};
