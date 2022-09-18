import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { UseSwagger } from '@app/common/swagger';
import { ServiceModule } from './service.module';
import { NestFactory } from '@nestjs/core';

/** 服务启动引导 */
async function bootstrap() {
  // 初始化应用
  const app = await NestFactory.create<NestExpressApplication>(ServiceModule);
  // 创建混合应用
  const redisMicroService = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379/1',
      retryAttempts: 10,
      retryDelay: 3000,
    },
  });
  // 跨域
  app.enableCors();
  // Api多版本
  app.enableVersioning();
  // 验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 创建 swagger
  const version = UseSwagger(app, ServiceModule.version);
  // 启用混合应用
  await app.startAllMicroservices();
  // 启动服务
  await app.listen(ServiceModule.port);
  //
  return { port: ServiceModule.port, version };
}

bootstrap().then(({ port, version }) => {
  Logger.log(`http://127.0.0.1:${port}`, 'Main');
  Logger.log(`http://127.0.0.1:${port}/${version}`, 'Main');
});
