import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { UseSwagger } from '@app/common/Swagger';
import { NestFactory } from '@nestjs/core';
import { SsoModule } from './sso.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SsoModule);

  app.enableCors();

  app.enableVersioning();

  app.useGlobalPipes(new ValidationPipe());

  const version = UseSwagger(app, SsoModule.version);

  await app.listen(SsoModule.port);

  return { port: SsoModule.port, version };
}

bootstrap().then(({ port, version }) => {
  Logger.log(`http://127.0.0.1:${port}`, 'Main');
  Logger.log(`http://127.0.0.1:${port}/${version}`, 'Main');
});
