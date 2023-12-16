import { AppService } from './App/app.service';
import { AppModule } from './App/app.module';
import { NestFactory } from '@nestjs/core';

/* 引导 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false }); /* 初始化 */
  try {
    await app.select(AppModule).get(AppService).run(); /* 运行 */
  } catch (error) {
    console.log(error.message);
  }
  await app.close(); /* 关闭 */
}

/* 运行 */
(state => bootstrap().finally(() => {
  console.log(`bootstrap end, cost %s ms`, Date.now() - state);
  process.exit(1);
}))(Date.now());
