import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/* 标题 */
const title = 'Api Description';

/* 说明 */
const description = 'not description';

/* 令牌名 */
export const TOKEN_NAME = 'Authorization';

/* 权限验证配置 */
export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};

/* Swagger */
export const useSwagger = (app: INestApplication, swaggerVersion: string) => {
  /* 初始化 */
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(swaggerVersion)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();
  /* 配置 */
  const document = SwaggerModule.createDocument(app, options);
  /* 启动 */
  SwaggerModule.setup(`swagger-ui/v${swaggerVersion}`, app, document);
  /* 返回值 */
  return `swagger-ui/v${swaggerVersion}`;
};
