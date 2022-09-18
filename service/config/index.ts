import { ConfigFactory } from '@nestjs/config/dist/interfaces/config-factory.interface';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export * from './src/app.config';
export * from './src/mysql.config';
export * from './src/jwtAuth.config';

/** 简单的引用 Config */
export class ConfigGlobal {
  static use(...load: ConfigFactory[]): DynamicModule {
    return ConfigModule.forRoot({ isGlobal: true, encoding: 'utf-8', load });
  }
}
