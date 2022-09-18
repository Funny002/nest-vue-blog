import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/** 标题 */
const title = 'Api Description';
/** 说明 */
const description = 'not description';
/** 令牌名 */
export const TOKEN_NAME = 'Authorization';
/** 权限验证配置 */
export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};
/** 引入 Swagger */
export const UseSwagger = (app: NestExpressApplication, apiVersion: string) => {
  // 初始化
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(apiVersion)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();
  // 添加配置
  const document = SwaggerModule.createDocument(app, options);
  // 创建Api版本
  SwaggerModule.setup(`swagger-ui/v${apiVersion}`, app, document);
  //
  return `swagger-ui/v${apiVersion}`;
};
