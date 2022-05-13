import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import ConfigLoads from '@app/config';

@Module({
  imports: [ConfigModule.forRoot({ encoding: 'utf-8', load: ConfigLoads, isGlobal: true })],
  controllers: [AppController],
})
export class AppModule {}
