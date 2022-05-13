import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@app/logger';
import { ConfigService } from '@nestjs/config';
import { SystemOptions } from '@app/config';
import { UseMiddleware } from '@app/middleware';
import { UseInterceptor } from '@app/interceptor';

declare const module: any;

let port = 0;

const logger = new Logger();

async function bootstrap() {
  // 初始化
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  // 配置
  const config = app.get(ConfigService).get<SystemOptions>('system');
  port = config.port;
  // 日志
  app.useLogger(logger);
  // cors
  if (config.cors) { app.enableCors();}
  // 文档
  const options = new DocumentBuilder().setTitle('Api').setVersion('0.0.1').build();
  SwaggerModule.setup('api-doc', app, SwaggerModule.createDocument(app, options));
  // 拦截器
  UseInterceptor(app);
  // 中间件
  UseMiddleware(app, config);
  // 启动
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap().then(() => logger.httpLog(port));
