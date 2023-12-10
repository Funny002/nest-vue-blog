import { ValidationPipe } from '@nestjs/common';
import { useInterceptor } from '@interceptor';
import { LoggerService } from '@libs/logger';
import { useMiddleware } from '@middleware';
import { NestFactory } from '@nestjs/core';
import { useSwagger } from '@libs/swagger';
import { AppModule } from './app.module';

/* 引导 */
async function bootstrap() {
  /* 初始化 */
  const app = await NestFactory.create(AppModule);
  /* logger */
  app.useLogger(new LoggerService());
  /* 版本 */
  app.enableVersioning();
  /* 拦截器 */
  useInterceptor(app);
  /* 中间件 */
  useMiddleware(app);
  /* 跨域 */
  app.enableCors();
  /* 验证管道  */
  app.useGlobalPipes(new ValidationPipe(AppModule.pipesVerify));
  /* swagger */
  const version = useSwagger(app, AppModule.version);
  /* 连接端口 */
  await app.listen(AppModule.port);
  /* 返回值 */
  return { port: AppModule.port, version };
}

/* 运行 */
bootstrap().then(({ port, version }) => {
  const logger = new LoggerService();
  logger.log(`service listen: http://localhost:${port}`, 'Bootstrap');
  logger.log(`service listen: http://localhost:${port}/${version}`, 'Bootstrap');
});
