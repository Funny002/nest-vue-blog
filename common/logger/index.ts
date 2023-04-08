import { Module } from '@nestjs/common';
import { LoggerService } from './src/Logger.service';

@Module({
  imports: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

export { LoggerService } from './src/Logger.service';
